import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKw1Q5oLF75M8Ijt9wmt9AisJMkiQC7Z8",
  authDomain: "arjc-chat.firebaseapp.com",
  projectId: "arjc-chat",
  storageBucket: "arjc-chat.appspot.com",
  messagingSenderId: "71390119574",
  appId: "1:71390119574:web:6837b02e4995f3550624b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
