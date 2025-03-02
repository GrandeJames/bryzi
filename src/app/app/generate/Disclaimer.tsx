import { AlertCircleIcon } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="flex items-center space-x-5 border border-neutral-700 rounded-lg p-4 w-fit my-8">
      <AlertCircleIcon className="size-5 text-yellow-300/80 flex-shrink-0" />
      <div className="space-y-2">
        <p className="text-sm text-neutral-500">
          Ensure compliance with your institution’s AI usage and privacy policies, as well as your
          instructor’s guidelines when uploading your course schedules to be processed by OpenAI
          (creator of ChatGPT). Only proceed if you have permission to use this AI tool for task
          generation.
        </p>
        <p className="text-sm text-neutral-500">
          Your images will be temporarily stored for analysis and task generation. They’re deleted
          after task generation. Ensure your files are sensitive information-free and comply with
          policies.
        </p>
      </div>
    </div>
  );
}
