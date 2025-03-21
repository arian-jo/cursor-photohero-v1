// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD817zVFfmWMKvVIgQh2NO6c9HVHnuVuA",
  authDomain: "photohero-f55da.firebaseapp.com",
  projectId: "photohero-f55da",
  storageBucket: "photohero-f55da.firebasestorage.app",
  messagingSenderId: "61827278943",
  appId: "1:61827278943:web:2e7dccf37095e7ff1353ea",
  measurementId: "G-CHKPBN82XD"
};

// Initialize Firebase
let firebaseApp: any;
let analytics: any;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  // Only initialize analytics if it's supported (not in SSR)
  if (typeof window !== 'undefined') {
    isSupported().then((supported: boolean) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp);
      }
    });
  }
} else {
  firebaseApp = getApps()[0];
}

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, firebaseApp };
