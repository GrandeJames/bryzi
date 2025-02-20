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
  courses: [], // Initially empty
  setCourses: (newCourses) => {
    set(() => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.COURSES, JSON.stringify(newCourses));
      return { courses: newCourses };
    });
  },
  addCourse: (newCourse: Course) =>
    set((state) => {
      const updatedCourses = [...state.courses, newCourse];
      localStorage.setItem(LOCAL_STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
      return { courses: updatedCourses };
    }),
  removeCourse: (id: string) =>
    set((state) => {
      const updatedCourses = state.courses.filter((course) => course.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
      return { courses: updatedCourses };
    }),
  updateCourse: (updatedCourse: Course) =>
    set((state) => {
      const updatedCourses = state.courses.map((originalCourse) =>
        originalCourse.id === updatedCourse.id ? updatedCourse : originalCourse
      );
      localStorage.setItem(LOCAL_STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
      return { courses: updatedCourses };
    }),
}));

if (typeof window !== "undefined") {
  const initialCourses = getLocalStorageData<Course[]>(LOCAL_STORAGE_KEYS.COURSES) || [];
  useCoursesStore.setState({ courses: initialCourses.flat() });
}

export default useCoursesStore;
