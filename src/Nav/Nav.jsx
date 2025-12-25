import React, { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button - fixed in header */}
      <div className="lg:hidden fixed top-5 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-8 h-8 text-cyan-400 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-cyan-400 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

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
