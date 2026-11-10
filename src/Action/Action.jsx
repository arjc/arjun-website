import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const PROFILE_URL = "https://arjc-back.onrender.com/api/profile";

const scrollToPath = {
  2: '/gallery',
  3: '/contact',
  3.5: '/comment',
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
];

const Action = ({ parallaxRef }) => {
  const { isMalayalam } = useLanguage();
  const [pussy, setpussy] = useState(0);
  const [profile, setProfile] = useState({
    Name: {
      value: "Arjun M Liji",
      mal: "അർജുൻ മ. ലിജി",
    },
    Place: {
      value: "Kochi, Keralam IN",
      mal: "കൊച്ചി, കേരളം, ഇന്ത്യ",
    },
    current: {
      value: "",
      mal: "",
    },
  });
  const [profileError, setProfileError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setpussy((prev) => (prev + 1) % glyphs.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        const response = await fetch(PROFILE_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Profile request failed with status ${response.status}`);
        }

        const { data } = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Profile response did not contain a data array");
        }

        const profileEntries = data.reduce((entries, entry) => {
          if (entry?.key && typeof entry.value === "string" && typeof entry.mal === "string") {
            entries[entry.key] = {
              value: entry.value,
              mal: entry.mal,
            };
          }
          return entries;
        }, {});

        if (!profileEntries.Name || !profileEntries.Place || !profileEntries.current) {
          throw new Error("Profile response is missing Name, Place, or current");
        }

        setProfile((previousProfile) => ({
          ...previousProfile,
          ...profileEntries,
        }));
        setProfileError("");
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Unable to load profile:", requestError);
          setProfileError("Unable to load the latest profile details.");
        }
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, []);

  const scrollTo = (page) => {
    if (parallaxRef?.current) {
      parallaxRef.current.scrollTo(page);
      const path = scrollToPath[page] || '/';
      window.history.pushState({}, '', path);
    }
  };

  const name = isMalayalam ? profile.Name.mal : profile.Name.value;
  const place = isMalayalam ? profile.Place.mal : profile.Place.value;
  const current = isMalayalam ? profile.current.mal : profile.current.value;

  return (
    <div className="flex flex-col items-center text-center w-screen gap-10 bg-black pb-20">
      <div className="flex flex-col items-center justify-evenly gap-3">
        <div className="w-screen bg-white overflow-hidden">
          <span
            className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
            style={{
              animation: "marquee 16s ease-in-out infinite alternate",
            }}
          >
            {isMalayalam
              ? `നമസ്കാരം! ഞാൻ ${name} ~ `
              : `Hello! ${name} Here ~ `}
            {isMalayalam ? `${name} ~ ` : "Your fellow, Developer ~ "}
            {isMalayalam ? `${name} ~ ` : "I love music ~ "}
            {isMalayalam ? name : "And development ~ "}
          </span>
        </div>
        {profileError && (
          <p className="text-sm text-red-400 opacity-80">{profileError}</p>
        )}
        <p className="w-[90vw] lg:w-[75vw] text-2xl sm:text-3xl text-justify opacity-60 font-para mt-10 md:my-20 2xl:px-20 leading-normal">
          {isMalayalam ? (
            <div className="tracking-wide sm:tracking-wider">
              <span>
                നമസ്കാരം! എന്റെ പേര് {name} (
                {new Date().getFullYear() - 2007}), എനിക്ക് സംഗീതം, കമ്പ്യൂട്ടർ
                തുടങ്ങിയവ വളരെയധികം ഇഷ്ടമാണ്. {current}
                {place && ` ${place}.`}
              </span>
              <span>എന്റെ വെബ്‌സൈറ്റിലേക്ക് വന്നതിനു നന്ദി.</span>
            </div>
          ) : (
            <>
              <span>
                My name is {name}. I am a {new Date().getFullYear() - 2007}{" "}
                year old Computer Science Graduate from {place}. I am {current}.
              </span>{" "}
              <span>Thank you for visiting my website.</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row justify-center items-baseline gap-5 text-xl! sm:text-3xl leading-normal font-des">
        <a
          href="https://dev.arjc.me"
          className="text-purple-200! hover:tracking-widest py-1 underline decoration-wavy underline-offset-5 w-300 sm:w-auto px-11 m-auto sm:mb-10"
        >
          {isMalayalam ? (
              <span className="font-dev">ഡെവ് പോർട്ഫോളിയോ</span>
          ) : (
            "Dev Portfolio"
          )}
        </a>
        <a
          href="https://blogs.arjc.me"
          className="text-orange-200! hover:tracking-widest py-1 border-6 border-dashed! rounded-bl-4xl rounded-tr-4xl w-300 sm:w-auto px-11 m-auto sm:mb-10"
        >
          {isMalayalam ? (
            <>
              <span className="font-bold">• പ</span>
              <span className="font-dev">ത്രം </span>
              <span className="font-bold"> •</span>
            </>
          ) : (
            "• Blog •"
          )}
        </a>
        <a
          href="https://music.arjc.me"
          className="text-green-200! hover:tracking-widest py-1 overline w-300 sm:w-auto px-11 m-auto sm:mb-10"
        >
          {isMalayalam ? (
              <span className="font-dev">സംഗീതകൃതികൾ</span>
          ) : (
            "Music and works"
          )}
        </a>
        <a
          onClick={() => scrollTo(1.1)}
          className="text-yellow-200! hover:tracking-widest py-1 border-7 border-double! rounded-r-4xl w-300 sm:w-auto px-11 m-auto sm:mb-10 cursor-pointer"
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
          className="text-blue-200! hover:tracking-widest py-1 overline decoration-wavy underline-offset-5 w-300 sm:w-auto px-11 m-auto sm:mb-10 cursor-pointer"
        >
          {isMalayalam ? (
              <span className="font-dev">#ചിത്രങ്ങൾ</span>
          ) : (
            "#Gallery"
          )}
        </a>
        <a
          onClick={() => scrollTo(3.5)}
          className="text-red-200! hover:tracking-widest py-1 border-6 border-dotted! w-300 sm:w-auto px-11 m-auto sm:mb-10 cursor-pointer"
        >
          {isMalayalam ? (
            <>
              {" "}
              <span className="font-bold">സ</span>
              <span className="font-dev">ന്വര്ക്കം</span>
            </>
          ) : (
            "☚CONTACT☛"
          )}
        </a>
      </div>
      <span className="hidden md:text-[2em] lg:text-[3em] font-dev md:block transition-all duration-300">
        {glyphs[pussy]}
      </span>
    </div>
  );
};
export default Action;
