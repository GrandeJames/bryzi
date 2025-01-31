"use client";
import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, ChevronDown, Clock } from "lucide-react";

const generateTimeOptions = () => {
  return Array.from({ length: 96 }, (_, i) => {
    const totalMinutes = i * 15;
    const date = new Date();
    date.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60);
    return format(date, "hh:mm a");
  });
};

const TimeInput = ({ value, onChange }: { value: string; onChange: (time: string) => void }) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const timeOptions = generateTimeOptions();

  const parseTime = (time: string) => {
    try {
      const date = parse(time, "hh:mm a", new Date());
      if (isValid(date)) return date;
      return parse(time, "HH:mm", new Date());
    } catch {
      return new Date(NaN);
    }
  };

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const rawValue = e.target.value.toUpperCase();
  //     // Auto-format while typing
  //     const formatted = rawValue
  //       .replace(/[^0-9APM]/g, "")
  //       .replace(/^(\d{2})(\d{0,2})/, (_, hh, mm) => (mm ? `${hh}:${mm}` : hh))
  //       .replace(/(\d{2}:\d{2})([AP]?)/, (_, time, period) => (period ? `${time} ${period}M` : time))
  //       .substring(0, 8);

  //     setInputValue(formatted);

  //     if (formatted.length >= 5) {
  //       const date = parseTime(formatted);
  //       if (isValid(date)) onChange(format(date, "hh:mm a"));
  //     }
  //   };

  const handleSelect = (time: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setInputValue(time);
    onChange(time);
    setOpen(false);
  };

  const adjustTime = (unit: "hours" | "minutes", delta: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTime = parseTime(inputValue);
    if (!isValid(currentTime)) return;

    if (unit === "hours") {
      currentTime.setHours(currentTime.getHours() + delta);
    } else {
      currentTime.setMinutes(currentTime.getMinutes() + delta * 15);
    }

    const newTime = format(currentTime, "hh:mm a");
    setInputValue(newTime);
    onChange(newTime);
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Input
            value={inputValue}
            // onChange={handleInputChange}
            placeholder="HH:MM"
            className="pl-10 pr-28"
            onFocus={() => setOpen(true)}
            onClick={(e) => e.stopPropagation()}
          />
        </PopoverTrigger>

        <PopoverContent
          className="w-[160px] p-0"
          align="start"
          //   onInteractOutside={(e) => e.preventDefault()}
        >
          <ScrollArea className="h-64">
            {timeOptions.map((time) => (
              <Button
                key={time}
                variant="ghost"
                className="w-full justify-start rounded-none h-9 text-sm"
                onClick={(e) => handleSelect(time, e)}
              >
                {time}
              </Button>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default TimeInput;
