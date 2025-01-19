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

export function DatePickerWithPresets({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
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
          <button onClick={onClick} className="hover:bg-neutral-900 rounded-md p-2">
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  // const [date, setDate] = React.useState<Date>();
  // Commented out for now because the state is managed by the parent component
  return (
    <Popover>
      {/* setting modal to true allows the popover to be clicked on when inside a dialog */}
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="h-9 w-9" />
          {dateFormatted(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2 border-none" align="end">
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
        <button
          onClick={(e) => {
            e.preventDefault();
            setDate(undefined);
          }}
          className="flex-1 bg-neutral-800 rounded-md text-md px-3 py-1 text-white font-medium"
        >
          Clear
        </button>
      </PopoverContent>
    </Popover>
  );
}
