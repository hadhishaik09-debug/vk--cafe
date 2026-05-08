import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf_VZznkChhUAf84Lr2oA9tp_5e8yKBHE",
  authDomain: "vk-cafe.firebaseapp.com",
  projectId: "vk-cafe",
  storageBucket: "vk-cafe.firebasestorage.app",
  messagingSenderId: "627592638597",
  appId: "1:627592638597:web:433506eaad32694c5db9ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function setup() {
  try {
    try {
      await createUserWithEmailAndPassword(auth, "admin@vkcafe.com", "vkcafe-secure");
      console.log("Auth user created");
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        console.log("Auth user already exists, signing in...");
        await signInWithEmailAndPassword(auth, "admin@vkcafe.com", "vkcafe-secure");
      } else {
        throw e;
      }
    }
    
    await setDoc(doc(db, "adminSettings", "security"), {
      code1: "vk",
      code2: "cafe",
      adminEmail: "admin@vkcafe.com",
      adminPassword: "vkcafe-secure"
    });
    console.log("Admin security document set successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error setting up admin:", err);
    process.exit(1);
  }
}

setup();
