"use client";

import { create } from "zustand";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { Course } from "@/app/courses/types/course";
import { getLocalStorageData } from "@/lib/localStorageUtils";

interface CoursesStore {
  courses: Course[];
  setCourses: (newTasks: Course[]) => void;
  addCourse: (newCourse: Course) => void;
  removeCourse: (id: string) => void;
  updateCourse: (updatedTask: Course) => void;
}
const useCoursesStore = create<CoursesStore>((set) => ({
  courses: getLocalStorageData<any>(LOCAL_STORAGE_KEYS.COURSES) || [],
  setCourses: (newCourses: Course[]) => {
    set(() => {
      return { courses: newCourses };
    });
  },

  addCourse: (newCourse: Course) =>
    set((state) => {
      const updatedCourses = [...state.courses, newCourse];
      return { courses: updatedCourses };
    }),
  removeCourse: (id: string) =>
    set((state) => {
      const updatedCourses = state.courses.filter((course) => course.id !== id);
      return { courses: updatedCourses };
    }),
  updateCourse: (updatedCourse: Course) =>
    set((state) => {
      const updatedCourses = state.courses.map((originalCourse) =>
        originalCourse.id === updatedCourse.id ? updatedCourse : originalCourse
      );
      return { courses: updatedCourses };
    }),
}));

export default useCoursesStore;
