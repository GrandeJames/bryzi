import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";

interface TaskTitleDateFormSectionProps {
  task: any;
  handleChange: any;
}

export default function TaskTitleDateFormSection({
  task,
  handleChange,
}: TaskTitleDateFormSectionProps) {
  return (
    <div className="flex dark:bg-neutral-800 bg-neutral-50 rounded-md p-1 gap-1 items-center">
      <input
        type="text"
        placeholder="Add Task"
        onChange={(e) => handleChange("title", e.target.value)}
        value={task.title}
        className={`px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600 dark:bg-neutral-800 bg-neutral-50 dark:text-neutral-200 text-neutral-800`}
      />
      <DatePickerWithPresets
        deadline={task.deadline}
        setDeadline={(date) => handleChange("deadline", date?.toISOString())}
      />
    </div>
  );
}
