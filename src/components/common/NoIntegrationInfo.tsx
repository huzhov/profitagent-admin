import { TooltipContent } from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";

type NoIntegrationInfoProps = {
  isNoWhatsappIntegrationsAvailable?: boolean;
  isNoBusinessAvailable?: boolean;
};

export default function NoIntegrationInfo({
  isNoWhatsappIntegrationsAvailable,
  isNoBusinessAvailable,
}: NoIntegrationInfoProps) {
  if (isNoBusinessAvailable)
    return (
      <TooltipContent sideOffset={4}>
        <div>
          <p className="font-medium">Business Setup Required</p> You need to
          create a business in the{" "}
          <Link
            to="/settings/account"
            hash="business-settings"
            className="underline font-medium"
          >
            Account & Integration Settings
          </Link>
        </div>
      </TooltipContent>
    );

  if (isNoWhatsappIntegrationsAvailable)
    return (
      <TooltipContent sideOffset={4}>
        <div>
          <p className="font-medium">No WhatsApp numbers available.</p>
          Please add one in{" "}
          <Link
            to="/settings/account"
            hash="whatsapp-account"
            className="underline font-medium"
          >
            Account & Integration Settings
          </Link>
        </div>
      </TooltipContent>
    );

  return null;
}
