// Lightweight fetch wrapper that appends Authorization header when a token is present
import { getToken, setToken } from "./auth";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

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

// async function getErrorMessage(res: Response): Promise<string> {
//   const ct = res.headers.get("content-type") || "";
//   // Prefer JSON message if available
//   if (ct.includes("application/json")) {
//     try {
//       const data = await res.clone().json();
//       const msg =
//         (data &&
//           (data.message ||
//             data.error?.message ||
//             data.error ||
//             data.detail ||
//             data.title ||
//             (Array.isArray(data.errors) && data.errors[0]?.message))) ||
//         "";
//       if (typeof msg === "string" && msg.trim()) return msg;
//     } catch {}
//   }
//   // Fallback to text body
//   try {
//     const text = await res.clone().text();
//     if (text && text.trim()) return text.trim();
//   } catch {}
//   return res.statusText || "Request failed";
// }

export async function apiFetch(
  input: string,
  init: RequestInit = {}
): Promise<AxiosResponse> {
  const token = getToken();
  let headers: Record<string, string> = {};
  if (init.headers) {
    if (init.headers instanceof Headers) {
      init.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(init.headers)) {
      for (const [key, value] of init.headers) {
        headers[key] = value;
      }
    } else {
      headers = { ...(init.headers as Record<string, string>) };
    }
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config: AxiosRequestConfig = {
    url: input,
    method: (init.method as any) || "GET",
    headers,
    data: init.body ? JSON.parse(init.body as string) : undefined,
  };
  try {
    const res = await axios(config);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = resolveUrl(input);
      const isLoginEndpoint = url?.pathname?.endsWith("/login");
      if (isLoginEndpoint) {
        // Let caller handle 401 for login to surface server message
        throw error;
      }
      setToken(null);
      if (typeof window !== "undefined" && !isRedirecting401) {
        const alreadyOnLogin = window.location.pathname === "/login";
        if (!alreadyOnLogin) {
          isRedirecting401 = true;
          window.location.replace("/login");
        }
      }
      let message = "Unexpected server error";
      try {
        const serverMsg = error.response?.data?.message;
        if (serverMsg) message = `HTTP 401: ${serverMsg}`;
      } catch {}
      throw new Error(message);
    }
    throw error;
  }
}

export async function apiJson<T>(
  input: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await apiFetch(input, init);
  return res.data as T;
}
