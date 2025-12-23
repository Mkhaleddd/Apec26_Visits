import Logo from "../../public/marwa7t APEC.png"

function Header() {
  return (
    <header className="flex justify-center gap-x-2 py-10 mb-5 lg:mb-10">
      <img
        className=" h-12 md:h-16 lg:h-24 spinner"
        src={Logo}
      />
      <img
        className="h-10 md:h-14 lg:h-20"
        src="https://apeceg.com/APEC-Premium-2025/APEC1.png"
        alt="Logo2"
      />
    </header>
  );
}

export default Header;
