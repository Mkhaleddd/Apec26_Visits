import APEC from "../../public/marwa7t APEC.png";
import Siemens from "../../public/Siemens-Logo.png";
import Alumil from "../../public/alumil-logo.png";

function Heading() {
  return (
    <div className="my-16 md:my-24 text-center">
      {/* Titles */}
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-widest text-red-700 drop-shadow-lg">
        APEC&apos;26
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-red-600 mt-4 drop-shadow-sm">
        Visits
      </h3>
      <div className="mt-4 w-32 md:w-48 h-1 bg-red-700 mx-auto rounded-full animate-pulse" />

      {/* Sponsors Statement */}
      <p className="mt-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
        We proudly thank our sponsors for their invaluable support in making APEC&apos;26
        a remarkable experience. Their partnership drives innovation, excellence, and opportunities for
        all participants.
      </p>

      {/* Diamond Grid */}
      <div className="relative mt-12 w-64 h-64 md:w-80 md:h-80 mx-auto">
        {/* Top-right: Alumil */}
        <a
          href="https://www.alumil.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 transform -rotate-45 border border-red-700 rounded-lg flex items-center justify-center bg-white dark:bg-black shadow-lg transition-transform hover:scale-110"
        >
          <img
            src={Alumil}
            alt="Alumil Logo"
            className="w-3/4 h-3/4 object-contain transform rotate-45"
          />
        </a>

        {/* Center: APEC */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-40 h-32 md:h-40 transform rotate-45 border border-red-700 rounded-lg flex items-center justify-center bg-white dark:bg-black shadow-xl">
          <img
            src={APEC}
            alt="APEC Logo"
            className="w-3/4 h-3/4 object-contain transform -rotate-45"
          />
        </div>

        {/* Bottom-left: Siemens */}
        <a
          href="https://www.siemens.com/eg/en.html"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-0 left-0 w-24 md:w-32 h-24 md:h-32 transform -rotate-45 border border-red-700 rounded-lg flex items-center justify-center bg-white dark:bg-black shadow-lg transition-transform hover:scale-110"
        >
          <img
            src={Siemens}
            alt="Siemens Logo"
            className="w-3/4 h-3/4 object-contain transform rotate-45"
          />
        </a>
      </div>
    </div>
  );
}

export default Heading;
