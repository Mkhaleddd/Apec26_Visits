function ProgressBar({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <div className="relative w-full lg:w-[95%] mx-auto mb-10 lg:mb-20">
      {/* Background Line */}
      <span className="block h-2 bg-red-300 dark:bg-black rounded-full"></span>

      {/* Progress Fill */}
      <span
        style={{ width: `${(currentStep - 1) * 33.3}%` }}
        className="transition-all duration-700 ease-in-out absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-md"
      ></span>

      {/* Steps */}
      <ul className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between z-30">
        {Array.from({ length: 4 }).map((_, index) => {
          const isActive = index + 1 <= currentStep;
          return (
            <li
              key={index}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500
                ${isActive ? "bg-red-600 shadow-lg scale-110" : "bg-red-400 border border-red-400 dark:bg-red-500 "}
                hover:scale-110 hover:shadow-lg cursor-pointer
              `}
            >
              <button
                className={`w-full h-full flex items-center justify-center text-white font-semibold`}
                onClick={() => {
                  if (index + 1 > currentStep) return;
                  setCurrentStep(index + 1);
                }}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProgressBar;
