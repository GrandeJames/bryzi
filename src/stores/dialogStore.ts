import { create } from "zustand";

type OpenDialogName = "create" | "edit" | "details" | null;

interface DialogStore {
  openDialogName: OpenDialogName;
  dialogData: { [key: string]: any };
  setDialogData: (data: any) => void;
  openDialog: (name: "create" | "edit" | "details", data?: any) => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialogName: null,
  dialogData: {},
  setDialogData: (data: any) => set({ dialogData: data }),
  openDialog: (name: OpenDialogName, data = {}) => set({ openDialogName: name, dialogData: data }),
  closeDialog: () => set({ openDialogName: null }),
}));

export default useDialogStore;
