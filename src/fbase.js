import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiTYwsijkaDikVFgPsIIwg45jwKHSRsO8",
  authDomain: "univ-life.firebaseapp.com",
  projectId: "univ-life",
  storageBucket: "univ-life.appspot.com",
  messagingSenderId: "148521321012",
  appId: "1:148521321012:web:db52c5bb816dcb03e60061",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
