import AgentBuilderContainer from "./agent-builder/AgentBuilderContainer";
import UsersManagement from "./UsersManagement";
import Reporting from "./Reporting";
import Agents from "./Agents";
import Messages from "./messages/Messages";
import BusinessSettings from "./BusinessSettings";

enum NavbarSection {
  Builder = "builder",
  Admin = "admin",
  Reporting = "reporting",
  Agents = "agents",
  Messages = "messages",
  BusinessSettings = "business-settings",
}

export default function MainContentContainer({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto px-8 py-8">
        {activeSection === NavbarSection.Builder && <AgentBuilderContainer />}
        {activeSection === NavbarSection.Admin && <UsersManagement />}
        {activeSection === NavbarSection.Reporting && <Reporting />}
        {activeSection === NavbarSection.Agents && (
          <Agents setActiveSection={setActiveSection} />
        )}
        {activeSection === NavbarSection.Messages && <Messages />}
        {activeSection === NavbarSection.BusinessSettings && (
          <BusinessSettings />
        )}
      </div>
    </main>
  );
}
