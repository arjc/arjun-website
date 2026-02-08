import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { isMalayalam } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isAdblockActive = window.isAdblockActive;

  return (
    <footer className="bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 pt-16 pb-12">
      <div className="max-w-4xl mx-auto">
        <hr className="dash-sep mb-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* left - identity */}
          <div className="flex flex-col gap-2">
            <span className="font-dev text-sm text-[#666] tracking-widest">
              {isMalayalam ? "അർജസ" : "arjc.me"}
            </span>
            <span className="font-dev text-[10px] text-[#333]">
              {isMalayalam
                ? `© ${currentYear} അർജുൻ എം ലിജി`
                : `© ${currentYear} arjun m liji`}
            </span>
          </div>

          {/* middle - links */}
          <div className="flex gap-6 font-dev text-xs">
            <a href="https://arjunliji.free.nf" className="text-[#444] hover:text-[#888] border-b border-dashed border-[#222] hover:border-[#555] pb-0.5 transition-all duration-300">
              {isMalayalam ? "പുരാപതിപ്പ്" : "legacy"}
            </a>
            <a href="/legal" className="text-[#444] hover:text-[#888] border-b border-dashed border-[#222] hover:border-[#555] pb-0.5 transition-all duration-300">
              {isMalayalam ? "നിയമപരം" : "legal"}
            </a>
            <a href="/privacy" className="text-[#444] hover:text-[#888] border-b border-dashed border-[#222] hover:border-[#555] pb-0.5 transition-all duration-300">
              {isMalayalam ? "സ്വകാര്യം" : "privacy"}
            </a>
          </div>

          {/* right - visitor count */}
          <div className="flex items-center gap-2">
            {isAdblockActive ? (
              <span className="font-dev text-[10px] text-[#333]">~</span>
            ) : (
              <>
                <span className="font-dev text-[10px] text-[#444]">
                  {isMalayalam ? "സന്ദർശകർ" : "visitors"}
                </span>
                <img
                  src="https://hitwebcounter.com/counter/counter.php?page=21466989&style=0024&nbdigits=8&type=ip&initCount=0"
                  alt=""
                  border="0"
                  className="h-3 opacity-50"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
