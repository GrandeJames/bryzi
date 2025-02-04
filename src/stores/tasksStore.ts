import { create } from "zustand";
import { ClassTask } from "@/types/classTask";
import { getLocalStorageData } from "@/lib/localStorageUtils";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

interface TasksStore {
  tasks: ClassTask[];
  setTasks: (newTasks: ClassTask[]) => void;
  addTask: (newTask: ClassTask) => void;
  removeTask: (id: string) => void;
  updateTask: (updatedTask: ClassTask) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  tasks: getLocalStorageData(LOCAL_STORAGE_KEYS.TASKS) || [],
  setTasks: (newTasks) => set({ tasks: newTasks }),
  addTask: (newTask: ClassTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (updatedTask: ClassTask) =>
    set((state) => ({
      tasks: state.tasks.map((originalTask) =>
        originalTask.id === updatedTask.id ? updatedTask : originalTask
      ),
    })),
}));

export default useTasksStore;
