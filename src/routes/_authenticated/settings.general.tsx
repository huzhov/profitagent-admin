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
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Shield,
  Users,
  Plus,
  Save,
  Pencil,
  Camera,
  Mail,
  Building2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Empty,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessVertical } from "@/components/agent-builder/types";
import { useBusiness, useApp } from "@/context/AppContext";
import { createBusiness } from "@/services/business";
import type { Business } from "@/context/types";
import { toast } from "sonner";

const businessFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  vertical: z.string().min(1, "Vertical is required"),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

function GeneralSettings() {
  const {
    business,
    setBusiness,
    fetchBusiness,
    loading: businessLoading,
  } = useBusiness();
  const { user, setUser } = useApp();
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [highlightBusiness, setHighlightBusiness] = useState(false);
  const businessCardRef = useRef<HTMLDivElement>(null);

  const businessForm = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: { name: "", vertical: "" },
    mode: "onChange",
  });

  // Fetch business data when user changes or component mounts
  useEffect(() => {
    fetchBusiness(user);
  }, [user?.businessId, fetchBusiness]);

  // Handle hash navigation and highlight
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#business-settings") {
      // Scroll to the section
      businessCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Trigger highlight animation
      setHighlightBusiness(true);
      const timer = setTimeout(() => {
        setHighlightBusiness(false);
      }, 2000); // Remove highlight after 2 seconds (2 pulses)

      return () => clearTimeout(timer);
    }
  }, []);

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

  const handleCreateBusiness = async (values: BusinessFormValues) => {
    setSubmitting(true);
    try {
      // Create business via API
      const newBusiness = await createBusiness({
        name: values.name,
        vertical: values.vertical,
      });

      // Update business in Zustand store
      setBusiness(newBusiness);

      // Update user with businessId
      if (user && newBusiness.id) {
        const updatedUser = { ...user, businessId: newBusiness.id };
        setUser(updatedUser);
      }

      toast.success("Business created successfully!");
      setIsBusinessModalOpen(false);
      businessForm.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to create business");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SettingsLayout>
      <div className="space-y-6">
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
              <Input id="company" placeholder="Acme Inc." autoComplete="off" />
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

        {/* Business Settings Section */}
        <Card
          ref={businessCardRef}
          className={`shadow-none ${
            highlightBusiness
              ? "animate-heartbeat ring-2 ring-blue-500 ring-offset-4 bg-blue-50/50 shadow-lg shadow-blue-200/50"
              : ""
          }`}
          id="business-settings"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Settings
            </CardTitle>
            <CardDescription>
              Manage your business details and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {businessLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">
                  Loading business...
                </p>
              </div>
            ) : business ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Business Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {business.name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Industry Vertical
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {business.vertical}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Business
                  </Button>
                </div>
              </div>
            ) : (
              <Empty>
                <EmptyTitle>No business assigned</EmptyTitle>
                <EmptyDescription>
                  You haven't created a business yet. Set up your business to
                  get started.
                </EmptyDescription>
                <EmptyContent>
                  <Button onClick={() => setIsBusinessModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Business
                  </Button>
                </EmptyContent>
              </Empty>
            )}
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
              <Input id="currentPassword" type="password" autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" autoComplete="off" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" autoComplete="off" />
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
      </div>

      {/* Business Modal */}
      <Dialog open={isBusinessModalOpen} onOpenChange={setIsBusinessModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Business</DialogTitle>
            <DialogDescription>
              Set up your business information
            </DialogDescription>
          </DialogHeader>
          <Form {...businessForm}>
            <form
              className="space-y-6 mt-4"
              onSubmit={businessForm.handleSubmit(handleCreateBusiness)}
            >
              <FormField
                control={businessForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="business-name">Business Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="business-name"
                        placeholder="Enter business name"
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={businessForm.control}
                name="vertical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="business-vertical">
                      Industry Vertical
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={BusinessVertical.Entertainment}>
                          Entertainment
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Ecommerce}>
                          E-commerce
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Saas}>
                          SaaS
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Retail}>
                          Retail
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Healthcare}>
                          Healthcare
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Finance}>
                          Finance
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Education}>
                          Education
                        </SelectItem>
                        <SelectItem value={BusinessVertical.Travel}>
                          Travel & Hospitality
                        </SelectItem>
                        <SelectItem value={BusinessVertical.RealEstate}>
                          Real Estate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBusinessModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting || !businessForm.formState.isValid}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Business
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Invite User Modal */}
      <Dialog open={isInviteUserOpen} onOpenChange={setIsInviteUserOpen}>
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
                <Select defaultValue={selectedUser.status.toLowerCase()}>
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
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsLayout>
  );
}

export const Route = createFileRoute("/_authenticated/settings/general")({
  component: GeneralSettings,
});
