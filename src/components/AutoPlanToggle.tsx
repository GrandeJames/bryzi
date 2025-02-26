import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

function AutoPlanToggle() {
  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <button className="border-orange-400 dark:bg-orange-400/30 bg-orange-400/20 dark:text-orange-400 text-orange-400 font-semibold text-[0.7rem] px-3 rounded-full flex gap-1 items-center h-min py-1 hover:dark:bg-orange-400/15">
          <span>AUTO PLAN</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 text-sm dark:bg-neutral-950/70 backdrop-blur-lg dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-300 mt-1">
          Tasks are automatically selected and organized to present you with a list of tasks and
          their respective order, eliminating the need for manual planning.
        </p>
        {/* <Link href="/feedback" className="mt-2 inline-block text-blue-500 hover:underline">
        Give Feedback →
      </Link> */}
      </HoverCardContent>
    </HoverCard>
  );
}

export default AutoPlanToggle;
