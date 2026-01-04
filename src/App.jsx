import "./App.css";
import { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "./Footer/Footer.jsx";
import Cube from "./Cube/Cube.jsx";
import Snow from "./Snow/Snow.jsx";
import Dvd from "./Dvd/Dvd.jsx";
import Fireworks from "./Fireworks/Fireworks.jsx";
import Action from "./Action/Action.jsx";
import faceImg from "./assets/images/face.webp";
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
    <>
    <Dvd className="h-screen w-screen" />
    <div>
      {isDate(12, 1, 31) && <Snow />}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black w-full">
        <div className="flex items-center justify-between px-5 sm:px-10 h-15 lg:h-25">
          <div className="flex items-center gap-2" onClick={() => parallaxRef.current.scrollTo(0)} style={{ cursor: "pointer" }}>
            <img className="h-14 lg:h-20 rounded-full" src={faceImg} alt="achu face logo" />
            <span className="text-4xl font-bold">arjc.me</span>
          </div>
        </div>
      </div>
      {/* bakground */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="m-0 text-[12vh] font-bold lg:text-[15em] rotate-90 lg:rotate-0 text-nowrap text-center"
          style={{ opacity: 0.25 }}>
            { isDate(12, 31, 31) || isDate(1, 1, 2) ? `2 0 
            ${Math.floor((dateObj.getFullYear() - 2000) / 10)} 
            ${dateObj.getFullYear() - 2020}` : "arjc.me" }
        </span>
      </div>
      {/* spring =========================================================== */}
      <Parallax ref={parallaxRef} pages={5} style={{top: 0, left: 0}} config={{ mass: 1, tension: 170, friction: 26 }}>
        
        {<Fireworks className="absolute" /> || isDate(1, 1, 2) }
        
        
        {/* hero */}
        <ParallaxLayer speed={2} offset={0} factor={1}>
          <Cube />
        </ParallaxLayer>

        {/* action */}
        <ParallaxLayer speed={1} offset={1} factor={1}>
          <Action />
        </ParallaxLayer>

        {/* footr */}
        <ParallaxLayer speed={1} offset={4.76} factor={0.26}>
          <Footer />
        </ParallaxLayer>
        {/* spring =========================================================== */}
      </Parallax>
    </div>
    </>
  );
}

export default App;
