import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Course } from "@/app/courses/types/course";
import { v4 as uuidv4 } from "uuid";
import { addLocalStorageItem, getLocalStorageData } from "@/lib/localStorageUtils";
import useCoursesStore from "@/stores/coursesStore";

export function handleCourseAdd(course: Course) {
  const courseWithId = { ...course, id: uuidv4() };
  addLocalStorageItem<Course>(LOCAL_STORAGE_KEYS.COURSES, courseWithId);

  useCoursesStore.getState().addCourse(courseWithId);
}

export function getCourses() {
  return getLocalStorageData<Course>(LOCAL_STORAGE_KEYS.COURSES);
}
