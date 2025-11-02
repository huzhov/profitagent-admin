import { useEffect, useState } from "react";
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
} from "../ui/form";

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

const waDefaultValues: WaAccountFormValues = {
  waBusinessPortfolioId: "",
  phoneNumberId: "",
  accessToken: "",
  wabaId: "",
  accountName: "",
  pinCode: "",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Empty, EmptyTitle, EmptyDescription, EmptyContent } from "../ui/empty";
import { MessageSquare, Plus, Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
// avatar used in Users tab which is currently commented out
import { Badge } from "../ui/badge";
import { apiJson } from "@/lib/http";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

type Integration = {
  id: number;
  name: string;
  status: "enabled" | "disabled";
  lastSyncedAt: string;
  wabaId: string;
  displayPhoneNumber: string;
};

type BusinessDetails = {
  id: string;
  name: string;
  vertical: string;
};

export default function IntegrationsManagement() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusiness] = useState<BusinessDetails | null | undefined>(
    undefined
  );
  const [businessLoading, setBusinessLoading] = useState(true);

  // WhatsApp Account Form
  const waForm = useForm<WaAccountFormValues>({
    resolver: zodResolver(waAccountSchema),
    defaultValues: waDefaultValues,
    mode: "onTouched",
  });

  // Fetch current user's business on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
    const businessId = user.businessId;
    if (!businessId) {
      setBusiness(null);
      setBusinessLoading(false);
      return;
    }

    apiJson<BusinessDetails>(
      `${import.meta.env.VITE_BACKEND_URL}/businesses/${businessId}`
    )
      .then((res) => {
        if (res?.id) setBusiness(res);
      })
      .catch(() => setBusiness(null))
      .finally(() => setBusinessLoading(false));
  }, []);

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

  const handleAddWhatsAppAccount = async (values: WaAccountFormValues) => {
    console.log("Add WhatsApp Account:", values);
    await apiJson(`${import.meta.env.VITE_BACKEND_URL}/integrations/whatsapp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    waForm.reset();
    toast.success("Agent has been created successfully");
    navigate({ to: "/" });
  };

  const fbLoginCallback = (response: fb.StatusResponse) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log("response code: ", code); // remove after testing
      apiJson<string>(
        `${import.meta.env.VITE_BACKEND_URL}/integrations/whatsapp/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      ).then((result) => {
        waForm.setValue("accessToken", result);
      });
    } else {
      console.log("response: ", response); // remove after testing
      // your code goes here
    }
  };

  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      return;
    }

    window.FB.login(fbLoginCallback, {
      config_id: import.meta.env.VITE_EMBEDDED_SIGNUP_CONFIGURATION_ID,
      response_type: "code",
      override_default_response_type: true,
      extras: { version: "v3" },
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiJson<Integration[]>(
      `${import.meta.env.VITE_BACKEND_URL}/integrations/whatsapp`
    )
      .then(async (res) => {
        setIntegrations(res);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, []);

  // If business is still loading, show a centered loading state
  if (businessLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  // If user has no business, render full-page Empty directing them to Business Settings
  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Empty className="w-full max-w-md mx-auto text-center">
          <EmptyTitle>No business assigned</EmptyTitle>
          <EmptyDescription>
            You haven't created a business. You can do it on the Business
            Settings page
          </EmptyDescription>
          <EmptyContent>
            <Button onClick={() => navigate({ to: "/business-settings" })}>
              Go to Business Settings
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            Integrations
          </h2>
          <p className="text-muted-foreground">
            Manage users, permissions, and system integrations
          </p>
        </div>
      </div>

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
              Connect multiple WhatsApp Business accounts to manage different
              brands or product lines. Powered by Meta's official Business API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Connected WhatsApp Accounts */}
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">
                Connected Accounts
              </h4>
              {loading ? (
                <div className="text-muted-foreground">
                  Loading integrations...
                </div>
              ) : error ? (
                <div className="text-red-600">{error}</div>
              ) : integrations.length === 0 ? (
                <div className="text-muted-foreground">
                  No WhatsApp integrations found.
                </div>
              ) : (
                integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          integration.status === "enabled"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-card-foreground flex items-center space-x-2">
                          <span>{integration.name}</span>
                          {integration.status === "enabled" && (
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
                          {integration.status === "enabled"
                            ? `Account ID: ${integration.wabaId} • Phone number: +${integration.displayPhoneNumber}`
                            : "Not configured"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last sync: {integration.lastSyncedAt}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          {integration.status === "enabled" && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Sync
                            </Button>
                          )}
                        </div> */}
                  </div>
                ))
              )}
            </div>

            {/* Add New WhatsApp Connection */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-card-foreground mb-4">
                Add New WhatsApp Business Account
              </h4>
              <Form {...waForm}>
                <form
                  onSubmit={waForm.handleSubmit(handleAddWhatsAppAccount)}
                  className="grid gap-4"
                >
                  <FormField
                    control={waForm.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="accountName">
                          Account Name (for identification) *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Main Store, Fashion Line, Electronics"
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
                        Login with Facebook
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            tabIndex={-1}
                            aria-label="Info"
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
                          <FormLabel htmlFor="waBusinessPortfolioId">
                            Business Portfolio ID *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="To be filled in by Login With Facebook"
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
                          <FormLabel htmlFor="phoneNumberId">
                            Phone number ID *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="To be filled in by Login With Facebook"
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
                          <FormLabel htmlFor="accessToken">
                            WhatsApp Account Access Token *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="To be filled in by Login With Facebook"
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
                          <FormLabel htmlFor="wabaId">
                            WhatsApp Business Account ID *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="To be filled in by Login With Facebook"
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
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2">
                            <FormLabel htmlFor="pinCode">
                              Phone number's two-step verification PIN *
                            </FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  tabIndex={-1}
                                  aria-label="Info"
                                  className="rounded-full p-2"
                                  type="button"
                                >
                                  <Info className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                6-digit two-step verification PIN
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              maxLength={6}
                              minLength={6}
                              placeholder="Enter PIN"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-fit"
                    disabled={loading || !waForm.formState.isValid}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add WhatsApp Account
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
