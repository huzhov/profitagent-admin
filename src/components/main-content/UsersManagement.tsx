import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Bug,
  Copy,
  Key,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Settings,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

export default function UsersManagement() {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "WhatsApp Business API - Main Store",
      status: "Connected",
      lastSync: "2024-01-15 10:30 AM",
      accountId: "123456789",
      phoneNumber: "+1-555-0123",
    },
    {
      id: 2,
      name: "WhatsApp Business API - Fashion Line",
      status: "Connected",
      lastSync: "2024-01-15 09:15 AM",
      accountId: "987654321",
      phoneNumber: "+1-555-0124",
    },
    {
      id: 3,
      name: "WhatsApp Business API - Electronics",
      status: "Disconnected",
      lastSync: "Never",
      accountId: "",
      phoneNumber: "",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            User Administration
          </h2>
          <p className="text-muted-foreground">
            Manage users, permissions, and system integrations
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users & Permissions</span>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="flex items-center space-x-2"
          >
            <Key className="h-4 w-4" />
            <span>Account & Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center space-x-2">
            <Bug className="h-4 w-4" />
            <span>Debug Dashboard</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Smith",
                    email: "john@hbomax.com",
                    role: "Admin",
                    brand: "HBO Max",
                  },
                  {
                    name: "Sarah Johnson",
                    email: "sarah@disney.com",
                    role: "Manager",
                    brand: "Disney",
                  },
                  {
                    name: "Mike Chen",
                    email: "mike@netflix.com",
                    role: "Editor",
                    brand: "Netflix",
                  },
                  {
                    name: "Emma Wilson",
                    email: "emma@spotify.com",
                    role: "Viewer",
                    brand: "Spotify",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {user.brand}
                      </Badge>
                      <Badge
                        variant={
                          user.role === "Admin" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span>WhatsApp Business API Connections</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Official Partner
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Connect multiple WhatsApp Business accounts to manage
                  different brands or product lines. Powered by Meta's official
                  Business API.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Connected WhatsApp Accounts */}
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">
                    Connected Accounts
                  </h4>
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            integration.status === "Connected"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-card-foreground flex items-center space-x-2">
                            <span>{integration.name}</span>
                            {integration.status === "Connected" && (
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-600"
                              >
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {integration.status === "Connected"
                              ? `Account ID: ${integration.accountId} • Phone: ${integration.phoneNumber}`
                              : "Not configured"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last sync: {integration.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                        {integration.status === "Connected" && (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Sync
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New WhatsApp Connection */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-card-foreground mb-4">
                    Add New WhatsApp Business Account
                  </h4>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userId">User ID</Label>
                        <Input
                          id="userId"
                          placeholder="Enter WhatsApp User ID"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientSecret">Client Secret</Label>
                        <Input
                          id="clientSecret"
                          type="password"
                          placeholder="Enter Client Secret"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accessToken">
                          WhatsApp Account Access Token
                        </Label>
                        <Input
                          id="accessToken"
                          type="password"
                          placeholder="Enter Access Token"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessAccountId">
                          WhatsApp Business Account ID
                        </Label>
                        <Input
                          id="businessAccountId"
                          placeholder="Enter Business Account ID"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">
                        Account Name (for identification)
                      </Label>
                      <Input
                        id="accountName"
                        placeholder="e.g., Main Store, Fashion Line, Electronics"
                      />
                    </div>
                    <Button className="w-fit">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect WhatsApp Account
                    </Button>
                  </div>
                </div>

                {/* Webhook Configuration */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-card-foreground mb-4">
                    Webhook Configuration
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input
                          id="webhookUrl"
                          value="https://your-domain.com/api/webhooks/whatsapp"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="verifyToken">Verify Token</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="verifyToken"
                            value="wa_verify_token_12345"
                            readOnly
                          />
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">
                        Setup Instructions
                      </h5>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Copy the webhook URL and verify token above</li>
                        <li>Go to your Meta Developer Console</li>
                        <li>Navigate to WhatsApp → Configuration → Webhooks</li>
                        <li>Add the webhook URL and verify token</li>
                        <li>Subscribe to message events</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="debug" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Debug Dashboard (Internal)</CardTitle>
              <CardDescription>
                System monitoring and troubleshooting tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">
                    System Uptime
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-muted-foreground">
                    Active Connections
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-orange-600">23ms</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Response Time
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-muted-foreground">
                    Error Count (24h)
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Recent System Logs</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                  <div className="text-green-600">
                    [2024-01-15 10:30:15] INFO: WhatsApp webhook received
                    successfully
                  </div>
                  <div className="text-blue-600">
                    [2024-01-15 10:29:45] DEBUG: Agent response generated in
                    234ms
                  </div>
                  <div className="text-orange-600">
                    [2024-01-15 10:28:12] WARN: Rate limit approaching for
                    user_id: 1247
                  </div>
                  <div className="text-red-600">
                    [2024-01-15 10:25:33] ERROR: Failed to connect to Shopify
                    API - timeout
                  </div>
                  <div className="text-green-600">
                    [2024-01-15 10:24:18] INFO: New agent deployed successfully
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline">Download Logs</Button>
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Restart Services</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
