"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, Loader2, PhoneCall } from "lucide-react";
import {
  sendAssistantMessage,
  type AssistantChatMessage,
} from "@/lib/assistantChat";
import { submitContactMessage } from "@/lib/contactMessages";

const DOT_GRID_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle, var(--color-wire) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

interface CallbackFormState {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY_CALLBACK_FORM: CallbackFormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const REQUEST_CALLBACK_PHRASE = "Request a Callback";

export default function AssistantChat() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackForm, setCallbackForm] = useState<CallbackFormState>(EMPTY_CALLBACK_FORM);
  const [callbackStatus, setCallbackStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending, showCallbackForm]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 30 };

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const historyBeforeSend = messages;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const reply = await sendAssistantMessage(historyBeforeSend, trimmed);
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch {
      setError(
        "Something went wrong while reaching the assistant. Please try again in a moment."
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleCallbackChange(
    field: keyof CallbackFormState
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> {
    return (e) => {
      setCallbackForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleCallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (callbackStatus === "sending") return;

    setCallbackStatus("sending");
    try {
      await submitContactMessage({
        fullName: callbackForm.fullName,
        email: callbackForm.email,
        phone: callbackForm.phone,
        subject: callbackForm.subject,
        message: callbackForm.message,
        source: "assistant-chat",
      });
      setCallbackStatus("sent");
      setCallbackForm(EMPTY_CALLBACK_FORM);
    } catch {
      setCallbackStatus("error");
    }
  }

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            transition={panelTransition}
            className="flex h-[32rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-wire bg-paper shadow-2xl sm:w-96"
            role="dialog"
            aria-label="Devliora assistant chat"
          >
            <div
              className="flex items-center justify-between border-b border-wire px-5 py-4"
              style={DOT_GRID_STYLE}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-graphite">
                  Devliora
                </p>
                <h2 className="font-display text-lg text-ink">Ask Devliora</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-2 text-graphite transition hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && !showCallbackForm && (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <MessageCircle className="h-8 w-8 text-graphite/40" />
                  <p className="text-sm text-graphite">
                    Ask about our services, timelines, or pricing, or request a
                    callback below.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "max-w-[85%] rounded-lg rounded-br-sm bg-ink px-4 py-2.5 text-sm text-paper"
                        : "max-w-[85%] rounded-lg rounded-bl-sm border border-wire bg-paper px-4 py-2.5 text-sm text-ink"
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg rounded-bl-sm border border-wire bg-paper px-4 py-2.5 text-sm text-graphite">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}

              {error && <p className="text-center text-xs text-ember">{error}</p>}

              {showCallbackForm && (
                <form
                  onSubmit={handleCallbackSubmit}
                  className="space-y-2.5 rounded-lg border border-wire p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-graphite">
                    Request a Callback
                  </p>
                  {callbackStatus === "sent" ? (
                    <p className="text-sm text-ink">
                      Thanks, we will be in touch shortly.
                    </p>
                  ) : (
                    <>
                      <input
                        required
                        placeholder="Name"
                        value={callbackForm.fullName}
                        onChange={handleCallbackChange("fullName")}
                        className="w-full rounded-lg border border-wire bg-paper px-3 py-2 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        value={callbackForm.email}
                        onChange={handleCallbackChange("email")}
                        className="w-full rounded-lg border border-wire bg-paper px-3 py-2 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                      />
                      <input
                        required
                        placeholder="Phone"
                        value={callbackForm.phone}
                        onChange={handleCallbackChange("phone")}
                        className="w-full rounded-lg border border-wire bg-paper px-3 py-2 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                      />
                      <input
                        required
                        placeholder="Subject"
                        value={callbackForm.subject}
                        onChange={handleCallbackChange("subject")}
                        className="w-full rounded-lg border border-wire bg-paper px-3 py-2 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                      />
                      <textarea
                        placeholder="What should we know?"
                        value={callbackForm.message}
                        onChange={handleCallbackChange("message")}
                        rows={2}
                        className="w-full resize-none rounded-lg border border-wire bg-paper px-3 py-2 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                      />
                      {callbackStatus === "error" && (
                        <p className="text-xs text-ember">
                          Could not send your request. Please try again.
                        </p>
                      )}
                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          disabled={callbackStatus === "sending"}
                          className="flex-1 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-paper shadow-[0_0_24px_-6px_var(--color-signal)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          {callbackStatus === "sending" ? "Sending..." : "Submit"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCallbackForm(false)}
                          className="rounded-lg border border-wire px-4 py-2 text-sm text-graphite transition hover:text-ink"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>

            <div className="border-t border-wire p-3">
              {!showCallbackForm && (
                <button
                  type="button"
                  onClick={() => setShowCallbackForm(true)}
                  className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-wire px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-graphite transition hover:border-signal hover:text-signal"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  {REQUEST_CALLBACK_PHRASE}
                </button>
              )}
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-wire bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-graphite/40 outline-none transition focus-visible:border-signal focus-visible:ring-2 focus-visible:ring-signal/30"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  aria-label="Send message"
                  className="rounded-lg bg-signal p-2.5 text-paper shadow-[0_0_24px_-6px_var(--color-signal)] transition-all hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={prefersReducedMotion ? undefined : { y: -2 }}
        aria-label={isOpen ? "Close assistant chat" : "Open assistant chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-signal text-paper shadow-[0_0_24px_-6px_var(--color-signal)] transition-all"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
