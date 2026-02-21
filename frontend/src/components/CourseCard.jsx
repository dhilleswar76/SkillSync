import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition">
          {course.title}
        </h3>
        <span className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-semibold rounded-full">
          Active
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {course.description}
      </p>

      <ProgressBar value={course.progress || 35} />

      <Link
        to={`/course/${course._id}`}
        className="text-primary hover:text-primary-dark text-sm mt-4 inline-flex items-center font-semibold group-hover:gap-2 transition-all"
      >
        Continue Learning 
        <span className="ml-1 group-hover:ml-2 transition-all">→</span>
      </Link>
    </div>
  );
};

export default CourseCard;
