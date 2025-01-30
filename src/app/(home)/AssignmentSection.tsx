"use client";

import { Progress } from "@/components/ui/progress";
import useDialogStore from "@/stores/dialogStore";
import { Task } from "@/types/task";
import { ListTodoIcon, NotebookPenIcon, PlusIcon, Repeat2Icon } from "lucide-react";
import { cn } from "@/utils.ts/cn";
import clsx from "clsx";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/constants/taskConstants";
import { addDays, differenceInCalendarDays, format, getYear } from "date-fns";
import useTasksStore from "@/stores/tasksStore";
import { handleTaskComplete } from "@/lib/taskUtils";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import FocusStageSwitchButton from "@/components/FocusStageSwitchButton";
import { DayProps, getRecommendedClassWorkList } from "@/lib/classWorkRecommendation";
import { useCallback } from "react";
import { FlagIcon } from "@/components/icons/FlagIcon";

function AssignmentsSection({ tasks, className }: { tasks: any[], className?: string }) {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateTaskDialog = useCallback(() => open("create"), [open]);

  return (
    <section className={className}>
      <header className="flex justify-between gap-2">
        <div className="font-semibold text-xl text-neutral-300 mb-2 flex items-center gap-2">
          Class Work
        </div>
        {/* <div className="flex mb-2 gap-4 px-2">
          <div className="bg-neutral-800 text-xs px-3 py-1 rounded-full text-neutral-100">
            Today
          </div>
          <div className="bg-neutral-800 text-xs px-3 py-1 rounded-full text-neutral-100">
            This week
          </div>
        </div> */}
        {/* <button className="text-neutral-400 flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-lg text-sm" onClick={openCreateTaskDialog}>
          <NotebookPenIcon className="size-4" /> Add
        </button> */}
      </header>
      <div className="px-2">
        <AssignmentsList tasks={tasks} />
      </div>
    </section>
  );
}

function getTasksForDay(scheduleDay: DayProps | undefined, allTasks: Task[]): Task[] {
  const dayTasks: Task[] = [];
  scheduleDay?.forEach((dayTask) => {
    const task = allTasks.find((task) => task.id === dayTask.taskId);
    if (task) {
      (task as any).duration = dayTask.duration;

      dayTasks.push(task);
    }
  });
  return dayTasks;
}

function AssignmentsList({ tasks }: { tasks: Task[] }) {
  /* TODO: sort by task properties including: deadline, impact, estimated duration, difficulty
   * TODO: the tasks shown should be completable within the day though all tasks due today should be shown even if they are likely not completable
   *
   * Actual: closer deadline ^, higher impact ^, more difficult ^, longer estimated duration ^.
   */

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  let schedule = getRecommendedClassWorkList(incompleteTasks, [], []);

  let today = schedule[0];
  let tomorrow = schedule[1];

  let todayTasks: Task[] = [];
  let tomorrowTasks: Task[] = [];

  getTasksForDay(schedule[0], incompleteTasks);

  const week = [];

  for (let i = 0; i < 7; i++) {
    week.push(getTasksForDay(schedule[i], incompleteTasks));
  }

  console.log("week", week);

  incompleteTasks.sort((task1, task2) => {
    if (task1.impact === task2.impact) {
      return (task1.difficulty ?? 0) - (task2.difficulty ?? 0);
    }
    return (task1.impact ?? 0) - (task2.impact ?? 0);
  });

  incompleteTasks.reverse();

  return (
    <div className="space-y-5">
      {week.map((dayTasks, index) => {
        return (
          <div key={index}>
            <header className="text-neutral-500 text-xs font-semibold mb-1">
              {index === 0 && "Today"}
              {index === 1 && "Tomorrow"}
              {index > 1 && format(addDays(new Date(), index - 1), "EEEE")}
            </header>
            <ul className="space-y-2">
              {dayTasks.length === 0 && (
                <div className="text-neutral-600 text-xs text-center">No tasks</div>
              )}
              {dayTasks.map((task, index) => (
                <li key={index}>
                  <div className="py-0">
                    <Assignment task={task} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {completedTasks.length > 0 && (
        <div>
          <header className="text-neutral-500 text-xs font-semibold mt-5 mb-1">COMPLETED</header>
          <ul className="space-y-2">
            {completedTasks.map((task, index) => (
              <li key={index}>
                <div className="py-0">
                  <Assignment task={task} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Assignment({ task }: { task: Task }) {
  const { dialogData } = useDialogStore();
  const open = useDialogStore((state) => state.openDialog);
  const openTaskDetailsDialog = () => open("details", { task });

  const actualTaskDuration = task.actualDurationInMins ?? 0;
  const progressPercentage = (actualTaskDuration / (task.estimatedDurationInMins ?? 0)) * 100;

  return (
    <div
      className={`grid grid-cols-12 w-full rounded-3xl ${
        task.completed ? "bg-neutral-900/50" : "bg-neutral-900/60"
      } hover:bg-neutral-900`}
    >
      <div
        className="col-span-10 flex justify-between hover:cursor-pointer py-5 px-6"
        onClick={() => {
          dialogData.task = task;
          openTaskDetailsDialog();
        }}
      >
        <div className="flex flex-col">
          <div className="text-neutral-300 text-xs">Introductory Psychology</div>
          <div className="flex gap-3 items-center">
            <span
              className={`font-semibold text-md ${
                task.completed
                  ? "line-through text-neutral-400 decoration-neutral-400/90"
                  : "text-neutral-200"
              }`}
            >
              {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
            </span>
            {(task.subtasks?.length ?? 0) > 0 && (
              <div className="flex items-center text-neutral-400 gap-1">
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
          <div className="text-xs w-20 flex place-items-center">
            {task.completed && actualTaskDuration > 0 && (
              <Progress value={100} label={getProgressLabel(task)} />
            )}
            {!task.completed && (
              <Progress value={progressPercentage} label={getProgressLabel(task)} />
            )}
          </div>
        )}
      </div>

      <Status task={task} className="col-span-2" />
    </div>
  );
}

function getProgressLabel(task: Task) {
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

function Status({ task, className }: { task: Task; className?: string }) {
  const updateTask = useTasksStore((state) => state.updateTask);

  const renderContent = () => {
    if (task.completed) {
      return (
        <div
          className="border rounded-md border-neutral-800 size-5 mx-auto relative hover:cursor-pointer"
          onClick={() => handleTaskComplete(task, updateTask)}
        >
          <span className="text-orange-500 text-3xl absolute bottom-0 left-1">✔</span>
        </div>
      );
    }

    if ((task.estimatedDurationInMins ?? 0) <= 0) {
      return (
        <div
          className="border rounded-md border-neutral-800 size-5 mx-auto hover:cursor-pointer"
          onClick={() => handleTaskComplete(task, updateTask)}
        />
      );
    }

    return (
      <FocusStageSwitchButton
        task={task}
        className="text-orange-500 font-bold relative inline-block 
before:absolute before:inset-0 before:bg-orange-500/15 
before:rounded-full before:blur-3xl"
      >
        {task.actualDurationInMins ?? 0 > 0 ? "Continue" : "Start"}
      </FocusStageSwitchButton>
    );
  };

  return (
    <div className={cn("flex items-center justify-center h-full", className)}>
      {renderContent()}
    </div>
  );
}
export default AssignmentsSection;

function Deadline({ deadline }: { deadline: Date }) {
  const now = new Date();
  const diffInDays = differenceInCalendarDays(deadline, now);

  const getFlagColor = () => {
    if (diffInDays < 0) return "text-red-400"; // Overdue
    if (diffInDays === 0) return "text-red-400"; // Today
    if (diffInDays === 1) return "text-red-400"; // Tomorrow
    if (diffInDays < 3) return "text-red-400"; // Urgent (next 3 days)
    if (diffInDays < 7) return "text-orange-400"; // This week
    return "text-neutral-400"; // Future
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
