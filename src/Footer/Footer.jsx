import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { isMalayalam } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isAdblockActive = window.isAdblockActive;

  return (
    <footer className="absolute text-center p-15 mt-[485vh] bg-black bottom-0 w-screen text-white">
      <div className="flex flex-col items-center gap-1">
        <h1>arjc.me</h1>
        <div className="flex gap-4 font-1">
          <a href="https://arjunliji.free.nf">
            {isMalayalam ? "പുരാപതിപ്പ്" : "Legacy"}
          </a>
          <a href="/legal">{isMalayalam ? "നിയമപരം" : "Legal"}</a>
          <a href="/privacy">{isMalayalam ? "സ്വകാര്യത" : "Privacy"}</a>
        </div>
        <div className="inline-flex items-center justify-center gap-2 flex-wrap">
          {isAdblockActive ? (
            <div>Disable Ad block</div>
          ) : (
            <>
              {isMalayalam ? "നിങ്ങൾ" : "U r part of"}
              <img
                src="https://hitwebcounter.com/counter/counter.php?page=21466989&style=0024&nbdigits=8&type=ip&initCount=0"
                alt="failed to load"
                border="0"
              />
              {isMalayalam ? "സന്ദർശകരുടെ ഭാഗമാണ്" : "visitors"}
            </>
          )}
          {/* {isMalayalam ? "നന്ദി" : "Thank you"} */}
        </div>
        <div className="opacity-60">
          {isMalayalam
            ? `© 2023-${currentYear} അർജുൻ എം ലിജി`
            : `© 2023-${currentYear} Arjun M Liji`}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
