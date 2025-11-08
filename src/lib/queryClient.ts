import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

const publicRoutes = ["/login", "/signup"];

const isPublicRoute = publicRoutes.some((route) => {
  return (
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
});

const handleOnError = (error: any) => {
  // Redirect to login
  if (error.status === 401 && isPublicRoute) {
    localStorage.clear();
    location.replace("/login");
  }

  toast.error(error.message);
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleOnError,
  }),
  mutationCache: new MutationCache({
    onError: handleOnError,
  }),
});
