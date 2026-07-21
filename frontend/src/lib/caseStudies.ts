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

export const CASE_STUDIES_API_URL = "http://localhost:5240/api/case-studies";

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const res = await fetch(CASE_STUDIES_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch case studies: ${res.status}`);
  }
  return res.json();
}
