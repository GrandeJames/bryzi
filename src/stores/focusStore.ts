import { create } from "zustand";

interface FocusState {
  stage: string;
  task: string;
  start: (task: string) => void;
  skipStage: () => void;
  exit: () => void;
  complete: () => void;
}

// const stages = ["prepare", "breath", "visual", "task"];
const stages = ["breath", "visual", "task"];


export const useFocusStore = create<FocusState>((set) => ({
  stage: "",
  task: "",
  setTask: (task: string) => set(() => ({ task })),
  start: (task: string) => {
    set(() => ({ stage: stages[0] }));
    set(() => ({ task }));
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
