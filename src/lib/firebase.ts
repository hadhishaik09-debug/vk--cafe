import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf_VZznkChhUAf84Lr2oA9tp_5e8yKBHE",
  authDomain: "vk-cafe.firebaseapp.com",
  projectId: "vk-cafe",
  storageBucket: "vk-cafe.firebasestorage.app",
  messagingSenderId: "627592638597",
  appId: "1:627592638597:web:433506eaad32694c5db9ec"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);