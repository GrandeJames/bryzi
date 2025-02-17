"use client";

import useDialogStore from "../dialogs/dialogStore";
import { getCourses } from "./courseUtils";

export default function CourseSelector() {
  const openDialog = useDialogStore((state) => state.openDialog);
  const openCreateCourseDialog = () => openDialog("createCourse", {}, "Create Course");

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
        <button onClick={handleCourseAdd}>Add Course</button>
      </div>
    </div>
  );
}
