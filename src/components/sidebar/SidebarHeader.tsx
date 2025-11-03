import { TrendingUp } from "lucide-react";

export default function SidebarHeader() {
  return (
    <div className="p-6 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">ProfitAgent</h1>
          <p className="text-sm text-muted-foreground">AI Sales Platform</p>
        </div>
      </div>
    </div>
  );
}
