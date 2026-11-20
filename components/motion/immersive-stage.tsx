"use client"

import React, { useState } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

/**
 * IMMERSIVE MODULE STAGE
 * Tabs backed by a standalone HTML module (congcu, sketchbook, tailieu, thanhvien)
 * render that module as the entire view: 100vw x 100vh, no cards, no wrappers.
 * The Top Header auto-hides above it (pull-tab to reveal), the sidebar retracts.
 */

const EXPO_OUT = [0.16, 1, 0.3, 1] as const
const EXPO_IN = [0.7, 0, 0.84, 0] as const

const STAGE_VARIANTS: Variants = {
  initial: {
    clipPath: "inset(18% 14% 18% 14% round 36px)",
    opacity: 0,
  },
  enter: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    opacity: 1,
    transition: {
      clipPath: { duration: 1.05, ease: EXPO_OUT },
      opacity: { duration: 0.35, ease: "linear" },
    },
    // Leave no clip/transform behind: fixed children (e.g. member modal) must
    // stay relative to the viewport once the stage has landed.
    transitionEnd: { clipPath: "none" },
  },
  exit: {
    clipPath: "inset(50% 50% 50% 50% round 36px)",
    opacity: 0,
    transition: { duration: 0.45, ease: EXPO_IN },
  },
}

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

interface ImmersiveStageProps {
  children: React.ReactNode
  /** Backdrop shown while the module boots — matches the module's own canvas color. */
  tone: string
}

export function ImmersiveStage({ children, tone }: ImmersiveStageProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      variants={reduceMotion ? REDUCED_VARIANTS : STAGE_VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 z-20 overflow-hidden"
      style={{ backgroundColor: tone }}
    >
      {children}
    </motion.section>
  )
}

interface ModuleFrameProps {
  src: string
  title: string
  /** Short label for the boot veil, e.g. "06 — Field Manuals". */
  label: string
  /** Text color of the boot veil, contrasting with the stage tone. */
  ink: string
}

/**
 * The module itself: an edge-to-edge iframe. A boot veil covers the frame until
 * the document has loaded, then lifts away so the module is the only thing on screen.
 */
export function ModuleFrame({ src, title, label, ink }: ModuleFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <motion.iframe
        src={src}
        title={title}
        onLoad={() => setIsLoaded(true)}
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: EXPO_OUT }}
        className="absolute inset-0 h-full w-full border-0"
      />

      <motion.div
        aria-hidden={isLoaded}
        initial={false}
        animate={
          isLoaded
            ? { clipPath: "inset(0% 0% 100% 0%)", transitionEnd: { display: "none" } }
            : { clipPath: "inset(0% 0% 0% 0%)", display: "flex" }
        }
        transition={{ duration: 0.85, ease: EXPO_OUT, delay: 0.15 }}
        className="pointer-events-none absolute inset-0 flex-col items-center justify-center gap-4"
        style={{ color: ink, background: "inherit" }}
      >
        <span className="font-mono text-[10px] tracking-[0.32em] uppercase opacity-70">
          Loading module
        </span>
        <span className="font-serif text-3xl tracking-tight sm:text-5xl">{label}</span>
        <span className="relative mt-2 h-px w-48 overflow-hidden bg-current/20">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/3 bg-current"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </>
  )
}
