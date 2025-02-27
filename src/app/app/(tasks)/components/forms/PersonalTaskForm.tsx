"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils/cn";
import useDialogStore from "@/app/dialogs/dialogStore";
import { handleTaskAdd, handleTaskUpdate } from "@/lib/taskUtils";
import { PersonalTask } from "@/types/personalTask";
import SubtasksFormSection from "@/app/app/(tasks)/components/forms/SubtasksFormSection";
import TaskDetailsFormSection from "@/app/app/(tasks)/components/forms/TaskDetailsFormSection";
import TaskTitleDateFormSection from "./TaskTitleDateFormSection";
import TaskFormSubmissionButton from "./TaskFormSubmissionButton";

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
      handleTaskUpdate(task, updateTask, initialTask);
    } else {
      handleTaskAdd(task, addTask);
    }
    resetForm();
    close();
  };

  return (
    <form
      onSubmit={handleTaskFormSubmit}
      className={cn(className, "gap-2 flex flex-col relative px-6 w-[23rem]")}
    >
      <TaskTitleDateFormSection task={task} handleChange={handleChange} />
      <div className="flex flex-col gap-7 mt-5 mb-14">
        <TaskDetailsFormSection task={task} handleChange={handleChange} />
        <SubtasksFormSection task={task} setTask={setTask} />
      </div>
      <TaskFormSubmissionButton
        initialTask={initialTask}
        handleTaskFormSubmit={handleTaskFormSubmit}
        task={task}
      />
    </form>
  );
}

export default PersonalTaskForm;
