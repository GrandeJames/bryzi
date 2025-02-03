import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { getLocalStorageData } from "@/lib/localStorageUtils";
import { FocusEntry } from "@/types/focusEntry";
import { create } from "zustand";

type State = {
  temporaryFocusEntries: FocusEntry[];
  focusEntries: FocusEntry[];
};

type Actions = {
  addTemporaryFocusEntry: (focusEntry: FocusEntry) => void;
  resetFocusTracker: () => void;
  setFocusEntries: (focusEntries: FocusEntry[]) => void;
};

const initialState: State = {
  temporaryFocusEntries: [],
  focusEntries: getLocalStorageData(LOCAL_STORAGE_KEYS.FOCUS_ENTRIES) || [],
};

export const useFocusTrackerStore = create<State & Actions>((set) => ({
  ...initialState,
  addTemporaryFocusEntry: (focusEntry) =>
    set((state) => ({
      temporaryFocusEntries: [...state.temporaryFocusEntries, focusEntry],
    })),
  resetFocusTracker: () => set(initialState),
  setFocusEntries: (focusEntries: FocusEntry[]) => set({ focusEntries }),
}));
