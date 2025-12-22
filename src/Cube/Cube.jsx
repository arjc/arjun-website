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
    <div className="flex items-center justify-center w-screen relative">
      <div className="cube-container">
        <div className="cube">
          <div className="cube-face front">{faceImg}</div>
          <div className="cube-face back">{faceImg}</div>
          <div className="cube-face left">{text}</div>
          <div className="cube-face right">{text}</div>
          <div className="cube-face top">{text2}</div>
          <div className="cube-face bottom">{text2}</div>
        </div>
      </div>
      <span className="-z-99 opacity-25 absolute text-[12vh] font-bold text-red-400 pointer-events-none xl:text-[15em] rotate-90 xl:rotate-0">
        arjunliji.me
      </span>
      <div className="absolute animate-bounce bottom-10 flex opacity-35">
        <svg
          className="w-10 h-10 text-white"
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
