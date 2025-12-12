import { PageHeader } from "../ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Send, Phone, Trash } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  phones: z
    .array(
      z.string().refine((v) => isValidPhoneNumber(v), {
        message: "Invalid phone number",
      })
    )
    .min(1, { message: "Must have at least one phone number." }),
});

export default function Outbound() {
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [values, setValues] = useState<z.infer<typeof FormSchema>>();
  const [phoneText, setPhoneText] = useState("");
  const [status, setStatus] = useState("");
  const [bulkInputMode, setBulkInputMode] = useState(false);
  const [parseError, setParseError] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      templateName: "",
      phones: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phones" as never,
  });

  const phones = useWatch({ control: form.control, name: "phones" });

  const defaultCountry: string | undefined = undefined;

  const handleOnChangePhone = (value: string) => {
    setPhoneText(value);
    // reset phones value in form
    const resetPhoneValues = () =>
      form.setValue("phones", [], {
        shouldValidate: true,
        shouldDirty: true,
      });

    // if empty or whitespace, clear parseError
    if (!value || !value.trim()) {
      resetPhoneValues();
      return setParseError("");
    }

    const lines = value
      .split(/\r?\n/)
      .map((ln) => ln.trim())
      .filter((ln) => ln.length > 0);

    if (lines.length > 100) {
      resetPhoneValues();
      return setParseError(`Only up to 100 phone numbers are allowed.`);
    }

    // check each number
    const invalidLine = lines.findIndex(
      (num) => !isValidPhoneNumber(num, defaultCountry)
    );
    if (invalidLine !== -1) {
      resetPhoneValues();
      return setParseError(
        `Invalid phone number at line ${invalidLine + 1}: "${lines[invalidLine]}"`
      );
    }

    form.setValue("phones", lines, { shouldValidate: true, shouldDirty: true });
    setParseError("");
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setValues(data);
    setIsBusinessModalOpen(true);
  };

  const onSend = () => {
    setIsBusinessModalOpen(false);
    toast.success("Successfully sent!");
    setStatus("Delivered");
  };

  return (
    <div className="mx-auto p-6 space-y-6">
      <PageHeader
        title="Outbound"
        description="Sending outbound marketing messages"
        showButton={false}
      />

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Outbound Message Setup
          </CardTitle>
          <CardDescription>
            Configure and send outbound marketing messages to your audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pb-5">
            <Label className="text-red-600">Disclaimer</Label>
            <Label className="text-xs text-gray-600 font-normal">
              Sending this outbound message will incur WhatsApp conversation
              fees. Costs depend on country and message category. Your account
              will be billed accordingly.
            </Label>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-3">
                <div>
                  <FormField
                    control={form.control}
                    name="templateName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-left">
                          Template Name<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="mt-1.5 w-full">
                              <SelectValue placeholder="Select Template" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="text">
                              Template Example 1
                            </SelectItem>
                            <SelectItem value="email">
                              Template Example 2
                            </SelectItem>
                            <SelectItem value="options">
                              Template Example 3
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div>
                    <Label className="text-sm font-medium">
                      {bulkInputMode ? "Bulk" : "Input"}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {bulkInputMode
                        ? "Paste multiple phone numbers, one per line"
                        : "Enter a valid phone number"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${bulkInputMode ? "text-gray-900 font-medium" : "text-gray-500"}`}
                    >
                      Input
                    </span>
                    <Switch
                      checked={bulkInputMode}
                      onCheckedChange={(checked) => setBulkInputMode(checked)}
                    />
                    <span
                      className={`text-sm ${bulkInputMode ? "text-gray-900 font-medium" : "text-gray-500"}`}
                    >
                      Bulk
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {bulkInputMode ? (
                    <>
                      <Label>
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        value={phoneText}
                        onChange={(e) => handleOnChangePhone(e.target.value)}
                      />
                      <div className="text-sm text-red-500 mt-1">
                        {parseError ? parseError : ""}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Phone numbers should be seperated by new line. Maximum
                        of 100
                      </p>
                    </>
                  ) : (
                    <>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex gap-2 items-end w-full"
                        >
                          <FormField
                            control={form.control}
                            name={`phones.${index}`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>
                                  Phone Number{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <div className="flex gap-1 w-full">
                                  <FormControl className="w-full">
                                    <PhoneInput
                                      {...field}
                                      defaultCountry="GB"
                                      placeholder="Enter phone number"
                                    />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                  >
                                    <Trash />
                                  </Button>
                                </div>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {!bulkInputMode && phones.length <= 100 && (
                  <Button
                    type="button"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => append("")}
                  >
                    Add Phone Number
                  </Button>
                )}

                <Separator />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {status && (
                      <>
                        <Label className="font-bold">Status:</Label>
                        <Label className="text-green-600">{status}</Label>
                      </>
                    )}
                  </div>
                  <Button size="sm" type="submit">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Dialog open={isBusinessModalOpen}>
        <DialogContent className="max-w-md w-full [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-red-600">Disclaimer</DialogTitle>
            <DialogDescription>
              Sending this outbound message will incur WhatsApp conversation
              fees. Costs depend on country and message category. Your account
              will be billed accordingly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsBusinessModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={onSend}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
