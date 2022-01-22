// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW7axZtdfHFqyxtGkowro9MI1Grr0tt8c",
  authDomain: "koffee-reactorzy.firebaseapp.com",
  projectId: "koffee-reactorzy",
  storageBucket: "koffee-reactorzy.appspot.com",
  messagingSenderId: "365696028932",
  appId: "1:365696028932:web:53226e8420517dbd964051",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
