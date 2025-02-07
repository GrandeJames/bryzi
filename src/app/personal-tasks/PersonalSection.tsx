import useDialogStore from "@/app/dialogs/dialogStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { PersonalTask } from "@/types/personalTask";
import { cn } from "@/utils.ts/cn";
import { CheckCircleIcon } from "lucide-react";
import PersonalTaskItem from "./PersonalTaskItem";

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
          icon={<CheckCircleIcon />}
          title="No Personal Tasks"
          description="Add some tasks to your personal list."
          className="my-[6rem]"
        />
      )}
      <ul className="flex flex-col gap-2">
        {tasks.map((personalTask, index) => (
          <PersonalTaskItem key={index} personalTask={personalTask} />
        ))}
      </ul>
    </section>
  );
}

export default PersonalSection;
