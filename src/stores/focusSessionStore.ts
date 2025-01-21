import { Task } from "@/types/task";
import { create } from "zustand";

interface FocusState {
  sessionStage: string;
  sessionTask: Task | undefined;
  startSession: (focusTask: Task) => void;
  skipSessionStage: () => void;
  exitSession: () => void;
  completeSession: () => void;
  setSessionTask: (focusTask: Task) => void;
}

// const stages = ["prepare", "breath", "visual", "task"];
const stages = ["breath", "task"];

export const useFocusSessionStore = create<FocusState>((set) => ({
  sessionStage: "",
  sessionTask: undefined,
  setTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
  startSession: (focusTask: Task) => {
    set(() => ({ sessionStage: stages[0] }));
    set(() => ({ sessionTask: focusTask }));
  },
  exitSession: () => {
    document.title = "Focus";
    set(() => ({ sessionStage: "" }));
  },
  completeSession: () => set(() => ({ sessionStage: "" })), // TODO: handle rewards on complete
  skipSessionStage: () =>
    set((state) => {
      const currentStageIndex = stages.indexOf(state.sessionStage);
      const nextStage = stages[currentStageIndex + 1] || "";
      return { sessionStage: nextStage };
    }),
  setSessionTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
}));
