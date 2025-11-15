import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP2RA6EdpBERlOxRpFx4nq89v7qzRq4b4",
  authDomain: "black-diary-dev.firebaseapp.com",
  projectId: "black-diary-dev",
  storageBucket: "black-diary-dev.firebasestorage.app",
  messagingSenderId: "97949184265",
  appId: "1:97949184265:web:7f9432215c06bec338a3d8",
  measurementId: "G-28MSRS3GFM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
