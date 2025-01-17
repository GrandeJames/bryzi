import { create } from "zustand";
import { Task } from "@/types/task";
import { getLocalTasks } from "@/lib/localStorageTasks";

interface TasksStore {
  tasks: Task[];
  setTasks: (newTasks: Task[]) => void;
  addTask: (newTask: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}

const useTasksStore = create<TasksStore>((set) => ({
  tasks: getLocalTasks(),
  setTasks: (newTasks) => set({ tasks: newTasks }),
  addTask: (newTask: Task) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  removeTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  updateTask: (updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((originalTask) =>
        originalTask.id === updatedTask.id ? updatedTask : originalTask
      ),
    })),
}));

export default useTasksStore;
