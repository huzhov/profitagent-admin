import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Database,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CRMConnection {
  id: string;
  platform: "airtable" | "salesforce" | "hubspot" | "pipedrive";
  status: "connected" | "disconnected" | "error";
  lastSynced: string;
  recordsSynced: number;
}

export default function CRMIntegration() {
  const [connections] = useState<CRMConnection[]>([
    {
      id: "1",
      platform: "airtable",
      status: "connected",
      lastSynced: "2 minutes ago",
      recordsSynced: 145,
    },
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [showSetup, setShowSetup] = useState(false);

  const platforms = [
    {
      id: "airtable",
      name: "Airtable",
      description: "Sync leads to your Airtable bases",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Connect to Salesforce CRM",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Integrate with HubSpot CRM",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Sync to Pipedrive pipelines",
      color: "bg-green-100 text-green-800",
    },
  ];

  const getPlatformName = (platform: string) => {
    return platforms.find((p) => p.id === platform)?.name || platform;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-purple-600" />
            <span>CRM & Data Platforms</span>
          </CardTitle>
          <CardDescription>
            Automatically sync leads and customer data to your CRM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connected CRMs */}
          {connections.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                Active Connections
              </h4>
              {connections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        connection.status === "connected"
                          ? "bg-green-500"
                          : connection.status === "error"
                            ? "bg-red-500"
                            : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-card-foreground flex items-center space-x-2">
                        <span>{getPlatformName(connection.platform)}</span>
                        {connection.status === "connected" && (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                        {connection.status === "error" && (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Error
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {connection.recordsSynced.toLocaleString()} records
                        synced • Last sync: {connection.lastSynced}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Connection */}
          {!showSetup ? (
            <div className="border-t pt-6">
              <h4 className="font-medium text-card-foreground mb-4">
                Connect New Platform
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setShowSetup(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{platform.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {platform.description}
                        </p>
                      </div>
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-card-foreground">
                  Setup {getPlatformName(selectedPlatform)}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSetup(false)}
                >
                  Cancel
                </Button>
              </div>

              <div className="space-y-4">
                {selectedPlatform === "airtable" && (
                  <>
                    <div>
                      <Label htmlFor="api-key">Airtable API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Enter your Airtable API key"
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Find your API key in Airtable account settings
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="base-id">Base ID</Label>
                      <Input
                        id="base-id"
                        placeholder="app1234567890"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="table-name">Table Name</Label>
                      <Input
                        id="table-name"
                        placeholder="Leads"
                        className="mt-1.5"
                      />
                    </div>
                  </>
                )}

                {selectedPlatform === "salesforce" && (
                  <>
                    <div>
                      <Label>Authentication Method</Label>
                      <Select defaultValue="oauth">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="api">API Token</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Object Type</Label>
                      <Select defaultValue="lead">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                          <SelectItem value="opportunity">
                            Opportunity
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {selectedPlatform === "hubspot" && (
                  <>
                    <div>
                      <Label>Sync Type</Label>
                      <Select defaultValue="contacts">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contacts">Contacts</SelectItem>
                          <SelectItem value="deals">Deals</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-900">
                        Click "Connect" to authorize with HubSpot
                      </p>
                    </div>
                  </>
                )}

                {selectedPlatform === "pipedrive" && (
                  <>
                    <div>
                      <Label htmlFor="api-token">Pipedrive API Token</Label>
                      <Input
                        id="api-token"
                        type="password"
                        placeholder="Enter your Pipedrive API token"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label>Pipeline</Label>
                      <Select>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select pipeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Pipeline</SelectItem>
                          <SelectItem value="leads">Lead Pipeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="pt-4 flex gap-2">
                  <Button>
                    {selectedPlatform === "hubspot"
                      ? "Connect with HubSpot"
                      : "Test Connection"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowSetup(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
