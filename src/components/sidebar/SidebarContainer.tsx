// import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import { Power } from "lucide-react";
import { logout } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { getAgentCount } from "@/services/agents";
import { useBusiness } from "@/context/AppContext";
import { useNavigate } from "@tanstack/react-router";

export default function SidebarContainer() {
  const { business } = useBusiness();

  const navigate = useNavigate();

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
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* <SidebarHeader /> */}
      <div className="p-2" />
      <SidebarNavigation agentCount={data?.count} />
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
