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
  title?: string;
  setDialogData: (data: any) => void;
  openDialog: (name: OpenDialogName, data?: any, title?: string) => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  openDialogName: null,
  dialogData: {},
  setDialogData: (data: any) => set({ dialogData: data }),
  openDialog: (name: OpenDialogName, data = {}, title?: string) =>
    set({ openDialogName: name, dialogData: data, title }),
  closeDialog: () => set({ openDialogName: null }),
}));

export default useDialogStore;
