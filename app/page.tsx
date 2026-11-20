"use client"

import React, { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Layer0Landing } from "@/components/layer0-landing"
import { TopHeader, DashboardTabId, DASHBOARD_TABS } from "@/components/top-header"
import { LeftSidebar } from "@/components/left-sidebar"
import { TeamBadgeModal } from "@/components/team-badge-modal"
import { GeminiChatbotFab } from "@/components/gemini-chatbot-fab"
import { ViewHome } from "@/components/views/view-home"
import { ViewMinutesRules } from "@/components/views/view-minutes-rules"
import { ViewMembers } from "@/components/views/view-members"
import { ViewProjectPlan } from "@/components/views/view-project-plan"
import { ViewDocuments } from "@/components/views/view-documents"
import { ViewArchitecture } from "@/components/views/view-architecture"
import { ViewProducts } from "@/components/views/view-products"
import { ViewDevLog } from "@/components/views/view-devlog"
import { ImmersiveStage } from "@/components/motion/immersive-stage"
import { ViewChoreography, refreshChoreography } from "@/components/motion/view-choreography"
import {
  REDUCED_TAB_VARIANTS,
  TEXT_TAB_VARIANTS,
  type TextTabId,
} from "@/components/motion/tab-transitions"
import { Layers } from "lucide-react"
import { SITE_CONFIG } from "@/lib/config"

// Tabs whose view IS a standalone HTML module: rendered at 100vw x 100vh, no app chrome.
// The value is the module's own canvas color, used as the stage backdrop while it boots.
const IMMERSIVE_TAB_TONES: Partial<Record<DashboardTabId, string>> = {
  members: "#d8c9ad", // thanhvien.html
  plan: "#ece7dc", // sketchbook.html
  documents: "#171a24", // tailieu.html
  architecture: "#29251d", // congcu.html
}

export default function PortfolioSPA() {
  const [hasMounted, setHasMounted] = useState(false)

  // Layer 0 vs Layer 1 state
  const [showLayer0, setShowLayer0] = useState(true)
  const [isTransitioningLayer0, setIsTransitioningLayer0] = useState(false)

  // Active Tab across the 8 Dashboard Views
  const [activeTab, setActiveTab] = useState<DashboardTabId>("home")

  // Team Badge Modal (thenhom.html)
  const [isTeamBadgeOpen, setIsTeamBadgeOpen] = useState(false)

  // Optional member index to auto-open in View 3 (Members)
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null)

  const reduceMotion = useReducedMotion()
  const immersiveTone = IMMERSIVE_TAB_TONES[activeTab]
  const isImmersive = immersiveTone !== undefined
  // Views mount only once Layer 1 is (becoming) visible, so their entrance plays on screen.
  const isWorkspaceVisible = !showLayer0 || isTransitioningLayer0

  useEffect(() => {
    setHasMounted(true)
    if (typeof window !== "undefined") {
      (window as unknown as { __TEAM_CONFIG: unknown }).__TEAM_CONFIG = SITE_CONFIG
    }
  }, [])

  // Smooth transition from Layer 0 -> Layer 1
  const handleInitializeWorkspace = useCallback(() => {
    setIsTransitioningLayer0(true)
    setTimeout(() => {
      setShowLayer0(false)
      setIsTransitioningLayer0(false)
    }, 680)
  }, [])

  // Return to Layer 0 Landing Page at any time
  const handleReturnToLayer0 = useCallback(() => {
    setShowLayer0(true)
    setIsTransitioningLayer0(false)
  }, [])

  return (
    <div
      suppressHydrationWarning
      className="relative h-screen w-screen overflow-hidden bg-[#f6f2e9] text-[#1e1b16]"
    >
      {hasMounted ? (
        <>
          {/* =====================================================================
              LAYER 0: CINEMATIC LANDING PAGE (100vw x 100vh)
              Includes WebGL2 getstartedbutton.html CTA button & custom HTML slot
             ===================================================================== */}
          {showLayer0 && (
            <Layer0Landing
              onInitialize={handleInitializeWorkspace}
              isTransitioning={isTransitioningLayer0}
            />
          )}

          {/* =====================================================================
              LAYER 1: MAIN WORKSPACE (Fixed 100vh App Shell — No Full-Page Scroll)
             ===================================================================== */}
          <div
            className={`flex h-screen w-screen flex-col transition-all duration-700 ${
              showLayer0 && !isTransitioningLayer0
                ? "pointer-events-none scale-[0.985] opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            {/* 1. TOP HEADER (Navigation Bar: Logo Slot, Team Badge thenhom.html, 8 Tabs, Quick Search)
                On immersive module tabs it auto-hides above the module (pull-tab / top edge to reveal). */}
            <TopHeader
              activeTab={activeTab}
              immersive={isImmersive}
              onSelectTab={(tab) => setActiveTab(tab)}
              onOpenTeamBadge={() => setIsTeamBadgeOpen(true)}
              onSelectMemberFromSearch={(idx) => setSelectedMemberIndex(idx)}
            />

            {/* 2. LEFT SIDEBAR (Fixed on left: Facebook, Zalo, Discord social links + Bonus Info) */}
            <LeftSidebar
              collapsed={isImmersive}
              onReturnToLayer0={handleReturnToLayer0}
              onOpenBadgeModal={() => setIsTeamBadgeOpen(true)}
            />

            {/* 3. VIEW AREA — one view at a time, each with its own signature transition */}
            <AnimatePresence mode="wait">
              {isWorkspaceVisible &&
                (immersiveTone ? (
                  /* 3a. IMMERSIVE MODULE TABS: the HTML module is the whole view (100vw x 100vh) */
                  <ImmersiveStage key={activeTab} tone={immersiveTone}>
                    {activeTab === "members" && (
                      <ViewMembers
                        initialSelectedMemberIndex={selectedMemberIndex}
                        onClearInitialMember={() => setSelectedMemberIndex(null)}
                      />
                    )}
                    {activeTab === "plan" && <ViewProjectPlan />}
                    {activeTab === "documents" && <ViewDocuments />}
                    {activeTab === "architecture" && <ViewArchitecture />}
                  </ImmersiveStage>
                ) : (
                  /* 3b. CONTENT TABS: scrolling viewport, Framer page transition + GSAP choreography */
                  <motion.main
                    key={activeTab}
                    id="dynamic-viewport"
                    variants={
                      reduceMotion
                        ? REDUCED_TAB_VARIANTS
                        : TEXT_TAB_VARIANTS[activeTab as TextTabId]
                    }
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    onAnimationComplete={(definition) => {
                      if (definition === "enter") refreshChoreography()
                    }}
                    className="mt-16 flex-1 overflow-y-auto overflow-x-hidden pb-24 lg:ml-14"
                  >
                    {/* Subtle Sub-bar showing current active view & quick return to Layer 0 */}
                    <div className="border-b border-[#2b2721]/8 bg-[#efe9da]/55 px-4 py-1.5 sm:px-8">
                      <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/60">
                        <span>
                          LAYER 01 WORKSPACE // ACTIVE VIEW:{" "}
                          <strong className="text-[#7c532d]">
                            {DASHBOARD_TABS.find((t) => t.id === activeTab)?.number} —{" "}
                            {DASHBOARD_TABS.find((t) => t.id === activeTab)?.label}
                          </strong>
                        </span>
                        <button
                          type="button"
                          onClick={handleReturnToLayer0}
                          className="inline-flex items-center gap-1 text-[#7c532d] hover:underline"
                        >
                          <Layers className="h-3 w-3" />
                          <span>Replay Layer 0 Intro</span>
                        </button>
                      </div>
                    </div>

                    <ViewChoreography preset={activeTab as TextTabId}>
                      {activeTab === "home" && (
                        <ViewHome
                          onSelectTab={(tab) => setActiveTab(tab)}
                          onOpenTeamBadgeModal={() => setIsTeamBadgeOpen(true)}
                          onSelectMember={(idx) => setSelectedMemberIndex(idx)}
                        />
                      )}
                      {activeTab === "minutes" && <ViewMinutesRules />}
                      {activeTab === "products" && <ViewProducts />}
                      {activeTab === "devlog" && <ViewDevLog />}
                    </ViewChoreography>
                  </motion.main>
                ))}
            </AnimatePresence>

            {/* 4. FLOATING ACTION BUTTON (FAB): AI CHATBOT (Bottom-Right Corner) */}
            <GeminiChatbotFab />

            {/* 5. TEAM BADGE MODAL (Triggered from Top Header or Home Card -> displays thenhom.html) */}
            <TeamBadgeModal
              isOpen={isTeamBadgeOpen}
              onClose={() => setIsTeamBadgeOpen(false)}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
