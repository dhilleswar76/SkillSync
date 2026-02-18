const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
