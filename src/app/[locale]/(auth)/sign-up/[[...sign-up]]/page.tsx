"use client";
import { DatePicker } from "@/components/datepicker";
import PhoneInput from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUp, SignUpData } from "@/features/auth/actions/sign-up";
import { convertNewsletter } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const itemsNewsletter = [
  {
    id: "event",
    label: "Sign up for our newsletter",
  },
  {
    id: "promotion",
    label: "Recieve special offers from our partners!",
  },
] as const;

const formSchema = z.object({
  Email: z.string().min(1, "Email is required.").email("Email is invalid."),
  Password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirm_password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  Gender: z.enum(["1", "0"]),
  FirstName: z.string().min(1, "First name is required."),
  LastName: z.string().min(1, "Last name is required."),
  Birthday: z.date({
    required_error: "A date of birth is required.",
  }),
  Phone: z.string().min(1, "Phone number is required."),
  Newsletter: z.array(z.string()),
});

export default function SignUpPage() {
  const t = useTranslations("sign-up");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
      confirm_password: "",
      Gender: "1",
      FirstName: "",
      LastName: "",
      Newsletter: [],
      Phone: "",
      Birthday: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.Password !== values.confirm_password) {
      form.setError("confirm_password", {
        message: t("password-mismatch"),
      });
      form.setError("Password", {
        message: t("password-mismatch"),
      });
      return;
    }
    const signUpData: SignUpData = {
      Email: values.Email,
      Password: values.Password,
      Gender: Number(values.Gender),
      FirstName: values.FirstName,
      LastName: values.LastName,
      Birthday: Math.floor(values.Birthday.getTime() / 1000),
      Phone: values.Phone,
      Newsletter: convertNewsletter(values.Newsletter),
      DisplayName: values.FirstName + " " + values.LastName,
    };
    const result = await signUp(signUpData);
    if (!result.success) {
      toast({
        title: result.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t("sign-up-success"),
      });
    }
    router.push("/sign-in");
  };

  return (
    <Card className="container mx-auto mt-6 w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* add field gender */}
            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem className="col-span-2 space-y-3">
                  <FormLabel>{t("gender")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("male")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("female")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First name */}
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("first-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("first-name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Last name */}
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("last-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("last-name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date */}
            <FormField
              control={form.control}
              name="Birthday"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("birthday")}</FormLabel>
                  <DatePicker date={field.value} setDate={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("email")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone number */}
            <FormField
              control={form.control}
              name="Phone"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder={t("phone")} {...field} />
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
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("password")}
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
            {/* match password */}
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
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
            {/* Newsletter */}
            <FormField
              control={form.control}
              name="Newsletter"
              render={() => (
                <FormItem className="col-span-2">
                  {itemsNewsletter.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="Newsletter"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <Link
                href="/sign-in"
                className="block text-right text-sm text-primary hover:underline"
              >
                {t("have-account")}
              </Link>
            </div>
            <div className="col-span-2 flex items-center justify-center gap-2">
              <Button
                type="submit"
                variant="default"
                className="w-full md:w-32"
                disabled={form.formState.isSubmitting}
              >
                {t("sign-up")}
                {form.formState.isSubmitting && (
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
