"use client"

import React, { useState, useRef, useEffect } from "react"
import { SITE_CONFIG } from "@/lib/config"
import { MessageSquare, Send, X, Bot, User, AlertCircle } from "lucide-react"

// ============================================================================
// 🔑 1. ĐIỀN API KEY GEMINI CỦA BẠN TẠI ĐÂY (TRONG SOURCE CODE)
// ============================================================================
// Thay "YOUR_GEMINI_API_KEY_HERE" bằng Google Gemini API Key thật của bạn.
// Hoặc bạn có thể tạo file .env.local và gán NEXT_PUBLIC_GEMINI_API_KEY=...
export const GEMINI_API_KEY = "AQ.Ab8RN6KEVO2MNQrbbt0MOD8cvo8v2oEt57eg6WxN5hV-RiZ3bA"

// ============================================================================
// 🤖 2. ĐƯỜNG DẪN ẢNH ĐẠI DIỆN CHATBOT AI
// ============================================================================
// Đặt ảnh chatbot của bạn vào: public/images/chatbot-avatar.png
// (hoặc đổi đường dẫn dưới đây thành ảnh bất kỳ trong thư mục public/)
export const CHATBOT_AVATAR_SRC = "/images/chatbot-avatar.png"

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent"

interface ChatMessage {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: string
  isError?: boolean
}

const SUGGESTED_PROMPTS = [
  "Giới thiệu tổng quan về dự án Final Bot",
  "Các thành viên trong nhóm phát triển gồm những ai?",
  "Kiến trúc kỹ thuật của hệ thống hoạt động ra sao?",
  "Các công nghệ chính được tích hợp trong dự án?",
]

export function GeminiChatbotFab() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-01",
      role: "assistant",
      content:
        "Hellooo! Mình là trợ lý của nhóm. Bạn có thể hỏi về thành viên, quy tắc hoặc tiến độ đồ án.",
      timestamp: "Vừa xong",
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  /**
   * Gửi tin nhắn.
   * Nếu chưa có API key -> chỉ đơn giản thông báo lỗi.
   */
  const sendMessage = async (textToSend?: string) => {
    const promptText = (textToSend ?? input).trim()
    if (!promptText || isLoading) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput("")
    setIsLoading(true)

    // Lấy API key từ hằng số trong code hoặc biến môi trường
    const activeKey = (
      GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY_HERE" && GEMINI_API_KEY
        ? GEMINI_API_KEY
        : process.env.NEXT_PUBLIC_GEMINI_API_KEY || SITE_CONFIG.geminiApiKey || ""
    ).trim()

    // Nếu không có API Key -> Báo lỗi đơn giản, KHÔNG auto trả lời máy móc
    if (!activeKey || activeKey === "YOUR_GEMINI_API_KEY_HERE") {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "⚠️ Lỗi: Chưa cấu hình Gemini API Key.\n\nVui lòng điền API Key vào biến `GEMINI_API_KEY` ở đầu file `components/gemini-chatbot-fab.tsx` trong source code để kích hoạt Chatbot AI.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        },
      ])
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(activeKey)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text:
                  SITE_CONFIG.geminiSystemPrompt ||
                  "Bạn là trợ lý AI thông minh cho dự án Final Bot tại trường ĐH Khoa học Tự nhiên (HCMUS). Hãy trả lời ngắn gọn, lịch sự, chính xác và hữu ích bằng tiếng Việt.",
              },
            ],
          },
          contents: [
            ...messages
              .filter((m) => !m.isError)
              .slice(-6)
              .map((m) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              })),
            {
              role: "user",
              parts: [{ text: promptText }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      })

      if (!response.ok) {
        let errorDetails = `HTTP ${response.status}`
        try {
          const errData = await response.json()
          if (errData?.error?.message) {
            errorDetails = errData.error.message
          }
        } catch {
          // ignore parsing error
        }
        throw new Error(errorDetails)
      }

      const data = await response.json()
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text

      if (!aiText) {
        throw new Error("Không nhận được phản hồi từ mô hình AI.")
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Không thể kết nối đến Gemini API"
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `⚠️ Lỗi kết nối: ${errorMsg}.\nVui lòng kiểm tra lại API Key trong source code hoặc kết nối mạng.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Component hiển thị Avatar Chatbot AI
  const RenderBotAvatar = ({ size = "w-7 h-7" }: { size?: string }) => (
    <div
      className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d8c8aa]/60 bg-[#1e1b16] text-[#f6f2e9] shadow-xs`}
    >
      {!avatarError ? (
        <img
          src={CHATBOT_AVATAR_SRC}
          alt="Chatbot AI"
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            if (target.src.endsWith(".png")) {
              target.src = "/images/chatbot-avatar.svg"
            } else {
              setAvatarError(true)
            }
          }}
        />
      ) : (
        <Bot className="h-4 w-4 text-[#d4a26a]" />
      )}
    </div>
  )

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Khung chat AI mở rộng */}
      {isOpen && (
        <div className="mb-3 flex h-[500px] max-h-[78vh] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-[#2b2721]/20 bg-[#faf7f0]/95 text-[#1e1b16] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-[395px]">
          {/* Header của Khung Chat */}
          <div className="flex items-center justify-between border-b border-[#2b2721]/12 bg-[#efe9da] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <RenderBotAvatar size="w-8 h-8" />
              <div>
                <h3 className="font-serif text-sm font-semibold leading-tight text-[#1e1b16]">
                  Final Bot AI Assistant
                </h3>
                <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#2b2721]/60">
                ...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-[#2b2721]/65 transition hover:bg-[#2b2721]/10"
                title="Thu nhỏ chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Danh sách tin nhắn */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {m.role === "user" ? (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#9a6a3e] text-white">
                    <User className="h-4 w-4" />
                  </div>
                ) : (
                  <RenderBotAvatar size="w-7 h-7" />
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#1e1b16] text-[#f6f2e9]"
                      : m.isError
                      ? "border border-red-300/80 bg-red-50/90 text-red-900 shadow-2xs"
                      : "border border-[#2b2721]/12 bg-white text-[#1e1b16] shadow-2xs"
                  }`}
                >
                  {m.isError && (
                    <div className="mb-1 flex items-center gap-1.5 font-semibold text-red-800">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>Thông báo lỗi</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.content}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-2 text-[9px] opacity-55">
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#2b2721]/60">
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#9a6a3e]" />
                <span className="font-serif italic">Đang suy nghĩ câu trả lời...</span>
              </div>
            )}
          </div>

          {/* Gợi ý câu hỏi */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-[#2b2721]/10 bg-[#f4efe3] px-3 py-2 no-scrollbar">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="shrink-0 rounded-full border border-[#2b2721]/15 bg-white/80 px-2.5 py-1 text-[10px] text-[#2b2721]/80 transition hover:border-[#9a6a3e] hover:bg-white"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Khung nhập tin nhắn */}
          <div className="flex items-center gap-2 border-t border-[#2b2721]/12 bg-white px-3 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                if (e.key === "Enter") {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Nhập câu hỏi cho Final Bot AI..."
              className="flex-1 bg-transparent text-xs text-[#1e1b16] placeholder-[#2b2721]/45 outline-none"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1e1b16] text-[#f6f2e9] transition hover:bg-[#9a6a3e] disabled:opacity-40"
              aria-label="Gửi tin nhắn"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Nút tròn Floating Action Button (FAB) */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Mở Chatbot AI"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c8aa]/50 bg-[#1e1b16] text-[#f6f2e9] shadow-[0_12px_32px_rgba(30,27,22,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#2d261e]"
      >
        <span className="pointer-events-none absolute -inset-1 rounded-full border border-[#9a6a3e]/35 opacity-75 transition-transform duration-500 group-hover:scale-110" />
        {isOpen ? (
          <X className="h-5 w-5 text-[#e5c193]" />
        ) : (
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
            {!avatarError ? (
              <img
                src={CHATBOT_AVATAR_SRC}
                alt="Bot FAB"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget
                  if (target.src.endsWith(".png")) {
                    target.src = "/images/chatbot-avatar.svg"
                  } else {
                    setAvatarError(true)
                  }
                }}
              />
            ) : (
              <MessageSquare className="h-5 w-5 text-[#e5c193]" />
            )}
          </div>
        )}
        <span className="sr-only">Bật/tắt Chatbot AI</span>
      </button>
    </div>
  )
}
