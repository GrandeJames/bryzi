import { addLocalStorageItem } from "../../lib/localStorageUtils";
import { getLocalStorageData } from "../../lib/localStorageUtils";
import { Course } from "@/app/courses/courses";

export function handleCourseAdd(course: Course) {
  addLocalStorageItem<Course>("courses", course);
}

export function getCourses() {
  return getLocalStorageData<Course>("courses");
}
