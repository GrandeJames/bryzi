import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CourseForm() {
  const handleCourseCreate = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Create Course");
  };

  return (
    <form>
      <div className="grid gap-4 grid-cols-6">
        <Input placeholder="Calculus II" className="col-span-4" />
        <Input placeholder="MATH 242" className="col-span-2" />
      </div>

      <div className="flex flex-col gap-1">
        <header>Days</header>
        <div className="flex gap-3">
          <span className="py-1 px-2 rounded-md border border-neutral-600 text-neutral-300">
            Mon
          </span>
          <span className="py-1 px-2 rounded-md border border-neutral-600 text-neutral-300">
            Tue
          </span>
          <span className="py-1 px-2 rounded-md border border-neutral-600 text-neutral-300">
            Wed
          </span>
          <span className="py-1 px-2 rounded-md border border-neutral-600 text-neutral-300">
            Thu
          </span>
          <span className="py-1 px-2 rounded-md border border-neutral-600 text-neutral-300">
            Fri
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>Start time</div>
        <div>End time</div>
      </div>
      <div className="flex justify-between">
        <button>Cancel</button>
        <button onClick={handleCourseCreate}>Create</button>
      </div>
    </form>
  );
}
