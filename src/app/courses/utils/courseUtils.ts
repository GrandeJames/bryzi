import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Course } from "@/app/courses/types/course";
import {
  addLocalStorageItem,
  getLocalStorageData,
  removeLocalStorageItem,
} from "@/lib/localStorageUtils";
import useCoursesStore from "@/stores/coursesStore";

export function handleCourseAdd(course: Course) {
  useCoursesStore.getState().addCourse(course);
  addLocalStorageItem<Course>(LOCAL_STORAGE_KEYS.COURSES, course);
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

export function getCourseById(courseId: string) {
  return useCoursesStore.getState().courses.find((course) => course.id === courseId);
}
