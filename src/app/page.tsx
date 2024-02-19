import Focus from "./ui/focus"
export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Focus />
      <div className="flex gap-3">
        <button>Todo</button>
        <button>Breathwork</button>
        <button>Sounds</button>
        <button>Focus</button>
        <button>Rewards</button>
      </div>
    </main>
  )
}
