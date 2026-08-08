import { API_BASE_URL } from "@/lib/apiConfig";
import PartnersView from "./PartnersView";

type PartnerDto = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  displayOrder: number;
};

async function fetchPartners(): Promise<PartnerDto[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/partners`, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as PartnerDto[];
  } catch {
    return [];
  }
}

export default async function Partners() {
  const partners = await fetchPartners();
  return <PartnersView partners={partners} />;
}
