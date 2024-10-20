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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  subject: z.enum(["reservation", "support", "feedback", "other"], {
    required_error: "Please select a subject.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  const t = useTranslations("contact");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: undefined,
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="px-4">
      <h1 className="mb-8 text-center text-3xl font-bold">{t("title")}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("contact-information")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>info@luxuryhotel.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>123 Luxury Ave, Paradise City, 12345</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("send-message")}</CardTitle>
            <CardDescription>{t("get-back-to-you")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("first-name")}</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("last-name")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("phone")} {t("optional")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("subject")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("select-subject")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reservation">
                            {t("reservation")}
                          </SelectItem>
                          <SelectItem value="support">
                            {t("support")}
                          </SelectItem>
                          <SelectItem value="feedback">
                            {t("feedback")}
                          </SelectItem>
                          <SelectItem value="other">{t("other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("message")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("message-placeholder")}
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {t("send")}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
