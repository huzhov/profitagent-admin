import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";
import {
  MessageSquare,
  Cog,
  Wrench,
  GitBranch,
  Cpu,
  CircleStop,
} from "lucide-react";

export type WorkflowNodeData = {
  label: string;
  type: "prompt" | "action" | "tool" | "decision" | "system" | "end";
  description?: string;
  agent?: string;
  tool?: string;
};

const getStepColor = (type: string) => {
  switch (type) {
    case "prompt":
      return "bg-blue-50 border-blue-200 text-blue-600";
    case "action":
      return "bg-purple-50 border-purple-200 text-purple-600";
    case "tool":
      return "bg-orange-50 border-orange-200 text-orange-600";
    case "decision":
      return "bg-yellow-50 border-yellow-200 text-yellow-600";
    case "system":
      return "bg-indigo-50 border-indigo-200 text-indigo-600";
    case "end":
      return "bg-red-50 border-red-200 text-red-600";
    default:
      return "bg-gray-50 border-gray-200 text-gray-600";
  }
};

const getStepIcon = (type: string) => {
  switch (type) {
    case "prompt":
      return <MessageSquare className="w-5 h-5" />;
    case "action":
      return <Cog className="w-5 h-5" />;
    case "tool":
      return <Wrench className="w-5 h-5" />;
    case "decision":
      return <GitBranch className="w-5 h-5" />;
    case "system":
      return <Cpu className="w-5 h-5" />;
    case "end":
      return <CircleStop className="w-5 h-5" />;
    default:
      return null;
  }
};

export function WorkflowNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const colors = getStepColor(data.type);
  const icon = getStepIcon(data.type);

  return (
    <div
      className={`${colors} border-2 rounded-lg p-4 shadow-md hover:shadow-lg transition-all min-w-[200px] ${
        selected ? "ring-2 ring-blue-500 ring-offset-2" : ""
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
      />

      <div className="flex items-start gap-3">
        <div className={colors.split(" ")[2]}>{icon}</div>
        <div className="flex-1 min-w-0">
          <h4
            className={`${colors
              .split(" ")[0]
              .replace("bg-", "text-")
              .replace("50", "900")} truncate font-medium`}
          >
            {data.label}
          </h4>
          <p className="text-gray-600 text-sm mt-1 capitalize">{data.type}</p>
        </div>
      </div>

      {data.description && (
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {data.description}
        </p>
      )}

      {data.agent && (
        <p className="text-gray-600 text-sm mt-2 truncate">👤 {data.agent}</p>
      )}

      {data.tool && (
        <p className="text-gray-600 text-sm mt-2 truncate">🔧 {data.tool}</p>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
      />
    </div>
  );
}
