import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import { Power } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/lib/auth";
import useUserStore from "@/store/user-store";
import { getInitials } from "@/helper/getInitials";
import { useQuery } from "@tanstack/react-query";
import { getAgentCount } from "@/services/agents";
import { useBusiness } from "@/context/AppContext";

export default function SidebarContainer() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { business } = useBusiness();

  const { data } = useQuery({
    queryKey: ["agentCount"],
    queryFn: async () => getAgentCount(),
    enabled: !!business,
  });

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col">
      <SidebarHeader />
      <div className="p-4" />
      <SidebarNavigation agentCount={data?.count} />
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
    </aside>
  );
}
