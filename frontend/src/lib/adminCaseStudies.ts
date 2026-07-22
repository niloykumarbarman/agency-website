import { adminFetch } from "@/lib/adminAuth";

export interface AdminCaseStudy {
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

export interface CaseStudyFormPayload {
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  coverImageUrl: string;
  isPublished: boolean;
}

export const CASE_STUDIES_ADMIN_API_URL = "http://localhost:5240/api/case-studies";

export async function fetchAdminCaseStudies() {
  const res = await adminFetch(CASE_STUDIES_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch case studies: ${res.status}`);
  }
  return res.json() as Promise<AdminCaseStudy[]>;
}

export async function createCaseStudy(payload: CaseStudyFormPayload) {
  const res = await adminFetch(CASE_STUDIES_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create case study: ${res.status}`);
  }
  return res.json() as Promise<string>;
}

export async function updateCaseStudy(id: string, payload: CaseStudyFormPayload) {
  const res = await adminFetch(`${CASE_STUDIES_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update case study: ${res.status}`);
  }
}

export async function deleteCaseStudy(id: string) {
  const res = await adminFetch(`${CASE_STUDIES_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete case study: ${res.status}`);
  }
}
