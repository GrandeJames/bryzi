import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/utils.ts/cn";
import { getHours, getMinutes } from "date-fns";
import { useEffect, useState } from "react";

export interface TimelineEvent {
  start: Date | string;
  end: Date | string;
  type: "focus" | "event" | "course";
}

export interface TimelineProps {
  className?: string;
  startTime?: string;
  endTime?: string;
  events?: TimelineEvent[];
  showCurrentTime?: boolean;
}

// https://coolors.co/palette/0a0908-22333b-f2f4f3-a9927d-5e503f
const EVENT_TYPES = {
  focus: { color: "bg-[#F4CFB1] dark:bg-[#6B3E26]", label: "Focus Session" }, //orange
  event: { color: "bg-[#C7E2ED] dark:bg-[#2A4B6A]", label: "Scheduled Task" }, //blue
  course: { color: "bg-[#F0C5C1] dark:bg-[#6B2E34]", label: "Lecture" }, //red
};

function parseTime(time: Date | string) {
  if (typeof time === "string") {
    const [hours, minutes] = time.split(":").map(Number);
    return { hours, minutes };
  }

  const hours = getHours(time);
  const minutes = getMinutes(time);
  return { hours, minutes };
}

function toMinutes(time: Date | string) {
  const { hours, minutes } = parseTime(time);
  return hours * 60 + minutes;
}

function formatHour(hours: number) {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours} ${period}`;
}

function calculatePosition(startReference: string, time: Date | string, totalMinutes: number) {
  const minutesFromStart = Math.max(toMinutes(time) - toMinutes(startReference), 0);
  return (minutesFromStart / totalMinutes) * 100;
}

function getDisplayTimeRange(start: Date | string, end: Date | string) {
  return `${getDisplayTime(start)} - ${getDisplayTime(end)}`;
}

function getDisplayTime(date: Date | string) {
  const parsedTime = parseTime(date);

  let displayStartTime = `${
    parsedTime.hours > 12 ? parsedTime.hours % 12 : parsedTime.hours
  }:${parsedTime.minutes.toString().padStart(2, "0")}
    ${parsedTime.hours >= 12 ? "PM" : "AM"}`;

  return `${displayStartTime}`;
}

const Timeline = ({
  className,
  startTime = "7:00",
  endTime = "23:00",
  events = [],
  showCurrentTime = true,
}: TimelineProps) => {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const roundedStart = `${start.hours}:${Math.floor(start.minutes / 30) * 30}`;
  const roundedEnd = `${end.hours}:${Math.ceil(end.minutes / 30) * 30}`;

  const totalMinutes = toMinutes(roundedEnd) - toMinutes(roundedStart);

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

  const timeMarkers = [];
  for (let hour = start.hours; hour <= end.hours; hour++) {
    timeMarkers.push(`${hour}:00`);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          "border rounded-lg h-10 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 relative overflow-hidden",
          className
        )}
      >
        {events.map((event, index) => {
          const eventStart = Math.max(toMinutes(event.start), toMinutes(roundedStart));
          const eventEnd = Math.min(toMinutes(event.end), toMinutes(roundedEnd));
          const duration = eventEnd - eventStart;

          if (duration <= 0) return null;

          const left = calculatePosition(roundedStart, event.start, totalMinutes);
          const width = (duration / totalMinutes) * 100;

          const eventType = EVENT_TYPES[event.type] || EVENT_TYPES.course;

          return (
            <div
              key={index}
              className="absolute h-full"
              style={{
                width: `${width}%`,
                left: `${left}%`,
              }}
            >
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild>
                  <div
                    className={`h-full rounded-md ${eventType.color} border border-[#00000010] dark:border-[#FFFFFF20] blur-lg hover:blur-none cursor-pointer`}
                  />
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  className="min-w-[200px] max-w-[90vw] break-words z-30 dark:bg-neutral-900/70 dark:backdrop-blur-lg"
                >
                  <div className="text-sm">
                    <span className="font-medium">{eventType.label}:</span>
                    <div className="text-muted-foreground">
                      {getDisplayTimeRange(event.start, event.end)}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        })}

        {showCurrentTime && (
          <div
            className="absolute w-[2px] h-full dark:bg-neutral-800/80 bg-neutral-300/80 z-20"
            style={{
              left: `${calculatePosition(roundedStart, currentTimeString, totalMinutes)}%`,
            }}
          >
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-red-500 font-medium whitespace-nowrap">
              {currentTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </div>
          </div>
        )}
      </div>

      <div className="relative h-6 mb-4">
        {timeMarkers.map((time) => {
          const position = calculatePosition(roundedStart, time, totalMinutes);
          return (
            <div
              key={time}
              className="absolute bottom-0 dark:text-neutral-600 text-neutral-400 text-[0.65rem] -translate-x-1/2 text-nowrap"
              style={{ left: `${position}%` }}
            >
              {formatHour(parseTime(time).hours)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Timeline };
