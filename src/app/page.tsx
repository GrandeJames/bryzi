import { Focus } from "./Focus";
import { Menu } from "../components/Menu";

export default function Page() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto space-y-5 py-5">
        <Focus />
      </div>
      <Menu />
    </>
  );
}
