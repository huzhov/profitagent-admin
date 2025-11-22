import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({}) => {
    if (getToken() === null) {
      localStorage.clear();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});
