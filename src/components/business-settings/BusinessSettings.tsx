import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Empty, EmptyTitle, EmptyDescription, EmptyContent } from "../ui/empty";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BusinessVertical } from "../agent-builder/types";
import { apiJson } from "@/lib/http";
import { checkIfBusinessExists } from "@/services/business";
import { toast } from "sonner";
import { useNameValidation } from "@/hooks/useNameValidation";
import { ValidatedInput } from "../ui/validated-input";

type BusinessDetails = {
  id: string;
  name: string;
  vertical: string;
};

export default function BusinessSettings() {
  const [business, setBusiness] = useState<BusinessDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const businessFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    vertical: z.string().min(1, "Vertical is required"),
  });

  type BusinessFormValues = z.infer<typeof businessFormSchema>;

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: { name: "", vertical: "" },
    mode: "onChange",
  });
  const [submitting, setSubmitting] = useState(false);

  // Name validation using custom hook
  const businessName = form.watch("name");
  const nameValidation = useNameValidation({
    name: businessName,
    checkExists: checkIfBusinessExists,
    setError: form.setError,
    fieldName: "name",
  });

  useEffect(() => {
    const businessId = JSON.parse(
      localStorage.getItem("user") || "{}"
    ).businessId;
    if (!businessId) {
      setLoading(false);
      setBusiness(null);
      return;
    }
    apiJson<BusinessDetails>(
      `${import.meta.env.VITE_BACKEND_URL}/businesses/${businessId}`
    )
      .then((data) => {
        if (data && data.name && data.vertical) {
          setBusiness({
            id: data.id,
            name: data.name,
            vertical: data.vertical,
          });
        } else {
          setBusiness(null);
        }
      })
      .catch(() => setBusiness(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-6 flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            Business Settings
          </h2>
          <p className="text-muted-foreground">Manage business details</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        {loading ? (
          <span className="text-muted-foreground text-lg">Loading...</span>
        ) : business ? (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Name:</span> {business.name}
                </div>
                <div>
                  <span className="font-semibold">Vertical:</span>{" "}
                  {business.vertical}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Empty className="w-full max-w-md mx-auto text-center">
            <EmptyTitle>No business assigned</EmptyTitle>
            <EmptyDescription>
              You haven't created any business yet
            </EmptyDescription>
            <EmptyContent>
              <Button onClick={() => setModalOpen(true)}>Add Business</Button>
            </EmptyContent>
          </Empty>
        )}
      </div>
      {/* Modal for Add Business */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Add Business</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-6 mt-4"
              onSubmit={form.handleSubmit(async (values) => {
                // Check validation status before submitting
                if (nameValidation.status === "exists") {
                  toast.error("Business with this name already exists");
                  return;
                }

                if (nameValidation.status === "checking") {
                  toast.error("Please wait for name validation to complete");
                  return;
                }

                setSubmitting(true);
                try {
                  const res = await apiJson<BusinessDetails>(
                    `${import.meta.env.VITE_BACKEND_URL}/businesses`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(values),
                    }
                  );
                  const userFromLocalStorage = JSON.parse(
                    localStorage.getItem("user") || "{}"
                  );

                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      ...userFromLocalStorage,
                      businessId: res.id,
                    })
                  );
                  setBusiness({
                    id: res.id,
                    name: res.name,
                    vertical: res.vertical,
                  });
                  setModalOpen(false);
                  form.reset();
                  toast.success("Business created successfully");
                } catch (err) {
                  toast.error("Failed to create business. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              })}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className={
                        nameValidation.status === "exists"
                          ? "text-red-500"
                          : nameValidation.status === "available"
                            ? "text-green-600"
                            : ""
                      }
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <ValidatedInput
                        {...field}
                        id="name"
                        placeholder="Business Name"
                        className="mt-1"
                        validationStatus={nameValidation.status}
                      />
                    </FormControl>
                    {nameValidation.message && (
                      <p
                        className={`text-sm mt-1 ${
                          nameValidation.status === "available"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {nameValidation.message}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vertical"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="vertical">Vertical</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Industry category of the agent" />
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
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    submitting ||
                    !form.formState.isValid ||
                    nameValidation.status === "checking" ||
                    nameValidation.status === "exists" ||
                    nameValidation.status === "error" ||
                    !businessName?.trim()
                  }
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
