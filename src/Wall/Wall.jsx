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

// Notification sound URL (a pleasant notification chime)
const NOTIFICATION_SOUND_URL =
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

export default function Wall() {
  const { isMalayalam } = useLanguage();

  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isMuted, setIsMuted] = useState(true); // Always start muted
  const audioRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isFirstLoad = useRef(true);
  const prevMessageCount = useRef(0);

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
      name: name || "Anonymous",
      text,
      time: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className="w-full min-h-screen bg-black px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-6xl sm:text-4xl font-head font-bold text-center mb-8 flex items-center justify-center gap-3">
          {isMalayalam ? "മെസ്സേജ് മതിൽ" : "Vachakam Wall"}
          <span
            onClick={toggleMute}
            className="text-6xl cursor-pointer hover:opacity-70 transition-all"
            title={isMuted ? "Unmute notifications" : "Mute notifications"}
          >
            {isMuted ? "🔇" : "🔊"}
          </span>
        </h1>
        <span className="text-green-500 font-para animate-pulse">
          🟢 {isMalayalam ? "ലൈവ് ചാറ്റ്" : "live chat"}
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
                className="flex flex-col mb-3 p-3 bg-white/10 rounded-lg"
              >
                <span className="font-dev text-white/70">{m.name}:</span>{" "}
                <p className="font-para text-white">{m.text}</p>
              </div>
            ))
          )}
          <span>Latest message ({new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })})</span>
        </div>

        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isMalayalam ? "പേര്" : "Name"}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isMalayalam ? "..." : "Say something..."}
            className="flex-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
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
