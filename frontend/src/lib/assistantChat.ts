import { API_BASE_URL } from "./apiConfig";

export type AssistantRole = "user" | "model";

export interface AssistantChatMessage {
  role: AssistantRole;
  content: string;
}

export const ASSISTANT_CHAT_API_URL = `${API_BASE_URL}/assistant/chat`;

// Backend caps history at 20 turns (SendChatMessageCommandValidator).
const MAX_HISTORY_TURNS = 20;

export async function sendAssistantMessage(
  history: AssistantChatMessage[],
  message: string
): Promise<string> {
  const trimmedHistory = history.slice(-MAX_HISTORY_TURNS);

  const res = await fetch(ASSISTANT_CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history: trimmedHistory, message }),
  });

  if (!res.ok) {
    throw new Error(`Assistant request failed: ${res.status}`);
  }

  const data: { reply: string } = await res.json();
  return data.reply;
}
