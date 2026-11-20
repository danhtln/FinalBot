"use client"

import React, { useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import { DashboardTabId } from "@/components/top-header"
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ImageIcon,
  Maximize2,
  ArrowUpRight,
  Users,
  BookOpen,
  Cpu,
  CalendarRange,
} from "lucide-react"

interface ViewHomeProps {
  onSelectTab: (tab: DashboardTabId) => void
  onOpenTeamBadgeModal: () => void
  onSelectMember: (index: number) => void
}

/**
 * VIEW 1: HOME ("Home" Active)
 * └── Overview Slider / Card:
 *     ├── General team info (<40 students, HCMUS IT Faculty, project orientation)
 *     └── Logo & Team Badge (Leave empty placeholder for logo, insert thenhom.html for Team Badge)
 */
export function ViewHome({
  onSelectTab,
  onOpenTeamBadgeModal,
  onSelectMember,
}: ViewHomeProps) {
  const slides = SITE_CONFIG.homeOverviewSlides
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => setCurrentSlide((c) => (c - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide((c) => (c + 1) % slides.length)

  const activeSlide = slides[currentSlide]

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-8 sm:py-8">
      {/* Top Hero Banner: Overview Slider + Logo & Team Badge (thenhom.html) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 Columns: Overview Slider / Card */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#2b2721]/15 bg-[#fbf9f4] p-6 shadow-sm sm:p-8 lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9a6a3e]/35 bg-[#9a6a3e]/10 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7c532d]">
                <Sparkles className="h-3 w-3" />
                {activeSlide.tag}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#2b2721]/50">
                SLIDE {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-3xl leading-[1.08] font-normal tracking-tight text-[#1e1b16] sm:text-4xl">
              {activeSlide.title}
            </h1>
            <p className="mt-2 font-serif text-sm italic text-[#9a6a3e] sm:text-base">
              {activeSlide.subtitle}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#2b2721]/80 sm:text-base">
              {activeSlide.description}
            </p>

            {/* Key Cohort & Orientation Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#2b2721]/10 pt-5">
              {activeSlide.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-[#2b2721]/10 bg-[#f3ede0]/70 p-3"
                >
                  <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#2b2721]/55">
                    {m.label}
                  </p>
                  <p className="mt-1 font-serif text-base font-semibold text-[#1e1b16] sm:text-lg">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls + Quick Action */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#2b2721]/10 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous overview slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/20 bg-white text-[#1e1b16] transition hover:border-[#9a6a3e] hover:bg-[#1e1b16] hover:text-[#f6f2e9]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next overview slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/20 bg-white text-[#1e1b16] transition hover:border-[#9a6a3e] hover:bg-[#1e1b16] hover:text-[#f6f2e9]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-2 flex items-center gap-1.5">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx
                        ? "w-6 bg-[#9a6a3e]"
                        : "w-2 bg-[#2b2721]/25 hover:bg-[#2b2721]/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectTab("members")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b16] px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[#f6f2e9] transition hover:bg-[#9a6a3e]"
              >
                <span>Meet 07 Members</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Logo Placeholder & Embedded Team Badge (thenhom.html) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* 1. Team Logo Empty Placeholder Card */}
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-dashed border-[#9a6a3e]/45 bg-[#faf6ec] p-5">
            <div className="flex items-center gap-4">
              {SITE_CONFIG.teamLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SITE_CONFIG.teamLogoUrl}
                  alt={SITE_CONFIG.teamName}
                  className="h-14 w-14 rounded-2xl object-cover shadow-xs"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-[#9a6a3e]/60 bg-[#efe8d8] text-[#7c532d]">
                  <ImageIcon className="h-5 w-5 opacity-75" />
                  <span className="mt-0.5 font-mono text-[8px] uppercase">LOGO</span>
                </div>
              )}
              <div>
                <span className="font-mono text-[9px] font-semibold tracking-[0.18em] uppercase text-[#9a6a3e]">
                  TEAM LOGO PLACEHOLDER (config.js)
                </span>
                <h2 className="font-serif text-lg font-medium text-[#1e1b16]">
                  {SITE_CONFIG.teamName}
                </h2>
                <p className="text-xs text-[#2b2721]/65">
                  Set <code className="rounded bg-[#ece4d4] px-1 font-mono text-[10px]">teamLogoUrl</code> in{" "}
                  <code className="rounded bg-[#ece4d4] px-1 font-mono text-[10px]">config.js</code> to replace empty frame.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Team Badge Card — Embedded thenhom.html */}
          <div className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden rounded-3xl border border-[#2b2721]/20 bg-[#0a0a0a] text-[#f5ebd6] shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#141210] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-amber-200">
                  TEAM BADGE // thenhom.html
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenTeamBadgeModal}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[9px] tracking-wider uppercase text-white transition hover:bg-amber-400 hover:text-black"
              >
                <Maximize2 className="h-3 w-3" />
                <span>Expand Full Credential</span>
              </button>
            </div>

            <div className="relative flex-1">
              <iframe
                src="/modules/thenhom.html"
                title="Team Spark Credential Badge (thenhom.html)"
                className="h-full min-h-[250px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Quick Philosophical & Project Orientation Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => onSelectTab("members")}
          className="group rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#9a6a3e] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9a6a3e]">
              VIEW 03 // ROSTER
            </span>
            <Users className="h-4 w-4 text-[#9a6a3e]" />
          </div>
          <h3 className="mt-2 font-serif text-lg font-medium text-[#1e1b16]">
            07 Team Members &amp; Google Docs
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/70">
            Thông tin thành viên và tiến trình được cập nhật tức thì qua Google Docs
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab("plan")}
          className="group rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#9a6a3e] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9a6a3e]">
              VIEW 04 // ROADMAP
            </span>
            <CalendarRange className="h-4 w-4 text-[#9a6a3e]" />
          </div>
          <h3 className="mt-2 font-serif text-lg font-medium text-[#1e1b16]">
            Sketchbook, Gantt &amp; Matrix
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/70">
            A sketchbook that is still updating...
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab("documents")}
          className="group rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#9a6a3e] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9a6a3e]">
              VIEW 05 // ARCHIVE
            </span>
            <BookOpen className="h-4 w-4 text-[#9a6a3e]" />
          </div>
          <h3 className="mt-2 font-serif text-lg font-medium text-[#1e1b16]">
            3D Working Volumes Library
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/70">
            Tài liệu tham khảo
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab("architecture")}
          className="group rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#9a6a3e] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9a6a3e]">
              VIEW 06 // SYSTEM
            </span>
            <Cpu className="h-4 w-4 text-[#9a6a3e]" />
          </div>
          <h3 className="mt-2 font-serif text-lg font-medium text-[#1e1b16]">
            Field Manuals &amp; Tech Stack
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/70">
            Công cụ chính được dùng để xây website.
          </p>
        </button>
      </div>

      {/* Bottom Strip: 7 Members Quick Pulse */}
      <div className="rounded-3xl border border-[#2b2721]/12 bg-[#fbf9f4] p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#9a6a3e]">
              HCMUS FIT // 7-MEMBER COHORT ROSTER (&lt;40 STUDENTS CLASS)
            </p>
            <h2 className="mt-1 font-serif text-xl font-medium text-[#1e1b16]">
              Click any member to inspect their personal Google Docs progress
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab("members")}
            className="font-mono text-xs underline decoration-[#9a6a3e] underline-offset-4 hover:text-[#9a6a3e]"
          >
            Open Full Filmstrip View →
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SITE_CONFIG.members.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                onSelectTab("members")
                onSelectMember(i)
              }}
              className="group flex flex-col justify-between rounded-2xl border border-[#2b2721]/12 bg-[#f4efe3]/70 p-3 text-left transition hover:-translate-y-0.5 hover:border-[#9a6a3e] hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#9a6a3e]">
                    {m.index}
                  </span>
                  <span className="font-mono text-[9px] text-[#2b2721]/50">
                    {m.studentId}
                  </span>
                </div>
                <p className="mt-2 font-serif text-sm font-semibold leading-snug text-[#1e1b16] group-hover:text-[#9a6a3e]">
                  {m.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[10px] text-[#2b2721]/65">
                  {m.role}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#2b2721]/10">
                <div className="flex items-center justify-between font-mono text-[9px]">
                  <span className="text-[#2b2721]/55">PROGRESS</span>
                  <span className="font-semibold text-[#7c532d]">{m.progressPercent}%</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[#2b2721]/10">
                  <div
                    className="h-full rounded-full bg-[#9a6a3e]"
                    style={{ width: `${m.progressPercent}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
