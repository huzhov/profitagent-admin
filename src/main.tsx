import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import "./index.css";
// import { setupGlobalErrorHandling } from "@/lib/errorHandler";
import { Toaster } from "@/components/ui/sonner";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AppProvider } from "./context/AppContext";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  // install global error handlers once at startup
  // setupGlobalErrorHandling();
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="bottom-center" richColors />
        </QueryClientProvider>
      </AppProvider>
    </StrictMode>
  );
}
