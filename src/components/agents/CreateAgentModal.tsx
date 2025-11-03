import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Bot, Headphones } from "lucide-react";

interface AgentType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  hoverBgColor: string;
}

const agentTypes: AgentType[] = [
  {
    id: "onboarding",
    title: "Onboarding Agent",
    description:
      "Guide new users through your product or service with personalized onboarding flows",
    icon: Users,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBgColor: "hover:bg-blue-50",
  },
  {
    id: "sales",
    title: "Sales Agent",
    description:
      "Qualify leads, answer product questions, and drive conversions with intelligent sales conversations",
    icon: Bot,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    hoverBgColor: "hover:bg-green-50",
  },
  {
    id: "support",
    title: "Support Agent",
    description:
      "Provide instant customer support, resolve issues, and enhance customer satisfaction",
    icon: Headphones,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverBgColor: "hover:bg-purple-50",
  },
];

interface CreateAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAgentType?: (agentTypeId: string) => void;
}

export function CreateAgentModal({
  open,
  onOpenChange,
  onSelectAgentType,
}: CreateAgentModalProps) {
  const handleSelectAgent = (agentTypeId: string) => {
    onSelectAgentType?.(agentTypeId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Agent</DialogTitle>
          <DialogDescription>
            Choose the type of agent you want to create
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {agentTypes.map((agentType) => {
            const Icon = agentType.icon;
            return (
              <button
                key={agentType.id}
                onClick={() => handleSelectAgent(agentType.id)}
                className={`bg-white rounded-lg border-2 border-gray-200 p-4 text-left transition-all ${agentType.hoverBgColor} hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${agentType.iconBgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${agentType.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{agentType.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {agentType.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
