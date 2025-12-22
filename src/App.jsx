import "./App.css";
import {useRef} from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import Cube from "./Cube/Cube.jsx";

function App() {
  return (
    <>
      <Parallax className="relative" pages={5} style={{ top: "0", left: "0" }}>
        <ParallaxLayer speed={10} factor={1} className="h-screen flex">
          <Cube />
        </ParallaxLayer>
        <ParallaxLayer>
          
        </ParallaxLayer>
        <ParallaxLayer offset={0.25} factor={1} sticky={{ start: 1, end: 3 }}>
          <Nav />
        </ParallaxLayer>
        <Footer />
      </Parallax>
    </>
  );
}

export default App;
