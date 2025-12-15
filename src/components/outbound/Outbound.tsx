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
import { Send, Phone, Loader2 } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
// import { Switch } from "../ui/switch";
import { listTemplates, sendTemplate } from "@/services/templates";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { SendTemplate } from "@/types/templates";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";

const schema = z.object({
  templateId: z.string().min(1, "Template name is required"),
  to: z.string().refine((v) => isValidPhoneNumber(v), {
    message: "Invalid phone number",
  }),
});

export default function Outbound() {
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [sendValues, setSendValues] = useState<SendTemplate>({
    templateId: "",
    to: "",
  });
  // const [phoneText, setPhoneText] = useState("");
  const [status, setStatus] = useState("");
  // const [bulkInputMode, setBulkInputMode] = useState(false);
  // const [parseError, setParseError] = useState<string>("");

  // const defaultCountry: string | undefined = undefined;

  const { data: listTemplateData, isLoading: isListTemplateLoading } = useQuery(
    {
      queryFn: listTemplates,
      queryKey: ["listTemplates"],
    }
  );

  const { mutate: sendTemplateFn, isPending: isSendTemplatePending } =
    useMutation({
      mutationFn: sendTemplate,
      onSuccess: (data) => {
        if (data.success) {
          setStatus(data.success);
          toast.success("Successfully sent!");
        }
      },
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      templateId: "",
      to: "",
    },
    mode: "onTouched",
  });

  /*
   * Future feature for multiple phone numbers send
   */

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "phones" as never,
  // });

  // const phones = useWatch({ control: form.control, name: "to" });
  //
  // const handleOnChangePhone = (value: string) => {
  //   setPhoneText(value);
  //   // reset phones value in form
  //   const resetPhoneValues = () =>
  //     form.setValue("to", [], {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //     });

  //   // if empty or whitespace, clear parseError
  //   if (!value || !value.trim()) {
  //     resetPhoneValues();
  //     return setParseError("");
  //   }

  //   const lines = value
  //     .split(/\r?\n/)
  //     .map((ln) => ln.trim())
  //     .filter((ln) => ln.length > 0);

  //   if (lines.length > 100) {
  //     resetPhoneValues();
  //     return setParseError(`Only up to 100 phone numbers are allowed.`);
  //   }

  //   // check each number
  //   const invalidLine = lines.findIndex(
  //     (num) => !isValidPhoneNumber(num, defaultCountry)
  //   );
  //   if (invalidLine !== -1) {
  //     resetPhoneValues();
  //     return setParseError(
  //       `Invalid phone number at line ${invalidLine + 1}: "${lines[invalidLine]}"`
  //     );
  //   }

  //   form.setValue("to", lines, { shouldValidate: true, shouldDirty: true });
  //   setParseError("");
  // };

  const onSubmit = (data: z.infer<typeof schema>) => {
    setSendValues(data);
    setIsBusinessModalOpen(true);
  };

  const handleOnSend = () => {
    setIsBusinessModalOpen(false);
    sendTemplateFn(sendValues);
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
                    name="templateId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="text-left">
                          Template Name<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={
                            isListTemplateLoading || !listTemplateData?.length
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="mt-1.5 w-full">
                              <SelectValue
                                placeholder={
                                  isListTemplateLoading
                                    ? "Loading..."
                                    : listTemplateData?.length
                                      ? "Select Template"
                                      : "No Template Available"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {listTemplateData?.map((data) => (
                              <SelectItem value={data.id}>
                                {data.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name={`to`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Phone Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl className="w-full">
                          <PhoneInput
                            disabled={
                              isListTemplateLoading || !listTemplateData?.length
                            }
                            {...field}
                            defaultCountry="GB"
                            placeholder="Enter phone number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*
                 * Future feature for multiple send phone numbers
                 */}
                {/* <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
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
                            name={`to.${index}`}
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
                )} */}
                <Separator />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    {status && (
                      <>
                        <Label className="font-bold">Status:</Label>
                        <Label
                          className={status ? "text-green-600" : "text-red-600"}
                        >
                          {status ? "Sent" : "Failed"}
                        </Label>
                      </>
                    )}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          size="sm"
                          type="submit"
                          disabled={
                            !form.formState.isValid || isSendTemplatePending
                          }
                        >
                          {isSendTemplatePending ? (
                            <div className="w-14.5 flex justify-center">
                              <Loader2 className="animate-spin" />
                            </div>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Send Confirmation Modal */}
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
            <Button
              size="sm"
              onClick={handleOnSend}
              disabled={isSendTemplatePending}
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
