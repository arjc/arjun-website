import "./Dvd.css";
import { useState, useEffect } from "react";
import faceImg from "../assets/images/face.webp";

// let faceImg = "gay"

const Dvd = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hue, setHue] = useState(0);
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
            }

            if (newY <= 0 || newY >= window.innerHeight - faceSize) {
                newVy = -velocity.vy;
                newY = Math.max(0, Math.min(window.innerHeight - faceSize, newY));
            }

            setVelocity({ vx: newVx, vy: newVy });
            return { x: newX, y: newY };
        });

        setHue((prev) => (prev + 2) % 360);
    };

    useEffect(() => {
        const handleBlur = () => setIsVisible(true);
        const handleMouseMove = () => setIsVisible(false);

        window.addEventListener("blur", handleBlur);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
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
            className="fixed inset-0 pointer-events-none bg-black"
            style={{
                opacity: isVisible ? 1 : 0,
                zIndex: 999,
            }}
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
                    // maxHeight: "50px",
                }}
            />
        </div>
    );
};
export default Dvd;