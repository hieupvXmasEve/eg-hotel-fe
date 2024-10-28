"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { updateUser, UpdateUserData } from "../server/actions/update-user";

const formSchema = z.object({
  Password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirm_password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
// interface UpdateAccountProps {
//   user: UserData;
// }
export default function UpdatePassword() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Password: "",
      confirm_password: "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(data),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: t("account.update-account-success"),
        });
      } else {
        toast({
          title: t("account.update-account-error"),
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: t("sign-up.sign-up-error"),
        variant: "destructive",
      });
      console.error("Sign-up error:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="container mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {t("account.update-password-title")}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            {/* Password */}
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("sign-up.password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("sign-up.password")}
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <EyeOffIcon
                            className="size-5"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="size-5"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("sign-up.confirm-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("sign-up.confirm-password")}
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showConfirmPassword ? (
                          <EyeOffIcon
                            className="size-5"
                            onClick={toggleConfirmPasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="size-5"
                            onClick={toggleConfirmPasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 flex items-center justify-center gap-2">
              <Button
                type="submit"
                variant="default"
                className="w-full md:w-32"
                disabled={updateUserMutation.isPending}
              >
                {t("account.update-password-btn")}
                {updateUserMutation.isPending && (
                  <Loader2 className="ml-2 size-4 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
