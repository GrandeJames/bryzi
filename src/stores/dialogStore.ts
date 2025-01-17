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
  open: (name, data = {}) => set({ openDialogName: name, dialogData: data }),
  close: () => set({ openDialogName: null }),
}));

export default useDialogStore;
