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
import { useRouter } from "nextjs-toploader/app";

import { addDays, format } from "date-fns";
import { Hotel } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import PeopleBooking, { Room } from "./search-room/people-booking";
import { convertNameToUrl } from "@/features/hotels/utils/convert-name-to-url";

const FormSchema = z.object({
  hotel_id: z.string({
    required_error: "Please select an email to display.",
  }),
  check_in_date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});
interface SearchFormProps {
  hotels: Array<{
    hotel_id: number;
    hotel_name: string;
    value: string;
    hotel_image: string;
  }>;
  hotelId: string;
}
export default function SearchForm({ hotels, hotelId }: SearchFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const [rooms, setRooms] = useState<Room[]>([{ adults: 1, children: 0 }]);
  const t = useTranslations("home");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hotel_id: hotelId || hotels?.[0]?.hotel_id?.toString() || "",
      check_in_date: {
        from: new Date(),
        to: addDays(new Date(), 1),
      },
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const date_from = format(data.check_in_date.from, "yyyy-MM-dd");
    const date_to = format(data.check_in_date.to, "yyyy-MM-dd");

    // Store search in localStorage
    const selectedHotel = hotels.find(
      (hotel) => hotel.hotel_id === Number(data.hotel_id),
    );
    const searchData = {
      id: Date.now(),
      hotel_name: selectedHotel?.hotel_name || "",
      image: selectedHotel?.hotel_image || "",
      dateRange: `${format(data.check_in_date.from, "dd/MM")} - ${format(data.check_in_date.to, "dd/MM")}`,
      people: rooms.reduce((acc, room) => acc + room.adults + room.children, 0),
      timestamp: Date.now(),
    };

    // Get existing searches from localStorage
    const existingSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    // Add new search to the beginning and keep only last 6 searches
    const updatedSearches = [searchData, ...existingSearches].slice(0, 6);

    // Save back to localStorage
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    // Create URLSearchParams from the query object
    const params = new URLSearchParams();
    rooms.forEach((room, index) => {
      params.append(`rooms[${index}][adults]`, room.adults.toString());
      params.append(`rooms[${index}][children]`, room.children.toString());
    });
    const roomName = convertNameToUrl(
      hotels.find((hotel) => hotel.hotel_id === Number(data.hotel_id))
        ?.hotel_name || "",
    );
    router.push(
      `/${locale}/${roomName}?date_from=${date_from}&date_to=${date_to}&rooms=${params.toString()}&hotel_id=${data.hotel_id}&timestamp=${Date.now().toString()}`,
    );
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
                    {hotels.map((hotel) => (
                      <SelectItem
                        key={hotel.hotel_id}
                        value={hotel.hotel_id?.toString() || ""}
                      >
                        {hotel.hotel_name}
                      </SelectItem>
                    ))}
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
