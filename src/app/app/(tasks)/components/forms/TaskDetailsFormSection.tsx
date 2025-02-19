import { Textarea } from "@/components/ui/textarea";

interface TaskDetailsFormSectionProps {
  task: any;
  handleChange: any;
}

export default function TaskDetailsFormSection({
  task,
  handleChange,
}: TaskDetailsFormSectionProps) {
  return (
    <Textarea
      className="resize-none border-none focus-visible:ring-0 dark:bg-neutral-800 bg-neutral-50 text-neutral-200"
      placeholder="Description"
      value={task.description}
      onChange={(e) => handleChange("description", e.target.value)}
    />
  );
}
