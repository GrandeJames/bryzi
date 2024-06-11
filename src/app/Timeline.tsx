import { cn } from "@/lib/utils";

// TODO: create unit tests

// currently only works for end time > start time
function calculateMinsBetweenTimes(startTime: string, endTime: string) {
  let startTimeHour = Number(startTime.split(":")[0]);
  let startTimeMinute = Number(startTime.split(":")[1]);

  let endTimeHour = Number(endTime.split(":")[0]);
  let endTimeMinute = Number(endTime.split(":")[1]);

  let totalFocusTimeHours = endTimeHour - startTimeHour;
  let totalFocusTimeMinutes = endTimeMinute - startTimeMinute;

  return totalFocusTimeHours * 60 + totalFocusTimeMinutes;
}

// Time values are in 24 hour format
// EDGE CASE: Task starts before the start time
// EDGE CASE: Task ends after the end time

// TODO: fix duplication
function Timeline({ className }: { className?: string }) {
  // TODO: Time values provided by user
  const START_TIME = "6:00";
  const END_TIME = "20:30";

  const TOTAL_FOCUS_TIME_IN_MINUTES = calculateMinsBetweenTimes(
    START_TIME,
    END_TIME
  );

  // TODO: show scheduled tasks as well (but in a different color)

  // TODO: obtain user's focus sessions
  const FOCUS_SESSIONS = [
    { start: "9:00", end: "10:30" },
    { start: "10:45", end: "12:00" },
    { start: "13:00", end: "14:30" },
    { start: "17:10", end: "18:00" },
  ];

  const SCHEDULED_TASKS = [
    { start: "7:00", end: "8:00" },
    { start: "12:15", end: "13:00" },
  ];

  // TODO: might want to use a better key
  return (
    <div
      className={cn(
        "border border-white rounded-md h-10 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 relative overflow-hidden",
        className
      )}
    >
      {FOCUS_SESSIONS.map((session, index) => {
        let taskDurationInMinutes = calculateMinsBetweenTimes(
          session.start,
          session.end
        );
        let minutesFromStartTime = calculateMinsBetweenTimes(
          START_TIME,
          session.start
        );

        let taskWidth = Math.round(
          (taskDurationInMinutes / TOTAL_FOCUS_TIME_IN_MINUTES) * 100
        );
        let taskOffset = Math.round(
          (minutesFromStartTime / TOTAL_FOCUS_TIME_IN_MINUTES) * 100
        );
        return (
          <div
            key={index}
            className={
              "absolute h-full rounded-md bg-orange-400 blur-2xl"
            }
            style={{ width: `${taskWidth}%`, left: `${taskOffset}%` }}
          />
        );
      })}
      {SCHEDULED_TASKS.map((task, index) => {
        let taskDurationInMinutes = calculateMinsBetweenTimes(
          task.start,
          task.end
        );
        let minutesFromStartTime = calculateMinsBetweenTimes(
          START_TIME,
          task.start
        );

        let taskWidth = Math.round(
          (taskDurationInMinutes / TOTAL_FOCUS_TIME_IN_MINUTES) * 100
        );
        let taskOffset = Math.round(
          (minutesFromStartTime / TOTAL_FOCUS_TIME_IN_MINUTES) * 100
        );
        return (
          <div
            key={index}
            className={
              "absolute h-full rounded-md border-blue-400 border-2 bg-blue-500 blur-2xl"
            }
            style={{ width: `${taskWidth}%`, left: `${taskOffset}%` }}
          />
        );
      })}
    </div>
  );
}

export { Timeline };
