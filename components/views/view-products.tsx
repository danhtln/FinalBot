"use client"

import React, { useState } from "react"
import { SITE_CONFIG } from "@/lib/config"
import {
  Play,
  Video,
  ExternalLink,
  Code2,
  Sparkles,
  CheckCircle2,
  Link2,
} from "lucide-react"

/**
 * VIEW 7: PRODUCTS ("Products" Active)
 * └── Slider / Grid of 3 product slots:
 *     ├── Card 1: [Product 1] (Empty frame ready for Video / Demo link)
 *     ├── Card 2: [Product 2] (Empty frame)
 *     └── Card 3: [Product 3] (Empty frame)
 */
export function ViewProducts() {
  const [customUrls, setCustomUrls] = useState<Record<string, string>>({
    "product-01": SITE_CONFIG.productDemos[0]?.videoEmbedUrl || "",
    "product-02": SITE_CONFIG.productDemos[1]?.videoEmbedUrl || "",
    "product-03": SITE_CONFIG.productDemos[2]?.videoEmbedUrl || "",
  })
  const [editingSlot, setEditingSlot] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-8 sm:py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2b2721]/12 pb-5">
        <div>
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-[#9a6a3e]">
            VIEW 07 // CAPSTONE DELIVERABLES &amp; 3 PRODUCT DEMO SLOTS
          </span>
          <h1 className="mt-1 font-serif text-3xl font-normal tracking-tight text-[#1e1b16] sm:text-4xl">
            Products &amp; Interactive Demonstration Slots
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[#2b2721]/75">
            Three dedicated product frames ready for your Video / Demo links via{" "}
            <code className="rounded bg-[#ece4d4] px-1.5 py-0.5 font-mono text-xs">
              productDemos
            </code>{" "}
            in <code className="rounded bg-[#ece4d4] px-1.5 py-0.5 font-mono text-xs">config.js</code> or live inline URL injection below.
          </p>
        </div>

        <span className="rounded-full border border-[#9a6a3e]/35 bg-[#ece4d4] px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#7c532d]">
          03 / 03 PRODUCT SLOTS CONFIGURED
        </span>
      </div>

      {/* 3 Product Slots Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {SITE_CONFIG.productDemos.map((product) => {
          const embedUrl = customUrls[product.id]?.trim()
          const isEditing = editingSlot === product.id

          return (
            <article
              key={product.id}
              className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#2b2721]/15 bg-[#fbf9f4] shadow-sm transition-all duration-300 hover:border-[#9a6a3e] hover:shadow-md"
            >
              <div>
                {/* Top Slot Header */}
                <div className="flex items-center justify-between border-b border-[#2b2721]/10 bg-[#f3ede0] px-5 py-3">
                  <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-[#7c532d]">
                    SLOT {product.slotNumber} // {product.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingSlot(isEditing ? null : product.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#2b2721]/15 bg-white px-2.5 py-0.5 font-mono text-[9px] uppercase text-[#1e1b16] hover:border-[#9a6a3e]"
                  >
                    <Link2 className="h-2.5 w-2.5 text-[#9a6a3e]" />
                    <span>{embedUrl ? "Change Link" : "Paste Video/Demo URL"}</span>
                  </button>
                </div>

                {/* Inline URL Input if user clicks "Paste Video/Demo URL" */}
                {isEditing && (
                  <div className="border-b border-[#2b2721]/10 bg-[#faf5e8] px-4 py-2.5">
                    <p className="font-mono text-[9px] uppercase text-[#7c532d]">
                      Paste YouTube Embed / MP4 / Live Demo URL:
                    </p>
                    <div className="mt-1 flex gap-1.5">
                      <input
                        type="text"
                        value={customUrls[product.id] || ""}
                        onChange={(e) =>
                          setCustomUrls((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                        placeholder="https://www.youtube.com/embed/..."
                        className="flex-1 rounded border border-[#2b2721]/20 bg-white px-2 py-1 font-mono text-[11px] outline-none focus:border-[#9a6a3e]"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingSlot(null)}
                        className="rounded bg-[#1e1b16] px-2.5 py-1 font-mono text-[10px] uppercase text-[#f6f2e9]"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* Dedicated Frame for Video / Demo Link */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-[#2b2721]/10 bg-[#181613] text-[#f6f2e9]">
                  {embedUrl ? (
                    embedUrl.endsWith(".mp4") || embedUrl.endsWith(".webm") || embedUrl.startsWith("/videos/") ? (
                      <video
                        controls
                        playsInline
                        className="h-full w-full object-cover"
                        poster={`/images/products/${product.id}-poster.jpg`}
                      >
                        <source src={embedUrl} type="video/mp4" />
                        <source src={embedUrl} type="video/webm" />
                        Your browser does not support HTML5 video playback.
                      </video>
                    ) : (
                      <iframe
                        src={embedUrl}
                        title={product.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    )
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[#e5b879]/60 bg-[#e5b879]/10 text-[#e5b879]">
                        <Video className="h-5 w-5" />
                      </div>
                      <p className="mt-3 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-[#e5b879]">
                        [PRODUCT {product.slotNumber} — VIDEO / DEMO FRAME]
                      </p>
                      <p className="mt-1 max-w-xs text-[11px] text-white/60">
                        Đặt video tại <code className="font-mono text-amber-200">/videos/products/{product.id}.mp4</code> hoặc set{" "}
                        <code className="font-mono text-amber-200">videoEmbedUrl</code> trong{" "}
                        <code className="font-mono text-amber-200">config.js</code> hoặc bấm{" "}
                        <button
                          type="button"
                          onClick={() => setEditingSlot(product.id)}
                          className="underline decoration-amber-400 underline-offset-2 text-amber-200"
                        >
                          Paste URL
                        </button>
                        .
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Copy */}
                <div className="p-6">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#9a6a3e]">
                    <Sparkles className="h-3 w-3" />
                    <span>{product.philosophicalPillar}</span>
                  </div>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#1e1b16]">
                    {product.title}
                  </h2>
                  <p className="mt-0.5 font-serif text-xs italic text-[#7c532d]">
                    {product.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#2b2721]/80">
                    {product.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {product.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[11px] text-[#2b2721]/85"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9a6a3e]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#ece4d4] px-2 py-0.5 font-mono text-[9px] font-medium text-[#7c532d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between border-t border-[#2b2721]/10 bg-[#f5f0e4] px-6 py-3">
                <button
                  type="button"
                  onClick={() => setEditingSlot(product.id)}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase text-[#7c532d] hover:text-[#1e1b16]"
                >
                  <Play className="h-3 w-3" />
                  <span>Configure Frame</span>
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={product.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-[#2b2721]/70 hover:text-[#1e1b16]"
                  >
                    <Code2 className="h-3 w-3" />
                    <span>Source</span>
                  </a>
                  {product.liveDemoUrl && (
                    <a
                      href={product.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#1e1b16]"
                    >
                      <span>Live</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
