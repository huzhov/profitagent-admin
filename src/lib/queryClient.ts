import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

interface HttpError extends Error {
  status?: number;
  message: string;
}

const publicRoutes = ["/login", "/signup"];

const isPublicRoute = publicRoutes.some((route) => {
  return (
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
});

const handleOnError = (error: HttpError) => {
  // Redirect to login
  if (error.status === 401 && !isPublicRoute) {
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
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown): boolean => {
        // Stop retrying on 400 (Bad Request)
        if ((error as HttpError)?.status === 400) {
          return false;
        }
        // Default retry logic
        return failureCount < 3;
      },
    },
  },
});
