import { useLanguage } from "../context/LanguageContext";

import na from "/gallery/na.webp";
import nss from "/gallery/nss.jpg";
import train from "/gallery/train.jpg";

const photos = [
  { src: na, alt: "photograph", span: "col-span-2 row-span-2" },
  { src: na, alt: "photograph", span: "col-span-1 row-span-1" },
  { src: train, alt: "train journey", span: "col-span-1 row-span-2" },
  { src: nss, alt: "nss camp", span: "col-span-2 row-span-1" },
  { src: na, alt: "photograph", span: "col-span-1 row-span-1" },
  { src: na, alt: "photograph", span: "col-span-1 row-span-1" },
  { src: na, alt: "photograph", span: "col-span-2 row-span-1" },
  { src: na, alt: "photograph", span: "col-span-1 row-span-1" },
  { src: na, alt: "photograph", span: "col-span-1 row-span-1" },
];

const Gallery = () => {
  const { isMalayalam } = useLanguage();

  return (
    <div className="bg-black px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-4 mb-14">
          <h1 className="font-des text-sm sm:text-base tracking-[0.2em] text-[#666] uppercase shrink-0">
            {isMalayalam ? "ചിത്രങ്ങൾ" : "gallery"}
          </h1>
          <hr className="dash-sep flex-1" />
        </div>

        {/* photo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 auto-rows-[minmax(100px,1fr)] gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`${photo.span} group relative overflow-hidden border border-dashed border-[#222] hover:border-[#555] transition-all duration-500`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
              />
              {/* dashed corner accents on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-dashed border-white/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-dashed border-white/30" />
              </div>
            </div>
          ))}
        </div>

        {/* quiet caption */}
        <div className="mt-8 text-center">
          <span className="font-dev text-xs text-[#444] tracking-widest">
            {isMalayalam ? "· · · കൂടുതൽ ഉടൻ · · ·" : "· · · more coming soon · · ·"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
