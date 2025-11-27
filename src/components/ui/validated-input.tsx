import { forwardRef } from "react";
import { Loader2, Check, X } from "lucide-react";
import { Input } from "./input";
import type { ValidationStatus } from "@/hooks/useNameValidation";

export interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validationStatus?: ValidationStatus;
  showValidation?: boolean;
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      validationStatus = "idle",
      showValidation = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const getValidationClasses = () => {
      if (!showValidation || validationStatus === "idle") return "";

      if (validationStatus === "exists" || validationStatus === "error") {
        return "border-red-500 focus-visible:ring-red-500";
      }

      if (validationStatus === "available") {
        return "border-green-500 focus-visible:ring-green-500";
      }

      return "";
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          className={`pr-10 ${getValidationClasses()} ${className}`}
          {...props}
        />
        {showValidation && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {validationStatus === "checking" && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            )}
            {validationStatus === "available" && (
              <Check className="w-4 h-4 text-green-600" />
            )}
            {(validationStatus === "exists" ||
              validationStatus === "error") && (
              <X className="w-4 h-4 text-red-500" />
            )}
          </div>
        )}
      </div>
    );
  }
);

ValidatedInput.displayName = "ValidatedInput";
