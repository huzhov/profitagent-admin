import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
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
import { login } from "@/services/auth";
import { Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/components/assets/index";
import { setToken } from "@/lib/auth";
import useUserStore from "@/store/user-store";

const schema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });
  const { setUser } = useUserStore();

  const [isVisible, setIsVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      const data = await login(values.email, values.password);
      setToken(data.token);
      setUser(data.user);
      navigate({ to: "/" });
    },
    retry: false,
  });

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm border rounded-lg p-6 shadow-sm bg-card">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LogoIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ProfitAgent</h1>
            <p className="text-sm text-muted-foreground">AI Sales Platform</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold my-1">Log in</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Use your email and password to continue.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-4"
          >
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
                        type={isVisible ? "text" : "password"}
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
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <Link to="/signup" className="underline">
                Forgot Password
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in…" : "Log in"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          <span>Don’t have an account? </span>
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
