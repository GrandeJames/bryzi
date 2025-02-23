import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Course } from "@/app/courses/types/course";
import { v4 as uuidv4 } from "uuid";
import {
  addLocalStorageItem,
  getLocalStorageData,
  removeLocalStorageItem,
} from "@/lib/localStorageUtils";
import useCoursesStore from "@/stores/coursesStore";

export function handleCourseAdd(course: Course) {
  const courseWithId = { ...course, id: uuidv4() };

  useCoursesStore.getState().addCourse(courseWithId);
  addLocalStorageItem<Course>(LOCAL_STORAGE_KEYS.COURSES, courseWithId);
}

export function getCourses() {
  return getLocalStorageData<Course>(LOCAL_STORAGE_KEYS.COURSES);
}

export function handleCourseRemove(courseId: string) {
  if (!courseId) {
    console.error("Course ID is required");
    return;
  }

  useCoursesStore.getState().removeCourse(courseId);
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.COURSES, courseId);

  console.log("Course removed");
}
