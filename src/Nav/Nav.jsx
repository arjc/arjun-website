import React from "react";

const Nav = () => {
  return (
    <div
      className="hidden flex-row items-center justify-between p-4 w-screen
      lg:flex">

      <div className="flex flex-row items-center justify-center gap-2">
        <img
          className="h-24 rounded-full"
          src="src/assets/face.webp"
          alt="dk"
        />
        <span className="text-3xl font-bold text-[4rem]">arjunliji.me</span>
      </div>

      <div className="gap-15 flex flex-row text-[2em] mx-10">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
};

export default Nav;
