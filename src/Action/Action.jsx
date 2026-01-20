import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const scrollToPath = {
  1.1: '/wall',
  1.5: '/wall',
  2: '/gallery',
  3: '/contact',
  3.5: '/contact',
};

const glyphs = [
  "==>",
  "<==",
  "==>",
  ":::",
  "...",
  ":::",
  "\\\\\\///",
  "///\\\\\\",
  "\\\\\\///",
  "***",
  "**",
  "***",
  "<~~ ~~>",
  "~~ ~~",
  "~~> <~~",
  "!==",
  "===",
  "!==",
  "</>",
  "< >",
  "</>",
  "#=#",
  "###",
  "#=#",
  "==",
  "===",
  "==",
  "/(O_O)\\",
  "\\(*0*)/",
  "/(O_O)\\",
  "/(O.O)\\",
];

const Action = ({ parallaxRef }) => {
  const { isMalayalam } = useLanguage();
  const [pussy, setpussy] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setpussy((prev) => (prev + 1) % glyphs.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (page) => {
    if (parallaxRef?.current) {
      parallaxRef.current.scrollTo(page);
      const path = scrollToPath[page] || '/';
      window.history.pushState({}, '', path);
    }
  };

  return (
    <div className="flex flex-col items-center text-center w-screen gap-10 bg-black" style={{height: '900px'}}>
      <div className="flex flex-col items-center justify-evenly gap-3">
        <div className="w-screen bg-white overflow-hidden">
          <span
            className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
            style={{
              animation: "marquee 16s ease-in-out infinite alternate",
            }}
          >
            {isMalayalam
              ? "നമസ്കാരം! ഞാൻ അർജുൻ ലിജി ~ "
              : "Hello! Arjun Here ~ "}
            {isMalayalam ? "അർജുൻ ലിജി ~ " : "Your fellow, Developer ~ "}
            {isMalayalam ? "അർജുൻ ലിജി ~ " : "I love music ~ "}
            {isMalayalam ? "അർജുൻ ലിജി " : "And development ~ "}
          </span>
        </div>
        <p className="w-[90vw] sm:w-[75vw] text-3xl sm:text-5xl opacity-60 font-para mt-10 md:mt-20 2xl:px-20 2xl:leading-normal">
          {isMalayalam ? (
            <div className="tracking-wider sm:tracking-widest">
              <span>
                നമസ്കാരം! എന്റെ പേര് അർജുൻ എം ലിജി (
                {new Date().getFullYear() - 2007}), എനിക്ക് സംഗീതം, കമ്പ്യൂട്ടർ
                തുടങ്ങിയവ വളരെയധികം ഇഷ്ടമാണ്.
              </span>
              <span>എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി.</span>
            </div>
          ) : (
            <>
              <span>
                My name is Arjun M Liji I am a {new Date().getFullYear() - 2007}{" "}
                year old guy who has a deep love for computers and music.
              </span>{" "}
              <span>Thank you for visiting my website.</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-center items-baseline gap-5 text-4xl sm:text-5xl leading-normal font-des">
        <a
          href="https://dev.arjc.me"
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto "
        >
          {isMalayalam ? (
            <>
              <span className="font-bold">ഡെ</span>
              <span className="font-dev">വ് പോർട്ട്ഫോളിയോ</span>
            </>
          ) : (
            "Dev Portfolio"
          )}
        </a>
        <a
          href="https://blogs.arjc.me"
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto "
        >
          {isMalayalam ? (
            <>
              <span className="font-bold">പ</span>
              <span className="font-dev">ത്രം</span>
            </>
          ) : (
            "Blog"
          )}
        </a>
        <a
          href="https://music.arjc.me"
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto "
        >
          {isMalayalam ? (
            <>
              <span className="font-bold">സം</span>
              <span className="font-dev">ഗീതകൃതികൾ</span>
            </>
          ) : (
            "Music and works"
          )}
        </a>
        <a
          onClick={() => scrollTo(1.1)}
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto cursor-pointer"
        >
          {isMalayalam ? (
            <>
              {" "}
              <span className="font-bold">ത</span>
              <span className="font-dev">ത്സമയ സംഭാഷണം</span>
            </>
          ) : (
            "Live chat"
          )}
        </a>
        <a
          onClick={() => scrollTo(2)}
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto cursor-pointer"
        >
          {isMalayalam ? (
            <>
              <span className="font-bold">ചി</span>
              <span className="font-dev">ത്രങ്ങൾ</span>
            </>
          ) : (
            "Gallery"
          )}
        </a>
        <a
          onClick={() => scrollTo(3.5)}
          className="px-3 py-1 border-y sm:border-4 sm:rounded-2xl w-screen sm:w-auto cursor-pointer"
        >
          {isMalayalam ? (
            <>
              {" "}
              <span className="font-bold">സ</span>
              <span className="font-dev">ന്വര്ക്കം</span>
            </>
          ) : (
            "Contact"
          )}
        </a>
      </div>
      <span className="hidden md:text-[4em] lg:text-[7em] font-dev md:block transition-all duration-300">
        {glyphs[pussy]}
      </span>
    </div>
  );
};
export default Action;
