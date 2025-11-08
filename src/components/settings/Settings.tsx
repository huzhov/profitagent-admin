import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Shield,
  BarChart3,
  MessageSquare,
  Activity,
  DollarSign,
  Plus,
  CheckCircle2,
  AlertCircle,
  Webhook,
  Key,
  Users,
  Info,
  Settings as SettingsIcon,
  Save,
  TestTube2,
  Pencil,
  Facebook,
  Camera,
  Mail,
  Phone,
  Building2,
  Briefcase,
  X,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function Settings() {
  const navigate = useNavigate();
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleInviteUser = () => {
    console.log("Invite user");
    setIsInviteUserOpen(false);
  };

  const handleUpdateUser = () => {
    console.log("Update user:", selectedUser);
    setIsEditUserOpen(false);
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
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, integrations, and view reporting insights"
        showBorder={false}
        showButton={false}
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">
            <User className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Shield className="w-4 h-4 mr-2" />
            Account & Integration
          </TabsTrigger>
          <TabsTrigger value="reporting">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reporting
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="mt-6 space-y-6">
          {/* Profile Section */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                        JD
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Profile Picture</p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                  {avatarPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setAvatarPreview("")}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" autoComplete="off" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" autoComplete="off" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Product Manager"
                  autoComplete="off"
                />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Management Section */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage team members and their permissions
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => setIsInviteUserOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    role: "Admin",
                    status: "Active",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    role: "Editor",
                    status: "Active",
                  },
                  {
                    name: "Mike Johnson",
                    email: "mike@example.com",
                    role: "Viewer",
                    status: "Pending",
                  },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" autoComplete="off" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="off"
                />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>
                  <Shield className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account & Integration Tab */}
        <TabsContent value="integrations" className="mt-6 space-y-6">
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
                      <Button variant="ghost" size="sm">
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
        </TabsContent>

        {/* Reporting Tab */}
        <TabsContent value="reporting" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Volume Metrics Card */}
            <Card
              className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate({ to: "/reporting/volume-metrics" })}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Volume Metrics</CardTitle>
                <CardDescription>
                  Track message volumes and conversation trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total Messages
                    </span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Conversations
                    </span>
                    <span className="font-semibold">2,156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. per Day
                    </span>
                    <span className="font-semibold">428</span>
                  </div>
                </div>
                <Button variant="link" className="mt-4 p-0">
                  View Detailed Report →
                </Button>
              </CardContent>
            </Card>

            {/* Engagement Quality Card */}
            <Card
              className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate({ to: "/reporting/engagement" })}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Engagement Quality</CardTitle>
                <CardDescription>
                  Measure interaction quality and response rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Response Rate
                    </span>
                    <span className="font-semibold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. Response Time
                    </span>
                    <span className="font-semibold">1.2 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Customer Satisfaction
                    </span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
                <Button variant="link" className="mt-4 p-0">
                  View Detailed Report →
                </Button>
              </CardContent>
            </Card>

            {/* Business Outcomes Card */}
            <Card
              className="shadow-none cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate({ to: "/reporting/business-outcomes" })}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Business Outcomes</CardTitle>
                <CardDescription>
                  Monitor conversions and revenue impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Conversion Rate
                    </span>
                    <span className="font-semibold">23.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Revenue Generated
                    </span>
                    <span className="font-semibold">$45,890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Avg. Order Value
                    </span>
                    <span className="font-semibold">$127</span>
                  </div>
                </div>
                <Button variant="link" className="mt-4 p-0">
                  View Detailed Report →
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Click on any card above to view the full
              detailed reporting dashboard with charts, filters, and export
              {/* Invite User Modal */}
              <Dialog
                open={isInviteUserOpen}
                onOpenChange={setIsInviteUserOpen}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Invite User</DialogTitle>
                    <DialogDescription>
                      Send an invitation to a new team member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="user@example.com"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select defaultValue="viewer">
                        <SelectTrigger id="invite-role" className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-message">Message (Optional)</Label>
                      <Textarea
                        id="invite-message"
                        placeholder="Add a personal message to the invitation..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsInviteUserOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleInviteUser}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Edit User Modal */}
              <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                      Update user information and permissions
                    </DialogDescription>
                  </DialogHeader>
                  {selectedUser && (
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{selectedUser.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedUser.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Full Name</Label>
                        <Input
                          id="edit-name"
                          defaultValue={selectedUser.name}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select defaultValue={selectedUser.role.toLowerCase()}>
                          <SelectTrigger id="edit-role" className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select
                          defaultValue={selectedUser.status.toLowerCase()}
                        >
                          <SelectTrigger id="edit-status" className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditUserOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateUser}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              options.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
