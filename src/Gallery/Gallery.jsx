import { useLanguage } from "../context/LanguageContext";

import na from "/gallery/na.webp";
import nss from "/gallery/nss.jpg";
import train from "/gallery/train.jpg";

const Gallery = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row justify-center w-screen min-h-screen bg-black text-white px-5 py-20">
      <div style={{width: '90vw'}}>
        <h1 className="font-des text-6xl md:text-8xl md:tracking-[1ch]">
          {isMalayalam ? "ചിത്രങ്ങൾ" : "GALLERY"}
        </h1>
        <h1 className="font-dev">~~&gt;</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 mt-20 sm:mt-0">
        <div
          className="grid grid-cols-4 gap-1 w-full max-w-4xl"
          style={{ gridTemplateRows: "200px 120px 120px 120px" }}
        >
          <div className="col-span-2 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="kakkoos"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-2 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="kannadi"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 row-span-2 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>


          <div className="col-span-2 row-span-2 overflow-hidden rounded-sm">
            <img
              src={nss}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 row-span-2 overflow-hidden rounded-sm">
            <img
              src={train}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-3 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          className="grid grid-cols-4 gap-1 w-full max-w-4xl"
          style={{ gridTemplateRows: "120px 120px 120px 200px" }}
        >
          <div className="col-span-3 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="kakkoos"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 row-span-3 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="no"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-2 row-span-2 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 row-span-2 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-4 row-span-1 overflow-hidden rounded-sm">
            <img
              src={na}
              alt="photo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
