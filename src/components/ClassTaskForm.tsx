"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils.ts/cn";
import { DatePickerWithPresets } from "@/components/ui/date-picker-presets";
import { ClockIcon, FlameIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Selection from "./Selection";
import { ClassTask } from "@/types/classTask";
import useDialogStore from "@/app/dialogs/dialogStore";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/constants/taskConstants";
import { handleTaskAdd, handleTaskUpdate } from "@/lib/taskUtils";
import SubtasksFormSection from "@/app/app/(tasks)/components/SubtasksFormSection";

function ClassTaskForm({
  className,
  initialTask,
}: {
  className?: string;
  initialTask?: ClassTask;
}) {
  const [task, setTask] = useState<ClassTask>({
    id: initialTask?.id || uuidv4(),
    title: initialTask?.title || "",
    deadline: initialTask?.deadline,
    impact: initialTask?.impact,
    difficulty: initialTask?.difficulty,
    actualDurationInMins: initialTask?.actualDurationInMins,
    estimatedDurationInMins: initialTask?.estimatedDurationInMins,
    recurrence: initialTask?.recurrence || {
      frequency: "once",
      daysOfWeek: [],
    },
    description: initialTask?.description || "",
    subtasks: initialTask?.subtasks || [],
    completed: initialTask?.completed || false,
    type: "class",
  });

  const updateTask = useTasksStore((state) => state.updateTask);
  const addTask = useTasksStore((state) => state.addTask);
  const close = useDialogStore((state) => state.closeDialog);

  const handleChange = (key: string, value: any) => {
    setTask((prevTask) => ({
      ...prevTask,
      [key]: value,
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
      type: "class",
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

      <div className="flex flex-col gap-7 mt-5 mb-14">
        <Textarea
          className="resize-none border-none focus-visible:ring-0 dark:bg-neutral-800 bg-neutral-50 dark:text-neutral-200 text-neutral-800"
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
            { text: "25", value: 25 },
            { text: "60", value: 60 },
            { text: "90", value: 90 },
            { text: "3h", value: 180 },
            { text: "5h", value: 300 },
            { text: "8h", value: 480 },
            { text: "20h", value: 1200 },
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
        <SubtasksFormSection task={task} setTask={setTask} />
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

export default ClassTaskForm;
