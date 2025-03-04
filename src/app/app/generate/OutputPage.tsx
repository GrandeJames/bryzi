import GeneratedTasksList from "./GeneratedTasksList";

export default function OutputPage({
  object,
  isLoading,
  stop,
  onSaveTasks,
}: {
  object: any;
  isLoading: boolean;
  stop: () => void;
  onSaveTasks: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="my-12 space-y-2">
        <h1 className="text-3xl font-bold text-neutral-100 tracking-tight">
          Review Generated Tasks
        </h1>
        <p className="text-base text-neutral-400">
          Verify and customize tasks before saving to your schedule
        </p>
      </header>

      <GeneratedTasksList object={object} />

      <div className="sticky bottom-0 bg-gradient-to-b from-transparent via-black/50 to-black pt-20 pb-5 mt-8">
        {!isLoading ? (
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                /* TODO: Add discard logic */
              }}
              className="px-6 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800/50 transition-colors"
            >
              Discard All
            </button>
            <button
              onClick={onSaveTasks}
              className="px-6 py-2.5 rounded-lg bg-orange-400 hover:bg-orange-500 text-neutral-900 font-medium transition-colors flex items-center gap-2"
            >
              <span>Save Selected Tasks</span>
              <span className="text-sm bg-orange-600/20 px-2 py-1 rounded">
                {object?.length || 0}
              </span>
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={stop}
              className="px-6 py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors flex items-center gap-2"
            >
              <StopIcon />
              Stop Generation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StopIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M6 6h12v12H6z" />
    </svg>
  );
}
