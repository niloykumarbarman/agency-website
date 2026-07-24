import { adminFetch } from "@/lib/adminAuth";

export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

export interface FaqFormPayload {
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
}

const FAQ_BASE_API_URL = "http://localhost:5240/api/faqs";
export const FAQ_ADMIN_API_URL = `${FAQ_BASE_API_URL}/admin`;

export async function fetchAdminFaqs() {
  const res = await adminFetch(FAQ_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch FAQs: ${res.status}`);
  }
  return res.json() as Promise<AdminFaq[]>;
}

export async function createFaq(payload: FaqFormPayload) {
  const res = await adminFetch(FAQ_BASE_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create FAQ: ${res.status}`);
  }
  return res.json() as Promise<string>;
}

export async function updateFaq(id: string, payload: FaqFormPayload) {
  const res = await adminFetch(`${FAQ_BASE_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update FAQ: ${res.status}`);
  }
}

export async function deleteFaq(id: string) {
  const res = await adminFetch(`${FAQ_BASE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete FAQ: ${res.status}`);
  }
}
