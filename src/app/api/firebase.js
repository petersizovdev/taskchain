import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIs_Ivlxlzkm0FUSZanMPyvBQd1Dcqf8A",
  authDomain: "taskchainn.firebaseapp.com",
  projectId: "taskchainn",
  storageBucket: "taskchainn.appspot.com",
  messagingSenderId: "772561847544",
  appId: "1:772561847544:web:ad1643141328180c2a670d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()