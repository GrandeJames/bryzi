import { create } from "zustand";

interface FocusState {
  stage: string;
  focusTask: string;
  start: (task: string) => void;
  skipStage: () => void;
  exit: () => void;
  complete: () => void;
}

// const stages = ["prepare", "breath", "visual", "task"];
const stages = ["breath", "task"];


export const useFocusStore = create<FocusState>((set) => ({
  stage: "",
  focusTask: "",
  setTask: (task: string) => set(() => ({ focusTask: task })),
  start: (task: string) => {
    set(() => ({ stage: stages[0] }));
    set(() => ({ focusTask: task }));
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
}));
