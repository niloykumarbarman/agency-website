import { API_BASE_URL } from "./apiConfig";
export interface OfficeLocationDto {
  id: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  mapQuery: string;
  displayOrder: number;
}
export const OFFICE_LOCATIONS_API_URL = `${API_BASE_URL}/office-locations`;
export async function fetchOfficeLocations(): Promise<OfficeLocationDto[]> {
  try {
    const response = await fetch(OFFICE_LOCATIONS_API_URL, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    return (await response.json()) as OfficeLocationDto[];
  } catch {
    return [];
  }
}
