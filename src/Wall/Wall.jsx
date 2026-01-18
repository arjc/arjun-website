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

// Filter function to censor curse words and links
const filterMessage = (message) => {
  let filtered = message;

  // Replace curse words with asterisks (case-insensitive)
  curseWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    filtered = filtered.replace(regex, "*".repeat(word.length));
  });

  // Replace URLs/links with asterisks
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
  const [isMuted, setIsMuted] = useState(true); // Always start muted
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [oldestDoc, setOldestDoc] = useState(null);
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevMessageCount = useRef(0);

  // Generate user name on first visit (stored in localStorage forever)
  useEffect(() => {
    // If already have a name in localStorage, don't regenerate
    if (
      localStorage.getItem("wallUserName") &&
      localStorage.getItem("wallUserColor")
    ) {
      return;
    }

    // Generate random name and color for first-time users
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

  // Initialize audio - preload for mobile compatibility
  useEffect(() => {
    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
    audioRef.current.volume = 0.5;
    audioRef.current.preload = "auto";
    // Load the audio to prepare it for playback
    audioRef.current.load();
  }, []);

  // Play notification sound (works on all devices after user interaction)
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  useEffect(() => {
    // Listen only to the last 20 messages for real-time updates
    const q = query(
      collection(db, "messages"),
      orderBy("time"),
      limitToLast(MESSAGES_PER_PAGE)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        _doc: snapshot.docs[0], // Store the first doc for pagination
      }));

      // Set the oldest document for loading more
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

      // Auto scroll to bottom when new message appears or on initial load
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);

      isFirstLoad.current = false;
      prevMessageCount.current = data.length;
      setMessages((prev) => {
        // Merge with existing older messages
        const existingIds = new Set(data.map((m) => m.id));
        const olderMessages = prev.filter((m) => !existingIds.has(m.id));
        return [...olderMessages, ...data];
      });
    });

    return () => unsub();
  }, [isMuted]);

  // Load more messages when scrolling to top
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
        // Update oldest doc for next pagination
        setOldestDoc(snapshot.docs[0]);
        
        // Preserve scroll position
        const container = chatContainerRef.current;
        const prevScrollHeight = container?.scrollHeight || 0;

        setMessages((prev) => [...olderData, ...prev]);

        // Restore scroll position after adding older messages
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

  // Handle scroll to detect when user reaches top
  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // If scrolled to top (with a small threshold), load more
    if (container.scrollTop < 50 && hasMoreMessages && !isLoadingMore) {
      loadMoreMessages();
    }
  }, [loadMoreMessages, hasMoreMessages, isLoadingMore]);

  // Toggle mute - play sound when unmuting to confirm it works
  const toggleMute = () => {
    setIsMuted((prev) => {
      const newValue = !prev;
      // Play a notification sound when unmuting to confirm audio is working
      if (!newValue && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Ignore errors
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
    <div className="relative w-full bg-black px-4 py-20 box-border overflow-hidden">
      <div className="max-w-[80vw] mx-auto h-full flex flex-col overflow-hidden">
        <h1 className="flex flex-col text-6xl sm:text-4xl items-center font-des font-bold mb-4 gap-3 sm:tracking-[1ch]">
          <div>
            {isMalayalam ? "മെസ്സേജ് മതിൽ" : "VACHAKAM WALL"} ~{" "}
            <span className="opacity-60 text-2xl tracking-normal py-2">
              (beta)
            </span>
          </div>
        </h1>

        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex flex-col h-120 overflow-y-auto overflow-x-hidden border-4 border-dashed border-[#aaa] rounded-xl p-4 my-6"
        >
          {/* Loading indicator at top */}
          {isLoadingMore && (
            <div className="text-center text-white/50 font-para py-4">
              {isMalayalam ? "കൂടുതൽ ലോഡ് ചെയ്യുന്നു..." : "Loading more..."}
            </div>
          )}
          {/* No more messages indicator */}
          {!hasMoreMessages && messages.length > 0 && (
            <div className="text-center text-white/30 font-para py-4 text-sm">
              {isMalayalam ? "ഇത് തുടക്കമാണ്" : "~ Beginning of messages ~"}
            </div>
          )}
          {messages.length === 0 ? (
            <p className="text-center text-white/50 font-para">
              {isMalayalam ? "ഒരു നിമിഷം ക്ഷമിക്കു..." : "Looking 4 messages..."}
            </p>
          ) : (
            messages.map((m, index) => {
              // Get the date of this message
              const messageDate = m.time?.toDate ? m.time.toDate() : new Date();
              const messageDateStr = messageDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              // Get the date of the previous message (if exists)
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

              // Show date separator if this is the first message or if the date changed
              const showDateSeparator =
                index === 0 || messageDateStr !== prevDateStr;

              // Format time as HH:MM
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
                    <span className="font-para flex-1 min-w-0 border-r-2 border-[#333f]" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                      <span className="font-bold font-dev " style={{ color: m.color || "#aaa" }}>
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

        <div className="flex flex-col gap-3">
          <span className="text-white/70 font-dev text-md">
            {isMalayalam ? "നിങ്ങളുടെ പേര്:" : "Sending as:"}{" "}
            <span className="text-white font-bold">
              {userName || "getting name pls wait..."}
            </span>
          </span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isMalayalam ? "എന്തെലും പറയൂ..." : "Say something..."}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
          />
          <div className="flex items-center justify-between">
            <span
              onClick={toggleMute}
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-70 transition-all border-3 border-dashed rounded-full py-2 px-5 my-2 tracking-normal font-dev"
              title={isMuted ? "Unmute notifications" : "Mute notifications"}
            >
              {isMuted ? (isMalayalam ? "🔇 നോട്ടിഫിക്ഷൻ" : "🔇 Notification") : (isMalayalam ? "🔊 നോട്ടിഫിക്ഷൻ" : "🔊 Notification")}
            </span>
            <span
              onClick={send}
              className="px-6 py-3 w-max bg-white! text-black font-para font-bold rounded-xl hover:text-white hover:bg-black! text-center border-2 border-white border-dashed transition-all"
            >
              {isMalayalam ? "അയയ്ക്കു" : "SEND"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
