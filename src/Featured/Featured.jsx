import { useLanguage } from "../context/LanguageContext";


const Featured = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-black m-0 p-10 min-h-250 sm:gap-20 flex flex-col md:flex-row justify-evenly items-baseline">
      <h1 className="font-des font-light text-left flex flex-col gap-5">
        {isMalayalam ? "വിഷയ സാധനം" : "ACTIVITIES"}
        <span className="font-dev">~~&gt;</span>
      </h1>
      <div className="flex flex-col gap-5 md:max-w-[65vw]">
        <span className="opacity-40">months: JA FE MR AP MY JN JL AG SP OC NV DC</span>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Kunjan AI Hasyarasam</h1>
            <span className="opacity-60">JN 2026</span>

            <p className="font-mono">Ottanthullal hasyarasam maker ai using google veo and suno (WIP)</p>
          </div>
        </div>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Pankajakshan - Font</h1>
            <span className="opacity-60">DR 2025</span>
            <p className="font-mono">Best malaylam font out there</p>
          </div>
        </div>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Pavanai Multiboot iso</h1>
            <span className="opacity-60">JL 2025</span>
            <p className="font-mono">Comes with malapuram kathi</p>
          </div>
        </div>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Neos Interactive orrery Project</h1>
            <span className="opacity-60">NV 2024</span>
            <p className="font-mono">Built for Nasa Space Apps Hackathon 2025</p>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Featured;
