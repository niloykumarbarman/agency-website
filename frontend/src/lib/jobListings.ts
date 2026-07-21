export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
}

export const JOB_LISTINGS_API_URL = "http://localhost:5240/api/job-listings";

export async function fetchJobListings(): Promise<JobListing[]> {
  const res = await fetch(JOB_LISTINGS_API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch job listings: ${res.status}`);
  }
  return res.json();
}
