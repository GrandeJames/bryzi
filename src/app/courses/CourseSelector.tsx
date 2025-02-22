"use client";

import { EllipsisVerticalIcon, PlusIcon } from "lucide-react";
import NewCourseButton from "./NewCourseButton";
import { Course } from "./types/course";
import { useState } from "react";
import useCoursesStore from "@/stores/coursesStore";

const SAMPLE_COURSES: Course[] = [
  {
    name: "AI Programming",
    abbreviation: "ICS-361",
    startTime: "08:00",
    endTime: "09:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Capstone Project",
    abbreviation: "ICS-496",
    startTime: "10:00",
    endTime: "11:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Europeans in the Pacific",
    abbreviation: "LLEA-371",
    startTime: "12:00",
    endTime: "13:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Design for Mobile Devices",
    abbreviation: "ICS-466",
    startTime: "14:00",
    endTime: "15:30",
    days: [0, 1, 2, 3, 4],
  },
  {
    name: "Intro to Educational Psychology",
    abbreviation: "EDEP-311",
    startTime: "16:00",
    endTime: "17:30",
    days: [0, 1, 2, 3, 4],
  },
];

export default function CourseSelector({ onSelect }: { onSelect: (course: Course) => void }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = useCoursesStore((state) => state.courses);

  const handleCourseEditClick = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Course Edit");
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
          {courses.length > 0 && (
            <NewCourseButton className="text-xs dark:hover:bg-neutral-700/30 hover:bg-neutral-200/30 p-1 rounded-md">
              <PlusIcon className="size-4" />
            </NewCourseButton>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-1 border rounded-md dark:border-neutral-800 p-2">
        {courses.length === 0 && (
          <NewCourseButton>
            <PlusIcon className="size-5" />
            <span>New Course</span>
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
            <button
              className="dark:hover:bg-neutral-700/30 hover:bg-neutral-200/30 rounded-md p-1"
              onClick={(e) => {
                handleCourseEditClick(e);
              }}
            >
              <EllipsisVerticalIcon className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
