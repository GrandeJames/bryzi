import { PersonalTask } from "@/types/personalTask";
import useDialogStore from "../dialogs/dialogStore";

function PersonalTaskItem({ personalTask }: { personalTask: PersonalTask }) {
  const open = useDialogStore((state) => state.openDialog);
  const openPersonalTaskDetailsDialog = () => open("personalTaskDetails", { task: personalTask });

  return (
    <div
      className="grid grid-cols-4 py-5 px-6 bg bg-neutral-900/60 rounded-3xl"
      onClick={() => {
        openPersonalTaskDetailsDialog();
      }}
    >
      <div className="flex flex-col col-span-3">
        <div className="font-semibold text-neutral-200">{personalTask.title}</div>
      </div>
      <div className="mx-auto border rounded-md border-neutral-700 size-5"></div>
    </div>
  );
}

export default PersonalTaskItem;
