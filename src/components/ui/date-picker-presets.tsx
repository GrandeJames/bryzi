"use client";

import * as React from "react";
import { addDays, format, isToday, isTomorrow, isThisYear, isYesterday, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  Sun as SunIcon,
  Sunrise as SunriseIcon,
  CalendarArrowUp as CalendarArrowUpIcon,
} from "lucide-react";

import { cn } from "@/utils/cn";
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
  deadline,
  setDeadline,
}: {
  deadline?: Date;
  setDeadline: (date: Date | undefined) => void;
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
          <button
            onClick={onClick}
            className="dark:hover:bg-neutral-900 hover:bg-neutral-100 rounded-md p-2"
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const [date, setDate] = React.useState<Date | undefined>(
    deadline ? (deadline instanceof Date ? deadline : new Date(deadline)) : undefined
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-2 py-2 rounded-md group flex gap-2 items-center">
          <CalendarIcon
            className={`size-5 ${
              date
                ? "text-blue-500"
                : "text-neutral-800 dark:text-neutral-300 group-hover:dark:text-neutral-400 group-hover:text-neutral-500"
            }`}
          />
          <span className="text-blue-500 font-medium text-nowrap text-sm">
            {dateFormatted(date)}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-auto flex-col space-y-2 p-2 border-none shadow-xl"
        align="end"
      >
        <div className="flex w-full justify-between px-8 py-2">
          <PresetButton
            onClick={() => {
              setDate(new Date());
              setDeadline(new Date());
            }}
            text="Today"
          >
            <SunIcon />
          </PresetButton>
          <PresetButton
            onClick={() => {
              setDate(addDays(new Date(), 1));
              setDeadline(addDays(new Date(), 1));
            }}
            text="Tomorrow"
          >
            <SunriseIcon />
          </PresetButton>
          <PresetButton
            onClick={() => {
              setDate(addDays(new Date(), 7));
              setDeadline(addDays(new Date(), 7));
            }}
            text="Next week"
          >
            <CalendarArrowUpIcon />
          </PresetButton>
        </div>
        <div className="rounded-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setDeadline(selectedDate);
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setDate(undefined);
          }}
          className="flex-1 dark:bg-neutral-800 bg-neutral-50 rounded-md text-md px-3 py-1 dark:text-white text-neutral-800 font-medium"
        >
          Clear
        </button>
      </PopoverContent>
    </Popover>
  );
}
