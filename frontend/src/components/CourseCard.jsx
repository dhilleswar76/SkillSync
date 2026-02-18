import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2">
        {course.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {course.description}
      </p>

      <ProgressBar value={course.progress || 35} />

      <Link
        to={`/course/${course._id}`}
        className="text-primary text-sm mt-4 inline-block font-medium"
      >
        Continue →
      </Link>
    </div>
  );
};

export default CourseCard;
