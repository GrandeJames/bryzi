"use client";

import { PlusIcon } from "lucide-react";

const SCHOOL_COURSES = [
  {
    id: 1,
    name: "Intro to Biology",
    abbreviation: "BIOL-101",
    recurrence: {
      frequency: "weekly",
      days: ["mon", "wed", "fri"],
      startTime: "10:30",
      endTime: "12:00",
    },
  },
  {
    id: 2,
    name: "Chemistry",
    abbreviation: "CHEM-362",
    recurrence: {
      frequency: "weekly",
      days: ["tue", "thu"],
      startTime: "9:00",
      endTime: "10:15",
    },
  },
  {
    id: 2,
    name: "Online Physics",
    abbreviation: "CHEM-362",
  },
  {
    id: 2,
    name: "Chemistry",
    abbreviation: "CHEM-362",
    recurrence: {
      frequency: "weekly",
      days: ["tue", "thu"],
      startTime: "9:00",
      endTime: "10:15",
    },
  },
  {
    id: 2,
    name: "Chemistry",
    abbreviation: "CHEM-362",
    recurrence: {
      frequency: "weekly",
      days: ["tue", "thu"],
      startTime: "9:00",
      endTime: "10:15",
    },
  },
];

function Classes() {
  return (
    <div className="w-full max-w-3xl my-8 mx-5">
      <header className="flex justify-between items-center mb-2">
        <span className="text-neutral-200 text-4xl font-bold">Classes</span>
        <button className="flex items-center gap-2 bg-primary-500 text-neutral-200 px-3 py-2 rounded-lg bg-orange-500 text-sm">
          <PlusIcon className="size-4" />
          New Class
        </button>
      </header>
      <main>
        {SCHOOL_COURSES.length === 0 && (
          <div className="text-neutral-400 text-xl">No classes created</div>
        )}
        <div className="flex flex-col gap-2">
          {SCHOOL_COURSES.map((course) => (
            <div className="bg-neutral-900 rounded-2xl p-6 w-full" key={course.id}>
              <div className=" text-2xl font-medium flex gap-2">
                <span className="text-neutral-300">{course.abbreviation}</span>
                <span className="text-neutral-100">{course.name}</span>
              </div>
              {course.recurrence && (
                <div className="text-neutral-400">{getClassRecurrence(course.recurrence)}</div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function getClassRecurrence(recurrence: any) {
  const daysStr = recurrence.days.map((day: any) => day.charAt(0).toUpperCase()).join("");
  return `${daysStr} ${recurrence.startTime}-${recurrence.endTime}`;
}

export default Classes;
