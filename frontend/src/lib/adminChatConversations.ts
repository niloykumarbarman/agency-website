import { adminFetch } from "@/lib/adminAuth";
import { API_BASE_URL } from "./apiConfig";

export interface ConversationSummary {
  id: string;
  channel: string;
  externalId: string;
  lastMessageAt: string;
  messageCount: number;
  lastMessagePreview: string;
}

export interface ConversationMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export const CHAT_CONVERSATIONS_ADMIN_API_URL = `${API_BASE_URL}/chat-conversations`;

export async function fetchAdminConversations(): Promise<ConversationSummary[]> {
  const res = await adminFetch(CHAT_CONVERSATIONS_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch conversations: ${res.status}`);
  }
  return res.json();
}

export async function fetchAdminConversationMessages(
  id: string
): Promise<ConversationMessage[]> {
  const res = await adminFetch(`${CHAT_CONVERSATIONS_ADMIN_API_URL}/${id}/messages`);
  if (!res.ok) {
    throw new Error(`Failed to fetch conversation messages: ${res.status}`);
  }
  return res.json();
}
