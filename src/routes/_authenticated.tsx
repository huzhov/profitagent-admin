import { Suspense } from "react";
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import MainContentLayout from "@/layouts/MainContentLayout";
import SidebarContainer from "@/components/sidebar/SidebarContainer";
import { getToken } from "@/lib/auth";
import { Spinner } from "@/components/ui/spinner";
import Header from "@/components/header/Header";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({}) => {
    if (!getToken()) {
      localStorage.clear();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarContainer />
        <MainContentLayout>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <Spinner size="lg" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </MainContentLayout>
      </div>
    </div>
  );
}
