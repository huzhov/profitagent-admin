import { TooltipContent } from "@/components/ui/tooltip";

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
          <a
            href="/settings/account#business-settings"
            className="underline font-medium"
          >
            Account & Integration Settings
          </a>
        </div>
      </TooltipContent>
    );

  if (isNoWhatsappIntegrationsAvailable)
    return (
      <TooltipContent sideOffset={4}>
        <div>
          <p className="font-medium">No WhatsApp numbers available.</p>
          Please add one in{" "}
          <a
            href="/settings/account#whatsapp-account"
            className="underline font-medium"
          >
            Account & Integration Settings
          </a>
        </div>
      </TooltipContent>
    );

  return null;
}
