import React from 'react';
import { uniqueFeatures, careerOutcomes } from '../data/courseData';

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-4">
      
      {/* Our Mission */}
      <div className="bg-[#f8f9fa] dark:bg-slate-900 border border-[#e0e0e0] dark:border-slate-700 rounded-lg p-5 shadow-sm">
        <h3 className="flex items-center text-[#2980b9] font-bold text-lg mb-2">
          <span className="mr-2">🎯</span> OUR MISSION
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          To transform IGNOU BCA students into skilled professionals through practical training, real-world projects and placement focused preparation.
        </p>
      </div>

      {/* What Makes JBRS Unique */}
      <div className="bg-white dark:bg-slate-800 border border-[#e0e0e0] dark:border-slate-700 rounded-lg p-5 shadow-sm">
        <h3 className="flex items-center text-[#2980b9] font-bold text-lg mb-3">
          <span className="mr-2 text-xl">✨</span> WHAT MAKES JBRS UNIQUE?
        </h3>
        <ul className="space-y-2">
          {uniqueFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2 font-bold">✔</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Who Can Join */}
      <div className="bg-white dark:bg-slate-800 border border-[#e0e0e0] dark:border-slate-700 rounded-lg p-5 shadow-sm">
        <h3 className="flex items-center text-[#2980b9] font-bold text-lg mb-2">
          <span className="mr-2 text-xl">👥</span> WHO CAN JOIN?
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          IGNOU BCA Students, Beginners, Career Changers, Self Learners
        </p>
      </div>

      {/* Learning Path At A Glance */}
      <div className="bg-[#f8f9fa] dark:bg-slate-900 border border-[#e0e0e0] dark:border-slate-700 rounded-lg p-5 shadow-sm relative overflow-hidden">
        <h3 className="flex items-center text-[#2980b9] font-bold text-lg mb-4">
          <span className="mr-2">📈</span> LEARNING PATH AT A GLANCE
        </h3>
        <div className="relative h-24 w-full flex items-center justify-center bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
          {/* Simple stylized SVG for the roadmap */}
          <svg viewBox="0 0 200 80" className="w-full h-full opacity-80" preserveAspectRatio="none">
            <path d="M 10,40 C 30,10 60,70 100,40 C 140,10 170,70 190,40" fill="transparent" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            <circle cx="10" cy="40" r="5" fill="#e74c3c" />
            <circle cx="50" cy="30" r="4" fill="#2980b9" />
            <circle cx="100" cy="40" r="4" fill="#1abc9c" />
            <circle cx="150" cy="50" r="4" fill="#f39c12" />
            <circle cx="190" cy="40" r="5" fill="#27ae60" />
          </svg>
          <div className="absolute top-2 left-2 text-[8px] font-bold text-gray-600 dark:text-gray-400">Start Here</div>
          <div className="absolute bottom-2 right-2 text-[8px] font-bold text-gray-600 dark:text-gray-400">Placement Ready</div>
        </div>
      </div>

      {/* Career Outcomes */}
      <div className="bg-white dark:bg-slate-800 border border-[#e0e0e0] dark:border-slate-700 rounded-lg p-5 shadow-sm">
        <h3 className="flex items-center text-[#e74c3c] justify-center font-bold text-lg mb-4">
          <span className="mr-2">🎯</span> CAREER OUTCOMES
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">💻</span>
            <span className="text-[10px] font-bold leading-tight">Frontend<br/>Developer</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🌐</span>
            <span className="text-[10px] font-bold leading-tight">Web<br/>Developer</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🎨</span>
            <span className="text-[10px] font-bold leading-tight">UI<br/>Developer</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">⚙️</span>
            <span className="text-[10px] font-bold leading-tight">Full Stack<br/>Developer</span>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4 font-medium">
          and many more opportunities in the IT industry
        </p>
      </div>

    </aside>
  );
};

export default Sidebar;
