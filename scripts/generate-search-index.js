const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const ts = require('typescript');
const vm = require('vm');

const CONTENT_DIR = path.join(__dirname, '../src/content');
const OUTPUT_FILE = path.join(__dirname, '../src/data/searchIndex.json');

function loadTsModule(relPath) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return {};
  try {
    const tsCode = fs.readFileSync(fullPath, 'utf8');
    const jsCode = ts.transpile(tsCode);
    const sandbox = { exports: {}, require };
    vm.runInNewContext(jsCode, sandbox);
    return sandbox.exports;
  } catch (err) {
    console.warn(`Failed to transpile ${relPath}:`, err.message);
    return {};
  }
}

const PHASE_METADATA = {
  // Phase CLI (Windows 11 CLI)
  'p0-2-terminal': { phase: 'CLI.0', duration: '5 mins read', color: 'bg-[#1f1f1f]', icon: '💻' },
  'cli-ch1-basics': { phase: 'CLI.1', duration: '5 mins read', color: 'bg-[#1f1f1f]', icon: '🖥️' },
  'cli-ch2-drives': { phase: 'CLI.2', duration: '3 mins read', color: 'bg-[#1f1f1f]', icon: '💾' },
  'cli-ch3-prompt': { phase: 'CLI.3', duration: '3 mins read', color: 'bg-[#1f1f1f]', icon: '⚡' },
  'cli-ch4-directories': { phase: 'CLI.4', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '📂' },
  'cli-ch5-attributes': { phase: 'CLI.5', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '🔒' },
  'cli-ch6-redirection': { phase: 'CLI.6', duration: '5 mins read', color: 'bg-[#1f1f1f]', icon: '🔍' },
  'cli-ch7-operations': { phase: 'CLI.7', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '📑' },
  'cli-ch8-networking': { phase: 'CLI.8', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '🌐' },
  'cli-ch9-disk': { phase: 'CLI.9', duration: '4 mins read', color: 'bg-[#1f1f1f]', icon: '💿' },
  'cli-ch10-shares': { phase: 'CLI.10', duration: '4 mins read', color: 'bg-[#1f1f1f]', icon: '🔗' },
  'cli-ch11-users': { phase: 'CLI.11', duration: '4 mins read', color: 'bg-[#1f1f1f]', icon: '👥' },
  'cli-ch12-remote': { phase: 'CLI.12', duration: '5 mins read', color: 'bg-[#1f1f1f]', icon: '📶' },
  'cli-ch13-batch': { phase: 'CLI.13', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '📄' },
  'cli-ch14-tasks': { phase: 'CLI.14', duration: '6 mins read', color: 'bg-[#1f1f1f]', icon: '⚙️' },
  // Phase 0
  'p0-setup': { phase: 'P0.0', duration: '5 mins read', color: 'bg-[#5b2c6f]', icon: '📖' },
  'p0-1-setup': { phase: 'P0.1', duration: '5 mins read', color: 'bg-[#5b2c6f]', icon: '📥' },
  'p0-3-vscode': { phase: 'P0.2', duration: '8 mins read', color: 'bg-[#5b2c6f]', icon: '⚡' },
  'p0-4-git': { phase: 'P0.3', duration: '10 mins read', color: 'bg-[#5b2c6f]', icon: '🌿' },
  'p0-5-devtools': { phase: 'P0.4', duration: '8 mins read', color: 'bg-[#5b2c6f]', icon: '🔍' },
  // Phase 1
  'p1-1-intro-and-text': { phase: 'P1.1', duration: '8 mins read', color: 'bg-[#2980b9]', icon: '📄' },
  'p1-2-links-and-media': { phase: 'P1.2', duration: '9 mins read', color: 'bg-[#2980b9]', icon: '🔗' },
  'p1-3-lists-and-tables': { phase: 'P1.3', duration: '9 mins read', color: 'bg-[#2980b9]', icon: '📊' },
  'p1-4-forms-and-inputs': { phase: 'P1.4', duration: '12 mins read', color: 'bg-[#2980b9]', icon: '📝' },
  'p1-5-semantics-and-seo': { phase: 'P1.5', duration: '11 mins read', color: 'bg-[#2980b9]', icon: '🎯' },
  'p1-6-html5-tags': { phase: 'P1.6', duration: '15 mins read', color: 'bg-[#2980b9]', icon: '📚' },
  // Phase 2
  'p2-1-selectors': { phase: 'P2.1', duration: '10 mins read', color: 'bg-[#1abc9c]', icon: '🎨' },
  'p2-2-colors': { phase: 'P2.2', duration: '9 mins read', color: 'bg-[#1abc9c]', icon: '🌈' },
  'p2-3-box-model': { phase: 'P2.3', duration: '12 mins read', color: 'bg-[#1abc9c]', icon: '📦' },
  'p2-4-positioning': { phase: 'P2.4', duration: '11 mins read', color: 'bg-[#1abc9c]', icon: '📍' },
  'p2-5-flexbox': { phase: 'P2.5', duration: '13 mins read', color: 'bg-[#1abc9c]', icon: '🍱' },
  'p2-6-grid': { phase: 'P2.6', duration: '14 mins read', color: 'bg-[#1abc9c]', icon: '🕸️' },
  'p2-7-transitions': { phase: 'P2.7', duration: '10 mins read', color: 'bg-[#1abc9c]', icon: '🎬' },
  'p2-8-variables-themes': { phase: 'P2.8', duration: '12 mins read', color: 'bg-[#1abc9c]', icon: '🌓' },
  // Phase 3
  'p3-1-basics': { phase: 'P3.1', duration: '12 mins read', color: 'bg-[#f39c12]', icon: '🔢' },
  'p3-2-control-flow': { phase: 'P3.2', duration: '14 mins read', color: 'bg-[#f39c12]', icon: '🔄' },
  'p3-3-functions': { phase: 'P3.3', duration: '15 mins read', color: 'bg-[#f39c12]', icon: '🛠️' },
  'p3-4-arrays': { phase: 'P3.4', duration: '12 mins read', color: 'bg-[#f39c12]', icon: '🧺' },
  'p3-5-array-iterators': { phase: 'P3.5', duration: '15 mins read', color: 'bg-[#f39c12]', icon: '🗺️' },
  'p3-6-objects': { phase: 'P3.6', duration: '13 mins read', color: 'bg-[#f39c12]', icon: '📦' },
  'p3-7-dom-selection': { phase: 'P3.7', duration: '11 mins read', color: 'bg-[#f39c12]', icon: '🎯' },
  'p3-8-dom-manipulation': { phase: 'P3.8', duration: '13 mins read', color: 'bg-[#f39c12]', icon: '✏️' },
  'p3-9-events': { phase: 'P3.9', duration: '14 mins read', color: 'bg-[#f39c12]', icon: '🖱️' },
  'p3-10-storages': { phase: 'P3.10', duration: '12 mins read', color: 'bg-[#f39c12]', icon: '💾' },
  // Phase 4
  'p4-1-jsx': { phase: 'P4.1', duration: '12 mins read', color: 'bg-[#e74c3c]', icon: '⚛️' },
  'p4-2-components': { phase: 'P4.2', duration: '13 mins read', color: 'bg-[#e74c3c]', icon: '🧩' },
  'p4-3-props': { phase: 'P4.3', duration: '10 mins read', color: 'bg-[#e74c3c]', icon: '📥' },
  'p4-4-state': { phase: 'P4.4', duration: '15 mins read', color: 'bg-[#e74c3c]', icon: '🧠' },
  'p4-5-lifecycle': { phase: 'P4.5', duration: '16 mins read', color: 'bg-[#e74c3c]', icon: '🔄' },
  'p4-6-refs': { phase: 'P4.6', duration: '11 mins read', color: 'bg-[#e74c3c]', icon: '🔑' },
  'p4-7-routing': { phase: 'P4.7', duration: '14 mins read', color: 'bg-[#e74c3c]', icon: '🧭' },
  'p4-8-context': { phase: 'P4.8', duration: '15 mins read', color: 'bg-[#e74c3c]', icon: '🌐' },
  // Phase 5
  'p5-1-node': { phase: 'P5.1', duration: '13 mins read', color: 'bg-[#27ae60]', icon: '🟢' },
  'p5-2-rest-apis': { phase: 'P5.2', duration: '15 mins read', color: 'bg-[#27ae60]', icon: '📡' },
  'p5-3-mongodb': { phase: 'P5.3', duration: '16 mins read', color: 'bg-[#27ae60]', icon: '🍃' },
  'p5-4-deployment': { phase: 'P5.4', duration: '14 mins read', color: 'bg-[#27ae60]', icon: '☁️' },
  // Phase 6
  'p6-1-portfolio': { phase: 'P6.1', duration: '15 mins read', color: 'bg-[#2c3e50]', icon: '👤' },
  'p6-2-dashboard': { phase: 'P6.2', duration: '18 mins read', color: 'bg-[#2c3e50]', icon: '📊' },
  'p6-3-ecommerce': { phase: 'P6.3', duration: '22 mins read', color: 'bg-[#2c3e50]', icon: '🛒' },
  'p6-4-chat': { phase: 'P6.4', duration: '20 mins read', color: 'bg-[#2c3e50]', icon: '💬' },
  // Phase 7
  'p7-1-interview': { phase: 'P7.1', duration: '18 mins read', color: 'bg-[#34495e]', icon: '🗣️' },
  'p7-2-resume': { phase: 'P7.2', duration: '12 mins read', color: 'bg-[#34495e]', icon: '📄' },
  'p7-3-github': { phase: 'P7.3', duration: '13 mins read', color: 'bg-[#34495e]', icon: '🐙' },
  'p7-4-hiring': { phase: 'P7.4', duration: '15 mins read', color: 'bg-[#34495e]', icon: '💼' }
};

function generateIndex() {
  console.log('Generating comprehensive platform-wide search index...');
  const searchIndex = [];

  // 1. Index MDX Book Chapters
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));
    for (const file of files) {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const id = file.replace('.mdx', '');
      const meta = PHASE_METADATA[id] || { phase: 'CLI.0', duration: '5 mins read', color: 'bg-slate-600', icon: '📖' };
      const cleanContent = content.replace(/#+\s+/g, '').replace(/```[a-z]*/g, '').trim();

      searchIndex.push({
        id,
        title: data.title || id.replace(/-/g, ' '),
        content: cleanContent,
        phase: meta.phase,
        duration: meta.duration,
        color: meta.color,
        icon: meta.icon,
        url: `/book/${id}`,
        category: 'Full-Stack Developer Course'
      });
    }
  }

  // 2. Index HTML5 Course Lessons
  const htmlData = loadTsModule('src/data/htmlLessonsData.ts');
  if (htmlData.htmlLessons && Array.isArray(htmlData.htmlLessons)) {
    for (const lesson of htmlData.htmlLessons) {
      const proText = lesson.english?.pro || lesson.english?.kid || '';
      const exQuestion = lesson.exercise?.english?.question || '';
      const summary = `${lesson.unit}. ${proText} ${exQuestion}`.trim();
      searchIndex.push({
        id: `html-${lesson.slug}`,
        title: lesson.title,
        content: summary,
        phase: 'HTML5',
        duration: '5 mins read',
        color: 'bg-[#04AA6D]',
        icon: '🌐',
        url: `/html/${lesson.slug}`,
        category: 'HTML5 Mastery'
      });
    }
  }

  // 3. Index Windows CLI Lessons
  const cliData = loadTsModule('src/data/cliLessonsData.ts');
  if (cliData.cliLessons && Array.isArray(cliData.cliLessons)) {
    for (const lesson of cliData.cliLessons) {
      const proText = lesson.english?.pro || lesson.english?.kid || '';
      const summary = `${lesson.unit}. ${proText}`.trim();
      searchIndex.push({
        id: `cli-${lesson.slug}`,
        title: lesson.title,
        content: summary,
        phase: 'Windows CLI',
        duration: '5 mins read',
        color: 'bg-[#1f1f1f]',
        icon: lesson.icon || '💻',
        url: `/cli/${lesson.slug}`,
        category: 'Windows Command Prompt'
      });
    }
  }

  // 4. Index MS Word Lessons
  const mswordData = loadTsModule('src/data/mswordLessonsData.ts');
  if (mswordData.mswordLessons && Array.isArray(mswordData.mswordLessons)) {
    for (const lesson of mswordData.mswordLessons) {
      const proText = lesson.english?.pro || lesson.english?.kid || '';
      const summary = `${lesson.unit}. ${proText}`.trim();
      searchIndex.push({
        id: `msword-${lesson.slug}`,
        title: lesson.title,
        content: summary,
        phase: 'MS Word 365',
        duration: '5 mins read',
        color: 'bg-[#2b579a]',
        icon: '📄',
        url: `/msword/${lesson.slug}`,
        category: 'MS Word Career Skills'
      });
    }
  }

  // 5. Index IGNOU BCA Semester Courses & Units
  const bcaData = loadTsModule('src/data/bcaCoursesData.ts');
  if (bcaData.bcaSemesters && Array.isArray(bcaData.bcaSemesters)) {
    for (const sem of bcaData.bcaSemesters) {
      for (const subject of sem.subjects || []) {
        const isComputerBasics = subject.code === "BCS-111" || subject.code === "BCS-011";
        const subjectUrl = sem.id === 1
          ? (isComputerBasics 
              ? "/bca/semester-1/bcs-011-computer-basics" 
              : subject.code === "BCS-012"
              ? "/bca/semester-1/bcs-012-basic-mathematics"
              : subject.code === "BCSL-013"
              ? "/bca/semester-1/bcsl-013-software-lab"
              : subject.code === "BEGLA-136"
              ? "/bca/semester-1/begla-136-english"
              : subject.code === "BEVAE-181"
              ? "/bca/semester-1/bevae-181-environmental-studies"
              : `/bca/semester-1/${subject.code.toLowerCase()}`)
          : `/bca/${sem.id}/${subject.code.toLowerCase()}`;

        // Add Subject Dedicated Overview Entry
        searchIndex.push({
          id: `bca-subject-${subject.code.toLowerCase()}`,
          title: `${subject.code}: ${subject.name}`,
          content: `IGNOU BCA Semester ${sem.id} • ${subject.code} ${subject.name}. Complete syllabus blocks, unit-by-unit study notes, and PDF textbooks.`,
          phase: `BCA Sem ${sem.id}`,
          duration: `${subject.blocks?.length || 0} Blocks`,
          color: 'bg-[#0c1328]',
          icon: '📘',
          url: subjectUrl,
          category: 'IGNOU BCA Subjects'
        });

        for (const block of subject.blocks || []) {
          for (const unit of block.units || []) {
            const cleanUnitName = unit.fileName.replace(/\.pdf$/i, '');
            const unitSlug = isComputerBasics && (cleanUnitName.toLowerCase() === 'unit-1' || cleanUnitName.toLowerCase() === 'unit 1')
              ? '/bca/semester-1/bcs-011-computer-basics/unit-1/lessons'
              : subjectUrl;

            searchIndex.push({
              id: `bca-sem${sem.id}-${subject.code.toLowerCase()}-${cleanUnitName.toLowerCase()}`,
              title: `${subject.code}: ${unit.displayName}`,
              content: `${subject.name} • ${block.name} • ${unit.displayName}. IGNOU BCA Semester ${sem.id} study notes, syllabus units, and solved textbook lessons.`,
              phase: `BCA Sem ${sem.id}`,
              duration: '10 mins read',
              color: 'bg-[#0c1328]',
              icon: '🎓',
              url: unitSlug,
              category: 'IGNOU BCA'
            });
          }
        }
      }
    }
  }

  // 6. Index HTML Tag Directory Reference
  const tagsData = loadTsModule('src/data/allHtmlTagsData.ts');
  if (tagsData.ALL_HTML_TAGS && Array.isArray(tagsData.ALL_HTML_TAGS)) {
    for (const tag of tagsData.ALL_HTML_TAGS) {
      const tagName = tag.tag.replace(/[<>]/g, '');
      searchIndex.push({
        id: `tag-${tagName}`,
        title: `<${tagName}> HTML Tag Reference`,
        content: `${tag.category} • ${tag.description}. Example: ${tag.example || ''}`,
        phase: 'HTML Tag',
        duration: 'Quick Ref',
        color: 'bg-[#c1a648]',
        icon: '🏷️',
        url: '/html-tags',
        category: 'HTML5 Tag Directory'
      });
    }
  }

  // Create output parent folder if it doesn't exist
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndex, null, 2), 'utf8');
    console.log(`✅ Successfully generated unified search index with ${searchIndex.length} items at ${OUTPUT_FILE}`);
  } catch (err) {
    const os = require('os');
    const tempFile = path.join(os.tmpdir(), 'searchIndex.json');
    fs.writeFileSync(tempFile, JSON.stringify(searchIndex, null, 2), 'utf8');
    console.log(`✅ Windows Protected Folder detected. Search index saved to: ${tempFile}`);
  }
}

generateIndex();
