"use client";

import { addLocalTask, getLocalTasks, updateLocalTask } from "@/lib/localStorageTasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils.ts/cn";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { ClockIcon, FlameIcon, RepeatIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Selection from "./Selection";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Task } from "@/types/task";
import { Subtask } from "@/types/subtask";
import useDialogStore from "@/stores/dialogStore";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/constants/taskConstants";

function TaskForm({ className, initialTask }: { className?: string; initialTask?: Task }) {
  const [task, setTask] = useState<Task>({
    id: initialTask?.id || uuidv4(),
    title: initialTask?.title || "",
    deadline: initialTask?.deadline,
    impact: initialTask?.impact,
    difficulty: initialTask?.difficulty,
    estimatedDurationInMins: initialTask?.estimatedDurationInMins,
    recurrence: initialTask?.recurrence || {
      frequency: "once",
      daysOfWeek: [],
    },
    description: initialTask?.description || "",
    subtasks: initialTask?.subtasks || [],
    completed: initialTask?.completed || false,
  });
  const tasks = useTasksStore((state) => state.tasks);
  const updateTask = useTasksStore((state) => state.updateTask);
  const addTask = useTasksStore((state) => state.addTask);
  const close = useDialogStore((state) => state.closeDialog);

  const handleChange = (key: string, value: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  const handleSubtaskAdd = (newSubtask: Subtask) => {
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: [...(prevTask.subtasks || []), newSubtask],
    }));
  };

  const resetForm = () => {
    setTask({
      id: uuidv4(),
      title: "",
      deadline: undefined,
      impact: undefined,
      difficulty: undefined,
      estimatedDurationInMins: undefined,
      recurrence: {
        frequency: "once",
        daysOfWeek: [],
      },
      description: "",
      subtasks: [],
      completed: false,
    });
  };

  const handleTaskFormSubmit = (e: any) => {
    e.preventDefault();

    if (initialTask) {
      updateTask(task);
      updateLocalTask(task);
    } else {
      addTask(task);
      addLocalTask(task);
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
          className={`px-3 py-2 outline-blue-600 outline-4 w-full placeholder-gray-600 bg-neutral-800`}
        />
        <DatePickerWithPresets
          date={task.deadline}
          setDate={(date) => handleChange("deadline", date)}
        />
      </div>

      <div className="flex flex-col gap-7 mt-5 mb-14">
        <Textarea
          className="resize-none border-none focus-visible:ring-0 bg-neutral-800"
          placeholder="Description"
          value={task.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Selection
          title="Impact"
          items={Object.entries(TASK_IMPACT).map(([taskValue, taskLabel]) => ({
            text: taskLabel,
            value: parseInt(taskValue),
          }))}
          icon={<ZapIcon />}
          onSelect={(value) => handleChange("impact", value)}
          defaultValue={task.impact}
        />

        <Selection
          title="Estimated Duration"
          items={[
            { text: "5", value: 5 },
            { text: "25", value: 25 },
            { text: "60", value: 60 },
            { text: "90", value: 90 },
            { text: "3h", value: 180 },
            { text: "5h", value: 300 },
            { text: "8h", value: 480 },
          ]}
          icon={<ClockIcon />}
          onSelect={(value) => handleChange("estimatedDurationInMins", value)}
          defaultValue={task.estimatedDurationInMins}
        />
        <Selection
          title="Difficulty"
          items={Object.entries(TASK_DIFFICULTY).map(([difficultyValue, difficultyLabel]) => ({
            text: difficultyLabel,
            value: parseInt(difficultyValue),
          }))}
          icon={<FlameIcon />}
          onSelect={(value) => handleChange("difficulty", value)}
          defaultValue={task.difficulty}
        />
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Add subtask"
            className="border-none bg-neutral-800 focus-visible:ring-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const newSubtask = {
                  id: uuidv4(),
                  title: (e.target as HTMLInputElement).value.trim(),
                  completed: false,
                };

                handleSubtaskAdd(newSubtask);
                (e.target as HTMLInputElement).value = ""; // to clear the input field
              }
            }}
          />
          <div className="flex flex-col gap-2 mb-4">
            {(task.subtasks || []).map((subtask: Subtask, index: any) => (
              <div className="flex space-x-2" key={index}>
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
            ))}
          </div>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button className="dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
                Repeat
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-3">
                <Selection
                  title={"Repeat"}
                  items={[
                    { text: "Once", value: "once" },
                    { text: "Daily", value: "daily" },
                    { text: "Weekly", value: "weekly" },
                    { text: "Monthly", value: "monthly" },
                  ]}
                  icon={<RepeatIcon />}
                  onSelect={(value) => handleChange("recurrence", { frequency: value })}
                  defaultValue={task.recurrence?.frequency || "once"}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <button
        className={`bg-orange-400 py-2 px-4 rounded-lg w-full font-bold sticky bottom-0 disabled:bg-orange-200`}
        disabled={!task.title}
        onClick={handleTaskFormSubmit}
      >
        {initialTask ? "Update Task" : "Create task"}
      </button>
    </form>
  );
}

export default TaskForm;
