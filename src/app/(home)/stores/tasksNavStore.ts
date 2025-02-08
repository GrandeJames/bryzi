import { create } from "zustand";

type NavOption = "today" | "upcoming" | "all" | "inbox" | "trash" | "completed";

interface NavState {
  activeNavItem: NavOption;
  setNavItem: (filter: NavOption) => void;
}

export const useTasksNavStore = create<NavState>((set) => ({
  activeNavItem: "today",
  setNavItem: (filter) => set({ activeNavItem: filter }),
}));
