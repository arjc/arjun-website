import { useLanguage } from "../context/LanguageContext";


const Featured = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-black m-0 p-10 min-h-250 sm:gap-20 flex flex-col md:flex-row justify-around items-baseline">
      <h1 className="font-des font-light text-left flex sm:flex-col gap-5">
        {isMalayalam ? "വിഷയ സാധനം" : "ACTIVITIES"}
        <span className="font-dev">~~&gt;</span>
      </h1>
      <div className="flex flex-col gap-5 w-[90vw] sm:max-w-[65vw]">
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Kunjan AI Hasyarasam</h1>
            <span className="opacity-60">16th jun 2005</span>

            <p className="font-mono">I have worked on this so and so shit like omg</p>
          </div>
        </div>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Pankajakshan - Font</h1>
            <span className="opacity-60">16th jun 2005</span>
            <p className="font-mono">Best malaylam font out there</p>
          </div>
        </div>
        <div>
          <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
            <h1 className="font-para">Pavanai Multiboot iso</h1>
            <span className="opacity-60">16th jun 2005</span>
            <p className="font-mono">Comes with malapuram kathi</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Featured;
