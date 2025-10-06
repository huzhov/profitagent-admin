import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import { BusinessVertical } from "./agent-builder/types";
import { apiJson } from "@/lib/http";

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
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground">
            Business Settings
          </h2>
          <p className="text-muted-foreground">Manage business details</p>
        </div>
        <Button
          className="flex items-center space-x-2"
          onClick={() => setModalOpen(true)}
          disabled={!!business}
        >
          <span>Add Business</span>
        </Button>
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
          <span className="text-muted-foreground text-lg text-center w-full">
            You haven't created any business details yet
          </span>
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
                } catch (err) {
                  // handle error (could show toast)
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
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Business Name"
                        className="mt-1"
                      />
                    </FormControl>
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
                  disabled={submitting || !form.formState.isValid}
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
