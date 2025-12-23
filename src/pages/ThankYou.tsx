import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Social3D from "../ui/Social3D/Social3D";
import { FormDataContext } from "../context/FormContext";

function ThankYou() {
  const navigate = useNavigate();
  const studentDataString = localStorage.getItem("studentData");
  const studentData = studentDataString ? JSON.parse(studentDataString) : null;
  const applicantIDstring=localStorage.getItem("applicantId")
  const applicantID=applicantIDstring?JSON.parse(applicantIDstring):null;

  const { slot } = useContext(FormDataContext);

 
  useEffect(() => {
    window.onpopstate = () => {
      navigate("/", { replace: true });
    };
    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  const formattedSlot = slot ? new Date(slot).toLocaleString() : "Not selected";

  return (
    <section
      className="bg-gradient-to-r from-red-50 to-red-100 dark:from-black dark:to-gray-900  py-18 lg:py-20 text-center mx-auto rounded-3xl px-8 md:px-10 shadow-lg transition-colors duration-300"
      aria-labelledby="thank-you"
    >
      <h2
        id="thank-you"
        className="text-4xl md:text-5xl font-extrabold text-ared-600 dark:text-red-500 mb-6 uppercase tracking-wider drop-shadow-md"
      >
        🎉 Thank You for Registering!
      </h2>

      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
        We will be waiting for you on <strong>Campus (Gym Assembly Point)</strong> at <br />
        <span className="font-semibold">Faculty of Engineering, Ain Shams University</span>
        <br />
        <a
          href="https://maps.app.goo.gl/DRkC2oJFGVe6gZUw7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 dark:text-yellow-400 underline hover:text-red-700 dark:hover:text-yellow-300 transition-colors"
        >
          View on Google Maps
        </a>
        <br />
        Your slot time: <strong className="text-red-500 dark:text-red-400">{formattedSlot}</strong>
        <br />We truly appreciate your time and effort!
      </p>

      <p className="text-sm md:text-base font-semibold text-red-600 dark:text-yellow-400 mb-4">
        ⚠️ This is your unique ID. Please screenshot or save it — it will be used in group discussions!
      </p>

      <div className="flex justify-center mt-2 mb-6">
        <span className="text-3xl md:text-4xl font-extrabold text-white dark:text-black bg-red-600 dark:bg-red-800 rounded-2xl px-8 py-3 shadow-lg uppercase tracking-wider">
          {studentData?.id||applicantID}
        </span>
      </div>

      <div className="flex justify-center mt-6">
        <Social3D />
      </div>
    </section>
  );
}

export default ThankYou;
