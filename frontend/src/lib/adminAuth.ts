export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
}

export const AUTH_LOGIN_API_URL = "http://localhost:5240/api/auth/login";

const TOKEN_STORAGE_KEY = "ferrowave_admin_token";

export async function loginAdmin(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(AUTH_LOGIN_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data: LoginResponse = await res.json();

  if (!res.ok || !data.success || !data.token) {
    throw new Error(data.errorMessage || `Login failed: ${res.status}`);
  }

  return data;
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function isAdminAuthenticated(): boolean {
  return getAdminToken() !== null;
}

export async function adminFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken();

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(input, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (res.status === 401) {
    clearAdminToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  }

  return res;
}
