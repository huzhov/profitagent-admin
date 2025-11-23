import type { User } from "@/types/user";

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

export function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
