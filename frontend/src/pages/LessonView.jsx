const LessonView = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Lesson Content
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Watch and learn at your own pace
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-xl mb-6 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">🎥 Video player will be here</p>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Lesson Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Lesson description, resources, and materials will appear here.
        </p>
      </div>
    </div>
  );
};

export default LessonView;
