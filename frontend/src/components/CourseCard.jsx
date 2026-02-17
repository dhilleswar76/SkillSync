import { Link } from 'react-router-dom';

const CourseCard = ({ course, enrolled }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {course.lessons?.length || 0} lessons
          </span>
          {course.level && (
            <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {course.level}
            </span>
          )}
        </div>
        
        {enrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <Link
          to={`/courses/${course._id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {enrolled ? 'Continue Learning' : 'View Course'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
