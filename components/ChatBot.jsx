"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import apiPath from "../src/constants/apiPath";
import { getOrCreateUserId } from "../src/utils/userId";

function IconMessage(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 15.5a3.5 3.5 0 0 1-3.5 3.5H8l-4 3v-3.5A3.5 3.5 0 0 1 0.5 15V6.5A3.5 3.5 0 0 1 4 3h12.5A3.5 3.5 0 0 1 20 6.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 8.5h10M7 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconSend(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 11.5 20 4l-4.5 16-3.5-6-6-2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M20 4 10 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCopy(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 8.5h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 15.5H5a2 2 0 0 1-2-2v-8A2 2 0 0 1 5 3.5h8a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 7 10.5 17.5 4 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const QUICK_REPLIES = [
  { label: "Sad ❤️", value: "sad shayari" },
  { label: "Love 💕", value: "love shayari" },
  { label: "Maa 👩‍👦", value: "maa shayari" },
];

const WELCOME_MESSAGES = [
  {
    id: "welcome",
    role: "assistant",
    source: "system",
    text: "Namaste. Main Black Diary ka shayari assistant hoon. Sad, Love, ya Maa likho, ya apne dil ki baat batao.",
  },
];

function MessageBubble({ message, onCopy, copied }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`group relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-lg ${
          isUser ? "rounded-br-md bg-[#1f1f1f] text-[#f5f5f5]" : "rounded-bl-md bg-[#111] text-[#ececec]"
        }`}
        style={{
          border: "1px solid",
          borderColor: isUser ? "rgba(255,255,255,0.08)" : "rgba(212,175,55,0.18)",
        }}
      >
        {isAssistant ? (
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f6d98a]">
              {message.source === "keyword" ? "Free Shayari" : "AI Shayari"}
            </span>

            <button
              type="button"
              onClick={() => onCopy(message.text, message.id)}
              className="inline-flex items-center gap-1 rounded-full border border-transparent px-2 py-1 text-[11px] text-[#b8b8b8] opacity-100 transition hover:border-[rgba(255,255,255,0.08)] hover:bg-white/5 hover:text-white"
              aria-label="Copy shayari"
            >
              {copied ? <IconCheck className="h-3.5 w-3.5" /> : <IconCopy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : null}

        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(WELCOME_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const [quotaRemaining, setQuotaRemaining] = useState(10);
  const [copiedMessageId, setCopiedMessageId] = useState("");

  const inputRef = useRef(null);
  const endRef = useRef(null);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setUserId(getOrCreateUserId());
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen, isSending]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    },
    [],
  );

  const handleCopy = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);

      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }

      copyTimerRef.current = window.setTimeout(() => setCopiedMessageId(""), 1500);
    } catch {
      setCopiedMessageId("");
    }
  };

  const pushAssistantMessage = (text, source = "ai") => {
    setMessages((current) => [
      ...current,
      {
        id: `assistant_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        role: "assistant",
        source,
        text,
      },
    ]);
  };

  const sendMessage = async (rawText) => {
    const trimmed = String(rawText || "").trim();
    const activeUserId = userId || getOrCreateUserId();
    const baseUrl = String(apiPath.baseURL || process.env.REACT_APP_DEV_API_BASE_URL || "http://localhost:7900/api").replace(/\/$/, "");
    const chatUrl = `${baseUrl}/${apiPath.chatBot}`;

    if (!trimmed || isSending) {
      return;
    }

    if (!activeUserId) {
      pushAssistantMessage("⚠️ User identify nahi ho paya. Page refresh karke try karo.", "system");
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        role: "user",
        text: trimmed,
      },
    ]);

    setInput("");
    setIsSending(true);

    try {
      const response = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          userId: activeUserId,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        if (response.status === 429) {
          setQuotaRemaining(0);
        }

        pushAssistantMessage(data?.message || "⚠️ Server busy hai, thodi der baad try karo", "system");
        return;
      }

      if (typeof data?.remainingQuota === "number") {
        setQuotaRemaining(data.remainingQuota);
      }

      pushAssistantMessage(data?.reply || "⚠️ Server busy hai, thodi der baad try karo", data?.source || "ai");
    } catch {
      pushAssistantMessage("⚠️ Server busy hai, thodi der baad try karo", "system");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (value) => {
    sendMessage(value);
    setIsOpen(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-3 right-3 z-[9999] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex h-[min(72vh,38rem)] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.75rem] bg-[#070707] shadow-[0_28px_120px_rgba(0,0,0,0.75)] sm:w-[22.5rem]"
            style={{
              border: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            <div className="relative overflow-hidden border-b border-[rgba(212,175,55,0.12)] bg-gradient-to-br from-[#111] via-[#0d0d0d] to-[#050505] px-4 py-4">
              <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at top right, rgba(212,175,55,0.16), transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.06), transparent 30%)" }} />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8d8d8d]">Black Diary AI</p>
                  <h2 className="mt-1 font-['Playfair_Display'] text-xl text-[#f7f7f7]">Shayari Assistant</h2>
                  <p className="mt-1 text-xs text-[#b9b9b9]">Free AI left today: {quotaRemaining}/10</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-white/5 text-[#e8e8e8] transition hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-track-[#101010] scrollbar-thumb-[#333]">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCopy={handleCopy}
                  copied={copiedMessageId === message.id}
                />
              ))}

              {isSending ? (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-md border border-[rgba(212,175,55,0.18)] bg-[#111] px-4 py-3 text-sm text-[#d9d9d9]"
                    style={{ minWidth: "8rem" }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37] [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37] [animation-delay:300ms]" />
                      typing...
                    </span>
                  </div>
                </div>
              ) : null}

              <div ref={endRef} />
            </div>

            <div className="border-t border-[rgba(212,175,55,0.12)] bg-[#090909] p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((quickReply) => (
                  <button
                    key={quickReply.label}
                    type="button"
                    onClick={() => handleQuickReply(quickReply.value)}
                    disabled={isSending}
                    className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1.5 text-xs font-medium text-[#f6e1a0] transition hover:bg-[rgba(212,175,55,0.14)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {quickReply.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit(event);
                    }
                  }}
                  rows={1}
                  placeholder="Type a message..."
                  disabled={isSending}
                  className="max-h-28 min-h-12 flex-1 resize-none rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#111] px-4 py-3 text-sm text-[#f3f3f3] placeholder:text-[#7e7e7e] focus:border-[rgba(212,175,55,0.32)]"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                />

                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#d4af37] text-[#090909] transition hover:bg-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-launcher"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.85, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 18 }}
            transition={{ duration: 0.2 }}
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-[#080808] shadow-[0_18px_45px_rgba(212,175,55,0.35)]"
            aria-label="Open chat"
          >
            <span className="absolute inset-0 rounded-full bg-[#d4af37] opacity-25 blur-md transition group-hover:opacity-40" />
            <IconMessage className="relative h-6 w-6" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
