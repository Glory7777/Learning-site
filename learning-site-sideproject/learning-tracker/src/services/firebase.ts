import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDS56MT5kPTyS-_bQ_mpi6Y129X9uJpCyk",
  authDomain: "learning-tracker-5c2a7.firebaseapp.com",
  projectId: "learning-tracker-5c2a7",
  storageBucket: "learning-tracker-5c2a7.appspot.com",
  messagingSenderId: "986757744659",
  appId: "1:986757744659:web:eb1ad35ba5cb815bcb57e6",
  //   measurementId: "G-JH1YL4RSSE"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore와 Auth 서비스 내보내기
export const db = getFirestore(app);
export const auth = getAuth(app);
