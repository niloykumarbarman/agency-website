import { API_BASE_URL } from "./apiConfig";

export interface TelemetryPillDto {
  id: string;
  label: string;
  accent: "Signal" | "Ember"; // serialized as string name via .ToString() in TelemetryPillDto
  top: number;
  left: number;
  displayOrder: number;
}

export interface HeroDto {
  id: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string;
  telemetryPills: TelemetryPillDto[];
}

export async function fetchHero(): Promise<HeroDto | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/hero`, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as HeroDto;
  } catch {
    return null;
  }
}

export function resolveImageUrl(path: string): string {
  if (!path) {
    return "";
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const origin = API_BASE_URL.replace(/\/api$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
