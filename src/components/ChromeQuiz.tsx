"use client";

import React, { useState, useEffect } from 'react';
import { auth, db, signInWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { 
  Award, Trophy, CheckCircle2, XCircle, Play, ArrowRight, 
  RotateCcw, Sparkles, LogIn, ShieldCheck, Printer
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "How do you open the DevTools Command Menu to execute commands, open panels, or toggle device frames quickly?",
    options: [
      "Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)",
      "Press F5 or Ctrl+R",
      "Double-click the Console tab",
      "Right-click anywhere and select 'View Page Source'"
    ],
    answerIndex: 0,
    explanation: "Ctrl+Shift+P / Cmd+Shift+P opens the DevTools Command Menu, which acts like VS Code's command palette, letting you execute commands and search settings."
  },
  {
    id: 2,
    question: "Which JavaScript console method prints an array of objects as a clean, sortable grid/table in the Console window?",
    options: [
      "console.dir()",
      "console.table()",
      "console.group()",
      "console.logGrid()"
    ],
    answerIndex: 1,
    explanation: "console.table() parses arrays or objects and renders them as a beautiful, interactively sortable table in the Console."
  },
  {
    id: 3,
    question: "How do you inspect and force transient pseudo-states like :hover, :focus, or :active on an element in the Elements panel?",
    options: [
      "Keep your mouse physically hovering over the element while editing values",
      "Type ':hover' directly into the Console tab",
      "Click the ':hov' section in the Styles pane and toggle the state checkboxes",
      "Pseudo-states cannot be inspected or forced in DevTools"
    ],
    answerIndex: 2,
    explanation: "Clicking the ':hov' button in the Styles pane allows you to force state checkboxes like :hover and :active, freezing the CSS styles so you can inspect them without real hover interaction."
  },
  {
    id: 4,
    question: "How do you set a breakpoint that only pauses execution when a specific JS logical expression or variable evaluates to true?",
    options: [
      "Right-click a line number in the Sources pane and select 'Add conditional breakpoint...'",
      "Type 'debugger if (expr)' in your source code",
      "Add console.log() on the line above it",
      "Pause script execution using the Network tab throttling menu"
    ],
    answerIndex: 0,
    explanation: "Right-clicking a line number in the Sources panel lets you add a 'Conditional Breakpoint'. The engine will only trigger the pause if your expression evaluates to true."
  },
  {
    id: 5,
    question: "Which DevTools panel would you use to audit client-side data like LocalStorage items, SessionStorage keys, and Cookies?",
    options: [
      "Elements panel",
      "Network panel",
      "Sources panel",
      "Application panel"
    ],
    answerIndex: 3,
    explanation: "The Application panel is the dedicated dashboard for managing client-side storage keys, local DBs, SessionStorage, Cookies, and Cache storage."
  }
];

export default function ChromeQuiz() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Certification States
  const [savingProgress, setSavingProgress] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const [certId, setCertId] = useState("");
  const [certDate, setCertDate] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      
      if (user) {
        // Check if already certified in Firestore
        try {
          const docRef = doc(db, `users/${user.uid}/certifications/chrome_devtools`);
          const snap = await getDoc(docRef);
          if (snap.exists() && snap.data().certified) {
            const data = snap.data();
            setIsCertified(true);
            setCertId(data.certId || `NS-DEV-${user.uid.substring(0, 5).toUpperCase()}-CHROME`);
            setCertDate(data.completedAt ? new Date(data.completedAt.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString());
          }
        } catch (e) {
          console.error("Error reading certification progress:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setWrongAnswers([]);
    setQuizFinished(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
  };

  const handleAnswerSubmit = () => {
    if (selectedOpt === null || isAnswered) return;
    
    const correctIdx = QUIZ_QUESTIONS[currentIdx].answerIndex;
    if (selectedOpt === correctIdx) {
      setScore(prev => prev + 1);
    } else {
      setWrongAnswers(prev => [...prev, QUIZ_QUESTIONS[currentIdx].id]);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOpt === QUIZ_QUESTIONS[currentIdx].answerIndex ? 1 : 0);
      if (finalScore === QUIZ_QUESTIONS.length) {
        punchCertification();
      }
    }
  };

  const punchCertification = async () => {
    const user = auth.currentUser;
    const finalId = `NS-CHROME-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const finalDate = new Date().toLocaleDateString();
    
    setCertId(finalId);
    setCertDate(finalDate);

    if (user) {
      setSavingProgress(true);
      try {
        await setDoc(doc(db, `users/${user.uid}/certifications/chrome_devtools`), {
          topic: "Google Chrome DevTools Debugging",
          score: 100,
          completedAt: new Date(),
          certified: true,
          certId: finalId
        });
        setIsCertified(true);
      } catch (err) {
        console.error("Firestore punch failed: ", err);
      } finally {
        setSavingProgress(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      if (quizFinished && score === QUIZ_QUESTIONS.length) {
        punchCertification();
      }
    } catch (e) {
      alert("Authentication failed. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isCertified && !quizStarted) {
    return (
      <div className="my-8 bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full filter blur-xl pointer-events-none" />
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mb-4">
            <Award className="text-amber-400 w-8 h-8 animate-bounce" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-slate-100 mb-2">Certification Claimed!</h3>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            You successfully scored 100% on the Google Chrome DevTools Certification assessment. Your badge is permanently saved to your Nextsem profile.
          </p>

          <div className="w-full max-w-md bg-white text-slate-900 p-6 rounded-2xl shadow-xl border-4 border-amber-500/80 relative text-left mb-6 font-serif">
            <div className="absolute top-2 right-2 border-2 border-dashed border-amber-500/40 rounded-full p-1 opacity-70">
              <ShieldCheck className="text-amber-600 w-8 h-8" />
            </div>
            
            <div className="text-center border-b-2 border-slate-200 pb-3 mb-4 font-sans">
              <h4 className="text-[10px] uppercase tracking-widest font-black text-amber-600">Verification Certificate</h4>
              <p className="text-[8px] text-slate-500 mt-0.5">Nextsem Learning Academy</p>
            </div>
            
            <p className="text-[10px] text-slate-500 italic text-center">This certifies that</p>
            <h2 className="text-lg font-black text-center text-slate-950 font-sans my-1 truncate">
              {currentUser?.displayName || "Nextsem Dev Student"}
            </h2>
            <p className="text-[9px] text-slate-500 text-center max-w-xs mx-auto">
              has completed the expert syllabus and passed the verified assessment for:
            </p>
            <h3 className="text-xs font-black text-center text-slate-900 uppercase font-sans my-2 tracking-wide font-sans">
              Google Chrome for Developers
            </h3>
            
            <div className="flex justify-between items-center text-[8px] font-sans mt-5 border-t border-slate-150 pt-2 text-slate-500">
              <div>
                <span className="block font-bold">DATE OF COMPLETION</span>
                <span className="text-slate-800">{certDate}</span>
              </div>
              <div className="text-right">
                <span className="block font-bold">VERIFICATION ID</span>
                <span className="text-slate-800 font-mono">{certId}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center font-sans">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-103"
            >
              <Printer size={14} /> Print Certificate
            </button>
            <button 
              onClick={handleStartQuiz}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-full text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw size={14} /> Re-take Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="my-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-850 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full filter blur-lg" />
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/25 rounded-2xl flex items-center justify-center shrink-0">
            <Trophy className="text-blue-400 w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-slate-100 flex items-center gap-2">
              Google Chrome DevTools Certification <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-black">ASSESSMENT</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Prove your proficiency in Chrome DevTools settings, Command Menu, and Console capabilities. Score **100%** to earn your verified course completion badge.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-905 pt-5">
          <div className="text-[11px] text-slate-400">
            • 5 Multiple Choice Questions • Score 5/5 Required • Permanent Google Account Link
          </div>
          <button 
            onClick={handleStartQuiz}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-103"
          >
            Start Certification Test <Play size={12} fill="white" />
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const isPerfectScore = score === QUIZ_QUESTIONS.length;

    return (
      <div className="my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl select-none">
        <div className="flex flex-col items-center text-center">
          {isPerfectScore ? (
            <>
              <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="text-green-400 w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-100">Perfect Score! 5 / 5</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-2 mb-6 font-sans">
                Excellent work! You got 100% of the questions correct and unlocked the Google Chrome certification.
              </p>

              {currentUser ? (
                <div className="w-full max-w-md bg-white text-slate-900 p-6 rounded-2xl shadow-xl border-4 border-amber-500/80 relative text-left mb-6 font-serif">
                  <div className="absolute top-2 right-2 border-2 border-dashed border-amber-500/40 rounded-full p-1 opacity-70">
                    <ShieldCheck className="text-amber-600 w-8 h-8" />
                  </div>
                  
                  <div className="text-center border-b-2 border-slate-200 pb-3 mb-4 font-sans">
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-amber-600">Verification Certificate</h4>
                    <p className="text-[8px] text-slate-500 mt-0.5">Nextsem Learning Academy</p>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 italic text-center">This certifies that</p>
                  <h2 className="text-lg font-black text-center text-slate-950 font-sans my-1 truncate">
                    {currentUser.displayName || "Nextsem Student"}
                  </h2>
                  <p className="text-[9px] text-slate-500 text-center max-w-xs mx-auto">
                    has completed the expert syllabus and passed the verified assessment for:
                  </p>
                  <h3 className="text-xs font-black text-center text-slate-900 uppercase font-sans my-2 tracking-wide font-sans">
                    Google Chrome for Developers
                  </h3>
                  
                  <div className="flex justify-between items-center text-[8px] font-sans mt-5 border-t border-slate-150 pt-2 text-slate-500">
                    <div>
                      <span className="block font-bold">DATE OF COMPLETION</span>
                      <span className="text-slate-800">{certDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold">VERIFICATION ID</span>
                      <span className="text-slate-800 font-mono">{certId}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md bg-slate-955 border border-slate-800 rounded-2xl p-5 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <LogIn className="text-amber-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide">Sign In to Claim Badge</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        We cannot save your certification permanently to your Google Account because you are browsing as a guest. 
                        Sign in now to lock in your score forever!
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleGoogleSignIn}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Connect Google Account
                  </button>
                </div>
              )}

              <div className="flex gap-3 flex-wrap justify-center font-sans">
                {currentUser && (
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-full text-xs shadow-md transition-all cursor-pointer hover:scale-103"
                  >
                    <Printer size={14} /> Print Certificate
                  </button>
                )}
                <button 
                  onClick={handleStartQuiz}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-full text-xs border border-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw size={14} /> Re-take Quiz
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-rose-500/15 border border-rose-500/30 rounded-full flex items-center justify-center mb-4">
                <XCircle className="text-rose-400 w-8 h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-100">Score: {score} / {QUIZ_QUESTIONS.length}</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-2 mb-6 font-sans">
                You must answer **100%** of the questions correctly to earn the Google Chrome DevTools Certificate. Don&apos;t worry, you can study the material and try again!
              </p>
              
              <button 
                onClick={handleStartQuiz}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md transition-all cursor-pointer"
              >
                Try Again <RotateCcw size={13} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  return (
    <div className="my-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl relative select-none">
      
      <div className="flex justify-between items-center pb-4 border-b border-slate-850 mb-5">
        <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider">
          Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-950 px-2 py-0.5 border border-slate-850 rounded">
          Pass Score: 5/5
        </span>
      </div>

      <h3 className="text-sm md:text-base font-bold text-slate-100 mb-4 leading-relaxed">
        {currentQ.question}
      </h3>

      <div className="space-y-3 mb-5">
        {currentQ.options.map((opt, i) => {
          let optStyle = "border-slate-800 bg-slate-950/40 text-slate-350 hover:bg-slate-850 hover:border-slate-700";
          
          if (selectedOpt === i) {
            optStyle = "border-blue-600 bg-blue-500/10 text-blue-200";
          }
          
          if (isAnswered) {
            if (i === currentQ.answerIndex) {
              optStyle = "border-green-600 bg-green-500/10 text-green-200 font-bold";
            } else if (selectedOpt === i) {
              optStyle = "border-rose-600 bg-rose-500/10 text-rose-350 line-through";
            } else {
              optStyle = "border-slate-850 bg-slate-950/20 text-slate-500 opacity-60";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleOptionSelect(i)}
              disabled={isAnswered}
              className={`w-full border p-3.5 rounded-xl text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && i === currentQ.answerIndex && <CheckCircle2 size={16} className="text-green-500 shrink-0 ml-2" />}
              {isAnswered && selectedOpt === i && i !== currentQ.answerIndex && <XCircle size={16} className="text-rose-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl mb-5 text-xs text-slate-400 leading-relaxed">
          <span className="font-black uppercase text-green-500 block mb-1">Explanation:</span>
          {currentQ.explanation}
        </div>
      )}

      <div className="flex justify-end pt-3 border-t border-slate-850">
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedOpt === null}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-colors ${
              selectedOpt === null 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider rounded-full text-xs cursor-pointer"
          >
            {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Test' : 'Next Question'} 
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}
