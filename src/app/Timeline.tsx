import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/utils.ts/cn";

interface TimelineEvent {
  start: string;
  end: string;
  type: "focus" | "task" | "custom";
}

interface TimelineProps {
  className?: string;
  startTime?: string;
  endTime?: string;
  events?: TimelineEvent[];
  showCurrentTime?: boolean;
}

const EVENT_TYPES = {
  focus: { color: "bg-orange-400/80", label: "Focus Session" },
  task: { color: "bg-blue-500/80", label: "Scheduled Task" },
  custom: { color: "bg-green-400/80", label: "Custom Event" },
};

function parseTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes };
}

function toMinutes(time: string) {
  const { hours, minutes } = parseTime(time);
  return hours * 60 + minutes;
}

function formatHour(hours: number) {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:00 ${period}`;
}

function calculatePosition(startReference: string, time: string, totalMinutes: number) {
  const minutesFromStart = Math.max(toMinutes(time) - toMinutes(startReference), 0);
  return (minutesFromStart / totalMinutes) * 100;
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
  const currentTime = new Date();
  const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

  const timeMarkers = [];
  for (let hour = start.hours; hour <= end.hours; hour++) {
    timeMarkers.push(`${hour}:00`);
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "border border-white rounded-md h-10 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 relative overflow-hidden",
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

          const eventType = EVENT_TYPES[event.type] || EVENT_TYPES.custom;

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
                    className={`h-full rounded-md ${eventType.color} blur-lg hover:blur-none cursor-pointer`}
                  />
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  className="min-w-[200px] max-w-[90vw] break-words z-30 dark:bg-neutral-900/70 dark:backdrop-blur-lg"
                >
                  <div className="text-sm">
                    <span className="font-medium">{eventType.label}:</span>
                    <div className="text-muted-foreground">
                      {event.start} - {event.end}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          );
        })}

        {showCurrentTime && (
          <div
            className="absolute w-[1px] h-full bg-orange-400/30 z-20"
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
              className="absolute bottom-0 text-neutral-600 text-[0.65rem] -translate-x-1/2 text-nowrap"
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
