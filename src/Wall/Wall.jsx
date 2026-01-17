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
  "Chuchudu"
];

const colours = [
  "#e63946", // Red
  "#f4a261", // Orange
  "#e9c46a", // Yellow
  "#2a9d8f", // Green/Teal
  "#457b9d", // Blue
  "#9b5de5", // Violet
  "#f72585", // Pink
  "#4cc9f0"  // Cyan
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
  "Kuttan"
];


// Notification sound URL (a pleasant notification chime)
const NOTIFICATION_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

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

  // Generate user name based on IP address
  useEffect(() => {
    const generateNameFromIP = async () => {
      // If already have a name in localStorage, don't regenerate
      if (localStorage.getItem("wallUserName")) {
        return;
      }

      try {
        // Fetch user's IP address
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ip = data.ip;

        // Create a simple hash from IP to get consistent indices
        let hash = 0;
        for (let i = 0; i < ip.length; i++) {
          hash = ((hash << 5) - hash) + ip.charCodeAt(i);
          hash = hash & hash; // Convert to 32bit integer
        }
        hash = Math.abs(hash);

        // Pick prefix, suffix, number (1-8), and color based on hash
        const prefixIndex = hash % namePrefix.length;
        const suffixIndex = Math.floor(hash / namePrefix.length) % nameSuffix.length;
        const userNumber = (hash % 8) + 1; // Number from 1 to 8
        const colorIndex = hash % colours.length;
        const generatedName = `${namePrefix[prefixIndex]} ${nameSuffix[suffixIndex]} ${userNumber}`;
        const generatedColor = colours[colorIndex];

        // Store in localStorage and state
        localStorage.setItem("wallUserName", generatedName);
        localStorage.setItem("wallUserColor", generatedColor);
        setUserName(generatedName);
        setUserColor(generatedColor);
      } catch (error) {
        // Fallback: generate random name if IP fetch fails
        const randomPrefix = namePrefix[Math.floor(Math.random() * namePrefix.length)];
        const randomSuffix = nameSuffix[Math.floor(Math.random() * nameSuffix.length)];
        const randomNumber = Math.floor(Math.random() * 8) + 1;
        const randomColorIndex = Math.floor(Math.random() * colours.length);
        const fallbackName = `${randomPrefix} ${randomSuffix} ${randomNumber}`;
        const fallbackColor = colours[randomColorIndex];
        localStorage.setItem("wallUserName", fallbackName);
        localStorage.setItem("wallUserColor", fallbackColor);
        setUserName(fallbackName);
        setUserColor(fallbackColor);
      }
    };

    generateNameFromIP();
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
    await addDoc(collection(db, "messages"), {
      name: userName || "Anonymous",
      color: userColor || "#ffffff",
      text,
      time: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className="w-full min-h-[102vh] bg-black px-4 py-10">
      <div className="max-w-[80vw] mx-auto">
        <h1 className="inline-block text-6xl sm:text-4xl font-des font-bold text-center mb-4 gap-3 tracking-[1ch]">
          {isMalayalam ? "മെസ്സേജ് മതിൽ" : "Vachakam Wall"}
          <span
            onClick={toggleMute}
            className="text-6xl cursor-pointer hover:opacity-70 transition-all"
            title={isMuted ? "Unmute notifications" : "Mute notifications"}
          >
            {isMuted ? "🔇" : "🔊"}
          </span>
        </h1>
        <span className="text-green-500 font-para text-3xl animate-pulse">
          🟢 {isMalayalam ? "തത്സമയം" : "live chat"}
        </span>

        <div
          ref={chatContainerRef}
          className="flex flex-col h-150 overflow-y-auto border-4 border-dashed border-[#aaa] rounded-xl p-4 my-6"
        >
          <span>Oldest message (17th January 2026)</span>
          {messages.length === 0 ? (
            <p className="text-center text-white/50 font-para">
              No posts here!
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className="flex flex-col mb-3 p-3 rounded-lg"
                style={{ backgroundColor: m.color ? `${m.color}30` : 'rgba(255,255,255,0.1)' }}
              >
                <span className="font-dev" style={{ color: m.color || '#aaa' }}>{m.name}:</span>{" "}
                <p className="font-para text-white">{m.text}</p>
              </div>
            ))
          )}
          <span>Latest message ({new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })})</span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-white/70 font-dev text-sm">
            {isMalayalam ? "നിങ്ങൾ:" : "Sending as:"} <span className="text-white font-bold">{userName || "Loading..."}</span>
          </span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isMalayalam ? "..." : "Say something..."}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
          />
          <button
            onClick={send}
            className="px-6 py-3 bg-white! text-black font-dev font-bold rounded-xl hover:text-white hover:bg-black! transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
