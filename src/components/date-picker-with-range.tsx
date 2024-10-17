"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface DatePickerProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerProps & React.HTMLAttributes<HTMLDivElement>) {
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("home.search-form");
  function onChangeDate(newDate: DateRange | undefined) {
    setTempDate(newDate);
  }
  const isDifferentDate =
    tempDate?.from &&
    tempDate?.to &&
    tempDate?.from?.getTime() !== tempDate?.to?.getTime();
  function handleDone() {
    if (isDifferentDate) {
      setDate(tempDate);
      setOpen(false);
    }
  }
  React.useEffect(() => {
    if (!open) {
      setTempDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <div className={cn("grid", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start px-3 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <span className="flex w-full items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {date?.from ? (
                date.to ? (
                  <span className="flex-1 text-center">
                    {format(date.from, "dd/MM/y")} -{" "}
                    {format(date.to, "dd/MM/y")}
                  </span>
                ) : (
                  format(date.from, "dd/MM/y")
                )
              ) : (
                <span>{t("pick-date")}</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={onChangeDate}
            numberOfMonths={2}
            fromDate={new Date()}
          />
          <div className="m-2 flex justify-end gap-2">
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              {t("btn-cancel")}
            </Button>
            <Button disabled={!isDifferentDate} onClick={handleDone}>
              {t("btn-done")}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
