import { Task } from "@/types/task";
import { CircleCheckIcon, PlusIcon } from "lucide-react";

function MiscSection({ miscTasks, className }: { miscTasks: any[], className?: string }) {
  return (
    <section className={className}>
      <header className="flex justify-between gap-2">
        <div className="font-semibold text-xl text-neutral-300 mb-2 flex items-center gap-2">
          Personal
        </div>
        {/* <button className="text-neutral-400 p-2">
          <PlusIcon className="size-5" />
        </button> */}
      </header>
      <ul className="grid grid-cols-1 space-y-1">
        {miscTasks.map((task, index) => (
          <MiscTask key={index} task={task} />
        ))}
      </ul>
    </section>
  );
}

function MiscTask({ task }: { task: Task }) {
  return (
    <div className="grid grid-cols-4 py-3 px-5 bg bg-neutral-900/60 rounded-xl max-w-3xl">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold text-neutral-200">{task.title}</div>
      </div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

export default MiscSection;
