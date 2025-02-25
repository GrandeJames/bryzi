"use client";

import { PlusIcon } from "lucide-react";
import NewCourseButton from "./NewCourseButton";
import { Course } from "./types/course";
import { useState } from "react";
import useCoursesStore from "@/stores/coursesStore";
import CourseActionsDropdown from "./CourseActionsDropdown";

export default function CourseSelector({
  onSelect,
  initialCourse,
}: {
  onSelect: (course: Course) => void;
  initialCourse?: Course;
}) {
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(initialCourse);

  const courses = useCoursesStore((state) => state.courses);

  const handleCourseClick = (e: React.FormEvent, courseClicked: Course) => {
    e.preventDefault();
    setSelectedCourse(courseClicked);
    onSelect(courseClicked);
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

      <div className="flex flex-col gap-1 border rounded-md dark:border-neutral-900 p-2">
        {courses.length === 0 && (
          <NewCourseButton className="flex gap-1 items-center dark:text-neutral-300">
            <PlusIcon className="size-4" />
            <span className="text-sm">New Course</span>
          </NewCourseButton>
        )}
        {courses?.map((course: Course) => {
          return (
            <div
              key={course.id}
              className={`border rounded-md text-sm p-2 hover:cursor-pointer flex justify-between items-center ${
                selectedCourse?.id == course.id
                  ? "border-neutral-900 dark:border-neutral-400 dark:text-neutral-300 font-medium"
                  : "dark:text-neutral-400 dark:hover:bg-neutral-800 dark:border-neutral-800"
              }`}
              onClick={(e) => handleCourseClick(e, course)}
            >
              <span>{course.name}</span>
              <CourseActionsDropdown courseId={course.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
