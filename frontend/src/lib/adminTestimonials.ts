import { adminFetch } from "@/lib/adminAuth";

export interface AdminTestimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientPhotoUrl: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
}

export interface TestimonialFormPayload {
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientPhotoUrl: string;
  quote: string;
  rating: number;
  isFeatured: boolean;
}

export const TESTIMONIALS_ADMIN_API_URL = "http://localhost:5240/api/testimonials";

export async function fetchAdminTestimonials() {
  const res = await adminFetch(`${TESTIMONIALS_ADMIN_API_URL}/admin`);
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials: ${res.status}`);
  }
  return res.json() as Promise<AdminTestimonial[]>;
}

export async function createTestimonial(payload: TestimonialFormPayload) {
  const res = await adminFetch(TESTIMONIALS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to create testimonial: ${res.status}`);
  }
  return res.json() as Promise<string>;
}

export async function updateTestimonial(id: string, payload: TestimonialFormPayload) {
  const res = await adminFetch(`${TESTIMONIALS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update testimonial: ${res.status}`);
  }
}

export async function deleteTestimonial(id: string) {
  const res = await adminFetch(`${TESTIMONIALS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete testimonial: ${res.status}`);
  }
}
