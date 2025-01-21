"use client";

import { Progress } from "@/components/ui/progress";
import useDialogStore from "@/stores/dialogStore";
import { Task } from "@/types/task";
import { ListTodoIcon, Repeat2Icon } from "lucide-react";
import { cn } from "@/utils.ts/cn";
import clsx from "clsx";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/constants/taskConstants";
import { differenceInCalendarDays, format, getYear } from "date-fns";
import useTasksStore from "@/stores/tasksStore";
import { getActualDurationInMinutes, handleTaskComplete } from "@/lib/taskUtils";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import FocusStageSwitchButton from "@/components/FocusStageSwitchButton";
import { useEffect } from "react";

function AssignmentsSection({ tasks }: { tasks: any[] }) {
  return (
    <section className="col-span-8">
      <header className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-orange-200">Class Work ✏</div>
        <div className="flex mb-2 gap-4 px-2">
          <div className="bg-orange-500 text-xs px-3 py-1 rounded-full text-neutral-100 font-medium">
            Recommended
          </div>
          <div className="bg-neutral-800 text-xs px-3 py-1 rounded-full text-neutral-100">
            Today
          </div>
          <div className="bg-neutral-800 text-xs px-3 py-1 rounded-full text-neutral-100">
            Tomorrow
          </div>
          <div className="bg-neutral-800 text-xs px-3 py-1 rounded-full text-neutral-100">
            This week
          </div>
        </div>
      </header>
      <div className="px-2">
        <AssignmentsList tasks={tasks} />
      </div>
    </section>
  );
}

function AssignmentsList({ tasks }: { tasks: Task[] }) {
  /* TODO: sort by task properties including: deadline, impact, estimated duration, difficulty
   * TODO: the tasks shown should be completable within the day though all tasks due today should be shown even if they are likely not completable
   *
   * Actual: closer deadline ^, higher impact ^, more difficult ^, longer estimated duration ^.
   */

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  incompleteTasks.sort((task1, task2) => {
    if (task1.impact === task2.impact) {
      return (task1.difficulty ?? 0) - (task2.difficulty ?? 0);
    }
    return (task1.impact ?? 0) - (task2.impact ?? 0);
  });

  incompleteTasks.reverse();

  return (
    <div>
      <ul className="space-y-2">
        {incompleteTasks.map((task, index) => (
          <li key={index}>
            <div className="py-0">
              <Assignment task={task} />
            </div>
          </li>
        ))}
      </ul>
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

  const actualTaskDuration = getActualDurationInMinutes(task);
  const progressPercentage = (actualTaskDuration / (task.estimatedDurationInMins ?? 0)) * 100;

  return (
    <div
      className={`grid grid-cols-12 w-full rounded-3xl ${
        task.completed ? "bg-neutral-900/50" : "bg-neutral-900/70"
      }`}
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
          <div className="flex gap-2 items-center">
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
          </div>
          <div className="flex gap-4 items-center text-xs">
            {task.deadline && <Deadline deadline={task.deadline} />}
            <div className="text-neutral-500 flex items-center gap-1">
              {task.impact && (
                <span>
                  Impact:{" "}
                  <span
                    className={clsx("border rounded-lg px-1", {
                      "text-red-300/80 border-red-400/10": task.impact === 4,
                      "text-orange-300/80 border-orange-400/10": task.impact === 3,
                      "text-yellow-300/80 border-yellow-400/10": task.impact === 2,
                      "text-green-300/80 border-green-400/10": task.impact === 1,
                    })}
                  >
                    {TASK_IMPACT[task.impact as keyof typeof TASK_IMPACT]}
                  </span>
                </span>
              )}
            </div>
            <div className="text-neutral-500 flex items-center gap-1">
              {task.difficulty && (
                <span>
                  Effort:{" "}
                  <span
                    className={clsx("border rounded-lg px-1", {
                      "text-red-300/80 border-red-500/10": task.difficulty === 4,
                      "text-orange-300/80 border-orange-500/10": task.difficulty === 3,
                      "text-yellow-300/80 border-yellow-500/10": task.difficulty === 2,
                      "text-green-300/80 border-green-500/10": task.difficulty === 1,
                    })}
                  >
                    {TASK_DIFFICULTY[task.difficulty as keyof typeof TASK_DIFFICULTY]}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        {(task.estimatedDurationInMins ?? 0) > 0 && (
          <div className="text-xs w-20 flex place-items-center">
            {task.completed && actualTaskDuration > 0 && (
              <Progress
                value={100}
                label={`${actualTaskDuration}/${task.estimatedDurationInMins} mins`}
              />
            )}
            {!task.completed && (
              <Progress
                value={progressPercentage}
                label={`${actualTaskDuration}/${task.estimatedDurationInMins} mins`}
              />
            )}
          </div>
        )}
      </div>

      <Status task={task} className="col-span-2" />
    </div>
  );
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

    const actualTaskDuration = getActualDurationInMinutes(task);

    return (
      <FocusStageSwitchButton task={task} className="text-orange-500 font-bold">
        {actualTaskDuration > 0 ? "Continue" : "Start"}
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

  if (diffInDays < 0) {
    return <div className="text-red-500">Overdue</div>;
  }

  if (diffInDays === 0) {
    return <div className="text-red-500">Today</div>;
  }

  if (diffInDays === 1) {
    return <div className="text-red-500">Tomorrow</div>;
  }

  if (diffInDays < 7) {
    return (
      <div className={`${diffInDays < 3 ? "text-red-500" : "text-orange-500"}`}>
        {Math.floor(diffInDays)}d
      </div>
    );
  }

  if (getYear(deadline) === getYear(now)) {
    return <div className="text-neutral-400">{format(deadline, "MMM dd")}</div>;
  }
  return <div className="text-neutral-400">{format(deadline, "MMM dd, yyyy")}</div>;
}
