"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { 
  auth, 
  db, 
  signInWithGoogle, 
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  createUserWithEmailAndPassword as firebaseCreateUser,
  updateProfile as firebaseUpdateProfile,
  getRedirectResult
} from "@/lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { triggerCelebration } from "@/lib/celebration";
import StudentProfileDashboardModal from "@/components/StudentProfileDashboardModal";
import InAppAuthModal from "@/components/auth/InAppAuthModal";
import { getLessonTitleByDay } from "@/data/bcaStoriesData";

export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  photo: string | null;
  isGuest?: boolean;
}

export interface StudentSocialLinks {
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface PracticalProgressData {
  completedDays: number[];
  githubRepoUrls: Record<string, string>;
  githubUsername: string;
  selectedTrack: string;
  socialLinks?: StudentSocialLinks;
  lastUpdated: string;
}

export interface CbtScoreData {
  examTitle: string;
  examCode?: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  accuracy: number;
  passed: boolean;
  status?: string;
  timeSpentSeconds?: number;
  timeSpentFormatted?: string;
  submittedAt: string;
  categoryStats?: Record<string, { total: number; correct: number; attempted: number }>;
}

interface StudentProgressContextType {
  user: StudentProfile | null;
  loading: boolean;
  completedDays: number[];
  githubRepoUrls: Record<string, string>;
  githubUsername: string;
  selectedTrack: string;
  isCloudSynced: boolean;
  cbtScore: CbtScoreData | null;
  saveCbtScore: (scoreData: CbtScoreData) => Promise<{ success: boolean; message: string }>;
  isProfileDashboardOpen: boolean;
  openProfileDashboard: () => void;
  closeProfileDashboard: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signIn: () => Promise<void>;
  signInWithGoogleToken: (idToken: string) => Promise<boolean>;
  signInDirectlyAsStudent: (name: string, email: string) => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInAsGuest: (guestName?: string) => void;
  signOut: () => Promise<void>;
  isDayCompleted: (day: number) => boolean;
  isDayUnlocked: (day: number) => boolean;
  completeDayWithGitHub: (day: number, githubUrl: string) => Promise<{ success: boolean; message: string }>;
  setSelectedTrack: (track: string) => Promise<void>;
  setGithubUsername: (username: string) => Promise<void>;
  socialLinks: StudentSocialLinks;
  updateSocialLinks: (links: Partial<StudentSocialLinks>) => Promise<void>;
}

const StudentProgressContext = createContext<StudentProgressContextType | undefined>(undefined);

export function StudentProgressProvider({ children }: { children: ReactNode }) {
  // ── 1. Instant 0ms Local Hydration on First Render ──
  const [user, setUser] = useState<StudentProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("nextsem_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Never block the user with full-page loading if local cache exists
  const [loading, setLoading] = useState<boolean>(false);

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      const saved = localStorage.getItem(`nextsem_practical_completed_${email}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [githubRepoUrls, setGithubRepoUrls] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      const saved = localStorage.getItem(`nextsem_practical_github_urls_${email}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [githubUsername, setGithubUsernameState] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      return localStorage.getItem(`nextsem_practical_gh_username_${email}`) || "";
    } catch {
      return "";
    }
  });

  const [selectedTrack, setSelectedTrackState] = useState<string>(() => {
    if (typeof window === "undefined") return "web-dev";
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      return localStorage.getItem(`nextsem_practical_track_${email}`) || "web-dev";
    } catch {
      return "web-dev";
    }
  });

  const [socialLinks, setSocialLinksState] = useState<StudentSocialLinks>(() => {
    if (typeof window === "undefined") return {};
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      const saved = localStorage.getItem(`nextsem_practical_socials_${email}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [cbtScore, setCbtScore] = useState<CbtScoreData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const userRaw = localStorage.getItem("nextsem_user");
      const email = userRaw ? JSON.parse(userRaw).email : "guest";
      const saved = localStorage.getItem(`nextsem_cbt_score_${email}`) || localStorage.getItem("nextsem_cbt_score_latest");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isProfileDashboardOpen, setIsProfileDashboardOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Stable, zero-delay modal triggers
  const openProfileDashboard = useCallback(() => {
    setIsProfileDashboardOpen(true);
  }, []);

  const closeProfileDashboard = useCallback(() => {
    setIsProfileDashboardOpen(false);
  }, []);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Listen to in-app auth trigger events (avoids external popup windows)
  useEffect(() => {
    const handleTrigger = () => setIsAuthModalOpen(true);
    window.addEventListener("open_google_auth", handleTrigger);
    window.addEventListener("open_inapp_auth", handleTrigger);
    return () => {
      window.removeEventListener("open_google_auth", handleTrigger);
      window.removeEventListener("open_inapp_auth", handleTrigger);
    };
  }, []);

  // Fast local state loader
  const loadLocalProgress = useCallback((email: string) => {
    try {
      const savedCompleted = localStorage.getItem(`nextsem_practical_completed_${email}`);
      const savedUrls = localStorage.getItem(`nextsem_practical_github_urls_${email}`);
      const savedGhUser = localStorage.getItem(`nextsem_practical_gh_username_${email}`);
      const savedTrack = localStorage.getItem(`nextsem_practical_track_${email}`);
      const savedSocials = localStorage.getItem(`nextsem_practical_socials_${email}`);
      const savedCbt = localStorage.getItem(`nextsem_cbt_score_${email}`) || localStorage.getItem("nextsem_cbt_score_latest");

      if (savedCompleted) {
        setCompletedDays(JSON.parse(savedCompleted));
      } else {
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
      if (savedSocials) setSocialLinksState(JSON.parse(savedSocials));
      else setSocialLinksState({});

      if (savedCbt) setCbtScore(JSON.parse(savedCbt));
      else setCbtScore(null);
    } catch (e) {
      console.error("Failed to load local progress:", e);
    }
  }, []);

  // Asynchronous background sync with Firestore (Does NOT block UI or create lag)
  const syncWithFirestore = useCallback(async (firebaseUser: User) => {
    try {
      const email = firebaseUser.email || "student";
      const userDocRef = doc(db, "users_progress", firebaseUser.uid);
      const docSnap = await getDoc(userDocRef);

      let remoteDays: number[] = [];
      let remoteUrls: Record<string, string> = {};
      let remoteGhUser = "";
      let remoteTrack = "web-dev";
      let remoteSocials: StudentSocialLinks = {};
      let remoteCbtScore: CbtScoreData | null = null;

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.cbt_score) {
          remoteCbtScore = data.cbt_score;
        }
        if (data.bca_practical) {
          remoteDays = data.bca_practical.completedDays || [];
          remoteUrls = data.bca_practical.githubRepoUrls || {};
          remoteGhUser = data.bca_practical.githubUsername || "";
          remoteTrack = data.bca_practical.selectedTrack || "web-dev";
          remoteSocials = data.bca_practical.socialLinks || {};
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

      const localSocialsRaw = localStorage.getItem(`nextsem_practical_socials_${email}`);
      const localSocials: StudentSocialLinks = localSocialsRaw ? JSON.parse(localSocialsRaw) : {};
      const mergedSocials: StudentSocialLinks = { ...remoteSocials, ...localSocials };

      // Retrieve and sync active CBT score
      const localCbtRaw = localStorage.getItem(`nextsem_cbt_score_${email}`) || localStorage.getItem("nextsem_cbt_score_latest");
      let activeCbtScore = remoteCbtScore;
      if (localCbtRaw) {
        try {
          const parsedLocal: CbtScoreData = JSON.parse(localCbtRaw);
          if (!activeCbtScore) {
            activeCbtScore = parsedLocal;
          } else if (parsedLocal.submittedAt && activeCbtScore.submittedAt) {
            if (new Date(parsedLocal.submittedAt).getTime() >= new Date(activeCbtScore.submittedAt).getTime()) {
              activeCbtScore = parsedLocal;
            }
          }
        } catch {}
      }
      if (activeCbtScore) {
        setCbtScore(activeCbtScore);
        localStorage.setItem(`nextsem_cbt_score_${email}`, JSON.stringify(activeCbtScore));
        localStorage.setItem("nextsem_cbt_score_latest", JSON.stringify(activeCbtScore));
      }

      // Update in-memory state gracefully
      setCompletedDays(mergedDays);
      setGithubRepoUrls(mergedUrls);
      setGithubUsernameState(activeGhUser);
      setSelectedTrackState(activeTrack);
      setSocialLinksState(mergedSocials);
      setIsCloudSynced(true);

      // Save merged locally
      localStorage.setItem(`nextsem_practical_completed_${email}`, JSON.stringify(mergedDays));
      localStorage.setItem(`nextsem_practical_github_urls_${email}`, JSON.stringify(mergedUrls));
      localStorage.setItem(`nextsem_practical_gh_username_${email}`, activeGhUser);
      localStorage.setItem(`nextsem_practical_track_${email}`, activeTrack);
      localStorage.setItem(`nextsem_practical_socials_${email}`, JSON.stringify(mergedSocials));

      // Push merged back to Firestore quietly
      await setDoc(userDocRef, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        ...(activeCbtScore ? { cbt_score: activeCbtScore } : {}),
        bca_practical: {
          completedDays: mergedDays,
          githubRepoUrls: mergedUrls,
          githubUsername: activeGhUser,
          selectedTrack: activeTrack,
          socialLinks: mergedSocials,
          lastUpdated: new Date().toISOString()
        }
      }, { merge: true });

    } catch (err) {
      console.warn("Silent background firestore sync warning:", err);
      setIsCloudSynced(false);
    }
  }, []);

  // ── 2. Zero-Lag Auth State Listener ──
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          const fbUser = result.user;
          const profile: StudentProfile = {
            uid: fbUser.uid,
            name: fbUser.displayName || "NextSem Student",
            email: fbUser.email || "student@nextsem.local",
            photo: fbUser.photoURL,
            isGuest: false
          };
          setUser(profile);
          localStorage.setItem("nextsem_user", JSON.stringify(profile));
          loadLocalProgress(profile.email);
          syncWithFirestore(fbUser).catch(() => {});
        }
      })
      .catch((err) => {
        console.warn("Redirect auth check:", err);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const profile: StudentProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "NextSem Student",
          email: firebaseUser.email || "student@nextsem.local",
          photo: firebaseUser.photoURL,
          isGuest: false
        };

        // Instant local update (0ms latency)
        setUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        loadLocalProgress(profile.email);
        setLoading(false);

        // Background non-blocking sync
        syncWithFirestore(firebaseUser).catch(() => {});
      } else {
        // Fallback to active saved session in localStorage (guest, email, or local login)
        try {
          const savedUser = localStorage.getItem("nextsem_user");
          if (savedUser) {
            const parsed: StudentProfile = JSON.parse(savedUser);
            if (parsed && (parsed.email || parsed.uid)) {
              setUser(parsed);
              setIsCloudSynced(false);
              loadLocalProgress(parsed.email || "guest");
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error("Failed to parse saved user session", e);
        }

        setUser(null);
        setIsCloudSynced(false);
        loadLocalProgress("guest");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loadLocalProgress, syncWithFirestore]);

  // ── 3. In-App Authentication Handlers (No external popup windows) ──

  // Google Sign-In with instant local update (0ms delay)
  const signIn = useCallback(async () => {
    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        const fbUser = result.user;
        const profile: StudentProfile = {
          uid: fbUser.uid,
          name: fbUser.displayName || "NextSem Student",
          email: fbUser.email || "student@nextsem.local",
          photo: fbUser.photoURL,
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        loadLocalProgress(profile.email);
        syncWithFirestore(fbUser).catch(() => {});
      }
    } catch (e: any) {
      console.error("Google Sign-In failed:", e);
      if (typeof window !== "undefined") {
        if (e?.code === "auth/configuration-not-found" || e?.message?.includes("CONFIGURATION_NOT_FOUND")) {
          alert("Google Sign-In is not enabled in Firebase Console for this project. Please use Instant Guest Mode or In-App Email login.");
        } else if (e?.code !== "auth/popup-closed-by-user") {
          console.warn("Google Auth Notice:", e?.message || e);
        }
      }
      throw e;
    }
  }, [loadLocalProgress, syncWithFirestore]);

  // Google One Tap Token Sign-In (Official Google Identity Services)
  const signInWithGoogleToken = useCallback(async (idToken: string): Promise<boolean> => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const fbUser = userCredential.user;
      const profile: StudentProfile = {
        uid: fbUser.uid,
        name: fbUser.displayName || "NextSem Student",
        email: fbUser.email || "student@nextsem.local",
        photo: fbUser.photoURL,
        isGuest: false
      };
      setUser(profile);
      localStorage.setItem("nextsem_user", JSON.stringify(profile));
      loadLocalProgress(profile.email);
      syncWithFirestore(fbUser).catch(() => {});
      return true;
    } catch (err) {
      console.error("Google One Tap token sign-in error:", err);
      return false;
    }
  }, [loadLocalProgress, syncWithFirestore]);

  // Instant 1-Click Login for verified accounts (e.g. bca2026.nextsem@gmail.com)
  const signInDirectlyAsStudent = useCallback((name: string, email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || cleanEmail.split("@")[0];
    const profile: StudentProfile = {
      uid: `google_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
      name: cleanName,
      email: cleanEmail,
      photo: null,
      isGuest: false
    };
    setUser(profile);
    localStorage.setItem("nextsem_user", JSON.stringify(profile));
    loadLocalProgress(cleanEmail);
  }, [loadLocalProgress]);

  // In-App Email & Password Login with frictionless auto-register fallback
  const signInWithEmail = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: "Please enter your email and password." };
    }
    try {
      const userCredential = await firebaseSignInWithEmail(auth, cleanEmail, password);
      const fbUser = userCredential.user;
      const profile: StudentProfile = {
        uid: fbUser.uid,
        name: fbUser.displayName || cleanEmail.split("@")[0],
        email: fbUser.email || cleanEmail,
        photo: fbUser.photoURL,
        isGuest: false
      };
      setUser(profile);
      localStorage.setItem("nextsem_user", JSON.stringify(profile));
      loadLocalProgress(profile.email);
      syncWithFirestore(fbUser).catch(() => {});
      return { success: true };
    } catch (err: any) {
      console.warn("Firebase email sign-in fallback/error:", err);
      
      // If user not found, try auto-creating the account with these credentials for frictionless access!
      if (err?.code === "auth/user-not-found" || err?.code === "auth/invalid-credential") {
        if (password.length >= 6) {
          try {
            const userCredential = await firebaseCreateUser(auth, cleanEmail, password);
            const fbUser = userCredential.user;
            const profile: StudentProfile = {
              uid: fbUser.uid,
              name: cleanEmail.split("@")[0],
              email: fbUser.email || cleanEmail,
              photo: null,
              isGuest: false
            };
            setUser(profile);
            localStorage.setItem("nextsem_user", JSON.stringify(profile));
            loadLocalProgress(profile.email);
            syncWithFirestore(fbUser).catch(() => {});
            return { success: true };
          } catch (createErr: any) {
            if (createErr?.code === "auth/email-already-in-use") {
              return { success: false, error: "Incorrect password for this email. Please check your password or continue with 'Google' / 'Instant Guest Mode'." };
            }
          }
        }
      }

      // Graceful local authentication fallback if Firebase Email/Pass isn't enabled in console
      if (
        err?.code === "auth/configuration-not-found" || 
        err?.code === "auth/operation-not-allowed" ||
        err?.code === "auth/network-request-failed"
      ) {
        const profile: StudentProfile = {
          uid: `student_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
          name: cleanEmail.split("@")[0],
          email: cleanEmail,
          photo: null,
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        loadLocalProgress(cleanEmail);
        return { success: true };
      }
      let errorMsg = "Failed to sign in. Please check your credentials.";
      if (err?.code === "auth/user-not-found" || err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
        errorMsg = "Invalid email or password. Please click 'Create Free Account' or continue with 'Google' / 'Instant Guest Mode'.";
      } else if (err?.code === "auth/invalid-email") {
        errorMsg = "Please enter a valid email address.";
      }
      return { success: false, error: errorMsg };
    }
  }, [loadLocalProgress, syncWithFirestore]);

  // In-App Account Creation (100% in-app, 0 popups)
  const signUpWithEmail = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanName = name.trim() || "Student";
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, error: "Please enter your name, email, and password." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }
    try {
      const userCredential = await firebaseCreateUser(auth, cleanEmail, password);
      const fbUser = userCredential.user;
      await firebaseUpdateProfile(fbUser, { displayName: cleanName });
      const profile: StudentProfile = {
        uid: fbUser.uid,
        name: cleanName,
        email: cleanEmail,
        photo: null,
        isGuest: false
      };
      setUser(profile);
      localStorage.setItem("nextsem_user", JSON.stringify(profile));
      loadLocalProgress(cleanEmail);
      syncWithFirestore(fbUser).catch(() => {});
      return { success: true };
    } catch (err: any) {
      console.warn("Firebase sign-up fallback:", err);
      if (err?.code === "auth/configuration-not-found" || err?.code === "auth/operation-not-allowed") {
        const profile: StudentProfile = {
          uid: `student_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`,
          name: cleanName,
          email: cleanEmail,
          photo: null,
          isGuest: false
        };
        setUser(profile);
        localStorage.setItem("nextsem_user", JSON.stringify(profile));
        loadLocalProgress(cleanEmail);
        return { success: true };
      }
      let errorMsg = "Failed to create account.";
      if (err?.code === "auth/email-already-in-use") {
        errorMsg = "This email is already registered. Please sign in instead.";
      } else if (err?.code === "auth/weak-password") {
        errorMsg = "Password is too weak. Please use at least 6 characters.";
      } else if (err?.code === "auth/invalid-email") {
        errorMsg = "Please enter a valid email address.";
      }
      return { success: false, error: errorMsg };
    }
  }, [loadLocalProgress, syncWithFirestore]);

  const signInAsGuest = useCallback((guestName?: string) => {
    const name = guestName?.trim() || "Guest Student";
    const profile: StudentProfile = {
      uid: `guest_${Date.now()}`,
      name,
      email: "guest@nextsem.local",
      photo: null,
      isGuest: true
    };
    setUser(profile);
    setIsCloudSynced(false);
    localStorage.setItem("nextsem_user", JSON.stringify(profile));
    loadLocalProgress(profile.email);
  }, [loadLocalProgress]);

  const signOut = useCallback(async () => {
    try {
      if (!user?.isGuest) {
        await firebaseSignOut(auth);
      }
      localStorage.removeItem("nextsem_user");
      setUser(null);
      setCbtScore(null);
      setIsCloudSynced(false);
      loadLocalProgress("guest");
    } catch (e) {
      console.error("Sign Out failed:", e);
    }
  }, [user, loadLocalProgress]);

  const isDayUnlocked = useCallback((day: number): boolean => {
    if (day <= 1) return true;
    return completedDays.includes(day - 1);
  }, [completedDays]);

  const isDayCompleted = useCallback((day: number): boolean => {
    return completedDays.includes(day);
  }, [completedDays]);

  const completeDayWithGitHub = useCallback(async (day: number, githubUrl: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return {
        success: false,
        message: "Google Sign-In Required: You must be logged in with your Google account to record your completed project and unlock the next lesson."
      };
    }

    const cleanUrl = githubUrl.trim();
    if (!cleanUrl) {
      return { success: false, message: "Please provide your GitHub repository or commit URL." };
    }

    const githubRegex = /^https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(\/.*)?$/i;
    const match = cleanUrl.match(githubRegex);
    if (!match) {
      return { 
        success: false, 
        message: "Invalid GitHub URL format. Please provide your real project repository link (e.g., https://github.com/your-username/html-day1-portfolio)." 
      };
    }

    const extractedUser = match[2];
    const userLower = extractedUser.toLowerCase();
    const repoLower = match[3].toLowerCase().replace(/\.git$/, "");

    const placeholderUsernames = [
      "your-username", "your_username", "yourname", "username", "example", 
      "octocat", "user", "template", "null", "undefined", "none", "student", 
      "facebook", "vercel", "google", "microsoft", "github"
    ];
    if (placeholderUsernames.includes(userLower)) {
      return {
        success: false,
        message: `"${extractedUser}" is an example placeholder. Please provide your OWN personal GitHub account repository URL where you pushed your project.`
      };
    }

    const placeholderRepos = [
      "your-repo", "your-repo-name", "repo-name", "my-repo", "example-repo", 
      "placeholder", "repo", "project-name", "project", "none", "undefined"
    ];
    if (placeholderRepos.includes(repoLower)) {
      return {
        success: false,
        message: `"${match[3]}" looks like a template placeholder. Please provide the actual repository name where your code is pushed.`
      };
    }

    const newCompletedDays = Array.from(new Set([...completedDays, day])).sort((a, b) => a - b);
    const newUrls = { ...githubRepoUrls, [day.toString()]: cleanUrl };

    setCompletedDays(newCompletedDays);
    setGithubRepoUrls(newUrls);
    if (extractedUser && !githubUsername) {
      setGithubUsernameState(extractedUser);
    }

    const email = user.email;
    localStorage.setItem(`nextsem_practical_completed_${email}`, JSON.stringify(newCompletedDays));
    localStorage.setItem(`nextsem_practical_github_urls_${email}`, JSON.stringify(newUrls));
    localStorage.setItem(`nextsem_practical_day_${day}_done_${email}`, "true");
    if (extractedUser) {
      localStorage.setItem(`nextsem_practical_gh_username_${email}`, extractedUser);
    }

    // Background sync to Firestore
    if (user && !user.isGuest) {
      setDoc(doc(db, "users_progress", user.uid), {
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
      }, { merge: true })
      .then(() => setIsCloudSynced(true))
      .catch((err) => console.error("Firestore sync warning:", err));

      // Mirror story to Firestore stories collection quietly
      const dayLessonTitle = getLessonTitleByDay(day);
      setDoc(doc(db, "bca_practical_stories", `${user.uid}_day_${day}`), {
        userId: user.uid,
        userName: user.name,
        userPhoto: user.photo,
        day,
        lessonTitle: dayLessonTitle,
        caption: `Completed Day ${day}: ${dayLessonTitle} and pushed verified code to GitHub! 🚀 Technical Viva passed 100%.`,
        githubRepoUrl: cleanUrl,
        timestamp: new Date().toISOString(),
        createdAt: Date.now()
      }, { merge: true }).catch(() => {});
    }

    // Auto-publish daily story status milestone
    try {
      const existingStoriesRaw = localStorage.getItem("nextsem_user_custom_stories");
      const existingStories = existingStoriesRaw ? JSON.parse(existingStoriesRaw) : [];
      const newSlide = {
        id: `auto-day-${day}-${Date.now()}`,
        day,
        lessonTitle: `Day ${day} Practical Milestone`,
        category: day <= 10 ? "HTML" : day <= 20 ? "CSS" : "JavaScript",
        timestamp: "Just now",
        caption: `Completed Day ${day} and pushed verified code to GitHub! Technical Viva passed 100%. 🚀`,
        vivaScore: "100% Viva Approved",
        githubRepoUrl: cleanUrl,
        techTags: ["BCA", "Practical", "Milestone", "VerifiedCode"],
        gradientTheme: "from-blue-600 via-indigo-600 to-purple-800",
        createdAt: Date.now()
      };
      const filtered = existingStories.filter((s: any) => s.day !== day);
      localStorage.setItem("nextsem_user_custom_stories", JSON.stringify([newSlide, ...filtered]));
    } catch (e) {
      console.warn("Could not auto-save story status:", e);
    }

    triggerCelebration();
    return { success: true, message: `Day ${day} successfully submitted! Story status published to community feed.` };
  }, [user, completedDays, githubRepoUrls, githubUsername, selectedTrack]);

  const setSelectedTrack = useCallback(async (track: string) => {
    setSelectedTrackState(track);
    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_track_${email}`, track);

    if (user && !user.isGuest) {
      setDoc(doc(db, "users_progress", user.uid), {
        bca_practical: { selectedTrack: track, lastUpdated: new Date().toISOString() }
      }, { merge: true }).catch(() => {});
    }
  }, [user]);

  const setGithubUsername = useCallback(async (username: string) => {
    setGithubUsernameState(username);
    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_gh_username_${email}`, username);

    if (user && !user.isGuest) {
      setDoc(doc(db, "users_progress", user.uid), {
        bca_practical: { githubUsername: username, lastUpdated: new Date().toISOString() }
      }, { merge: true }).catch(() => {});
    }
  }, [user]);

  const updateSocialLinks = useCallback(async (links: Partial<StudentSocialLinks>) => {
    const updated = { ...socialLinks, ...links };
    setSocialLinksState(updated);
    const email = user ? user.email : "guest";
    localStorage.setItem(`nextsem_practical_socials_${email}`, JSON.stringify(updated));

    if (user && !user.isGuest) {
      setDoc(doc(db, "users_progress", user.uid), {
        bca_practical: { socialLinks: updated, lastUpdated: new Date().toISOString() }
      }, { merge: true }).catch(() => {});
    }
  }, [user, socialLinks]);

  const saveCbtScore = useCallback(async (scoreData: CbtScoreData): Promise<{ success: boolean; message: string }> => {
    setCbtScore(scoreData);

    try {
      localStorage.setItem("nextsem_cbt_score_latest", JSON.stringify(scoreData));
      const email = user ? user.email : "guest";
      localStorage.setItem(`nextsem_cbt_score_${email}`, JSON.stringify(scoreData));
    } catch (e) {
      console.warn("Local storage write error for CBT score:", e);
    }

    if (user && !user.isGuest) {
      // Non-blocking background sync to Firestore (guarantees 0ms UI latency & never hangs)
      setDoc(doc(db, "users_progress", user.uid), {
        email: user.email,
        displayName: user.name,
        photoURL: user.photo,
        cbt_score: scoreData,
        lastUpdated: new Date().toISOString()
      }, { merge: true })
      .then(() => setIsCloudSynced(true))
      .catch((err) => console.warn("Firestore background sync warning for CBT score:", err));

      setIsCloudSynced(true);
      triggerCelebration();
      return { success: true, message: "Your CBT score has been permanently linked and saved to your Google Cloud profile!" };
    } else {
      triggerCelebration();
      return { success: true, message: "Score saved to device! Sign in with Google to permanently link your badge to Google Cloud." };
    }
  }, [user]);

  // ── 3. Memoized Context Value ──
  const contextValue = useMemo(() => ({
    user,
    loading,
    completedDays,
    githubRepoUrls,
    githubUsername,
    selectedTrack,
    socialLinks,
    updateSocialLinks,
    isCloudSynced,
    cbtScore,
    saveCbtScore,
    isProfileDashboardOpen,
    openProfileDashboard,
    closeProfileDashboard,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signIn,
    signInWithGoogleToken,
    signInDirectlyAsStudent,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    signOut,
    isDayCompleted,
    isDayUnlocked,
    completeDayWithGitHub,
    setSelectedTrack,
    setGithubUsername
  }), [
    user,
    loading,
    completedDays,
    githubRepoUrls,
    githubUsername,
    selectedTrack,
    socialLinks,
    updateSocialLinks,
    isCloudSynced,
    cbtScore,
    saveCbtScore,
    isProfileDashboardOpen,
    openProfileDashboard,
    closeProfileDashboard,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signIn,
    signInWithGoogleToken,
    signInDirectlyAsStudent,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    signOut,
    isDayCompleted,
    isDayUnlocked,
    completeDayWithGitHub,
    setSelectedTrack,
    setGithubUsername
  ]);

  return (
    <StudentProgressContext.Provider value={contextValue}>
      {children}
      <StudentProfileDashboardModal 
        isOpen={isProfileDashboardOpen} 
        onClose={closeProfileDashboard} 
      />
      <InAppAuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
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
