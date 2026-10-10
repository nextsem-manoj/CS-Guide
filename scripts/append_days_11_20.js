const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'bcaPracticalData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const days11to20 = `  /* ── DAY 11 ── */
  {
    id: 'day-11',
    day: 11,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Box Model: Margin, Border, Padding & Content',
    slug: 'day-11-css-box-model-margin-border-padding-content',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Understand the 4 layers of the CSS Box Model: Content, Padding, Border, Margin.',
      'Differentiate between \`box-sizing: content-box\` and \`box-sizing: border-box\`.',
      'Understand margin collapse behavior on vertical adjacent blocks.',
      'Apply universal box-sizing reset \`* { box-sizing: border-box; }\` across all projects.'
    ],
    concept: {
      overview: 'Every visible element in the browser viewport is a rectangular box. The Box Model dictates how width, padding, borders, and margins calculate final rendered dimensions on screen.',
      keyPoints: [
        'Content: The raw text, image, or video nested inside the element.',
        'Padding: Clears space INSIDE the border, around the content. Inherits background color.',
        'Border: The boundary line encasing the padding and content.',
        'Margin: Clears space OUTSIDE the border, separating the element from neighboring elements.',
        'box-sizing: border-box ensures padding and borders DO NOT expand the total element width.'
      ],
      analogy: 'Think of a picture frame: The photo is Content, the white cardboard matting is Padding, the wooden frame is Border, and the wall space between adjacent frames is Margin.'
    },
    teacherDemo: {
      title: 'Comparing content-box vs border-box',
      explanation: 'Notice how border-box keeps the element width exactly 300px without spilling over.',
      language: 'html',
      code: \`<style>
  .box-standard {
    width: 300px;
    padding: 24px;
    border: 4px solid #2563eb;
    margin-bottom: 20px;
    box-sizing: border-box;
    background: #f8fafc;
  }
</style>
<div class="box-standard">
  <h3>Card with border-box</h3>
  <p>Total width stays exactly 300px on screen.</p>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 11 Coding Lab: Precision Box Model Card',
      labDescription: 'Configure a card with 20px padding, a 2px solid border, 16px bottom margin, and border-box sizing.',
      language: 'html',
      initialCode: \`<style>
  .profile-card {
    width: 280px;
    /* Add padding, border, margin, and box-sizing below */
    background: #ffffff;
  }
</style>
<div class="profile-card">
  <h2>Er. Manoj Kumar</h2>
  <p>BCA Curriculum Architect & Software Engineer</p>
</div>\`,
      tasks: [
        {
          id: 'd11-t1',
          title: 'Add Padding and Border-Box',
          instruction: 'Add \`padding: 20px;\` and \`box-sizing: border-box;\` to .profile-card.',
          hint: 'Include padding: 20px; box-sizing: border-box; inside the .profile-card CSS rule.',
          validatorKeywords: ['padding:', 'box-sizing:', 'border-box'],
          validatorRegex: 'padding:\\s*20px[\\s\\S]*?box-sizing:\\s*border-box'
        },
        {
          id: 'd11-t2',
          title: 'Add Border and Margin',
          instruction: 'Add a \`border: 2px solid #2563eb;\` and \`margin-bottom: 16px;\`.',
          hint: 'Write border: 2px solid #2563eb; and margin-bottom: 16px;.',
          validatorKeywords: ['border:', 'margin-bottom:'],
          validatorRegex: 'border:\\s*2px\\s+solid[\\s\\S]*?margin-bottom:\\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Card Overflowing Container Due to content-box',
      buggyCode: \`.container {
  width: 500px;
}
.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  /* Missing box-sizing causes total width to become 570px! */
}\`,
      bugExplanation: 'With default content-box, total width = 500 + 30*2 (padding) + 5*2 (border) = 570px, which breaks and overflows the 500px container!',
      fixedCode: \`.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  box-sizing: border-box; /* Total width is clamped strictly to 500px */
}\`
    },
    assignment: {
      title: 'Homework Task: Notification Alert Cards',
      instructions: [
        'Create a folder named \`day-11\` in your repository.',
        'Create an \`index.html\` file and define a universal reset \`* { box-sizing: border-box; margin: 0; padding: 0; }\`.',
        'Build 3 alert cards: Success (green border), Warning (amber border), and Error (rose border).',
        'Give each card \`padding: 18px;\`, \`margin: 12px 0;\`, and a rounded border of \`border-radius: 12px;\`.'
      ],
      submissionCriteria: 'Inspect elements in Chrome DevTools Box Model visualizer to verify margin, border, padding.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 11: CSS Box Model, border-box dimensions and margin spacing',
      commands: [
        'mkdir day-11',
        'cd day-11',
        'git add .',
        'git commit -m "Day 11: CSS Box Model, border-box dimensions and margin spacing"',
        'git push origin main'
      ],
      tips: 'Always use border-box in modern frontend web development to eliminate accidental overflow horizontal scrollbars.'
    },
    vivaCheck: {
      question: 'What is the default value of the CSS \`box-sizing\` property if unspecified?',
      options: [
        'border-box',
        'content-box',
        'padding-box',
        'margin-box'
      ],
      correctAnswer: 1,
      explanation: 'The browser default is content-box, where padding and borders add onto the specified width/height rather than being absorbed inside it.'
    }
  },

  /* ── DAY 12 ── */
  {
    id: 'day-12',
    day: 12,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Display Property: Block, Inline, Inline-Block & None',
    slug: 'day-12-css-display-block-inline-inline-block-none',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Beginner',
    objectives: [
      'Master block-level vs inline-level element behavior in normal document flow.',
      'Understand why inline elements ignore top/bottom margin and explicit height/width.',
      'Use \`inline-block\` to create multi-item button bars and inline tags.',
      'Contrast \`display: none\` (removes element from layout flow) vs \`visibility: hidden\` (leaves invisible blank space).'
    ],
    concept: {
      overview: 'The \`display\` property is the fundamental switch controlling how an element participates in CSS formatting contexts.',
      keyPoints: [
        'block: Starts on a new line and stretches across full available container width (e.g. <div>, <h1>, <p>).',
        'inline: Does not start on a new line; only occupies space needed for its content. Width and height properties have NO effect.',
        'inline-block: Sits in a line with surrounding text, but respects width, height, padding, and vertical margins.',
        'display: none completely removes the element from rendering tree (zero layout footprint).'
      ],
      analogy: 'Block is like a full-width parking spot for a bus. Inline is like words flowing on a typed line. Inline-block is like a picture stamp glued right inside a sentence.'
    },
    teacherDemo: {
      title: 'Horizontal Button Bar with inline-block',
      explanation: 'Converting list items into interactive inline-block pill buttons.',
      language: 'html',
      code: \`<style>
  .tag-item {
    display: inline-block;
    padding: 8px 16px;
    background: #000000;
    color: #ffffff;
    border-radius: 20px;
    margin-right: 8px;
    font-size: 13px;
    font-weight: bold;
  }
</style>
<span class="tag-item">HTML5</span>
<span class="tag-item">CSS3</span>
<span class="tag-item">JavaScript</span>\`
    },
    practicalLab: {
      labTitle: 'Day 12 Coding Lab: Inline-Block Navigation Buttons',
      labDescription: 'Transform anchor links into pill buttons by setting display to inline-block with padding and border.',
      language: 'html',
      initialCode: \`<style>
  .btn-link {
    /* Set display to inline-block, add padding and rounded corners */
    text-decoration: none;
    color: #2563eb;
    border: 2px solid #2563eb;
  }
</style>
<nav>
  <a href="#" class="btn-link">Home</a>
  <a href="#" class="btn-link">BCA Portal</a>
  <a href="#" class="btn-link">Practicals</a>
</nav>\`,
      tasks: [
        {
          id: 'd12-t1',
          title: 'Apply display: inline-block',
          instruction: 'Add \`display: inline-block;\` to .btn-link.',
          hint: 'Write display: inline-block; inside .btn-link.',
          validatorKeywords: ['display:', 'inline-block'],
          validatorRegex: 'display:\\s*inline-block'
        },
        {
          id: 'd12-t2',
          title: 'Add Padding and Margin',
          instruction: 'Add \`padding: 8px 18px;\` and \`margin-right: 10px;\`.',
          hint: 'Include padding: 8px 18px; and margin-right: 10px;.',
          validatorKeywords: ['padding:', 'margin-right:'],
          validatorRegex: 'padding:\\s*8px\\s+18px[\\s\\S]*?margin-right:\\s*10px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Width Ignored on Inline Anchor Tag',
      buggyCode: \`a.hero-btn {
  display: inline;
  width: 220px;
  height: 50px;
  padding: 10px;
}\`,
      bugExplanation: 'Elements with \`display: inline\` strictly ignore width and height CSS properties according to the W3C CSS specification.',
      fixedCode: \`a.hero-btn {
  display: inline-block; /* Now width and height are strictly honored */
  width: 220px;
  height: 50px;
  padding: 10px;
}\`
    },
    assignment: {
      title: 'Homework Task: Tech Skill Badge Cloud',
      instructions: [
        'Create folder \`day-12\` with \`index.html\`.',
        'Create a skill cloud section containing 8 developer skill badges (e.g. Linux, Git, HTML, C, Python).',
        'Style each badge with \`display: inline-block\`, distinct background colors, and \`cursor: pointer\`.',
        'Add a secret badge with class \`.hidden-badge\` styled with \`display: none\`.'
      ],
      submissionCriteria: 'Inspect element in browser to verify inline-block layout and absence of DOM reflow issues.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 12: CSS display modes, block vs inline-block and badge cloud',
      commands: [
        'mkdir day-12',
        'cd day-12',
        'git add .',
        'git commit -m "Day 12: CSS display modes, block vs inline-block and badge cloud"',
        'git push origin main'
      ],
      tips: 'Use inline-block when you need buttons to sit side-by-side but retain explicit box padding and height.'
    },
    vivaCheck: {
      question: 'What is the visual difference between \`display: none\` and \`visibility: hidden\`?',
      options: [
        'There is zero difference; they both behave identically.',
        'display: none removes the element completely from page layout, while visibility: hidden hides it visually but still occupies space.',
        'visibility: hidden deletes the element from HTML DOM permanently.',
        'display: none makes the text transparent while keeping borders visible.'
      ],
      correctAnswer: 1,
      explanation: 'display: none causes the browser to not render the element at all, freeing its space. visibility: hidden renders a blank empty space of the exact same size.'
    }
  },

  /* ── DAY 13 ── */
  {
    id: 'day-13',
    day: 13,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Positioning: Static, Relative, Absolute & Fixed',
    slug: 'day-13-css-positioning-static-relative-absolute-fixed',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand normal document flow and default \`position: static\`.',
      'Use \`position: relative\` as an offset reference and coordinate anchor.',
      'Use \`position: absolute\` with top/right/bottom/left to overlay badges and popups.',
      'Use \`position: fixed\` to stick navigation bars or announcement headers to the viewport.'
    ],
    concept: {
      overview: 'CSS Positioning takes elements out of their natural document flow and pins them to coordinate offsets relative to parents, viewports, or ancestor bounds.',
      keyPoints: [
        'static: Default flow. top, right, bottom, left properties have NO effect.',
        'relative: Element is offset relative to its own normal position without disrupting neighboring flow.',
        'absolute: Element is removed from normal flow and positioned relative to its closest non-static ancestor (usually a position: relative parent).',
        'fixed: Element is pinned relative to the browser viewport window and stays fixed during scrolling.',
        'z-index: Controls stacking order on the 3D depth axis (higher number stacks on top).'
      ],
      analogy: 'Relative is like claiming your chair in a room. Absolute is sticking a sticky note on the corner of that chair. Fixed is taping a sticker directly onto the camera lens.'
    },
    teacherDemo: {
      title: 'Card with Floating Top-Right Badge',
      explanation: 'Parent uses position: relative; Badge uses position: absolute.',
      language: 'html',
      code: \`<style>
  .course-card {
    position: relative;
    width: 320px;
    padding: 24px;
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 16px;
  }
  .pro-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #2563eb;
    color: #ffffff;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: bold;
    border-radius: 8px;
  }
</style>
<div class="course-card">
  <span class="pro-badge">FEATURED</span>
  <h3>BCA Practical Lab</h3>
  <p>Hands-on industry coding system.</p>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 13 Coding Lab: Floating Notification Badge Card',
      labDescription: 'Position a "NEW" badge at top: 10px and right: 10px inside a position: relative parent card.',
      language: 'html',
      initialCode: \`<style>
  .card-container {
    /* Set position to relative */
    width: 300px;
    padding: 20px;
    border: 1px solid #cbd5e1;
  }
  .card-badge {
    /* Set position to absolute with top and right coordinates */
    background: #ef4444;
    color: white;
    padding: 3px 8px;
    font-size: 10px;
  }
</style>
<div class="card-container">
  <span class="card-badge">NEW</span>
  <h4>Linux CLI Practical</h4>
  <p>Learn terminal bash commands.</p>
</div>\`,
      tasks: [
        {
          id: 'd13-t1',
          title: 'Anchor Parent with position: relative',
          instruction: 'Add \`position: relative;\` to .card-container.',
          hint: 'Write position: relative; inside .card-container.',
          validatorKeywords: ['position:', 'relative'],
          validatorRegex: 'position:\\s*relative'
        },
        {
          id: 'd13-t2',
          title: 'Float Badge with position: absolute',
          instruction: 'Add \`position: absolute;\`, \`top: 10px;\`, and \`right: 10px;\` to .card-badge.',
          hint: 'Set position: absolute; top: 10px; right: 10px; in .card-badge.',
          validatorKeywords: ['position:', 'absolute', 'top:', 'right:'],
          validatorRegex: 'position:\\s*absolute[\\s\\S]*?top:\\s*10px[\\s\\S]*?right:\\s*10px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Absolute Child Escaping Outside Container',
      buggyCode: \`.card-wrapper {
  /* Missing position: relative on container! */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  /* Button shoots to the top-right corner of the whole screen! */
}\`,
      bugExplanation: 'An absolute child looks for the nearest positioned ancestor. If no parent has position: relative/absolute, it positions relative to the <body> tag!',
      fixedCode: \`.card-wrapper {
  position: relative; /* Now acts as the boundary origin for absolute children */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}\`
    },
    assignment: {
      title: 'Homework Task: Pinned Bottom Notification Bar',
      instructions: [
        'Create folder \`day-13\` with \`index.html\`.',
        'Build a long scrolling page with several dummy paragraphs.',
        'Create a bottom announcement bar styled with \`position: fixed; bottom: 0; left: 0; width: 100%;\`.',
        'Add a high \`z-index: 100\` so it stays floating above all scrolling page content.'
      ],
      submissionCriteria: 'Scroll the webpage in Chrome to verify the bottom bar never moves or disappears.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 13: CSS positioning coordinate systems, absolute badges and fixed bars',
      commands: [
        'mkdir day-13',
        'cd day-13',
        'git add .',
        'git commit -m "Day 13: CSS positioning coordinate systems, absolute badges and fixed bars"',
        'git push origin main'
      ],
      tips: 'Whenever using position: absolute, always double-check that the immediate parent has position: relative.'
    },
    vivaCheck: {
      question: 'Why must a parent container have \`position: relative\` when placing an \`absolute\` child inside it?',
      options: [
        'It triggers hardware GPU animation rendering.',
        'It establishes the parent as the coordinate origin (bounding box) for the absolute child.',
        'It changes the parent background color automatically.',
        'It makes the parent float to the left.'
      ],
      correctAnswer: 1,
      explanation: 'An absolute element calculates its top/right/bottom/left coordinates relative to its nearest positioned ancestor. Giving the parent position: relative locks the coordinate origin to the parent bounds.'
    }
  },

  /* ── DAY 14 ── */
  {
    id: 'day-14',
    day: 14,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Flexbox Architecture 1: Flex Container & Justify-Content',
    slug: 'day-14-flexbox-container-direction-justify-content',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the 1-dimensional Flexible Box (Flexbox) layout model.',
      'Differentiate between the Main Axis and Cross Axis.',
      'Use \`display: flex\` to align elements horizontally with zero float hacks.',
      'Master \`justify-content\` alignment modes: center, space-between, space-around, space-evenly.'
    ],
    concept: {
      overview: 'CSS Flexbox revolutionized web design by providing a predictable, 1-dimensional layout system that automatically distributes space and aligns items along an axis.',
      keyPoints: [
        'display: flex: Applied to the parent container, transforming all direct children into flex items.',
        'flex-direction: Sets the main axis (row is horizontal left-to-right, column is vertical top-to-bottom).',
        'justify-content: Distributes items along the MAIN axis.',
        'justify-content: space-between pushes first item to start, last item to end, and spaces the rest evenly.',
        'gap: Replaces old margin hacks by setting clean gutters between flex children.'
      ],
      analogy: 'Imagine books on a shelf: Flexbox lets you push them to the left, center them, or spread them out with equal breathing room automatically.'
    },
    teacherDemo: {
      title: 'Modern Header Bar with space-between',
      explanation: 'Logo on the left, navigation links on the right, perfectly spaced.',
      language: 'html',
      code: \`<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #000000;
    color: #ffffff;
  }
  .nav-links {
    display: flex;
    gap: 16px;
  }
</style>
<header class="navbar">
  <div class="logo"><strong>NextSem</strong></div>
  <nav class="nav-links">
    <span>Lessons</span>
    <span>Practicals</span>
    <span>Profile</span>
  </nav>
</header>\`
    },
    practicalLab: {
      labTitle: 'Day 14 Coding Lab: Space-Between Flexbox Header',
      labDescription: 'Create a flex container that spaces its logo and navigation links apart using justify-content: space-between and a 20px gap.',
      language: 'html',
      initialCode: \`<style>
  .app-header {
    /* Apply display: flex and justify-content: space-between */
    background: #2563eb;
    color: white;
    padding: 14px 20px;
  }
  .header-actions {
    /* Apply display: flex and gap: 16px */
  }
</style>
<div class="app-header">
  <div class="brand">NextSem BCA</div>
  <div class="header-actions">
    <button>Home</button>
    <button>Profile</button>
  </div>
</div>\`,
      tasks: [
        {
          id: 'd14-t1',
          title: 'Activate Flexbox on Header',
          instruction: 'Add \`display: flex;\` and \`justify-content: space-between;\` to .app-header.',
          hint: 'Write display: flex; justify-content: space-between; in .app-header.',
          validatorKeywords: ['display:', 'flex', 'justify-content:', 'space-between'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?justify-content:\\s*space-between'
        },
        {
          id: 'd14-t2',
          title: 'Add Flex Gap to Actions',
          instruction: 'Add \`display: flex;\` and \`gap: 16px;\` to .header-actions.',
          hint: 'Write display: flex; gap: 16px; inside .header-actions.',
          validatorKeywords: ['display:', 'gap:', '16px'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?gap:\\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: justify-content Applied to Children Instead of Container',
      buggyCode: \`<div class="header">
  <div class="logo" style="justify-content: space-between;">Logo</div>
  <div class="nav">Links</div>
</div>\`,
      bugExplanation: '\`justify-content\` is a FLEX CONTAINER property. It must be applied to the parent element (.header), not to an individual child item.',
      fixedCode: \`.header {
  display: flex;
  justify-content: space-between; /* Properly placed on parent flex container */
}\`
    },
    assignment: {
      title: 'Homework Task: Social Media Share Toolbar',
      instructions: [
        'Create folder \`day-14\` with \`index.html\`.',
        'Create a toolbar containing 4 buttons (WhatsApp, LinkedIn, GitHub, Copy Link).',
        'Use \`display: flex; justify-content: center; gap: 12px;\` to center all buttons perfectly.',
        'Add hover background color changes to each button.'
      ],
      submissionCriteria: 'Inspect in Chrome DevTools to ensure gap spacing is active and zero margin hacks are used.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 14: Flexbox main axis alignment, space-between navbars and gap property',
      commands: [
        'mkdir day-14',
        'cd day-14',
        'git add .',
        'git commit -m "Day 14: Flexbox main axis alignment, space-between navbars and gap property"',
        'git push origin main'
      ],
      tips: 'Never use float: left or inline-block margins for navbars when Flexbox justify-content: space-between exists.'
    },
    vivaCheck: {
      question: 'What is the default direction of the main axis in a CSS Flexbox container?',
      options: [
        'column (vertical)',
        'row (horizontal left-to-right)',
        'row-reverse',
        'diagonal'
      ],
      correctAnswer: 1,
      explanation: 'The initial default value of flex-direction is row, meaning items are arranged horizontally from left to right along the main axis.'
    }
  },

  /* ── DAY 15 ── */
  {
    id: 'day-15',
    day: 15,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Flexbox Architecture 2: Align-Items, Flex-Wrap & Responsive Cards',
    slug: 'day-15-flexbox-align-items-flex-wrap-responsive-cards',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master cross-axis vertical alignment with \`align-items: center | stretch | flex-start\`.',
      'Use \`flex-wrap: wrap\` so multi-card layouts wrap gracefully without horizontal squishing.',
      'Understand flex item sizing with \`flex: 1\` and \`flex-basis\`.',
      'Build a multi-card responsive grid using pure Flexbox.'
    ],
    concept: {
      overview: 'While justify-content aligns items horizontally, \`align-items\` aligns them vertically along the cross axis, and \`flex-wrap\` allows items to drop down to new lines when container space runs out.',
      keyPoints: [
        'align-items: Controls item alignment across the CROSS axis (perpendicular to main axis).',
        'align-items: center centers elements vertically inside the container.',
        'flex-wrap: nowrap is default (forces all items onto a single cramped line).',
        'flex-wrap: wrap lets items wrap into multiple rows naturally.',
        'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% (absorbs equal leftover space).'
      ],
      analogy: 'Imagine words wrapping in a paragraph when you hit the right margin of a page. flex-wrap: wrap does that for cards!'
    },
    teacherDemo: {
      title: 'Responsive Flex Card Grid with Wrapping',
      explanation: 'Cards expand equally with flex: 1 and wrap onto new lines on smaller screens.',
      language: 'html',
      code: \`<style>
  .card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: stretch;
  }
  .card {
    flex: 1 1 250px; /* grow, shrink, min-width 250px */
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
  }
</style>
<div class="card-grid">
  <div class="card"><h3>Feature 1</h3><p>Fast coding compiler.</p></div>
  <div class="card"><h3>Feature 2</h3><p>Live GitHub grading.</p></div>
  <div class="card"><h3>Feature 3</h3><p>Oral viva simulator.</p></div>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 15 Coding Lab: Centered Feature Cards with Wrap',
      labDescription: 'Create a flex card container with flex-wrap: wrap, align-items: center, and 16px gap.',
      language: 'html',
      initialCode: \`<style>
  .showcase-container {
    /* Apply display: flex, flex-wrap: wrap, align-items: center, gap: 16px */
    padding: 20px;
    background: #f1f5f9;
  }
  .feature-box {
    width: 200px;
    padding: 16px;
    background: white;
  }
</style>
<div class="showcase-container">
  <div class="feature-box">Web Dev</div>
  <div class="feature-box">C Logic</div>
  <div class="feature-box">DSA</div>
</div>\`,
      tasks: [
        {
          id: 'd15-t1',
          title: 'Configure Flexbox with Wrap',
          instruction: 'Add \`display: flex;\` and \`flex-wrap: wrap;\` to .showcase-container.',
          hint: 'Write display: flex; flex-wrap: wrap; inside .showcase-container.',
          validatorKeywords: ['display:', 'flex', 'flex-wrap:', 'wrap'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?flex-wrap:\\s*wrap'
        },
        {
          id: 'd15-t2',
          title: 'Add Alignment and Gap',
          instruction: 'Add \`align-items: center;\` and \`gap: 16px;\` to .showcase-container.',
          hint: 'Include align-items: center; gap: 16px;.',
          validatorKeywords: ['align-items:', 'center', 'gap:', '16px'],
          validatorRegex: 'align-items:\\s*center[\\s\\S]*?gap:\\s*16px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Cards Squished to Unreadable Thin Strips',
      buggyCode: \`.gallery {
  display: flex;
  gap: 20px;
  /* Missing flex-wrap forces 10 wide cards into a single tiny line! */
}
.gallery-item {
  width: 300px;
}\`,
      bugExplanation: 'By default, flex-wrap is nowrap. Flexbox shrinks all children to prevent breaking into new lines, squishing cards into unreadable thin slivers.',
      fixedCode: \`.gallery {
  display: flex;
  flex-wrap: wrap; /* Allows cards to drop onto the next row gracefully */
  gap: 20px;
}\`
    },
    assignment: {
      title: 'Homework Task: BCA 6-Semester Roadmap Cards',
      instructions: [
        'Create folder \`day-15\` with \`index.html\`.',
        'Build a container with 6 cards representing Semesters 1 through 6.',
        'Use \`display: flex; flex-wrap: wrap; gap: 16px;\` with cards sized at \`flex: 1 1 280px;\`.',
        'Inspect how resizing the browser window causes 3 columns -> 2 columns -> 1 column smoothly.'
      ],
      submissionCriteria: 'Verify using responsive inspect mode that cards never overflow horizontally on mobile.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 15: Flex-wrap responsive cards, align-items cross axis centering',
      commands: [
        'mkdir day-15',
        'cd day-15',
        'git add .',
        'git commit -m "Day 15: Flex-wrap responsive cards, align-items cross axis centering"',
        'git push origin main'
      ],
      tips: 'Whenever building card grids with Flexbox, always set flex-wrap: wrap so mobile screens wrap gracefully.'
    },
    vivaCheck: {
      question: 'Which CSS property vertically centers items in a standard horizontal (\`flex-direction: row\`) flex container?',
      options: [
        'justify-content: center',
        'align-items: center',
        'vertical-align: middle',
        'text-align: center'
      ],
      correctAnswer: 1,
      explanation: 'align-items controls alignment along the cross axis. In row direction, the cross axis is vertical, so align-items: center centers items vertically.'
    }
  },

  /* ── DAY 16 ── */
  {
    id: 'day-16',
    day: 16,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Grid System 1: Templates, Columns & Fractional Units',
    slug: 'day-16-css-grid-templates-columns-rows-fractional-units',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand the 2-dimensional CSS Grid layout model (rows AND columns simultaneously).',
      'Use \`display: grid\` on container parents.',
      'Master \`grid-template-columns\` with fractional units (\`1fr\`) and \`repeat()\` notation.',
      'Control column and row spacing using \`gap: 24px\`.'
    ],
    concept: {
      overview: 'CSS Grid is a 2-dimensional layout engine designed for organizing content into precise rows and columns simultaneously, making complex multi-column layouts effortless.',
      keyPoints: [
        'display: grid: Enables the 2D grid formatting context.',
        '1fr (Fractional Unit): Represents a fraction of the available free space in the grid container.',
        'grid-template-columns: repeat(3, 1fr) creates 3 equal-width responsive columns.',
        'Unlike Flexbox (1-directional), Grid aligns items across both horizontal and vertical axes simultaneously.'
      ],
      analogy: 'Flexbox is like stringing beads on a necklace (1D line). CSS Grid is like an Excel spreadsheet or graph paper with defined rows and columns (2D grid).'
    },
    teacherDemo: {
      title: '3-Column Grid with Fractional Units',
      explanation: 'Equal 3-column dashboard using repeat(3, 1fr) and 20px gap.',
      language: 'html',
      code: \`<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 24px;
    background: #000000;
  }
  .metric-card {
    background: #111827;
    color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #1f2937;
  }
</style>
<div class="dashboard-grid">
  <div class="metric-card"><h2>90 Days</h2><p>Sprint 1 Completed</p></div>
  <div class="metric-card"><h2>100%</h2><p>Viva Verified</p></div>
  <div class="metric-card"><h2>10 Stars</h2><p>GitHub Projects</p></div>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 16 Coding Lab: 3-Column CSS Grid Dashboard',
      labDescription: 'Create a 3-column CSS Grid using repeat(3, 1fr) and gap: 20px.',
      language: 'html',
      initialCode: \`<style>
  .stats-grid {
    /* Set display: grid, grid-template-columns: repeat(3, 1fr), and gap: 20px */
    padding: 16px;
  }
  .stat-card {
    background: #2563eb;
    color: white;
    padding: 20px;
  }
</style>
<div class="stats-grid">
  <div class="stat-card">Enrolled: 1,200</div>
  <div class="stat-card">Passed: 98%</div>
  <div class="stat-card">Rating: 4.9/5</div>
</div>\`,
      tasks: [
        {
          id: 'd16-t1',
          title: 'Activate Grid with repeat(3, 1fr)',
          instruction: 'Add \`display: grid;\` and \`grid-template-columns: repeat(3, 1fr);\` to .stats-grid.',
          hint: 'Write display: grid; grid-template-columns: repeat(3, 1fr); in .stats-grid.',
          validatorKeywords: ['display:', 'grid', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: 'display:\\s*grid[\\s\\S]*?grid-template-columns:\\s*repeat\\(3,\\s*1fr\\)'
        },
        {
          id: 'd16-t2',
          title: 'Add Grid Gap',
          instruction: 'Add \`gap: 20px;\` to .stats-grid.',
          hint: 'Include gap: 20px; inside .stats-grid.',
          validatorKeywords: ['gap:', '20px'],
          validatorRegex: 'gap:\\s*20px'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Fixed Pixel Columns Overflowing on Mobile',
      buggyCode: \`.container {
  display: grid;
  grid-template-columns: 400px 400px 400px; /* Total 1200px breaks on mobile screens! */
}\`,
      bugExplanation: 'Using fixed pixel widths prevents columns from shrinking to fit smaller screens. Fractional units (1fr) scale dynamically to container bounds.',
      fixedCode: \`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Dynamically fills available space */
}\`
    },
    assignment: {
      title: 'Homework Task: Student Portfolio Project Gallery',
      instructions: [
        'Create folder \`day-16\` with \`index.html\`.',
        'Create a 6-item project showcase gallery.',
        'Use \`display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;\`.',
        'Style each project card with title, tech stack badge, and a GitHub view button.'
      ],
      submissionCriteria: 'Inspect grid track lines in Chrome DevTools Grid Inspector overlay.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units',
      commands: [
        'mkdir day-16',
        'cd day-16',
        'git add .',
        'git commit -m "Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units"',
        'git push origin main'
      ],
      tips: 'Fractional units (fr) represent proportional fractions of remaining space and prevent horizontal overflow.'
    },
    vivaCheck: {
      question: 'What does 1fr mean in CSS Grid?',
      options: [
        '1 fixed frame rate unit',
        '1 fraction of the available free space in the grid container',
        '1 font relative rem scale',
        '100 pixels in standard resolution'
      ],
      correctAnswer: 1,
      explanation: 'fr stands for fractional unit, representing a fraction of the unused space available inside the grid container.'
    }
  },

  /* ── DAY 17 ── */
  {
    id: 'day-17',
    day: 17,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Grid System 2: Spanning & Newspaper Magazine Layout',
    slug: 'day-17-css-grid-areas-spanning-newspaper-layout',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Master track spanning using \`grid-column: span 2\` and \`grid-row: span 2\`.',
      'Build asymmetrical hero grids with featured large articles.',
      'Understand grid line numbering (line 1, line 2, line -1).',
      'Create a classic newspaper / tech magazine editorial layout.'
    ],
    concept: {
      overview: 'Grid items do not have to be uniform squares. Using column and row spanning, individual grid items can stretch across multiple tracks to create captivating editorial designs.',
      keyPoints: [
        'grid-column: span 2: Makes the item occupy 2 horizontal column tracks.',
        'grid-row: span 2: Makes the item stretch across 2 vertical row tracks.',
        'grid-column: 1 / -1: Spans full width from first grid line to the very last.',
        'Asymmetric grid layouts draw visual attention to lead stories or primary calls to action.'
      ],
      analogy: 'Look at the front page of a newspaper: The lead headline spans across 4 columns, while smaller side stories occupy single columns.'
    },
    teacherDemo: {
      title: 'Magazine Editorial Grid with Featured Hero Item',
      explanation: 'First item spans 2 columns to dominate visual hierarchy.',
      language: 'html',
      code: \`<style>
  .magazine-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .featured-story {
    grid-column: span 2;
    background: #000000;
    color: #ffffff;
    padding: 30px;
    border-radius: 16px;
  }
  .side-story {
    background: #f8fafc;
    padding: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
  }
</style>
<div class="magazine-grid">
  <article class="featured-story">
    <h2>Lead Story: Artificial Intelligence in BCA</h2>
    <p>How modern full-stack students build production systems.</p>
  </article>
  <article class="side-story">
    <h3>Linux CLI</h3>
    <p>Essential bash scripts.</p>
  </article>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 17 Coding Lab: Hero Banner Column Span',
      labDescription: 'Make the .hero-card span 2 columns using grid-column: span 2 inside a 3-column grid.',
      language: 'html',
      initialCode: \`<style>
  .news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .hero-card {
    /* Apply grid-column: span 2 */
    background: #2563eb;
    color: white;
    padding: 24px;
  }
  .regular-card {
    background: #f1f5f9;
    padding: 20px;
  }
</style>
<div class="news-grid">
  <div class="hero-card">FEATURED: 3-Year BCA Practical Journey</div>
  <div class="regular-card">Quick Tip: Git Push</div>
  <div class="regular-card">CSS Box Model</div>
</div>\`,
      tasks: [
        {
          id: 'd17-t1',
          title: 'Span 2 Columns on Hero Card',
          instruction: 'Add \`grid-column: span 2;\` to .hero-card.',
          hint: 'Write grid-column: span 2; in .hero-card.',
          validatorKeywords: ['grid-column:', 'span 2'],
          validatorRegex: 'grid-column:\\s*span\\s+2'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Column Span Exceeding Total Grid Tracks',
      buggyCode: \`.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Container only has 2 columns! */
}
.banner {
  grid-column: span 4; /* Spanning 4 columns on a 2-column grid creates empty ghost tracks */
}\`,
      bugExplanation: 'Spanning more columns than defined in grid-template-columns forces the browser into implicit grid creation, breaking the intended layout.',
      fixedCode: \`.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Defined 4 columns allows span 4 properly */
}
.banner {
  grid-column: span 4;
}\`
    },
    assignment: {
      title: 'Homework Task: Tech News Editorial Dashboard',
      instructions: [
        'Create folder \`day-17\` with \`index.html\`.',
        'Build a 4-column news magazine layout.',
        'Lead story: Spans 2 columns and 2 rows (\`grid-column: span 2; grid-row: span 2;\`).',
        'Add 4 regular news cards filling the remaining grid slots.',
        'Add a full-width footer spanning all 4 columns (\`grid-column: 1 / -1;\`).'
      ],
      submissionCriteria: 'Inspect in Chrome DevTools to verify exact grid line coordinates.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing',
      commands: [
        'mkdir day-17',
        'cd day-17',
        'git add .',
        'git commit -m "Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing"',
        'git push origin main'
      ],
      tips: 'Use grid-column: 1 / -1 to effortlessly span an item across the entire width of any grid.'
    },
    vivaCheck: {
      question: 'What does \`grid-column: 1 / -1\` accomplish on a CSS Grid item?',
      options: [
        'It hides the element from view.',
        'It spans the element across the entire width of the grid, from the very first to the very last column line.',
        'It sets the width to negative 1 pixel.',
        'It rotates the column upside down.'
      ],
      correctAnswer: 1,
      explanation: 'In CSS Grid line numbering, -1 refers to the last line of the explicit grid. 1 / -1 spans from the start line to the end line, covering 100% of the columns.'
    }
  },

  /* ── DAY 18 ── */
  {
    id: 'day-18',
    day: 18,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Responsive Design & Media Queries: Mobile-First Strategy',
    slug: 'day-18-responsive-design-media-queries-mobile-first',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Understand Responsive Web Design (RWD) principles and fluid layouts.',
      'Configure the critical viewport meta tag in the HTML head.',
      'Write mobile-first CSS media queries using \`@media (min-width: 768px)\`.',
      'Transform single-column mobile layouts into multi-column desktop layouts seamlessly.'
    ],
    concept: {
      overview: 'Over 60% of web traffic originates from mobile devices. Responsive Web Design ensures websites adapt fluidly across phones, tablets, and wide desktop monitors using CSS Media Queries.',
      keyPoints: [
        'Mobile-First Strategy: Write default CSS for small screens first, then use min-width media queries to enhance layouts as screen width grows.',
        '@media (min-width: 768px) targets tablets and desktops.',
        '@media (min-width: 1024px) targets large desktop monitors.',
        'Always ensure <meta name="viewport" content="width=device-width, initial-scale=1.0"> is in the HTML <head>.'
      ],
      analogy: 'Water adapts to the shape of whatever cup, bottle, or bowl it is poured into. Responsive design makes your web page flow naturally into any screen size.'
    },
    teacherDemo: {
      title: 'Mobile-First Dual Column Transformation',
      explanation: '1 column on mobile phones, transforms to 2 columns on tablets and desktops.',
      language: 'html',
      code: \`<style>
  /* Default: Mobile phone (1 column) */
  .content-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  /* Desktop breakpoint (2 columns) */
  @media (min-width: 768px) {
    .content-layout {
      flex-direction: row;
    }
  }
</style>
<div class="content-layout">
  <main style="flex: 2; background: #ffffff; padding: 20px;">Main Article</main>
  <aside style="flex: 1; background: #f1f5f9; padding: 20px;">Sidebar</aside>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 18 Coding Lab: Responsive Grid Breakpoint',
      labDescription: 'Configure a layout that is 1 column on mobile, and becomes 3 columns on screens 768px or wider using @media (min-width: 768px).',
      language: 'html',
      initialCode: \`<style>
  .responsive-cards {
    display: grid;
    /* Default: 1 column on mobile */
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Add media query for min-width: 768px with repeat(3, 1fr) below */
</style>
<div class="responsive-cards">
  <div style="background:#2563eb; color:white; padding:16px;">Day 1</div>
  <div style="background:#2563eb; color:white; padding:16px;">Day 2</div>
  <div style="background:#2563eb; color:white; padding:16px;">Day 3</div>
</div>\`,
      tasks: [
        {
          id: 'd18-t1',
          title: 'Write min-width: 768px Media Query',
          instruction: 'Add \`@media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }\`.',
          hint: 'Write @media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }',
          validatorKeywords: ['@media', 'min-width:', '768px', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: '@media\\s*\\(\\s*min-width:\\s*768px\\s*\\)[\\s\\S]*?grid-template-columns:\\s*repeat\\(3,\\s*1fr\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Missing Viewport Meta Tag Breaking Mobile Scaling',
      buggyCode: \`<!DOCTYPE html>
<html>
<head>
  <title>Responsive Site</title>
  <!-- Missing viewport meta tag! -->
</head>
<body>
  <h1>Why is my site zoomed out like desktop on mobile?</h1>
</body>
</html>\`,
      bugExplanation: 'Without the viewport meta tag, mobile browsers assume the page is designed for a 980px desktop and shrink the entire page down to a tiny, unreadable zoom.',
      fixedCode: \`<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Site</title>
</head>\`
    },
    assignment: {
      title: 'Homework Task: Responsive BCA Course Landing Page',
      instructions: [
        'Create folder \`day-18\` with \`index.html\`.',
        'Build a header, hero section, and 3-card feature showcase.',
        'On mobile (< 640px): 1 column layout with stacked navigation.',
        'On tablet (>= 640px): 2 column card grid.',
        'On desktop (>= 1024px): 3 column card grid with horizontal header navigation.'
      ],
      submissionCriteria: 'Test using Chrome DevTools device mode toggling between iPhone, iPad, and Desktop.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 18: Mobile-first responsive design, media query breakpoints and fluid grids',
      commands: [
        'mkdir day-18',
        'cd day-18',
        'git add .',
        'git commit -m "Day 18: Mobile-first responsive design, media query breakpoints and fluid grids"',
        'git push origin main'
      ],
      tips: 'Always write mobile styles outside media queries, and use min-width to progressively enhance larger screens.'
    },
    vivaCheck: {
      question: 'Why is the mobile-first CSS architecture preferred over desktop-first?',
      options: [
        'Mobile-first code requires less memory and progressively enhances performance on constrained mobile devices.',
        'Desktop computers cannot read CSS media queries.',
        'Mobile devices only support pure HTML without CSS.',
        'Desktop-first is forbidden by search engines.'
      ],
      correctAnswer: 0,
      explanation: 'Mobile-first ensures mobile users download simpler, lighter baseline CSS, and richer layout features are loaded conditionally as screen width increases.'
    }
  },

  /* ── DAY 19 ── */
  {
    id: 'day-19',
    day: 19,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'CSS Transitions, Transforms & Hover Micro-Interactions',
    slug: 'day-19-css-transitions-hover-micro-interactions-transform',
    category: 'CSS Layouts',
    estimatedTime: '2 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Create smooth visual states using the \`transition\` property.',
      'Manipulate geometry using \`transform: translateY()\`, \`scale()\`, and \`rotate()\`.',
      'Build tactile card hover elevations with smooth box-shadow transitions.',
      'Apply hardware GPU acceleration principles (\`transform\`, \`opacity\`) for 60fps animations.'
    ],
    concept: {
      overview: 'Micro-animations turn static web pages into engaging, interactive applications. CSS Transitions smoothly interpolate changes between pseudo-class states like :hover and :active.',
      keyPoints: [
        'transition: property duration timing-function delay (e.g., transition: all 0.25s ease).',
        'transform: translateY(-4px) moves an element up smoothly without causing expensive DOM layout recalculations.',
        'transform: scale(1.05) subtly enlarges buttons on hover for delightful tactile feedback.',
        'Always animate transform and opacity rather than width, height, or top for 60fps performance.'
      ],
      analogy: 'Imagine flipping a light switch: without transition, the room instantly snaps bright. With transition, a dimmer switch smoothly fades the light up over 0.3 seconds.'
    },
    teacherDemo: {
      title: 'Elevating Interactive Card with Smooth Shadow',
      explanation: 'Notice how translateY and box-shadow combine for a premium physical lift effect.',
      language: 'html',
      code: \`<style>
  .interactive-card {
    width: 280px;
    padding: 24px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }
  .interactive-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.15);
  }
</style>
<div class="interactive-card">
  <h3>Interactive Module</h3>
  <p>Hover over me to feel the smooth elevation!</p>
</div>\`
    },
    practicalLab: {
      labTitle: 'Day 19 Coding Lab: Interactive Hover Button',
      labDescription: 'Add a smooth transition: all 0.3s ease and transform: translateY(-3px) on :hover to .action-btn.',
      language: 'html',
      initialCode: \`<style>
  .action-btn {
    padding: 12px 24px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    /* Add transition here */
  }
  .action-btn:hover {
    /* Add transform translateY(-3px) here */
  }
</style>
<button class="action-btn">Launch Practice Lab</button>\`,
      tasks: [
        {
          id: 'd19-t1',
          title: 'Add Transition Property',
          instruction: 'Add \`transition: all 0.3s ease;\` to .action-btn.',
          hint: 'Write transition: all 0.3s ease; inside .action-btn.',
          validatorKeywords: ['transition:', '0.3s', 'ease'],
          validatorRegex: 'transition:\\s*(all\\s+)?0\\.3s\\s+ease'
        },
        {
          id: 'd19-t2',
          title: 'Add Hover Transform',
          instruction: 'Add \`transform: translateY(-3px);\` to .action-btn:hover.',
          hint: 'Include transform: translateY(-3px); inside .action-btn:hover.',
          validatorKeywords: ['transform:', 'translateY(-3px)'],
          validatorRegex: 'transform:\\s*translateY\\(-3px\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Janky Laggy Animation Using Margin-Top on Hover',
      buggyCode: \`.card:hover {
  margin-top: -10px; /* Causes expensive browser reflow and layout thrashing! */
  transition: margin-top 0.3s;
}\`,
      bugExplanation: 'Animating margin or top triggers layout recalculation across the entire document tree. Always use transform: translateY() which is GPU-accelerated by the browser compositor.',
      fixedCode: \`.card:hover {
  transform: translateY(-10px); /* Runs at 60fps on GPU without layout thrashing */
  transition: transform 0.3s ease;
}\`
    },
    assignment: {
      title: 'Homework Task: Interactive Pricing / Tier Cards',
      instructions: [
        'Create folder \`day-19\` with \`index.html\`.',
        'Build 3 subscription / course tier cards (Starter, Pro, Enterprise).',
        'Apply \`transition: transform 0.25s ease, box-shadow 0.25s ease\` on all cards.',
        'On \`:hover\`, elevate the hovered card by \`translateY(-8px)\` and deepen its drop-shadow.',
        'Add a \`:active\` state that scales buttons down to \`scale(0.96)\` on click.'
      ],
      submissionCriteria: 'Test hover and click micro-interactions in Google Chrome.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states',
      commands: [
        'mkdir day-19',
        'cd day-19',
        'git add .',
        'git commit -m "Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states"',
        'git push origin main'
      ],
      tips: 'Always animate transform and opacity for buttery 60fps mobile transitions with zero battery drain.'
    },
    vivaCheck: {
      question: 'Why is \`transform: translateY()\` preferred over \`top\` or \`margin-top\` for hover animations?',
      options: [
        'transform runs on the GPU compositor thread without triggering layout reflow, guaranteeing smooth 60fps.',
        'margin-top is deprecated in modern CSS.',
        'transform works only in dark mode.',
        'translateY reduces file download size.'
      ],
      correctAnswer: 0,
      explanation: 'Transform does not change geometry in the layout tree, meaning the browser composite engine renders it directly on the GPU without costly document reflow.'
    }
  },

  /* ── DAY 20 ── */
  {
    id: 'day-20',
    day: 20,
    year: 1,
    semester: 1,
    specialization: 'foundation',
    title: 'Sprint 2 Capstone: Responsive University Campus Portal',
    slug: 'day-20-sprint-2-capstone-responsive-campus-portal',
    category: 'CSS Layouts',
    estimatedTime: '3 Hours Practical',
    difficulty: 'Intermediate',
    objectives: [
      'Integrate all concepts from Sprint 2 into a production-grade multi-section portal.',
      'Build a Flexbox sticky header with brand logo and responsive navigation.',
      'Create a modern Hero banner with call-to-action buttons.',
      'Build a 3-column CSS Grid showcasing BCA Academic Departments.',
      'Deploy full mobile responsiveness with media queries and hover micro-animations.'
    ],
    concept: {
      overview: 'Congratulations on reaching Day 20! Today you synthesize everything learned across Sprint 2 (Box Model, Display, Positioning, Flexbox, Grid, Media Queries, and Transitions) to build a complete Responsive University Campus Portal.',
      keyPoints: [
        'Semantic Architecture: Use <header>, <nav>, <main>, <section>, and <footer>.',
        'Global CSS Design System: Define CSS custom variables for primary brand blue (#2563eb), dark background, and clean cards.',
        'Layout Integration: Flexbox for single-direction alignment (Navbar, Buttons) + CSS Grid for 2D multi-card departments.',
        '100% Mobile Responsive: Perfectly readable on 360px mobile screens and wide 1440px desktop displays.'
      ],
      analogy: 'Think of this as your semester midterm practical exam: taking all the separate tools in your toolbox and crafting a real, functional software product.'
    },
    teacherDemo: {
      title: 'Responsive Campus Portal Architecture',
      explanation: 'Complete architecture demonstrating navigation, hero, and grid departments.',
      language: 'html',
      code: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex University Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: sans-serif; background: #f8fafc; color: #0f172a; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; background: #000; color: #fff; }
    .hero { text-align: center; padding: 60px 20px; background: #2563eb; color: #fff; }
    .dept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 40px 24px; }
    .dept-card { background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; transition: transform 0.2s; }
    .dept-card:hover { transform: translateY(-4px); }
  </style>
</head>
<body>
  <header class="header"><h2>Apex University</h2><div>BCA Portal</div></header>
  <section class="hero"><h1>Excellence in Computer Applications</h1></section>
  <section class="dept-grid">
    <div class="dept-card"><h3>Computer Science</h3><p>Software & Algorithms</p></div>
    <div class="dept-card"><h3>Web Technologies</h3><p>Full-Stack Engineering</p></div>
    <div class="dept-card"><h3>Data Science</h3><p>Analytics & Machine Learning</p></div>
  </section>
</body>
</html>\`
    },
    practicalLab: {
      labTitle: 'Day 20 Coding Lab: Complete Campus Portal',
      labDescription: 'Assemble the final capstone portal incorporating a flex header, hero section, and responsive dept-grid.',
      language: 'html',
      initialCode: \`<style>
  * { box-sizing: border-box; }
  .portal-nav {
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    background: #000000;
    color: #ffffff;
  }
  .portal-hero {
    padding: 40px 20px;
    background: #2563eb;
    color: #ffffff;
    text-align: center;
  }
  .portal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 24px;
  }
</style>
<header class="portal-nav">
  <div>NextSem Campus</div>
  <div>Student Hub</div>
</header>
<section class="portal-hero">
  <h1>Welcome to BCA Department</h1>
</section>
<main class="portal-grid">
  <div style="background:white; padding:16px; border:1px solid #ddd;">Programming Lab</div>
  <div style="background:white; padding:16px; border:1px solid #ddd;">Web Studio</div>
  <div style="background:white; padding:16px; border:1px solid #ddd;">Library Portal</div>
</main>\`,
      tasks: [
        {
          id: 'd20-t1',
          title: 'Verify Portal Nav Flexbox',
          instruction: 'Ensure .portal-nav has \`display: flex;\` and \`justify-content: space-between;\`.',
          hint: 'Keep display: flex and justify-content: space-between in .portal-nav.',
          validatorKeywords: ['display:', 'flex', 'justify-content:', 'space-between'],
          validatorRegex: 'display:\\s*flex[\\s\\S]*?justify-content:\\s*space-between'
        },
        {
          id: 'd20-t2',
          title: 'Verify Portal Grid System',
          instruction: 'Ensure .portal-grid has \`display: grid;\` and \`grid-template-columns: repeat(3, 1fr);\`.',
          hint: 'Keep display: grid and grid-template-columns: repeat(3, 1fr); in .portal-grid.',
          validatorKeywords: ['display:', 'grid', 'grid-template-columns:', 'repeat(3, 1fr)'],
          validatorRegex: 'display:\\s*grid[\\s\\S]*?grid-template-columns:\\s*repeat\\(3,\\s*1fr\\)'
        }
      ]
    },
    debuggingChallenge: {
      title: 'Spot the Bug: Broken Mobile View on Full Capstone Portal',
      buggyCode: \`.portal-grid {
  display: grid;
  grid-template-columns: 350px 350px 350px;
  width: 1050px; /* Hardcoded width breaks completely on smartphones! */
}\`,
      bugExplanation: 'Hardcoding widths like 1050px prevents responsive reflow and forces horizontal scrolling. Always use fluid grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) or media queries.',
      fixedCode: \`.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}\`
    },
    assignment: {
      title: 'Homework Task: Production Campus Portal GitHub Release',
      instructions: [
        'Create folder \`day-20\` in your repository with \`index.html\` and \`styles.css\`.',
        'Build a complete University Campus Portal homepage.',
        'Section 1: Sticky Navigation Bar with Logo and Links.',
        'Section 2: Hero section with CTA button ("Apply for BCA 2026").',
        'Section 3: 4 Academic Department Cards with hover elevation (\`translateY(-5px)\`).',
        'Section 4: Faculty Spotlight Section with 2-column layout.',
        'Section 5: Professional Footer with Copyright and Quick Links.',
        'Ensure 100% mobile responsiveness from 360px to 1440px.'
      ],
      submissionCriteria: 'Push to GitHub and verify live repository in NextSem BCA Practical Portal.'
    },
    githubWorkflow: {
      repoName: 'html-css-projects',
      commitMessage: 'Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal',
      commands: [
        'mkdir day-20',
        'cd day-20',
        'git add .',
        'git commit -m "Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal"',
        'git push origin main'
      ],
      tips: 'Milestone reached! You have finished Days 1–20 of your BCA Practical Degree journey. Showcase your repository on LinkedIn and WhatsApp!'
    },
    vivaCheck: {
      question: 'What is the primary architectural difference between Flexbox and CSS Grid when building a full website layout?',
      options: [
        'Flexbox is 1-dimensional (content-first along row or column), while CSS Grid is 2-dimensional (layout-first along rows and columns simultaneously).',
        'Flexbox works only on mobile, while CSS Grid works only on desktop.',
        'CSS Grid is deprecated in favor of Flexbox.',
        'Flexbox requires JavaScript, while CSS Grid is pure HTML.'
      ],
      correctAnswer: 0,
      explanation: 'Flexbox is designed for 1-dimensional item distribution (like navigation bars or button groups), whereas CSS Grid is designed for 2-dimensional grid layouts (like entire page skeletons and card matrices).'
    }
  }
];`;

// Replace closing bracket of PRACTICAL_LESSONS
const targetMarker = '  }\n];';
const lastIndex = content.lastIndexOf(targetMarker);
if (lastIndex === -1) {
  console.error("Could not find target marker");
  process.exit(1);
}

const replacement = '  },\n\n' + days11to20;
const newContent = content.slice(0, lastIndex) + replacement + content.slice(lastIndex + targetMarker.length);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully appended Days 11-20 to bcaPracticalData.ts!");
