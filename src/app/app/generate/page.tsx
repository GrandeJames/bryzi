"use client";

import { MultiFileUpload } from "@/components/FileUpload";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const sampleGeneratedTasks = [
  {
    title: "Complete HW 1 Students Orientation",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["mon"],
    },
    deadline: {
      dueDate: "01-22",
      dueTime: "",
    },
    impact: 80,
    difficulty: 2,
    estimatedDurationInMins: 60,
    description: "Complete the first homework assignment for student orientation.",
  },
  {
    title: "Complete Excel HW 2 Students Orientation",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["wed"],
    },
    deadline: {
      dueDate: "01-24",
      dueTime: "",
    },
    impact: 35,
    difficulty: 2,
    estimatedDurationInMins: 45,
    description: "Complete the second homework assignment for student orientation.",
  },
  {
    title: "Complete HW General Ledger HW 3",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["mon"],
    },
    deadline: {
      dueDate: "01-29",
      dueTime: "",
    },
    impact: 90,
    difficulty: 3,
    estimatedDurationInMins: 90,
    description: "Complete the homework assignment on General Ledger.",
  },
  {
    title: "Test on Ch. 1",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["wed"],
    },
    deadline: {
      dueDate: "01-31",
      dueTime: "",
    },
    impact: 90,
    difficulty: 3,
    estimatedDurationInMins: 120,
    description: "Test covering Chapter 1.",
  },
  {
    title: "Test on Ch. 2",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["tue"],
    },
    deadline: {
      dueDate: "02-14",
      dueTime: "",
    },
    impact: 75,
    difficulty: 3,
    estimatedDurationInMins: 120,
    description: "Test covering Chapter 2.",
  },
  {
    title: "Test on Ch. 3",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["tue"],
    },
    deadline: {
      dueDate: "02-28",
      dueTime: "",
    },
    impact: 80,
    difficulty: 3,
    estimatedDurationInMins: 120,
    description: "Test covering Chapter 3.",
  },
  {
    title: "Test on Ch. 5 and 6",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["tue"],
    },
    deadline: {
      dueDate: "03-13",
      dueTime: "",
    },
    impact: 100,
    difficulty: 3,
    estimatedDurationInMins: 120,
    description: "Test covering Chapters 5 and 6.",
  },
  {
    title: "Test on Ch. 7 and 8",
    frequency: {
      frequency: "once",
      occurrences: 1,
      daysOfWeek: ["tue"],
    },
    deadline: {
      dueDate: "03-27",
      dueTime: "",
    },
    impact: 100,
    difficulty: 3,
    estimatedDurationInMins: 120,
    description: "Test covering Chapters 7 and 8.",
  },
];

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<any[]>([]);

  const handleGenerateClick = async () => {
    // const formData = new FormData();
    // const files = (document.querySelector('input[type="file"]') as HTMLInputElement)?.files;
    // if (!files) {
    //   alert("Please select a file.");
    //   return;
    // }
    // for (const file of Array.from(files)) {
    //   formData.append("files", file);
    // }

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      // header
      // body: formData,
    });

    if (!res.ok) {
      alert("Failed to generate class tasks");
      return;
    }

    const result = await res.json();
    console.log(result);
    setGeneratedTasks(result.tasks);

    // TODO: delete the image(s) from the server after processing

    setLoading(false);
  };

  const handleDiscardClick = () => {
    setGeneratedTasks([]);
  };

  const handleSaveClick = () => {
    const convertedTasks = generatedTasks.map((generatedTask) => ({
      ...generatedTask,

      id: uuidv4(),
      completed: false,
      type: "class",
      actualDurationInMins: 0,
    }));

    console.log("convertedTasks", convertedTasks);

    const saveConvertedTasks = async (tasks: any[]) => {
      console.log("saving coonverted tasks");
    };

    saveConvertedTasks(convertedTasks);
  };

  return (
    <div>
      {generatedTasks.length > 0 && (
        <div className="container max-w-3xl">
          <h1 className="text-2xl font-bold">Generated Tasks</h1>
          <ul className="flex flex-col gap-2">
            {generatedTasks.map((task, index) => (
              <li key={index} className="px-3 py-2 border border-gray-300 rounded-md max-w-3xl">
                {task.title}
              </li>
            ))}
          </ul>
          <div>
            <div className="flex justify-end gap-10">
              <button className="bg-white text-black" onClick={handleDiscardClick}>
                Discard
              </button>
              <button
                className="flex flex-grow justify-center max-w-xs bg-orange-400"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {generatedTasks.length === 0 && (
        <div>
          <h1>Generate Class Tasks</h1>
          <div>
            <MultiFileUpload />
          </div>
          <div>Options:</div>
          <p className="text-sm text-neutral-500 max-w-[50ch]">
            Privacy: Your files are stored temporarily to be processed by OpenAI to extract your
            course schedule and generate the tasks. Ensure that your files do not contain any
            sensitive information, and you are comfortable sharing them with OpenAI.
          </p>
          <p>Honor code: </p>
          <button className="bg-orange-500 px-20 py-3" onClick={handleGenerateClick}>
            Generate class tasks
          </button>
          {loading && <p>Generating...</p>}
        </div>
      )}
    </div>
  );
}
