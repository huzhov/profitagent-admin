import { createFileRoute, redirect } from "@tanstack/react-router";
import SignupPage from "@/pages/SignupPage";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  beforeLoad: async ({}) => {
    if (getToken() !== null) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
  component: SignupPage,
});
