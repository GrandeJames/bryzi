import { create } from "zustand";

interface DialogStore {
  openDialogName: string | null;
  dialogData: { [key: string]: any };
  open: (name: string, data?: any) => void;
  close: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialogName: null,
  dialogData: {},
  open: (name, data = {}) => set({ openDialog: name, dialogData: data }),
  close: () => set({ openDialog: null }),
}));

export default useDialogStore;
