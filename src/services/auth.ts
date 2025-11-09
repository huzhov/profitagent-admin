import axiosInstance from "@/lib/axiosInstance";
import type { User } from "@/types/user";

export type LoginResponse = {
  token: string;
  user: User;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<{
    token: string;
    user: User;
  }>(`/login`, {
    email,
    password,
  });
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
  const { data } = await axiosInstance.post<{
    token: string;
    user: User;
  }>(`/signup`, {
    email,
    name,
    password,
  });
  return data;
}
