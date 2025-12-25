import React from "react";

const Nav = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-12 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="#about"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
        >
          About
        </a>
        <a
          href="#works"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "150ms" : "0ms" }}
        >
          Works
        </a>
        <a
          href="#projects"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
        >
          Projects
        </a>
        <a
          href="#blogs"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "250ms" : "0ms" }}
        >
          Blogs
        </a>
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium text-gray-400 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Nav;
