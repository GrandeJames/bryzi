import { create } from "zustand";

interface FocusState {
  stage: string;
  start: () => void;
  skipStage: () => void;
  exit: () => void;
  complete: () => void;
}

const stages = ["breath", "visual", "task"];

export const useFocusStore = create<FocusState>((set) => ({
  stage: "",
  start: () => set(() => ({ stage: "breath" })),
  exit: () => set(() => ({ stage: "" })),
  complete: () => set(() => ({ stage: "" })), // TODO: handle rewards on complete
  skipStage: () =>
    set((state) => {
      const currentStageIndex = stages.indexOf(state.stage);
      const nextStage = stages[currentStageIndex + 1] || "";
      return { stage: nextStage };
    }),
}));
