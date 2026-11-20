"use client"

import React, { useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import {
  Coffee,
  Code2,
  Sparkles,
  BookOpen,
  Clock,
  GitCommit,
  Camera,
  Heart,
  MapPin,
} from "lucide-react"

/**
 * VIEW 8: DEV LOG & BEHIND THE SCENES ("Dev Log & Behind the Scenes" Active)
 * └── Dev Log & Team Vibe Area:
 *     ├── Weekly progress timeline (Changelog / Weekly Sprint Logs)
 *     └── Memory photo corner / Fun stats (Team photo album, number of milk teas, lines of code)
 */
export function ViewDevLog() {
  const [milkTeaBonus, setMilkTeaBonus] = useState(0)
  const stats = SITE_CONFIG.teamVibeStats

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-8 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2b2721]/12 pb-5">
        <div>
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-[#9a6a3e]">
            VIEW 08 // DEV LOG, WEEKLY CHANGELOG &amp; BEHIND THE SCENES VIBE
          </span>
          <h1 className="mt-1 font-serif text-3xl font-normal tracking-tight text-[#1e1b16] sm:text-4xl">
            Dev Log &amp; Behind the Scenes
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[#2b2721]/75">
            Because the true meaning of our university life at HCMUS isn&apos;t only in the final commit—it lives in the 142 cups of milk tea, late-night debugging sessions, and shared laughter along the way.
          </p>
        </div>

        {/* Interactive Milk Tea Toast Button */}
        <button
          type="button"
          onClick={() => setMilkTeaBonus((b) => b + 1)}
          className="inline-flex items-center gap-2 rounded-full border border-[#9a6a3e] bg-[#1e1b16] px-4 py-2 font-mono text-xs font-semibold text-[#f6f2e9] shadow-sm transition hover:scale-105 hover:bg-[#9a6a3e]"
        >
          <Coffee className="h-4 w-4 text-[#e5b879]" />
          <span>
            Toast +1 Milk Tea ({stats.milkTeasConsumed + milkTeaBonus} Cups!)
          </span>
        </button>
      </div>

      {/* 1. Fun Stats / Team Vibe Telemetry Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-[#9a6a3e]/40 bg-[#faf4e6] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <Coffee className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">MILK TEAS</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.milkTeasConsumed + milkTeaBonus}
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            Oolong, Matcha &amp; Black Sugar
          </p>
        </div>

        <div className="rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <Code2 className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">LINES OF CODE</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.linesOfCodeWritten.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            TSX, GLSL Shaders &amp; Three.js
          </p>
        </div>

        <div className="rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">LATE NIGHTS</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.lateNightDiscussions}
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            Existential &amp; code debates
          </p>
        </div>

        <div className="rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <BookOpen className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">BOOKS READ</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.philosophicalBooksRead}
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            Frankl, Camus, Aurelius...
          </p>
        </div>

        <div className="rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">LIBRARY HOURS</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.hoursInLibrary}h
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            HCMUS Nguyen Van Cu
          </p>
        </div>

        <div className="rounded-2xl border border-[#2b2721]/12 bg-[#fbf9f4] p-4">
          <div className="flex items-center justify-between text-[#9a6a3e]">
            <GitCommit className="h-4 w-4" />
            <span className="font-mono text-[9px] font-bold uppercase">GIT COMMITS</span>
          </div>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#1e1b16]">
            {stats.commitsPushed}
          </p>
          <p className="mt-0.5 text-[11px] text-[#2b2721]/65">
            {stats.bugsResolved} bugs squashed
          </p>
        </div>
      </div>

      {/* Main Split: Weekly Progress Timeline + Memory Photo Corner */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 6 Cols: Weekly Progress Timeline (Changelog / Weekly Sprint Logs) */}
        <div className="space-y-4 lg:col-span-6">
          <div>
            <h2 className="font-serif text-2xl font-normal text-[#1e1b16]">
              Weekly Progress Timeline &amp; Sprint Changelog
            </h2>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/55">
              CHRONICLE OF GROUP 07 AT HCMUS FIT
            </p>
          </div>

          <div className="relative space-y-4 before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px before:bg-[#9a6a3e]/35">
            {SITE_CONFIG.weeklyDevLogs.map((log) => (
              <div key={log.week} className="relative pl-10">
                <span className="absolute top-4 left-2.5 h-3 w-3 rounded-full border-2 border-[#9a6a3e] bg-[#fbf9f4]" />
                <div className="rounded-2xl border border-[#2b2721]/14 bg-[#fbf9f4] p-5 shadow-2xs transition hover:border-[#9a6a3e]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#1e1b16] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#e5b879]">
                      {log.week} • {log.sprint}
                    </span>
                    <span className="font-mono text-[10px] text-[#2b2721]/55">
                      {log.dateRange}
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-serif text-lg font-semibold text-[#1e1b16]">
                    {log.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/80">
                    {log.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#2b2721]/10 pt-2.5 font-mono text-[10px]">
                    <span className="text-[#7c532d]">Logged by: {log.author}</span>
                    <span className="inline-flex items-center gap-1 text-[#9a6a3e]">
                      <Heart className="h-3 w-3" />
                      {log.mood}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Memory Photo Corner / Team Photo Album */}
        <div className="space-y-4 lg:col-span-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-normal text-[#1e1b16]">
                Memory Photo Corner &amp; Team Album
              </h2>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/55">
                CONFIGURE PHOTO URLS IN config.js / lib/config.ts
              </p>
            </div>
            <Camera className="h-5 w-5 text-[#9a6a3e]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SITE_CONFIG.memoryPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#2b2721]/15 bg-white p-3 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Polaroid Image Frame */}
                <div
                  className={`relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${photo.placeholderGradient}`}
                >
                  {photo.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          const fallback = parent.querySelector(".photo-fallback")
                          if (fallback) fallback.classList.remove("hidden")
                        }
                      }}
                    />
                  ) : null}
                  <div className={`photo-fallback flex h-full w-full flex-col items-center justify-center p-4 text-center text-[#2b2721] ${photo.imageUrl ? "hidden" : ""}`}>
                    <Camera className="h-6 w-6 opacity-50" />
                    <span className="mt-1.5 font-mono text-[9px] font-bold tracking-[0.18em] uppercase opacity-75">
                      MEMORY PLATE 0{idx + 1}
                    </span>
                    <span className="mt-0.5 font-serif text-xs italic opacity-75">
                      {photo.location}
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-black/65 px-2.5 py-0.5 font-mono text-[9px] text-white backdrop-blur-xs">
                    {photo.date}
                  </span>
                </div>

                <div className="p-2.5">
                  <div className="flex items-center gap-1 font-mono text-[9px] text-[#9a6a3e]">
                    <MapPin className="h-3 w-3" />
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[#1e1b16]">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#2b2721]/75">
                    {photo.caption}
                  </p>
                  <div className="mt-2.5 rounded-lg bg-[#f5f0e4] px-2.5 py-1 font-mono text-[9px] text-[#7c532d]">
                    🧋 {photo.milkTeaNote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
