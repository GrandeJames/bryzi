import { Task } from "@/types/task";

function MiscSection({ miscTasks }: { miscTasks: any[] }) {
    return (
      <section className="col-span-4">
        <header className="font-semibold text-xl mb-2 text-neutral-100">Miscellaneous</header>
        <ul className="grid grid-cols-1 space-y-2 divide-neutral-800 divide-y">
          {miscTasks.map((task, index) => (
            <MiscTask key={index} task={task} />
          ))}
        </ul>
      </section>
    );
  }
  
  function MiscTask({ task }: { task: Task }) {
    return (
      <div className="grid grid-cols-4 py-1">
        <div className="flex flex-col col-span-3">
          <div className="font-semibold">{task.title}</div>
        </div>
        <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
      </div>
    );
  }

  export default MiscSection;