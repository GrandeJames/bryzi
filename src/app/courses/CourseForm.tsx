import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TimeInput from "@/components/TimeInput";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import WeekdaySelector from "./WeekdaySelector";

export default function CourseForm() {
  const handleCreateClick = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Create Course");
  };

  const handleCancelClick = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Cancel Course");
  };

  return (
    <form>
      <div className="max-w-xs mx-3 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="grid gap-2 grid-cols-6">
            <Input placeholder="Calculus II" className="col-span-4" />
            <Input placeholder="MATH 242" className="col-span-2" />
          </div>
          <WeekdaySelector />
          <div className="flex items-center justify-between">
            <TimeInput />
            <ArrowRightIcon className="size-4 text-neutral-400" />
            <TimeInput />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant={"ghost"} onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button onClick={handleCreateClick}>Create</Button>
        </div>
      </div>
    </form>
  );
}
