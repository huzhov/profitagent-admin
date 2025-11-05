import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({}) => {
    if (!isAuth()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});
