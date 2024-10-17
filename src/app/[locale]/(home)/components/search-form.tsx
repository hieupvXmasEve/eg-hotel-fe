"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { addDays } from "date-fns";
import { Hotel } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PeopleBooking, { Room } from "./people-booking";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  hotel_id: z.string({
    required_error: "Please select an email to display.",
  }),
  check_in_date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});
export default function SearchForm() {
  const [rooms, setRooms] = useState<Room[]>([{ adults: 2, children: 0 }]);
  const t = useTranslations("home");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hotel_id: "1",
      check_in_date: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-md border-2 border-primary bg-white p-2 md:flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          {/* Choose hotel */}
          <FormField
            control={form.control}
            name="hotel_id"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <Hotel className="h-5 w-5" />
                      <SelectValue placeholder="Select hotel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">{t("hotel-name")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Choose date */}
          <FormField
            control={form.control}
            name="check_in_date"
            render={({ field }) => (
              <FormItem className="">
                <DatePickerWithRange
                  date={field.value}
                  setDate={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Choose people */}
          <PeopleBooking rooms={rooms} setRooms={setRooms} />
          <Button type="submit" className="w-full capitalize">
            {t("btn-search")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
