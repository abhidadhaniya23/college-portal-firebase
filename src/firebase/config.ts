import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEsdzt-_hkshHWfde1R8x70wXQa9JLsmA",
  authDomain: "college-portal-f94e9.firebaseapp.com",
  projectId: "college-portal-f94e9",
  storageBucket: "college-portal-f94e9.appspot.com",
  messagingSenderId: "138767168486",
  appId: "1:138767168486:web:26c7c8f1a78a7f1dee1c27",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
