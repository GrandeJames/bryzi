import GeneratedTasksList from "./GeneratedTasksList";

export default function OutputPage({
  object,
  isLoading,
  stop,
  onSaveTasks,
}: {
  object: any;
  isLoading: any;
  stop: any;
  onSaveTasks: () => void;
}) {
  const handleDiscardClick = () => {};

  const handleSaveClick = () => {
    onSaveTasks();
  };

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold text-neutral-300">Generated Tasks</h1>
        <h2 className="text-md text-neutral-400">Please ensure that the information is correct</h2>
      </header>
      <GeneratedTasksList object={object} />
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
