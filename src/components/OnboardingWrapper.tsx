"use client";

import { useState, useEffect } from "react";
import OnboardingIntro from "./OnboardingIntro";

export default function OnboardingWrapper() {
  const [done, setDone] = useState(true); // Default to true (hidden) for SSR/safe-guard

  useEffect(() => {
    const seen = localStorage.getItem("nextsem_onboarding_v1");
    const sessionSeen = sessionStorage.getItem("nextsem_onboarding_session_seen");
    setTimeout(() => {
      if (seen || sessionSeen) {
        setDone(true);
      } else {
        setDone(false);
      }
    }, 0);
  }, []);

  const handleComplete = () => {
    localStorage.setItem("nextsem_onboarding_v1", "1");
    sessionStorage.setItem("nextsem_onboarding_session_seen", "true");
    setDone(true);
  };

  if (done) return null;
  return <OnboardingIntro onComplete={handleComplete} />;}
