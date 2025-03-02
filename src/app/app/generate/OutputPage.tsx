import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";

export default function OutputPage({
  object,
  isLoading,
  stop,
}: {
  object: any;
  isLoading: any;
  stop: any;
}) {
  const handleDiscardClick = () => {};

  const handleSaveClick = () => {
    const convertedClassTasks = object?.map((task: any) => ({
      ...task,
      id: uuidv4(),
      completed: false,
      actualDurationInMins: 0,
    }));
  };

  const handleGeneratedTaskClick = (generatedTask: any) => {
    console.log("generatedTask clicked", generatedTask);
  };

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold text-neutral-300">Generated Tasks</h1>
        <h2 className="text-md text-neutral-400">Please ensure that the information is correct</h2>
      </header>
      <div className="grid grid-cols-1 gap-3">
        {object?.map((generatedTask: any, index: any) => (
          <div
            key={index}
            className="border border-neutral-800 bg-neutral-900/70 rounded-2xl p-4 col-span-1 grid grid-cols-12 relative"
            onClick={() => handleGeneratedTaskClick(generatedTask)}
          >
            <div className="col-span-11">
              <div className="font-semibold text-base">{generatedTask?.title}</div>
              <div className="flex gap-4">
                <div className="text-sm flex gap-1 items-center text-neutral-400">
                  {/* <FlagIcon className="size-3" /> {generatedTask?.deadline?.dueDate}{" "} */}
                  Due: {generatedTask?.deadline?.dueDate} {generatedTask?.deadline?.dueTime} 3:30 PM
                </div>
                <div className="text-sm flex gap-1 items-center text-neutral-400">
                  Duration: {generatedTask?.estimatedDurationInMins} m
                </div>
                <div className="text-sm flex gap-1 items-center text-neutral-400">
                  {generatedTask?.difficulty} Effort
                </div>
                <div className="text-sm flex gap-1 items-center text-neutral-400">
                  {generatedTask?.impact} Impact
                </div>
              </div>
            </div>
            <Checkbox
              defaultChecked={true}
              className="absolute right-3 top-3 rounded-lg size-5 dark:data-[state=checked]:bg-orange-500/80 dark:data-[state=checked]:text-white data-[state=checked]:border-none data-[state=unchecked]:bg-neutral-800 data-[state=unchecked]:text-neutral-400"
            />
          </div>
        ))}
      </div>
      {!isLoading && (
        <div className="flex justify-end gap-8 my-5">
          <button onClick={handleDiscardClick} className="">
            Discard
          </button>
          <button onClick={handleSaveClick} className="bg-orange-400 py-3 px-8 rounded-lg">
            Save checked tasks
          </button>
        </div>
      )}
      {isLoading && (
        <button type="button" onClick={() => stop()}>
          Stop
        </button>
      )}
    </div>
  );
}
