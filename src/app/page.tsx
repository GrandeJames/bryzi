import Focus from "./ui/focus";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Focus />
      <div className="space-x-5">
        <button>Home</button>
        <button>Tasks</button>
        <button>Breathwork</button>
        <button>Sounds</button>
        <button>Rewards</button>
      </div>
    </main>
  );
}
