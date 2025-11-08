import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import { Button } from "../ui/button";
import { Plus, Power } from "lucide-react";
import { useState } from "react";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";
import { useNavigate } from "@tanstack/react-router";
import { removeToken } from "@/lib/auth";
import useUserStore from "@/store/user-store";
import { getInitials } from "@/helper/getInitials";

export default function SidebarContainer() {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { user, clearUser } = useUserStore();

  const handleLogout = () => {
    removeToken();
    clearUser();
    navigate({ to: "/login" });
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <SidebarHeader />
      <div className="p-4">
        <Button
          className="w-full mb-4"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>
      <SidebarNavigation />
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm">{getInitials(user?.name)}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </div>

      {/* Log Out */}
      <div className="p-2 border-t border-border text-muted-foreground hover:text-foreground hover:bg-accent/50">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-3 gap-3 rounded-lg text-left transition-colors `}
        >
          <Power className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Create Agent Modal */}
      <CreateAgentModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSelectAgentType={(agentTypeId) => {
          navigate({ to: `/agents/create/${agentTypeId}` as any });
        }}
      />
    </aside>
  );
}
