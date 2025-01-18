"use client";

import { Progress } from "@/components/ui/progress";
import { useFocusStore } from "@/stores/focusStore";
import useDialogStore from "@/stores/dialogStore";
import { Task } from "@/types/task";
import { ListTodoIcon, Repeat2Icon, ZapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/lib/taskConstants";
import { differenceInCalendarDays, format, getYear } from "date-fns";

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

  const newTasks = [];

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  incompleteTasks.sort((task1, task2) => {
    if (task1.impact === task2.impact) {
      return (task1.difficulty ?? 0) - (task2.difficulty ?? 0);
    }
    return (task1.impact ?? 0) - (task2.impact ?? 0);
  });

  incompleteTasks.reverse();

  newTasks.push(...incompleteTasks);
  newTasks.push(...completedTasks);

  return (
    <ul className="space-y-2">
      {newTasks.map((task, index) => (
        <li key={index}>
          <div className="py-0">
            <Assignment task={task} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Assignment({ task }: { task: Task }) {
  const { dialogData } = useDialogStore();
  const open = useDialogStore((state) => state.openDialog);
  const openTaskDetailsDialog = () => open("details", { task });

  // TODO: handle this better
  const progressPercentage =
    ((task.actualDurationInMins ?? 0) / (task.estimatedDurationInMins ?? 0)) * 100;

  return (
    <div
      className={`grid grid-cols-12 w-full rounded-3xl py-5 px-8 ${
        task.completed ? "bg-neutral-900/50" : "bg-neutral-900/70"
      }`}
    >
      <div
        className="col-span-10 flex justify-between hover:cursor-pointer"
        onClick={() => {
          dialogData.task = task;
          openTaskDetailsDialog();
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <span className="text-neutral-300">ICS-496</span>
            <span
              className={`font-semibold text-md ${
                task.completed && "line-through text-gray-400 decoration-gray-400/90"
              }`}
            >
              {task.title}
            </span>
            {(task.subtasks?.length ?? 0) > 0 && (
              <div className="flex items-center text-neutral-500 gap-1">
                <ListTodoIcon className="size-4" />
                <span className="text-xs">
                  {task.subtasks?.reduce((acc, subtask) => acc + (subtask.completed ? 1 : 0), 0)}/
                  {task.subtasks?.length} {task.subtasks?.length === 1 ? "subtask" : "subtasks"}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-4 items-center text-xs">
            {task.deadline && <Deadline deadline={task.deadline} />}

            {task.recurrence?.frequency !== "once" && (
              <Repeat2Icon className="text-neutral-500 size-4" />
            )}
            <div className="text-neutral-500 flex items-center gap-1">
              {task.impact && (
                <span>
                  Impact:{" "}
                  <span
                    className={clsx("border rounded-lg px-1", {
                      "text-red-500 border-red-500/30": task.impact === 4,
                      "text-orange-500 border-orange-500/30": task.impact === 3,
                      "text-yellow-500 border-yellow-500/30": task.impact === 2,
                      "text-green-500 border-green-500/30": task.impact === 1,
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
                  Difficulty:{" "}
                  <span
                    className={clsx("border rounded-lg px-1", {
                      "text-red-500 border-red-500/30": task.difficulty === 4,
                      "text-orange-500 border-orange-500/30": task.difficulty === 3,
                      "text-yellow-500 border-yellow-500/30": task.difficulty === 2,
                      "text-green-500 border-green-500/30": task.difficulty === 1,
                    })}
                  >
                    {TASK_DIFFICULTY[task.difficulty as keyof typeof TASK_DIFFICULTY]}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-xs w-20 flex place-items-center">
          {task.completed ? (
            <Progress value={100} label="46 mins" />
          ) : (
            <Progress
              value={54}
              label={`${task.actualDurationInMins ?? 0}/${task.estimatedDurationInMins} mins`}
            />
          )}
        </div>
      </div>

      <Status task={task} className="col-span-2" />
    </div>
  );
}

function Status({ task, className }: { task: Task; className?: string }) {
  const { start } = useFocusStore();

  const renderContent = () => {
    if (task.completed) {
      return <div className="text-orange-400 font-semibold">Complete</div>;
    }

    return (
      <button className="text-orange-500 font-bold" onClick={() => start(task.title)}>
        {task.actualDurationInMins ? "Continue" : "Start"}
      </button>
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
