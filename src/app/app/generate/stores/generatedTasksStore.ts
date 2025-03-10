"use client";

import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import { create } from "zustand";
interface GeneratedTasksStore {
  generatedTasks: GeneratedTask[];
  selectedGeneratedTasksIndexes: Set<number>;
  setGeneratedTasks: (tasks: GeneratedTask[]) => void;
  setSelectedGeneratedTasksIndexes: (selectedTaskIndexes: Set<number>) => void;
  removeSelectedGeneratedTaskIndex: (index: number) => void;
  addSelectedGeneratedTaskIndex: (index: number) => void;
  reset: () => void;
}

const useGeneratedTasksStore = create<GeneratedTasksStore>((set) => ({
  generatedTasks: [],
  reset: () => {
    set(() => {
      return {
        generatedTasks: [],
        selectedGeneratedTasksIndexes: new Set(),
      };
    });
  },
  setGeneratedTasks: (tasks) => {
    set(() => {
      return { generatedTasks: tasks };
    });
  },
  selectedGeneratedTasksIndexes: new Set(),
  setSelectedGeneratedTasksIndexes: (newTasks) => {
    set(() => {
      return { selectedGeneratedTasksIndexes: newTasks };
    });
  },
  removeSelectedGeneratedTaskIndex: (index) =>
    set((state) => {
      const newSet = new Set(state.selectedGeneratedTasksIndexes);
      newSet.delete(index);
      return { selectedGeneratedTasksIndexes: newSet };
    }),
  addSelectedGeneratedTaskIndex: (index) =>
    set((state) => {
      const newSet = new Set(state.selectedGeneratedTasksIndexes);
      newSet.add(index);
      return { selectedGeneratedTasksIndexes: newSet };
    }),
}));

export default useGeneratedTasksStore;
