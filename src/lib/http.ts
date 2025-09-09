// Lightweight fetch wrapper that appends Authorization header when a token is present
import { getToken, setToken } from "./auth";

let isRedirecting401 = false;

function resolveUrl(input: RequestInfo | URL): URL | null {
  try {
    if (typeof input === "string") {
      return new URL(
        input,
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost"
      );
    }
    if (input instanceof URL) return input;
    // Request object
    const req = input as Request;
    return new URL(
      req.url,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost"
    );
  } catch {
    return null;
  }
}

async function getErrorMessage(res: Response): Promise<string> {
  const ct = res.headers.get("content-type") || "";
  // Prefer JSON message if available
  if (ct.includes("application/json")) {
    try {
      const data = await res.clone().json();
      const msg =
        (data &&
          (data.message ||
            data.error?.message ||
            data.error ||
            data.detail ||
            data.title ||
            (Array.isArray(data.errors) && data.errors[0]?.message))) ||
        "";
      if (typeof msg === "string" && msg.trim()) return msg;
    } catch {}
  }
  // Fallback to text body
  try {
    const text = await res.clone().text();
    if (text && text.trim()) return text.trim();
  } catch {}
  return res.statusText || "Request failed";
}

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
    const url = resolveUrl(input);
    const isLoginEndpoint = url?.pathname?.endsWith("/login");
    if (isLoginEndpoint) {
      // Let caller handle 401 for login to surface server message
      return res;
    }
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

    let message = "Unexpected server error";
    try {
      const serverMsg = await getErrorMessage(res);
      if (serverMsg) message = `HTTP 401: ${serverMsg}`;
    } catch {}
    throw new Error(message);
  }

  return res;
}

export async function apiJson<T>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    const message = await getErrorMessage(res);
    throw new Error(`HTTP ${res.status}: ${message}`);
  }
  return (await res.json()) as T;
}
