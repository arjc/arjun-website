import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function Wall() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("time"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    });

    return () => unsub(); // cleanup listener
  }, []);

  const send = async () => {
    if (!text) return;
    await addDoc(collection(db, "messages"), {
      name: name || "Anonymous",
      text,
      time: serverTimestamp()
    });
    setText("");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-head font-bold text-center mb-8">
        Public Wall 💬
      </h2>

      <div className="h-80 overflow-y-auto border border-white/20 rounded-xl p-4 mb-6 bg-white/5 backdrop-blur-sm">
        {messages.length === 0 ? (
          <p className="text-center text-white/50 font-para">No messages yet. Be the first!</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="mb-3 p-3 bg-white/10 rounded-lg">
              <span className="font-dev text-sm text-white/70">{m.name}</span>
              <p className="font-para text-white mt-1">{m.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
        />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a message..."
          className="flex-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 font-para focus:outline-none focus:border-white/50 transition-all"
        />
        <button 
          onClick={send}
          className="px-6 py-3 bg-white text-black font-dev font-bold rounded-xl hover:bg-white/90 active:scale-95 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
