import "./Snow.css";
import { useEffect, useState } from "react";

const Snow = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => {
      return {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 10 + Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.5,
        size: Math.random() * 10 + 5,
      };
    };

    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, createSnowflake);
    setSnowflakes(initialSnowflakes);

    // Add new snowflakes periodically
    const interval = setInterval(() => {
      setSnowflakes((prev) => [
        ...prev.slice(-49),
        createSnowflake(),
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="snow-container">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            left: `${snowflake.left}%`,
            animationDelay: `${snowflake.delay}s`,
            animationDuration: `${snowflake.duration}s`,
            opacity: snowflake.opacity,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
          }}
        >
          .
        </div>
      ))}
    </div>
  );
};

export default Snow;
