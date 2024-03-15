import Focus from "./ui/Focus";
import Menu from "./ui/Menu";

export default function Page() {
  return (
    <div className="max-w-screen-lg mx-auto space-y-5">
      <main>
        <Focus />
      </main>
      <Menu />
    </div>
  );
}
