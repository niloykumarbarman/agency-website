import { API_BASE_URL } from "@/lib/apiConfig";
import TestimonialsView from "./TestimonialsView";

type TestimonialItem = {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientPhotoUrl: string;
  quote: string;
  rating: number;
};

async function fetchTestimonials(): Promise<TestimonialItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials?featured=true`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as TestimonialItem[];
  } catch {
    return [];
  }
}

export default async function Testimonials() {
  const items = await fetchTestimonials();
  return <TestimonialsView items={items} />;
}
