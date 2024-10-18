import { ChevronDown, Minus, Plus, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

export interface Room {
  adults: number;
  children: number;
}

interface RoomSelectorProps {
  rooms?: Room[];
  setRooms?: React.Dispatch<React.SetStateAction<Room[]>>;
}

export default function PeopleBooking({
  rooms: propRooms,
  setRooms: propSetRooms,
}: RoomSelectorProps) {
  const [localRooms, setLocalRooms] = useState<Room[]>([
    { adults: 2, children: 0 },
  ]);
  const [open, setOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.search-form");
  const rooms = propRooms || localRooms;
  const setRooms = propSetRooms || setLocalRooms;

  const updateRoom = (
    index: number,
    field: "adults" | "children",
    value: number,
  ) => {
    const newRooms = [...rooms];
    if (field === "adults") {
      newRooms[index][field] = Math.max(1, Math.min(value, 10));
    } else {
      newRooms[index][field] = Math.max(0, Math.min(value, 3));
    }
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [rooms.length]);

  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

  const removeRoom = (index: number) => {
    const newRooms = [...rooms];
    newRooms.splice(index, 1);
    setRooms(newRooms);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between px-3 text-left font-normal"
        >
          <span className="flex flex-1 items-center">
            <User className="mr-2 size-5" />
            <span className="flex-1 text-center">{`${totalAdults} ${t("adult")} - ${totalChildren} ${t("children")} - ${rooms.length} ${t("room")}`}</span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0">
        <ScrollArea className="h-[200px] px-0">
          <div ref={scrollAreaRef} className="space-y-4 px-4">
            {rooms.map((room, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {t("room")} {index + 1}
                  </h3>
                  {rooms.length > 1 && (
                    <Button variant="link" onClick={() => removeRoom(index)}>
                      {t("remove-room")}
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateRoom(index, "adults", room.adults - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{room.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateRoom(index, "adults", room.adults + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span>{t("children")}</span>
                    <p className="text-sm text-muted-foreground">
                      {t("age-0-to-17")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateRoom(index, "children", room.children - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{room.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateRoom(index, "children", room.children + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="m-2 space-y-2">
          <Button
            variant="link"
            className="w-full text-primary"
            onClick={addRoom}
          >
            {t("add-room")}
          </Button>
          <Button className="w-full" onClick={() => setOpen(false)}>
            {t("btn-done")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
