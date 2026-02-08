import { useLanguage } from "../context/LanguageContext";

const Photogrid = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="border border-dashed border-[#222] p-10 sm:p-16 flex flex-col items-center gap-6">
          <div className="font-dev text-[#333] text-sm tracking-[1em]">· · ·</div>
          <p className="font-des text-xs sm:text-sm text-[#555] tracking-[0.15em] text-center leading-relaxed">
            {isMalayalam
              ? "ക്ഷമയോടെ നിർമ്മിക്കപ്പെടുന്നു"
              : "still painting this corner"
            }
          </p>
          <p className="font-dev text-[10px] text-[#333] tracking-widest">
            {isMalayalam ? "ഉടൻ വരും" : "check back later"}
          </p>
          <div className="font-dev text-[#333] text-sm tracking-[1em]">· · ·</div>
        </div>
      </div>
    </div>
  );
};

export default Photogrid;
