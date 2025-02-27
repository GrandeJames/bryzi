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

export const useFocusTrackerStore = create<State & Actions>((set) => ({
  temporaryFocusEntries: [],
  focusEntries: getLocalStorageData(LOCAL_STORAGE_KEYS.FOCUS_ENTRIES) || [],
  addTemporaryFocusEntry: (focusEntry) =>
    set((state) => ({
      temporaryFocusEntries: [...state.temporaryFocusEntries, focusEntry],
    })),
  resetFocusTracker: () =>
    set({
      temporaryFocusEntries: [],
      focusEntries: getLocalStorageData(LOCAL_STORAGE_KEYS.FOCUS_ENTRIES) || [],
    }),
  setFocusEntries: (focusEntries: FocusEntry[]) => set({ focusEntries }),
}));
