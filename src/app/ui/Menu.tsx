import { ReactNode } from "react";

function Menu() {
  return (
    <div className="space-x-8 rounded-full fixed bottom-14 left-1/2 transform -translate-x-1/2">
      <MenuButton>H</MenuButton>
      <MenuButton>B</MenuButton>
      <MenuButton>S</MenuButton>
      <MenuButton>R</MenuButton>
      <MenuButton>T</MenuButton>
      <MenuButton>M</MenuButton>
    </div>
  );
}

function MenuButton({ children }: { children: ReactNode }) {
  return (
    <button className="bg-neutral-800 size-[60px] text-orange-400 font-bold text-xl rounded-full">
      {children}
    </button>
  );
}

export default Menu;
