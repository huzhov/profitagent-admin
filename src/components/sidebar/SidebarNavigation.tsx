import {
  BarChart3,
  Grid3X3,
  Bot,
  MessageSquare,
  Blocks,
  Building2,
} from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export default function SidebarNavigation() {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const mainSections = [
    { id: "builder", title: "Agent Builder", icon: Bot, route: "/" },
    {
      id: "messages",
      title: "Messages",
      icon: MessageSquare,
      route: "/messages",
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Blocks,
      route: "/integrations",
    },
    {
      id: "business-settings",
      title: "Business Settings",
      icon: Building2,
      route: "/business-settings",
    },
    {
      id: "reporting",
      title: "Reporting",
      icon: BarChart3,
      route: "/reporting",
    },
    { id: "agents", title: "Agents Hub", icon: Grid3X3, route: "/agents" },
  ];

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {mainSections.map((section) => {
          const Icon = section.icon;
          const isActive =
            section.route === "/"
              ? currentPath === "/"
              : currentPath === section.route ||
                currentPath.startsWith(`${section.route}/`);

          return (
            <button
              key={section.id}
              onClick={() => navigate({ to: section.route })}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{section.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
