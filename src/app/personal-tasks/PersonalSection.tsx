import useDialogStore from "@/app/dialogs/dialogStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { PersonalTask } from "@/types/personalTask";
import { cn } from "@/utils.ts/cn";

function PersonalSection({ tasks, className }: { tasks: PersonalTask[]; className?: string }) {
  return (
    <section className={cn(className, "flex-grow")}>
      <header className="flex justify-between gap-2">
        <h2 className="font-semibold text-xl text-neutral-300 mb-2 flex items-center gap-2">
          Personal
        </h2>
      </header>
      {tasks.length === 0 && (
        <EmptyPlaceholder
          title="No Personal Tasks"
          description="Add some tasks to your personal list."
          className="my-[6rem]"
        />
      )}
      <ul className="grid grid-cols-1 space-y-1">
        {tasks.map((personalTask, index) => (
          <PersonalTaskItem key={index} personalTask={personalTask} />
        ))}
      </ul>
    </section>
  );
}

function PersonalTaskItem({ personalTask }: { personalTask: PersonalTask }) {
  const open = useDialogStore((state) => state.openDialog);
  const openPersonalTaskDetailsDialog = () => open("personalTaskDetails", { task: personalTask });

  return (
    <div
      className="grid grid-cols-4 py-3 px-5 bg bg-neutral-900/60 rounded-xl max-w-3xl"
      onClick={() => {
        openPersonalTaskDetailsDialog();
      }}
    >
      <div className="flex flex-col col-span-3">
        <div className="font-semibold text-neutral-200">{personalTask.title}</div>
      </div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

export default PersonalSection;
