import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    title: "Kunjan AI Hasyarasam",
    date: "JN 2026",
    desc: "Ottanthullal hasyarasam maker ai using google veo and suno",
    status: "wip",
  },
  {
    title: "Pankajakshan",
    date: "DR 2025",
    desc: "A Malayalam typeface. Possibly the best one out there.",
    status: "done",
  },
  {
    title: "Pavanai Multiboot",
    date: "JL 2025",
    desc: "Multiboot ISO that comes with malapuram kathi",
    status: "done",
  },
  {
    title: "Neos Interactive Orrery",
    date: "NV 2024",
    desc: "Built for NASA Space Apps Hackathon 2025",
    status: "done",
  },
];

const Featured = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-4 mb-16">
          <h1 className="font-des text-sm sm:text-base tracking-[0.2em] text-[#666] uppercase">
            {isMalayalam ? "വിഷയ സാധനം" : "activities"}
          </h1>
          <hr className="dash-sep flex-1" />
        </div>

        {/* timeline */}
        <div className="relative">
          {/* vertical dashed line */}
          <div className="absolute left-13 sm:left-18 top-0 bottom-0 border-l border-dashed border-[#222]" />

          <div className="flex flex-col gap-10 sm:gap-12">
            {projects.map((project, i) => (
              <div key={i} className="group flex items-start gap-4 sm:gap-6">
                {/* date column */}
                <div className="w-14 sm:w-20 shrink-0 text-right">
                  <span className="font-dev text-xs text-[#555]">{project.date}</span>
                </div>
                {/* dot on timeline */}
                <div className="relative shrink-0 mt-1.5">
                  <div className="w-2 h-2 border border-dashed border-[#555] group-hover:border-white rounded-full transition-all duration-500" />
                </div>
                {/* content */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="font-para text-sm sm:text-base text-[#ccc] group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h2>
                    {project.status === "wip" && (
                      <span className="font-dev text-[10px] tracking-widest text-[#555] border border-dashed border-[#333] px-2 py-0.5">
                        wip
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-[#666] mt-1 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
