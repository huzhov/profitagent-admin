import AgentBuilderContainer from "./agent-builder/AgentBuilderContainer";
import UsersManagement from "./UsersManagement";
import Reporting from "./Reporting";
import Agents from "./Agents";
import Messages from "./Messages";

enum NavbarSection {
  Builder = "builder",
  Admin = "admin",
  Reporting = "reporting",
  Agents = "agents",
  Messages = "messages",
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
      </div>
    </main>
  );
}
