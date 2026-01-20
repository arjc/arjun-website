import "./Dvd.css";
import { useState, useEffect } from "react";
import faceImg from "../assets/images/face.webp";

const colors = [36, 83, 107, 203, 264, 310, 352];

let i = 1;

const Dvd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(203);
  const [velocity, setVelocity] = useState({ vx: 5, vy: 5 });

  const faceSize = 120;
  const updateMovement = () => {
    setPosition((prev) => {
      let newX = prev.x + velocity.vx;
      let newY = prev.y + velocity.vy;
      let newVx = velocity.vx;
      let newVy = velocity.vy;
      if (newX <= 0 || newX >= window.innerWidth - faceSize) {
        newVx = -velocity.vx;
        newX = Math.max(0, Math.min(window.innerWidth - faceSize, newX));
        i >= colors.length ? (i = 1) : (i += 1 / 2);
        setHue(colors[Math.floor(i)]);
      }

      if (newY <= 0 || newY >= window.innerHeight - faceSize) {
        newVy = -velocity.vy;
        newY = Math.max(0, Math.min(window.innerHeight - faceSize, newY));
        i >= colors.length ? (i = 1) : (i += 1 / 2);
        setHue(colors[Math.floor(i)]);
      }

      setVelocity({ vx: newVx, vy: newVy });
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    let blurTimeout;

    const handleBlur = () => {
      blurTimeout = setTimeout(() => setIsVisible(true), 10000);
    };
    const handleMouseMove = () => {
      clearTimeout(blurTimeout);
      setIsVisible(false);
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(blurTimeout);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(updateMovement, 30);

    return () => clearInterval(interval);
  }, [isVisible, velocity]);

  return (
    <div
      className={`fixed inset-0 bg-black ${
        isVisible ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        zIndex: 999,
      }}
      onClick={() => setIsVisible(false)}
    >
      <img
        src={faceImg}
        alt="face"
        className="absolute rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${faceSize}px`,
          height: `${faceSize}px`,
          filter: `hue-rotate(${hue}deg)`,
          pointerEvents: "none",
        }}
      />
      <div className="text-white text-center mt-4">[Screensaver] interact to dismiss</div>
    </div>
  );
};
export default Dvd;
