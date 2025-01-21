import { getLocalStorageData } from "@/lib/localStorageUtils";
import { FocusEntry } from "@/types/focusEntry";
import { create } from "zustand";

type State = {
  focusEntries: FocusEntry[];
  temporaryStartDate: Date | null;
  taskId: string | null;
};

type Actions = {
  addFocusEntry: (focusEntry: FocusEntry) => void;
  intializeFocusTracker: (taskId: string) => void;
};

const initialState: State = {
  focusEntries: getLocalStorageData("focusEntries"),
  temporaryStartDate: null,
  taskId: null,
};

export const useFocusTrackerStore = create<State & Actions>((set) => ({
  ...initialState,
  addFocusEntry: (focusEntry) =>
    set((state) => ({
      focusEntries: [...state.focusEntries, focusEntry],
    })),
  intializeFocusTracker: (taskId: string) => {
    set({ temporaryStartDate: new Date(), taskId });
  },
}));
