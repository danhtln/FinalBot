"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { SITE_CONFIG } from "@/lib/config"
import {
  Search,
  Sparkles,
  Home,
  ScrollText,
  Users,
  CalendarRange,
  BookOpen,
  Cpu,
  Layers,
  Film,
  X,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

export type DashboardTabId =
  | "home"
  | "minutes"
  | "members"
  | "plan"
  | "documents"
  | "architecture"
  | "products"
  | "devlog"

export interface TabDefinition {
  id: DashboardTabId
  number: string
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
}

export const DASHBOARD_TABS: TabDefinition[] = [
  { id: "home", number: "01", label: "Home", shortLabel: "Home", icon: Home },
  { id: "minutes", number: "02", label: "Minutes & Rules", shortLabel: "Minutes & Rules", icon: ScrollText },
  { id: "members", number: "03", label: "Members", shortLabel: "Members", icon: Users },
  { id: "plan", number: "04", label: "Project Plan", shortLabel: "Project Plan", icon: CalendarRange },
  { id: "documents", number: "05", label: "Documents", shortLabel: "Documents", icon: BookOpen },
  {
    id: "architecture",
    number: "06",
    label: "Architecture & Technologies",
    shortLabel: "Architecture",
    icon: Cpu,
  },
  { id: "products", number: "07", label: "Products", shortLabel: "Products", icon: Layers },
  {
    id: "devlog",
    number: "08",
    label: "Dev Log & Behind the Scenes",
    shortLabel: "Dev Log",
    icon: Film,
  },
]

interface SearchResultItem {
  id: string
  title: string
  subtitle: string
  category: string
  tabId: DashboardTabId
  memberIndex?: number
}

interface TopHeaderProps {
  activeTab: DashboardTabId
  /** Immersive module tab: the header tucks away above the full-viewport module. */
  immersive?: boolean
  onSelectTab: (tab: DashboardTabId) => void
  onOpenTeamBadge: () => void
  onSelectMemberFromSearch?: (memberIndex: number) => void
}

export function TopHeader({
  activeTab,
  immersive = false,
  onSelectTab,
  onOpenTeamBadge,
  onSelectMemberFromSearch,
}: TopHeaderProps) {
  const [query, setQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Entering (or switching between) immersive tabs tucks the header away again.
  useEffect(() => {
    setIsRevealed(false)
  }, [activeTab, immersive])

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }, [])

  const cancelHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }
  const reveal = () => {
    cancelHide()
    setIsRevealed(true)
  }
  const scheduleHide = () => {
    if (!immersive) return
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setIsRevealed(false), 450)
  }

  const isTuckedAway = immersive && !isRevealed && !searchFocused
  const activeTabDef = DASHBOARD_TABS.find((t) => t.id === activeTab)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
      }
    }
    window.addEventListener("mousedown", handleClickOutside)
    return () => window.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Build unified search index across all 8 views & config data
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [
      ...DASHBOARD_TABS.map((t) => ({
        id: `tab-${t.id}`,
        title: `Tab ${t.number}: ${t.label}`,
        subtitle: `Navigate directly to ${t.label} view`,
        category: "Navigation",
        tabId: t.id,
      })),
      ...SITE_CONFIG.members.map((m, idx) => ({
        id: `mem-${m.id}`,
        title: `${m.name} (${m.studentId})`,
        subtitle: `${m.role} — ${m.specialty}`,
        category: "Member (View 3)",
        tabId: "members" as DashboardTabId,
        memberIndex: idx,
      })),
      ...SITE_CONFIG.teamRules.map((r) => ({
        id: `rule-${r.code}`,
        title: `${r.code}: ${r.title}`,
        subtitle: r.description,
        category: "Minutes & Rules (View 2)",
        tabId: "minutes" as DashboardTabId,
      })),
      ...SITE_CONFIG.roadmapStages.map((s) => ({
        id: `stage-${s.id}`,
        title: `${s.phase}: ${s.title}`,
        subtitle: `${s.weeks} • Lead: ${s.lead}`,
        category: "Project Plan (View 4)",
        tabId: "plan" as DashboardTabId,
      })),
      ...SITE_CONFIG.documentCards.map((d) => ({
        id: `doc-${d.id}`,
        title: d.title,
        subtitle: `${d.code} • ${d.author}`,
        category: "Documents (View 5)",
        tabId: "documents" as DashboardTabId,
      })),
      ...SITE_CONFIG.productDemos.map((p) => ({
        id: `prod-${p.id}`,
        title: p.title,
        subtitle: p.subtitle,
        category: "Products (View 7)",
        tabId: "products" as DashboardTabId,
      })),
      ...SITE_CONFIG.weeklyDevLogs.map((l) => ({
        id: `log-${l.week}`,
        title: `${l.week}: ${l.title}`,
        subtitle: `${l.dateRange} • ${l.mood}`,
        category: "Dev Log (View 8)",
        tabId: "devlog" as DashboardTabId,
      })),
    ]
    return items
  }, [])

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return searchIndex.slice(0, 6)
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query, searchIndex])

  return (
    <>
      {/* Top-edge hot zone: hovering the very top of an immersive module brings the header back */}
      {isTuckedAway && (
        <div
          aria-hidden="true"
          onMouseEnter={reveal}
          className="fixed top-0 right-0 left-0 z-40 h-2"
        />
      )}
      <header
        onMouseEnter={immersive ? cancelHide : undefined}
        onMouseLeave={scheduleHide}
        className={`fixed top-0 right-0 left-0 z-40 border-b border-[#2b2721]/12 bg-[#f6f2e9]/92 backdrop-blur-xl transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isTuckedAway ? "-translate-y-full" : "translate-y-0"
        } ${immersive && !isTuckedAway ? "shadow-[0_18px_40px_-24px_rgba(20,17,13,0.55)]" : ""}`}
      >
        <div className="flex h-16 items-center justify-between gap-2 px-3 sm:px-5">
          {/* Left Cluster: Team Logo Placeholder + Team Badge (thenhom.html trigger) */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* 1. Team Logo (Placeholder — configurable via teamLogoUrl in config.js) */}
            <button
              type="button"
              onClick={() => onSelectTab("home")}
              className="group flex items-center gap-2.5 rounded-xl border border-[#2b2721]/15 bg-white/75 px-2.5 py-1.5 text-left transition hover:border-[#9a6a3e]"
              title="Team Logo Placeholder (Set teamLogoUrl in config.js)"
            >
              {SITE_CONFIG.teamLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SITE_CONFIG.teamLogoUrl}
                  alt={SITE_CONFIG.teamName}
                  className="h-7 w-7 rounded-lg object-cover"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-dashed border-[#9a6a3e]/60 bg-[#ece5d5] font-serif text-sm font-semibold italic text-[#7c532d]">
                  Φ
                </span>
              )}
              <div className="hidden sm:block">
                <p className="font-serif text-xs font-semibold leading-none tracking-tight text-[#1e1b16]">
                  {SITE_CONFIG.teamShortName}
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-[0.14em] uppercase text-[#2b2721]/55">
                  LOGO SLOT
                </p>
              </div>
            </button>

            {/* 2. Team Badge (Single element -> triggers transition animation & opens thenhom.html) */}
            <button
              type="button"
              onClick={onOpenTeamBadge}
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#9a6a3e]/45 bg-[#1e1b16] px-3 py-1.5 text-[#f6f2e9] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a26a] hover:bg-[#2c251d]"
              title="Click to launch Team Spark Credential Badge (thenhom.html)"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#e5b879] transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase">
                Team Badge
              </span>
            </button>
          </div>

          {/* Center Cluster: Main Menu Tabs (Horizontal top navigation buttons, 8 Tabs) */}
          <nav
            aria-label="Main Dashboard Views"
            className="flex flex-1 items-center justify-start gap-1 overflow-x-auto px-1 py-1 no-scrollbar xl:justify-center"
          >
            {DASHBOARD_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-all duration-200 ${
                    isActive
                      ? "bg-[#1e1b16] font-medium text-[#f6f2e9] shadow-xs"
                      : "text-[#2b2721]/70 hover:bg-[#2b2721]/8 hover:text-[#1e1b16]"
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] ${
                      isActive ? "text-[#e5b879]" : "text-[#9a6a3e]/80"
                    }`}
                  >
                    {tab.number}
                  </span>
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span className="whitespace-nowrap">{tab.shortLabel}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Cluster: Quick Search Bar */}
          <div ref={searchContainerRef} className="relative shrink-0">
            <div
              className={`flex items-center gap-1.5 rounded-full border bg-white/80 px-3 py-1.5 transition-all duration-200 ${
                searchFocused
                  ? "w-48 border-[#9a6a3e] shadow-sm sm:w-64"
                  : "w-36 border-[#2b2721]/15 sm:w-48"
              }`}
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-[#2b2721]/50" />
              <input
                type="text"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSearchFocused(true)
                }}
                placeholder="Search views, members..."
                aria-label="Quick search across portfolio"
                className="w-full bg-transparent text-xs text-[#1e1b16] placeholder-[#2b2721]/45 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[#2b2721]/45 hover:text-[#1e1b16]"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown Results */}
            {searchFocused && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-[#2b2721]/20 bg-[#faf7f0] shadow-2xl sm:w-96">
                <div className="border-b border-[#2b2721]/10 bg-[#efe9da] px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/65">
                  {query.trim()
                    ? `Search Results (${filteredResults.length})`
                    : "Quick Jump — All 8 Views & Members"}
                </div>
                <div className="max-h-72 divide-y divide-[#2b2721]/8 overflow-y-auto">
                  {filteredResults.length === 0 ? (
                    <p className="p-4 text-center text-xs text-[#2b2721]/60">
                      No matching content found for &ldquo;{query}&rdquo;.
                    </p>
                  ) : (
                    filteredResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelectTab(item.tabId)
                          if (
                            typeof item.memberIndex === "number" &&
                            onSelectMemberFromSearch
                          ) {
                            onSelectMemberFromSearch(item.memberIndex)
                          }
                          setSearchFocused(false)
                        }}
                        className="flex w-full items-start justify-between gap-3 px-3.5 py-2.5 text-left transition hover:bg-[#ece5d5]/70"
                      >
                        <div className="min-w-0">
                          <span className="inline-block font-mono text-[9px] font-semibold tracking-wider uppercase text-[#9a6a3e]">
                            {item.category}
                          </span>
                          <p className="truncate font-serif text-sm font-medium text-[#1e1b16]">
                            {item.title}
                          </p>
                          <p className="truncate text-[11px] text-[#2b2721]/65">
                            {item.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="mt-2 h-3.5 w-3.5 shrink-0 text-[#9a6a3e]" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pull-tab hanging under the header on immersive tabs: tap/click to show or hide navigation */}
        {immersive && (
          <button
            type="button"
            onClick={() => (isRevealed ? setIsRevealed(false) : reveal())}
            aria-expanded={!isTuckedAway}
            aria-label={isTuckedAway ? "Show navigation" : "Hide navigation"}
            className="absolute top-full left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-b-xl border border-t-0 border-[#2b2721]/15 bg-[#f6f2e9]/92 px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-[#2b2721]/75 shadow-sm backdrop-blur-xl transition hover:text-[#1e1b16]"
          >
            <span className="text-[#9a6a3e]">{activeTabDef?.number}</span>
            <span>{activeTabDef?.shortLabel}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-300 ${isTuckedAway ? "" : "rotate-180"}`}
            />
          </button>
        )}
      </header>
    </>
  )
}
