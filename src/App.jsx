import "./App.css";
import { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Snow from "./Snow/Snow.jsx";
import Fireworks from "./Fireworks/Fireworks.jsx";
import Dvd from "./Dvd/Dvd.jsx";
import Cube from "./Cube/Cube.jsx";
import Action from "./Action/Action.jsx";
import Featured from "./Featured/Featured.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import Photogrid from "./Photogrid/Photogrid.jsx";

import regface from "./assets/images/face.webp";
import xmasface from "./assets/images/faceXmas.png"
import gta6face from "./assets/images/face6.png";

import Contact from "./Contact/Contact.jsx";
import Wall from "./Wall/Wall.jsx";
import Footer from "./Footer/Footer.jsx";
import NotFound from "./Pages/NotFound.jsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

export const event6start = 10, event6end = 30;
const novSnowStart = 15; 

let dateObj = new Date();
export const isDate = ((month, start, end) => {
  const now = new Date();
  const isCurrentMonth = now.getMonth() + 1 === month;
  const isInDayRange = now.getDate() >= start && now.getDate() <= end;
  return isCurrentMonth && isInDayRange ? true : false;
});

export const faceImg = isDate(11, event6start, event6end) ? gta6face : isDate(12, 1, 31) ? xmasface : regface; 

function App() {
  const parallaxRef = useRef(null);

  return (
    <LanguageProvider>
      <AppContent parallaxRef={parallaxRef} />
    </LanguageProvider>
  );
}
const routes = {
  '/': 0,
  '/home': 0.45,
  '/gallery': 2,
  '/contact': 2,
  '/comment': 3.2,
};


function AppContent({ parallaxRef }) {
  const { isMalayalam, toggle } = useLanguage();
  const [scrollY, setScrollY] = useState(1);
  const [is404, setIs404] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = window.location.pathname, scrollPosition = routes[path];

    if (scrollPosition !== undefined) {
      setIs404(false);
      if (parallaxRef.current) setTimeout(() => parallaxRef.current.scrollTo(scrollPosition), 100);
    } else setIs404(true);
  }, [parallaxRef]);
  const navigateTo = (path) => {
    const scrollPosition = routes[path];
    if (scrollPosition !== undefined && parallaxRef.current) {
      parallaxRef.current.scrollTo(scrollPosition);
      window.history.pushState({}, '', path);
      setIsMobileNavOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const posY = containerRef.current.getBoundingClientRect().top;
        setScrollY(window.pageYOffset - posY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GTA 6 THEME
  useEffect(() => {
    const root = document.documentElement;
    root.style.background = isDate(11, event6start, event6end)
      ? "linear-gradient(180deg,rgba(59, 28, 110, 1) 0%, rgba(252, 148, 175, 1) 55%, rgba(237, 221, 83, 1) 100%)"
      : "";

    return () => {
      root.style.background = "";
    };
  }, []);

  if (is404) {
    return <NotFound />;
  }

  return (
    <>
      {/* DVD */}
      {/* <Dvd className="h-screen w-screen z-1000" /> */}

      

      <div ref={containerRef}>
        {/* // November half */}
        {isDate(11, novSnowStart, 30) && <Snow />}
        {/* // December full  */}
        {isDate(12, 1, 31) && <Snow />} 
        
        <div className="fixed top-0 left-0 right-0 z-50 bg-black w-full">

          <div className="flex items-center justify-between px-4 sm:px-8 md:px-10 h-14 md:h-20 lg:h-25">

            <button type="button" className="flex items-center gap-2 font-dev cursor-pointer bg-black!"
              onClick={() => {
                if (window.innerWidth < 768) setIsMobileNavOpen((isOpen) => !isOpen); else navigateTo('/');
              }} aria-expanded={isMobileNavOpen} aria-controls="mobile-navigation">
              <img className="h-8 sm:h-9 md:h-10 lg:h-12 rounded-full" src={faceImg} alt="achu face logo" />
              {isMalayalam ? (<span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">അർജ.സ</span>
              ) : ( <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">arjc.me</span>)}
              <span aria-hidden="true" className={`md:hidden text-base transition-transform duration-300 ${isMobileNavOpen ? "rotate-180" : ""}`}>
                ↓ </span>
            </button>
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 font-dev text-sm lg:text-base">
              <a href="https://dev.arjc.me" target="_blank" rel="noreferrer">{isMalayalam ? "ദേവ." : "Dev"}</a>
              <a href="https://music.arjc.me" target="_blank" rel="noreferrer">{isMalayalam ? "സംഗീതം" : "Music"}</a>
              <a onClick={() => navigateTo('/contact')} className="cursor-pointer">{isMalayalam ? "സന്വര്ക്കം" : "Contact"}</a>
            </nav>
            <a onClick={toggle} className="cursor-pointer text-sm md:text-base px-5">{isMalayalam ? "English" : "മലയാളം"}</a>
          
          </div>
          <nav id="mobile-navigation" className={`${isMobileNavOpen ? "flex" : "hidden"} md:hidden flex-col items-center gap-4 bg-black px-4 py-5 font-dev text-lg`}>
            <a href="https://dev.arjc.me" target="_blank" rel="noreferrer" onClick={() => setIsMobileNavOpen(false)}>{isMalayalam ? "ദേവ." : "Dev"}</a>
            <a href="https://music.arjc.me" target="_blank" rel="noreferrer" onClick={() => setIsMobileNavOpen(false)}>{isMalayalam ? "സംഗീതം" : "Music"}</a>
            <a onClick={() => navigateTo('/contact')} className="cursor-pointer">{isMalayalam ? "സന്വര്ക്കം" : "Contact"}</a>
          </nav>

        </div>

        {/* NEW YEAR ARJC */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">

          <span className="m-0 text-[12vh] font-bold lg:text-[15em] rotate-90 lg:rotate-0 text-nowrap text-center font-dev"
            style={{ opacity: 0.25 * 1 / scrollY }}>
            {isDate(12, 31, 31) || isDate(1, 1, 2) ? `2 0 
            ${Math.floor((dateObj.getFullYear() - 2000) / 10)}   // NEW YEAR
            ${dateObj.getFullYear() - 2020}` : isMalayalam ? "അർജ.സ" : "arjc.me"}
          </span>

        </div>

        {/* CTX */}
        <Parallax ref={parallaxRef} pages={window.innerWidth >= 768 ? 5 : 5.74} style={{ top: 0, left: 0 }} config={{ mass: 1, tension: 170, friction: 26 }}>

          {isDate(1, 1, 2) ? <Fireworks className="absolute" /> : <></>}

          <ParallaxLayer speed={5} offset={0} factor={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cube />
          </ParallaxLayer>

          <ParallaxLayer speed={1} offset={0.9999} factor={6}>
            <Action parallaxRef={parallaxRef} />
            <Gallery />
            <Photogrid />
            <Contact />
            <Wall />
          </ParallaxLayer>
          
          <ParallaxLayer speed={1} offset={window.innerWidth >= 768 ? 4.5 : 5} factor={0.5}>
            <Footer />
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

export default App;