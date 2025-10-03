export type User = {
  id: string;
  email: string;
  name: string;
  businessId: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

const TOKEN_KEY = "auth_token";

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  // Let the improved http error parsing logic run here too
  if (!res.ok) {
    // Try to parse server-provided error message
    const ct = res.headers.get("content-type") || "";
    let msg = "Login failed";
    if (ct.includes("application/json")) {
      try {
        const data = await res.clone().json();
        msg =
          data.message ||
          data.error?.message ||
          data.error ||
          data.detail ||
          data.title ||
          msg;
      } catch {}
    }
    if (!ct.includes("application/json")) {
      try {
        const t = await res.clone().text();
        if (t && t.trim()) msg = t.trim();
      } catch {}
    }
    throw new Error(`${msg} (${res.status})`);
  }
  const data = (await res.json()) as LoginResponse;
  if (!data?.token) throw new Error("Invalid login response: missing token");
  setToken(data.token);
  localStorage.setItem("businessId", data.user.businessId);
  return data;
}

export async function signup({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name, password }),
  });
  console.log("signup response", res);
  // Let the improved http error parsing logic run here too
  if (!res.ok) {
    // Try to parse server-provided error message
    const ct = res.headers.get("content-type") || "";
    let msg = "Login failed";
    if (ct.includes("application/json")) {
      try {
        const data = await res.clone().json();
        msg =
          data.message ||
          data.error?.message ||
          data.error ||
          data.detail ||
          data.title ||
          msg;
      } catch {}
    }
    if (!ct.includes("application/json")) {
      try {
        const t = await res.clone().text();
        if (t && t.trim()) msg = t.trim();
      } catch {}
    }
    throw new Error(`${msg} (${res.status})`);
  }
  const data = (await res.json()) as LoginResponse;
  if (!data?.token) throw new Error("Invalid login response: missing token");
  setToken(data.token);
  localStorage.setItem("businessId", data.user.businessId);
  return data;
}

export function logout() {
  setToken(null);
}
