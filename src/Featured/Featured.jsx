import { useLanguage } from "../context/LanguageContext";

import template from "/gallery/na.webp";

const Featured = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-black m-0 p-10 min-h-250 gap-10">
      <h1 className="font-des font-light md:tracking-[1ch] text-left">
        {isMalayalam ? "വിഷയ സാധനം ~" : "FEATURED ~"}
      </h1>
      <div className="my-10 items-center justify-center flex flex-col gap-10">
        <div className="flex flex-col md:flex-row text-center gap-2 w-[70vw] sm:w-[95vw]">
          {/* mainimg */}
          <div className="">
            <img src={template} alt="template" className="h-206 rounded-md object-cover" />
          </div>
          {/* smolimgs */}
          <div className="flex sm:flex-col gap-2">
            <img src={template} alt="template" className="h-50 w-max overflow-x-auto object-cover rounded-md"/>
            <img src={template} alt="template" className="h-50 w-max overflow-x-auto object-cover rounded-md"/>
            <img src={template} alt="template" className="h-50 w-max overflow-x-auto object-cover rounded-md"/>
            <img src={template} alt="template" className="h-50 w-max overflow-x-auto object-cover rounded-md"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
