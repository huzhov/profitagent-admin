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
import { LogoIcon } from "@/components/assets/index";
import useUserStore from "@/store/user-store";
import { setToken } from "@/lib/auth";

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

  const setUser = useUserStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const data = await signup(values);
      setToken(data.token);
      setUser(data.user);
      navigate({ to: "/" });
    },
  });

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
