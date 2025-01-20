import { Task } from "@/types/task";
import { create } from "zustand";

interface FocusState {
  stage: string;
  focusTask: Task | undefined;
  start: (focusTask: Task) => void;
  skipStage: () => void;
  exit: () => void;
  complete: () => void;
  setFocusTask: (focusTask: Task) => void;
}

// const stages = ["prepare", "breath", "visual", "task"];
const stages = ["breath", "task"];

export const useFocusStore = create<FocusState>((set) => ({
  stage: "",
  focusTask: undefined,
  setTask: (focusTask: Task) => set(() => ({ focusTask })),
  start: (focusTask: Task) => {
    set(() => ({ stage: stages[0] }));
    set(() => ({ focusTask }));
  },
  exit: () => {
    document.title = "Focus";
    set(() => ({ stage: "" }));
  },
  complete: () => set(() => ({ stage: "" })), // TODO: handle rewards on complete
  skipStage: () =>
    set((state) => {
      const currentStageIndex = stages.indexOf(state.stage);
      const nextStage = stages[currentStageIndex + 1] || "";
      return { stage: nextStage };
    }),
  setFocusTask: (focusTask: Task) => set(() => ({ focusTask })),
}));
