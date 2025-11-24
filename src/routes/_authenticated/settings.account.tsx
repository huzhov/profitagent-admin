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
  Key,
  Plus,
  Info,
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  Unplug,
  Loader2,
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
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createWhatsAppIntegration,
  exchangeWhatsAppToken,
  listWhatsAppIntegrations,
} from "@/services/integrations";
import { toast } from "sonner";
import { useBusiness } from "@/context/AppContext";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { MetaIcon } from "@/components/assets";

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
  const { business } = useBusiness();
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

  // Autofill Facebook form
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        const payload = JSON.parse(event.data);
        console.log("event data: ", payload);

        if (payload.type === "WA_EMBEDDED_SIGNUP") {
          if (
            payload.event === "FINISH" ||
            payload.event === "FINISH_ONLY_WABA"
          ) {
            const { waba_id, phone_number_id, business_id } = payload.data;
            waForm.setValue("phoneNumberId", phone_number_id);
            waForm.setValue("wabaId", waba_id);
            waForm.setValue("waBusinessPortfolioId", business_id);
          }
        }
      } catch (err) {
        console.error("Failed to parse message event data:", err);
        // ignore parsing errors
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const {
    data: whatsAppListData,
    isLoading: isWhatsAppListLoading,
    refetch,
  } = useQuery({
    queryKey: ["whatsAppList"],
    queryFn: async () => {
      return await listWhatsAppIntegrations();
    },
  });

  const { mutate: createWhatsAppFn, isPending: isCreateWhatAppPending } =
    useMutation({
      mutationFn: createWhatsAppIntegration,
      onSuccess: () => {
        waForm.reset();
        toast.success("Added WhatsApp account successfully");
        refetch();
      },
    });

  const { mutate: exchangeWhatsAppTokenFn } = useMutation({
    mutationFn: exchangeWhatsAppToken,
    onSuccess: (data) => {
      waForm.setValue("accessToken", data);
    },
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
          exchangeWhatsAppTokenFn({ code });
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
    createWhatsAppFn(values);
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Information Alert when no business exists */}
        {!business && (
          <Card className="shadow-none border-blue-200 bg-blue-50">
            <CardContent>
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">
                    Business Setup Required
                  </p>
                  <p className="text-sm text-blue-700">
                    You need to create a business in the{" "}
                    <a
                      href="/settings/general#business-settings"
                      className="underline font-medium hover:text-blue-900"
                    >
                      General Settings
                    </a>{" "}
                    before you can add WhatsApp Business Accounts. Once your
                    business is created, the option to add WhatsApp accounts
                    will appear below.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              {isWhatsAppListLoading
                ? [1, 2, 3]?.map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <Skeleton className="w-10 h-10" />
                        </div>
                        <div>
                          <Skeleton className="w-20 h-5" />
                          <Skeleton className="w-50 h-5 mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-20 h-5 mr-1" />
                        <Skeleton className="w-15 h-5 mr-1" />
                        <Skeleton className="w-20 h-5 mr-2" />
                      </div>
                    </div>
                  ))
                : whatsAppListData?.map((connection, index) => (
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
                            +{connection.displayPhoneNumber} • WABA ID:{" "}
                            {connection.wabaId}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {connection.status === "enabled" ? (
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
                          {formatDistanceToNow(connection.lastSyncedAt)} ago
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

        {/* Add New WhatsApp Business Account - Only show if business exists */}
        {business && (
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
                        <FormLabel>
                          Account Name (for identification) *
                        </FormLabel>
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
                        <MetaIcon className="w-4 h-4 mr-2" />
                        Login with Meta
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
                    <Button
                      type="submit"
                      disabled={
                        !waForm.formState.isValid || isCreateWhatAppPending
                      }
                    >
                      {isCreateWhatAppPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Add WhatsApp Account
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
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
                    {selectedConnection.displayPhoneNumber}
                  </p>
                </div>
                {selectedConnection.status === "enabled" ? (
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
                    defaultValue={selectedConnection.displayPhoneNumber}
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
                  <span>
                    {formatDistanceToNow(selectedConnection.lastSyncedAt)} ago
                  </span>
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
