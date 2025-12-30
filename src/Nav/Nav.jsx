const Nav = ({ isOpen, setIsOpen }) => {
  const base = `text-2xl font-medium transition-all duration-300 ${
    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
  }`;
  return (
    <div
      className={`lg:hidden h-screen z-40 fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-12 transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="#about"
        onClick={() => setIsOpen(false)}
        className={base}
        style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
      >
        About
      </a>
      <a
        href="#projects"
        onClick={() => setIsOpen(false)}
        className={base}
        style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
      >
        Projects
      </a>
      <a
        href="#contact"
        onClick={() => setIsOpen(false)}
        className={base}
        style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
      >
        Contact
      </a>
    </div>
  );
};
export default Nav;
