import { Button } from "@/components/ui/button";

export default function TaskFormSubmissionButton({
  initialTask,
  handleTaskFormSubmit,
  task,
}: {
  initialTask: any;
  handleTaskFormSubmit: any;
  task: any;
}) {
  return (
    <Button
      variant={"submit"}
      className={`w-full sticky bottom-0`}
      disabled={!task.title}
      onClick={handleTaskFormSubmit}
      type="button"
    >
      {initialTask ? "Update Task" : "Create task"}
    </Button>
  );
}
