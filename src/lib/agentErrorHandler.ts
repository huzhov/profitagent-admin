import type { AxiosError } from "axios";
import type { UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import type { AgentFormValues } from "@/components/agent-builder/schema";

/**
 * Centralized error handler for agent mutations (create/update)
 * Handles common API errors and displays appropriate toast messages
 */
export const handleAgentMutationError = (
  error: AxiosError<{ error?: string; message?: string }>,
  setError?: UseFormSetError<AgentFormValues>
) => {
  if (error.response?.status === 500) {
    const errorData = error.response?.data;

    if (errorData?.error === "PrismaClientKnownRequestError") {
      toast.error(
        "Database error: The selected WhatsApp integration may not be valid or accessible. Please verify your WhatsApp number selection.",
        { duration: 3000 }
      );
    } else {
      toast.error(
        "Server error occurred while processing your request. Please try again or contact support.",
        { duration: 3000 }
      );
    }
  } else if (error.response?.status === 400) {
    toast.error(
      error.response?.data?.message ||
        "Invalid data provided. Please check all required fields.",
      { duration: 3000 }
    );
  }

  if (
    error?.message === "Agent with this name already exists (403)" &&
    setError
  ) {
    setError("agentName", {
      type: "manual",
      message: "Agent with this name already exists",
    });
  }
};
