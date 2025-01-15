"use client";
import { useTaskDialogStore } from "@/components/TaskDetailsDialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFocusStore } from "@/hooks/useFocusStore";
import { Task } from "@/types/task";

function AssignmentsSection({ tasks }: { tasks: any[] }) {
  return (
    <section className="col-span-8">
      <header className="flex gap-2">
        <div className="font-semibold text-xl mb-2 text-orange-300">Assignments</div>
      </header>
      <ScrollArea className="h-96 rounded-md">
        <ul className="grid grid-cols-1 space-y-2 divide-neutral-800 divide-y">
          {tasks.length === 0 && <div>No assignments</div>}
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
    <div className="grid grid-cols-7 py-1">
      <Assignment task={task} />
    </div>
  );
}

function Assignment({ task }: { task: Task }) {
  const { openDialog, setTask } = useTaskDialogStore();

  return (
    <>
      <div
        className="flex items-center col-span-4 hover:cursor-pointer"
        onClick={() => {
          setTask(task);
          openDialog();
        }}
      >
        <div className="flex flex-col col-span-3">
          <div className="font-semibold">{task.title}</div>
          <div className="text-sm text-neutral-300">task class</div>
        </div>
        <div className="text-red-500 text-center">deadline</div>
      </div>

      <Status task={task} />
    </>
  );
}

function Status({ task }: { task: Task }) {
  const { start } = useFocusStore();

  if (task.completed) {
    return <>complete</>;
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
