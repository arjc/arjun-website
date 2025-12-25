import "./App.css";
import { useRef, useState, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import Cube from "./Cube/Cube.jsx";
import Project from "./Project/Project.jsx";
import About from "./About/About.jsx";
import Timeline from "./Timeline/Timeline.jsx";
import Snow from "./Snow/Snow.jsx";
import Action from "./Action/Action.jsx";
import Contact from "./Contact/Contact.jsx";
// import spidey from "./assets/spiderman.webp";;

function App() {
  const parallaxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const container = parallaxRef.current.container.current;
        const scrollTop = container.scrollTop;
        const viewportHeight = container.clientHeight;
        // Calculate progress from page 1 to page 2 (0 to 1)
        const progress = Math.min(Math.max(scrollTop / viewportHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    // Add scroll listener to parallax container
    const checkAndAddListener = () => {
      if (parallaxRef.current?.container?.current) {
        parallaxRef.current.container.current.addEventListener(
          "scroll",
          handleScroll
        );
      }
    };

    // Small delay to ensure parallax is mounted
    const timeout = setTimeout(checkAndAddListener, 100);

    return () => {
      clearTimeout(timeout);
      if (parallaxRef.current?.container?.current) {
        parallaxRef.current.container.current.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, []);

  // Calculate text opacity (fade from 0.25 to 0 with easing)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);
  const textOpacity = 0.25 * (1 - easedProgress);

  // Calculate background darkness (from 0 to 0.8 overlay)
  const overlayOpacity = easedProgress * 0.8;

  return (
    <>
      {/* <Snow /> */}

      {/* Dark overlay that increases as you scroll - behind content */}
      <div
        className="fixed inset-0 bg-black pointer-events-none z-[-1]"
        style={{
          opacity: overlayOpacity,
          transition: "opacity 0.1s ease-out",
        }}
      />

      {/* Fixed header bar with logo and hamburger */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black w-full">
        <div className="flex flex-row items-center justify-between p-4 h-20">
          <div className="flex flex-row items-center gap-2">
            <img
              className="h-12 rounded-full"
              src="src/assets/face.webp"
              alt="arjunliji"
            />
            <span className="text-xl font-bold">arjunliji</span>
          </div>
          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-10 text-lg mx-6">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#blogs">Blogs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>

      {/* Fixed background text - fades out as you scroll */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <span
          className="text-[12vh] font-bold xl:text-[15em] rotate-90 xl:rotate-0"
          style={{
            opacity: textOpacity,
            transition: "opacity 0.1s ease-out",
          }}
        >
          arjunliji.me
        </span>
      </div>

      <Parallax
        ref={parallaxRef}
        className="relative z-10"
        pages={7}
        style={{ top: "0", left: "0" }}
        config={{ mass: 1, tension: 280, friction: 20 }}
      >
        {/* hero - Cube with parallax effect */}
        <ParallaxLayer
          speed={3}
          factor={1}
          className="h-screen flex items-center justify-center"
        >
          <Cube />
        </ParallaxLayer>

        {/* Action */}
        <ParallaxLayer offset={1} className="h-screen flex">
          <Action />
        </ParallaxLayer>
        {/* ABOUT */}
        <ParallaxLayer offset={2} className="h-screen flex">
          <About />
        </ParallaxLayer>
        {/* TIMELINE */}
        <ParallaxLayer offset={3} className="h-screen flex">
          <Timeline />
        </ParallaxLayer>
        {/* Nav */}
        <ParallaxLayer factor={1} sticky={{ start: 0.84, end: 5.75 }}>
          <Nav />
        </ParallaxLayer>
        {/* Project */}
        <ParallaxLayer speed={1} offset={4} className="h-screen flex">
          <Project />
        </ParallaxLayer>
        {/* Blogs */}
        <ParallaxLayer offset={5} className="h-screen flex">
          <div className="flex flex-col items-center justify-center w-screen h-screen py-10 gap-20">
            <h1 className="text-5xl font-bold mb-4 text-white">Blogs</h1>
            <p className="text-gray-300 text-xl">
              Blogs content goes here. Stay tuned for updates!
            </p>
          </div>
        </ParallaxLayer>

        {/* Contact */}
        <ParallaxLayer offset={6} className="h-screen flex">
          <Contact />
        </ParallaxLayer>

        {/* footer */}
        <Footer />
      </Parallax>
    </>
  );
}

export default App;
