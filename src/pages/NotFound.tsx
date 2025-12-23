import BtnLink from "../ui/BtnLink";

function NotFound() {
  return (
    <div className="bg-white dark:bg-black h-screen flex justify-center items-center m-auto p-10 lg:p-10">
      <div>
        <h3 className="uppercase text-center text-3xl text-primary dark:text-white font-bold tracking-[10px]">
          404 not found!
        </h3>
        <p className="capitalize text-center text-2xl my-3 text-black dark:text-white">
          The page you are looking for does not exist
        </p>
        <div className="text-center mb-4">
          <BtnLink to="/" title="go to home page" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
