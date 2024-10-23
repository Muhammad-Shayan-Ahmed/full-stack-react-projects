// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmDE9o1V2VLnfW1Szim7IHXMGl03StB8",
  authDomain: "clone-project-d0b95.firebaseapp.com",
  projectId: "clone-project-d0b95",
  storageBucket: "clone-project-d0b95.appspot.com",
  messagingSenderId: "429899575359",
  appId: "1:429899575359:web:bd05cf22172f19564fc88a",
  measurementId: "G-MF8EK2CC2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();