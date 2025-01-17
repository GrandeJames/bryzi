import { create } from "zustand";

interface DialogStore {
  openDialog: string | null;
  dialogData: { [key: string]: any };
  open: (name: string, data?: any) => void;
  close: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialog: null,
  dialogData: {},
  open: (name, data = {}) => set({ openDialog: name, dialogData: data }),
  close: () => set({ openDialog: null }),
}));

export default useDialogStore;
