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
  "Raman",
  "Soman",
  "Sasi",
  "Vikraman",
  "Muttappan",
  "Kannan",
  "Appu",
  "Koch",
  "Pappan",
  "Kunju",
  "Balan",
  "Rajan",
  "Achu",
  "Lalan",
  "Maniyan",
  "Gopan",
  "Sreekuttan",
  "Ambady",
  "Chuchudu",
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
  "Master",
  "Kuttan",
  "Annan",
  "Chettan",
  "Mass",
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

const NOTIFICATION_SOUND_URL = Notif;
const MESSAGES_PER_PAGE = 10;

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
  "oombe"

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
    return localStorage.getItem("wallUserName") || "";
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
    if (
      localStorage.getItem("wallUserName") &&
      localStorage.getItem("wallUserColor")
    ) {
      return;
    }

    const randomPrefix =
      namePrefix[Math.floor(Math.random() * namePrefix.length)];
    const randomSuffix =
      nameSuffix[Math.floor(Math.random() * nameSuffix.length)];
    const randomNumber = Math.floor(Math.random() * 8) + 1;
    const randomColorIndex = Math.floor(Math.random() * colours.length);
    const generatedName = `${randomPrefix} ${randomSuffix} ${randomNumber}`;
    const generatedColor = colours[randomColorIndex];

    localStorage.setItem("wallUserName", generatedName);
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
      audioRef.current.play().catch(() => {
      });
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("time"),
      limitToLast(MESSAGES_PER_PAGE)
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
        limitToLast(MESSAGES_PER_PAGE)
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
        audioRef.current.play().catch(() => {
        });
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
    <div className="bg-black px-6 sm:px-10 lg:px-16 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-4 mb-12">
          <h1 className="font-des text-sm sm:text-base tracking-[0.2em] text-[#666] uppercase shrink-0">
            {isMalayalam ? "അഭിപ്രായം പറയൂ" : "guestbook"}
          </h1>
          <hr className="dash-sep flex-1" />
        </div>

        {/* message area */}
        <div className="border border-dashed border-[#222] p-4 sm:p-6 mb-8">
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex flex-col h-72 sm:h-80 lg:h-96 overflow-y-auto overflow-x-hidden sbar-hide"
          >
            {isLoadingMore && (
              <div className="text-center text-[#555] font-dev py-4 text-xs">
                {isMalayalam ? "ഒരു നിമിഷം..." : "loading..."}
              </div>
            )}
            {!hasMoreMessages && messages.length > 0 && (
              <div className="text-center text-[#333] font-dev py-4 text-xs tracking-widest">
                {isMalayalam ? "- - - തുടക്കo - - -" : "- - - the beginning - - -"}
              </div>
            )}
            {messages.length === 0 ? (
              <p className="text-center text-[#555] font-dev text-xs py-8 tracking-widest">
                {isMalayalam ? "· · ·" : "· · ·"}
              </p>
            ) : (
              messages.map((m, index) => {
                const messageDate = m.time?.toDate ? m.time.toDate() : new Date();
                const messageDateStr = messageDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                });

                const prevMessage = index > 0 ? messages[index - 1] : null;
                const prevDate = prevMessage?.time?.toDate
                  ? prevMessage.time.toDate()
                  : null;
                const prevDateStr = prevDate
                  ? prevDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })
                  : null;

                const showDateSeparator =
                  index === 0 || messageDateStr !== prevDateStr;

                const timeStr = messageDate.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={m.id}>
                    {showDateSeparator && (
                      <div className="flex items-center gap-3 my-5">
                        <hr className="dash-sep flex-1" />
                        <span className="font-dev text-[10px] text-[#555] tracking-wider shrink-0">{messageDateStr}</span>
                        <hr className="dash-sep flex-1" />
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-3 py-1">
                      <span className="font-dev text-xs text-[#444] shrink-0 mt-0.5 w-10 text-right">{timeStr}</span>
                      <span className="w-px h-4 bg-[#222] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                        <span className="font-dev text-xs" style={{ color: m.color || "#888" }}>
                          {m.name}
                        </span>
                        <span className="font-para text-sm text-[#ccc] ml-2">{m.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* input area */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-dev text-xs text-[#555]">
              {isMalayalam ? "അയയ്ക്കുന്നത്:" : "as:"}
            </span>
            <span className="font-dev text-xs text-[#888]">
              {userName || "..."}
            </span>
          </div>
          <div className="flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={isMalayalam ? "എന്തെലും പറയൂ..." : "say something..."}
              className="flex-1 px-4 py-3 bg-transparent border border-dashed border-[#333] text-[#ccc] placeholder-[#444] font-dev text-sm focus:outline-none focus:border-[#666] transition-all duration-300"
            />
            <button
              onClick={send}
              className="px-5 py-3 font-dev text-xs tracking-widest border border-dashed border-[#444] text-[#888] hover:text-white hover:border-white transition-all duration-300"
            >
              {isMalayalam ? "→" : "→"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span
              onClick={toggleMute}
              className="font-dev text-xs text-[#444] cursor-pointer hover:text-[#888] transition-colors duration-300 border-b border-dashed border-transparent hover:border-[#444] pb-0.5"
            >
              {isMuted ? "🔇" : "🔊"} {isMalayalam ? "നോട്ടിഫിക്ഷൻ" : "notifications"}
            </span>
            <span className="font-dev text-[10px] text-[#333]">
              *{isMalayalam ? "ക്രമരഹിത പേര്" : "random name for privacy"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
