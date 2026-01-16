import { useLanguage } from "../context/LanguageContext";

const Action = ({ parallaxRef }) => {
  const { isMalayalam } = useLanguage();

  const scrollTo = (page) => {
    if (parallaxRef?.current) {
      parallaxRef.current.scrollTo(page);
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center text-center w-screen h-[103vh] gap-10 bg-black py-10">
      <h1 className="w-screen font-extrabold bg-white text-black px-1 py-2">
        {isMalayalam ? "ഞാൻ, അർജുൻ ലിജി ~" : "Hey there, Arjun Here ~"}
      </h1>
      <p className="w-[90vw]">
        {isMalayalam 
          ? "നമസ്കാരം! എന്റെ പേര് അർജുൻ എം ലിജി (18), എനിക്ക് സംഗീതം, കമ്പ്യൂട്ടർ തുടങ്ങിയവ വളരെയധികം ഇഷ്ടമാണ്. എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി."
          : `My name is Arjun M Liji, I am a ${new Date().getFullYear() - 2007} year old guy who has a deep love for computers and music. Thank you for visiting my website.`}
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-5 px-10 sm:flex-row text-xl sm:text-2xl">
        <a href="https://dev.arjc.me" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "ഡെവ് പോർട്ട്ഫോളിയോ" : "Developer Portfolio"}
        </a>
        <a href="https://blogs.arjc.me" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "പത്രം" : "My Blogs"}
        </a>
        <a href="https://music.arjc.me" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "സംഗീതകൃതികൾ" : "Music and works"}
        </a>
        {/* <a href="/cv.pdf" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "സി.വി" : "Download CV"}
        </a> */}
        <a onClick={() => scrollTo(2)} className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto cursor-pointer">
          {isMalayalam ? "ചിത്രങ്ങൾ" : "Gallery"}
        </a>
        <a onClick={() => scrollTo(4)} className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto cursor-pointer">
          {isMalayalam ? "സന്വര്ക്കം" : "Contact"}
        </a>
      </div>
    </div>
  );
};
export default Action;
