import { Task } from "@/types/task";
import { create } from "zustand";

// TODO: handle edge cases such as timer only
const STAGES = ["timer"];
const OPTIONAL_STAGES: string[] = ["breath"];

STAGES.unshift(...OPTIONAL_STAGES);

type State = {
  sessionStage?: string;
  sessionTask?: Task;
};

type Actions = {
  initializeSession: (focusTask: Task) => void;
  proceedToNextStage: () => void;
  setSessionTask: (focusTask: Task) => void;
  reset: () => void;
};

const initialState: State = {
  sessionStage: undefined,
  sessionTask: undefined,
};

export const useFocusSessionStore = create<State & Actions>((set) => ({
  ...initialState,
  focusTimes: [],
  reset: () => set(initialState),
  setSessionTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
  initializeSession: (focusTask: Task) => {
    set(() => ({ sessionStage: STAGES[0], sessionTask: focusTask }));
  },
  proceedToNextStage: () => {
    set((state) => {
      const currentStageIndex = STAGES.indexOf(state.sessionStage!);
      const nextStage = STAGES[currentStageIndex + 1];

      return { sessionStage: nextStage };
    });
  },
}));
