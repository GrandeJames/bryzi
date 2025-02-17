import useDialogStore from "../dialogs/dialogStore";

interface NewCourseButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function NewCourseButton({ children, className }: NewCourseButtonProps) {
  const openDialog = useDialogStore((state) => state.openDialog);
  const openCreateCourseDialog = () => openDialog("createCourse", {}, "New Course");

  const handleCourseAdd = () => {
    openCreateCourseDialog();
  };

  return (
    <button onClick={handleCourseAdd} className={className}>
      {children}
    </button>
  );
}
