import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function SidebarContainer() {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <SidebarHeader />
      <div className="p-4">
        <Button className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>
      <SidebarNavigation />
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
