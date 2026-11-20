"use client"

import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useSmoothScroll } from "@/components/motion/use-smooth-scroll"
import { SITE_CONFIG } from "@/lib/config"
import {
  ScrollText,
  Scale,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Copy,
  Check,
  Sparkles,
  ChevronUp,
} from "lucide-react"

/**
 * VIEW 2: MINUTES & RULES ("Minutes & Rules" Active)
 * ────────────────────────────────────────────────────
 * Enhanced with GSAP/ScrollTrigger smooth-scrolling, reading progress bar,
 * section tracking, watermark parallax on governance pillars, sticky sprint
 * navigator, and a floating back-to-top button.
 *
 * All GSAP instances are scoped via gsap.context() and torn down on unmount
 * so that no other tab is affected.
 */

/* ── Section IDs for scroll-spy & jump navigation ── */
const SECTION_HEADER = "mr-header"
const SECTION_PILLARS = "mr-pillars"
const SECTION_MINUTES = "mr-minutes"

interface SectionMeta {
  id: string
  label: string
  shortLabel: string
}

const SECTIONS: SectionMeta[] = [
  { id: SECTION_HEADER, label: "INTRO // CHARTER", shortLabel: "Charter" },
  { id: SECTION_PILLARS, label: "PART I // THE FOUR PILLARS", shortLabel: "Pillars" },
  { id: SECTION_MINUTES, label: "PART II // SPRINT MINUTES", shortLabel: "Minutes" },
]

/* ── Watermark glyphs for parallax layer behind each governance card ── */
const WATERMARK_GLYPHS = ["§ 01", "§ 02", "§ 03", "§ 04"]

export function ViewMinutesRules() {
  const [selectedMinuteId, setSelectedMinuteId] = useState(SITE_CONFIG.meetingMinutes[0].id)
  const [copiedTemplate, setCopiedTemplate] = useState(false)

  /* ── Scroll progress & section tracking state ── */
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(SECTIONS[0])
  const [showBackToTop, setShowBackToTop] = useState(false)

  /* ── Refs ── */
  const containerRef = useRef<HTMLDivElement>(null)

  const activeMinute =
    SITE_CONFIG.meetingMinutes.find((m) => m.id === selectedMinuteId) ||
    SITE_CONFIG.meetingMinutes[0]

  const markdownTemplate = `# [HCMUS FIT - GROUP 07] WEEKLY MEETING MINUTES
- **Project Theme**: The True Meaning of Life
- **Date & Time**: [DD/MM/2026 - HH:MM ICT]
- **Location**: [HCMUS Library / Discord Voice]
- **Attendees**: 7 / 7 Members Present
- **Chairperson**: [Name] | **Secretary**: [Name]

## 1. Sprint Progress Review (7 Members)
- [01] Nguyen Minh Khoa: ...
- [02] Tran Le Phuong Anh: ...
- [03] Le Hoang Nam: ...
- [04] Pham Ngoc Han: ...
- [05] Vo Minh Tuan: ...
- [06] Dang Thao Vy: ...
- [07] Bui Quoc Bao: ...

## 2. Key Philosophical & Technical Decisions
1. ...
2. ...

## 3. Action Items Before Next Sync
- [ ] Update personal Google Docs progress sheet before Sunday 21:00 ICT.`

  const copyTemplate = () => {
    navigator.clipboard?.writeText(markdownTemplate)
    setCopiedTemplate(true)
    setTimeout(() => setCopiedTemplate(false), 2200)
  }

  /* ── Activate smooth scroll hook (scoped to this component's lifecycle) ── */
  useSmoothScroll(containerRef, { lerp: 0.08 })

  /* ── GSAP ScrollTrigger effects (progress bar, section spy, parallax, highlights) ── */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    if (!container) return

    const scroller = container.closest("#dynamic-viewport") as HTMLElement | null
    if (!scroller) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia(container)

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ── 1. Overall scroll progress bar ── */
        ScrollTrigger.create({
          scroller,
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            setScrollProgress(self.progress)
            setShowBackToTop(self.progress > 0.08)
          },
        })

        /* ── 2. Section spy — track which section is currently visible ── */
        SECTIONS.forEach((section) => {
          const el = document.getElementById(section.id)
          if (!el) return
          ScrollTrigger.create({
            scroller,
            trigger: el,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) setActiveSection(section)
            },
          })
        })

        /* ── 3. Watermark parallax on governance pillar cards ── */
        const watermarks = container.querySelectorAll<HTMLElement>("[data-watermark]")
        watermarks.forEach((wm) => {
          gsap.fromTo(
            wm,
            { yPercent: -30 },
            {
              yPercent: 30,
              ease: "none",
              scrollTrigger: {
                scroller,
                trigger: wm.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          )
        })

        /* ── 4. Decisions list — stagger-in on scroll ── */
        const decisionItems = container.querySelectorAll<HTMLElement>("[data-decision-item]")
        if (decisionItems.length) {
          gsap.set(decisionItems, { autoAlpha: 0, x: -24 })
          ScrollTrigger.batch(decisionItems, {
            scroller,
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                overwrite: true,
                clearProps: "transform,opacity,visibility",
              })
            },
          })
        }

        /* ── 5. Metadata info cards — scale-in ── */
        const metaCards = container.querySelectorAll<HTMLElement>("[data-meta-card]")
        if (metaCards.length) {
          gsap.set(metaCards, { autoAlpha: 0, scale: 0.92, y: 16 })
          ScrollTrigger.batch(metaCards, {
            scroller,
            start: "top 92%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.65,
                ease: "power2.out",
                stagger: 0.06,
                overwrite: true,
                clearProps: "transform,opacity,visibility",
              })
            },
          })
        }
      })
    }, container)

    return () => ctx.revert()
  }, [])

  /* ── Smooth scroll-to-section helper ── */
  const scrollToSection = useCallback((sectionId: string) => {
    const scroller = containerRef.current?.closest("#dynamic-viewport") as HTMLElement | null
    const target = document.getElementById(sectionId)
    if (!scroller || !target) return

    const targetOffset = target.offsetTop - scroller.offsetTop - 12
    gsap.to(scroller, {
      scrollTop: targetOffset,
      duration: 0.9,
      ease: "power2.out",
    })
  }, [])

  /* ── Smooth back-to-top ── */
  const scrollToTop = useCallback(() => {
    const scroller = containerRef.current?.closest("#dynamic-viewport") as HTMLElement | null
    if (!scroller) return
    gsap.to(scroller, { scrollTop: 0, duration: 1.0, ease: "power2.inOut" })
  }, [])

  return (
    <div ref={containerRef} className="relative mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-8 sm:py-8">
      {/* ═══════════════════════════════════════════════════════════════════════
          SCROLL PROGRESS BAR & SECTION TRACKER (sticky within this view)
         ═══════════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 -mx-4 -mt-6 mb-2 sm:-mx-8 sm:-mt-8">
        {/* Progress bar */}
        <div className="h-[3px] w-full bg-[#ece4d4]/60">
          <div
            className="h-full bg-gradient-to-r from-[#9a6a3e] via-[#b58656] to-[#7c532d] transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Section indicator + jump navigation */}
        <div className="flex items-center justify-between gap-3 border-b border-[#2b2721]/8 bg-[#f6f2e9]/90 px-4 py-1.5 backdrop-blur-md sm:px-8">
          <span className="font-mono text-[9px] font-semibold tracking-[0.2em] uppercase text-[#9a6a3e]">
            {activeSection.label}
          </span>
          <div className="flex items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`rounded-full px-2.5 py-0.5 font-mono text-[9px] tracking-wider uppercase transition-all duration-200 ${
                  s.id === activeSection.id
                    ? "bg-[#1e1b16] text-[#f6f2e9] shadow-sm"
                    : "text-[#2b2721]/55 hover:bg-[#ece4d4] hover:text-[#7c532d]"
                }`}
              >
                {s.shortLabel}
              </button>
            ))}
            <span className="ml-1.5 font-mono text-[9px] tabular-nums text-[#2b2721]/40">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER BANNER
         ═══════════════════════════════════════════════════════════════════════ */}
      <div id={SECTION_HEADER} className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2b2721]/12 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-[#9a6a3e]">
            <Scale className="h-3.5 w-3.5" />
            VIEW 02 // COVENANT, GOVERNANCE RULES &amp; SPRINT MINUTES
          </span>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#1e1b16] sm:text-4xl">
            Team Charter, Rules &amp; Meeting Minutes
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[#2b2721]/75">
            How seven students in a &lt;40-person HCMUS FIT cohort maintain discipline, mutual care, and engineering rigor while exploring &ldquo;The True Meaning of Life&rdquo;.
          </p>
        </div>

        <button
          type="button"
          onClick={copyTemplate}
          className="inline-flex items-center gap-2 rounded-full border border-[#2b2721]/20 bg-white px-4 py-2 font-mono text-xs tracking-wider uppercase text-[#1e1b16] shadow-2xs transition hover:border-[#9a6a3e] hover:bg-[#1e1b16] hover:text-[#f6f2e9]"
        >
          {copiedTemplate ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied Minutes Template!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#9a6a3e]" />
              <span>Copy Blank Minutes Template</span>
            </>
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: TEAM RULES GRID (THE FOUR PILLARS)
         ═══════════════════════════════════════════════════════════════════════ */}
      <div id={SECTION_PILLARS}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-[#1e1b16]">
            Part I — The Four Pillars of Team Governance
          </h2>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#2b2721]/55">
            SIGNED BY ALL 07 MEMBERS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SITE_CONFIG.teamRules.map((rule, idx) => (
            <div
              key={rule.code}
              className="group relative overflow-hidden rounded-3xl border border-[#2b2721]/14 bg-[#fbf9f4] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9a6a3e]/60 hover:shadow-md"
            >
              {/* Parallax watermark glyph */}
              <span
                data-watermark
                className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-[80px] font-bold leading-none text-[#ece4d4]/50"
                aria-hidden="true"
              >
                {WATERMARK_GLYPHS[idx] ?? `§ 0${idx + 1}`}
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#ece4d4] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-[#7c532d]">
                    {rule.code}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/50">
                    {rule.category}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium text-[#1e1b16]">
                  {rule.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2b2721]/75">
                  {rule.description}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#9a6a3e]/20 bg-[#f4efe3] px-3.5 py-2 text-xs text-[#7c532d]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>{rule.penaltyOrReward}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: MEETING MINUTES SELECTOR & DETAIL LEDGER
         ═══════════════════════════════════════════════════════════════════════ */}
      <div id={SECTION_MINUTES} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 4 Cols: Sprint Minutes List (sticky navigator) */}
        <div className="space-y-3 lg:col-span-4">
          <div className="lg:sticky lg:top-16">
            <h2 className="font-serif text-xl font-medium text-[#1e1b16]">
              Part II — Official Meeting Minutes
            </h2>
            <div className="mt-3 space-y-3">
              {SITE_CONFIG.meetingMinutes.map((m) => {
                const active = m.id === activeMinute.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMinuteId(m.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? "border-[#9a6a3e] bg-[#1e1b16] text-[#f6f2e9] shadow-md"
                        : "border-[#2b2721]/14 bg-[#fbf9f4] text-[#1e1b16] hover:border-[#9a6a3e]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-[0.16em] uppercase ${
                          active ? "text-[#e5b879]" : "text-[#9a6a3e]"
                        }`}
                      >
                        {m.sprint}
                      </span>
                      <span className="font-mono text-[10px] opacity-70">{m.attendees}</span>
                    </div>
                    <p className="mt-1.5 font-serif text-base font-medium">{m.date}</p>
                    <p className="mt-1 truncate text-xs opacity-75">{m.location}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Selected Meeting Minute Full Record */}
        <div className="rounded-3xl border border-[#2b2721]/15 bg-[#fbf9f4] p-6 shadow-xs sm:p-8 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2b2721]/12 pb-4">
            <div>
              <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#9a6a3e]">
                ARCHIVED RECORD // {activeMinute.sprint}
              </span>
              <h3 className="mt-1 font-serif text-2xl font-normal text-[#1e1b16]">
                Minutes of Group 07 General Assembly
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-800">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{activeMinute.attendees}</span>
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div data-meta-card className="flex items-center gap-2.5 rounded-xl bg-[#f3ede0] p-3 text-xs">
              <Calendar className="h-4 w-4 text-[#9a6a3e]" />
              <div>
                <p className="font-mono text-[9px] uppercase text-[#2b2721]/55">DATE &amp; TIME</p>
                <p className="font-medium text-[#1e1b16]">{activeMinute.date}</p>
              </div>
            </div>
            <div data-meta-card className="flex items-center gap-2.5 rounded-xl bg-[#f3ede0] p-3 text-xs">
              <MapPin className="h-4 w-4 text-[#9a6a3e]" />
              <div>
                <p className="font-mono text-[9px] uppercase text-[#2b2721]/55">VENUE</p>
                <p className="font-medium text-[#1e1b16]">{activeMinute.location}</p>
              </div>
            </div>
            <div data-meta-card className="flex items-center gap-2.5 rounded-xl bg-[#f3ede0] p-3 text-xs">
              <Users className="h-4 w-4 text-[#9a6a3e]" />
              <div>
                <p className="font-mono text-[9px] uppercase text-[#2b2721]/55">CHAIR &amp; SECRETARY</p>
                <p className="font-medium text-[#1e1b16]">
                  {activeMinute.chairperson} / {activeMinute.secretary}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#9a6a3e]">
              EXECUTIVE SUMMARY
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#2b2721]/85">
              {activeMinute.summary}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#9a6a3e]">
              RATIFIED DECISIONS &amp; ACTION ITEMS
            </h4>
            <ul className="mt-3 space-y-2.5">
              {activeMinute.decisions.map((decision, idx) => (
                <li
                  key={idx}
                  data-decision-item
                  className="flex items-start gap-3 rounded-xl border border-[#2b2721]/10 bg-white p-3 text-xs text-[#1e1b16]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ece4d4] font-mono text-[10px] font-bold text-[#7c532d]">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ready-to-use Markdown Template Preview */}
          <div className="mt-6 rounded-2xl border border-[#2b2721]/12 bg-[#f4efe3] p-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#7c532d]">
                <ScrollText className="h-3.5 w-3.5" />
                <span>Standardized Team Minutes Template</span>
              </span>
              <button
                type="button"
                onClick={copyTemplate}
                className="font-mono text-[10px] underline hover:text-[#9a6a3e]"
              >
                {copiedTemplate ? "Copied" : "Copy Markdown"}
              </button>
            </div>
            <pre className="mt-2 max-h-36 overflow-y-auto font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-[#2b2721]/80">
              {markdownTemplate}
            </pre>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          FLOATING BACK-TO-TOP BUTTON
         ═══════════════════════════════════════════════════════════════════════ */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-24 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#2b2721]/20 bg-[#1e1b16] text-[#f6f2e9] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#9a6a3e] ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  )
}
