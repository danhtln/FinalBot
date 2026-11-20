"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { SITE_CONFIG, TeamMember } from "@/lib/config"
import { ModuleFrame } from "@/components/motion/immersive-stage"
import {
  FileText,
  Maximize2,
  Minimize2,
  ExternalLink,
  X,
  CheckCircle2,
  UserCheck,
  Link2,
} from "lucide-react"

interface ViewMembersProps {
  initialSelectedMemberIndex?: number | null
  onClearInitialMember?: () => void
}

/**
 * VIEW 3: MEMBERS ("Members" Active)
 * ├── thanhvien.html filmstrip (7 people, file structure kept) rendered as the whole view, 100vw x 100vh
 * └── Modal Popup for Member Details (Opens on click):
 *     └── Frame to open work progress from that member's personal Google Docs, with a full-screen option.
 */
export function ViewMembers({
  initialSelectedMemberIndex,
  onClearInitialMember,
}: ViewMembersProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isDocsFullscreen, setIsDocsFullscreen] = useState(false)
  const [docsViewMode, setDocsViewMode] = useState<"structured" | "iframe">("structured")
  const [customDocUrl, setCustomDocUrl] = useState("")

  // Open modal if navigated from search or home
  useEffect(() => {
    if (
      typeof initialSelectedMemberIndex === "number" &&
      SITE_CONFIG.members[initialSelectedMemberIndex]
    ) {
      const m = SITE_CONFIG.members[initialSelectedMemberIndex]
      setSelectedMember(m)
      setCustomDocUrl(m.googleDocsUrl)
      onClearInitialMember?.()
    }
  }, [initialSelectedMemberIndex, onClearInitialMember])

  // Listen for postMessage from embedded thanhvien.html when any of the 7 member cards is clicked
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "OPEN_MEMBER_MODAL") {
        const idx = Number(event.data.memberIndex)
        const matched =
          SITE_CONFIG.members[idx] ||
          SITE_CONFIG.members.find((m) => m.name === event.data.profile?.name) ||
          SITE_CONFIG.members[0]
        setSelectedMember(matched)
        setCustomDocUrl(matched.googleDocsUrl)
        setIsDocsFullscreen(false)
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member)
    setCustomDocUrl(member.googleDocsUrl)
    setIsDocsFullscreen(false)
  }

  return (
    <>
      {/* thanhvien.html (7-member filmstrip) IS the view: edge-to-edge at 100vw x 100vh.
          Clicking a card inside it posts OPEN_MEMBER_MODAL, handled above. */}
      <ModuleFrame
        src="/modules/thanhvien.html"
        title="7-Member Character Filmstrip (thanhvien.html)"
        label="03 — The Seven"
        ink="#2b2721"
      />

      {/* =====================================================================
          MODAL POPUP FOR MEMBER DETAILS + GOOGLE DOCS PROGRESS FRAME
          Portaled to <body> so it layers above the app header, not inside the module stage.
         ===================================================================== */}
      {selectedMember &&
        createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedMember.name} — Work Progress & Google Docs`}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#14110d]/75 p-2 backdrop-blur-md animate-in fade-in duration-200 sm:p-5"
            >
              <div
                className={`relative flex flex-col overflow-hidden border border-[#2b2721]/25 bg-[#faf7f0] text-[#1e1b16] shadow-2xl transition-all duration-300 ${
                  isDocsFullscreen
                    ? "fixed inset-0 z-50 h-screen w-screen rounded-none"
                    : "h-[88vh] w-full max-w-6xl rounded-3xl"
                }`}
              >
                {/* Modal Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2b2721]/12 bg-[#efe9da] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#9a6a3e]/40 bg-[#1e1b16] shadow-xs">
                      {selectedMember.avatarUrl ? (
                        <img
                          src={selectedMember.avatarUrl}
                          alt={selectedMember.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      ) : null}
                      <span className="font-mono text-xs font-bold text-[#e5b879]">
                        {selectedMember.index}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-lg font-semibold text-[#1e1b16]">
                          {selectedMember.name}
                        </h2>
                        <span className="rounded bg-[#9a6a3e]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#7c532d]">
                          MSSV: {selectedMember.studentId}
                        </span>
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#2b2721]/65">
                        {selectedMember.role} • {selectedMember.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Switch between Live Formatted Google Docs Sheet & Raw Iframe Embed */}
                    <div className="flex items-center rounded-full border border-[#2b2721]/15 bg-white p-0.5">
                      <button
                        type="button"
                        onClick={() => setDocsViewMode("structured")}
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase transition ${
                          docsViewMode === "structured"
                            ? "bg-[#1e1b16] text-[#f6f2e9]"
                            : "text-[#2b2721]/70 hover:text-[#1e1b16]"
                        }`}
                      >
                        Live Progress Doc
                      </button>
                      <button
                        type="button"
                        onClick={() => setDocsViewMode("iframe")}
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase transition ${
                          docsViewMode === "iframe"
                            ? "bg-[#1e1b16] text-[#f6f2e9]"
                            : "text-[#2b2721]/70 hover:text-[#1e1b16]"
                        }`}
                      >
                        Google Docs Iframe
                      </button>
                    </div>

                    {/* FULL-SCREEN OPTION BUTTON */}
                    <button
                      type="button"
                      onClick={() => setIsDocsFullscreen((f) => !f)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#9a6a3e]/40 bg-[#9a6a3e] px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase text-white transition hover:bg-[#7c532d]"
                    >
                      {isDocsFullscreen ? (
                        <>
                          <Minimize2 className="h-3.5 w-3.5" />
                          <span>Exit Full-Screen</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span>Full-Screen Google Docs</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMember(null)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#2b2721]/20 bg-white text-[#1e1b16] transition hover:bg-rose-600 hover:text-white"
                      title="Close Modal"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Modal Body: Split Member Details + Google Docs Frame */}
                <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
                  {/* Left 4 Columns: Member Details (Hidden when Full-Screen is toggled so Google Docs fills 100%) */}
                  {!isDocsFullscreen && (
                    <div className="space-y-5 overflow-y-auto border-b border-[#2b2721]/12 bg-[#f5f0e4] p-5 lg:col-span-4 lg:border-r lg:border-b-0">
                      {/* Member Portrait Card */}
                      {selectedMember.avatarUrl && (
                        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-[#2b2721]/15 bg-[#1e1b16] shadow-xs">
                          <img
                            src={selectedMember.avatarUrl}
                            alt={selectedMember.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const parent = e.currentTarget.parentElement
                              if (parent) parent.style.display = "none"
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 text-white">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#e5b879]">
                              MEMBER {selectedMember.index} • PORTRAIT
                            </span>
                            <p className="font-serif text-sm font-semibold">{selectedMember.name}</p>
                          </div>
                        </div>
                      )}

                      <div className="rounded-2xl border border-[#2b2721]/12 bg-white p-4">
                        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#9a6a3e]">
                          PHILOSOPHICAL MOTTO
                        </p>
                        <p className="mt-1.5 font-serif text-sm italic leading-relaxed text-[#1e1b16]">
                          &ldquo;{selectedMember.philosophicalMotto}&rdquo;
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#2b2721]/12 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-semibold uppercase text-[#2b2721]/65">
                            OVERALL COMPLETION
                          </span>
                          <span className="font-mono text-sm font-bold text-[#7c532d]">
                            {selectedMember.progressPercent}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#2b2721]/10">
                          <div
                            className="h-full rounded-full bg-[#9a6a3e]"
                            style={{ width: `${selectedMember.progressPercent}%` }}
                          />
                        </div>
                        <p className="mt-2 font-mono text-[10px] text-[#2b2721]/65">
                          {selectedMember.completedTasks} of {selectedMember.totalTasks} assigned deliverables verified
                        </p>
                      </div>

                      <div>
                        <h3 className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-[#9a6a3e]">
                          KEY CONTRIBUTIONS
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {selectedMember.keyContributions.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 rounded-xl bg-white p-2.5 text-xs text-[#1e1b16]"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9a6a3e]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quick Switcher to other 7 members */}
                      <div>
                        <h3 className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-[#2b2721]/55">
                          SWITCH TEAM MEMBER (01 – 07)
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {SITE_CONFIG.members.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => openMemberModal(m)}
                              className={`rounded-lg px-2.5 py-1 font-mono text-[10px] transition ${
                                m.id === selectedMember.id
                                  ? "bg-[#1e1b16] font-bold text-[#e5b879]"
                                  : "bg-white text-[#2b2721]/75 hover:bg-[#ece4d4]"
                              }`}
                            >
                              {m.index}. {m.name.split(" ").pop()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right 8 Columns (or 12 in Full-Screen): Personal Google Docs Work Progress Frame */}
                  <div
                    className={`flex flex-col overflow-hidden bg-white ${
                      isDocsFullscreen ? "lg:col-span-12" : "lg:col-span-8"
                    }`}
                  >
                    {/* Google Docs URL Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2b2721]/10 bg-[#f8f9fa] px-4 py-2">
                      <div className="flex flex-1 items-center gap-2 min-w-[220px]">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#4285F4] text-white">
                          <FileText className="h-3.5 w-3.5" />
                        </span>
                        <input
                          type="text"
                          value={customDocUrl}
                          onChange={(e) => setCustomDocUrl(e.target.value)}
                          aria-label="Personal Google Docs URL"
                          className="w-full rounded border border-black/10 bg-white px-2.5 py-1 font-mono text-[11px] text-[#1e1b16] outline-none focus:border-[#4285F4]"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={customDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded border border-black/15 bg-white px-2.5 py-1 font-mono text-[10px] text-[#1e1b16] hover:bg-black/5"
                        >
                          <span>Open External</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    {/* Frame Content */}
                    {docsViewMode === "iframe" &&
                    !customDocUrl.includes("placeholder_member") ? (
                      <iframe
                        src={customDocUrl}
                        title={`${selectedMember.name} Google Docs Work Progress`}
                        className="h-full w-full flex-1 border-0"
                      />
                    ) : (
                      <div className="flex-1 overflow-y-auto bg-[#f1f3f4] p-4 sm:p-8">
                        {/* Authentic Google Docs Paper Sheet View */}
                        <div className="mx-auto max-w-3xl rounded-sm border border-black/10 bg-white p-6 shadow-md sm:p-12">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-4">
                            <div className="flex items-center gap-2 text-xs text-[#4285F4]">
                              <FileText className="h-4 w-4" />
                              <span className="font-mono font-semibold uppercase">
                                GOOGLE DOCS WORK PROGRESS LOG // HCMUS FIT GROUP 07
                              </span>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
                              Synced • Last edited Sunday 20:45 ICT
                            </span>
                          </div>

                          <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1e1b16] sm:text-3xl">
                            Personal Work Progress Report — {selectedMember.name}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-[#2b2721]/65">
                            Student ID: {selectedMember.studentId} • Role: {selectedMember.role} • Email:{" "}
                            {selectedMember.email}
                          </p>

                          <div className="mt-6 rounded-xl border border-[#4285F4]/25 bg-[#4285F4]/5 p-4 text-xs text-[#1e1b16]">
                            <div className="flex items-center gap-2 font-semibold text-[#1a73e8]">
                              <Link2 className="h-4 w-4" />
                              <span>How to connect your live personal Google Docs embed:</span>
                            </div>
                            <p className="mt-1 leading-relaxed text-[#2b2721]/80">
                              In Google Docs, click <strong>File → Share → Publish to web → Embed</strong>, copy the{" "}
                              <code className="rounded bg-white px-1 font-mono">https://docs.google.com/document/d/e/.../pub?embedded=true</code>{" "}
                              link, and paste it into <code className="rounded bg-white px-1 font-mono">googleDocsUrl</code> for{" "}
                              <strong>{selectedMember.name}</strong> in <code className="rounded bg-white px-1 font-mono">config.js</code> or{" "}
                              <code className="rounded bg-white px-1 font-mono">lib/config.ts</code> (or paste it in the URL bar above and click &ldquo;Google Docs Iframe&rdquo;).
                            </p>
                          </div>

                          <div className="mt-6 space-y-4">
                            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#1e1b16]">
                              1. Current Sprint Focus
                            </h4>
                            <p className="rounded-lg bg-[#f8f9fa] p-3.5 text-sm text-[#2b2721]/85">
                              {selectedMember.currentFocus}
                            </p>

                            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#1e1b16]">
                              2. Weekly Sprint Log Breakdown
                            </h4>
                            <div className="overflow-hidden rounded-xl border border-black/10">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-[#f8f9fa] font-mono text-[10px] uppercase text-[#2b2721]/65">
                                  <tr>
                                    <th className="px-4 py-2.5">Timeline</th>
                                    <th className="px-4 py-2.5">Deliverable &amp; Progress Notes</th>
                                    <th className="px-4 py-2.5">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-black/10">
                                  {selectedMember.weeklyLogs.map((log, i) => (
                                    <tr key={i}>
                                      <td className="whitespace-nowrap px-4 py-3 font-mono font-semibold text-[#7c532d]">
                                        {log.week}
                                      </td>
                                      <td className="px-4 py-3 text-[#1e1b16]">{log.summary}</td>
                                      <td className="whitespace-nowrap px-4 py-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800">
                                          <UserCheck className="h-3 w-3" />
                                          {log.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <h4 className="font-mono text-xs font-bold tracking-wider uppercase text-[#1e1b16]">
                              3. Philosophical Reflection on &ldquo;The True Meaning of Life&rdquo;
                            </h4>
                            <blockquote className="border-l-2 border-[#9a6a3e] pl-4 font-serif text-sm italic text-[#2b2721]/85">
                              &ldquo;{selectedMember.philosophicalMotto}&rdquo;
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>,
          document.body
        )}
    </>
  )
}
