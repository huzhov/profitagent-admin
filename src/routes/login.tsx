import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "@/pages/LoginPage";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({}) => {
    if (getToken() !== null) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: LoginPage,
});
