import { adminFetch } from "@/lib/adminAuth";

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
}

export const PORTFOLIOS_ADMIN_API_URL = "http://localhost:5240/api/portfolios";

export async function fetchAdminPortfolios() {
  const res = await adminFetch(`${PORTFOLIOS_ADMIN_API_URL}/admin`);
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios: ${res.status}`);
  }
  return res.json() as Promise<AdminPortfolio[]>;
}

export async function createPortfolio(payload: PortfolioFormPayload) {
  const res = await adminFetch(PORTFOLIOS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create portfolio: ${res.status}`);
  }
  return res.json() as Promise<string>;
}

export async function updatePortfolio(id: string, payload: PortfolioFormPayload) {
  const res = await adminFetch(`${PORTFOLIOS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
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
