const Timeline = () => {
  const Jibesh =
    "flex flex-row justify-between w-[75vw] border-b items-center p-5 text-3xl hover:bg-white hover:text-black hover:cursor-pointer transition-colors duration-300";
  const Yadhu = "flex flex-row items-baseline gap-5";
  return (
    <div className="items-center justify-center flex flex-col w-screen">
      <div className={Jibesh}>
        <div className={Yadhu}>
          <h1>NSSCE</h1>
          <i>B-Tech in CSE</i>
        </div>
        <h1>2025</h1>
      </div>
      <div className={Jibesh}>
        <div className={Yadhu}>
          <h1>AVEKM</h1>
          <i>Senior year high school</i>
        </div>
        <h1>2024</h1>
      </div>
      <div className={Jibesh}>
        <div className={Yadhu}>
          <h1>HOSPITAL</h1>
          <i>Busy being born</i>
        </div>
        <h1>2007</h1>
      </div>
    </div>
  );
};

export default Timeline;
