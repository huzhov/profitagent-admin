import { useState, useEffect, useRef, useCallback } from "react";
import type {
  UseFormSetError,
  UseFormClearErrors,
  FieldValues,
  Path,
} from "react-hook-form";

export type ValidationStatus =
  | "idle"
  | "checking"
  | "available"
  | "exists"
  | "error";

export interface NameValidationState {
  status: ValidationStatus;
  message?: string;
}

export interface UseNameValidationOptions<T extends FieldValues> {
  name: string;
  checkExists: (name: string) => Promise<{ exists: boolean }>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  fieldName: Path<T>;
  debounceMs?: number;
  minLength?: number;
  enabled?: boolean;
}

export function useNameValidation<T extends FieldValues>({
  name,
  checkExists,
  setError,
  clearErrors,
  fieldName,
  debounceMs = 1000,
  minLength = 2,
  enabled = true,
}: UseNameValidationOptions<T>) {
  const [validation, setValidation] = useState<NameValidationState>({
    status: "idle",
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validateName = useCallback(
    async (value: string) => {
      if (!value || value.trim().length === 0) {
        setValidation({ status: "idle" });
        return;
      }

      if (value.trim().length < minLength) {
        setValidation({
          status: "error",
          message: `Name must be at least ${minLength} characters`,
        });
        return;
      }

      setValidation({ status: "checking" });

      try {
        const result = await checkExists(value);
        if (result.exists) {
          setValidation({
            status: "exists",
            message: "This name already exists",
          });
          setError(fieldName, {
            type: "manual",
            message: "This name already exists",
          });
        } else {
          setValidation({ status: "available" });
          // Clear any existing error
          clearErrors(fieldName);
        }
      } catch (error) {
        console.error("Error checking name:", error);
        setValidation({
          status: "error",
          message: "Failed to validate name",
        });
      }
    },
    [checkExists, setError, clearErrors, fieldName, minLength]
  );

  useEffect(() => {
    if (!enabled) {
      setValidation({ status: "idle" });
      return;
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced validation
    timeoutRef.current = setTimeout(() => {
      validateName(name);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [name, enabled, validateName, debounceMs]);

  return validation;
}
