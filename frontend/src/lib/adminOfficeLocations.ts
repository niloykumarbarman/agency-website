import { adminFetch } from "@/lib/adminAuth";
import { API_BASE_URL } from "./apiConfig";
export interface AdminOfficeLocation {
  id: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  mapQuery: string;
  displayOrder: number;
  isActive: boolean;
}
export interface OfficeLocationFormPayload {
  country: string;
  address: string;
  phone: string;
  email: string;
  mapQuery: string;
  displayOrder: number;
  isActive: boolean;
}
export const OFFICE_LOCATIONS_ADMIN_API_URL = `${API_BASE_URL}/office-locations`;
export async function fetchAdminOfficeLocations() {
  const res = await adminFetch(`${OFFICE_LOCATIONS_ADMIN_API_URL}/admin`);
  if (!res.ok) {
    throw new Error(`Failed to fetch office locations: ${res.status}`);
  }
  return res.json() as Promise<AdminOfficeLocation[]>;
}
export async function createOfficeLocation(payload: OfficeLocationFormPayload) {
  const res = await adminFetch(OFFICE_LOCATIONS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create office location: ${res.status}`);
  }
  return res.json() as Promise<string>;
}
export async function updateOfficeLocation(id: string, payload: OfficeLocationFormPayload) {
  const res = await adminFetch(`${OFFICE_LOCATIONS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update office location: ${res.status}`);
  }
}
export async function deleteOfficeLocation(id: string) {
  const res = await adminFetch(`${OFFICE_LOCATIONS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete office location: ${res.status}`);
  }
}
