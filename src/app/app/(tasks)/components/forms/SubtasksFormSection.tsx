import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Subtask } from "@/types/subtask";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SubtasksFormSection({ task, setTask }: { task: any; setTask: any }) {
  const [currentSubtaskInput, setCurrentSubtaskInput] = useState<string>("");

  const handleChange = (key: string, value: any) => {
    setTask((prevTask: any) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const handleSubtaskAdd = () => {
    const trimmedSubtaskInput = currentSubtaskInput.trim();

    if (!trimmedSubtaskInput) {
      return;
    }

    const newSubtask = {
      id: uuidv4(),
      title: trimmedSubtaskInput,
      completed: false,
    };

    setTask((prevTask: { subtasks: any }) => ({
      ...prevTask,
      subtasks: [...(prevTask.subtasks || []), newSubtask],
    }));

    setCurrentSubtaskInput("");
  };

  const handleSubtaskRemove = (subtask: Subtask) => {
    setTask((prevTask: { subtasks: any }) => ({
      ...prevTask,
      subtasks: (prevTask.subtasks || []).filter(
        (prevSubtask: { id: string }) => prevSubtask.id !== subtask.id
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        <Input
          placeholder="Add subtask"
          className="border-none dark:bg-neutral-800 bg-neutral-50 focus-visible:ring-0 dark:text-neutral-200 text-neutral-800"
          value={currentSubtaskInput}
          onChange={(e) => setCurrentSubtaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubtaskAdd();
            }
          }}
        />
        <button
          type="button"
          className="dark:bg-neutral-800 bg-neutral-50 rounded-md p-2 dark:hover:bg-neutral-700"
          onClick={() => {
            handleSubtaskAdd();
          }}
        >
          <PlusIcon className="size-5 dark:text-neutral-200 text-neutral-500" />
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {(task.subtasks || []).map((subtask: Subtask, index: number) => (
          <div className="flex items-center justify-between gap-2 group" key={subtask.id}>
            <div className="flex space-x-2">
              <Checkbox
                id={`subtask-${index}`}
                checked={subtask.completed}
                onClick={() => {
                  const updatedSubtasks = (task.subtasks || []).map(
                    (item: { id: string; completed: any }) =>
                      item.id === subtask.id ? { ...item, completed: !item.completed } : item
                  );
                  handleChange("subtasks", updatedSubtasks);
                }}
              />
              <label
                htmlFor={`subtask-${index}`}
                className="text-sm font-medium leading-none dark:text-neutral-200 text-neutral-800"
              >
                {subtask.title}
              </label>
            </div>
            <div
              className="hidden group-hover:flex items-center gap-2 hover:cursor-pointer"
              onClick={() => handleSubtaskRemove(subtask)}
            >
              <XIcon className="size-4 dark:text-neutral-300 text-neutral-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
