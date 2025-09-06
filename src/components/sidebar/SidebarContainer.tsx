import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";

export default function SidebarContainer({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <SidebarHeader />
      <SidebarNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </aside>
  );
}
