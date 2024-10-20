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

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { addDays, format } from "date-fns";
import { Hotel } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PeopleBooking, { Room } from "./search-room/people-booking";

const listHotel = [{ id: "1", name: "eg-hotel" }];
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
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>([{ adults: 1, children: 0 }]);
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
    const date_from = format(data.check_in_date.from, "dd-MM-yyyy");
    const date_to = format(data.check_in_date.to, "dd-MM-yyyy");

    // Create URLSearchParams from the query object
    const params = new URLSearchParams();
    console.log("rooms", rooms);
    rooms.forEach((room, index) => {
      params.append(`rooms[${index}][adults]`, room.adults.toString());
      params.append(`rooms[${index}][children]`, room.children.toString());
    });
    console.log("params.toString()", params.toString());
    router.push({
      pathname: "/[hotelName]",
      params: { hotelName: listHotel[0].name },
      query: {
        date_from: date_from,
        date_to: date_to,
        rooms: params.toString(),
      },
    });
  }
  return (
    <div className="rounded-md border-2 border-primary bg-white p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-2 md:grid-cols-12"
        >
          {/* Choose hotel */}
          <FormField
            control={form.control}
            name="hotel_id"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="truncate">
                    <SelectTrigger>
                      <Hotel className="h-5 w-5 flex-shrink-0" />
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
              <FormItem className="col-span-3">
                <DatePickerWithRange
                  date={field.value}
                  setDate={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Choose people */}
          <div className="col-span-4">
            <PeopleBooking rooms={rooms} setRooms={setRooms} />
          </div>
          <div className="col-span-2">
            <Button type="submit" className="w-full capitalize">
              {t("btn-search")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
