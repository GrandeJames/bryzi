import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { handleSessionDiscard } from "@/lib/focusSessionUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DiscardSessionButton() {
  const reset = useFocusSessionStore((state) => state.reset);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="rounded-full dark:bg-neutral-800 bg-neutral-100 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-neutral-950/70 backdrop-blur-lg dark:border-neutral-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Discard Session</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to discard your session?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:hover:bg-neutral-900 dark:bg-neutral-950 border-neutral-900">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleSessionDiscard(reset)}>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
