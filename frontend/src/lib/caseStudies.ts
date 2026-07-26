import { API_BASE_URL } from "./apiConfig";
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  coverImageUrl: string;
}

export const CASE_STUDIES_API_URL = `${API_BASE_URL}/case-studies`;

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetch(CASE_STUDIES_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch case studies: ${res.status}`);
  }
  return res.json();
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const res = await fetch(`${CASE_STUDIES_API_URL}/${slug}`, {
    cache: "no-store",
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch case study: ${res.status}`);
  }
  return res.json();
}
