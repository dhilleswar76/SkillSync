const ProgressBar = ({ value }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        <span>Progress</span>
        <span className="text-primary font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-accent-coral h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
