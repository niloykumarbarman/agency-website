import { API_BASE_URL } from "./apiConfig";
export type AssistantRole = "user" | "model";
export interface AssistantChatMessage {
  role: AssistantRole;
  content: string;
}
export const ASSISTANT_CHAT_API_URL = `${API_BASE_URL}/assistant/chat`;
// Backend caps history at 20 turns (SendChatMessageCommandValidator).
const MAX_HISTORY_TURNS = 20;
const SESSION_ID_KEY = "devliora-assistant-session-id";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = window.localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export async function sendAssistantMessage(
  history: AssistantChatMessage[],
  message: string
): Promise<string> {
  const trimmedHistory = history.slice(-MAX_HISTORY_TURNS);
  const sessionId = getOrCreateSessionId();
  const res = await fetch(ASSISTANT_CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history: trimmedHistory, message, sessionId }),
  });
  if (!res.ok) {
    throw new Error(`Assistant request failed: ${res.status}`);
  }
  const data: { reply: string } = await res.json();
  return data.reply;
}
