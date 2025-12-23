import BtnLink from "../ui/BtnLink";

function Error({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">⚠️ An Error Occurred</h1>
      <p className="text-lg mb-2">{message}</p>
        <BtnLink to="/" title="Go to Home Page" />
    </div>
  );
}

export default Error;
