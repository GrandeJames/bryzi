import { Task } from "@/types/task";

function MiscSection({ miscTasks }: { miscTasks: any[] }) {
  return (
    <section className="col-span-4">
      <header className="font-semibold text-xl mb-2 text-gray-300">Personal</header>
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
    <div className="grid grid-cols-4 py-3 px-5 bg bg-neutral-900/70 rounded-xl max-w-3xl">
      <div className="flex flex-col col-span-3">
        <div className="font-semibold text-neutral-200">{task.title}</div>
      </div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

export default MiscSection;
