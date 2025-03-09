"use client";

import { create } from "zustand";
import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";

interface GeneratedTasksStore {
  generatedTasks: GeneratedTask[];
  setGeneratedTasks: (newTasks: GeneratedTask[]) => void;
}

const useGeneratedTasksStore = create<GeneratedTasksStore>((set) => ({
  generatedTasks: [],
  setGeneratedTasks: (newTasks: GeneratedTask[]) => {
    set(() => {
      return { generatedTasks: newTasks };
    });
  },
}));

export default useGeneratedTasksStore;
