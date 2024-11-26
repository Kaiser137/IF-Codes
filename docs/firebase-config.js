// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjVW_bmQxyJsurOitrAmK-wSYSWPt85II",
  authDomain: "sys-20939957113271125474743128.firebaseapp.com",
  projectId: "sys-20939957113271125474743128",
  storageBucket: "sys-20939957113271125474743128.firebasestorage.app",
  messagingSenderId: "68023658177",
  appId: "1:68023658177:web:35147b3e0bcbac137ad640",
  measurementId: "G-5727LY2MZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
