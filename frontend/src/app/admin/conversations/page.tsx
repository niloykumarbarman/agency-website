"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw, MessageSquare, Send } from "lucide-react";
import {
  fetchAdminConversations,
  fetchAdminConversationMessages,
  type ConversationSummary,
  type ConversationMessage,
} from "@/lib/adminChatConversations";

const CHANNEL_STYLES: Record<string, string> = {
  Website: "bg-signal/10 text-signal border-signal/20",
  Telegram: "bg-sky-500/10 text-sky-600 border-sky-500/20",
};

export default function AdminConversationsPage() {
  const [items, setItems] = useState<ConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminConversations();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load conversations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openThread = async (id: string) => {
    setSelectedId(id);
    setMessagesLoading(true);
    setMessagesError("");
    try {
      const data = await fetchAdminConversationMessages(id);
      setMessages(data);
    } catch (err) {
      setMessagesError(err instanceof Error ? err.message : "Failed to load messages.");
    } finally {
      setMessagesLoading(false);
    }
  };

  const selectedSummary = items.find((i) => i.id === selectedId) ?? null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-signal">
            /admin/conversations
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-graphite">Chat Conversations</h1>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-graphite/15 bg-white px-4 py-2 text-sm font-medium text-graphite shadow-sm transition hover:border-signal hover:text-signal disabled:opacity-60"
        >
          <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
          {error}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-graphite/10 bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center gap-2 px-5 py-10 text-graphite/60">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading conversations...
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <MessageSquare className="h-8 w-8 text-graphite/30" />
              <p className="text-graphite/60">No conversations yet.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-graphite/5 font-mono text-xs uppercase tracking-wider text-graphite/50">
                <tr>
                  <th className="px-5 py-4">Channel</th>
                  <th className="px-5 py-4">Preview</th>
                  <th className="px-5 py-4">Messages</th>
                  <th className="px-5 py-4">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => openThread(item.id)}
                    className={
                      "cursor-pointer border-t border-graphite/8 transition hover:bg-graphite/[0.03] " +
                      (selectedId === item.id ? "bg-signal/5" : "")
                    }
                  >
                    <td className="px-5 py-4">
                      <span
                        className={
                          "rounded-full border px-3 py-1 text-xs font-medium " +
                          (CHANNEL_STYLES[item.channel] ?? "bg-graphite/10 text-graphite/60 border-graphite/20")
                        }
                      >
                        {item.channel}
                      </span>
                    </td>
                    <td className="max-w-[240px] truncate px-5 py-4 text-graphite/70">
                      {item.lastMessagePreview || "-"}
                    </td>
                    <td className="px-5 py-4 text-graphite/60">{item.messageCount}</td>
                    <td className="px-5 py-4 text-graphite/50">
                      {new Date(item.lastMessageAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border border-graphite/10 bg-white shadow-sm">
          {!selectedId ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
              <Send className="h-8 w-8 text-graphite/30" />
              <p className="text-graphite/60">Select a conversation to view the thread.</p>
            </div>
          ) : (
            <>
              <div className="border-b border-graphite/10 px-5 py-4">
                <span
                  className={
                    "rounded-full border px-3 py-1 text-xs font-medium " +
                    (CHANNEL_STYLES[selectedSummary?.channel ?? ""] ??
                      "bg-graphite/10 text-graphite/60 border-graphite/20")
                  }
                >
                  {selectedSummary?.channel}
                </span>
                <p className="mt-2 text-sm text-graphite/50">{selectedSummary?.externalId}</p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4" style={{ maxHeight: "32rem" }}>
                {messagesLoading ? (
                  <div className="flex items-center gap-2 text-graphite/60">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading messages...
                  </div>
                ) : messagesError ? (
                  <p className="text-sm text-ember">{messagesError}</p>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-graphite/50">No messages in this thread.</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={
                          msg.role === "user"
                            ? "max-w-[80%] rounded-lg rounded-br-sm bg-graphite px-4 py-2.5 text-sm text-white"
                            : "max-w-[80%] rounded-lg rounded-bl-sm border border-graphite/15 bg-graphite/5 px-4 py-2.5 text-sm text-graphite"
                        }
                      >
                        <p>{msg.content}</p>
                        <p className="mt-1 text-[10px] opacity-60">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
