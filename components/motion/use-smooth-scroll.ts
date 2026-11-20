"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/**
 * useSmoothScroll
 * ────────────────
 * Attaches a momentum-based smooth-scrolling engine to #dynamic-viewport
 * using GSAP's ticker for 60 fps lerp interpolation.
 *
 * Scoped entirely to the component lifecycle — on unmount every listener,
 * ticker callback, and ScrollTrigger instance is torn down so that other
 * tabs revert to native browser scrolling with zero residual side-effects.
 *
 * Respects `prefers-reduced-motion` — if the user or OS requests reduced
 * motion the hook becomes a no-op and standard scrolling is preserved.
 */
export function useSmoothScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  options: { lerp?: number } = {}
) {
  const lerp = options.lerp ?? 0.08

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    if (!container) return

    const scroller = container.closest("#dynamic-viewport") as HTMLElement | null
    if (!scroller) return

    // Respect reduced-motion preference
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mql.matches) return

    let currentY = scroller.scrollTop
    let targetY = scroller.scrollTop
    let isTicking = false
    // Track whether the user is dragging the native scrollbar
    let isNativeScroll = false

    const tick = () => {
      const diff = targetY - currentY
      if (Math.abs(diff) < 0.5) {
        currentY = targetY
        scroller.scrollTop = Math.round(currentY)
        ScrollTrigger.update()
        gsap.ticker.remove(tick)
        isTicking = false
        return
      }
      currentY += diff * lerp
      scroller.scrollTop = Math.round(currentY)
      ScrollTrigger.update()
    }

    const startTicker = () => {
      if (!isTicking) {
        isTicking = true
        gsap.ticker.add(tick)
      }
    }

    /* ── Wheel ── */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY))
      isNativeScroll = false
      startTicker()
    }

    /* ── Native scroll (scrollbar drag / programmatic) ── */
    const onScroll = () => {
      if (!isTicking) {
        // User is interacting with the native scrollbar
        isNativeScroll = true
        currentY = scroller.scrollTop
        targetY = scroller.scrollTop
      }
    }

    /* ── Keyboard navigation ── */
    const onKeydown = (e: KeyboardEvent) => {
      const key = e.key
      const step = 80
      const pageStep = scroller.clientHeight * 0.85
      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      let handled = true

      switch (key) {
        case "ArrowDown":
          targetY = Math.min(maxScroll, targetY + step)
          break
        case "ArrowUp":
          targetY = Math.max(0, targetY - step)
          break
        case "PageDown":
        case " ":
          targetY = Math.min(maxScroll, targetY + pageStep)
          break
        case "PageUp":
          targetY = Math.max(0, targetY - pageStep)
          break
        case "Home":
          targetY = 0
          break
        case "End":
          targetY = maxScroll
          break
        default:
          handled = false
      }

      if (handled) {
        e.preventDefault()
        isNativeScroll = false
        startTicker()
      }
    }

    /* ── Window resize ── */
    const onResize = () => {
      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      targetY = Math.min(targetY, maxScroll)
      currentY = Math.min(currentY, maxScroll)
      ScrollTrigger.refresh()
    }

    scroller.addEventListener("wheel", onWheel, { passive: false })
    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKeydown, { passive: false })
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      scroller.removeEventListener("wheel", onWheel)
      scroller.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKeydown)
      window.removeEventListener("resize", onResize)
      gsap.ticker.remove(tick)
      isTicking = false
      ScrollTrigger.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, lerp])
}
