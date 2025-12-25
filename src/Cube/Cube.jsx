import "./Cube.css";

const Cube = () => {
  const faceImg = (
    <img
      className="h-10 sm:h-50 rounded-full"
      src="src/assets/face.webp"
      alt="dk"
    />
  );
  const text = <span className="bg-black p-1">DEVELOPER</span>;
  const text2 = <span className="bg-black p-1">DESIGNER</span>;
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative z-10">
      <div className="cube-container">
        <div className="cube">
          <div className="cube-face front">{faceImg}</div>
          <div className="cube-face back">{faceImg}</div>
          <div className="cube-face left rangu">{text}</div>
          <div className="cube-face right rangu">{text}</div>
          <div className="cube-face top rangu">{text2}</div>
          <div className="cube-face bottom rangu">{text2}</div>
        </div>
      </div>
      <div className="absolute animate-bounce bottom-15 flex opacity-35">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};
export default Cube;
