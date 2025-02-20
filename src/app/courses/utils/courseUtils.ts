import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Course } from "@/app/courses/types/course";
import { addLocalStorageItem, getLocalStorageData } from "@/lib/localStorageUtils";

export function handleCourseAdd(course: Course) {
  addLocalStorageItem<Course>(LOCAL_STORAGE_KEYS.COURSES, courseWithId);
}

export function getCourses() {
  return getLocalStorageData<Course>(LOCAL_STORAGE_KEYS.COURSES);
}
