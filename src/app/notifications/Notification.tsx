import { XIcon } from "lucide-react";
import { toast } from "sonner";

export default function notification(children: React.ReactNode) {
  return toast.custom((t) => (
    <div className="border dark:border-neutral-700 border-neutral-200 p-4 rounded-md bg-white dark:bg-neutral-800 shadow-md flex items-center justify-between">
      <div className="flex-1">{children}</div>

      <button onClick={() => toast.dismiss(t)} className="ml-4">
        <XIcon className="w-5 h-5 text-neutral-400" />
      </button>
    </div>
  ));
}
