import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import GeneratedTasksList from "./GeneratedTasksList";
import useGeneratedTasksStore from "./stores/generatedTasksStore";
import { v4 as uuidv4 } from "uuid";
import { ClassTask } from "@/types/classTask";
import { handleTasksAdd } from "@/lib/taskUtils";

export default function OutputPage({
  generatedTasks,
  isLoading,
  stop,
}: {
  generatedTasks: GeneratedTask[];
  isLoading: boolean;
  stop: () => void;
}) {
  const reset = useGeneratedTasksStore((state) => state.reset);
  const selectedGeneratedTasks = useGeneratedTasksStore(
    (state) => state.selectedGeneratedTasksIndexes
  );

  const handleDiscardClick = () => {
    console.log("Discarding all tasks");
    reset();
  };

  const handleSaveGeneratedTasksClick = () => {
    const selectedTasks = generatedTasks.filter((_, index) => selectedGeneratedTasks.has(index));

    const classTasks: ClassTask[] = selectedTasks.map((task) => {
      const deadlineDate = task.deadline?.date;
      const deadlineTime = task.deadline?.time;

      const getDeadline = () => {
        if (deadlineDate && deadlineTime) {
          return new Date(`${deadlineDate} ${deadlineTime}`);
        }
        return undefined;
      };

      // TODO: might want to create a utility function to convert generated tasks to class tasks
      return {
        id: uuidv4(),
        type: "class",
        title: task.title,
        deadline: getDeadline(),
        // impact?: number;
        // difficulty?: number;
        actualDurationInMins: 0,
        estimatedDurationInMins: task.duration,
        description: task.details,
        courseId: "", // TODO: get the course id from the selected course
        completed: false,
      };
    });

    console.log("Class Tasks:", classTasks);

    handleTasksAdd(classTasks);
    reset();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 relative">
      <header className="my-12 space-y-3">
        <h1 className="text-4xl font-extrabold dark:text-neutral-200 text-neutral-800">
          Review Generated Tasks
        </h1>
        <p className="text-lg dark:text-neutral-400 text-neutral-600 font-light">
          Verify and customize tasks before saving to your schedule
        </p>
      </header>

      <GeneratedTasksList generatedTasks={generatedTasks} />

      <div className="sticky bottom-0 bg-gradient-to-b from-transparent dark:via-black/50 via-white/50 dark:to-black to-white pt-16 pb-6 -mx-4 px-4">
        {!isLoading ? (
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDiscardClick}
              className="px-6 py-3 rounded-xl border border-neutral-700 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Discard All</span>
            </button>
            <button
              disabled={!selectedGeneratedTasks || selectedGeneratedTasks.size === 0}
              onClick={handleSaveGeneratedTasksClick}
              className="px-6 py-3 disabled:opacity-40 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-300 hover:to-amber-400 text-neutral-900 font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg shadow-orange-500/20"
            >
              <span>Save Selection</span>
              <span className="text-sm bg-orange-600/20 px-2.5 py-1 rounded-full">
                {`${selectedGeneratedTasks ? selectedGeneratedTasks?.size : 0}/${
                  generatedTasks.length
                }`}
              </span>
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={stop}
              className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-400/10 rounded-full animate-ping" />
              </div>
              <span>Stop Generation</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
