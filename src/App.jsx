import "./App.css";
import { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Snow from "./Snow/Snow.jsx";
import Fireworks from "./Fireworks/Fireworks.jsx";
import Dvd from "./Dvd/Dvd.jsx";
import Cube from "./Cube/Cube.jsx";
import Action from "./Action/Action.jsx";
import Wall from "./Wall/Wall.jsx";
import Photogrid from "./Photogrid/Photogrid.jsx";
import faceImg from "./assets/images/face.webp";
import Contact from "./Contact/Contact.jsx";
import Footer from "./Footer/Footer.jsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
let dateObj = new Date();

const isDate = ((month, start, end) => {
  const now = new Date();
  const isCurrentMonth = now.getMonth() + 1 === month;
  const isInDayRange = now.getDate() >= start && now.getDate() <= end;
  return isCurrentMonth && isInDayRange ? true : false;
});

function App() {
  const parallaxRef = useRef(null);

  return (
    <LanguageProvider>
      <AppContent parallaxRef={parallaxRef} />
    </LanguageProvider>
  );
}

// Route definitions: path -> scroll position
const routes = {
  '/': 0,
  '/wall': 1.05,
  '/gallery': 2,
  '/contact': 3,
  '/footer': 4.5,
};

function AppContent({ parallaxRef }) {
  const { isMalayalam, toggle } = useLanguage();
  const [scrollY, setScrollY] = useState(1);
  const containerRef = useRef(null);

  // Handle URL-based navigation on mount
  useEffect(() => {
    const path = window.location.pathname;
    const scrollPosition = routes[path];
    
    if (scrollPosition !== undefined && parallaxRef.current) {
      // Small delay to ensure parallax is ready
      setTimeout(() => {
        parallaxRef.current.scrollTo(scrollPosition);
      }, 100);
    }
  }, [parallaxRef]);

  // Helper function to navigate and update URL
  const navigateTo = (path) => {
    const scrollPosition = routes[path];
    if (scrollPosition !== undefined && parallaxRef.current) {
      parallaxRef.current.scrollTo(scrollPosition);
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const posY = containerRef.current.getBoundingClientRect().top;
        setScrollY(window.pageYOffset - posY);
        // console.log(window.pageYOffset - posY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <Dvd className="h-screen w-screen z-1000" />
    <div ref={containerRef}>
      {isDate(12, 1, 31) && <Snow />}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black w-full">
        <div className="flex items-center justify-between px-5 sm:px-10 h-15 lg:h-25">
          <div className="flex items-center gap-2 font-dev" onClick={() => navigateTo('/')} style={{ cursor: "pointer" }}>
            <img className="h-14 lg:h-20 rounded-full" src={faceImg} alt="achu face logo" />
            { isMalayalam ? <span className="text-4xl">അർജസ</span> : <span className="text-4xl font-bold">arjc.me</span> }
          </div>
          <a onClick={toggle} className="cursor-pointer">{isMalayalam ? "English" : "മലയാളം"}</a>
        </div>
      </div>
      {/* bakground */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="m-0 text-[12vh] font-bold lg:text-[15em] rotate-90 lg:rotate-0 text-nowrap text-center font-dev"
          style={{ opacity: 0.25 * 1 / scrollY}}>
            { isDate(12, 31, 31) || isDate(1, 1, 2) ? `2 0 
            ${Math.floor((dateObj.getFullYear() - 2000) / 10)} 
            ${dateObj.getFullYear() - 2020}` : isMalayalam ? "അർജസ" : "arjc.me" }
        </span>
      </div>
      {/* spring =========================================================== */}
      <Parallax ref={parallaxRef} pages={5} style={{top: 0, left: 0}} config={{ mass: 1, tension: 170, friction: 26 }}>
        
        {isDate(1, 1, 2) ? <Fireworks className="absolute" /> : <></>}
        
        {/* hero */}
        <ParallaxLayer speed={5} offset={0} factor={1} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Cube />
        </ParallaxLayer>

        {/* action */}
        <ParallaxLayer speed={1} offset={0.9999} factor={6}>
          <Action parallaxRef={parallaxRef} />
          <Wall />
          <Photogrid />
          <Photogrid />
          <Photogrid />
          <Photogrid />
          <Contact />
        </ParallaxLayer>

        {/* footer */}
        <ParallaxLayer speed={1} offset={4.5} factor={0.5}>
          <Footer />
        </ParallaxLayer>
        {/* spring =========================================================== */}
      </Parallax>
    </div>
    </>
  );
}

export default App;