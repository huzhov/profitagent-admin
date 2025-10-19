import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";

export default function SidebarContainer() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <SidebarHeader />
      <SidebarNavigation />
    </aside>
  );
}
