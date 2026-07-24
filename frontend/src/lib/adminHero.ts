import { adminFetch } from "@/lib/adminAuth";

export interface AdminHero {
  id: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
}

export interface HeroFormPayload {
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
}

export const HERO_ADMIN_API_URL = "http://localhost:5240/api/hero";

export async function fetchAdminHero() {
  const res = await adminFetch(HERO_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch hero content: ${res.status}`);
  }
  return res.json() as Promise<AdminHero>;
}

export async function updateHero(id: string, payload: HeroFormPayload) {
  const res = await adminFetch(HERO_ADMIN_API_URL, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update hero content: ${res.status}`);
  }
}
