import { API_BASE_URL } from "./apiConfig";
export interface PartnerDto {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  displayOrder: number;
}
export const PARTNERS_API_URL = `${API_BASE_URL}/partners`;
export async function fetchPartners(): Promise<PartnerDto[]> {
  try {
    const response = await fetch(PARTNERS_API_URL, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as PartnerDto[];
  } catch {
    return [];
  }
}
