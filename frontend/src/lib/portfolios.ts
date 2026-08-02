import { API_BASE_URL } from "./apiConfig";

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  summary: string;
  thumbnailUrl: string;
  projectUrl: string;
  techStack: string;
  isFeatured: boolean;
}

export interface PortfolioImage {
  imageUrl: string;
  caption: string;
  displayOrder: number;
}

export interface PortfolioMetric {
  label: string;
  value: string;
  displayOrder: number;
}

export interface PortfolioDetail {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  summary: string;
  thumbnailUrl: string;
  projectUrl: string;
  techStack: string;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  testimonialId: string | null;
  testimonialQuote: string | null;
  testimonialClientName: string | null;
  testimonialClientTitle: string | null;
  images: PortfolioImage[];
  metrics: PortfolioMetric[];
}

export const PORTFOLIOS_API_URL = `${API_BASE_URL}/portfolios`;

/** Backend stores TechStack as a comma-separated string; UI needs a list. */
export function parseTechStack(techStack: string): string[] {
  return techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch(PORTFOLIOS_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios: ${res.status}`);
  }
  return res.json();
}

export async function fetchPortfolioBySlug(
  slug: string
): Promise<PortfolioDetail | null> {
  const res = await fetch(`${PORTFOLIOS_API_URL}/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio: ${res.status}`);
  }
  return res.json();
}
