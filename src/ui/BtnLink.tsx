import { Link } from "react-router";

function BtnLink({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="disabled:cursor-not-allowed   border-none  rounded-lg p-7 border-red-500 text-lg capitalize hover:bg-primaryDark transition duration-300 font-normal w-36 px-8 py-1 bg-primary text-white"
    >
      {title}
    </Link>
  );
}

export default BtnLink;
