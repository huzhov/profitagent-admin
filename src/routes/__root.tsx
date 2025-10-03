import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

type WA_EMBEDDED_SIGNUP_PAYLOAD = {
  type: "WA_EMBEDDED_SIGNUP";
  data: {
    waba_id: string;
    phone_number_id: string;
    business_id: string;
  };
  event: string;
  version: string;
};

const RootLayout = () => {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;
      console.log("event", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("event data: ", payload);

        if (payload.type === "WA_EMBEDDED_SIGNUP") {
          console.log("message event: ", payload);
          // payload.data contains { waba_id, phone_number_id, business_id }
          // payload.code is your OAuth code → send it to backend
          if (
            payload.event === "FINISH" ||
            payload.event === "FINISH_ONLY_WABA"
          ) {
            console.log("Signup finished", payload);
            // fetch("/api/wa/install", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({
            //     code: payload.code,
            //     waba_id: payload.data.waba_id,
            //     phone_number_id: payload.data.phone_number_id,
            //   }),
            // });
          }
        }
      } catch (err) {
        console.error("Failed to parse message event data:", err);
        // ignore parsing errors
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
