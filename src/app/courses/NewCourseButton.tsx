import useDialogStore from "../dialogs/dialogStore";

interface NewCourseButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function NewCourseButton({ children, className }: NewCourseButtonProps) {
  const openDialog = useDialogStore((state) => state.openDialog);
  const openCreateCourseDialog = () => openDialog("createCourse", {}, "New Course");

  const handleCourseAdd = (e: any) => {
    e.preventDefault();
    openCreateCourseDialog();
  };

  return (
    <button onClick={(e) => handleCourseAdd(e)} className={className}>
      {children}
    </button>
  );
}
