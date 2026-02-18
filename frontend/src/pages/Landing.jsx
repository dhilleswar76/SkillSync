import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to SkillSync
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Structured learning platform for students to track,
        complete and master courses effectively.
      </p>

      <Link
        to="/register"
        className="bg-primary text-white px-6 py-3 rounded-lg shadow"
      >
        Get Started
      </Link>
    </section>
  );
};

export default Landing;
