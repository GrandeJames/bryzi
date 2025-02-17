"use client";

import { getCourses } from "./courseUtils";

export default function CourseSelector() {
  const handleCourseAdd = () => {
    console.log("Add Course");
  };

  return (
    <div>
      <div>
        {getCourses()?.map((course) => (
          <div key={course.id}>
            <h2>{course.name}</h2>
          </div>
        ))}
        <button onClick={handleCourseAdd}>Add Course</button>
      </div>
    </div>
  );
}
