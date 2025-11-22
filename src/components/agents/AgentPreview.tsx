import { useParams, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Bot,
  RotateCcw,
  MessageCircle,
  Globe,
  Send,
  User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAgent } from "@/services/agents";
import { Spinner } from "@/components/ui/spinner";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: string;
}

export function AgentPreview() {
  const { id } = useParams({ from: "/_authenticated/agents/$id/preview" });
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock agent data - in a real app, this would come from an API or context
  // const agents = [
  //   {
  //     id: "1",
  //     name: "SalesBot Pro",
  //     description: "Advanced sales agent for lead qualification and conversion",
  //     channels: ["WhatsApp", "Web"],
  //   },
  //   {
  //     id: "2",
  //     name: "Support Assistant",
  //     description: "Customer support automation with intelligent routing",
  //     channels: ["Slack", "Web"],
  //   },
  //   {
  //     id: "3",
  //     name: "Lead Qualifier",
  //     description: "Pre-qualifies leads and schedules appointments",
  //     channels: ["Web"],
  //   },
  // ];

  const { agents } = useApp();

  const agent = agents[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm an AI assistant specialized in helping you find the right solutions. I'm here to answer your questions, provide information, and guide you through our offerings. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const data = await getAgent(id);
      return data;
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("product")) {
      return "Great question! I'd be happy to help you understand what we offer.\n\nBased on your business needs, I can provide personalized recommendations for:\n• Product features and capabilities\n• Pricing options tailored to your requirements\n• Implementation timelines\n• Success stories from similar businesses\n\nWhat aspect would you like me to focus on first?";
    } else if (
      lowerMessage.includes("demo") ||
      lowerMessage.includes("schedule")
    ) {
      return "I'd love to show you our platform in action! Our demos typically last 30 minutes and can be customized to your industry. Would you prefer this week or next week?";
    } else if (
      lowerMessage.includes("pricing") ||
      lowerMessage.includes("price")
    ) {
      return "Excellent! I can see how our technology stack would benefit your organization. Our pricing is flexible and based on your specific needs. Let me connect you with our sales team who can provide a customized quote based on your requirements.";
    } else if (
      lowerMessage.includes("sales") ||
      lowerMessage.includes("talk")
    ) {
      return "I understand your requirements. Our solutions are designed specifically for businesses like yours. I'll connect you with one of our sales specialists who can provide detailed information tailored to your needs. What's the best way to reach you?";
    } else {
      return "Thank you for your message. I'm here to help you with information about our products, scheduling demos, pricing, or connecting you with our sales team. What would you like to know more about?";
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI thinking delay (1.5-2.5 seconds)
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: getAIResponse(messageText),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content:
          "Hello! I'm an AI assistant specialized in helping you find the right solutions. I'm here to answer your questions, provide information, and guide you through our offerings. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInputValue("");
    setIsTyping(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Agent Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The agent you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: "/agents" })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-4 gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: `/agents/${id}/edit` })}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Configuration
            </Button>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-${agent.iconColor}-100 text-${agent.iconColor}-700 flex items-center justify-center`}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold">
                  {data.name} Preview
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Test your agent's responses and behavior
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial"
              onClick={handleResetChat}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Reset Chat</span>
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] lg:h-[calc(100vh-89px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-80 border-b lg:border-r lg:border-b-0 border-border bg-card p-4 lg:p-6 lg:overflow-y-auto">
          <div className="space-y-4 lg:space-y-6">
            <div>
              <h3 className="text-sm lg:text-base font-medium mb-2">
                Agent Configuration
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs lg:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emotionality:</span>
                  <span>25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Message Length:</span>
                  <span>60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chattiness:</span>
                  <span>40%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm lg:text-base font-medium mb-2">
                Business Context
              </h3>
              <div className="text-xs lg:text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong>Brand:</strong> {data.name}
                </p>
                <p className="mb-2">
                  <strong>Description:</strong> {data.description}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm lg:text-base font-medium mb-2">
                Available Channels
              </h3>
              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                {agent.channels.map((channel, index) => (
                  <Badge key={index} variant="outline">
                    {channel === "WhatsApp" && (
                      <MessageCircle className="w-3 h-3 mr-1" />
                    )}
                    {channel === "Web" && <Globe className="w-3 h-3 mr-1" />}
                    {channel}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">CTA Buttons</h3>
              <div className="space-y-2">
                <button
                  data-slot="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 w-full justify-start"
                >
                  Schedule Demo
                </button>
                <button
                  data-slot="button"
                  className="inline-flex items-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 w-full justify-start"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Channel Tabs */}
          <div className="border-b border-border bg-card p-3 lg:p-4">
            <Tabs defaultValue="whatsapp">
              <TabsList className="w-full sm:w-fit">
                <TabsTrigger
                  value="whatsapp"
                  className="flex items-center gap-1.5 lg:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                >
                  <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                  <span className="sm:hidden">WA</span>
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="flex items-center gap-1.5 lg:gap-2 flex-1 sm:flex-initial text-xs sm:text-sm"
                >
                  <Globe className="w-3 h-3 lg:w-4 lg:h-4" />
                  Web
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 lg:gap-3 ${
                    message.type === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.type === "bot" && (
                    <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 space-y-1.5 lg:space-y-2 max-w-md">
                    <div
                      className={`rounded-lg p-2.5 lg:p-3 ${
                        message.type === "bot"
                          ? "bg-accent"
                          : "bg-primary text-primary-foreground ml-auto"
                      }`}
                    >
                      {message.type === "bot" && (
                        <div className="text-xs lg:text-sm text-muted-foreground font-medium mb-1.5 lg:mb-2">
                          {data.name}
                        </div>
                      )}
                      <p className="text-xs lg:text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                      {message.type === "bot" && (
                        <div className="text-xs text-muted-foreground mt-1.5 lg:mt-2">
                          Powered by AI
                        </div>
                      )}
                    </div>
                    <div
                      className={`text-xs text-muted-foreground ${
                        message.type === "user" ? "text-right" : ""
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2 lg:gap-3">
                  <Avatar className="w-7 h-7 lg:w-8 lg:h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5 lg:space-y-2">
                    <div className="bg-accent rounded-lg p-2.5 lg:p-3 w-fit">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies */}
          <div className="border-t border-border bg-card p-3 lg:p-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs lg:text-sm text-muted-foreground mb-2">
                Quick replies:
              </p>
              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs lg:text-sm h-7 lg:h-8"
                  onClick={() =>
                    handleQuickReply("Tell me about your products")
                  }
                  disabled={isTyping}
                >
                  Tell me about your products
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs lg:text-sm h-7 lg:h-8"
                  onClick={() => handleQuickReply("Schedule a demo")}
                  disabled={isTyping}
                >
                  Schedule a demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs lg:text-sm h-7 lg:h-8"
                  onClick={() => handleQuickReply("Get pricing")}
                  disabled={isTyping}
                >
                  Get pricing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs lg:text-sm h-7 lg:h-8"
                  onClick={() => handleQuickReply("Talk to sales")}
                  disabled={isTyping}
                >
                  Talk to sales
                </Button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-3 lg:p-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-1.5 lg:gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1 text-xs lg:text-sm h-9 lg:h-10"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="h-9 lg:h-10 px-3 lg:px-4"
                >
                  <Send className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
