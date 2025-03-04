import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { formatCustomDate } from "@/utils/dateUtils";
import { formatTime } from "@/utils/timeUtils";

export default function GeneratedTaskItem({ task }: { task: GeneratedTask }) {
  return (
    <div className="group bg-neutral-900/60 rounded-3xl p-5 transition-all hover:border-neutral-700 hover:bg-neutral-900/90 cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <h3 className="font-medium text-neutral-100 leading-snug">{task.title}</h3>

          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <span>
                {isNaN(new Date(task.deadline.dueDate).getTime()) ? (
                  <>No deadline</>
                ) : (
                  <>
                    {formatCustomDate(task.deadline.dueDate)}, {formatTime(task.deadline.dueTime)}
                  </>
                )}
              </span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1.5">
              <ClockIcon />
              <span>{task.estimatedDurationInMins} mins</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1.5">
              <GaugeIcon />
              <span className={"capitalize"}>
                {(task.difficulty === 4 && "Max") ||
                  (task.difficulty === 3 && "High") ||
                  (task.difficulty === 2 && "Moderate") ||
                  (task.difficulty === 1 && "Minimal")}
              </span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1.5">
              <TrendingUpIcon />
              <span className={"capitalize"}>
                {(task.impact === 4 && "Critical") ||
                  (task.impact === 3 && "High") ||
                  (task.impact === 2 && "Moderate") ||
                  (task.impact === 1 && "Minor")}
              </span>
            </div>
          </div>
        </div>

        <Checkbox
          defaultChecked
          className="h-6 w-6 rounded-lg border-2 border-neutral-700 data-[state=checked]:border-orange-400 data-[state=checked]:bg-orange-400/10 mt-1.5"
        />
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M11.42 15.17L17.25 9.34M14.757 9.172h.001M6 12a6 6 0 1112 0 6 6 0 01-12 0z" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.307L21.75 18" />
    </svg>
  );
}
