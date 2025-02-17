"use client";

import { PlusIcon } from "lucide-react";
import useDialogStore from "../dialogs/dialogStore";
import { getCourses } from "./courseUtils";

export default function CourseSelector() {
  const openDialog = useDialogStore((state) => state.openDialog);
  const openCreateCourseDialog = () => openDialog("createCourse", {}, "New Course");

  const handleCourseAdd = () => {
    console.log("Add Course");
    openCreateCourseDialog();
  };

  return (
    <div>
      <div>
        {getCourses()?.map((course) => (
          <div key={course.id}>
            <h2>{course.name}</h2>
          </div>
        ))}
        <button
          onClick={handleCourseAdd}
          className="flex items-center justify-center w-full max-w-sm gap-2 bg-neutral-800 rounded-full py-1 px-5"
        >
          <PlusIcon className="size-5" />
          <span className="font-medium">New Course</span>
        </button>
      </div>
    </div>
  );
}
