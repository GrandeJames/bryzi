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

function DiscardSessionButton({ confirmBeforeDiscard }: { confirmBeforeDiscard?: boolean }) {
  const reset = useFocusSessionStore((state) => state.reset);

  if (confirmBeforeDiscard) {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <DiscardButton />
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-neutral-950/70 backdrop-blur-lg dark:border-neutral-900">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discard your session?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSessionDiscard(reset)}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return DiscardButton({ handleClick: () => handleSessionDiscard(reset) });
}

function DiscardButton({ handleClick }: { handleClick?: () => void }) {
  return (
    <button className="rounded-full dark:bg-neutral-800 bg-neutral-100 p-2" onClick={handleClick}>
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
    </button>
  );
}

export default DiscardSessionButton;
