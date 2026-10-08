"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db, signInWithGoogle } from "@/lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { triggerCelebration } from "@/lib/celebration";

export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  photo: string | null;
}

export interface PracticalProgressData {
  completedDays: number[];
  githubRepoUrls: Record<string, string>; // day -> github URL
  githubUsername: string;
  selectedTrack: string;
  lastUpdated: string;
}

interface StudentProgressContextType {
  user: StudentProfile | null;
  loading: boolean;
  completedDays: number[];
  githubRepoUrls: Record<string, string>;
  githubUsername: string;
  selectedTrack: string;
  isCloudSynced: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isDayCompleted: (day: number) => boolean;
  isDayUnlocked: (day: number) => boolean;
  completeDayWithGitHub: (day: number, githubUrl: string) => Promise<{ success: boolean; message: string }>;
  setSelectedTrack: (track: string) => Promise<void>;
  setGithubUsername: (username: string) => Promise<void>;
}

const StudentProgressContext = createContext<StudentProgressContextType | undefined>(undefined);

export function StudentProgressProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [githubRepoUrls, setGithubRepoUrls] = useState<Record<string, string>>({});
  const [githubUsername, setGithubUsernameState] = useState<string>("");
  const [selectedTrack, setSelectedTrackState] = useState<string>("web-dev");
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  // Load local state first
  const loadLocalProgress = (email: string) => {
    try {
      const savedCompleted = localStorage.getItem(`nextsem_practical_completed_${email}`);
      const savedUrls = localStorage.getItem(`nextsem_practical_github_urls_${email}`);
      const savedGhUser = localStorage.getItem(`nextsem_practical_gh_username_${email}`);
      const savedTrack = localStorage.getItem(`nextsem_practical_track_${email}`);

      if (savedCompleted) {
        setCompletedDays(JSON.parse(savedCompleted));
      } else {
        // Fallback to legacy keys
        const legacy: number[] = [];
        for (let d = 1; d <= 90; d++) {
          if (localStorage.getItem(`nextsem_practical_day_${d}_done_${email}`) === "true") {
            legacy.push(d);
          }
        }
        setCompletedDays(legacy);
      }

      if (savedUrls) setGithubRepoUrls(JSON.parse(savedUrls));
      if (savedGhUser) setGithubUsernameState(savedGhUser);
      if (savedTrack) setSelectedTrackState(savedTrack);
    } catch (e) {
      console.error("Failed to load local progress:", e);
    }
  };

  // Sync with Firestore when logged in
  const syncWithFirestore = async (firebaseUser: User) => {
    try {
      const email = firebaseUser.email || "student";
      const userDocRef = doc(db, "users_progress", firebaseUser.uid);
      const docSnap = await getDoc(userDocRef);

      let remoteDays: number[] = [];
      let remoteUrls: Record<string, string> = {};
      let remoteGhUser = "";
      let remoteTrack = "web-dev";

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.bca_practical) {
          remoteDays = data.bca_practical.completedDays || [];
          remoteUrls = data.bca_practical.githubRepoUrls || {};
          remoteGhUser = data.bca_practical.githubUsername || "";
          remoteTrack = data.bca_practical.selectedTrack || "web-dev";
        }
      }

      // Merge local and remote completed days (union)
      const localCompletedRaw = localStorage.getItem(`nextsem_practical_completed_${email}`);
      const localDays: number[] = localCompletedRaw ? JSON.parse(localCompletedRaw) : [];
      const mergedDays = Array.from(new Set([...remoteDays, ...localDays])).sort((a, b) => a - b);

      const localUrlsRaw = localStorage.getItem(`nextsem_practical_github_urls_${email}`);
      const localUrls: Record<string, string> = localUrlsRaw ? JSON.parse(localUrlsRaw) : {};
      const mergedUrls = { ...remoteUrls, ...localUrls };

      const activeGhUser = remoteGhUser || localStorage.getItem(`nextsem_practical_gh_username_${email}`) || "";
      const activeTrack = remoteTrack || localStorage.getItem(`nextsem_practical_track_${email}`) || "web-dev";

      // Update in-memory state
      setCompletedDays(mergedDays);
      setGithubRepoUrls(mergedUrls);
      setGithubUsernameState(activeGhUser);
      setSelectedTrackState(activeTrack);
      setIsCloudSynced(true);

      // Save merged locally
      localStorage.setItem(`nextsem_practical_completed_${email}`, JSON.stringify(mergedDays));
      localStorage.setItem(`nextsem_practical_github_urls_${email}`, JSON.stringify(mergedUrls));
      localStorage.setItem(`nextsem_practical_gh_username_${email}`, activeGhUser);
      localStorage.setItem(`nextsem_practical_track_${email}`, activeTrack);

      // Push merged back to Firestore
      await setDoc(userDocRef, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        bca_practical: {
          completedDays: mergedDays,
          githubRepoUrls: mergedUrls,
          githubUsername: activeGhUser,
          selectedTrack: activeTrack,
          lastUpdated: new Date().toISOString()
        }
      }, { merge: true });

    } catch (err) {
      console.error("Firestore sync error:", err);
      setIsCloudSynced(false);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const profile: StudentProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "NextSem Student",
          email: firebaseUser.email || "student@nextsem.local",
          photo: firebaseUser.photoURL
        };
        setUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        loadLocalProgress(profile.email);
        await syncWithFirestore(firebaseUser);
      } else {
        setUser(null);
        setIsCloudSynced(false);
        loadLocalProgress("guest");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error("Google Sign-In failed:", e);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem("nextsem_user");
      setUser(null);
      setIsCloudSynced(false);
      loadLocalProgress("guest");
    } catch (e) {
      console.error("Sign Out failed:", e);
    }
  };

  // Day 1 is always unlocked. Day N requires Day N-1 to be completed.
  const isDayUnlocked = (day: number): boolean => {
    if (day <= 1) return true;
    return completedDays.includes(day - 1);
  };

  const isDayCompleted = (day: number): boolean => {
    return completedDays.includes(day);
  };

  // Complete day with mandatory GitHub link
  const completeDayWithGitHub = async (day: number, githubUrl: string): Promise<{ success: boolean; message: string }> => {
    const cleanUrl = githubUrl.trim();
    if (!cleanUrl) {
      return { success: false, message: "Please provide your GitHub repository or commit URL." };
    }

    // Validate that it looks like a real GitHub URL
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/i;
    if (!githubRegex.test(cleanUrl)) {
      return { 
        success: false, 
        message: "Invalid GitHub URL format. Please provide a valid URL like: https://github.com/your-username/html-css-projects" 
      };
    }

    // Extract github username if possible
    const match = cleanUrl.match(/github\.com\/([a-zA-Z0-9_.-]+)/i);
    const extractedUser = match ? match[1] : githubUsername;

    const newCompletedDays = Array.from(new Set([...completedDays, day])).sort((a, b) => a - b);
    const newUrls = { ...githubRepoUrls, [day.toString()]: cleanUrl };

    setCompletedDays(newCompletedDays);
    setGithubRepoUrls(newUrls);
    if (extractedUser && !githubUsername) {
      setGithubUsernameState(extractedUser);
    }

    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_completed_${email}`, JSON.stringify(newCompletedDays));
    localStorage.setItem(`nextsem_practical_github_urls_${email}`, JSON.stringify(newUrls));
    localStorage.setItem(`nextsem_practical_day_${day}_done_${email}`, "true");
    if (extractedUser) {
      localStorage.setItem(`nextsem_practical_gh_username_${email}`, extractedUser);
    }

    // Save to Firestore if user is authenticated
    if (user) {
      try {
        const userDocRef = doc(db, "users_progress", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.name,
          photoURL: user.photo,
          bca_practical: {
            completedDays: newCompletedDays,
            githubRepoUrls: newUrls,
            githubUsername: extractedUser || githubUsername,
            selectedTrack,
            lastUpdated: new Date().toISOString()
          }
        }, { merge: true });
        setIsCloudSynced(true);
      } catch (err) {
        console.error("Failed to sync day to Firestore:", err);
      }
    }

    triggerCelebration();
    return { success: true, message: `Day ${day} successfully submitted and synced! Next lesson is now unlocked.` };
  };

  const setSelectedTrack = async (track: string) => {
    setSelectedTrackState(track);
    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_track_${email}`, track);

    if (user) {
      try {
        const userDocRef = doc(db, "users_progress", user.uid);
        await setDoc(userDocRef, {
          bca_practical: { selectedTrack: track, lastUpdated: new Date().toISOString() }
        }, { merge: true });
      } catch (e) {}
    }
  };

  const setGithubUsername = async (username: string) => {
    setGithubUsernameState(username);
    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_gh_username_${email}`, username);

    if (user) {
      try {
        const userDocRef = doc(db, "users_progress", user.uid);
        await setDoc(userDocRef, {
          bca_practical: { githubUsername: username, lastUpdated: new Date().toISOString() }
        }, { merge: true });
      } catch (e) {}
    }
  };

  return (
    <StudentProgressContext.Provider
      value={{
        user,
        loading,
        completedDays,
        githubRepoUrls,
        githubUsername,
        selectedTrack,
        isCloudSynced,
        signIn,
        signOut,
        isDayCompleted,
        isDayUnlocked,
        completeDayWithGitHub,
        setSelectedTrack,
        setGithubUsername
      }}
    >
      {children}
    </StudentProgressContext.Provider>
  );
}

export function useStudentProgress() {
  const context = useContext(StudentProgressContext);
  if (!context) {
    throw new Error("useStudentProgress must be used within a StudentProgressProvider");
  }
  return context;
}
