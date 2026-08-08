import { API_BASE_URL } from "@/lib/apiConfig";
import ServicesView from "./ServicesView";

type ServiceItem = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  iconUrl: string;
  displayOrder: number;
};

async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { cache: "no-store" });
    if (!res.ok) {
      return [];
    }
    return (await res.json()) as ServiceItem[];
  } catch {
    return [];
  }
}

export default async function Services() {
  const services = await fetchServices();
  return <ServicesView services={services} />;
}
