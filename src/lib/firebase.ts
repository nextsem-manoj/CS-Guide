import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Capacitor } from "@capacitor/core";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDMxmzTZeGcGZBeRkStUdShlddBdJHTtLo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "bca-nextsem.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bca-nextsem",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "bca-nextsem.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "983453487133",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:983453487133:web:34d80214bd9d961e01b6f4",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-1PVR08D9YQ",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

async function signInWithGoogle() {
  if (Capacitor.isNativePlatform()) {
    const { GoogleAuth } = await import("@codetrix-studio/capacitor-google-auth");
    
    // Initialize the plugin with options
    GoogleAuth.initialize({
      clientId: '983453487133-2ffe4796abuhkbidvtc7mo8n8kvo82ir.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
    
    const googleUser = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
    return signInWithCredential(auth, credential);
  } else {
    return signInWithPopup(auth, googleProvider);
  }
}

export { app, auth, googleProvider, db, signInWithGoogle };
