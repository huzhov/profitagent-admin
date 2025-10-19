import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MainContentContainer from "@/components/main-content/MainContentContainer";
import SidebarContainer from "@/components/sidebar/SidebarContainer";

const DASHBOARD_ROUTES = [
  "/",
  "/messages",
  "/integrations",
  "/business-settings",
  "/reporting",
  "/agents",
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
        <div className="min-h-screen bg-background flex">
          <SidebarContainer />
          <MainContentContainer>
            <Outlet />
          </MainContentContainer>
        </div>
      ) : (
        <Outlet />
      )}
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
