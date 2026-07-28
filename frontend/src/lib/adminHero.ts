import { adminFetch } from "@/lib/adminAuth";
import { API_BASE_URL } from "./apiConfig";

export interface AdminTelemetryPill {
  id: string;
  label: string;
  accent: "Signal" | "Ember";
  top: number;
  left: number;
  displayOrder: number;
}

export interface TelemetryPillInput {
  label: string;
  accent: "Signal" | "Ember";
  top: number;
  left: number;
  displayOrder: number;
}

export interface AdminHero {
  id: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
  telemetryPills: AdminTelemetryPill[];
}

export interface HeroFormPayload {
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
  telemetryPills: TelemetryPillInput[];
}

export const HERO_ADMIN_API_URL = `${API_BASE_URL}/hero`;

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
