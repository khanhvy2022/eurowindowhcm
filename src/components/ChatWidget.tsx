"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

const QUICK_QUESTIONS_VI = [
  "Eurowindow là gì?",
  "Giá cửa uPVC bao nhiêu?",
  "Sản phẩm đạt tiêu chuẩn nào?",
  "Liên hệ Eurowindow bằng cách nào?",
];

const QUICK_QUESTIONS_EN = [
  "What is Eurowindow?",
  "uPVC doors price range?",
  "What standards are met?",
  "How to contact Eurowindow?",
];

export default function ChatWidget() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const quickQuestions = isEn ? QUICK_QUESTIONS_EN : QUICK_QUESTIONS_VI;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const reply = data?.ok
        ? (data.message as string)
        : (isEn ? "Sorry, an error occurred. Please try again." : "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.");
      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: isEn
            ? "Sorry, cannot connect to server. Please try again."
            : "Xin lỗi, không thể kết nối máy chủ. Vui lòng thử lại.",
        },
      ]);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.focus();
    }
  }

  return (
    <>
      {/* Nút nổi */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={isEn ? "Open Eurowindow chat" : "Mở chat Eurowindow"}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0066aa] text-white shadow-lg shadow-[#0066aa]/40 transition hover:scale-105 hover:bg-[#005690]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Khung chat */}
      {open ? (
        <div className="fixed bottom-24 left-6 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#0a1628]/10 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#0b1628] px-4 py-3.5 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066aa]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{isEn ? "Eurowindow Assistant" : "Trợ lý Eurowindow"}</p>
              <p className="text-[11px] text-white/60">{isEn ? "Instant reply • 24/7" : "Trả lời ngay • 24/7"}</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f5f8fb] px-4 py-4">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0066aa]">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13px] leading-6 text-[#1c2b3a] shadow-sm">
                {isEn
                  ? "Hello! I am Eurowindow's virtual assistant. How can I assist you with our doors, facade solutions, pricing, or warranty today?"
                  : "Xin chào! Tôi là trợ lý của Eurowindow. Tôi có thể giúp bạn tư vấn về sản phẩm, báo giá, bảo hành hoặc liên hệ. Bạn muốn hỏi gì?"}
              </div>
            </div>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#0066aa] px-3.5 py-2.5 text-[13px] leading-6 text-white">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0066aa]">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13px] leading-6 text-[#1c2b3a] shadow-sm">
                    {m.content}
                  </div>
                </div>
              ),
            )}
            {loading ? (
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0066aa]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0066aa]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0066aa] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0066aa] [animation-delay:300ms]" />
                </div>
              </div>
            ) : null}
          </div>

          {/* Quick questions */}
          <div className="flex flex-wrap gap-1.5 border-t border-[#0a1628]/5 bg-white px-3 pt-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="rounded-full border border-[#0066aa]/30 bg-[#0066aa]/5 px-2.5 py-1 text-[11px] text-[#0066aa] transition hover:bg-[#0066aa]/10 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-[#0a1628]/5 bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEn ? "Type your question..." : "Nhập câu hỏi..."}
              className="flex-1 rounded-full border border-[#0a1628]/10 bg-[#f5f8fb] px-4 py-2 text-[13px] outline-none transition focus:border-[#0066aa]"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={isEn ? "Send" : "Gửi"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0066aa] text-white transition hover:bg-[#005690] disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

    </>
  );
}
