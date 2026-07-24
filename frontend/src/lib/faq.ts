export const API_BASE_URL = "http://localhost:5240/api";

export interface FaqDto {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export async function fetchFaqs(): Promise<FaqDto[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/faqs`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as FaqDto[];
  } catch {
    return [];
  }
}
