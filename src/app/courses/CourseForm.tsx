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
      <div className="flex gap-2">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
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
