import { adminFetch } from "@/lib/adminAuth";

export type JobListingStatus = "Draft" | "Open" | "Closed" | "Archived";

// Backend enum has no JsonStringEnumConverter configured, so Create/Update
// commands bind Status as an integer matching JobListingStatus.cs declaration order.
const STATUS_TO_INT: Record<JobListingStatus, number> = {
  Draft: 0,
  Open: 1,
  Closed: 2,
  Archived: 3,
};

export const JOB_LISTING_STATUS_OPTIONS: JobListingStatus[] = [
  "Draft",
  "Open",
  "Closed",
  "Archived",
];

export interface AdminJobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
}

export interface JobListingFormPayload {
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string;
  status: JobListingStatus;
}

export const JOB_LISTINGS_ADMIN_API_URL = "http://localhost:5240/api/job-listings";

export async function fetchAdminJobListings(): Promise<AdminJobListing[]> {
  const res = await adminFetch(JOB_LISTINGS_ADMIN_API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch job listings: ${res.status}`);
  }
  return res.json();
}

export async function createJobListing(
  payload: JobListingFormPayload
): Promise<string> {
  const res = await adminFetch(JOB_LISTINGS_ADMIN_API_URL, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      status: STATUS_TO_INT[payload.status],
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to create job listing: ${res.status}`);
  }
  return res.json();
}

export async function updateJobListing(
  id: string,
  payload: JobListingFormPayload
): Promise<void> {
  const res = await adminFetch(`${JOB_LISTINGS_ADMIN_API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      ...payload,
      status: STATUS_TO_INT[payload.status],
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update job listing: ${res.status}`);
  }
}

export async function deleteJobListing(id: string): Promise<void> {
  const res = await adminFetch(`${JOB_LISTINGS_ADMIN_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete job listing: ${res.status}`);
  }
}
