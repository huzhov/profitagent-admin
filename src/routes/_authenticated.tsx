import { createFileRoute, redirect } from "@tanstack/react-router";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({}) => {
    if (getToken() === null) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
