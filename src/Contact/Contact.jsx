import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-black text-white px-5 py-20">
      <div className="w-screen bg-white overflow-hidden">
        <span
          className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
          style={{
            animation: "marquee 100s ease-in-out infinite alternate",
          }}
        >
          {isMalayalam ? "നമസ്കാരം! ഞാൻ അർജുൻ ലിജി ~ " : "Hello! Arjun Here ~ "}

        </span>
      </div>
    </div>
  );
};

export default Contact;
