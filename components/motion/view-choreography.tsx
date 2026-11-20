"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { TextTabId } from "@/components/motion/tab-transitions"

/**
 * GSAP CONTENT CHOREOGRAPHY
 * Runs inside a content tab after (and overlapping) its Framer Motion page transition.
 * The view's sections and the cards inside its grids are revealed in a per-tab style,
 * batched with ScrollTrigger against the #dynamic-viewport scroller, so cards below
 * the fold animate in as they are scrolled to rather than all at once off-screen.
 *
 * Only inline styles are touched (no DOM splitting), so React-managed text such as the
 * Home slider stays safe; every property is cleared once its reveal finishes.
 */

interface Preset {
  from: gsap.TweenVars
  to: gsap.TweenVars
  duration: number
  ease: string
  stagger: gsap.StaggerVars | number
}

const PRESETS: Record<TextTabId, Preset> = {
  // Cards rise out of a depth-of-field blur, rippling outward.
  home: {
    from: { autoAlpha: 0, y: 70, scale: 0.94, filter: "blur(12px)" },
    to: { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" },
    duration: 1.15,
    ease: "expo.out",
    stagger: { each: 0.08, from: "start" },
  },
  // Index cards flip down from their top edge, like a ledger being leafed through.
  minutes: {
    from: {
      autoAlpha: 0,
      y: 24,
      rotateX: -80,
      transformOrigin: "50% 0%",
      transformPerspective: 1000,
    },
    to: { autoAlpha: 1, y: 0, rotateX: 0 },
    duration: 1.05,
    ease: "power4.out",
    stagger: 0.07,
  },
  // Exhibit panels swing in from alternating sides in deep perspective.
  products: {
    from: {
      autoAlpha: 0,
      y: 160,
      scale: 0.86,
      rotateY: (i: number) => (i % 2 ? -28 : 28),
      transformPerspective: 1200,
    },
    to: { autoAlpha: 1, y: 0, scale: 1, rotateY: 0 },
    duration: 1.35,
    ease: "expo.out",
    stagger: 0.12,
  },
  // Snapshots get tossed onto the table and settle with a springy wobble.
  devlog: {
    from: {
      autoAlpha: 0,
      y: -110,
      scale: 0.78,
      rotate: () => gsap.utils.random(-10, 10),
    },
    to: { autoAlpha: 1, y: 0, scale: 1, rotate: 0 },
    duration: 1.5,
    ease: "elastic.out(1, 0.6)",
    stagger: { each: 0.05, from: "random" },
  },
}

/** Delay before the first visible batch, so it lands while the page transition settles. */
const INTRO_DELAY = 0.3

/**
 * Sections are the view root's children. A section that is (or directly holds) a grid
 * is broken into its grid cells so each card animates on its own.
 */
function collectRevealTargets(root: Element): HTMLElement[] {
  const targets: HTMLElement[] = []
  for (const section of Array.from(root.children) as HTMLElement[]) {
    if (section.classList.contains("grid")) {
      targets.push(...(Array.from(section.children) as HTMLElement[]))
      continue
    }
    const grid = section.querySelector(":scope > .grid")
    if (!grid) {
      targets.push(section)
      continue
    }
    for (const child of Array.from(section.children) as HTMLElement[]) {
      if (child === grid) targets.push(...(Array.from(grid.children) as HTMLElement[]))
      else targets.push(child)
    }
  }
  return targets
}

/** Re-measure trigger positions once the page transition has finished moving the scroller. */
export function refreshChoreography() {
  ScrollTrigger.refresh()
}

interface ViewChoreographyProps {
  preset: TextTabId
  children: React.ReactNode
}

export function ViewChoreography({ preset, children }: ViewChoreographyProps) {
  const scopeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scope = scopeRef.current
    const root = scope?.firstElementChild
    if (!scope || !root) return

    gsap.registerPlugin(ScrollTrigger)
    const { from, to, duration, ease, stagger } = PRESETS[preset]
    const scroller = scope.closest("#dynamic-viewport") ?? undefined
    const mm = gsap.matchMedia(scope)

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = collectRevealTargets(root)
      gsap.set(targets, from)

      let introPlayed = false
      ScrollTrigger.batch(targets, {
        scroller,
        start: "top 94%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            ...to,
            duration,
            ease,
            stagger,
            delay: introPlayed ? 0 : INTRO_DELAY,
            overwrite: true,
            clearProps: "transform,filter,opacity,visibility",
          })
          introPlayed = true
        },
      })

      // Headline: a masked lift, independent of its card's reveal.
      const headline = root.querySelector("h1")
      if (headline) {
        gsap.fromTo(
          headline,
          { clipPath: "inset(0% 0% 100% 0%)", yPercent: 45 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 1.25,
            ease: "expo.out",
            delay: INTRO_DELAY + 0.15,
            clearProps: "clipPath,transform",
          }
        )
      }
    })

    return () => mm.revert()
  }, [preset])

  return <div ref={scopeRef}>{children}</div>
}
