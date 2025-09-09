import { toast } from "sonner";

let installed = false;

export function setupGlobalErrorHandling() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event: ErrorEvent) => {
    const message =
      event.error?.message || event.message || "An error occurred";
    toast.error(message);
  });

  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      // Best-effort extraction of a useful message
      const reason = (event as any).reason;
      let message = "An error occurred";
      if (typeof reason === "string") message = reason;
      else if (reason?.message && typeof reason.message === "string")
        message = reason.message;
      else if (reason instanceof Error) message = reason.message;
      toast.error(message);
    }
  );
}
