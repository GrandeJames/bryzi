import { useEffect, useState } from "react";
import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { formatCustomDate } from "@/utils/dateUtils";
import { formatTime } from "@/utils/timeUtils";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGeneratedTasksStore from "./stores/generatedTasksStore";

interface GeneratedTaskItemProps {
  task: GeneratedTask;
  onTaskChange?: (updatedTask: GeneratedTask) => void;
  taskIndex: number;
}

export default function GeneratedTaskItem({
  task,
  onTaskChange,
  taskIndex,
}: GeneratedTaskItemProps) {
  const add = useGeneratedTasksStore((state) => state.addSelectedGeneratedTaskIndex);
  const remove = useGeneratedTasksStore((state) => state.removeSelectedGeneratedTaskIndex);
  const selectedGeneratedTasksIndexes = useGeneratedTasksStore(
    (state) => state.selectedGeneratedTasksIndexes
  );
  const [editedTask, setEditedTask] = useState<GeneratedTask>({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleFieldChange = (field: string, value: string | number) => {
    setEditedTask((prev) => {
      const newTask = { ...prev, [field]: value };
      onTaskChange?.(newTask); // TODO: implement this
      return newTask;
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      add(taskIndex);
    } else {
      remove(taskIndex);
    }
  };

  return (
    <div className="group dark:bg-neutral-900/60 bg-neutral-50/60 rounded-3xl p-5 transition-all hover:border-neutral-700 dark:hover:bg-neutral-900/90 hover:bg-neutral-100 cursor-pointer">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3 flex-1">
          <input
            value={editedTask.title}
            placeholder="Add title..."
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="font-medium leading-snug dark:text-neutral-300 text-neutral-700 bg-transparent focus:outline-none w-full placeholder:text-neutral-400"
          />

          {/* <input
            value={editedTask.type}
            onChange={(e) => handleFieldChange("type", e.target.value)}
            className="bg-transparent focus:outline-none w-full"
          /> */}

          <textarea
            value={editedTask.details || ""}
            onChange={(e) => handleFieldChange("details", e.target.value)}
            className="text-neutral-600 text-sm bg-transparent focus:outline-none w-full resize-none"
            placeholder="Add details..."
          />

          <div className="flex flex-wrap items-center gap-3 text-sm dark:text-neutral-400 text-neutral-500">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              <span>
                {editedTask.deadline?.date &&
                isNaN(new Date(editedTask.deadline.date).getTime()) ? (
                  <>No deadline</>
                ) : (
                  <>
                    {editedTask.deadline && formatCustomDate(editedTask.deadline?.date) && (
                      <div className="flex gap-2">
                        <span>{formatCustomDate(editedTask.deadline?.date)}</span>
                        <span>
                          {editedTask.deadline?.time && formatTime(editedTask.deadline?.time)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </span>
            </div>
            <Separator orientation="vertical" className="h-4 dark:bg-neutral-800" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="size-4" />
                  <span>Duration: {editedTask.duration || 0} mins</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-100">
                <div className="flex flex-col gap-2 p-2">
                  {[20, 60, 90, 180, 480, 600, 1200].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => handleFieldChange("duration", duration)}
                      className="text-left"
                    >
                      {duration} mins
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 p-2">
                  <input
                    type="number"
                    value={editedTask.duration}
                    onChange={(e) => handleFieldChange("duration", parseInt(e.target.value))}
                    className="bg-transparent focus:outline-none w-12"
                  />
                  <span>mins</span>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Checkbox
          className="h-6 w-6 rounded-lg mt-1.5"
          onCheckedChange={() => {
            console.log("Checkbox clicked");
            handleCheckboxChange(!selectedGeneratedTasksIndexes.has(taskIndex));
          }}
          checked={selectedGeneratedTasksIndexes.has(taskIndex) ? true : false}
          aria-label="Select task"
        />
      </div>
    </div>
  );
}
