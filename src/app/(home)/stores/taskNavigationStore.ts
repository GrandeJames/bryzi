import { create } from "zustand";

type NavOption = "today" | "tomorrow" | "nextSevenDays";

interface NavState {
  activeNavItem: NavOption;
  setNavItem: (filter: NavOption) => void;
}

export const useTaskNavigationStore = create<NavState>((set) => ({
  activeNavItem: "today",
  setNavItem: (filter) => set({ activeNavItem: filter }),
}));
