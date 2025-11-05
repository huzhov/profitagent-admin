import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginPage from "@/pages/LoginPage";
import { isAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({}) => {
    if (isAuth()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: LoginPage,
});
