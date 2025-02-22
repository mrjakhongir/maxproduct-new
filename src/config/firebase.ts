import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "furniture-calculator-7e3a1.firebaseapp.com",
  projectId: "furniture-calculator-7e3a1",
  storageBucket: "furniture-calculator-7e3a1.firebasestorage.app",
  messagingSenderId: "654882282810",
  appId: "1:654882282810:web:ba3ee7fc9dd191a1bec403",
  measurementId: "G-KTZ9YWPXB5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
