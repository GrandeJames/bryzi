import { create } from "zustand";

interface FocusState {
  stage: string;
  start: () => void;
  skipStage: () => void;
  exit: () => void;
  complete: () => void;
}

const stages = ["breath", "visual", "task"];

export const useFocusStore = create<FocusState>((set) => ({
  stage: "",
  start: () => set(() => ({ stage: "breath" })),
  exit: () => set(() => ({ stage: "" })),
  complete: () => set(() => ({ stage: "" })),
  skipStage: () =>
    set((state) => {
      const currentStageIndex = stages.indexOf(state.stage);
      const nextStage = stages[currentStageIndex + 1] || "";
      return { stage: nextStage };
    }),
}));

// export function useFocus() {
//   const [stage, setStage] = useState("");
//   const stages = ["breath", "visual", "task"];

//   const start = () => {
//     setStage("breath");
//   };

//   const skipStage = () => {
//     const currentStageIndex = stages.indexOf(stage);
//     const nextStage = stages[currentStageIndex + 1];

//     if (nextStage) {
//       setStage(nextStage);
//     } else {
//       setStage("");
//     }
//   };

//   const exit = () => {
//     setStage("");
//   };

//   const complete = () => {
//     setStage("");
//     // TODO: reward points
//   };

//   return { stage, start, skipStage, exit, complete };
// }
