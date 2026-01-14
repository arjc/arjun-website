import { useLanguage } from "../context/LanguageContext";

const Action = ({ parallaxRef }) => {
  const { isMalayalam } = useLanguage();

  const scrollTo = (page) => {
    if (parallaxRef?.current) {
      parallaxRef.current.scrollTo(page);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center text-center w-screen h-[101vh] gap-10 bg-black">
      <h1 className="w-[75vw]">
        {isMalayalam ? "അർജുൻ ലിജിയൂഡ് വെബ്സൈറ്റ്" : "Arjun Liji's Website"}
      </h1>
      <p className="w-[90vw]">
        {isMalayalam 
          ? "നമസ്കാരം! എന്റെ പേര് അർജുൻ എം ലിജി (18), എനിക്ക് കമ്പ്യൂട്ടർ പ്രോഗ്രാമിംഗും സംഗീതവും ഇഷ്ടമാണ്. എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി."
          : `My name is Arjun M Liji, I am a ${new Date().getFullYear() - 2007} year old guy who loves computer programming and music. Thank you for visiting my website.`}
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-5 p-10 sm:flex-row text-3xl sm:text-2xl">
        <a href="https://dev.arjc.me" className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto">
          {isMalayalam ? "ഡെവ് പോർട്ട്ഫോളിയോ" : "Developer Portfolio"}
        </a>
        <a href="https://blogs.arjc.me" className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto">
          {isMalayalam ? "പത്രം" : "My Blogs"}
        </a>
        <a href="https://music.arjc.me" className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto">
          {isMalayalam ? "സംഗീതകൃതികൾ" : "Music and works"}
        </a>
        {/* <a href="/cv.pdf" className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto">
          {isMalayalam ? "സി.വി" : "Download CV"}
        </a> */}
        <a onClick={() => scrollTo(2)} className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto cursor-pointer">
          {isMalayalam ? "ചിത്രങ്ങൾ" : "Gallery"}
        </a>
        <a onClick={() => scrollTo(4)} className="px-3 py-1 border-y sm:border-2 sm:rounded-2xl w-screen sm:w-auto cursor-pointer">
          {isMalayalam ? "സന്വര്ക്കം" : "Contact"}
        </a>
      </div>
    </div>
  );
};
export default Action;
