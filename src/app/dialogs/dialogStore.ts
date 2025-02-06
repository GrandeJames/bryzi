import { create } from "zustand";

type OpenDialogName =
  | "createClassTask"
  | "editClassTask"
  | "classTaskDetails"
  | "createPersonalTask"
  | "editPersonalTask"
  | "personalTaskDetails"
  | null;

interface DialogStore {
  openDialogName: OpenDialogName;
  dialogData: { [key: string]: any };
  setDialogData: (data: any) => void;
  openDialog: (name: OpenDialogName, data?: any) => void;
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
