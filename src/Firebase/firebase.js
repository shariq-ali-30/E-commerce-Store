import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHWOaypnXdd_G2C4Ow3Muncd_Hq7QsfcA",
  authDomain: "e-commerce-store-cc5e5.firebaseapp.com",
  projectId: "e-commerce-store-cc5e5",
  storageBucket: "e-commerce-store-cc5e5.firebasestorage.app",
  messagingSenderId: "898307866091",
  appId: "1:898307866091:web:445ad0a14a1a46f8282dae",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
