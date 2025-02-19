"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClockIcon } from "lucide-react";
import { useState } from "react";

export default function TimePicker() {
  const [hour, setHour] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);
  const [ampm, setAmpm] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleTimeChange = (type: "hour" | "minute" | "ampm", value: string, event: any) => {
    event.preventDefault();

    if (type === "hour") {
      setHour(value);
    } else if (type === "minute") {
      setMinute(value);
    } else if (type === "ampm") {
      setAmpm(value);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={"w-fit justify-start text-left font-normal"}>
          <ClockIcon className="mr-2 h-4 w-4" />
          {hour && minute && ampm ? `${hour}:${minute.padStart(2, "0")} ${ampm}` : "hh:mm aa"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <div className="flex flex-col sm:flex-row sm:h-[200px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map((hourItem) => (
                  <Button
                    key={hourItem}
                    size="icon"
                    variant={hour === hourItem.toString() ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={(e) => handleTimeChange("hour", hourItem.toString(), e)}
                  >
                    {hourItem}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minuteItem) => (
                  <Button
                    key={minuteItem}
                    size="icon"
                    variant={minute === minuteItem.toString() ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={(e) => handleTimeChange("minute", minuteItem.toString(), e)}
                  >
                    {minuteItem}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampmItem) => (
                  <Button
                    key={ampmItem}
                    size="icon"
                    variant={ampm === ampmItem ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={(e) => {
                      handleTimeChange("ampm", ampmItem, e);
                    }}
                  >
                    {ampmItem}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
