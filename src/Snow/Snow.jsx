import "./Snow.css";
import { useEffect, useState } from "react";

const Snow = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const make = () => ({
      id: Math.random(), left: Math.random() * 100, delay: Math.random() * 0.5,
      duration: 10 + Math.random() * 10, opacity: Math.random() * 0.5 + 0.5, size: Math.random() * 10 + 5
    });
    setFlakes(Array.from({ length: 50 }, make));
    const i = setInterval(() => setFlakes(p => [...p.slice(-49), make()]), 300);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="snow-container">
      {flakes.map(f => (
        <div key={f.id} className="snowflake" style={{
          left: `${f.left}%`, animationDelay: `${f.delay}s`, animationDuration: `${f.duration}s`,
          opacity: f.opacity, width: `${f.size}px`, height: `${f.size}px`
        }}>.</div>
      ))}
    </div>
  );
};
export default Snow;
