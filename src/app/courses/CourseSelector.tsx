"use client";

import { PlusIcon } from "lucide-react";
import NewCourseButton from "./NewCourseButton";
import { Course } from "./types/course";
import { useState } from "react";
import useCoursesStore from "@/stores/coursesStore";
import CourseActionsDropdown from "./CourseActionsDropdown";

export default function CourseSelector({ onSelect }: { onSelect: (course: Course) => void }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = useCoursesStore((state) => state.courses);

  const handleCourseClick = (e: React.FormEvent, courseClicked: Course) => {
    e.preventDefault();
    setSelectedCourse(courseClicked);
    onSelect(courseClicked);

    console.log("Course clicked");
  };

  return (
    <div className="space-y-1">
      <header className="flex justify-between items-center">
        <div className="font-medium dark:text-neutral-300">Course</div>
        <div className="flex gap-3 text-neutral-400">
          {courses.length > 0 && (
            <NewCourseButton className="text-xs dark:hover:bg-neutral-700/30 hover:bg-neutral-200/30 p-1 rounded-md">
              <PlusIcon className="size-4" />
            </NewCourseButton>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-1 border rounded-md dark:border-neutral-800 p-2">
        {courses.length === 0 && (
          <NewCourseButton className="flex gap-1 items-center">
            <PlusIcon className="size-4" />
            <span className="text-sm">New Course</span>
          </NewCourseButton>
        )}
        {courses?.map((course: Course) => (
          <div
            key={course.name}
            className={`border rounded-md text-sm dark:border-neutral-800 p-2 hover:cursor-pointer flex justify-between items-center ${
              selectedCourse?.name == course.name
                ? "bg-orange-400 text-white font-medium"
                : "dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
            onClick={(e) => handleCourseClick(e, course)}
          >
            <span>{course.name}</span>
            <CourseActionsDropdown courseId={course.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
