
import { create } from "zustand";

interface DialogStore {
  openDialog: string | null;
  open: (name: string) => void;
  close: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialog: null,
  open: (name) => set({ openDialog: name }),
  close: () => set({ openDialog: null }),
}));

export default useDialogStore;
