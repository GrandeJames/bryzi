import { cn } from "@/lib/utils";

function Timeline({ className }: { className?: string }) {
  // 24 hour format

  // Timeline configuration
  const START_TIME = "5:30";
  const END_TIME = "22:30";
  const TOTAL_FOCUS_TIME_IN_MINUTES = 10 * 60; // 600 minutes

  // Tasks
  let taskDurationInMinutes = 90;
  let taskWidth = Math.round((taskDurationInMinutes / TOTAL_FOCUS_TIME_IN_MINUTES) * 100);

  let minutesFromStartTime = 20;
  let taskOffset = Math.round((minutesFromStartTime / TOTAL_FOCUS_TIME_IN_MINUTES) * 100);

  // EDGE CASE: Task starts before the start time
  // EDGE CASE: Task ends after the end time

  const TASKS = [
    { title: "ICS 311: Data Structure & Algorithms", start: "9:00", end: "10:15" },
    { title: "ICS 332: Computer Organization & Architecture", start: "10:30", end: "11:45" },
  ];

  return (
    <div
      className={cn(
        "border border-neutral-700 rounded-md h-10 bg-neutral-800 relative overflow-hidden",
        className
      )}
    >
      <div
        className={"absolute left-[0px] h-full rounded-md border-orange-300 border-2 bg-orange-400"}
        style={{ width: `${taskWidth}%`, left: `${taskOffset}%` }}
      />
    </div>
  );
}

export { Timeline };
