import { Task } from "@/types/task";
import { create } from "zustand";

interface FocusState {
  sessionStage?: string;
  sessionTask?: Task;
  startSession: (focusTask: Task) => void;
  skipSessionStage: () => void;
  exitSession: () => void;
  completeSession: () => void;
  setSessionTask: (focusTask: Task) => void;
}

// const stages = ["prepare", "breath", "visual", "task"];
const STAGES = ["breath", "task"];

export const useFocusSessionStore = create<FocusState>((set) => ({
  sessionStage: undefined,
  sessionTask: undefined,
  setTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
  startSession: (focusTask: Task) => {
    set(() => ({ sessionStage: STAGES[0] }));
    set(() => ({ sessionTask: focusTask }));
  },
  exitSession: () => {
    document.title = "Focus";
    set(() => ({ sessionStage: undefined }));
  },
  completeSession: () => set(() => ({ sessionStage: undefined })),
  skipSessionStage: () =>
    set((state) => {
      const currentStageIndex = STAGES.indexOf(state.sessionStage!);
      const nextStage = STAGES[currentStageIndex + 1];
      return { sessionStage: nextStage };
    }),
  setSessionTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
}));
