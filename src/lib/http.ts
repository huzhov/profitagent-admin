// Lightweight fetch wrapper that appends Authorization header when a token is present
import { getToken, setToken } from "./auth";

let isRedirecting401 = false;

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers = new Headers(init.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Don't mutate caller's init
  const nextInit: RequestInit = { ...init, headers };
  const res = await fetch(input, nextInit);

  if (res.status === 401) {
    // Clear any stored token
    setToken(null);
    // Avoid multiple redirects and loops
    if (typeof window !== "undefined" && !isRedirecting401) {
      const alreadyOnLogin = window.location.pathname === "/login";
      if (!alreadyOnLogin) {
        isRedirecting401 = true;
        // Replace to avoid back button loop
        window.location.replace("/login");
      }
    }
    throw new Error("Unauthorized (401)");
  }

  return res;
}

export async function apiJson<T>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}
