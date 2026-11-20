"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/config"
import { WebGLGetStartedButton } from "@/components/webgl-get-started-button"
import { Sparkles, Compass, ArrowUpRight } from "lucide-react"

interface Layer0LandingProps {
  onInitialize: () => void
  isTransitioning: boolean
}

/**
 * LAYER 0: CINEMATIC LANDING PAGE
 * - Features animated "Final Bot" hero title
 * - Dedicated background video slot (/public/videos/background.mp4 or /public/background.mp4)
 * - Retains the WebGL2 Skeuomorphic CTA Button ("Get Started")
 */
export function Layer0Landing({ onInitialize, isTransitioning }: Layer0LandingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activePillar, setActivePillar] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Listen for postMessage from custom /layer0/index.html or getstartedbutton iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data && e.data.type === "LAYER0_INITIALIZE") {
        onInitialize()
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [onInitialize])

  // Subtle astrolabe & dust mote canvas animation fallback
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const motes = Array.from({ length: 56 }, (_, i) => ({
      x: ((i * 137.5) % 100) / 100,
      y: ((i * 73.1) % 100) / 100,
      r: 0.8 + (i % 4) * 0.55,
      vx: (i % 2 === 0 ? 1 : -1) * (0.00004 + (i % 5) * 0.000015),
      vy: -0.00006 - (i % 4) * 0.00002,
      phase: i * 0.9,
    }))

    const draw = (now: number) => {
      const t = now * 0.001
      ctx.clearRect(0, 0, width, height)

      const cx = width * 0.5
      const cy = height * 0.46
      const baseR = Math.min(width, height) * 0.36

      ctx.save()
      ctx.translate(cx, cy)

      const radii = [baseR * 0.48, baseR * 0.78, baseR * 1.08, baseR * 1.38]
      radii.forEach((r, idx) => {
        ctx.beginPath()
        ctx.strokeStyle =
          idx % 2 === 0 ? "rgba(43, 39, 33, 0.075)" : "rgba(154, 106, 62, 0.09)"
        ctx.lineWidth = 1
        if (idx === 1 || idx === 3) {
          ctx.setLineDash([3, 9])
        } else {
          ctx.setLineDash([])
        }
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.stroke()

        const angle = t * (idx % 2 === 0 ? 0.12 : -0.08) + idx * 1.57
        const nx = Math.cos(angle) * r
        const ny = Math.sin(angle) * r
        ctx.setLineDash([])
        ctx.fillStyle = "rgba(154, 106, 62, 0.45)"
        ctx.beginPath()
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.strokeStyle = "rgba(43, 39, 33, 0.045)"
      ctx.beginPath()
      ctx.moveTo(-baseR * 1.5, 0)
      ctx.lineTo(baseR * 1.5, 0)
      ctx.moveTo(0, -baseR * 1.5)
      ctx.lineTo(0, baseR * 1.5)
      ctx.stroke()
      ctx.restore()

      motes.forEach((m) => {
        m.x = (m.x + m.vx + 1) % 1
        m.y = (m.y + m.vy + 1) % 1
        const alpha = 0.15 + 0.2 * Math.sin(t * 1.2 + m.phase)
        ctx.fillStyle = `rgba(138, 96, 54, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(m.x * width, m.y * height, m.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // If the developer enabled custom HTML file mode in config.js / lib/config.ts
  if (SITE_CONFIG.layer0.useCustomHtmlFile) {
    return (
      <section
        aria-label="Layer 0 Custom Landing Page"
        className={`fixed inset-0 z-50 bg-[#f6f3ec] transition-all duration-1000 ${
          isTransitioning ? "scale-105 opacity-0 blur-md pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <iframe
          src={SITE_CONFIG.layer0.customHtmlPath}
          title="Layer 0 Custom Source"
          className="h-full w-full border-0"
        />
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <WebGLGetStartedButton label={SITE_CONFIG.layer0.ctaLabel} onClick={onInitialize} scale={0.38} />
        </div>
      </section>
    )
  }

  const validPillars = SITE_CONFIG.layer0.philosophicalPillars?.filter((p) => p.title?.trim()) || []

  return (
    <section
      aria-label="Layer 0 Cinematic Landing"
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-[#f6f2e9] text-[#1f1c17] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isTransitioning
          ? "scale-[1.06] opacity-0 blur-xl pointer-events-none"
          : "scale-100 opacity-100 blur-0"
      }`}
    >
      {/* =====================================================================
          1. BACKGROUND VIDEO SLOT:
          Place your video file into /public/videos/background.mp4 or /public/background.mp4.
          When present, it auto-plays seamlessly as the full-viewport background!
         ===================================================================== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
        className={`pointer-events-none fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-65" : "opacity-0"
        }`}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        <source src="/videos/background.webm" type="video/webm" />
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Ambient paper wash & astrolabe canvas overlay */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 transition-opacity duration-1000 ${
          videoLoaded ? "bg-black/25 backdrop-blur-[0.5px]" : ""
        }`}
        style={
          videoLoaded
            ? undefined
            : {
                background:
                  "radial-gradient(circle at 50% 38%, rgba(255, 252, 245, 0.92) 0%, rgba(242, 236, 223, 0.78) 52%, rgba(230, 220, 202, 0.95) 100%)",
              }
        }
      />
      {!videoLoaded && (
        <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      )}

      {/* Top Architectural Frame Bar */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#2b2721]/10 px-6 py-4 md:px-12 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2b2721]/25 bg-[#ece5d5] font-serif text-xs font-semibold italic text-[#7c532d]">
            Φ
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#2b2721]/60">
              LAYER 00 // INITIAL ENTRY
            </p>
            <p className="text-xs font-medium tracking-wide text-[#2b2721]">
              {SITE_CONFIG.university} — {SITE_CONFIG.faculty}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2b2721]/15 bg-white/60 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-[#7c532d] shadow-2xs backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9a6a3e] animate-pulse" />
            <span>FINAL BOT</span>
          </span>
        </div>
      </header>

      {/* Main Centerpiece Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2b2721]/15 bg-white/65 px-4 py-1.5 shadow-2xs backdrop-blur-sm">
          <Compass className="h-3.5 w-3.5 text-[#9a6a3e]" />
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#2b2721]/80 font-medium">
            {SITE_CONFIG.layer0.kicker || "HCMUS • FIT • GROUP 06"}
          </span>
        </div>

        {/* =====================================================================
            ANIMATED "FINAL BOT" HERO TITLE
           ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-6 flex flex-col items-center justify-center select-none"
        >
          {/* Ambient luminous aura */}
          <div className="pointer-events-none absolute -inset-x-12 -inset-y-8 rounded-full bg-gradient-to-r from-[#9a6a3e]/15 via-[#d4a26a]/25 to-[#7c532d]/15 blur-3xl" />

          <h1 className="relative flex items-center justify-center font-mono text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="relative inline-flex bg-gradient-to-br from-[#1e1b16] via-[#7c532d] to-[#b37a44] bg-clip-text text-transparent drop-shadow-sm">
              {"Final Bot".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 32, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.05,
                    duration: 0.65,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "160px", opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="mt-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#9a6a3e] to-transparent"
          />
        </motion.div>

        {SITE_CONFIG.classInfo && (
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#2b2721]/60">
            {SITE_CONFIG.classInfo}
          </p>
        )}

        {/* Optional Philosophical Pillars (only rendered if populated) */}
        {validPillars.length > 0 && (
          <div className="mt-7 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {validPillars.map((pillar, idx) => {
              const active = activePillar === idx
              return (
                <button
                  key={pillar.numeral || idx}
                  type="button"
                  onMouseEnter={() => setActivePillar(idx)}
                  onClick={() => setActivePillar(idx)}
                  className={`group rounded-xl border p-3.5 text-left transition-all duration-300 ${
                    active
                      ? "border-[#9a6a3e]/50 bg-white/85 shadow-md -translate-y-0.5"
                      : "border-[#2b2721]/12 bg-white/45 hover:bg-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs italic font-semibold text-[#9a6a3e]">
                      Pillar {pillar.numeral} {pillar.latin ? `— ${pillar.latin}` : ""}
                    </span>
                    <Sparkles
                      className={`h-3.5 w-3.5 transition-opacity ${
                        active ? "opacity-100 text-[#9a6a3e]" : "opacity-0"
                      }`}
                    />
                  </div>
                  <p className="mt-1 font-serif text-sm font-medium text-[#1e1b16]">
                    {pillar.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#2b2721]/70">
                    {pillar.summary}
                  </p>
                </button>
              )
            })}
          </div>
        )}

        {/* =====================================================================
            ACTION BUTTON: WebGL Get Started Button (Preserved intact)
           ===================================================================== */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <WebGLGetStartedButton
            label={SITE_CONFIG.layer0.ctaLabel || "GET STARTED"}
            onClick={onInitialize}
            scale={0.39}
          />
          {SITE_CONFIG.layer0.ctaSubLabel && (
            <button
              type="button"
              onClick={onInitialize}
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#2b2721]/65 transition hover:text-[#1e1b16]"
            >
              <span>{SITE_CONFIG.layer0.ctaSubLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Footnote Bar */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#2b2721]/10 px-6 py-3.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[#2b2721]/55 md:px-12 backdrop-blur-xs">
        <span>{SITE_CONFIG.teamName}</span>
        <span>COORDINATES: {SITE_CONFIG.sidebarBonusInfo.coordinates}</span>
        <span>CLICK &ldquo;GET STARTED&rdquo; TO INITIALIZE LAYER 01</span>
      </footer>
    </section>
  )
}
