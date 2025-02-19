export default function TaskFormButton({
  initialTask,
  handleTaskFormSubmit,
  task,
}: {
  initialTask: any;
  handleTaskFormSubmit: any;
  task: any;
}) {
  return (
    <button
      className={`bg-orange-400 py-2 px-4 rounded-lg w-full font-bold sticky bottom-0 disabled:bg-orange-200 text-white`}
      disabled={!task.title}
      onClick={handleTaskFormSubmit}
    >
      {initialTask ? "Update Task" : "Create task"}
    </button>
  );
}
