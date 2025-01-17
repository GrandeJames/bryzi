"use client";

import { Progress } from "@/components/ui/progress";
import { useFocusStore } from "@/stores/focusStore";
import useDialogStore from "@/stores/dialogStore";
import { Task } from "@/types/task";
import { ListTodoIcon, Repeat2Icon } from "lucide-react";

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
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
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
    <div className="flex bg-neutral-900/70 rounded-3xl py-5 px-8">
      <div
        className="flex justify-between w-full hover:cursor-pointer gap-5"
        onClick={() => {
          dialogData.task = task;
          openTaskDetailsDialog();
        }}
      >
        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="text-neutral-300">ICS-496</span>
            <span className="font-semibold text-md">{task.title}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-red-500">2d</div>
            {(task.subtasks?.length ?? 0) > 0 && (
              <ListTodoIcon className="size-4 text-neutral-500" />
            )}
            {task.recurrence?.frequency !== "once" && (
              <Repeat2Icon className="text-neutral-500 size-4" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 items-center">
          {task.completed ? (
            <Progress value={100} label="46 mins" className="w-28 text-xs" />
          ) : (
            <Progress
              value={54}
              label={`${task.actualDurationInMins ?? 0}/${task.estimatedDurationInMins} mins`}
              className="w-28 text-xs"
            />
          )}
          <Status task={task} />
        </div>
      </div>
    </div>
  );
}

function Status({ task }: { task: Task }) {
  const { start } = useFocusStore();

  if (task.completed) {
    return <div className="text-orange-400 font-semibold text-center">Complete</div>;
  }

  if (!task.actualDurationInMins) {
    return (
      <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
        Start
      </button>
    );
  }

  return (
    <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
      Continue
    </button>
  );
}

export default AssignmentsSection;
