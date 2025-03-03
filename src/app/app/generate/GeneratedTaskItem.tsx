import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import { Checkbox } from "@/components/ui/checkbox";

export default function GeneratedTaskItem({ task }: { task: GeneratedTask }) {
  const handleGeneratedTaskClick = (generatedTask: any) => {
    console.log("generatedTask clicked", generatedTask);
  };

  return (
    <div
      className="border border-neutral-800 bg-neutral-900/70 rounded-2xl p-4 col-span-1 grid grid-cols-12 relative"
      onClick={() => handleGeneratedTaskClick(task)}
    >
      <div className="col-span-11">
        <div className="font-semibold text-base">{task?.title}</div>
        <div className="flex gap-4">
          <div className="text-sm flex gap-1 items-center text-neutral-400">
            {/* <FlagIcon className="size-3" /> {generatedTask?.deadline?.dueDate}{" "} */}
            Due: {task?.deadline?.dueDate} {task?.deadline?.dueTime}
          </div>
          <div className="text-sm flex gap-1 items-center text-neutral-400">
            Duration: {task?.estimatedDurationInMins} m
          </div>
          <div className="text-sm flex gap-1 items-center text-neutral-400">
            {task?.difficulty} Effort
          </div>
          <div className="text-sm flex gap-1 items-center text-neutral-400">
            {task?.impact} Impact
          </div>
        </div>
      </div>
      <Checkbox
        defaultChecked={true}
        className="absolute right-3 top-3 rounded-lg size-5 dark:data-[state=checked]:bg-orange-500/80 dark:data-[state=checked]:text-white data-[state=checked]:border-none data-[state=unchecked]:bg-neutral-800 data-[state=unchecked]:text-neutral-400"
      />
    </div>
  );
}
