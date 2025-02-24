"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClockIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function TimePicker({
  onTimeSet,
  time,
}: {
  onTimeSet: (time: string) => void;
  time?: string;
}) {
  let timeObj;
  if (time) {
    timeObj = convertTimeStrToObj(time);
  }

  const [hour, setHour] = useState<string | undefined>(timeObj?.hour);
  const [minute, setMinute] = useState<string | undefined>(timeObj?.minute);
  const [ampm, setAmpm] = useState<string | undefined>(timeObj?.ampm);

  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // Create a ref to track if time has been set
  const isTimeSetRef = useRef(false);

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

  useEffect(() => {
    if (hour && minute && ampm && !isTimeSetRef.current) {
      const hours = ampm === "PM" && hour !== "12" ? parseInt(hour) + 12 : hour;
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minute.padStart(2, "0");
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      onTimeSet(formattedTime);
    }
  }, [hour, minute, ampm, onTimeSet]);

  const timeSet = hour && minute && ampm;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="form"
          className={`w-fit justify-start text-left font-normal ${
            timeSet
              ? "dark:text-neutral-300 text-neutral-800"
              : "dark:text-neutral-400 text-neutral-400"
          }`}
        >
          <ClockIcon className="mr-2 h-4 w-4" />
          {timeSet ? `${hour}:${minute.padStart(2, "0")} ${ampm}` : "hh:mm aa"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <div className="flex flex-col sm:flex-row sm:h-[200px] divide-y sm:divide-y-0 sm:divide-x dark:divide-neutral-800 divide-neutral-100">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map((hourItem) => (
                  <ToggleButton
                    isActive={hour === hourItem.toString()}
                    onClick={(e) => handleTimeChange("hour", hourItem.toString(), e)}
                  >
                    {hourItem}
                  </ToggleButton>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minuteItem) => {
                  const parsedMinute = minute && parseInt(minute);
                  return (
                    <>
                      <ToggleButton
                        isActive={parsedMinute === minuteItem}
                        onClick={(e) => handleTimeChange("minute", minuteItem.toString(), e)}
                      >
                        {minuteItem.toString().padStart(2, "0")}
                      </ToggleButton>
                    </>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampmItem) => (
                  <ToggleButton
                    isActive={ampm === ampmItem}
                    onClick={(e) => handleTimeChange("ampm", ampmItem, e)}
                  >
                    {ampmItem}
                  </ToggleButton>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ToggleButtonProps {
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

function ToggleButton({ isActive, onClick, children }: ToggleButtonProps) {
  return (
    <Button
      data-active={isActive}
      size="icon"
      variant="form"
      className={`sm:w-full shrink-0 aspect-square 
                  bg-transparent dark:bg-transparent
                  data-[active=true]:bg-orange-400 
                  data-[active=true]:text-white`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function convertTimeStrToObj(time: string) {
  if (!time || !time.includes(":")) {
    return undefined;
  }

  const [hour, minute] = time.split(":");

  let hourNum = parseInt(hour);
  hourNum = hourNum > 12 ? hourNum - 12 : hourNum;

  return {
    hour: hourNum.toString(),
    minute: minute.toString(),
    ampm: parseInt(hour, 10) >= 12 ? "PM" : "AM",
  };
}
