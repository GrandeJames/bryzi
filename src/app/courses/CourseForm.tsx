import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TimeInput from "@/components/TimeInput";
import { ArrowRightIcon } from "lucide-react";
import WeekdaySelector from "./WeekdaySelector";
import { handleCourseAdd, handleCourseUpdate } from "./utils/courseUtils";
import { useCallback, useState } from "react";
import { Course, CourseSchema } from "./types/course";
import useDialogStore from "../dialogs/dialogStore";
import { v4 as uuidv4 } from "uuid";
import { getCourseById } from "./utils/courseUtils";

export default function CourseForm({ initialCourseId }: { initialCourseId?: string }) {
  let initialCourse: Course | undefined;
  if (initialCourseId) {
    initialCourse = getCourseById(initialCourseId);
  }

  const closeDialog = useDialogStore((state) => state.closeDialog);

  const [name, setName] = useState<Course["name"] | undefined>(initialCourse?.name);
  const [abbreviation, setAbbreviation] = useState<Course["abbreviation"]>(
    initialCourse?.abbreviation
  );
  const [startTime, setStartTime] = useState<Course["startTime"] | undefined>(
    initialCourse?.startTime
  ); // in 24h format: "HH:mm"
  const [endTime, setEndTime] = useState<Course["endTime"] | undefined>(initialCourse?.endTime); // in 24h format: "HH:mm"
  const [days, setDays] = useState<Course["days"] | undefined>(initialCourse?.days);
  const [isAsynchronous, setIsAsynchronous] = useState<Course["isAsynchronous"] | undefined>(
    initialCourse?.isAsynchronous
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmitCourseForm = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({});

    const asyncCourse = {
      id: initialCourse ? initialCourse.id : uuidv4(),
      name: name,
      abbreviation: abbreviation,
      isAsynchronous: isAsynchronous,
    };

    const course: Course = {
      id: initialCourse ? initialCourse.id : uuidv4(),
      name: name!,
      abbreviation: abbreviation,
      startTime: startTime!,
      endTime: endTime!,
      days: days!,
      isAsynchronous: isAsynchronous!,
    };

    try {
      if (isAsynchronous) {
        CourseSchema.parse(asyncCourse);
      } else {
        CourseSchema.parse(course);
      }

      initialCourseId ? handleCourseUpdate(course) : handleCourseAdd(course);

      closeDialog();
      console.log("Course added successfully.");
    } catch (e: any) {
      const newErrors: { [key: string]: string } = {};
      e.errors.forEach((error: any) => {
        console.log("errors", e.errors);
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleCancelClick = (event: React.FormEvent) => {
    event.preventDefault();
    closeDialog();
  };

  return (
    <form>
      <div className="max-w-xs mx-3 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="grid gap-2 grid-cols-6">
            <div className="col-span-4 space-y-2">
              <Input
                placeholder="Calculus II"
                value={name}
                onChange={(e) => setName(e.target.value === "" ? undefined : e.target.value)}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            </div>
            <div className="col-span-2 space-y-2">
              <Input
                placeholder="MATH-242"
                value={abbreviation}
                onChange={(e) =>
                  setAbbreviation(e.target.value === "" ? undefined : e.target.value)
                }
              />
              {errors.abbreviation && (
                <span className="text-red-500 text-xs">{errors.abbreviation}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className={`text-sm text-neutral-600 border border-neutral-200 dark:border-neutral-800 rounded-md p-1 w-fit px-5 ${
              isAsynchronous
                ? "bg-orange-400 text-white border-none hover:bg-orange-400/80"
                : "hover:text-neutral-500"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsAsynchronous((prev) => !prev);
            }}
          >
            Asynchronous
          </button>

          {!isAsynchronous && (
            <div className="space-y-2">
              <WeekdaySelector setSelectedDays={setDays} selectedDays={days} />
              {errors.days && <span className="text-red-500 text-xs">{errors.days}</span>}
              <div className="flex items-center justify-between">
                <TimeInput
                  time={startTime}
                  onTimeSet={(time: string) => {
                    setStartTime(time);
                  }}
                />
                <ArrowRightIcon className="size-4 text-neutral-400" />
                <TimeInput
                  time={endTime}
                  onTimeSet={(time: string) => {
                    setEndTime(time);
                  }}
                />
              </div>
              {errors.endTime && <span className="text-red-500 text-xs">{errors.endTime}</span>}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant={"ghost"} onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            onClick={onSubmitCourseForm}
            className="bg-orange-400 text-white hover:bg-orange-400/80 dark:bg-orange-400 dark:text-white hover:dark:bg-orange-400/80 hover:dark:text-neutral-200"
          >
            {initialCourseId ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
}
