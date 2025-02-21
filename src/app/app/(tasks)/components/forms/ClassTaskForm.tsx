"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils.ts/cn";
import { ClockIcon, FlameIcon, ZapIcon } from "lucide-react";
import { ClassTask } from "@/types/classTask";
import useDialogStore from "@/app/dialogs/dialogStore";
import { TASK_DIFFICULTY, TASK_IMPACT } from "@/constants/taskConstants";
import { handleTaskAdd, handleTaskUpdate } from "@/lib/taskUtils";
import SubtasksFormSection from "@/app/app/(tasks)/components/forms/SubtasksFormSection";
import Selection from "@/components/Selection";
import TaskDetailsFormSection from "./TaskDetailsFormSection";
import TaskTitleDateFormSection from "./TaskTitleDateFormSection";
import TaskFormSubmissionButton from "./TaskFormSubmissionButton";
import useCoursesStore from "@/stores/coursesStore";
import CourseSelector from "@/app/courses/CourseSelector";

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

  const [course, setCourse] = useState();

  const [page, setPage] = useState(0);

  const updateTask = useTasksStore((state) => state.updateTask);
  const addTask = useTasksStore((state) => state.addTask);
  const close = useDialogStore((state) => state.closeDialog);

  const courses = useCoursesStore((state) => state.courses);

  console.log("courses", courses);

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
      handleTaskUpdate(task, updateTask, initialTask);
    } else {
      handleTaskAdd(task, addTask);
    }
    resetForm();
    close();
  };

  const handleContinueClick = (e: any) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <form
      onSubmit={handleTaskFormSubmit}
      className={cn(className, "gap-2 flex flex-col relative px-6")}
    >
      <TaskTitleDateFormSection task={task} handleChange={handleChange} />

      {page === 0 && (
        <CourseSelector
          onSelect={(courseSelected: any) => {
            setCourse(courseSelected);
            console.log("courseSelected callbackFn", courseSelected);
          }}
        />
      )}

      {page === 1 && (
        <div>
          <div className="flex flex-col gap-7 mt-5 mb-14">
            <div className="flex gap-2 border border-neutral-800 bg-neutral-900 p-2 text-neutral-400 font-medium text-sm rounded-md">
              Course: {course?.name}
            </div>
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
            <TaskDetailsFormSection task={task} handleChange={handleChange} />
          </div>
          <TaskFormSubmissionButton
            initialTask={initialTask}
            handleTaskFormSubmit={handleTaskFormSubmit}
            task={task}
          />
        </div>
      )}
      {page === 0 && (
        <button
          className="text-sm text-center bg-neutral-800 mt-3 text-white rounded-md p-2 disabled:dark:bg-neutral-900 disabled:dark:text-neutral-600"
          onClick={handleContinueClick}
          disabled={!course || !task.title}
        >
          Continue
        </button>
      )}
    </form>
  );
}

export default ClassTaskForm;
