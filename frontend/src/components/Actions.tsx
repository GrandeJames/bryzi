function ActionsContainer({ children }: { children: React.ReactNode }) {
  return <div className="fixed flex flex-col gap-3 right-10 bottom-1/2">{children}</div>;
}

export default ActionsContainer;
