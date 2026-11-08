import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const ACTIVITIES_URL = "https://arjc-back.onrender.com/api/activities";

const Featured = () => {
  const { isMalayalam } = useLanguage();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchActivities = async () => {
      try {
        const response = await fetch(ACTIVITIES_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Activities request failed with status ${response.status}`);
        }

        const { data } = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Activities response did not contain a data array");
        }

        setActivities(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Unable to load featured works:", requestError);
          setError("Unable to load featured works.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchActivities();

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-black m-0 p-10 min-h-250 sm:gap-20 flex flex-col md:flex-row justify-evenly items-baseline">
      <h1 className="font-des font-light text-left flex flex-col gap-5">
        {isMalayalam ? "വിഷയ സാധനം" : "ACTIVITIES"}
        <span className="font-dev">~~&gt;</span>
      </h1>
      <div className="flex flex-col gap-5 md:max-w-[65vw]">
        <span className="opacity-40">months: JA FB MR AP MY JN JL AG SP OC NV DC</span>
        {isLoading && <p className="opacity-60">Loading featured works...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!isLoading && !error && activities.length === 0 && (
          <p className="opacity-60">No featured works found.</p>
        )}
        {activities.map((activity, index) => {
          const title = activity.title;
          const date = activity.dt;
          const description = activity.sub;
          const link = activity.link || activity.url;

          const content = (
            <div className="border-2 border-dashed rounded-2xl px-10 py-5 hover:border-solid opacity-80 hover:opacity-100 hover:cursor-pointer transition-all ease-in-out">
              <h1 className="font-para">{title || "Untitled work"}</h1>
              {date && <span className="opacity-60">{date}</span>}
              {description && <p className="font-mono">{description}</p>}
            </div>
          );

          return (
            <div key={activity.id || activity._id || `${title}-${index}`}>
              {link ? (
                <a href={link} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Featured;
