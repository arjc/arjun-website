import "./App.css";
import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import Cube from "./Cube/Cube.jsx";
import Project from "../public/data/project.jsx";
import Snow from "./Snow/Snow.jsx";

import spidey from "./assets/spiderman.webp";


function App() {
  return (
    <>
      <Snow />
      <Parallax className="relative" pages={5} style={{ top: "0", left: "0" }}>
        <ParallaxLayer speed={2} factor={1} className="h-screen flex bg-black">
          <Cube />
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 1, end: 3 }} className="h-screen">
          <img
            src={spidey}
            alt="Spiderman"
            className="h-screen m-0 rounded-3xl scale-50"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={2} className="h-screen flex">
          <Project />
        </ParallaxLayer>
        <ParallaxLayer factor={1} sticky={{ start: 3, end: 5 }}>
          <Nav />
        </ParallaxLayer>
        <Footer />
      </Parallax>
    </>
  );
}

export default App;
