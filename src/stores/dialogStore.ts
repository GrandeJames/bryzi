import { create } from "zustand";

type OpenDialogName = "create" | "edit" | "details" | null;

interface DialogStore {
  openDialogName: OpenDialogName;
  dialogData: { [key: string]: any };
  open: (name: "create" | "edit" | "details", data?: any) => void;
  close: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialogName: null,
  dialogData: {},
  open: (name: OpenDialogName, data = {}) => set({ openDialogName: name, dialogData: data }),
  close: () => set({ openDialogName: null }),
}));

export default useDialogStore;
