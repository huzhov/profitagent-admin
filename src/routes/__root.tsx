import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MainContentLayout from "@/layouts/MainContentLayout";
import SidebarContainer from "@/components/sidebar/SidebarContainer";

const DASHBOARD_ROUTES = [
  "/",
  "/messages",
  "/integrations",
  "/business-settings",
  "/reporting",
  "/agents",
  "/workflows",
  "/testing",
];

const RootLayout = () => {
  const { location } = useRouterState();

  const isDashboardRoute = DASHBOARD_ROUTES.some((route) => {
    if (route === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === route || location.pathname.startsWith(`${route}/`)
    );
  });

  return (
    <>
      {isDashboardRoute ? (
        <div className="flex h-screen bg-background">
          <SidebarContainer />
          <MainContentLayout>
            <Outlet />
          </MainContentLayout>
        </div>
      ) : (
        <Outlet />
      )}
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
