import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect, 
  getRedirectResult,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Capacitor } from "@capacitor/core";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDBoWw_8QOA_S_UfTRQQcNc-CGLBbctMAQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ignou-study-notes-by-nextsem.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ignou-study-notes-by-nextsem",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ignou-study-notes-by-nextsem.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "498697546118",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:498697546118:web:4630ab76b34fcc3d83a407",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-HT7CETXT6J",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
const db = getFirestore(app);

// In-app Google Authentication with seamless popup & redirect fallback
async function signInWithGoogle() {
  if (Capacitor.isNativePlatform()) {
    const { GoogleAuth } = await import("@codetrix-studio/capacitor-google-auth");
    
    GoogleAuth.initialize({
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
    
    const googleUser = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
    return signInWithCredential(auth, credential);
  } else {
    // Try signInWithPopup first (fast, avoids cross-origin storage partitioning issues on modern browsers)
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (popupErr: any) {
      // If popup was explicitly blocked by the browser, fallback to redirect
      if (popupErr?.code === "auth/popup-blocked" || popupErr?.code === "auth/cancelled-popup-request") {
        console.warn("Popup blocked by browser, falling back to signInWithRedirect");
        return await signInWithRedirect(auth, googleProvider);
      }
      throw popupErr;
    }
  }
}

export { 
  app, 
  auth, 
  googleProvider, 
  GoogleAuthProvider,
  db, 
  signInWithGoogle,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getRedirectResult
};
