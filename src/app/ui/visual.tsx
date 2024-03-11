const VISUAL_FOCUS_TIME_SECONDS = 60;

function Visual() {
  return (
    <>
      <h1>Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds </h1>
      <div className="flex items-center justify-center h-full">
        <div className="rounded-full bg-orange-300 w-10 h-10"></div>
      </div>
    </>
  );
}

export default Visual;
