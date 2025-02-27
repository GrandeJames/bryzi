import useDialogStore from "../dialogs/dialogStore";

interface NewCourseButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NewCourseButton({ children, className, onClick }: NewCourseButtonProps) {
  const openDialog = useDialogStore((state) => state.openDialog);
  const openCreateCourseDialog = () => openDialog("createCourse", {}, "New Course");

  const handleNewCourseClick = (e: any) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    openCreateCourseDialog();
  };

  return (
    <button onClick={(e) => handleNewCourseClick(e)} className={className} type="button">
      {children}
    </button>
  );
}
