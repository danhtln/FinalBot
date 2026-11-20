"use client"

import React, { useRef, useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import { Sparkles, Maximize2, Minimize2, X, Sliders, RotateCcw } from "lucide-react"

interface TeamBadgeModalProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Displays `thenhom.html` (Spark Badge — credential in rain) with transition animation,
 * variant selector, and real-time particle/rain controls.
 */
export function TeamBadgeModal({ isOpen, onClose }: TeamBadgeModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [variant, setVariant] = useState<"badge" | "browser" | "iphone" | "studio-display">("badge")
  const [showControls, setShowControls] = useState(false)
  const [controls, setControls] = useState({
    speed: 1,
    particleAmount: 1,
    rainAmount: 1,
    turbulence: 1,
    spread: 1,
  })

  if (!isOpen) return null

  const updateControl = (key: keyof typeof controls, val: number) => {
    const next = { ...controls, [key]: val }
    setControls(next)
    try {
      const win = iframeRef.current?.contentWindow as
        | (Window & { __sparkBadgeControls?: typeof controls })
        | null
      if (win && win.__sparkBadgeControls) {
        win.__sparkBadgeControls[key] = val
      }
    } catch {
      // ignore cross-origin if any
    }
  }

  const resetControls = () => {
    const def = { speed: 1, particleAmount: 1, rainAmount: 1, turbulence: 1, spread: 1 }
    setControls(def)
    try {
      const win = iframeRef.current?.contentWindow as
        | (Window & { __sparkBadgeControls?: typeof controls })
        | null
      if (win && win.__sparkBadgeControls) {
        Object.assign(win.__sparkBadgeControls, def)
      }
    } catch {
      // ignore
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Team Credential Badge — thenhom.html"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#12100d]/80 p-3 backdrop-blur-md animate-in fade-in duration-300 sm:p-6"
    >
      <div
        className={`relative flex flex-col overflow-hidden border border-[#d8c8aa]/25 bg-[#080808] text-[#efe5d2] shadow-2xl transition-all duration-500 ${
          isFullscreen
            ? "h-full w-full rounded-none"
            : "h-[86vh] w-full max-w-5xl rounded-2xl"
        }`}
      >
        {/* Top Modal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#12100e] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base font-medium tracking-wide text-[#f5ebd6]">
                  {SITE_CONFIG.teamName} — Credential Spark Badge
                </h2>
                <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                  thenhom.html
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/50">
                {SITE_CONFIG.university} • {SITE_CONFIG.classInfo}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Variant selector built into thenhom.html */}
            <div className="hidden items-center rounded-full border border-white/15 bg-black/50 p-0.5 sm:flex">
              {(["badge", "browser", "iphone", "studio-display"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase transition ${
                    variant === v
                      ? "bg-amber-500/90 font-semibold text-black"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowControls((s) => !s)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase transition ${
                showControls
                  ? "border-amber-400/60 bg-amber-400/20 text-amber-200"
                  : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
              }`}
            >
              <Sliders className="h-3 w-3" />
              <span>Physics</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen((f) => !f)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-rose-500/30 hover:text-white"
              title="Close Team Badge"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Live Particle & Rain Sliders Panel */}
        {showControls && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#181512] px-5 py-2.5 text-xs">
            {(
              [
                ["speed", "Speed"],
                ["particleAmount", "Sparks"],
                ["rainAmount", "Rain"],
                ["turbulence", "Curl Noise"],
                ["spread", "Plume Spread"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 font-mono text-[10px] uppercase text-white/75">
                <span>{label}:</span>
                <input
                  type="range"
                  min={0.2}
                  max={2.2}
                  step={0.1}
                  value={controls[key]}
                  onChange={(e) => updateControl(key, parseFloat(e.target.value))}
                  className="h-1 w-20 accent-amber-400"
                />
                <span className="w-7 text-amber-300">{controls[key].toFixed(1)}x</span>
              </label>
            ))}
            <button
              type="button"
              onClick={resetControls}
              className="inline-flex items-center gap-1 rounded border border-white/15 px-2 py-1 font-mono text-[10px] uppercase text-white/70 hover:bg-white/10"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Embedded thenhom.html Canvas */}
        <div className="relative flex-1 bg-black">
          <iframe
            ref={iframeRef}
            key={variant}
            src={`/modules/thenhom.html?variant=${variant}`}
            title="Team Credential Spark Badge (thenhom.html)"
            className="h-full w-full border-0"
          />
          <div className="pointer-events-none absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/45">
            <span>MOVE CURSOR ACROSS THE CREDENTIAL TO DISTURB THE RAIN &amp; EMBER FIELD</span>
            <span>{SITE_CONFIG.teamCode} // 07 MEMBERS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
