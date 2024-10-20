"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BookNow() {
  const t = useTranslations("room.book-now");
  const [rooms, setRooms] = useState(1);

  const decreaseRooms = () => setRooms((prev) => Math.max(1, prev - 1));
  const increaseRooms = () => setRooms((prev) => prev + 1);

  return (
    <div className="flex w-full items-center justify-around gap-4 rounded-2xl bg-gradient-to-b from-[#8664E2] to-[#6558CD] p-4 md:max-w-lg md:justify-center">
      <span className="hidden text-sm font-semibold text-white md:inline-block md:text-base">
        {t("number-of-rooms")}
      </span>
      <div className="flex items-center rounded-full bg-white">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={decreaseRooms}
        >
          <Minus className="h-4 w-4 text-purple-500" />
        </Button>
        <span className="mx-3 font-bold text-purple-500">{rooms}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={increaseRooms}
        >
          <Plus className="h-4 w-4 text-purple-500" />
        </Button>
      </div>
      <Button variant="outline" className="rounded-full bg-white text-primary">
        {t("book-now")}
      </Button>
    </div>
  );
}
