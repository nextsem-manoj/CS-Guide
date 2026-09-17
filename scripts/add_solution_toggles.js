const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/algorithms-and-flowcharts-10-master-problems.html');
let html = fs.readFileSync(filePath, 'utf8');

// Pattern for each article:
// <article id="problem-X" ...>
// ...
// <!-- Problem Statement -->
// <div class="bg-slate-900/70 p-4 rounded-xl border border-slate-800/80">
// ...
// </div>
// [WE INSERT TOGGLE BUTTON HERE AND WRAP THE REST OF THE ARTICLE UNTIL </article> IN <div id="solution-X" class="hidden space-y-6 pt-2">]

for (let i = 1; i <= 10; i++) {
  const articleStartRegex = new RegExp(`(<article id="problem-${i}"[\\s\\S]*?<!-- Problem Statement -->[\\s\\S]*?</div>)([\\s\\S]*?)(</article>)`);
  
  html = html.replace(articleStartRegex, (match, prefix, solutionContent, suffix) => {
    const toggleButton = `
          <!-- Answer Toggle Controller -->
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
            <button onclick="toggleAnswer(${i}, this)" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white font-bold text-xs border border-cyan-500/30 transition flex items-center gap-2 cursor-pointer shadow-sm">
              <span>👁️ View Answer & Solution</span>
            </button>
            <span class="text-[11px] text-slate-400 font-mono">💡 Answer hidden • Solve on your own before checking!</span>
          </div>

          <!-- Solution Container (Hidden by default) -->
          <div id="solution-${i}" class="hidden space-y-6 pt-2">
            ${solutionContent.trim()}
          </div>`;
    
    return `${prefix}\n${toggleButton}\n        ${suffix}`;
  });
}

// Add the JS function for toggleAnswer and Reveal All / Hide All
const scriptTag = `
  <script>
    function toggleAnswer(problemNum, btn) {
      const solution = document.getElementById('solution-' + problemNum);
      if (!solution) return;
      
      const isHidden = solution.classList.contains('hidden');
      if (isHidden) {
        solution.classList.remove('hidden');
        btn.innerHTML = '<span>🙈 Hide Answer</span>';
        btn.classList.replace('text-cyan-300', 'text-amber-300');
        if (window.mermaid) {
          mermaid.run({ nodes: solution.querySelectorAll('.mermaid') });
        }
      } else {
        solution.classList.add('hidden');
        btn.innerHTML = '<span>👁️ View Answer & Solution</span>';
        btn.classList.replace('text-amber-300', 'text-cyan-300');
      }
    }

    function toggleAllAnswers(btn) {
      const allSolutions = document.querySelectorAll('[id^="solution-"]');
      const allButtons = document.querySelectorAll('button[onclick^="toggleAnswer"]');
      const shouldReveal = btn.dataset.revealed !== 'true';

      allSolutions.forEach((sol, idx) => {
        if (shouldReveal) {
          sol.classList.remove('hidden');
          if (allButtons[idx]) {
            allButtons[idx].innerHTML = '<span>🙈 Hide Answer</span>';
            allButtons[idx].classList.replace('text-cyan-300', 'text-amber-300');
          }
        } else {
          sol.classList.add('hidden');
          if (allButtons[idx]) {
            allButtons[idx].innerHTML = '<span>👁️ View Answer & Solution</span>';
            allButtons[idx].classList.replace('text-amber-300', 'text-cyan-300');
          }
        }
      });

      if (shouldReveal) {
        btn.dataset.revealed = 'true';
        btn.innerHTML = '<span>🙈 Hide All Answers</span>';
        if (window.mermaid) {
          mermaid.run();
        }
      } else {
        btn.dataset.revealed = 'false';
        btn.innerHTML = '<span>👁️ Reveal All Answers</span>';
      }
    }
  </script>
</body>`;

html = html.replace('</body>', scriptTag);

// Also add "Reveal All Answers" button in top navigation next to Print button
const navButtonToReplace = `<button onclick="window.print()"`;
const newNavButtons = `<button onclick="toggleAllAnswers(this)" class="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer">
          <span>👁️ Reveal All Answers</span>
        </button>
        <button onclick="window.print()"`;

html = html.replace(navButtonToReplace, newNavButtons);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated algorithms-and-flowcharts-10-master-problems.html with answer toggles!');
