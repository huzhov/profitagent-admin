import { createFileRoute } from "@tanstack/react-router";
import SettingsLayout from "@/components/settings/SettingsLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Webhook,
  Key,
  Plus,
  Info,
  Settings as SettingsIcon,
  Save,
  TestTube2,
  Facebook,
  Trash2,
  RefreshCw,
  Unplug,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const waAccountSchema = z.object({
  waBusinessPortfolioId: z
    .string()
    .min(15, "Business Portfolio ID should be at least 15 chars long")
    .max(20, "Business Portfolio ID is too long"),
  accessToken: z.string().max(1024, "Access Token is too long"),
  wabaId: z
    .string()
    .min(15, "Whatsapp Business Account ID should be at least 15 chars long")
    .max(20, "Whatsapp Business Account ID is too long"),
  accountName: z
    .string()
    .min(3, "Account Name should be at least 3 chars long"),
  phoneNumberId: z
    .string()
    .min(10, "Phone Number ID should be at least 10 chars long")
    .max(16, "Phone Number ID should be 16 chars long max"),
  pinCode: z.string().length(6, "PIN Code should be 6 digits long"),
});

type WaAccountFormValues = z.infer<typeof waAccountSchema>;

function AccountSettings() {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<any>(null);

  const waForm = useForm<WaAccountFormValues>({
    resolver: zodResolver(waAccountSchema),
    defaultValues: {
      waBusinessPortfolioId: "",
      phoneNumberId: "",
      accessToken: "",
      wabaId: "",
      accountName: "",
      pinCode: "",
    },
    mode: "onTouched",
  });

  const handleManageConnection = (connection: any) => {
    setSelectedConnection(connection);
    setIsManageModalOpen(true);
  };

  const handleTestConnection = () => {
    console.log("Test connection:", selectedConnection);
  };

  const handleDisconnect = () => {
    console.log("Disconnect:", selectedConnection);
    setIsManageModalOpen(false);
  };

  const handleSaveConnection = () => {
    console.log("Save connection:", selectedConnection);
    setIsManageModalOpen(false);
  };

  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(
      (response: fb.StatusResponse) => {
        if (response.authResponse) {
          const code = response.authResponse.code;
          console.log("response code: ", code);
          // Call backend to exchange code for token
        }
      },
      {
        config_id: import.meta.env.VITE_EMBEDDED_SIGNUP_CONFIGURATION_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: { version: "v3" },
      }
    );
  };

  const handleAddWhatsAppAccount = async (values: WaAccountFormValues) => {
    console.log("Add WhatsApp Account:", values);
    // Handle form submission
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* API Connections */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Connections
            </CardTitle>
            <CardDescription>
              View and manage your WhatsApp Business API connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  name: "Main Store WhatsApp",
                  phone: "+1 (555) 123-4567",
                  wabaId: "1234567890123456",
                  status: "connected",
                  lastSync: "2 mins ago",
                },
                {
                  name: "Support Line",
                  phone: "+1 (555) 987-6543",
                  wabaId: "6543210987654321",
                  status: "connected",
                  lastSync: "5 mins ago",
                },
                {
                  name: "Sales Team",
                  phone: "+1 (555) 456-7890",
                  wabaId: "9876543210987654",
                  status: "error",
                  lastSync: "1 hour ago",
                },
              ].map((connection, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{connection.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {connection.phone} • WABA ID: {connection.wabaId}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {connection.status === "connected" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Error
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {connection.lastSync}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleManageConnection(connection)}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New WhatsApp Business Account */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              Add New WhatsApp Business Account
            </CardTitle>
            <CardDescription>
              Connect a new WhatsApp Business account via Facebook Login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...waForm}>
              <form
                onSubmit={waForm.handleSubmit(handleAddWhatsAppAccount)}
                className="space-y-4"
              >
                <FormField
                  control={waForm.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name (for identification) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Main Store, Fashion Line, Electronics"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      className="w-fit bg-blue-600 hover:bg-blue-700"
                      onClick={launchWhatsAppSignup}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Login with Facebook
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          tabIndex={-1}
                          className="rounded-full p-2"
                          type="button"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={4}>
                        Follow this flow to autopopulate fields below
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={waForm.control}
                    name="waBusinessPortfolioId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Portfolio ID *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Auto-filled by Facebook"
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={waForm.control}
                    name="phoneNumberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number ID *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Auto-filled by Facebook"
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={waForm.control}
                    name="accessToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Token *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Auto-filled by Facebook"
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={waForm.control}
                    name="wabaId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WABA ID *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Auto-filled by Facebook"
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={waForm.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two-Step Verification PIN *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={6}
                          placeholder="Enter 6-digit PIN"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!waForm.formState.isValid}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add WhatsApp Account
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5" />
              Webhook Configuration
            </CardTitle>
            <CardDescription>
              Configure webhooks for real-time message delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                placeholder="https://your-domain.com/webhook"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verifyToken">Verify Token</Label>
              <Input
                id="verifyToken"
                placeholder="Your verification token"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                placeholder="Your webhook secret"
                autoComplete="off"
              />
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> Make sure your webhook endpoint is
                publicly accessible and can handle POST requests from Meta's
                servers.
              </p>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <TestTube2 className="w-4 h-4 mr-2" />
                Test Webhook
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manage Connection Modal */}
      <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage WhatsApp Connection</DialogTitle>
            <DialogDescription>
              Update connection settings or disconnect this account
            </DialogDescription>
          </DialogHeader>
          {selectedConnection && (
            <div className="space-y-4 py-4">
              {/* Connection Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedConnection.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConnection.phone}
                  </p>
                </div>
                {selectedConnection.status === "connected" ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Error
                  </Badge>
                )}
              </div>

              {/* Connection Details */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="manage-name">Account Name</Label>
                  <Input
                    id="manage-name"
                    defaultValue={selectedConnection.name}
                    placeholder="Account name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manage-waba">WABA ID</Label>
                  <Input
                    id="manage-waba"
                    defaultValue={selectedConnection.wabaId}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manage-phone">Phone Number</Label>
                  <Input
                    id="manage-phone"
                    defaultValue={selectedConnection.phone}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Connection Settings */}
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-sync Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync new messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Webhook Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive real-time webhook events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              {/* Connection Status */}
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Connection Status</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Sync</span>
                  <span>{selectedConnection.lastSync}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>

              {/* Danger Zone */}
              <Separator />
              <div className="space-y-3">
                <p className="text-sm font-medium text-destructive">
                  Danger Zone
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleTestConnection}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={handleDisconnect}
                  >
                    <Unplug className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsManageModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveConnection}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsLayout>
  );
}

export const Route = createFileRoute("/_authenticated/settings/account")({
  component: AccountSettings,
});
