import { adminFetch } from "@/lib/adminAuth";
import { API_BASE_URL } from "./apiConfig";
export interface AdminPartner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
}
export interface PartnerFormPayload {
  name: string;
  logoUrl: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
}
export const PARTNERS_ADMIN_API_URL = `${API_BASE_URL}/partners`;
export async function fetchAdminPartners() {
  const res = await adminFetch(`${PARTNERS_ADMIN_API_URL}/admin`);
  if (!res.ok) {
    throw new Error(`Failed to fetch partners: ${res.status}`);
  }
  return res.json() as Promise<AdminPartner[]>;
}
export async function createPartner(payload: PartnerFormPayload) {
  const res = await adminFetch(PARTNERS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create partner: ${res.status}`);
  }
  return res.json() as Promise<string>;
}
export async function updatePartner(id: string, payload: PartnerFormPayload) {
  const res = await adminFetch(`${PARTNERS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update partner: ${res.status}`);
  }
}
export async function deletePartner(id: string) {
  const res = await adminFetch(`${PARTNERS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete partner: ${res.status}`);
  }
}
