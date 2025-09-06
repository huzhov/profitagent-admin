import { BarChart3, Grid3X3, Bot, MessageSquare, Users } from "lucide-react";

export default function SidebarNavigation({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const mainSections = [
    { id: "reporting", title: "Reporting", icon: BarChart3 },
    { id: "agents", title: "Agents Hub", icon: Grid3X3 },
    { id: "builder", title: "Agent Builder", icon: Bot },
    { id: "messages", title: "Messages", icon: MessageSquare },
    { id: "admin", title: "User Admin", icon: Users },
  ];

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-2">
        {mainSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                activeSection === section.id
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
