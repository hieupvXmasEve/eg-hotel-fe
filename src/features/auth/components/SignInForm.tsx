"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInAction } from "@/features/auth/server/actions/sign-in-action";
import { Link, useRouter } from "@/i18n/routing";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type SignInFormData = z.infer<typeof SignInSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const t = useTranslations("sign-in");
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await signInAction(formData);
    console.log("result", result);

    if (result?.success) {
      router.push("/"); // Redirect to dashboard on success
    } else {
      toast({
        title: result?.error,
        variant: "destructive",
      });
      console.error(result.error);
    }
  };

  return (
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
          {t("forgot-password")}
        </Link>

        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {t("sign-in")}
          {form.formState.isSubmitting && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
        <Link
          href="/sign-up"
          className="block text-sm text-primary hover:underline"
        >
          <Button type="button" variant="outline" className="w-full">
            {t("sign-up")}
          </Button>
        </Link>
      </form>
    </Form>
  );
};
