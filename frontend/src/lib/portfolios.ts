export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  summary: string;
  thumbnailUrl: string;
  projectUrl: string;
  techStack: string[];
  isFeatured: boolean;
}

export const PORTFOLIOS_API_URL = "http://localhost:5240/api/portfolios";

export async function fetchPortfolios(): Promise<Portfolio[]> {
  const res = await fetch(PORTFOLIOS_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios: ${res.status}`);
  }
  return res.json();
}
