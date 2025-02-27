"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useTasksStore from "@/stores/tasksStore";
import { cn } from "@/utils/cn";
import { ClockIcon, FlameIcon, SparklesIcon, ZapIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    courseId: initialTask?.courseId || "",
  });

  const [page, setPage] = useState(0);

  const updateTask = useTasksStore((state) => state.updateTask);
  const addTask = useTasksStore((state) => state.addTask);
  const close = useDialogStore((state) => state.closeDialog);

  const courses = useCoursesStore((state) => state.courses);

  const handleTaskChange = (key: string, value: any) => {
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
      courseId: "",
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

  const getCourse = (courseId?: string) => {
    return courses.find((course) => course.id === courseId);
  };

  const handleContinueClick = (e: any) => {
    e.preventDefault();

    if (getCourse(task.courseId)) {
      setPage(1);
    }
  };

  return (
    <form className={cn(className, "gap-5 flex flex-col relative px-6 w-[23rem]")}>
      <TaskTitleDateFormSection task={task} handleChange={handleTaskChange} />

      {page === 0 && (
        <div className="space-y-5">
          <CourseSelector
            onSelect={(courseSelected: any) => {
              handleTaskChange("courseId", courseSelected.id);
            }}
            initialCourse={getCourse(initialTask?.courseId)}
          />
          <div className="flex justify-end">
            <Button variant={"link"} className="dark:text-neutral-400" onClick={close}>
              <Link href={"generate"} className="flex items-center gap-2">
                <SparklesIcon /> Generate tasks from course schedule
              </Link>
            </Button>
          </div>
        </div>
      )}

      {page === 1 && (
        <div>
          <div className="flex flex-col gap-7 mb-14">
            <div className="flex gap-2 border dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900 bg-neutral-100 p-2 dark:text-neutral-400 text-neutral-500 font-medium text-sm rounded-md">
              Course: {getCourse(task.courseId)?.name}
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
              onSelect={(value) => handleTaskChange("estimatedDurationInMins", value)}
              defaultValue={task.estimatedDurationInMins}
            />
            <Selection
              title="Impact"
              items={Object.entries(TASK_IMPACT).map(([taskValue, taskLabel]) => ({
                text: taskLabel,
                value: parseInt(taskValue),
              }))}
              icon={<ZapIcon />}
              onSelect={(value) => handleTaskChange("impact", value)}
              defaultValue={task.impact}
            />

            <Selection
              title="Difficulty"
              items={Object.entries(TASK_DIFFICULTY).map(([difficultyValue, difficultyLabel]) => ({
                text: difficultyLabel,
                value: parseInt(difficultyValue),
              }))}
              icon={<FlameIcon />}
              onSelect={(value) => handleTaskChange("difficulty", value)}
              defaultValue={task.difficulty}
            />
            <SubtasksFormSection task={task} setTask={setTask} />
            <TaskDetailsFormSection task={task} handleChange={handleTaskChange} />
          </div>
          <TaskFormSubmissionButton
            initialTask={initialTask}
            handleTaskFormSubmit={handleTaskFormSubmit}
            task={task}
          />
        </div>
      )}
      {page === 0 && (
        <Button
        variant={"submit"}
          onClick={handleContinueClick}
          disabled={!getCourse(task.courseId) || !task.title}
          type="button"
        >
          Continue
        </Button>
      )}
    </form>
  );
}

export default ClassTaskForm;
