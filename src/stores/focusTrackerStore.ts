import { FocusEntry } from "@/types/focusEntry";
import { create } from "zustand";

type State = {
  temporaryFocusEntries: FocusEntry[];
};

type Actions = {
  addTemporaryFocusEntry: (focusEntry: FocusEntry) => void;
  resetFocusTracker: () => void;
};

const initialState: State = {
  temporaryFocusEntries: [],
};

export const useFocusTrackerStore = create<State & Actions>((set) => ({
  ...initialState,
  addTemporaryFocusEntry: (focusEntry) =>
    set((state) => ({
      temporaryFocusEntries: [...state.temporaryFocusEntries, focusEntry],
    })),
  resetFocusTracker: () => set(initialState),
}));
