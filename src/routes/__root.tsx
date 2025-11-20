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
  "/ab-testing",
  "/templates",
  "/intelligence",
  "/settings",
];

const AGENT_VIEW_PATTERN = /^\/agents\/[^/]+\/view$/;

const RootLayout = () => {
  const { location } = useRouterState();

  // Exclude agent creation routes from dashboard layout
  // const isAgentCreationRoute = location.pathname.startsWith("/agents/create/");
  // const isAgentEditRoute =
  //   location.pathname.startsWith("/agents") &&
  //   location.pathname.endsWith("/edit");

  // Check if current path matches agent view pattern
  const isAgentViewRoute = AGENT_VIEW_PATTERN.test(location.pathname);

  const isDashboardRoute =
    // !isAgentCreationRoute &&
    // !isAgentEditRoute &&
    isAgentViewRoute ||
    DASHBOARD_ROUTES.some((route) => {
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
