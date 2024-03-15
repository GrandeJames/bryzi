import { ReactNode } from "react";

function Menu() {
  /**
   * Breathwork (toggle)
   * Visual Focus ()
   * Sounds
   * Rewards
   * Todo-list
   * Settings (have the toggles here?)
   */
  return (
    <div className="space-x-8 rounded-full fixed bottom-14 left-1/2 transform -translate-x-1/2">
      <MenuButton>Rs</MenuButton>
      <MenuButton>TL</MenuButton>
      <MenuButton>Ss</MenuButton>
    </div>
  );
}

function MenuButton({ children }: { children: ReactNode }) {
  return (
    <button className="dark:bg-neutral-800 bg-gray-100 size-[60px] text-orange-400 font-bold text-xl rounded-full">
      {children}
    </button>
  );
}

export default Menu;
