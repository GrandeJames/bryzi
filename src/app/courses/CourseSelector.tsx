"use client";

import { PlusIcon } from "lucide-react";
import NewCourseButton from "./NewCourseButton";
import { Course } from "./types/course";
import { useState } from "react";

const SAMPLE_COURSES: Course[] = [
  {
    name: "CS 101",
    abbreviation: "CS",
    startTime: "08:00",
    endTime: "09:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Math 101",
    abbreviation: "MATH",
    startTime: "10:00",
    endTime: "11:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "History 101",
    abbreviation: "HIST",
    startTime: "12:00",
    endTime: "13:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Physics 101",
    abbreviation: "PHYS",
    startTime: "14:00",
    endTime: "15:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Chemistry 101",
    abbreviation: "CHEM",
    startTime: "16:00",
    endTime: "17:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Biology 101",
    abbreviation: "BIO",
    startTime: "18:00",
    endTime: "19:30",
    days: [0, 1, 2, 3, 4],
  },
];

export default function CourseSelector({ onSelect }: { onSelect: (course: Course) => void }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEditClick = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Edit");
  };

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
          {SAMPLE_COURSES.length > 0 && <NewCourseButton className="text-xs">New</NewCourseButton>}
          <button onClick={(e) => handleEditClick(e)} className="text-xs">
            Edit
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-1 border rounded-md dark:border-neutral-800 p-2">
        {SAMPLE_COURSES.length === 0 && (
          <NewCourseButton>
            <PlusIcon className="size-5" />
            <span>New Course</span>
          </NewCourseButton>
        )}
        {SAMPLE_COURSES?.map((course: Course) => (
          <div
            key={course.name}
            className={`border rounded-md text-sm dark:border-neutral-800 p-2 ${
              selectedCourse?.name == course.name
                ? "bg-orange-400 text-white font-medium"
                : "dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
            onClick={(e) => handleCourseClick(e, course)}
          >
            <span>{course.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
