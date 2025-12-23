import { FC, ReactNode } from "react";

interface ButtonProps {
  children: string | ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, type, onClick, isLoading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative group overflow-hidden flex items-center justify-center
        w-24 lg:w-36 px-4 py-2 rounded-lg font-medium
        text-white
        bg-red-700 dark:bg-darkPrimary
        hover:bg-primaryDark dark:hover:bg-darkPrimaryDark
        active:scale-95
        transition-all duration-300 ease-in-out
        shadow-md hover:shadow-lg
        disabled:cursor-not-allowed disabled:bg-red-400
      `}
    >
      {/* Shine effect */}
      <span className="
        absolute top-0 left-[-75%] w-20 h-full
        bg-white opacity-0 transform -skew-x-12
        pointer-events-none
        group-hover:opacity-30 group-hover:animate-shine
      "></span>

      {/* Loading spinner */}
      {isLoading && (
        <span className="
          absolute left-3 w-5 h-5
          border-2 border-white border-t-transparent
          rounded-full animate-spin
        "></span>
      )}

      {/* Button text */}
      <span className={`transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        {children}
      </span>
    </button>
  );
};

export default Button;
