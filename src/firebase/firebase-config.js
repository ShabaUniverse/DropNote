import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "dropnote-79462.firebaseapp.com",
  projectId: "dropnote-79462",
  storageBucket: "dropnote-79462.appspot.com",
  messagingSenderId: "611990202528",
  appId: "1:611990202528:web:487ead8c8745f3d4c5c1c5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
