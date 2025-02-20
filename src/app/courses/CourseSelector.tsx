"use client";

import { PlusIcon } from "lucide-react";
import { getCourses } from "./utils/courseUtils";
import NewCourseButton from "./NewCourseButton";
import { Course } from "./types/course";

export default function CourseSelector() {
  return (
    <div>
      Selector
      <div>
        {getCourses()?.map((course: Course) => (
          <div key={course.name}>
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
