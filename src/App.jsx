import "./App.css";
import { useRef, useState, useEffect, useCallback } from "react";
import Snow from "./Snow/Snow.jsx";
import Fireworks from "./Fireworks/Fireworks.jsx";
import Dvd from "./Dvd/Dvd.jsx";
import Cube from "./Cube/Cube.jsx";
import Action from "./Action/Action.jsx";
import Featured from "./Featured/Featured.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import Photogrid from "./Photogrid/Photogrid.jsx";
import faceImg from "./assets/images/face.webp";
import Contact from "./Contact/Contact.jsx";
import Wall from "./Wall/Wall.jsx";
import Footer from "./Footer/Footer.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

const isDate = ((month, start, end) => {
  const now = new Date();
  const isCurrentMonth = now.getMonth() + 1 === month;
  const isInDayRange = now.getDate() >= start && now.getDate() <= end;
  return isCurrentMonth && isInDayRange;
});

/* --- SVG icon components --- */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" /></svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

const socials = [
  { icon: GithubIcon, url: "https://www.github.com/arjc", label: "GitHub" },
  { icon: LinkedinIcon, url: "https://www.linkedin.com/in/arjc", label: "LinkedIn" },
  { icon: InstagramIcon, url: "https://www.instagram.com/arjcig", label: "Instagram" },
];

const navLinks = [
  { label: "dev", url: "https://dev.arjc.me" },
  { label: "music", url: "https://music.arjc.me" },
  { label: "blog", url: "https://blogs.arjc.me" },
  { label: "contact", url: "#contact" },
];

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

const routes = {
  '/': 'section-hero',
  '/home': 'section-home',
  '/gallery': 'section-gallery',
  '/contact': 'section-contact',
  '/comment': 'section-comment',
};

function AppContent() {
  const { isMalayalam, toggle } = useLanguage();
  const [is404, setIs404] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const sectionId = routes[path];

    if (sectionId !== undefined) {
      setIs404(false);
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      setIs404(true);
    }
  }, [scrollToSection]);

  const navigateTo = (path) => {
    const sectionId = routes[path];
    if (sectionId !== undefined) {
      scrollToSection(sectionId);
      window.history.pushState({}, '', path);
    }
  };

  if (is404) {
    return <NotFound />;
  }

  return (
    <>
      <Dvd className="h-screen w-screen z-1000" />
      <div>
        {isDate(12, 1, 31) && <Snow />}
        {isDate(1, 1, 2) && <Fireworks className="absolute" />}

        {/* --- navbar --- */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-dashed border-[#333]">
          <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 h-14 sm:h-16 max-w-6xl mx-auto">

            {/* left: logo */}
            <div className="flex items-center gap-3 font-dev" onClick={() => navigateTo('/')} style={{ cursor: "pointer" }}>
              <img className="h-8 sm:h-9 rounded-full opacity-90" src={faceImg} alt="achu face logo" />
              {isMalayalam ? <span className="text-sm sm:text-base tracking-wide">അർജസ</span> : <span className="text-sm sm:text-base tracking-widest">arjc.me</span>}
            </div>

            {/* middle: nav links (desktop) */}
            <div className="hidden sm:flex items-center gap-6 font-dev text-xs tracking-wider">
              {navLinks.map((link) => (
                <a key={link.label} href={link.url} className="text-[#666] hover:text-white border-b border-dashed border-transparent hover:border-[#555] pb-0.5 transition-all duration-300">
                  {link.label}
                </a>
              ))}
            </div>

            {/* right: language + social icons (desktop) */}
            <div className="hidden sm:flex items-center gap-5">
              {/* language switcher */}
              {/* social icons */}
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-all duration-300 flex items-center justify-center" title={s.label}>
                  <s.icon />
                </a>
              ))}
              <button
                onClick={toggle}
                className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-[#444] rounded-sm text-[#666] hover:text-white hover:border-[#666] transition-all duration-300 text-xs font-dev"
                title="Toggle language"
              >
                <GlobeIcon />
                <span>{isMalayalam ? "mal" : "eng"}</span>
              </button>
            </div>

            {/* mobile: hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden flex items-center justify-center text-[#888] hover:text-white border-none p-0"
              aria-label="Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* mobile dropdown */}
          {menuOpen && (
            <div className="sm:hidden border-t border-dashed border-[#222] bg-black/95 backdrop-blur-md px-6 py-4 font-dev text-xs tracking-wider">
              <div className="flex flex-col gap-3 mb-4">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.url} className="text-[#777] hover:text-white border-none py-1 transition-all duration-300" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
              </div>
              <hr className="dash-sep mb-3" />
              <div className="flex items-center gap-3">
                {/* language switcher */}
                <button
                  onClick={() => { toggle(); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-2 py-1.5 border border-dashed border-[#444] rounded-sm text-[#777] hover:text-white hover:border-[#666] transition-all duration-300"
                  title="Toggle language"
                >
                  <GlobeIcon />
                  <span>{isMalayalam ? "mal" : "eng"}</span>
                </button>
                {/* social icons */}
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white border-none transition-all duration-300" title={s.label}>
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- hero / cube --- */}
        <section id="section-hero" className="min-h-screen flex items-center justify-center">
          <Cube />
        </section>

        {/* --- main content --- */}
        <div id="section-home">
          <Action scrollToSection={scrollToSection} />
          <Featured />
          <div id="section-gallery">
            <Gallery />
          </div>
          <Photogrid />
          <div id="contact"></div>
          <div id="section-contact">
            <Contact />
          </div>
          <div id="section-comment">
            <Wall />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;