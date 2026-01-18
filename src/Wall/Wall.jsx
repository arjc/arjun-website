import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
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
  "#e63946", // Red
  "#f4a261", // Orange
  "#e9c46a", // Yellow
  "#2a9d8f", // Green/Teal
  "#457b9d", // Blue
  "#9b5de5", // Violet
  "#f72585", // Pink
  "#4cc9f0", // Cyan
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
    const q = query(collection(db, "messages"), orderBy("time"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Play sound only for new messages (not on initial load, and only if unmuted)
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
      setMessages(data);
    });

    return () => unsub();
  }, [isMuted]);

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
    <div className="w-full bg-black px-4 py-50">
      <div className="max-w-[80vw] mx-auto">
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
          className="flex flex-col h-120 overflow-y-auto border-4 border-dashed border-[#aaa] rounded-xl p-4 my-6"
        >
          {messages.length === 0 ? (
            <p className="text-center text-white/50 font-para">
              No posts here!
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
                <div key={m.id}>
                  {showDateSeparator && (
                    <div className="text-center text-white/50 font-para my-4">
                      = {messageDateStr} =
                    </div>
                  )}
                  <div
                    className="flex flex-col mb-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: m.color
                        ? `${m.color}30`
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className="font-dev"
                        style={{ color: m.color || "#aaa" }}
                      >
                        {m.name}:
                      </span>
                      <span className="text-white/50 text-xs font-dev">
                        {timeStr}
                      </span>
                    </div>
                    <p className="font-para text-white">{m.text}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-white/70 font-dev text-sm">
            {isMalayalam ? "നിങ്ങൾ:" : "Sending as:"}{" "}
            <span className="text-white font-bold">
              {userName || "Loading..."}
            </span>
          </span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isMalayalam ? "..." : "Say something..."}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
          />
          <div className="flex items-center justify-between">
            <span
              onClick={toggleMute}
              className="text-xl sm:text-2xl cursor-pointer hover:opacity-70 transition-all border-3 border-dashed rounded-full py-2 px-5 my-2 tracking-normal font-dev"
              title={isMuted ? "Unmute notifications" : "Mute notifications"}
            >
              {isMuted ? "🔇 Notifs" : "🔊 Notifs"}
            </span>
            <span
              onClick={send}
              className="px-6 py-3 w-max bg-white! text-black font-para font-bold rounded-xl hover:text-white hover:bg-black! text-center border-2 border-white border-dashed transition-all"
            >
              Send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
