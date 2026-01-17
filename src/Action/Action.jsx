import { useLanguage } from "../context/LanguageContext";

const Action = ({ parallaxRef }) => {
  const { isMalayalam } = useLanguage();

  const scrollTo = (page) => {
    if (parallaxRef?.current) {
      parallaxRef.current.scrollTo(page);
    }
  };
  
  return (
    <div className="flex flex-col  items-center text-center w-screen h-[103vh] gap-10 bg-black pb-10">
      <div className="w-screen bg-white overflow-hidden">
        <span 
          className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
          style={{
            animation: 'marquee 16s ease-in-out infinite alternate',
          }}
        >
          {isMalayalam ? "നമസ്കാരം! ഞാൻ അർജുൻ ലിജി ~ " : "Hello! Arjun Here ~ "}
          {isMalayalam ? "അർജുൻ ലിജി ~ " : "Your fellow, Developer ~ "}
          {isMalayalam ? "അർജുൻ ലിജി ~ " : "I love music ~ "}
          {isMalayalam ? "അർജുൻ ലിജി " : "And development ~ "}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(calc(-100% + 100vw));
          }
        }
      `}</style>
      <p className="w-[90vw] sm:w-[70vw] text-[2em] opacity-60 font-para my-20">
        {isMalayalam 
          ? "നമസ്കാരം! എന്റെ പേര് അർജുൻ എം ലിജി (18), എനിക്ക് സംഗീതം, \nകമ്പ്യൂട്ടർ തുടങ്ങിയവ വളരെയധികം ഇഷ്ടമാണ്. എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി."
          : `My name is Arjun M Liji, I am a ${new Date().getFullYear() - 2007} year old guy who has a deep love for computers and music. Thank you for visiting my website.`}
      </p>
      <div className="flex flex-col flex-wrap justify-center gap-5 px-10 sm:flex-row text-xl sm:text-lg font-des">
        <a href="https://dev.arjc.me" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "ഡെവ് പോർട്ട്ഫോളിയോ" : "Dev Portfolio"}
        </a>
        <a href="https://blogs.arjc.me" className="px-3 py-1 border-y sm:border-5 sm:rounded-2xl w-screen sm:w-auto ">
          {isMalayalam ? "പത്രം" : "Blog"}
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
