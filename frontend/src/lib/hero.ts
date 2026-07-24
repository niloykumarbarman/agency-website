export const API_BASE_URL = "http://localhost:5240/api";

export interface HeroDto {
  id: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  backgroundImageUrl: string;
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
