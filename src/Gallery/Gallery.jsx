import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const GALLERY_URL = "https://arjc-back.onrender.com/api/gallery";

const FLIP_SPEED = 750;

const flipDownTop = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" },
];
const flipDownBottom = [
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(0)" },
];
const flipUpTop = [
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(-90deg)" },
  { transform: "rotateX(0)" },
];
const flipUpBottom = [
  { transform: "rotateX(0)" },
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(90deg)" },
];

const Gallery = () => {
  const { isMalayalam } = useLanguage();
  const containerRef = useRef(null);
  const desktopSheetRef = useRef(null);
  const currentIndexRef = useRef(0);
  const timersRef = useRef([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDesktopFlipping, setIsDesktopFlipping] = useState(false);
  const [desktopDirection, setDesktopDirection] = useState("next");
  const [desktopFlipSource, setDesktopFlipSource] = useState(null);

  const setImage = useCallback((element, index) => {
    element.style.backgroundImage = `url("${images[index].url}")`;
  }, [images]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGallery = async () => {
      try {
        const response = await fetch(GALLERY_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Gallery request failed with status ${response.status}`);
        }

        const { data } = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Gallery response did not contain a data array");
        }

        const entries = data.filter(
          (entry) =>
            typeof entry?.title === "string" &&
            typeof entry?.desc === "string" &&
            typeof entry?.img === "string" &&
            entry.img.length > 0,
        ).map((entry) => ({
          title: entry.title,
          description: entry.desc,
          url: entry.img,
        }));

        if (entries.length === 0) {
          throw new Error("Gallery response did not contain valid image entries");
        }

        setImages(entries);
        setCurrentIndex(0);
        currentIndexRef.current = 0;
        setError("");
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Unable to load gallery:", requestError);
          setError("Unable to load gallery.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchGallery();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return undefined;
    const timers = timersRef.current;

    container.querySelectorAll(".flip-gallery__panel").forEach((panel) => {
      setImage(panel, 0);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [images, setImage]);

  // Mobile: horizontal-split flip
  const updateGallery = (increment) => {
    if (isFlipping || images.length === 0) return;

    const nextIndex =
      (currentIndexRef.current + increment + images.length) % images.length;
    const container = containerRef.current;
    if (!container) return;

    const top = container.querySelector(".flip-gallery__overlay-top");
    const bottom = container.querySelector(".flip-gallery__overlay-bottom");
    const isReverse = increment < 0;
    setIsFlipping(true);
    setCurrentIndex(nextIndex);
    currentIndexRef.current = nextIndex;

    top.animate(isReverse ? flipUpTop : flipDownTop, {
      duration: FLIP_SPEED,
      iterations: 1,
      easing: "ease-in-out",
    });
    bottom.animate(isReverse ? flipUpBottom : flipDownBottom, {
      duration: FLIP_SPEED,
      iterations: 1,
      easing: "ease-in-out",
    });

    const panels = container.querySelectorAll(".flip-gallery__panel");
    panels.forEach((panel, index) => {
      const delay =
        (isReverse && index !== 1 && index !== 2) ||
        (!isReverse && (index === 1 || index === 2))
          ? FLIP_SPEED - 200
          : 0;
      const timer = window.setTimeout(() => setImage(panel, nextIndex), delay);
      timersRef.current.push(timer);
    });

    const finishTimer = window.setTimeout(() => setIsFlipping(false), FLIP_SPEED);
    timersRef.current.push(finishTimer);
  };

  // Desktop: book-style page flip.
  // currentIndex is only committed AFTER the animation ends, so the static
  // pages underneath don't jump to the new images mid-flip.
  const updateDesktopGallery = (increment) => {
    if (isDesktopFlipping || images.length < 2) return;

    const current = currentIndexRef.current;
    const nextIndex = (current + increment * 2 + images.length) % images.length;
    const direction = increment > 0 ? "next" : "previous";

    setDesktopDirection(direction);
    setDesktopFlipSource({
      front: direction === "next" ? (current + 1) % images.length : current,
      back: direction === "next" ? nextIndex : (nextIndex + 1) % images.length,
      target: nextIndex,
    });
    setIsDesktopFlipping(true);

    const timer = window.setTimeout(() => {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      setIsDesktopFlipping(false);
    }, FLIP_SPEED);
    timersRef.current.push(timer);
  };

  useEffect(() => {
    const sheet = desktopSheetRef.current;
    if (!sheet || !isDesktopFlipping) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animation = sheet.animate(
      [
        { transform: "rotateY(0deg)" },
        { transform: `rotateY(${desktopDirection === "next" ? -180 : 180}deg)` },
      ],
      {
        duration: reducedMotion ? 1 : FLIP_SPEED,
        easing: "ease-in-out",
        fill: "forwards",
      },
    );

    return () => animation.cancel();
  }, [desktopDirection, isDesktopFlipping]);

  // What the static desktop pages show while a flip is in progress:
  // next     -> left stays on old image, right already shows the new right image
  // previous -> right stays on old image, left already shows the new left image
  const flipping = isDesktopFlipping && desktopFlipSource;
  const leftIndex =
    flipping && desktopDirection === "previous"
      ? desktopFlipSource.target
      : currentIndex;
  const rightIndex =
    flipping && desktopDirection === "next"
      ? (desktopFlipSource.target + 1) % images.length
      : (currentIndex + 1) % images.length;

  if (isLoading || error || images.length === 0) {
    return (
      <section className="flex min-h-screen w-screen items-center justify-center bg-black px-5 text-center text-white">
        <p className="font-dev text-sm text-white/70">
          {isLoading ? "Loading gallery..." : error}
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen w-screen text-center flex-col items-center justify-center bg-black px-5 py-20 text-white">
      <div className="mb-12 w-full max-w-7xl">
        <span className="font-des text-7xl! md:text-8xl text-center md:tracking-[1ch]">
          {isMalayalam ? "ചിത്രങ്ങൾ" : "GALLERY"}
        </span>
        <span className="font-dev text-7xl!">~~&gt;</span>
      </div>

      <div className="relative p-5">
        {/* Mobile */}
        <div className="md:hidden mx-10">
          <div
            ref={containerRef}
            className="relative h-[400px] w-[240px] text-center [perspective:800px] md:h-[500px] md:w-[300px]"
            aria-label={`Gallery image: ${images[currentIndex].title}`}
          >
            <div className="flip-gallery__panel flip-gallery__top absolute left-0 top-0 h-1/2 w-full overflow-hidden bg-[length:100%_200%] bg-top bg-no-repeat [backface-visibility:hidden] [transform-origin:bottom]" />
            <div className="flip-gallery__panel flip-gallery__bottom absolute bottom-0 left-0 h-1/2 w-full overflow-hidden bg-[length:100%_200%] bg-bottom bg-no-repeat [backface-visibility:hidden] [transform-origin:top]" />
            <div className="flip-gallery__panel flip-gallery__overlay-top absolute left-0 top-0 z-10 h-1/2 w-full overflow-hidden bg-[length:100%_200%] bg-top bg-no-repeat [backface-visibility:hidden] [transform-origin:bottom]" />
            <div className="flip-gallery__panel flip-gallery__overlay-bottom absolute bottom-0 left-0 z-10 h-1/2 w-full overflow-hidden bg-[length:100%_200%] bg-bottom bg-no-repeat [backface-visibility:hidden] [transform-origin:top]" />
            <div className="absolute left-0 top-1/2 z-20 h-1 w-full -translate-y-1/2 bg-black" aria-hidden="true" />
          </div>
        </div>

        {/* Desktop */}
        <div
          className="relative hidden w-full bg-[#050505]  [perspective:1200px] md:flex md:h-[min(54vw,430px)]"
        >
          <div
            className="absolute left-0 top-0 h-full w-1/2  bg-cover bg-center bg-no-repeat [backface-visibility:hidden]"
            style={{ backgroundImage: `url("${images[leftIndex].url}")` }}
            aria-label={images[leftIndex].title}
          />
          <div
            className="absolute right-0 top-0 h-full w-1/2  bg-cover bg-center bg-no-repeat [backface-visibility:hidden]"
            style={{ backgroundImage: `url("${images[rightIndex].url}")` }}
            aria-label={images[rightIndex].title}
          />
          <div
            className="absolute bottom-0 left-1/2 top-0 z-20 w-0.5 -translate-x-1/2 bg-[#111] shadow-[0_0_10px_#000]"
            aria-hidden="true"
          />
          {isDesktopFlipping && desktopFlipSource && (
            <div
              ref={desktopSheetRef}
              className={`absolute top-0 z-[100] h-full w-1/2 transform-gpu [transform-style:preserve-3d] ${
                desktopDirection === "next"
                  ? "right-0 origin-left"
                  : "left-0 origin-right"
              }`}
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 z-10  bg-cover bg-center bg-no-repeat [backface-visibility:hidden]"
                style={{
                  backgroundImage: `url("${images[desktopFlipSource.front].url}")`,
                }}
              />
              <div
                className="absolute inset-0 z-10  bg-cover bg-center bg-no-repeat [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{
                  backgroundImage: `url("${images[desktopFlipSource.back].url}")`,
                }}
              />
            </div>
          )}
        </div>

        {/* Mobile caption + controls */}
        <div className="mt-4 flex items-start justify-between gap-8 md:hidden">
          <div className="max-w-[180px] text-xs text-white/75">
            <p className="m-0 font-bold">{images[currentIndex].title}</p>
            <p className="opacity-70">{images[currentIndex].description}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateGallery(-1)}
              disabled={isFlipping}
              title="Previous image"
              aria-label="Previous image"
              className="leading-none border border-dashed  text-white/75 transition hover:text-white disabled:opacity-40"
            >
              <span className="font-dev">&lt;~</span>
            </button>
            <button
              type="button"
              onClick={() => updateGallery(1)}
              disabled={isFlipping}
              title="Next image"
              aria-label="Next image"
              className="leading-none border border-dashed  text-white/75 transition hover:text-white disabled:opacity-40"
            >
              <span className="font-dev">~&gt;</span>
            </button>
          </div>
        </div>

        {/* Desktop captions + controls */}
        <div className="mt-4 hidden items-start justify-between gap-8 md:flex">
          <div className="grid max-w-[500px] flex-1 grid-cols-2 gap-6 text-xs text-white/75">
            {[currentIndex, (currentIndex + 1) % images.length].map((index) => (
              <div key={images[index].title}>
                <p className="m-0 font-bold">{images[index].title}</p>
                <p className="m-1 opacity-70">{images[index].description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateDesktopGallery(-1)}
              disabled={isDesktopFlipping}
              title="Previous spread"
              aria-label="Previous spread"
              className="text-2xl leading-none border border-dashed  text-white/75 transition rounded-none! hover:text-white disabled:opacity-40"
            >
              <span className="font-dev">&lt;~~</span>
            </button>
            <button
              type="button"
              onClick={() => updateDesktopGallery(1)}
              disabled={isDesktopFlipping}
              title="Next spread"
              aria-label="Next spread"
              className="text-2xl leading-none border border-dashed  text-white/75 transition rounded-none! hover:text-white disabled:opacity-40"
            >
              <span className="font-dev">~~&gt;</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Gallery;