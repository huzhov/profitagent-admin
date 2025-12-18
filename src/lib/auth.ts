import type { User } from "@/types/user";
import { queryClient } from "./queryClient";
import useUserStore from "@/store/user-store";
import useBusinessStore from "@/store/business-store";

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

export function logout() {
  removeToken();
  useUserStore.persist.clearStorage();
  useBusinessStore.persist.clearStorage();
  queryClient.removeQueries();
}
