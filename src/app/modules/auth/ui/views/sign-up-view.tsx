"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Github, OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(1, { error: "请填写用户名" }),
    email: z.email("请填写正确的邮箱"),
    password: z.string().min(1, { error: "请填写密码" }),
    confirmPassword: z.string().min(1, { error: "请填写密码" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "密码不一致",
    path: ["confirmPassword"],
  });
export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmPassword: "",
      password: "",
    },
  });
  console.log("SignUpView");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    const { email, password, name } = values;
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0 grid md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">注册</h1>
                  <p className="text-muted-foreground text-balance">
                    请创建你的账号
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="john" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>确认密码</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert
                    variant="destructive"
                    className="bg-destructive/10 border-none"
                  >
                    <OctagonAlertIcon className="w-4 h-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                    {/* <AlertDescription>
                      Please check your credentials
                    </AlertDescription> */}
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={pending}>
                  注册
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-x-0 after:top-1/2 after:h-px after:w-full after:bg-border">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    或使用以下方式登录
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" disabled={pending}>
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" type="button" disabled={pending}>
                    {/* <Google className="mr-2 h-4 w-4" /> */}
                    Google
                  </Button>
                </div>
                <div className="text-center text-sm">
                  已有账号？
                  <Link
                    className="underline underline-offset-4"
                    href="/sign-in"
                  >
                    登录
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col items-center justify-center gap-y-4">
            <img src="/logo.svg" alt="logo" className="w-20" />
            <p className="text-2xl font-semibold text-white">Meeting.AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-8">
        点击 “注册”，代表你同意
        <a href="/terms" className="underline underline-offset-8">
          服务条款
        </a>
        和
        <a href="/privacy" className="underline underline-offset-8">
          隐私政策
        </a>
      </div>
    </div>
  );
};
