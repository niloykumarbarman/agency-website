import { adminFetch } from "@/lib/adminAuth";

export type ConsultationStatus =
  | "New"
  | "Contacted"
  | "Scheduled"
  | "Completed"
  | "Cancelled";

// Backend enum has no JsonStringEnumConverter configured, so the
// UpdateConsultationRequestStatus command binds Status as an integer
// matching the enum's declaration order in ConsultationRequestStatus.cs.
const STATUS_TO_INT: Record<ConsultationStatus, number> = {
  New: 0,
  Contacted: 1,
  Scheduled: 2,
  Completed: 3,
  Cancelled: 4,
};

export const CONSULTATION_STATUS_OPTIONS: ConsultationStatus[] = [
  "New",
  "Contacted",
  "Scheduled",
  "Completed",
  "Cancelled",
];

export interface AdminConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterest: string;
  projectBudgetRange: string;
  preferredDate: string | null;
  preferredTimeSlot: string;
  additionalDetails: string;
  status: ConsultationStatus;
  createdAt: string;
}

export const CONSULTATION_REQUESTS_ADMIN_API_URL =
  "http://localhost:5240/api/consultation-requests";

export async function fetchAdminConsultationRequests(): Promise<
  AdminConsultationRequest[]
> {
  const res = await adminFetch(CONSULTATION_REQUESTS_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch consultation requests: ${res.status}`);
  }
  return res.json();
}

export async function updateConsultationRequestStatus(
  id: string,
  status: ConsultationStatus
): Promise<void> {
  const res = await adminFetch(
    `${CONSULTATION_REQUESTS_ADMIN_API_URL}/${id}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ id, status: STATUS_TO_INT[status] }),
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to update status: ${res.status}`);
  }
}

export async function deleteConsultationRequest(id: string): Promise<void> {
  const res = await adminFetch(
    `${CONSULTATION_REQUESTS_ADMIN_API_URL}/${id}`,
    { method: "DELETE" }
  );
  if (!res.ok) {
    throw new Error(`Failed to delete consultation request: ${res.status}`);
  }
}
