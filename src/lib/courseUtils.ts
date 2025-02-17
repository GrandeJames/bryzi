import { addLocalStorageItem } from "./localStorageUtils";
import { getLocalStorageData } from "./localStorageUtils";
import { Course } from "@/types/courses";

export function handleCourseAdd(course: Course) {
  addLocalStorageItem<Course>("courses", course);
}

export function getCourses() {
  return getLocalStorageData<Course>("courses");
}
