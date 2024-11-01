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
import {
  changePassword,
  ChangePasswordProps,
} from "../server/actions/change-password";

const formSchema = z.object({
  Password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirm_password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  OldPassword: z.string().min(4, {
    message: "Old Password must be at least 4 characters.",
  }),
});
// interface UpdateAccountProps {
//   user: UserData;
// }
export default function UpdatePassword() {
  const t = useTranslations("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toggleOldPasswordVisibility = () =>
    setShowOldPassword(!showOldPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Password: "",
      confirm_password: "",
      OldPassword: "",
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: ChangePasswordProps) => changePassword({ data }),
    onSuccess: (data) => {
      if (data.success && !data?.message) {
        toast({
          title: t("update-password-success"),
        });
        // refresh form data
        form.reset();
      } else {
        toast({
          title: t("update-password-error"),
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: t("update-password-error"),
        variant: "destructive",
      });
      console.error("Sign-up error:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.Password !== values.confirm_password) {
      form.setError("confirm_password", {
        message: t("password-mismatch"),
      });
      form.setError("Password", {
        message: t("password-mismatch"),
      });
      return;
    }
    updateUserMutation.mutate({
      OldPassword: values.OldPassword,
      NewPassword: values.Password,
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {t("update-password-title")}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            {/* Old Password */}
            <FormField
              control={form.control}
              name="OldPassword"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("old-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder={t("old-password")}
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showOldPassword ? (
                          <EyeOffIcon
                            className="size-5"
                            onClick={toggleOldPasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="size-5"
                            onClick={toggleOldPasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("new-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("new-password")}
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
                  <FormLabel>{t("confirm-password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("confirm-password")}
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
                {t("update-password-btn")}
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
