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

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        {course.title}
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {course.description}
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p>Lessons will appear here.</p>
      </div>
    </div>
  );
};

export default CourseDetails;
