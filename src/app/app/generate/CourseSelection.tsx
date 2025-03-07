import NewCourseButton from "@/app/courses/NewCourseButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCoursesStore from "@/stores/coursesStore";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function CourseSelection({
  onSelectCourse,
}: {
  onSelectCourse: (courseId: string) => void;
}) {
  const courses = useCoursesStore((state) => state.courses);

  const [selectOpen, setSelectOpen] = useState(false);

  const onValueChange = (courseId: string) => {
    onSelectCourse(courseId);
  };

  return (
    <Select open={selectOpen} onOpenChange={setSelectOpen} onValueChange={onValueChange}>
      <SelectTrigger className="dark:bg-neutral-900 bg-neutral-50 rounded-lg p-6">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {courses.map((course) => (
          <SelectItem key={course.id} value={course.id} className="p-3 hover:cursor-pointer">
            {course.abbreviation && `${course.abbreviation}: `}
            {course.name}
          </SelectItem>
        ))}
        <NewCourseButton
          className="flex items-center gap-2 dark:text-neutral-400 text-neutral-500 rounded-md p-3 dark:hover:bg-neutral-800 hover:bg-neutral-100 w-full"
          onClick={() => {
            setSelectOpen(false);
          }}
        >
          <PlusIcon className="size-5" />
          <span>Create new course</span>
        </NewCourseButton>
      </SelectContent>
    </Select>
  );
}
