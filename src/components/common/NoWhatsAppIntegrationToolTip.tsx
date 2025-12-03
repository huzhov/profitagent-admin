export default function NoWhatsAppIntegrationToolTip() {
  return (
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
  );
}
