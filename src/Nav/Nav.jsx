const Nav = ({ isOpen, setIsOpen }) => {
  const links = ["About", "Works", "Projects", "Blogs", "Contact"];
  return (
    <div className={`lg:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-12 transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {links.map((link, i) => (
        <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)}
          className={`text-2xl font-medium transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
          style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : "0ms" }}>{link}</a>
      ))}
    </div>
  );
};
export default Nav;
