const Action = () => (
  <div className="flex flex-col justify-center items-center text-center w-screen mx-5 h-1/3 gap-10">
    <h1 className="w-[75vw]">Welcome to my site!</h1>
    <p className="w-[60vw]">
      My name is Arjun M Liji, I am 18 currently pursuing my Bachelor's in Computer Science and Engineering at NSSCE, Palakkad.
      Thank you for visiting my site and if you are here just to chill just relax while I build this website further. Thank you for ur patience...
    </p>
    <div className="flex gap-5 text-[1.5em]">
      <a href="public/cv.pdf" className="px-7 py-3 border-1 border-white rounded-2xl">Download CV</a>
      <a href="#contact" className="px-7 py-3 border-1 border-white rounded-2xl">Gallery</a>
      <a href="#contact" className="px-7 py-3 border-2 border-white rounded-2xl">Contact</a>
    </div>
  </div>
);
export default Action;
