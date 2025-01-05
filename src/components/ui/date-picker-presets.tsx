"use client";

import * as React from "react";
import { addDays, format, isToday, isTomorrow, isThisYear, isYesterday, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  Sun as SunIcon,
  Sunrise as SunriseIcon,
  CalendarArrowUp as CalendarArrowUpIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

function dateFormatted(date: Date | undefined) {
  if (!date) {
    return;
  }
  if (isToday(date)) {
    return "Today";
  }
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  if (isSameDay(addDays(new Date(), 2), date)) {
    return "In 2 days";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  if (isSameDay(addDays(new Date(), -2), date)) {
    return "2 days ago";
  }
  if (isThisYear(date)) {
    return format(date, "MMM d");
  }
  return format(date, "PPP");
}

export function DatePickerWithPresets() {
  const PresetButton = ({
    onClick,
    children,
    text,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    text?: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onFocus={(e) => e.preventDefault()}>
          {/* Prevents the the preset button tooltip from showing on focus */}
          <button onClick={onClick} className="hover:bg-gray-900 rounded-md p-2">
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon />
          {dateFormatted(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex w-full justify-between px-8 py-2">
          <PresetButton onClick={() => setDate(new Date())} text="Today">
            <SunIcon />
          </PresetButton>
          <PresetButton onClick={() => setDate(addDays(new Date(), 1))} text="Tomorrow">
            <SunriseIcon />
          </PresetButton>
          <PresetButton onClick={() => setDate(addDays(new Date(), 7))} text="Next week">
            <CalendarArrowUpIcon />
          </PresetButton>
        </div>
        <div className="rounded-md">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="flex flex-col">
          <button>Repeat</button>
          <button onClick={() => setDate(undefined)}>Clear</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
