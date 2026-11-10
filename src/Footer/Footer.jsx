import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ename, mname } from "../App";

const WIDTH_STEP = 16;
const STROKE = 28;

const mulberry32 = (seed) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
};

const buildRings = (width, height, isMalayalam) => {
  const ringCount = width < 640 ? 2 : 3;
  const random = mulberry32(23);
  const ringLines = isMalayalam
    ? [
        "എപ്പോഴും ചിന്തിച്ചുകൊണ്ടിരിക്കുന്ന ഒരാൾക്ക്, ചിന്തകളല്ലാതെ മറ്റൊന്നിനെക്കുറിച്ചും ചിന്തിക്കാനില്ല.",
        "കോഡ്‌ബേസിൽ നിങ്ങളുടേതാക്കൂ",
        "വ്യക്തമായ തീരുമാനങ്ങൾ, കുറച്ച് ബോയിലർപ്ലേറ്റ്",
      ]
    : [
        " We're no strangers to love", " You know the rules and so do I",
        "I just wanna tell you how I'm feeling", "Gotta make you understand",
        "Never gonna give you up Never gonna let you down Never gonna run around And desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie And hurt you",
      ];
  const outerRadius = Math.max(Math.min(width / 2 - 16, height - 16), 100);
  const fontSize = Math.min(20, Math.max(12, width * 0.018));

  return Array.from({ length: ringCount }, (_, index) => {
    const radius = (outerRadius * (index + 1)) / ringCount;
    const line = ringLines[Math.floor(random() * ringLines.length)];
    const other = ringLines[Math.floor(random() * ringLines.length)];
    const unit = `${line}   ·   ${other}   ·   ${line}   ·   `;
    const repeats = Math.min(
      6,
      Math.max(2, Math.ceil((2 * Math.PI * radius) / (unit.length * fontSize * 0.65))),
    );
    const size = Math.ceil(2 * (radius + STROKE / 2 + 2));

    return {
      radius,
      size,
      fontSize,
      text: unit.repeat(repeats),
      duration: 42 + index * 8 + random() * 10,
      reverse: index % 2 === 1,
      phase: random(),
    };
  });
};

const Footer = ({ animated = true }) => {
  const { isMalayalam } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isAdblockActive = window.isAdblockActive;
  const footerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const [isTabActive, setIsTabActive] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );
  const id = useId().replace(/:/g, "");
  const height = width > 0 ? Math.max(300, Math.min(520, width * 0.52)) : 300;
  const rings = useMemo(
    () => (width > 0 ? buildRings(width, height, isMalayalam) : []),
    [width, height, isMalayalam],
  );
  const displayName = isMalayalam ? mname : ename;

  // Rings exist in the DOM only while the footer is actually on screen.
  const live = isVisible && isTabActive && rings.length > 0;
  const saveData =
    typeof navigator !== "undefined" && navigator.connection?.saveData === true;
  const shouldAnimate = animated && !saveData;

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = Math.round(footer.clientWidth / WIDTH_STEP) * WIDTH_STEP;
      setWidth((current) => (current === next ? current : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(footer);
    measure();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        setIsVisible(visible);
        if (visible) setHasSeen(true);
      },
      { rootMargin: "32px" },
    );
    intersectionObserver.observe(footer);

    const onVisibility = () => setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      aria-label="Site footer"
      className="relative w-full overflow-hidden bg-black text-[#e8e6e1]"
      style={{ height, contain: "layout paint" }}
    >
      <style>{`
        @keyframes ${id}-spin { to { transform: rotate(360deg); } }
        .${id}-ring {
          position: absolute;
          left: 50%;
          pointer-events: none;
          contain: strict;
        }
        .${id}-ring[data-animate="true"] {
          will-change: transform;
          animation: ${id}-spin var(--dur) linear infinite;
          animation-delay: var(--delay);
          animation-direction: var(--dir);
        }
        @media (prefers-reduced-motion: reduce) {
          .${id}-ring[data-animate="true"] { animation: none; will-change: auto; }
        }
        .${id}-link { color: #d6d3cc; transition: color 0.15s; }
        .${id}-link:hover, .${id}-link:focus-visible { color: #fff; text-decoration: underline; }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-label={displayName}
        role="img"
      >
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1000 520"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <text
            x="500"
            y="315"
            textAnchor="middle"
            textLength="920"
            lengthAdjust="spacingAndGlyphs"
            fill="transparent"
            stroke="#807d78"
            strokeWidth="1.8"
            paintOrder="stroke"
            fontFamily="JetBrains Mono, Manjari, monospace"
            fontSize="175"
            fontWeight="700"
          >
            {displayName}
          </text>
        </svg>
      </div>

      {live && (
        <div className="absolute inset-0" aria-hidden="true">
          {rings.map((ring, index) => {
            const c = ring.size / 2;
            const pathId = `${id}-path-${index}`;
            return (
              <div
                key={index}
                className={`${id}-ring`}
                data-animate={shouldAnimate}
                style={{
                  width: ring.size,
                  height: ring.size,
                  marginLeft: -c,
                  bottom: -c,
                  "--dur": `${ring.duration}s`,
                  "--delay": `${-ring.phase * ring.duration}s`,
                  "--dir": ring.reverse ? "reverse" : "normal",
                }}
              >
                <svg
                  width={ring.size}
                  height={ring.size}
                  viewBox={`0 0 ${ring.size} ${ring.size}`}
                  shapeRendering="optimizeSpeed"
                >
                  <path
                    id={pathId}
                    d={`M ${c} ${c - ring.radius} a ${ring.radius} ${ring.radius} 0 1 1 0 ${ring.radius * 2} a ${ring.radius} ${ring.radius} 0 1 1 0 -${ring.radius * 2}`}
                    fill="none"
                    stroke="#fff0"
                    strokeWidth={STROKE}
                  />
                  <text
                    fontSize={ring.fontSize}
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontWeight="700"
                    letterSpacing="0.05em"
                    dominantBaseline="central"
                    fill="#6b6962"
                  >
                    <textPath href={`#${pathId}`} startOffset="0%">
                      {ring.text}
                    </textPath>
                  </text>
                </svg>
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-2 z-10 flex items-end justify-between px-1 text-[10px] leading-tight text-[#d6d3cc] sm:bottom-3 sm:px-2 sm:text-xs">
        <nav className="flex flex-wrap gap-x-2 gap-y-1 font-1" aria-label="Footer links">
          <a className={`${id}-link text-sm sm:text-base`} href="https://arjunliji.free.nf">
            {isMalayalam ? "പുരാപതിപ്പ്" : "Legacy"}
          </a>
          <a className={`${id}-link text-sm sm:text-base`} href="/legal">
            {isMalayalam ? "നിയമപരം" : "Legal"}
          </a>
          <a className={`${id}-link text-sm sm:text-base`} href="/privacy">
            {isMalayalam ? "സ്വകാര്യം" : "Privacy"}
          </a>
        </nav>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="inline-flex flex-wrap items-center justify-end gap-1 text-[8px] sm:text-[10px]">
          {isAdblockActive ? (
            <span className="opacity-60">Disable Ad block</span>
          ) : (
            <>
              {isMalayalam ? "നിങ്ങൾ" : "U r part of"}
              {hasSeen && (
                <img
                  src="https://hitwebcounter.com/counter/counter.php?page=21466989&style=0024&nbdigits=8&type=ip&initCount=0"
                  alt="Visitor count"
                  decoding="async"
                />
              )}
              {isMalayalam ? "സന്ദർശകരുടെ ഭാഗമാണ്" : "visitors"}
            </>
          )}
          </div>
          <div className="text-[8px] opacity-60 sm:text-[10px]">
            {isMalayalam ? `© 2023-${currentYear} അർജുൻ എം ലിജി` : `© 2023-${currentYear} Arjun M Liji`}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;