const Action = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-1/3 gap-10">
      <h1 className="text-3xl">MERRY CHRISTMAS</h1>
      <p className="w-[60vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis error
        laborum nisi ullam ipsum ducimus facere quam corporis, omnis, saepe
        repellat voluptate sunt eos. Magnam molestias nemo omnis eligendi saepe.
      </p>
      <div className="flex flex-row gap-5 justify-center items-center ">
        <a
          href="cv.pdf"
          className="px-7 py-3 text-lg border-solid border-2 border-white no-underline rounded-2xl"
        >
          Download CV
        </a>
        <a
          href="#contact"
          className="px-7 py-3 text-lg border-solid border-2 border-white no-underline rounded-2xl"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Action;
