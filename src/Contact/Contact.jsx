import { useLanguage } from "../context/LanguageContext";

const links = [
  { label: "youtube", handle: "@arjcyt", url: "https://www.youtube.com/@arjcyt", color: "#ff0000" },
  { label: "github", handle: "arjc", url: "https://www.github.com/arjc", color: "#e8e8e8" },
  { label: "linkedin", handle: "arjc", url: "https://www.linkedin.com/in/arjc", color: "#0a66c2" },
  { label: "instagram", handle: "arjcig", url: "https://www.instagram.com/arjcig", color: "#e1306c" },
  { label: "discord", handle: "arjc", url: "https://discordapp.com/", color: "#7289da" },
  { label: "leetcode", handle: "arjc", url: "https://leetcode.com/u/arjc/", color: "#FFA116" },
];

const Contact = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-4 mb-16">
          <h1 className="font-des text-sm sm:text-base tracking-[0.2em] text-[#666] uppercase shrink-0">
            {isMalayalam ? "സന്വര്ക്കം" : "contact"}
          </h1>
          <hr className="dash-sep flex-1" />
        </div>

        {/* reach out message */}
        <div className="mb-14 max-w-xl">
          <p className="font-para text-sm sm:text-base text-[#888] leading-loose">
            {isMalayalam
              ? "എന്നെ ബന്ധപ്പെടാൻ ചുവടെയുള്ള ലിങ്കുകൾ ഉപയോഗിക്കുക. സന്ദേശങ്ങൾ, സഹകരണം, അല്ലെങ്കിൽ ഒരു ഹലോ."
              : "feel free to reach out. for messages, collaborations, or just to say hello. i'm always happy to connect."
            }
          </p>
        </div>

        {/* social links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 border-b border-dashed border-[#1a1a1a] hover:border-[#444] transition-all duration-400"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: link.color }}
                />
                <span className="font-dev text-sm text-[#777] group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
              </div>
              <span className="font-dev text-xs text-[#444] group-hover:text-[#888] transition-colors duration-300">
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
