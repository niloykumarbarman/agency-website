import { adminFetch } from "@/lib/adminAuth";

export type ContactMessageStatus = "New" | "InProgress" | "Resolved" | "Spam";

// Backend enum has no JsonStringEnumConverter configured, so the Update
// Status command binds Status as an integer matching
// ContactMessageStatus.cs declaration order.
const STATUS_TO_INT: Record<ContactMessageStatus, number> = {
  New: 0,
  InProgress: 1,
  Resolved: 2,
  Spam: 3,
};

export const CONTACT_MESSAGE_STATUS_OPTIONS: ContactMessageStatus[] = [
  "New",
  "InProgress",
  "Resolved",
  "Spam",
];

export interface AdminContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}

export const CONTACT_MESSAGES_ADMIN_API_URL = "http://localhost:5240/api/contact-messages";

export async function fetchAdminContactMessages(): Promise<AdminContactMessage[]> {
  const res = await adminFetch(CONTACT_MESSAGES_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch contact messages: ${res.status}`);
  }
  return res.json();
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessageStatus
): Promise<void> {
  const res = await adminFetch(`${CONTACT_MESSAGES_ADMIN_API_URL}/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      status: STATUS_TO_INT[status],
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update contact message status: ${res.status}`);
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const res = await adminFetch(`${CONTACT_MESSAGES_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete contact message: ${res.status}`);
  }
}
