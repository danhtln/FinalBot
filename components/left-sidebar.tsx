"use client"

import React, { useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import { Layers, Info } from "lucide-react"

interface LeftSidebarProps {
  /** Retracts off-screen while an immersive module tab owns the full viewport. */
  collapsed?: boolean
  onReturnToLayer0: () => void
  onOpenBadgeModal: () => void
}

/**
 * LEFT SIDEBAR (Fixed on the left across all Layer 1 Views)
 * Contains:
 * - Social Icons: Facebook, Zalo, Discord
 *   (INSERT YOUR SOCIAL LINKS IN `/config.js` OR `/lib/config.ts` UNDER `socialLinks`)
 * - Bonus Info: Cohort <40 students, HCMUS FIT, coordinates, and Layer 0 return button.
 */
export function LeftSidebar({
  collapsed = false,
  onReturnToLayer0,
  onOpenBadgeModal,
}: LeftSidebarProps) {
  const [showBonusPopover, setShowBonusPopover] = useState(false)

  // ==========================================================================
  // SOCIAL LINKS — INSERT YOUR ACTUAL LINKS IN `config.js` OR BELOW:
  // ==========================================================================
  const FACEBOOK_URL = SITE_CONFIG.socialLinks.facebook // <-- Insert Facebook link here
  const ZALO_URL = SITE_CONFIG.socialLinks.zalo         // <-- Insert Zalo link here
  const DISCORD_URL = SITE_CONFIG.socialLinks.discord   // <-- Insert Discord link here

  return (
    <aside
      aria-label="Social Links & Cohort Telemetry Sidebar"
      aria-hidden={collapsed}
      inert={collapsed}
      className={`fixed top-16 bottom-0 left-0 z-30 hidden w-14 flex-col items-center justify-between border-r border-[#2b2721]/12 bg-[#f4efe4]/90 py-5 backdrop-blur-md transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
        collapsed ? "pointer-events-none -translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {/* Top: Return to Layer 0 & Bonus Info Trigger */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onReturnToLayer0}
          title="Return to Layer 0 Cinematic Landing"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/15 bg-white/75 text-[#2b2721]/75 transition hover:border-[#9a6a3e] hover:bg-[#1e1b16] hover:text-[#f6f2e9]"
        >
          <Layers className="h-4 w-4" />
        </button>

        <div className="h-6 w-px bg-[#2b2721]/12" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowBonusPopover((v) => !v)}
            title="HCMUS FIT Cohort & Bonus Info"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
              showBonusPopover
                ? "border-[#9a6a3e] bg-[#9a6a3e] text-white"
                : "border-[#2b2721]/15 bg-white/75 text-[#2b2721]/75 hover:border-[#9a6a3e]"
            }`}
          >
            <Info className="h-4 w-4" />
          </button>

          {showBonusPopover && (
            <div className="absolute top-0 left-12 z-50 w-64 rounded-xl border border-[#2b2721]/20 bg-[#faf7f0] p-4 text-left shadow-xl">
              <p className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-[#9a6a3e]">
                HCMUS FIT // BONUS TELEMETRY
              </p>
              <p className="mt-1 font-serif text-sm font-medium text-[#1e1b16]">
                {SITE_CONFIG.projectTitle}
              </p>
              <dl className="mt-2.5 space-y-1.5 border-t border-[#2b2721]/10 pt-2.5 font-mono text-[10px]">
                <div className="flex justify-between">
                  <dt className="text-[#2b2721]/55">UNIVERSITY:</dt>
                  <dd className="font-semibold text-[#1e1b16]">HCMUS (VNU-HCM)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#2b2721]/55">FACULTY:</dt>
                  <dd className="font-semibold text-[#1e1b16]">Information Tech</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#2b2721]/55">CLASS SIZE:</dt>
                  <dd className="font-semibold text-[#9a6a3e]">&lt; 40 Students</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#2b2721]/55">TEAM SIZE:</dt>
                  <dd className="font-semibold text-[#1e1b16]">07 Members</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#2b2721]/55">COORDS:</dt>
                  <dd className="text-[#1e1b16]">{SITE_CONFIG.sidebarBonusInfo.coordinates}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => {
                  setShowBonusPopover(false)
                  onOpenBadgeModal()
                }}
                className="mt-3 w-full rounded-lg bg-[#1e1b16] py-1.5 font-mono text-[10px] tracking-wider uppercase text-[#f6f2e9] transition hover:bg-[#9a6a3e]"
              >
                Open Spark Credential
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle Vertical Rotated Motto */}
      <div className="pointer-events-none flex flex-col items-center gap-2 select-none">
        <span
          className="font-mono text-[9px] tracking-[0.26em] uppercase text-[#2b2721]/45"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          HCMUS • FIT • &lt;40 COHORT • MEANING OF LIFE
        </span>
      </div>

      {/* Bottom: Social Icons (Facebook, Zalo, Discord) */}
      <div className="flex flex-col items-center gap-2.5">
        {/* 1. FACEBOOK LINK (Edit in config.js -> socialLinks.facebook) */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Team Facebook"
          title="Facebook (Configure link in config.js)"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/15 bg-white/80 text-[#2b2721]/75 transition hover:-translate-y-0.5 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M13.5 21v-7.5h2.5l.38-3h-2.88V8.6c0-.87.24-1.46 1.49-1.46H16.5V4.45c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.26H8v3h2.42V21h3.08Z" />
          </svg>
        </a>

        {/* 2. ZALO LINK (Edit in config.js -> socialLinks.zalo) */}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Team Zalo"
          title="Zalo Group (Configure link in config.js)"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/15 bg-white/80 font-mono text-[10px] font-bold tracking-tighter text-[#2b2721]/80 transition hover:-translate-y-0.5 hover:border-[#0068FF] hover:bg-[#0068FF] hover:text-white"
        >
          Zalo
        </a>

        {/* 3. DISCORD LINK (Edit in config.js -> socialLinks.discord) */}
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Team Discord"
          title="Discord Server (Configure link in config.js)"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2721]/15 bg-white/80 text-[#2b2721]/75 transition hover:-translate-y-0.5 hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.02.06.03.09.02 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02ZM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12Zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12Z" />
          </svg>
        </a>
      </div>
    </aside>
  )
}
