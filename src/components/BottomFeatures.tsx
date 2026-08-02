import React from 'react';
import { techStack, projectsList } from '../data/courseData';

interface BottomFeaturesProps {
  part: 1 | 2;
}

const BottomFeatures: React.FC<BottomFeaturesProps> = ({ part }) => {
  if (part === 1) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Tools & Technologies */}
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-transform hover:-translate-y-1">
          <h3 className="flex items-center text-blue-600 dark:text-blue-400 font-black text-2xl mb-6 uppercase tracking-wider">
            <span className="mr-3 text-3xl drop-shadow-md">🛠️</span> Tools & Tech
          </h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/40 dark:border-slate-600/40 hover:scale-105 transition-transform shadow-sm">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects You Will Build */}
        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-transform hover:-translate-y-1">
          <h3 className="flex items-center text-blue-600 dark:text-blue-400 font-black text-2xl mb-6 uppercase tracking-wider">
            <span className="mr-3 text-3xl drop-shadow-md">📄</span> Real Projects
          </h3>
          <ul className="space-y-4">
            {projectsList.map((project, i) => (
              <li key={i} className="flex items-start text-base font-bold text-slate-700 dark:text-slate-300">
                <span className="text-blue-500 mr-3 opacity-80 text-lg">▹</span> {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
      {/* Learning Features */}
      <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-transform hover:-translate-y-1">
        <h3 className="flex items-center text-blue-600 dark:text-blue-400 font-black text-2xl mb-6 uppercase tracking-wider">
          <span className="mr-3 text-3xl drop-shadow-md">📚</span> Features
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center text-base font-bold text-slate-700 dark:text-slate-300"><span className="mr-3 text-2xl opacity-90">💡</span> Concept + Practical</li>
          <li className="flex items-center text-base font-bold text-slate-700 dark:text-slate-300"><span className="mr-3 text-2xl opacity-90">✨</span> Best Practices</li>
          <li className="flex items-center text-base font-bold text-slate-700 dark:text-slate-300"><span className="mr-3 text-2xl opacity-90">⚠️</span> Common Mistakes</li>
          <li className="flex items-center text-base font-bold text-slate-700 dark:text-slate-300"><span className="mr-3 text-2xl opacity-90">🎯</span> Interview Tips</li>
          <li className="flex items-center text-base font-bold text-slate-700 dark:text-slate-300"><span className="mr-3 text-2xl opacity-90">📝</span> MCQs & Quizzes</li>
        </ul>
      </div>

      {/* Success Formula */}
      <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col justify-center transition-transform hover:-translate-y-1">
        <h3 className="flex items-center justify-center text-green-600 dark:text-green-400 font-black text-2xl mb-8 uppercase tracking-wider">
          <span className="mr-2 drop-shadow-md">✓</span> Success Formula
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center p-3"><span className="text-3xl mb-2">⏱️</span><span className="text-xs uppercase font-black text-slate-500 dark:text-slate-400">Consistency</span></div>
          <span className="text-slate-300 dark:text-slate-600 font-light text-xl">+</span>
          <div className="flex flex-col items-center p-3"><span className="text-3xl mb-2">🚀</span><span className="text-xs uppercase font-black text-slate-500 dark:text-slate-400">Projects</span></div>
          <span className="text-slate-300 dark:text-slate-600 font-light text-xl">+</span>
          <div className="flex flex-col items-center p-3"><span className="text-3xl mb-2">📁</span><span className="text-xs uppercase font-black text-slate-500 dark:text-slate-400">Portfolio</span></div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
          <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text font-black text-2xl tracking-wide">
            = JOB READY 🏆
          </div>
        </div>
      </div>

    </div>
  );
};

export default BottomFeatures;
