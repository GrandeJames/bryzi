import { getLocalStorageData } from "@/lib/localStorageUtils";
import { FocusEntry } from "@/types/focusEntry";
import { create } from "zustand";

type State = {
  focusEntries: FocusEntry[];
  temporaryFocusEntries: FocusEntry[];
  temporaryStartDate: Date | null;
  taskId: string | null;
};

type Actions = {
  addFocusEntry: (focusEntry: FocusEntry) => void;
  addTemporaryFocusEntry: (focusEntry: FocusEntry) => void;
  intializeFocusTracker: (taskId: string) => void;
  resetFocusTracker: () => void;
};

const initialState: State = {
  focusEntries: getLocalStorageData("focusEntries"),
  temporaryFocusEntries: [],
  temporaryStartDate: null,
  taskId: null,
};

export const useFocusTrackerStore = create<State & Actions>((set) => ({
  ...initialState,
  addFocusEntry: (focusEntry) =>
    set((state) => ({
      focusEntries: [...state.focusEntries, focusEntry],
    })),
  addTemporaryFocusEntry: (focusEntry) =>
    set((state) => ({
      temporaryFocusEntries: [...state.temporaryFocusEntries, focusEntry],
    })),
  intializeFocusTracker: (taskId: string) => {
    set({ temporaryStartDate: new Date(), taskId });
  },
  resetFocusTracker: () => set(initialState),
}));
