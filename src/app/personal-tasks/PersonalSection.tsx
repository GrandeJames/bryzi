import useDialogStore from "@/app/dialogs/dialogStore";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import { PersonalTask } from "@/types/personalTask";
import { cn } from "@/utils/cn";
import { CheckCircleIcon } from "lucide-react";
import PersonalTaskItem from "./PersonalTaskItem";
import TaskSection from "@/components/TaskSection";

function PersonalSection({ tasks, className }: { tasks: PersonalTask[]; className?: string }) {
  return (
    <TaskSection title="Personal" className={className}>
      {tasks.length === 0 && (
        <EmptyPlaceholder
          icon={<CheckCircleIcon />}
          title="No Personal Tasks"
          className="my-[6rem]"
        />
      )}
      <ul className="flex flex-col gap-2">
        {tasks.map((personalTask, index) => (
          <PersonalTaskItem key={index} personalTask={personalTask} />
        ))}
      </ul>
    </TaskSection>
  );
}

export default PersonalSection;
