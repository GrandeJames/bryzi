"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils.ts/cn";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { PlusIcon, XIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Subtask } from "@/types/subtask";
import useDialogStore from "@/app/dialogs/dialogStore";
import { handleTaskAdd, handleTaskUpdate } from "@/lib/taskUtils";
import { PersonalTask } from "@/types/personalTask";

function PersonalTaskForm({
  className,
  initialTask,
}: {
  className?: string;
  initialTask?: PersonalTask;
}) {
  const [task, setTask] = useState<PersonalTask>({
    id: initialTask?.id || uuidv4(),
    title: initialTask?.title || "",
    deadline: initialTask?.deadline,
    recurrence: initialTask?.recurrence || {
      frequency: "once",
      daysOfWeek: [],
    },
    description: initialTask?.description || "",
    subtasks: initialTask?.subtasks || [],
    completed: initialTask?.completed || false,
    type: "personal",
  });
  const [currentSubtaskInput, setCurrentSubtaskInput] = useState<string>("");

  const updateTask = useTasksStore((state) => state.updateTask);
  const addTask = useTasksStore((state) => state.addTask);
  const close = useDialogStore((state) => state.closeDialog);

  const handleChange = (key: string, value: any) => {
    setTask((prevTask) => ({
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

    setTask((prevTask) => ({
      ...prevTask,
      subtasks: [...(prevTask.subtasks || []), newSubtask],
    }));

    setCurrentSubtaskInput("");
  };

  const handleSubtaskRemove = (subtask: Subtask) => {
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: (prevTask.subtasks || []).filter((prevSubtask) => prevSubtask.id !== subtask.id),
    }));
  };

  const resetForm = () => {
    setTask({
      id: uuidv4(),
      title: "",
      deadline: undefined,
      recurrence: {
        frequency: "once",
        daysOfWeek: [],
      },
      description: "",
      subtasks: [],
      completed: false,
      type: "personal",
    });
  };

  const handleTaskFormSubmit = (e: any) => {
    e.preventDefault();

    if (initialTask) {
      handleTaskUpdate(task, updateTask);
    } else {
      handleTaskAdd(task, addTask);
    }
    resetForm();
    close();
  };

  return (
    <form
      onSubmit={handleTaskFormSubmit}
      className={cn(className, "gap-2 flex flex-col relative px-6")}
    >
      <div className="flex bg-neutral-800 rounded-md p-1">
        <input
          type="text"
          placeholder="Add Task"
          onChange={(e) => handleChange("title", e.target.value)}
          value={task.title}
          className={`px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600 bg-neutral-800 text-neutral-200`}
        />
        <DatePickerWithPresets
          date={task.deadline}
          setDate={(date) => handleChange("deadline", date?.toISOString())}
        />
      </div>

      <div className="flex flex-col gap-7 mt-5 mb-14">
        <Textarea
          className="resize-none border-none focus-visible:ring-0 bg-neutral-800 text-neutral-200"
          placeholder="Description"
          value={task.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            <Input
              placeholder="Add subtask"
              className="border-none bg-neutral-800 focus-visible:ring-0 text-neutral-200"
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
              className="bg-neutral-800 rounded-md p-2 hover:bg-neutral-700"
              onClick={() => {
                handleSubtaskAdd();
              }}
            >
              <PlusIcon className="size-5 text-neutral-200" />
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
                      const updatedSubtasks = (task.subtasks || []).map((item) =>
                        item.id === subtask.id ? { ...item, completed: !item.completed } : item
                      );
                      handleChange("subtasks", updatedSubtasks);
                    }}
                  />
                  <label
                    htmlFor={`subtask-${index}`}
                    className="text-sm font-medium leading-none text-neutral-200"
                  >
                    {subtask.title}
                  </label>
                </div>
                <div
                  className="hidden group-hover:flex items-center gap-2 hover:cursor-pointer"
                  onClick={() => handleSubtaskRemove(subtask)}
                >
                  <XIcon className="size-4 text-neutral-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className={`bg-orange-400 py-2 px-4 rounded-lg w-full font-bold sticky bottom-0 disabled:bg-orange-200 text-white`}
        disabled={!task.title}
        onClick={handleTaskFormSubmit}
      >
        {initialTask ? "Update Task" : "Create task"}
      </button>
    </form>
  );
}

export default PersonalTaskForm;
