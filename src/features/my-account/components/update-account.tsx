"use client";
import { DatePicker } from "@/components/datepicker";
import PhoneInput from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { convertNewsletter } from "@/features/auth/server/actions/sign-up";
import { toast } from "@/hooks/use-toast";
import { UserData } from "../data/get-user-info";
import { updateUser, UpdateUserData } from "../server/actions/update-user";

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
interface UpdateAccountProps {
  user: UserData;
}
export default function UpdateAccount({ user }: UpdateAccountProps) {
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: user.email,
      Gender: "1",
      FirstName: user.first_name,
      LastName: user.last_name,
      Newsletter: [],
      Phone: user.phone,
      Birthday: new Date(user.birthday),
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
    const updateData: UpdateUserData = {
      DisplayName: values.FirstName + " " + values.LastName,
      ContactName: "",
      ContactTitle: "",
      AvatarUrl: "",
      Gender: Number(values.Gender),
      Birthday: Math.floor(values.Birthday.getTime() / 1000),
      FirstName: values.FirstName,
      LastName: values.LastName,
      Phone: values.Phone,
      Fax: "",
      Website: "",
      CNIC: "",
      NTN: "",
      STRN: "",
      VAT: "",
      Newsletter: convertNewsletter(values.Newsletter),
      RegionId: 0,
      CountryId: 0,
      StateId: 0,
      CityId: 0,
      Address: "",
      PostalCode: "",
    };
    updateUserMutation.mutate(updateData);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {t("account.basic-info")}
        </CardTitle>
        <CardDescription>{t("account.description")}</CardDescription>
      </CardHeader>
      <CardContent className="">
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
                  <FormLabel>{t("sign-up.gender")}</FormLabel>
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
                          {t("sign-up.male")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("sign-up.female")}
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
                  <FormLabel>{t("sign-up.first-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("sign-up.first-name")} {...field} />
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
                  <FormLabel>{t("sign-up.last-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("sign-up.last-name")} {...field} />
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
                  <FormLabel>{t("sign-up.birthday")}</FormLabel>
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
                  <FormLabel>{t("sign-up.email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("sign-up.email")} {...field} />
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
                  <FormLabel>{t("sign-up.phone")}</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder={t("sign-up.phone")} {...field} />
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

            <div className="col-span-2 flex items-center justify-center gap-2">
              <Button
                type="submit"
                variant="default"
                className="w-full md:w-32"
                disabled={updateUserMutation.isPending}
              >
                {t("account.update-account")}
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
