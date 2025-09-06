import { Badge } from "../ui/badge";

export default function SidebarHeader() {
  return (
    <div className="p-6 border-b border-border">
      <div className="flex items-center space-x-3">
        <img
          src="/images/profitagent-logo.png"
          alt="ProfitAgent"
          className="h-10 w-10"
        />
        <div>
          <h1 className="text-xl font-bold text-card-foreground">
            ProfitAgent.AI
          </h1>
          <p className="text-xs text-muted-foreground">
            WhatsApp Revenue Engine
          </p>
        </div>
      </div>
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-800 border-green-200 mt-2 text-xs"
      >
        Official Partner
      </Badge>
    </div>
  );
}
