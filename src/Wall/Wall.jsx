import { useEffect, useState, useRef, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  limit,
  limitToLast,
  getDocs,
  endBefore,
} from "firebase/firestore";

import Notif from "../assets/audio/notif.ogg";

import { useLanguage } from "../context/LanguageContext";

const namePrefix = [
  "Sugunan",
  "Soman",
  "Sugumaran",
  "Vikraman",
  "Girija",
  "",
  "Kunjandi",
  "Matthayi",
  "Antappan",
  "Sreekutty",
  "Balan",
  "Rajan",
  "Pankajakshan",
  "Luttapi",
  "Dagini",
  "Surendran",
  "Hajiar",
  "Babu",
  "Manu",
  "Thoma",
  "Kochunni"
];

const colours = [
  "#e63946",
  "#f4a261",
  "#e9c46a",
  "#2a9d8f",
  "#457b9d",
  "#9b5de5",
  "#f72585",
  "#4cc9f0",
];

const nameSuffix = [
  "Theepori",
  "Idivett",
  "Thekkethil",
  "Ravipuram",
  "Thamarasheri",
  "Bhai",
  "Kochappi",
  "Mashi",
  "Adiyan",
  "Sir",
  "Machu",
  "Ikka",
  "Ikkaka",
  "Kuttan",
];

const rname = [
  "Kappad",
  "Thamarasheri",
  "Kothamangalam",
  "Thrippunithara",
  "Mannar",
  "Kayamkulam",
  "Kottayam", 
  "Kottarakkara",
  "Kuttanad",
  "Adoor",
  "Pathanamtitta",
  "Cherpulasherri",
  "Aranmula",
  "Aluva",
  "Perunthalmanna",
  "Irinjalikudda",
  "Varkala",
  "Pala",
  "Kakkanad"
];

const NOTIFICATION_SOUND_URL = Notif;
const MESSAGES_PER_PAGE = 10;
const WALL_USER_NAME_KEY = "wallUserNameV2";

const curseWords = [
  "fuck",
  "shit",
  "ass",
  "bitch",
  "bastard",
  "dick",
  "cock",
  "pussy",
  "asshole",
  "bullshit",
  "motherfucker",
  "fucker",
  "fucking",
  "nigger",
  "nigga",
  "cunt",
  "whore",
  "slut",
  "fag",
  "faggot",
  "rape",
  "raped",
  "reping",
  "myr",
  "myrr",
  "myrrr",
  "myre",
  "kundan",
  "pari",
  "kunna",
  "polaydi",
  "thendi",
  "poor",
  "poori",
  "poorimon",
  "avaratham",
  "avarathi",
  "koothachi",
  "umb",
  "uumb",
  "uuumb",
  "umbb",
  "thantha",
  "kunnna",
  "andi",
  "penis",
  "vagina",
  "thayoli",
  "poora",
  "kunne",
  "oombe",
  "my re",
  "myyr",
  "myr",
  "my rre",
  "myr", 
  "m y re",
  "m yre",
  "myr",
  "thayoli",
  "fu ck",
  "f uck",
  "fuc k",
  "f u c k",
  "parri"
];

const filterMessage = (message) => {
  let filtered = message;

  curseWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    filtered = filtered.replace(regex, "*".repeat(word.length));
  });

  const urlRegex =
    /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|org|net|io|co|me|info|biz|xyz|app|dev|ai)[^\s]*)/gi;
  filtered = filtered.replace(urlRegex, (match) => "*".repeat(match.length));

  return filtered;
};

export default function Wall() {
  const { isMalayalam } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem(WALL_USER_NAME_KEY) || "";
  });
  const [userColor, setUserColor] = useState(() => {
    return localStorage.getItem("wallUserColor") || "";
  });
  const [text, setText] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [oldestDoc, setOldestDoc] = useState(null);
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevMessageCount = useRef(0);

  useEffect(() => {
    if (localStorage.getItem(WALL_USER_NAME_KEY)) {
      return;
    }

    const randomRname = rname[Math.floor(Math.random() * rname.length)];
    const randomPrefix =
      namePrefix[Math.floor(Math.random() * namePrefix.length)];
    const randomSuffix =
      nameSuffix[Math.floor(Math.random() * nameSuffix.length)];
    const randomColorIndex = Math.floor(Math.random() * colours.length);
    const generatedName = `${randomRname} ${randomSuffix} ${randomPrefix}`;
    const generatedColor =
      localStorage.getItem("wallUserColor") || colours[randomColorIndex];

    localStorage.setItem(WALL_USER_NAME_KEY, generatedName);
    localStorage.setItem("wallUserColor", generatedColor);
    setUserName(generatedName);
    setUserColor(generatedColor);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
    audioRef.current.volume = 0.5;
    audioRef.current.preload = "auto";
    audioRef.current.load();
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("time"),
      limitToLast(MESSAGES_PER_PAGE),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        _doc: snapshot.docs[0],
      }));

      if (snapshot.docs.length > 0) {
        setOldestDoc(snapshot.docs[0]);
      }

      if (
        !isFirstLoad.current &&
        data.length > prevMessageCount.current &&
        !isMuted
      ) {
        playNotificationSound();
      }

      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);

      isFirstLoad.current = false;
      prevMessageCount.current = data.length;
      setMessages((prev) => {
        const existingIds = new Set(data.map((m) => m.id));
        const olderMessages = prev.filter((m) => !existingIds.has(m.id));
        return [...olderMessages, ...data];
      });
    });

    return () => unsub();
  }, [isMuted]);

  const loadMoreMessages = useCallback(async () => {
    if (isLoadingMore || !hasMoreMessages || !oldestDoc) return;

    setIsLoadingMore(true);
    try {
      const q = query(
        collection(db, "messages"),
        orderBy("time"),
        endBefore(oldestDoc),
        limitToLast(MESSAGES_PER_PAGE),
      );

      const snapshot = await getDocs(q);
      const olderData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (olderData.length === 0) {
        setHasMoreMessages(false);
      } else {
        setOldestDoc(snapshot.docs[0]);

        const container = chatContainerRef.current;
        const prevScrollHeight = container?.scrollHeight || 0;

        setMessages((prev) => [...olderData, ...prev]);

        setTimeout(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - prevScrollHeight;
          }
        }, 50);
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMoreMessages, oldestDoc]);

  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    if (container.scrollTop < 50 && hasMoreMessages && !isLoadingMore) {
      loadMoreMessages();
    }
  }, [loadMoreMessages, hasMoreMessages, isLoadingMore]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newValue = !prev;
      if (!newValue && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return newValue;
    });
  };

  const send = async () => {
    if (!text) return;
    const filteredText = filterMessage(text);
    await addDoc(collection(db, "messages"), {
      name: userName || "Anonymous",
      color: userColor || "#ffffff",
      text: filteredText,
      time: serverTimestamp(),
    });
    setText("");
  };

  return (
    <>
    <div className="relative px-5 sm:px-20 pt-5 pb-30 bg-black box-border overflow-hidden">
      <div className="mx-auto max-w-525 flex flex-col overflow-hidden">
        <h1 className="sm:mx-30 flex flex-col text-6xl sm:text-4xl items-center font-des font-bold mb-4">
          <div className="flex">
            <div
              className={`${isMalayalam ? "tracking-[0.2ch]" : "tracking-[0.5ch]"} sm:tracking-[1ch] md:tracking-[2ch] lg:tracking-[3ch] xl:tracking-[4ch]`}
            >
              {isMalayalam ? "അഭിപ്രായം പറയൂ" : "GUEST BOOK"}
            </div>
            <span className="font-dev">~~&gt;</span>
          </div>
        </h1>

        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex flex-col h-50 text-xs overflow-y-auto overflow-x-hidden border border-y-[#aaa] px-5 md:px-10 py-5 my-6"
        >
          {isLoadingMore && (
            <div className="text-center text-white/50 font-para py-4">
              {isMalayalam ? "ഒരു നിമിഷം ക്ഷമിക്കു..." : "Loading more..."}
            </div>
          )}
          {!hasMoreMessages && messages.length > 0 && (
            <div className="text-center text-white/30 font-para py-4 text-sm">
              {isMalayalam ? "തുടക്കo" : "~ This is where it all started ~"}
            </div>
          )}
          {messages.length === 0 ? (
            <p className="text-center text-white/50 font-para">
              {isMalayalam
                ? "ഒരു നിമിഷം ക്ഷമിക്കു..."
                : "Looking 4 messages..."}
            </p>
          ) : (
            messages.map((m, index) => {
              const messageDate = m.time?.toDate ? m.time.toDate() : new Date();
              const messageDateStr = messageDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              const prevMessage = index > 0 ? messages[index - 1] : null;
              const prevDate = prevMessage?.time?.toDate
                ? prevMessage.time.toDate()
                : null;
              const prevDateStr = prevDate
                ? prevDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : null;

              const showDateSeparator =
                index === 0 || messageDateStr !== prevDateStr;

              const timeStr = messageDate.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div key={m.id} className="sbar-hide">
                  {showDateSeparator && (
                    <div className="text-center text-white/50 font-para my-4">
                      = {messageDateStr} =
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2 py-1 w-full min-w-0">
                    <span
                      className="font-para flex-1 min-w-0 border-r-2 border-[#333f]"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}
                    >
                      <span
                        className="font-bold font-dev "
                        style={{ color: m.color || "#aaa" }}
                      >
                        {m.name}:
                      </span>{" "}
                      <span className="text-white">{m.text}</span>
                    </span>
                    <span className="text-white/50 text-xs font-dev shrink-0">
                      {timeStr}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-3 mx-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isMalayalam ? "എന്തെലും പറയൂ..." : "Say something..."}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
          />
          <div className="flex items-center flex-row-reverse justify-between">
            <div>
              {/* <span className="text-white/70 font-dev text-md">
            {isMalayalam ? "നിങ്ങളുടെ പേര്:" : "Sending as:"}{" "}
            <span className="text-white font-bold">
              {userName || "getting name pls wait..."}{" *"}
            </span>
            <br />
          </span> */}
              <span
                onClick={send}
                className="px-6 py-3 w-max cursor-pointer bg-white! text-black font-para font-bold hover:text-white hover:bg-black! text-center border border-white border-dashed transition-all"
              >
                {isMalayalam ? <>അയയ്ക്കു</> : <>SEND</>}
              </span>
              <br />
            </div>
            <div className="flex flex-col ">
              <span className="text-sm mt-5">
                {isMalayalam
                  ? "ഐ.പി. വിവരങ്ങൾ ഈ വെബ്‌സൈറ്റ് ശേഖരിക്കുന്നതല്ല... മാന്യമായി പെരുമാറണം..."
                  : "IP not collected. Be respectfull..."}
              </span>
              <span className="text-sm opacity-50">
                {isMalayalam
                  ? "*ദുരുപയോഗം തടയാൻ വേണ്ടി നൽകിയ ഒരു പേര്"
                  : "*random name to prevent missuse"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
          <div className="w-screen bg-white overflow-hidden">
        <span
          className="inline-block font-extrabold text-black px-1 py-3 text-6xl sm:text-8xl leading-normal whitespace-nowrap animate-marquee font-des"
          style={{
            animation: "marquee 16s ease-in-out infinite alternate",
          }}
        >
          {isMalayalam ? (
            <>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി ~ </span>
              <span>നന്ദി</span>
            </>
          ) : (
            <>
              <span>Thank ~ </span>
              <span>YOU ~ </span>
              <span>Thank ~ </span>
              <span>YOU ~ </span>
              <span>Thank ~ </span>
              <span>YOU ~ </span>
              <span>Thank ~ </span>
              <span>YOU ~ </span>
              <span>Thank ~ </span>
              <span>YOU ~ </span>
              <span>Thank ~ </span>
              <span>YOU </span>
            </>
          )}
        </span>
      </div>
    </>
  );
}
