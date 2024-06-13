import { cn } from "@/lib/utils";

// TODO: create unit tests

// currently only works for end time > start time
function minutesBetweenTimes(startTime: string, endTime: string) {
  let startTimeHour = Number(startTime.split(":")[0]);
  let startTimeMinute = Number(startTime.split(":")[1]);

  let endTimeHour = Number(endTime.split(":")[0]);
  let endTimeMinute = Number(endTime.split(":")[1]);

  let totalFocusTimeHours = endTimeHour - startTimeHour;
  let totalFocusTimeMinutes = endTimeMinute - startTimeMinute;

  return totalFocusTimeHours * 60 + totalFocusTimeMinutes;
}

const FOCUS_SESSIONS = [
  { start: "9:00", end: "10:30" },
  { start: "10:45", end: "12:00" },
  { start: "13:45", end: "13:55" },
];

const SCHEDULED_TASKS = [
  { start: "7:02", end: "8:00" },
  { start: "12:15", end: "13:00" },
];

// TODO: use actual user data

// EDGE CASE: Task starts before the start time
// EDGE CASE: Task ends after the end time

// TODO: update key

const START_TIME = "6:46";
const END_TIME = "20:42";

// TODO: fix duplication
function Timeline({ className }: { className?: string }) {
  const CURRENT_TIME = "15:46";
  const startTimeRoundedDown = Math.floor(Number(START_TIME.split(":")[1]) / 30) * 30;
  const ROUNDED_START_TIME = `${START_TIME.split(":")[0]}:${startTimeRoundedDown}`;

  const endTimeRoundedUp = Math.ceil(Number(END_TIME.split(":")[1]) / 30) * 30;
  const ROUNDED_END_TIME = `${END_TIME.split(":")[0]}:${endTimeRoundedUp}`;

  console.log(ROUNDED_START_TIME, ROUNDED_END_TIME, CURRENT_TIME);

  const TOTAL_FOCUS_MINUTES = minutesBetweenTimes(ROUNDED_START_TIME, ROUNDED_END_TIME);
  let startTimeOffset = `${Math.round(
    (minutesBetweenTimes(ROUNDED_START_TIME, START_TIME) / TOTAL_FOCUS_MINUTES) * 100
  )}%`;

  let endTimeOffset = `${Math.round(
    (minutesBetweenTimes(ROUNDED_START_TIME, END_TIME) / TOTAL_FOCUS_MINUTES) * 100
  )}%`;

  let currentTimeOffset = `${Math.round(
    (minutesBetweenTimes(ROUNDED_START_TIME, CURRENT_TIME) / TOTAL_FOCUS_MINUTES) * 100
  )}%`;

  return (
    <div className="relative">
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{ left: startTimeOffset }}
      >
        {START_TIME}AM
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{ left: endTimeOffset }}
      >
        {END_TIME}PM
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{ left: currentTimeOffset }}
      >
        now
      </div>

      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "7:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"7:00 AM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "8:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"8:00 AM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "9:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"9:00 AM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "10:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"10:00 AM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "11:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"11:00 AM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "12:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"12:00 PM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "13:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"1:00 PM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "14:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"2:00 PM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "15:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"3:00 PM"}
      </div>
      <div
        className="absolute bottom-[-20px] text-neutral-600 text-xs -translate-x-1/2"
        style={{
          left: `${Math.round(
            (minutesBetweenTimes(ROUNDED_START_TIME, "16:00") / TOTAL_FOCUS_MINUTES) * 100
          )}%`,
        }}
      >
        {"4:00 PM"}
      </div>

      <div
        className={cn(
          "border border-white rounded-md h-10 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 relative overflow-hidden",
          className
        )}
      >
        <div
          className="absolute text-neutral-600 text-xs border-l-2 border-l-neutral-800 h-full"
          style={{ left: startTimeOffset }}
        ></div>
        <div
          className="absolute text-neutral-600 text-xs border-l-2 border-l-neutral-800 h-full"
          style={{ left: endTimeOffset }}
        ></div>
        <div
          className="absolute text-neutral-600 text-xs border-l-2 border-l-neutral-800 h-full"
          style={{ left: currentTimeOffset }}
        ></div>

        {FOCUS_SESSIONS.map((session, index) => {
          let taskDurationInMinutes = minutesBetweenTimes(session.start, session.end);
          let taskWidth = Math.round((taskDurationInMinutes / TOTAL_FOCUS_MINUTES) * 100);

          let minutesFromStartTime = minutesBetweenTimes(ROUNDED_START_TIME, session.start);
          let taskOffset = Math.round((minutesFromStartTime / TOTAL_FOCUS_MINUTES) * 100);
          return (
            <div
              key={index}
              className={
                "absolute h-full rounded-md border-orange-300 border-2 bg-orange-400 blur-lg md:blur-[22px] hover:blur-0"
              }
              style={{ width: `${taskWidth}%`, left: `${taskOffset}%` }}
            />
          );
        })}
        {SCHEDULED_TASKS.map((task, index) => {
          let taskDurationInMinutes = minutesBetweenTimes(task.start, task.end);
          let minutesFromStartTime = minutesBetweenTimes(START_TIME, task.start);

          let taskWidth = Math.round((taskDurationInMinutes / TOTAL_FOCUS_MINUTES) * 100);
          let taskOffset = Math.round((minutesFromStartTime / TOTAL_FOCUS_MINUTES) * 100);
          return (
            <div
              key={index}
              className={
                "absolute h-full rounded-md border-blue-400 border-2 bg-blue-500 blur-lg md:blur-[22px] hover:blur-0"
              }
              style={{ width: `${taskWidth}%`, left: `${taskOffset}%` }}
            />
          );
        })}
      </div>
      <div className="flex gap-3 absolute right-0 bottom-[-35px] text-xs">
        <div className="text-blue-400">
          •<span className="text-neutral-600">Scheduled</span>
        </div>
        <div className="text-orange-400">
          •<span className="text-neutral-600">Scheduled</span>
        </div>
      </div>
    </div>
  );
}

export { Timeline };
