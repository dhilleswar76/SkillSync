import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get("/courses");
      const found = res.data.find((c) => c._id === id);
      setCourse(found);
    };

    fetchCourse();
  }, [id]);

  if (!course) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading course...</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {course.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {course.description}
        </p>

        <div className="flex gap-3 flex-wrap">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            📚 Course Material
          </span>
          <span className="px-4 py-2 bg-accent-green/10 text-accent-green rounded-full text-sm font-semibold">
            ✅ Enrolled
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📝 Course Lessons
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Lessons will appear here once they are added to the course.
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
