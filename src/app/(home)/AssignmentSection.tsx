"use client";

import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFocusStore } from "@/stores/focusStore";
import useDialogStore from "@/stores/dialogStore";
import { Task } from "@/types/task";
import { ListTodoIcon, Repeat2Icon } from "lucide-react";

function AssignmentsSection({ tasks }: { tasks: any[] }) {
  return (
    <section className="col-span-8">
      <header className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-orange-300">Tasks</div>
        <div className="flex mb-2 gap-4 px-4">
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
      <ScrollArea className="h-96 w-9/12 rounded-md px-5">
        <ul className="space-y-2 divide-neutral-800 divide-y">
          {tasks.map((task, index) => (
            <li key={index}>
              <AssignmentsList task={task} />
            </li>
          ))}
        </ul>
      </ScrollArea>
    </section>
  );
}

function AssignmentsList({ task }: { task: Task }) {
  return (
    <div className=" py-1">
      <Assignment task={task} />
    </div>
  );
}

function Assignment({ task }: { task: Task }) {
  const { dialogData } = useDialogStore();
  const openTaskDetailsDialog = () => useDialogStore.getState().open("details", { task });

  // TODO: handle this better
  const progressPercentage =
    ((task.actualDurationInMins ?? 0) / (task.estimatedDurationInMins ?? 0)) * 100;

  return (
    <div className="flex">
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
            <span className="font-semibold">{task.title}</span>
          </div>
          {(task.subtasks?.length ?? 0) > 0 && (
            <div className="text-neutral-400 text-center text-xs flex gap-3">
              <div className="flex gap-1">
                <span>0/{task.subtasks?.length}</span>
                <ListTodoIcon className="h-4 w-4" />
              </div>

              {task.recurrence?.frequency !== "once" && <Repeat2Icon className="h-4 w-4" />}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          {/* <div>{task.deadline?.toDateString()}</div> */}
          <div className="text-red-400 text-center">{task.impact || ""}</div>
          <Progress
            value={progressPercentage}
            label={`${task.actualDurationInMins ?? 0}/${task.estimatedDurationInMins} mins`}
            className="w-28 text-xs"
          />
          <div className="text-red-500">2d</div>
        </div>
      </div>
      <Status task={task} />
    </div>
  );
}

function Status({ task }: { task: Task }) {
  const { start } = useFocusStore();

  if (task.completed) {
    return <div>Completed</div>;
  }

  if (!task.actualDurationInMins) {
    return (
      <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
        Start
      </button>
    );
  }

  return (
    <div>
      <div className="flex flex-col col-span-2 px-5">
        <Progress value={80} label="2.7/3.0 hrs" className="text-xs" />
      </div>
      <button className="text-orange-500 font-bold text-center" onClick={() => start(task.title)}>
        Continue
      </button>
    </div>
  );
}

export default AssignmentsSection;
