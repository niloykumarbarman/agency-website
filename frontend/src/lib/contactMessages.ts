import { API_BASE_URL } from "./apiConfig";
export interface ContactMessagePayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const CONTACT_MESSAGES_API_URL =
  `${API_BASE_URL}/contact-messages`;

export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<string> {
  const res = await fetch(CONTACT_MESSAGES_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit contact message: ${res.status}`);
  }

  return res.json();
}
