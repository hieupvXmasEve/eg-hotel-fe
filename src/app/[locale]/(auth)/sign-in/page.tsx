"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Email is invalid."),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
export default function SignInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Card className="mx-auto mt-6 w-full max-w-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Đăng nhập
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Địa chỉ email" {...field} />
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
                  <FormControl>
                    <Input placeholder="Mật khẩu" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="block text-sm text-primary hover:underline"
            >
              Quên mật khẩu?
            </Link>

            <Button type="submit" variant="default" className="w-full">
              Đăng nhập
            </Button>
            <Link
              href="/sign-up"
              className="block text-sm text-primary hover:underline"
            >
              <Button type="button" variant="outline" className="w-full">
                Đăng ký
              </Button>
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
