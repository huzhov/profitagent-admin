import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonIcon?: LucideIcon;
  onButtonClick?: () => void;
  showButton?: boolean;
  showBorder?: boolean;
}

export function PageHeader({
  title,
  description,
  buttonLabel,
  buttonIcon: ButtonIcon,
  onButtonClick,
  showButton = true,
  showBorder = false,
}: PageHeaderProps) {
  if (showBorder) {
    return (
      <div className="border-b border-border bg-card -mx-6 -mt-6">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            {showButton && buttonLabel && (
              <Button
                className="h-10 px-6 has-[>svg]:px-4 shadow-none cursor-pointer"
                onClick={onButtonClick}
              >
                {ButtonIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
                {buttonLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {showButton && buttonLabel && (
        <Button
          className="h-10 px-6 has-[>svg]:px-4 shadow-none cursor-pointer"
          onClick={onButtonClick}
        >
          {ButtonIcon && <ButtonIcon className="w-4 h-4 mr-2" />}
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
