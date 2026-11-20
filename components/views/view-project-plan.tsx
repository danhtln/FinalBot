"use client"

import React from "react"
import { ModuleFrame } from "@/components/motion/immersive-stage"

/**
 * VIEW 4: PROJECT PLAN ("Project Plan" Active)
 * - `sketchbook.html` (text elements set to "Updating") IS the view: rendered edge-to-edge at 100vw x 100vh.
 */
export function ViewProjectPlan() {
  return (
    <ModuleFrame
      src="/modules/sketchbook.html?nointro=1"
      title="Project Plan Sketchbook (sketchbook.html)"
      label="04 — Sketchbook"
      ink="#1e1b16"
    />
  )
}
