export type Account = {
  id: string;
  email: string;
  name: string;
  client_id: string;
};

export type LoginResponse = {
  token: string;
  account: Account;
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
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Login failed (${res.status})`);
  }
  const data = (await res.json()) as LoginResponse;
  if (!data?.token) throw new Error("Invalid login response: missing token");
  setToken(data.token);
  return data;
}

export function logout() {
  setToken(null);
}
