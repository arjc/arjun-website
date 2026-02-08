import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const scrollTargets = {
  'section-contact': '/contact',
  'section-gallery': '/gallery',
  'section-comment': '/comment',
};

const glyphs = [
  "- - -", "· · ·", "- - -", "— — —", "· · ·", "— — —",
  "~ ~ ~", "· · ·", "~ ~ ~", "- · -", "· - ·", "- · -",
];

const Action = ({ scrollToSection }) => {
  const { isMalayalam } = useLanguage();
  const [glyphIdx, setGlyphIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlyphIdx((prev) => (prev + 1) % glyphs.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (sectionId) => {
    scrollToSection(sectionId);
    const path = scrollTargets[sectionId] || '/';
    window.history.pushState({}, '', path);
  };

  return (
    <div className="flex flex-col items-center w-full bg-[#0a0a0a] py-20 sm:py-28 px-6 sm:px-10 lg:px-16">

      {/* --- dashed separator art --- */}
      <div className="w-full max-w-4xl mb-16 sm:mb-20">
        <hr className="dash-sep" />
      </div>

      {/* --- introduction --- */}
      <div className="max-w-2xl text-center mb-16 sm:mb-20">
        <h1 className="font-des text-lg sm:text-xl lg:text-2xl tracking-[0.15em] mb-8 text-[#ccc]">
          {isMalayalam
            ? "നമസ്കാരം, ഞാൻ അർജുൻ"
            : "hello, i'm arjun"}
        </h1>
        <p className="font-para text-sm sm:text-base leading-loose text-[#888]">
          {isMalayalam ? (
            <span className="tracking-wider">
              നമസ്കാരം! എന്റെ പേര് അർജുൻ എം ലിജി (
              {new Date().getFullYear() - 2007}). എനിക്ക് സംഗീതം, കമ്പ്യൂട്ടർ
              തുടങ്ങിയവ വളരെയധികം ഇഷ്ടമാണ്.
              എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി.
            </span>
          ) : (
            <span>
              my name is arjun m liji. i'm {new Date().getFullYear() - 2007} and i have a deep love
              for computers and music. this is my little corner of the internet.
              thank you for being here.
            </span>
          )}
        </p>
      </div>

      {/* --- glyph breath --- */}
      <div className="font-dev text-[#333] text-sm tracking-[1em] mb-16 sm:mb-20 transition-all duration-700">
        {glyphs[glyphIdx]}
      </div>

      {/* --- navigation --- */}
      <nav className="max-w-3xl w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 font-dev text-sm sm:text-base">
          <a
            href="https://dev.arjc.me"
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">01</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "ഡെവ് പോർട്ട്ഫോളിയോ" : "dev portfolio"}
            </span>
          </a>
          <a
            href="https://blogs.arjc.me"
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">02</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "പത്രം" : "blog"}
            </span>
          </a>
          <a
            href="https://music.arjc.me"
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">03</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "സംഗീതകൃതികൾ" : "music & works"}
            </span>
          </a>
          <a
            onClick={() => scrollTo('section-contact')}
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">04</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "തത്സമയ സംഭാഷണം" : "live chat"}
            </span>
          </a>
          <a
            onClick={() => scrollTo('section-gallery')}
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">05</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "ചിത്രങ്ങൾ" : "gallery"}
            </span>
          </a>
          <a
            onClick={() => scrollTo('section-comment')}
            className="group flex items-center gap-2 text-[#777] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="text-[#444] group-hover:text-[#888] transition-colors">06</span>
            <span className="border-b border-dashed border-[#333] group-hover:border-white pb-0.5">
              {isMalayalam ? "സന്വര്ക്കം" : "contact"}
            </span>
          </a>
        </div>
      </nav>

      {/* --- bottom separator --- */}
      <div className="w-full max-w-4xl mt-16 sm:mt-20">
        <hr className="dash-sep" />
      </div>
    </div>
  );
};
export default Action;
