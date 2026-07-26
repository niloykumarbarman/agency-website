import { API_BASE_URL } from "./apiConfig";
export type ServiceInterest =
  | "WebDevelopment"
  | "MobileApp"
  | "CloudDevOps"
  | "UiUxDesign"
  | "Other";

export type ProjectBudgetRange =
  | "Under10k"
  | "Range10kTo50k"
  | "Range50kTo100k"
  | "Over100k"
  | "NotSure";

export type PreferredTimeSlot = "Morning" | "Afternoon" | "Evening";

export interface ConsultationRequestPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterest: ServiceInterest;
  projectBudgetRange: ProjectBudgetRange;
  preferredDate: string | null;
  preferredTimeSlot: PreferredTimeSlot;
  additionalDetails: string;
}

export const CONSULTATION_REQUESTS_API_URL =
  `${API_BASE_URL}/consultation-requests`;

export async function submitConsultationRequest(
  payload: ConsultationRequestPayload
): Promise<string> {
  const res = await fetch(CONSULTATION_REQUESTS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit consultation request: ${res.status}`);
  }

  return res.json();
}
