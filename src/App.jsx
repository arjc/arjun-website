import "./App.css";
import { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import Cube from "./Cube/Cube.jsx";
import Snow from "./Snow/Snow.jsx";
import Action from "./Action/Action.jsx";

function App() {
  const parallaxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const c = parallaxRef.current.container.current;
      setScrollProgress(Math.min(Math.max(c.scrollTop / c.clientHeight, 0), 1));
    };
    const t = setTimeout(() => {
      parallaxRef.current?.container?.current?.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearTimeout(t);
      parallaxRef.current?.container?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const p = ease(scrollProgress);

  return (
    <>
      <Snow />
      {/* overlau */}
      <div className="fixed inset-0 bg-black pointer-events-none z-[-1]" style={{ opacity: p * 0.8 }} />
      {/* navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black w-full">
        <div className="flex items-center justify-between p-4 h-20">
          <div className="flex items-center gap-2">
            <img className="h-12 rounded-full" src="src/assets/face.webp" alt="me" />
            <span className="text-xl font-bold">arjc.me</span>
          </div>
          {/* desktop */}
          <div className="hidden lg:flex gap-10 text-lg mx-6">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="https://blogs.arjc.me" target="_blank" rel="noopener noreferrer">Blogs</a>
            <a href="#contact">Contact</a>
          </div>
          {/* hamburgr */}
          <a onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden mx-4 cursor-pointer">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </a>
        </div>
      </div>
      {/* bakground */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[12vh] font-bold xl:text-[15em] rotate-90 xl:rotate-0"
          style={{ opacity: 0.25 * (1 - p) }}>arjc.me</span>
      </div>
      <Parallax ref={parallaxRef} className="relative z-10" pages={3} style={{top: 0, left: 0}}
        config={{ mass: 1, tension: 280, friction: 20 }}>
        {/* hero */}
        <ParallaxLayer speed={3} className="h-screen flex items-center justify-center">
          <Cube />
        </ParallaxLayer>
        {/* action */}
        <ParallaxLayer offset={1} className="h-screen flex">
          <Action />
        </ParallaxLayer>
        {/* navbar */}
        <ParallaxLayer sticky={{ start: 0.84, end: 2 }} className="pointer-events-none">
          <Nav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </ParallaxLayer>
        {/* footr */}
        <ParallaxLayer offset={2}>
          <Footer />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

export default App;
