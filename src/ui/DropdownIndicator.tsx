import { components } from "react-select";

const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <svg
      className="w-4 h-4 text-red-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </components.DropdownIndicator>
);

export default DropdownIndicator