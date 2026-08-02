import { adminFetch } from "@/lib/adminAuth";
import { API_BASE_URL } from "./apiConfig";

export interface AdminPortfolioImage {
  imageUrl: string;
  caption: string;
  displayOrder: number;
}

export interface AdminPortfolioMetric {
  label: string;
  value: string;
  displayOrder: number;
}

export interface AdminPortfolio {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  summary: string;
  thumbnailUrl: string;
  projectUrl: string;
  techStack: string;
  isFeatured: boolean;
  displayOrder: number;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  testimonialId: string | null;
  images: AdminPortfolioImage[];
  metrics: AdminPortfolioMetric[];
}

export interface PortfolioFormPayload {
  title: string;
  slug: string;
  clientName: string;
  summary: string;
  thumbnailUrl: string;
  projectUrl: string;
  techStack: string;
  isFeatured: boolean;
  displayOrder: number;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  testimonialId: string;
  images: AdminPortfolioImage[];
  metrics: AdminPortfolioMetric[];
}

export const PORTFOLIOS_ADMIN_API_URL = `${API_BASE_URL}/portfolios`;

export async function fetchAdminPortfolios() {
  const res = await adminFetch(`${PORTFOLIOS_ADMIN_API_URL}/admin`);
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios: ${res.status}`);
  }
  return res.json() as Promise<AdminPortfolio[]>;
}

function toApiPayload(payload: PortfolioFormPayload) {
  return {
    ...payload,
    testimonialId: payload.testimonialId ? payload.testimonialId : null,
  };
}

export async function createPortfolio(payload: PortfolioFormPayload) {
  const res = await adminFetch(PORTFOLIOS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(toApiPayload(payload)),
  });
  if (!res.ok) {
    throw new Error(`Failed to create portfolio: ${res.status}`);
  }
  return res.json() as Promise<string>;
}

export async function updatePortfolio(id: string, payload: PortfolioFormPayload) {
  const res = await adminFetch(`${PORTFOLIOS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...toApiPayload(payload) }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update portfolio: ${res.status}`);
  }
}

export async function deletePortfolio(id: string) {
  const res = await adminFetch(`${PORTFOLIOS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete portfolio: ${res.status}`);
  }
}
