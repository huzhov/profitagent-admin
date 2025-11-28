import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { logout } from "./auth";

interface HttpError extends Error {
  status?: number;
  message: string;
  code?: string;
  response?: unknown;
}

const handleOnError = (error: HttpError) => {
  const publicRoutes = ["/login", "/signup"];

  const isPublicRoute = publicRoutes.some((route) => {
    return (
      location.pathname === route || location.pathname.startsWith(`${route}/`)
    );
  });

  // Redirect to login
  if (error.status === 401 && !isPublicRoute) {
    logout();
    location.replace("/login");
  }

  toast.error(error.message.replace("(401)", ""), {
    duration: 3000,
  });
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
        // Only retry on network errors (request never reached backend or no response)
        // Do NOT retry on any HTTP status codes (including 4xx, 5xx)
        const axiosError = axios.isAxiosError(error);
        const httpError = error as HttpError;

        // If we have a response, it means the request reached the backend
        // In this case, DO NOT retry (including all 4xx, 5xx codes)
        if (httpError.response) {
          return false;
        }

        // Only retry on network errors where request never reached backend
        // or we never got a reply (ECONNABORTED, ERR_NETWORK, etc.)
        const isNetworkError =
          httpError.code === "ECONNABORTED" ||
          httpError.code === "ERR_NETWORK" ||
          httpError.code === "ETIMEDOUT" ||
          httpError.code === "ENOTFOUND" ||
          (axiosError && !httpError.response);

        // Retry up to 3 times only for network errors
        return isNetworkError && failureCount < 3;
      },
    },
  },
});
