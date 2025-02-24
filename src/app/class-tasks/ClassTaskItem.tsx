import FocusStageSwitchButton from "@/components/FocusStageSwitchButton";
import { handleTaskComplete } from "@/lib/taskUtils";
import useDialogStore from "@/app/dialogs/dialogStore";
import useTasksStore from "@/stores/tasksStore";
import { ClassTask } from "@/types/classTask";
import { cn } from "@/utils.ts/cn";
import { ListTodoIcon, Repeat2Icon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { differenceInCalendarDays, format, getYear } from "date-fns";
import { FlagIcon } from "@/components/icons/FlagIcon";
import MarkTaskCompleteCheckbox from "@/components/MarkTaskCompleteCheckbox";
import { getCourseById } from "../courses/utils/courseUtils";
import useCoursesStore from "@/stores/coursesStore";

function ClassTaskItem({ task }: { task: ClassTask }) {
  const courses = useCoursesStore((state) => state.courses);
  const open = useDialogStore((state) => state.openDialog);
  const openClassTaskDetailsDialog = () => open("classTaskDetails", { task: task });

  const actualTaskDuration = task.actualDurationInMins ?? 0;
  const progressPercentage = (actualTaskDuration / (task.estimatedDurationInMins ?? 0)) * 100;

  const course = courses.find((course) => course.id === task.courseId);

  return (
    <div
      className={`grid grid-cols-12 w-full rounded-3xl ${
        task.completed ? "dark:bg-neutral-900/50" : "dark:bg-neutral-900/60"
      } dark:hover:bg-neutral-900 bg-neutral-50/60`}
    >
      <div
        className="col-span-10 flex justify-between hover:cursor-pointer py-5 px-6"
        onClick={() => {
          openClassTaskDetailsDialog();
        }}
      >
        <div className="flex flex-col">
          {course && (
            <div className="dark:text-neutral-300 text-neutral-600 text-xs">
              {course.abbreviation && course.abbreviation} {course.name}
            </div>
          )}
          <div className="flex gap-3 items-center">
            <span
              className={`font-semibold text-md ${
                task.completed
                  ? "line-through dark:text-neutral-400 text-neutral-900 decoration-neutral-400/90"
                  : "dark:text-neutral-200"
              }`}
            >
              {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
            </span>
            {(task.subtasks?.length ?? 0) > 0 && (
              <div className="flex items-center dark:text-neutral-400 text-neutral-700 gap-1">
                <ListTodoIcon className="size-4" />
                <span className="text-xs">
                  {task.subtasks?.reduce((acc, subtask) => acc + (subtask.completed ? 1 : 0), 0)}/
                  {task.subtasks?.length}
                </span>
              </div>
            )}
            {task.recurrence?.frequency !== "once" && (
              <Repeat2Icon className="text-neutral-400 size-4" />
            )}
            {task.deadline && (
              <div className="flex gap-4 items-center text-xs">
                <Deadline deadline={task.deadline} />
              </div>
            )}
          </div>
          {/* <div className="flex gap-4 items-center text-xs">
              {task.deadline && <Deadline deadline={task.deadline} />}
            </div> */}
        </div>
        {(task.estimatedDurationInMins ?? 0) > 0 && (
          <div className="text-xs w-20 flex place-items-center dark:text-neutral-500 text-neutral-400">
            {task.completed && actualTaskDuration > 0 && getProgressLabel(task)}
            {!task.completed && getProgressLabel(task)}
          </div>
        )}
      </div>

      <Status task={task} className="col-span-2" />
    </div>
  );
}

function getProgressLabel(task: ClassTask) {
  const round = (num: number, precision: number) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  const actualDurationMins = task.actualDurationInMins ?? 0;
  const estimatedDurationMins = task.estimatedDurationInMins ?? 0;
  const isHours = (mins: number) => mins >= 60;

  const actualUnit = isHours(actualDurationMins) ? "h" : "m";
  const estimatedUnit = isHours(estimatedDurationMins) ? "h" : "m";

  const actualPrecision = actualDurationMins < 1 ? 2 : 1;
  const estimatedPrecision = estimatedDurationMins < 1 ? 2 : 1;

  const formattedActual = isHours(actualDurationMins)
    ? round(actualDurationMins / 60, actualPrecision)
    : round(actualDurationMins, actualPrecision);
  const formattedEstimated = isHours(estimatedDurationMins)
    ? round(estimatedDurationMins / 60, estimatedPrecision)
    : round(estimatedDurationMins, estimatedPrecision);

  if (task.completed) {
    return `${formattedActual}${actualUnit}`;
  }

  return `${formattedActual}${actualUnit} / ${formattedEstimated}${estimatedUnit}`;
}

function Status({ task, className }: { task: ClassTask; className?: string }) {
  const updateTask = useTasksStore((state) => state.updateTask);

  const renderContent = () => {
    if (task.completed || (task.estimatedDurationInMins ?? 0) <= 0) {
      return <MarkTaskCompleteCheckbox task={task} updateTask={updateTask} />;
    }

    return (
      <FocusStageSwitchButton
        task={task}
        className="text-orange-400 font-bold relative inline-block 
  before:absolute before:inset-0 before:bg-orange-500/15 
  before:rounded-full before:blur-3xl"
      >
        {task.actualDurationInMins ?? 0 > 0 ? "Continue" : "Focus"}
      </FocusStageSwitchButton>
    );
  };

  return (
    <div className={cn("flex items-center justify-center h-full", className)}>
      {renderContent()}
    </div>
  );
}

function Deadline({ deadline }: { deadline: Date }) {
  const now = new Date();
  const diffInDays = differenceInCalendarDays(deadline, now);

  const getFlagColor = () => {
    if (diffInDays < 0) return "dark:text-red-400 text-red-500"; // Overdue
    if (diffInDays === 0) return "dark:text-red-400 text-red-500"; // Today
    if (diffInDays === 1) return "dark:text-red-400 text-red-500"; // Tomorrow
    if (diffInDays < 3) return "dark:text-orange-400 text-orange-500"; // Urgent (next 3 days)
    if (diffInDays < 7) return "dark:text-yellow-400 text-yellow-500"; // This week
    return "text-neutral-400";
  };

  if (diffInDays < 7) {
    return (
      <div className={`flex items-center gap-1 ${getFlagColor()}`}>
        <FlagIcon className="size-3" />
        {diffInDays < 0
          ? "Overdue"
          : diffInDays === 0
          ? "Today"
          : diffInDays === 1
          ? "Tomorrow"
          : `${diffInDays}d`}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-neutral-400">
      <FlagIcon className="size-3" />
      {getYear(deadline) === getYear(now)
        ? format(deadline, "MMM dd")
        : format(deadline, "MMM dd, yyyy")}
    </div>
  );
}

export default ClassTaskItem;
