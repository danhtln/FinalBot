import type { Variants } from "framer-motion"

/**
 * Signature page transitions (Framer Motion) for the content tabs.
 * Each tab has its own entrance/exit so switching views reads as a distinct "cut":
 *   01 Home      — Aperture: a lens opening from the hero, de-blurring into focus
 *   02 Minutes   — Ledger: the page swings down from its top hinge in 3D
 *   07 Products  — Shutter: a skewed horizontal wipe, like a gallery panel sliding in
 *   08 Dev Log   — Film gate: the frame opens from a center slit with a projector flash
 * Every entrance ends with `transitionEnd` resetting clip/filter to "none" so the
 * scroll container keeps no containing block or compositing cost once it lands.
 */

export type TextTabId = "home" | "minutes" | "products" | "devlog"

const EXPO_OUT = [0.16, 1, 0.3, 1] as const
const EXPO_IN = [0.7, 0, 0.84, 0] as const
const QUART_OUT = [0.25, 1, 0.5, 1] as const

export const TEXT_TAB_VARIANTS: Record<TextTabId, Variants> = {
  home: {
    initial: {
      clipPath: "circle(0% at 50% 38%)",
      scale: 1.08,
      filter: "blur(14px)",
    },
    enter: {
      clipPath: "circle(150% at 50% 38%)",
      scale: 1,
      filter: "blur(0px)",
      transition: {
        clipPath: { duration: 1.15, ease: EXPO_OUT },
        scale: { duration: 1.3, ease: EXPO_OUT },
        filter: { duration: 0.9, ease: QUART_OUT },
      },
      transitionEnd: { clipPath: "none", filter: "none" },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: EXPO_IN },
    },
  },

  minutes: {
    initial: {
      opacity: 0,
      y: 90,
      rotateX: -22,
      originY: 0,
      transformPerspective: 1400,
    },
    enter: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      originY: 0,
      transformPerspective: 1400,
      transition: {
        duration: 1.05,
        ease: EXPO_OUT,
        opacity: { duration: 0.45, ease: "linear" },
      },
    },
    exit: {
      opacity: 0,
      y: -60,
      rotateX: 14,
      originY: 0,
      transformPerspective: 1400,
      transition: { duration: 0.42, ease: EXPO_IN },
    },
  },

  products: {
    initial: {
      clipPath: "inset(0% 0% 0% 100%)",
      x: 160,
      skewX: -8,
    },
    enter: {
      clipPath: "inset(0% 0% 0% 0%)",
      x: 0,
      skewX: 0,
      transition: {
        clipPath: { duration: 0.95, ease: EXPO_OUT },
        x: { duration: 1.2, ease: EXPO_OUT },
        skewX: { duration: 1.1, ease: EXPO_OUT },
      },
      transitionEnd: { clipPath: "none" },
    },
    exit: {
      clipPath: "inset(0% 100% 0% 0%)",
      x: -120,
      skewX: 6,
      transition: { duration: 0.45, ease: EXPO_IN },
    },
  },

  devlog: {
    initial: {
      clipPath: "inset(50% 0% 50% 0%)",
      filter: "brightness(2.2) contrast(1.6) sepia(0.7)",
    },
    enter: {
      clipPath: "inset(0% 0% 0% 0%)",
      filter: [
        "brightness(2.2) contrast(1.6) sepia(0.7)",
        "brightness(0.65) contrast(1.25) sepia(0.4)",
        "brightness(1.25) contrast(1.05) sepia(0.15)",
        "brightness(1) contrast(1) sepia(0)",
      ],
      transition: {
        clipPath: { duration: 0.8, ease: EXPO_OUT },
        filter: { duration: 0.9, times: [0, 0.3, 0.6, 1], ease: "linear" },
      },
      transitionEnd: { clipPath: "none", filter: "none" },
    },
    exit: {
      clipPath: "inset(50% 0% 50% 0%)",
      filter: "brightness(1.9) contrast(1.4) sepia(0.5)",
      transition: { duration: 0.4, ease: EXPO_IN },
    },
  },
}

export const REDUCED_TAB_VARIANTS: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}
