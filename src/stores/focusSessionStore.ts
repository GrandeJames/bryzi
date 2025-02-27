import { getNextStage } from "@/lib/focusSessionUtils";
import { ClassTask } from "@/types/classTask";
import { create } from "zustand";

// TODO: handle edge cases such as timer only
const STAGES = ["timer"];
const OPTIONAL_STAGES: string[] = [];

STAGES.unshift(...OPTIONAL_STAGES);

type State = {
  sessionStage?: string;
  sessionTask?: ClassTask;
};

type Actions = {
  initializeSession: (focusTask: ClassTask) => void;
  proceedToNextStage: () => void;
  setSessionTask: (focusTask: ClassTask) => void;
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
  setSessionTask: (focusTask: ClassTask) => set(() => ({ sessionTask: focusTask })),
  initializeSession: (sessionTask: ClassTask) => {
    set((state) => ({ sessionStage: getNextStage(state.sessionStage), sessionTask }));
  },
  proceedToNextStage: () => {
    set((state) => ({
      sessionStage: getNextStage(state.sessionStage),
    }));
  },
}));

export { STAGES };
