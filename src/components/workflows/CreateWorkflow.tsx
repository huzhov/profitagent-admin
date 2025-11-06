import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import type { Node, Edge, Connection } from "reactflow";
import "reactflow/dist/style.css";
import {
  ArrowLeft,
  Save,
  CircleCheck,
  Zap,
  Play,
  MessageSquare,
  Plus,
  Send,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { WorkflowNode } from "./WorkflowNode";
import type { WorkflowNodeData } from "./WorkflowNode";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const initialNodes: Node<WorkflowNodeData>[] = [
  // Master Orchestrator nodes
  {
    id: "orch-1",
    type: "workflowNode",
    position: { x: 50, y: 50 },
    data: {
      label: "Initialize Context",
      type: "system",
      description: "Initialize customer session and context",
    },
  },
  {
    id: "orch-2",
    type: "workflowNode",
    position: { x: 300, y: 50 },
    data: {
      label: "Detect Intent",
      type: "decision",
    },
  },
  {
    id: "orch-3",
    type: "workflowNode",
    position: { x: 550, y: 0 },
    data: {
      label: "Route to Sales Agent",
      type: "action",
      agent: "Sales Agent",
    },
  },
  {
    id: "orch-4",
    type: "workflowNode",
    position: { x: 550, y: 100 },
    data: {
      label: "Route to Support Agent",
      type: "action",
      agent: "Support Agent",
    },
  },
  {
    id: "orch-5",
    type: "workflowNode",
    position: { x: 550, y: 200 },
    data: {
      label: "Route to Onboarding Agent",
      type: "action",
      agent: "Onboarding Agent",
    },
  },
  {
    id: "orch-6",
    type: "workflowNode",
    position: { x: 800, y: 100 },
    data: {
      label: "Maintain Context",
      type: "system",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "orch-1",
    target: "orch-2",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-3",
    source: "orch-2",
    target: "orch-3",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-4",
    source: "orch-2",
    target: "orch-4",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-5",
    source: "orch-2",
    target: "orch-5",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e3-6",
    source: "orch-3",
    target: "orch-6",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e4-6",
    source: "orch-4",
    target: "orch-6",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e5-6",
    source: "orch-5",
    target: "orch-6",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

// Sales Agent nodes
const salesAgentNodes: Node<WorkflowNodeData>[] = [
  {
    id: "sales-1",
    type: "workflowNode",
    position: { x: 50, y: 50 },
    data: {
      label: "Greet & Qualify",
      type: "prompt",
      description:
        "Hello! I can help you find the perfect product. What are you looking for?",
      agent: "Sales Agent",
    },
  },
  {
    id: "sales-2",
    type: "workflowNode",
    position: { x: 300, y: 50 },
    data: {
      label: "Check Budget",
      type: "decision",
    },
  },
  {
    id: "sales-3",
    type: "workflowNode",
    position: { x: 550, y: 0 },
    data: {
      label: "Show Premium Products",
      type: "action",
    },
  },
  {
    id: "sales-4",
    type: "workflowNode",
    position: { x: 550, y: 120 },
    data: {
      label: "Show Standard Products",
      type: "action",
    },
  },
  {
    id: "sales-5",
    type: "workflowNode",
    position: { x: 800, y: 60 },
    data: {
      label: "Create Quote",
      type: "tool",
      tool: "CRM Integration",
    },
  },
  {
    id: "sales-6",
    type: "workflowNode",
    position: { x: 1050, y: 60 },
    data: {
      label: "End Sales Flow",
      type: "end",
    },
  },
];

const salesAgentEdges: Edge[] = [
  {
    id: "es1-2",
    source: "sales-1",
    target: "sales-2",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "es2-3",
    source: "sales-2",
    target: "sales-3",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "es2-4",
    source: "sales-2",
    target: "sales-4",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "es3-5",
    source: "sales-3",
    target: "sales-5",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "es4-5",
    source: "sales-4",
    target: "sales-5",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "es5-6",
    source: "sales-5",
    target: "sales-6",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

// Support Agent nodes
const supportAgentNodes: Node<WorkflowNodeData>[] = [
  {
    id: "support-1",
    type: "workflowNode",
    position: { x: 50, y: 50 },
    data: {
      label: "Understand Issue",
      type: "prompt",
      description:
        "I'm here to help! Can you describe the issue you're experiencing?",
      agent: "Support Agent",
    },
  },
  {
    id: "support-2",
    type: "workflowNode",
    position: { x: 300, y: 50 },
    data: {
      label: "Classify Issue",
      type: "decision",
    },
  },
  {
    id: "support-3",
    type: "workflowNode",
    position: { x: 550, y: 0 },
    data: {
      label: "Create Ticket",
      type: "tool",
      tool: "Support Ticket API",
    },
  },
  {
    id: "support-4",
    type: "workflowNode",
    position: { x: 550, y: 120 },
    data: {
      label: "Check Account",
      type: "action",
    },
  },
  {
    id: "support-5",
    type: "workflowNode",
    position: { x: 800, y: 60 },
    data: {
      label: "End Support Flow",
      type: "end",
    },
  },
];

const supportAgentEdges: Edge[] = [
  {
    id: "esu1-2",
    source: "support-1",
    target: "support-2",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "esu2-3",
    source: "support-2",
    target: "support-3",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "esu2-4",
    source: "support-2",
    target: "support-4",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "esu3-5",
    source: "support-3",
    target: "support-5",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "esu4-5",
    source: "support-4",
    target: "support-5",
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

interface AgentWorkflow {
  id: string;
  name: string;
  category: string;
  steps: number;
  expanded: boolean;
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  color: string;
}

export default function CreateWorkflow() {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState(
    "Multi-Agent Customer Journey"
  );
  const [chatMessage, setChatMessage] = useState("");

  // Master orchestrator flow
  const [orchNodes, setOrchNodes, onOrchNodesChange] =
    useNodesState(initialNodes);
  const [orchEdges, setOrchEdges, onOrchEdgesChange] =
    useEdgesState(initialEdges);

  const [agents, setAgents] = useState<AgentWorkflow[]>([
    {
      id: "sales",
      name: "Sales Agent",
      category: "sales",
      steps: 6,
      expanded: true,
      nodes: salesAgentNodes,
      edges: salesAgentEdges,
      color: "green",
    },
    {
      id: "support",
      name: "Support Agent",
      category: "support",
      steps: 5,
      expanded: true,
      nodes: supportAgentNodes,
      edges: supportAgentEdges,
      color: "blue",
    },
    {
      id: "onboarding",
      name: "Onboarding Agent",
      category: "onboarding",
      steps: 0,
      expanded: false,
      nodes: [],
      edges: [],
      color: "purple",
    },
  ]);

  const onOrchConnect = useCallback(
    (params: Connection) =>
      setOrchEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setOrchEdges]
  );

  const toggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, expanded: !agent.expanded } : agent
      )
    );
  };

  const updateAgentFlow = (
    agentId: string,
    nodes: Node<WorkflowNodeData>[],
    edges: Edge[]
  ) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, nodes, edges } : agent
      )
    );
  };

  const getAgentColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-100",
          border: "border-green-300",
          text: "text-green-900",
          innerBg: "bg-green-50",
        };
      case "blue":
        return {
          bg: "bg-blue-100",
          border: "border-blue-300",
          text: "text-blue-900",
          innerBg: "bg-blue-50",
        };
      case "purple":
        return {
          bg: "bg-purple-100",
          border: "border-purple-300",
          text: "text-purple-900",
          innerBg: "bg-purple-50",
        };
      default:
        return {
          bg: "bg-gray-100",
          border: "border-gray-300",
          text: "text-gray-900",
          innerBg: "bg-gray-50",
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/workflows" })}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-lg border-none shadow-none px-0 max-w-md"
          />
          <Badge className="bg-gray-100 text-gray-700 border-gray-200">
            Draft
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <CircleCheck className="w-4 h-4 mr-2" />
            Validate
          </Button>
          <Button variant="outline" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Activate
          </Button>
          <Button size="sm">
            <Play className="w-4 h-4 mr-2" />
            Test Run
          </Button>
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat Test
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden mt-16">
        {/* Step Library */}
        <div className="w-56 bg-white border-r border-gray-200 p-4 flex-shrink-0">
          <h3 className="text-gray-900 mb-3 font-semibold">Step Library</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">💬</span>
              <span className="text-gray-700 text-sm">Prompt</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">⚙️</span>
              <span className="text-gray-700 text-sm">Action</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">🧰</span>
              <span className="text-gray-700 text-sm">Tool Call</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">🔀</span>
              <span className="text-gray-700 text-sm">Decision</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">🖥️</span>
              <span className="text-gray-700 text-sm">System</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left">
              <span className="text-xl">⛔️</span>
              <span className="text-gray-700 text-sm">End</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-8 space-y-8">
              {/* Master Orchestrator */}
              <div>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-t-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6" />
                    <div>
                      <h2 className="text-white font-semibold">
                        Master Orchestrator
                      </h2>
                      <p className="text-indigo-100 text-sm">
                        Routing & Context Management
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </div>
                <div
                  className="bg-white border-2 border-indigo-200 rounded-b-lg shadow-md"
                  style={{ height: "400px" }}
                >
                  <ReactFlow
                    nodes={orchNodes}
                    edges={orchEdges}
                    onNodesChange={onOrchNodesChange}
                    onEdgesChange={onOrchEdgesChange}
                    onConnect={onOrchConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    minZoom={0.5}
                    maxZoom={1.5}
                  >
                    <Background
                      variant={BackgroundVariant.Dots}
                      gap={20}
                      size={1}
                    />
                    <Controls />
                  </ReactFlow>
                </div>
              </div>

              {/* Agent Workflows */}
              <div className="space-y-6">
                <h2 className="text-gray-900 font-semibold px-2">
                  Agent Workflows
                </h2>

                {agents.map((agent) => {
                  const colors = getAgentColorClasses(agent.color);
                  return (
                    <div key={agent.id}>
                      <div
                        className={`${colors.bg} border-2 ${colors.border} px-6 py-3 rounded-t-lg shadow-md flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}
                        onClick={() => toggleAgent(agent.id)}
                      >
                        <div className="flex items-center gap-3">
                          {agent.expanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-700" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          )}
                          <div>
                            <h3 className={colors.text + " font-semibold"}>
                              {agent.name}
                            </h3>
                            <p className="text-gray-600 text-sm capitalize">
                              {agent.category} • {agent.steps} steps
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {agent.expanded && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-700 hover:bg-white/50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Step
                            </Button>
                          )}
                        </div>
                      </div>

                      {agent.expanded && agent.nodes.length > 0 && (
                        <div
                          className={`${colors.innerBg} border-2 ${colors.border} border-t-0 rounded-b-lg shadow-md`}
                          style={{ height: "400px" }}
                        >
                          <ReactFlow
                            nodes={agent.nodes}
                            edges={agent.edges}
                            onNodesChange={(changes) => {
                              const updatedNodes = changes.reduce(
                                (acc, change) => {
                                  if (
                                    change.type === "position" &&
                                    change.dragging === false
                                  ) {
                                    return acc.map((n) =>
                                      n.id === change.id
                                        ? { ...n, position: change.position! }
                                        : n
                                    );
                                  }
                                  return acc;
                                },
                                agent.nodes
                              );
                              updateAgentFlow(
                                agent.id,
                                updatedNodes,
                                agent.edges
                              );
                            }}
                            onEdgesChange={(changes) => {
                              const updatedEdges = changes.reduce(
                                (acc, change) => {
                                  if (change.type === "remove") {
                                    return acc.filter(
                                      (e) => e.id !== change.id
                                    );
                                  }
                                  return acc;
                                },
                                agent.edges
                              );
                              updateAgentFlow(
                                agent.id,
                                agent.nodes,
                                updatedEdges
                              );
                            }}
                            onConnect={(params) => {
                              const newEdge = {
                                ...params,
                                type: "smoothstep",
                                markerEnd: { type: MarkerType.ArrowClosed },
                              };
                              updateAgentFlow(agent.id, agent.nodes, [
                                ...agent.edges,
                                newEdge as Edge,
                              ]);
                            }}
                            nodeTypes={nodeTypes}
                            fitView
                            minZoom={0.5}
                            maxZoom={1.5}
                          >
                            <Background
                              variant={BackgroundVariant.Dots}
                              gap={20}
                              size={1}
                            />
                            <Controls />
                          </ReactFlow>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Chat Test Panel */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          <div className="h-full flex flex-col bg-white">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 flex items-center gap-2 font-semibold">
                    <Zap className="w-4 h-4 text-blue-600" />
                    Workflow Chat Test
                  </h3>
                  <p className="text-gray-600 text-xs mt-0.5">{workflowName}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="rounded-lg px-4 py-2 bg-yellow-50 text-yellow-900 border border-yellow-200">
                        <p className="text-sm whitespace-pre-wrap">
                          Chat test session started. Type a message to simulate
                          a customer interaction.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-1 justify-start">
                        <span className="text-xs text-gray-500">12:58 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message to test the workflow..."
                  className="flex-1"
                />
                <Button size="sm" disabled={!chatMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Test how your workflow responds to different messages
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
