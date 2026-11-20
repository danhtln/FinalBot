"use client"

import React from "react"
import { ModuleFrame } from "@/components/motion/immersive-stage"

/**
 * VIEW 5: DOCUMENTS ("Documents" Active)
 * - `tailieu.html` (unmodified Three.js library) IS the view: rendered edge-to-edge at 100vw x 100vh.
 */
export function ViewDocuments() {
  return (
    <ModuleFrame
      src="/modules/tailieu.html"
      title="Working Volumes — Seven Tools for Making (tailieu.html)"
      label="05 — Working Volumes"
      ink="#f4eee6"
    />
  )
}
