"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle, CheckCircle2, AlertCircle, ArrowLeft, RotateCcw, Trophy, Sparkles, ChevronRight
} from "lucide-react";
import { htmlLessons } from "@/data/htmlLessonsData";

type Language = "english" | "hinglish" | "hindi";

const getExerciseForLang = (ex: any, lang: Language) => {
  if (ex && typeof ex === "object" && "english" in ex) {
    return ex[lang] || ex.english;
  }
  return ex;
};

export default function HtmlQuizClient() {
  const [selectedLang, setSelectedLang] = useState<Language>("english");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentLesson = htmlLessons[currentQuestionIdx] || htmlLessons[0];
  const currentExercise = getExerciseForLang(currentLesson.exercise, selectedLang);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (currentExercise?.options && Array.isArray(currentExercise.options)) {
      const copy = [...currentExercise.options];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setShuffledOptions(copy);
    }
  }, [currentQuestionIdx, selectedLang, currentExercise?.question]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return; // Prevent changing choice
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === currentExercise.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < htmlLessons.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  useEffect(() => {
    const onNext = () => handleNextQuestion();
    const onPrev = () => handlePrevQuestion();

    window.addEventListener("nextsem_quiz_next", onNext);
    window.addEventListener("nextsem_quiz_prev", onPrev);
    return () => {
      window.removeEventListener("nextsem_quiz_next", onNext);
      window.removeEventListener("nextsem_quiz_prev", onPrev);
    };
  }, [currentQuestionIdx]);

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const isCorrect = selectedOption === currentExercise.correctAnswer;
  const progressPercent = Math.round(((currentQuestionIdx + 1) / htmlLessons.length) * 100);

  return (
    <div className="min-h-screen bg-[#060c18] text-white font-sans selection:bg-[#04AA6D]/30 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Top Header Navigation */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <Link
            href="/html"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all border border-slate-800"
          >
            <ArrowLeft size={16} />
            <span>Back to HTML Lessons</span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {(["english", "hinglish", "hindi"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 text-xs font-extrabold uppercase rounded-lg transition-all cursor-pointer ${
                  selectedLang === lang
                    ? "bg-[#04AA6D] text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "english" ? "🇬🇧 English" : lang === "hinglish" ? "🗣️ Hinglish" : "🕉️ Hindi"}
              </button>
            ))}
          </div>
        </div>

        {/* Title Card */}
        <div className="p-6 bg-[#1d2a35] border border-slate-700/60 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#04AA6D] block">Comprehensive Quiz</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">HTML Interactive Test</h1>
            <p className="text-xs text-slate-300 mt-1">Test your skills across all 100 HTML lessons.</p>
          </div>
          <div className="px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-center shrink-0">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Score</span>
            <span className="text-lg font-black text-[#04AA6D]">{score} / {currentQuestionIdx + (selectedOption !== null ? 1 : 0)}</span>
          </div>
        </div>

        {!quizFinished ? (
          <>
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>Question {currentQuestionIdx + 1} of {htmlLessons.length}</span>
                <span>{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-[#04AA6D] to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-left">
              <div className="bg-[#16222f] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-[#04AA6D]" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Lesson {currentLesson.id}: {currentLesson.title}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {currentExercise.question}
                </h2>

                {/* Option Buttons */}
                <div className="space-y-3">
                  {(shuffledOptions.length > 0 ? shuffledOptions : currentExercise.options).map((option: string, idx: number) => {
                    const isSelected = selectedOption === option;
                    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                    const letter = optionLetters[idx] || `${idx + 1}`;
                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-200 hover:border-[#04AA6D]/50 hover:bg-slate-850";
                    if (selectedOption !== null) {
                      if (option === currentExercise.correctAnswer) {
                        btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/10";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-950/70 border-rose-500 text-rose-200 font-bold";
                      } else {
                        btnStyle = "bg-slate-900/40 border-slate-850 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={`${option}-${idx}`}
                        onClick={() => handleOptionSelect(option)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-xl border font-mono text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`w-6 h-6 rounded-lg text-xs font-sans font-black flex items-center justify-center shrink-0 border ${
                            selectedOption !== null && option === currentExercise.correctAnswer
                              ? "bg-emerald-500 text-slate-950 border-emerald-400"
                              : selectedOption !== null && isSelected
                              ? "bg-rose-500 text-white border-rose-400"
                              : "bg-slate-800 text-slate-300 border-slate-700"
                          }`}>
                            {letter}
                          </span>
                          <span className="break-words leading-relaxed">{option}</span>
                        </div>
                        {selectedOption !== null && (
                          option === currentExercise.correctAnswer ? (
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                          ) : isSelected ? (
                            <AlertCircle size={18} className="text-rose-400 shrink-0" />
                          ) : null
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback / Explanation Box */}
                {showExplanation && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isCorrect ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-200" : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}>
                    {isCorrect ? (
                      <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 text-xs leading-relaxed space-y-1">
                      <p className="font-bold text-sm">
                        {isCorrect ? "Correct Answer! 🎉" : "Not quite right!"}
                      </p>
                      <p className="text-slate-300">
                        {currentExercise.hint}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </>
        ) : (
          /* Quiz Results Card */
          <div className="p-8 bg-[#1d2a35] border border-slate-700/60 rounded-2xl shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#04AA6D]/20 border border-[#04AA6D]/40 text-[#04AA6D] flex items-center justify-center mx-auto text-3xl">
              🏆
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
              <p className="text-sm text-slate-300 mt-1">Great job testing your HTML knowledge across all lessons.</p>
            </div>

            <div className="p-6 bg-[#15202b] rounded-xl border border-slate-800 max-w-sm mx-auto space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Final Score</span>
              <span className="text-4xl font-black text-[#04AA6D]">{score} / {htmlLessons.length}</span>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round((score / htmlLessons.length) * 100)}% Accuracy
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-700"
              >
                <RotateCcw size={16} />
                <span>Restart Quiz</span>
              </button>
              <Link
                href="/html"
                className="px-6 py-3 bg-[#04AA6D] hover:bg-[#039861] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Back to Tutorials »</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
