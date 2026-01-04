import "./Cube.css";
import faceImg from "../assets/images/face.webp";
import { useState, useEffect, useRef } from "react";

const Cube = () => {
  const [rotationX, setRotationX] = useState(Math.floor(Math.random() * 25));
  const [rotationY, setRotationY] = useState(Math.floor(Math.random() * 25));
  const [isMobile, setIsMobile] = useState(false);
  const cubeRef = useRef(null);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 780;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Add mouse move listener only if not mobile
    const handleMouseMove = (e) => {
      if (isMobile) return;

      const container = cubeRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation based on mouse position
      const rotX = (mouseY / window.innerHeight) * 230; // -10 to 10 degrees
      const rotY = (mouseX / window.innerWidth) * 270; // -10 to 10 degrees

      setRotationX(-rotX);
      setRotationY(rotY);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const face = <img className="h-10 sm:h-50" src={faceImg} alt="loading..." />;
  const dev = <span className="bg-black px-2 py-1">DEVELOPER</span>;
  const des = <span className="bg-black px-2 py-1">DESIGNER</span>;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen z-10">
      <div className="cube-container" ref={cubeRef} style={
        !isMobile ? {
          '--mouse-rotation-x': `${rotationX}deg`,
          '--mouse-rotation-y': `${rotationY}deg`
        } : {}
      }>
        <div className={`cube ${!isMobile ? 'mouse-follow' : ''}`}>
          <div className="cube-face front">{face}</div>
          <div className="cube-face back">{face}</div>
          <div className="cube-face left">{dev}</div>
          <div className="cube-face right">{dev}</div>
          <div className="cube-face top">{des}</div>
          <div className="cube-face bottom">{des}</div>
        </div>
      </div>


      {/* arow */}
      <div className="absolute animate-bounce bottom-15 flex opacity-35">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
export default Cube;
