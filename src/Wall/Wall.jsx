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

// Notification sound URL (a pleasant notification chime)
const NOTIFICATION_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";

export default function Wall() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isMuted, setIsMuted] = useState(true); // Always start muted
  const audioRef = useRef(null);
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
      if (!isFirstLoad.current && data.length > prevMessageCount.current && !isMuted) {
        playNotificationSound();
      }
      
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
    <div className="w-full max-w-xl mx-auto px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-head font-bold text-center mb-8 flex items-center justify-center gap-3">
        വാചകം 
        <button 
          onClick={toggleMute}
          className="text-2xl hover:scale-110 transition-transform"
          title={isMuted ? "Unmute notifications" : "Mute notifications"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </h2>
      <div className="flex flex-col gap-3 py-10">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Give your feedback..."
          className="flex-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
        />
        <button
          onClick={send}
          className="px-6 py-3 bg-white text-black font-dev font-bold rounded-xl hover:text-white hover:bg-black transition-all"
        >
          Send
        </button>
      </div>

      <div className="flex flex-col-reverse h-80 overflow-y-auto border border-white/20 rounded-xl p-4 mb-6 bg-white/5 backdrop-blur-sm">
        {messages.length === 0 ? (
          <p className="text-center text-white/50 font-para">No posts here!</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="flex flex-col mb-3 p-3 bg-white/10 rounded-lg">
              <span className="font-dev text-white/70">{m.name}:</span>
              {' '}
              <p className="font-para text-white">{m.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
