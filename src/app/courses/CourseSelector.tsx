"use client";

import { PlusIcon } from "lucide-react";
import { getCourses } from "./courseUtils";
import NewCourseButton from "./NewCourseButton";

export default function CourseSelector() {
  return (
    <div>
      <div>
        {getCourses()?.map((course) => (
          <div key={course.id}>
            <h2>{course.name}</h2>
          </div>
        ))}
        <NewCourseButton className="flex gap-2">
          <PlusIcon />
          Add Course
        </NewCourseButton>
      </div>
    </div>
  );
}
