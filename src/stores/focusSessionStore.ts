import { Task } from "@/types/task";
import { create } from "zustand";

// TODO: handle edge cases such as timer only
const STAGES = ["timer"];
const OPTIONAL_STAGES = ["breath"];

STAGES.unshift(...OPTIONAL_STAGES);

type State = {
  sessionStage?: string;
  sessionTask?: Task;
  focusStartDate?: Date;
};

type Actions = {
  startSession: (focusTask: Task) => void;
  nextSessionStage: () => void;
  setSessionTask: (focusTask: Task) => void;
  reset: () => void;
};

const initialState: State = {
  sessionStage: undefined,
  sessionTask: undefined,
  focusStartDate: undefined,
};

export const useFocusSessionStore = create<State & Actions>((set) => ({
  ...initialState,
  focusTimes: [],
  reset: () => set(initialState),
  setSessionTask: (focusTask: Task) => set(() => ({ sessionTask: focusTask })),
  startSession: (focusTask: Task) => {
    set(() => ({ sessionStage: STAGES[0] }));
    set(() => ({ sessionTask: focusTask }));
  },
  nextSessionStage: () => {
    set((state) => {
      const currentStageIndex = STAGES.indexOf(state.sessionStage!);
      const nextStage = STAGES[currentStageIndex + 1];

      return { sessionStage: nextStage };
    });
  },
}));
