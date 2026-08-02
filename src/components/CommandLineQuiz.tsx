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
    question: "Which command lists all files and folders inside the current directory in the Windows Command Prompt?",
    options: [
      "ls",
      "pwd",
      "dir",
      "list"
    ],
    answerIndex: 2,
    explanation: "The dir command stands for 'directory' and lists the contents of the current working directory in the Windows Command Prompt."
  },
  {
    id: 2,
    question: "How do you navigate back one level to the parent directory from the command prompt?",
    options: [
      "cd ..",
      "cd parent",
      "back",
      "cd -"
    ],
    answerIndex: 0,
    explanation: "cd .. moves the command line pointer back one level to the parent folder."
  },
  {
    id: 3,
    question: "Which command creates a new directory named 'code-labs' on your disk?",
    options: [
      "new code-labs",
      "mkdir code-labs",
      "create code-labs",
      "folder code-labs"
    ],
    answerIndex: 1,
    explanation: "mkdir (make directory) creates new folders with the specified folder name."
  },
  {
    id: 4,
    question: "What happens when you execute the command 'del notes.txt'?",
    options: [
      "It moves notes.txt to the Recycle Bin.",
      "It copies notes.txt to the backup directory.",
      "It permanently deletes notes.txt, bypassing the Recycle Bin.",
      "It deletes the entire folder containing notes.txt."
    ],
    answerIndex: 2,
    explanation: "The del command permanently deletes files instantly and completely, bypassing the Recycle Bin."
  },
  {
    id: 5,
    question: "Which command clears the Command Prompt screen of all past clutter and commands?",
    options: [
      "clear",
      "cls",
      "clean",
      "reset"
    ],
    answerIndex: 1,
    explanation: "cls stands for 'clear screen' and wipes the previous command output history from your active terminal screen."
  }
];

export default function CommandLineQuiz() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Quiz States
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Certification States
  const [savingProgress, setSavingProgress] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const [certId, setCertId] = useState("");
  const [certDate, setCertDate] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Check if already certified in Firestore
        try {
          const docRef = doc(db, `users/${user.uid}/certifications/windows_command_line`);
          const snap = await getDoc(docRef);
          if (snap.exists() && snap.data().certified) {
            const data = snap.data();
            setIsCertified(true);
            setCertId(data.certId || `NS-CMD-${user.uid.substring(0, 5).toUpperCase()}-CLI`);
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
    const finalId = `NS-CMD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const finalDate = new Date().toLocaleDateString();
    
    setCertId(finalId);
    setCertDate(finalDate);

    if (user) {
      setSavingProgress(true);
      try {
        await setDoc(doc(db, `users/${user.uid}/certifications/windows_command_line`), {
          topic: "Windows Command Line & Navigation",
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
            You successfully scored 100% on the Windows Command Line Certification assessment. Your badge is permanently saved to your Nextsem profile.
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
            <h3 className="text-xs font-black text-center text-slate-900 uppercase font-sans my-2 tracking-wide">
              Windows Command Line & Navigation
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
              Windows Command Line Certification <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-black">ASSESSMENT</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Prove your proficiency in folder navigation, directory management, and core CMD utilities. Score **100%** to earn your verified course completion badge.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-900 pt-5">
          <div className="text-[11px] text-slate-400">
            • 5 Multiple Choice Questions • Score 5/5 Required • Permanent Google Account Link
          </div>
          <button 
            onClick={handleStartQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#39ff14] hover:bg-[#2ebd10] text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:scale-105 cursor-pointer"
          >
            Start Assessment <Play size={14} fill="currentColor" />
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const isPerfectScore = score === QUIZ_QUESTIONS.length;

    return (
      <div className="my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative select-none">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isPerfectScore ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-rose-500/10 border border-rose-500/30'}`}>
            {isPerfectScore ? (
              <Trophy className="text-emerald-400 w-8 h-8" />
            ) : (
              <RotateCcw className="text-rose-400 w-8 h-8" />
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-100 mb-2">
            {isPerfectScore ? 'Congratulations!' : 'Keep Learning!'}
          </h3>
          
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            {isPerfectScore 
              ? 'You answered every question correctly and earned your Windows Command Line Badge!' 
              : `You scored ${score} out of ${QUIZ_QUESTIONS.length}. A score of 100% is required to claim the certification.`
            }
          </p>

          {isPerfectScore && !currentUser && (
            <div className="w-full max-w-md bg-slate-950 border border-slate-850 rounded-2xl p-5 text-left mb-6">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <LogIn size={14} className="text-amber-400" /> Save Certificate to Profile
              </h4>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Connect your account to claim your verified certificate and display the Command Line Badge permanently on your student profile dashboard.
              </p>
              
              <button 
                onClick={handleGoogleSignIn}
                disabled={savingProgress}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {savingProgress ? 'Saving...' : 'Connect Google Account'}
              </button>
            </div>
          )}

          {isPerfectScore && currentUser && savingProgress && (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-2 border-[#39ff14] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Verifying score & syncing cloud...</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs font-sans mt-4">
            {!isPerfectScore && (
              <button 
                onClick={handleStartQuiz}
                className="w-full flex items-center justify-center gap-1.5 px-5 py-3 bg-[#39ff14] hover:bg-[#2ebd10] text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-103"
              >
                <RotateCcw size={14} /> Try Again
              </button>
            )}
            {isPerfectScore && (
              <div className="text-center w-full">
                <h3 className="text-lg md:text-xl font-black text-slate-100">Score: {score} / {QUIZ_QUESTIONS.length}</h3>
                <button 
                  onClick={handleStartQuiz}
                  className="mt-3 flex items-center justify-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs border border-slate-700 transition-all cursor-pointer mx-auto"
                >
                  <RotateCcw size={14} /> Re-take Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="my-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl relative select-none">
      {/* Quiz Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-5">
        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400">
          Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span className="text-[10px] md:text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
          Score: {score}
        </span>
      </div>

      {/* Quiz Question */}
      <div className="mb-6">
        <h4 className="text-slate-100 text-sm md:text-base font-extrabold leading-snug">
          {currentQ.question}
        </h4>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOpt === idx;
          const correctIdx = currentQ.answerIndex;
          
          let optStyle = "bg-slate-950/40 hover:bg-slate-800/80 border-slate-800 text-slate-300";
          if (isSelected) {
            optStyle = "bg-blue-600/10 border-blue-500 text-blue-400";
          }
          if (isAnswered) {
            if (idx === correctIdx) {
              optStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
            } else if (isSelected && selectedOpt !== correctIdx) {
              optStyle = "bg-rose-500/10 border-rose-500 text-rose-400";
            } else {
              optStyle = "bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-3.5 border-2 rounded-xl text-xs md:text-sm transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none ${optStyle}`}
            >
              <span className="font-mono">{option}</span>
              {isAnswered && idx === correctIdx && <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />}
              {isAnswered && isSelected && selectedOpt !== correctIdx && <XCircle size={16} className="text-rose-400 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div className="mt-5 bg-slate-950/60 border border-slate-850 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-2 items-start">
            <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={14} />
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Explanation</span>
              <p className="text-xs text-slate-350 mt-1 leading-relaxed">{currentQ.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-6 border-t border-slate-800 pt-4 flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={selectedOpt === null}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2.5 bg-[#39ff14] hover:bg-[#2ebd10] text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)] hover:scale-103 cursor-pointer"
          >
            {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Finish Test' : 'Next Question'} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
