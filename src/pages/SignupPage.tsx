import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signup } from "@/services/auth";
import { setToken } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/components/assets/index";
import { toast } from "sonner";

const schema = z
  .object({
    email: z.email("Enter a valid email"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      return await signup(values);
    },
    retry: false,
    onSuccess: (data) => {
      // Store the token and auto-login
      setToken(data.token);
      toast.success("Account created successfully!", {
        duration: 3000,
      });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      const message = error?.message || "Failed to create account";

      toast.error(message, {
        duration: 3000,
      });
    },
  });

  // Remove dark mode
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prevState) => !prevState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm border rounded-lg p-6 shadow-sm bg-card">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LogoIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ProfitAgent</h1>
            <p className="text-sm text-muted-foreground">AI Sales Platform</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold mb-1">Sign up</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Create your account to continue.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                className="absolute inset-y-10 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                className="absolute inset-y-10 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md"
                onClick={toggleConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account…" : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
