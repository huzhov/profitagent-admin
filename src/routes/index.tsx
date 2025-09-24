import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import MainContentContainer from "../components/main-content/MainContentContainer";
import SidebarContainer from "../components/sidebar/SidebarContainer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== "https://www.facebook.com") return;
      try {
        const payload = JSON.parse(event.data);
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

  const [activeSection, setActiveSection] = useState("builder");

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <MainContentContainer
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}
