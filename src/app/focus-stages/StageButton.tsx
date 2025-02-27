interface StageButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
}

export default function StageButton({ onClick, icon }: StageButtonProps) {
  return (
    <button className="rounded-full dark:bg-neutral-800 bg-neutral-100 p-2" onClick={onClick}>
      {icon}
    </button>
  );
}
