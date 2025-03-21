// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics, isSupported } from "firebase/analytics";
import { FIREBASE_CONFIG } from "@/config/firebase";

// Initialize Firebase
let firebaseApp: any;
// let analytics: any;

if (!getApps().length) {
  firebaseApp = initializeApp(FIREBASE_CONFIG);
  // Desactivando analytics temporalmente debido a problemas con API key
  /*
  // Only initialize analytics if it's supported (not in SSR)
  if (typeof window !== 'undefined') {
    isSupported().then((supported: boolean) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp);
      }
    });
  }
  */
} else {
  firebaseApp = getApps()[0];
}

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, firebaseApp };
