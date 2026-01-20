import { useLanguage } from "../context/LanguageContext";

import template from "/gallery/na.webp";

const Featured = () => {    
    const { isMalaylam } = useLanguage();

    return (
        <div className="flex flex-col sm:flex-row min-h-250 bg-black m-0 p-10 text-center">
            
            {isMalaylam ? <h1>വിഷയം സാധനം</h1> : <h1 className="font-des font-light md:tracking-[1ch] text-left">FEATURED ~</h1> }
            
            <div>
                <img src="" alt="" />
            </div>
            <div className="flex sm:flex-col ">
            </div>
        </div>

    );
};

export default Featured;