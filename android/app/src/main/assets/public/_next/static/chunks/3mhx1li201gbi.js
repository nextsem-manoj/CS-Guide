(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,49882,e=>{"use strict";let t=(0,e.i(56420).default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",0,t],49882)},74082,e=>{"use strict";let t=[{id:"day-1",day:1,year:1,semester:1,specialization:"foundation",title:"HTML Setup & First Webpage",slug:"day-1-html-setup-first-webpage",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Understand how browsers parse HTML documents.","Configure VS Code workspace and create an `index.html` file.","Write the boilerplate structure: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.","Display your first heading and paragraph on a live browser tab."],concept:{overview:"HTML (HyperText Markup Language) is the standard skeleton of every webpage on the internet. Browsers do not understand Word files; they read raw HTML tags and paint them onto your screen.",keyPoints:["<!DOCTYPE html> tells the browser you are using modern HTML5.","The <head> holds metadata, page title, and stylesheet links (invisible to the page visitor).","The <body> holds everything the user sees on their screen.","Always save your primary homepage file as `index.html`."],analogy:"Think of HTML as the brick-and-mortar skeleton of a house. Without it, you cannot paint walls (CSS) or wire the electricity (JavaScript)."},teacherDemo:{title:"Minimal Valid HTML5 Document",explanation:"Every professional web page begins with this exact 10-line boilerplate.",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NextSem BCA Practical Day 1</title>
</head>
<body>
  <h1>Welcome to BCA Practical Portal</h1>
  <p>Today is Day 1 of my coding journey into computer software!</p>
</body>
</html>`},practicalLab:{labTitle:"Day 1 Coding Lab: Craft Your First Webpage",labDescription:"Edit the code editor below to create a valid HTML5 page containing an <h1> title and a descriptive <p> tag.",language:"html",initialCode:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First BCA Webpage</title>
</head>
<body>
  <!-- Write your h1 heading and p paragraph here -->
</body>
</html>`,tasks:[{id:"d1-t1",title:"Add an <h1> Heading",instruction:'Inside the <body>, create an <h1> heading saying "Hello Nextsem Developer".',hint:"Use <h1>Hello Nextsem Developer</h1> inside <body>.",validatorKeywords:["<h1>","</h1>","Hello Nextsem Developer"],validatorRegex:"<h1[^>]*>\\s*Hello Nextsem Developer\\s*<\\/h1>"},{id:"d1-t2",title:"Add a <p> Paragraph",instruction:"Directly below the heading, add a <p> tag describing your BCA coding goal.",hint:"Write <p>I am learning practical coding.</p>.",validatorKeywords:["<p>","</p>"],validatorRegex:"<p[^>]*>[\\s\\S]+?<\\/p>"}]},debuggingChallenge:{title:"Spot the Bug: Broken Page Structure",buggyCode:`<!DOCTYPE html>
<html>
  <title>Buggy Page</title>
  <h1>Why is my title outside head?</h1>
</html>`,bugExplanation:"The `<title>` tag must be inside a `<head>` element, and visible content like `<h1>` must be enclosed inside a `<body>` element. Browsers might try to fix it, but search engines and validation tools will fail.",fixedCode:`<!DOCTYPE html>
<html>
<head>
  <title>Buggy Page Fixed</title>
</head>
<body>
  <h1>Content is now properly placed inside body!</h1>
</body>
</html>`},assignment:{title:"Homework Task: Student Launch Page",instructions:["Create a local folder named `bca-day-1` on your PC.","Open the folder in VS Code and create `index.html`.","Add your full name in an <h1> heading.","Add a paragraph detailing: Your BCA Roll Number, College Name, and your target career track.","Open the file directly in Google Chrome and verify the display."],submissionCriteria:"Verify with browser DevTools (F12) that there are zero HTML syntax warnings."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 01: Setup HTML5 boilerplate and first page",commands:["git init","git add .",'git commit -m "Day 01: Setup HTML5 boilerplate and first page"',"git branch -M main","git remote add origin https://github.com/YOUR_USERNAME/html-css-projects.git","git push -u origin main"],tips:"Commit frequently! Every completed day should be a distinct commit in your `html-css-projects` repository."},vivaCheck:{question:"Why is <!DOCTYPE html> required at the very first line of an HTML document?",options:["It downloads external CSS styles from the server.","It signals the browser to render the page in standard HTML5 mode rather than Quirks mode.","It is an encrypted security key required by the server.","It creates a link to the website database."],correctAnswer:1,explanation:"<!DOCTYPE html> is a document type declaration that forces the web browser into full standards compliance mode, avoiding legacy quirks mode quirks."}},{id:"day-2",day:2,year:1,semester:1,specialization:"foundation",title:"HTML Headings, Paragraphs & Text Formatting",slug:"day-2-html-headings-paragraphs-text-formatting",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Master heading hierarchy from <h1> through <h6>.","Understand typography elements: <strong>, <em>, <mark>, <del>, <ins>, <small>.","Use line breaks (<br>) and horizontal dividers (<hr>) correctly without breaking structure.","Structure an informative article with clear hierarchy."],concept:{overview:"Text is the core vessel of information on the web. Search engines and screen readers rely on heading hierarchy (h1 to h6) to understand content priority.",keyPoints:["A webpage should only have ONE <h1> tag representing the primary page topic.","Never use headings simply to make text large; use CSS for sizing.","Use <strong> for semantic importance (renders bold) and <em> for semantic emphasis (renders italic).","<hr> represents a thematic break in content, while <br> forces a line break."],analogy:"Think of <h1> as a book title, <h2> as chapter names, and <h3> as sub-sections within that chapter."},teacherDemo:{title:"Semantic Heading & Text Formatting Demo",explanation:"Notice how semantic tags provide meaning to both human readers and search engines.",language:"html",code:`<article>
  <h1>Introduction to BCA Computer Science</h1>
  <h2>Core Pillars of the Program</h2>
  <p>Computer applications require <strong>strong logic</strong> and <em>daily consistency</em>.</p>
  <hr>
  <h3>Key Focus Areas:</h3>
  <p>Students must master <mark>practical programming</mark> rather than pure memorization.</p>
  <p><small>NextSem Academy \xa9 2026 Academic Syllabus</small></p>
</article>`},practicalLab:{labTitle:"Day 2 Coding Lab: Academic Article Formatting",labDescription:"Build an article about your favourite programming language using proper heading hierarchy and text emphasis tags.",language:"html",initialCode:`<article>
  <!-- Add h1, h2, p with <strong> and <em> here -->
</article>`,tasks:[{id:"d2-t1",title:"Add Single <h1> Title",instruction:'Add an <h1> with the text "Why I Chose BCA".',hint:"Use <h1>Why I Chose BCA</h1>",validatorKeywords:["<h1>","</h1>","Why I Chose BCA"],validatorRegex:"<h1[^>]*>\\s*Why I Chose BCA\\s*<\\/h1>"},{id:"d2-t2",title:"Use <strong> and <em> Inside Paragraph",instruction:"Add a <p> tag that contains both <strong> and <em> tags.",hint:"Example: <p>I want to be a <strong>developer</strong> with <em>passion</em>.</p>",validatorKeywords:["<p>","<strong>","</strong>","<em>","</em>","</p>"],validatorRegex:"<p[^>]*>[\\s\\S]*?<strong>[\\s\\S]*?<\\/strong>[\\s\\S]*?<em>[\\s\\S]*?<\\/em>[\\s\\S]*?<\\/p>"}]},debuggingChallenge:{title:"Spot the Bug: Broken Tag Nesting",buggyCode:"<p>This is a <strong>very important <em>point</p></em></strong>",bugExplanation:"Tags must be closed in reverse order of how they were opened (LIFO - Last In, First Out). The <em> and <strong> were closed after closing the <p> tag!",fixedCode:"<p>This is a <strong>very important <em>point</em></strong>.</p>"},assignment:{title:"Homework Task: Tech Biography Page",instructions:["Create a page about Ada Lovelace or Alan Turing.","Use an <h1> for the person’s name.","Use <h2> for their Early Life, Major Achievements, and Legacy.","Use <strong> for significant dates and inventions.","Add a thematic divider (<hr>) before the footer."],submissionCriteria:"Inspect your heading structure using the Chrome accessibility tree or DevTools."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 02: Heading hierarchy and semantic text formatting",commands:["git add .",'git commit -m "Day 02: Heading hierarchy and semantic text formatting"',"git push origin main"],tips:'Always write concise, imperative commit messages starting with an action verb (e.g., "Add", "Fix", "Update").'},vivaCheck:{question:"What is the semantic difference between <b> and <strong> in HTML5?",options:["<b> is deprecated and will not render in modern browsers.","<b> only styles text bold visually, while <strong> conveys strong importance to screen readers and search bots.","<strong> makes text red, while <b> makes it black.","There is zero difference; they are 100% interchangeable."],correctAnswer:1,explanation:"<b> is purely stylistic (offset text without extra importance), whereas <strong> gives semantic importance, which assists accessibility readers and SEO indexers."}},{id:"day-3",day:3,year:1,semester:1,specialization:"foundation",title:"HTML Links & Images",slug:"day-3-html-links-and-images",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Create hyperlinks with the anchor tag <a> and `href` attribute.","Understand absolute URLs vs relative paths.",'Open links in new tabs safely using `target="_blank"` and `rel="noopener noreferrer"`.',"Embed images with `<img>`, `src`, `alt`, `width`, and `height`."],concept:{overview:"Hyperlinks connect documents across the World Wide Web, creating the hyperlinked web network. Images visually communicate data, but require accessible descriptions via alt attributes.",keyPoints:["Absolute URLs specify full protocol & domain (e.g., `https://google.com`).","Relative URLs point to files inside your project directory (e.g., `about.html` or `images/logo.png`).","The `alt` attribute is MANDATORY for images so screen readers can describe the image if it fails to load.",'Never omit `alt` or write generic words like "image". Describe the content concisely.'],analogy:"An `href` is like a GPS coordinate directing the browser to another building, while `src` is like ordering a picture frame to be placed in your room."},teacherDemo:{title:"Links, New Tabs & Responsive Images",explanation:"Notice the secure attributes used when opening external links.",language:"html",code:`<section>
  <h2>Explore Developer Resources</h2>
  <p>
    Visit the official 
    <a href="https://nextsem.online" target="_blank" rel="noopener noreferrer">
      NextSem Academy Portal
    </a>
  </p>
  <img 
    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" 
    alt="Developer working on laptop with code editor open"
    width="500" 
    height="300"
  >
</section>`},practicalLab:{labTitle:"Day 3 Coding Lab: Resource Link Card with Image",labDescription:"Create an image card that features an external documentation link and an image with an accessible alt description.",language:"html",initialCode:`<div>
  <!-- Add your image and anchor tag here -->
</div>`,tasks:[{id:"d3-t1",title:"Add an Image with alt Attribute",instruction:"Add an <img> tag with a valid `src` and a descriptive `alt` attribute.",hint:'Example: <img src="https://via.placeholder.com/150" alt="Sample placeholder thumbnail">',validatorKeywords:["<img","src=","alt="],validatorRegex:"<img[^>]*src=['\"][^'\"]+['\"][^>]*alt=['\"][^'\"]+['\"][^>]*>"},{id:"d3-t2",title:'Add External Link with target="_blank"',instruction:'Add an <a> tag linking to "https://github.com" with target="_blank".',hint:'Use <a href="https://github.com" target="_blank" rel="noopener noreferrer">Visit GitHub</a>',validatorKeywords:["<a",'href="https://github.com"','target="_blank"'],validatorRegex:"<a[^>]*href=['\"]https:\\/\\/github\\.com['\"][^>]*target=['\"]_blank['\"][^>]*>[\\s\\S]+?<\\/a>"}]},debuggingChallenge:{title:"Spot the Bug: Security Vulnerability in External Links",buggyCode:'<a href="https://untrusted-external-site.com" target="_blank">Click Here</a>',bugExplanation:'Opening external sites in `target="_blank"` without `rel="noopener noreferrer"` allows the destination page to access `window.opener` and potentially manipulate or phish your original tab (Reverse Tabnabbing).',fixedCode:'<a href="https://untrusted-external-site.com" target="_blank" rel="noopener noreferrer">Click Here</a>'},assignment:{title:"Homework Task: Multi-Page BCA Mini Site",instructions:["Create three HTML files in one directory: `index.html`, `courses.html`, and `contact.html`.",'Add navigation links on all three pages linking to each other using relative paths (`href="courses.html"`).','Place a computer image on the homepage with width="400" and an accurate alt tag.',"Verify that clicking each navigation link transitions smoothly between the pages."],submissionCriteria:"All relative internal links must navigate smoothly without 404 errors."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 03: Hyperlinks, image embedding and secure target blank",commands:["git add .",'git commit -m "Day 03: Hyperlinks, image embedding and secure target blank"',"git push origin main"],tips:"Commit and check your GitHub repository in your browser to verify that file paths match case-sensitively."},vivaCheck:{question:"Why is the `alt` attribute strictly mandatory on an <img> tag according to web standards?",options:["It tells the browser what file format the image is.","It ensures screen readers can announce image content for visually impaired users and displays fallback text if the image fails to load.","It speeds up internet connection bandwidth.","It prevents other users from downloading the image."],correctAnswer:1,explanation:"The `alt` text provides essential accessibility for screen readers and is displayed if network failure prevents the image from downloading."}},{id:"day-4",day:4,year:1,semester:1,specialization:"foundation",title:"HTML Lists & Tables",slug:"day-4-html-lists-and-tables",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Build unordered lists (<ul>) and ordered lists (<ol>) with list items (<li>).","Create nested navigation lists.","Construct data tables using <table>, <thead>, <tbody>, <tr>, <th>, and <td>.","Apply `colspan` and `rowspan` to merge table cells effectively."],concept:{overview:"Lists organize steps, features, and website menus. Tables represent 2D tabular data like grades, schedules, or database records.",keyPoints:["Only <li> elements may be direct children of <ul> and <ol>.","Tables must NEVER be used for page layouts; use tables exclusively for tabular data.","Always wrap table headers inside <thead> and data rows inside <tbody>.","<th> stands for Table Header (bold and centered by default), while <td> is Table Data."],analogy:"Think of <ul> as a bulleted shopping checklist, and <table> as an Excel spreadsheet."},teacherDemo:{title:"BCA Semester 1 Grade Sheet Table",explanation:"Notice the structured use of thead, tbody, th, and td tags.",language:"html",code:`<table>
  <thead>
    <tr>
      <th>Subject Code</th>
      <th>Subject Name</th>
      <th>Credits</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>BCS-111</td>
      <td>Computer Basics & PC Software</td>
      <td>3</td>
      <td>In Progress</td>
    </tr>
    <tr>
      <td>BCSL-013</td>
      <td>Software Lab</td>
      <td>2</td>
      <td>In Progress</td>
    </tr>
  </tbody>
</table>`},practicalLab:{labTitle:"Day 4 Coding Lab: Course Timetable Table",labDescription:"Construct a structured schedule table with a header row and at least two data rows.",language:"html",initialCode:`<table>
  <!-- Add thead, tbody, tr, th, td here -->
</table>`,tasks:[{id:"d4-t1",title:"Add Table Header Row with 3 Columns",instruction:"Inside <thead>, create a <tr> containing three <th> elements: Day, Subject, and Time.",hint:"Use <thead><tr><th>Day</th><th>Subject</th><th>Time</th></tr></thead>",validatorKeywords:["<thead>","<th>Day</th>","<th>Subject</th>","<th>Time</th>","</thead>"],validatorRegex:"<thead>[\\s\\S]*?<tr>[\\s\\S]*?<th>Day<\\/th>[\\s\\S]*?<th>Subject<\\/th>[\\s\\S]*?<th>Time<\\/th>[\\s\\S]*?<\\/tr>[\\s\\S]*?<\\/thead>"},{id:"d4-t2",title:"Add Table Body with Data Row",instruction:"Inside <tbody>, add a <tr> containing three <td> cells.",hint:"Example: <tbody><tr><td>Monday</td><td>HTML Lab</td><td>10:00 AM</td></tr></tbody>",validatorKeywords:["<tbody>","<tr>","<td>","</td>","</tr>","</tbody>"],validatorRegex:"<tbody>[\\s\\S]*?<tr>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<td>[\\s\\S]*?<\\/td>[\\s\\S]*?<\\/tr>[\\s\\S]*?<\\/tbody>"}]},debuggingChallenge:{title:"Spot the Bug: Illegal Direct Children of Lists",buggyCode:`<ul>
  <p>First item</p>
  <div>Second item</div>
</ul>`,bugExplanation:"HTML specifications strictly require that only `<li>` elements can be direct children of a `<ul>` or `<ol>`. Tags like `<p>` and `<div>` are illegal direct children.",fixedCode:`<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`},assignment:{title:"Homework Task: BCA Semester Syllabus Matrix",instructions:["Create a webpage displaying the complete list of 6 BCA semesters using an ordered list (<ol>).","Inside Semester 1, nest an unordered list (<ul>) of all subjects.","Below the lists, create a table summarizing Subject, Credits, Lab requirement (Yes/No), and Exam weightage.",'Use `colspan="2"` on a footer summary row displaying "Total Credits: 16".'],submissionCriteria:"Ensure the table passes W3C HTML validator without nesting errors."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 04: Structured lists, nested menus and tabular data matrix",commands:["git add .",'git commit -m "Day 04: Structured lists, nested menus and tabular data matrix"',"git push origin main"],tips:"Inspect git log with `git log --oneline` to review your commit history."},vivaCheck:{question:"What is the purpose of `colspan` attribute in a `<td>` or `<th>` tag?",options:["It changes the color of the column.","It merges the current cell across multiple horizontal columns.","It spans the cell vertically across multiple rows.","It sets the column font size."],correctAnswer:1,explanation:"`colspan` specifies how many horizontal columns a table cell should span across."}},{id:"day-5",day:5,year:1,semester:1,specialization:"foundation",title:"HTML Forms & Input Elements",slug:"day-5-html-forms-and-input-elements",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:['Understand how HTML forms transmit data using `<form action="..." method="...">`.',"Master essential input types: `text`, `email`, `password`, `number`, `radio`, `checkbox`.","Connect `<label>` elements to inputs using the `for` and `id` attributes.","Utilize native HTML5 validation attributes: `required`, `minlength`, `pattern`, `placeholder`."],concept:{overview:"Forms are how users submit data into a web application—from logins to job applications. HTML5 provides built-in client-side validation before data hits JavaScript.",keyPoints:['Always connect `<label for="username">` with `<input id="username">` for accessibility.',"Clicking a connected label focuses its associated input field automatically.","The `name` attribute is crucial: it determines the key under which data is submitted to the backend server.",'`method="POST"` is used for sensitive or modifying data; `method="GET"` is used for search queries.'],analogy:"An HTML form is like a physical paper registration slip with pre-labeled blank slots for your details."},teacherDemo:{title:"Accessible Student Admission Form",explanation:"Notice how every input has an explicit label, name, id, and validation attribute.",language:"html",code:`<form action="/submit-student" method="POST">
  <div>
    <label for="fullName">Full Name:</label>
    <input type="text" id="fullName" name="fullName" placeholder="e.g. Rahul Sharma" required minlength="3">
  </div>
  <div>
    <label for="email">Email Address:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="track">Specialization Track:</label>
    <select id="track" name="track">
      <option value="web">Web Development</option>
      <option value="programming">Software / Programming</option>
      <option value="data">Data / AI</option>
    </select>
  </div>
  <button type="submit">Submit Registration</button>
</form>`},practicalLab:{labTitle:"Day 5 Coding Lab: Student Feedback Form",labDescription:"Construct a form with text, email, and radio button inputs with linked label attributes.",language:"html",initialCode:`<form>
  <!-- Add form fields with labels here -->
</form>`,tasks:[{id:"d5-t1",title:"Add Email Input with Label",instruction:'Create an email input with `id="userEmail"`, `name="email"`, and a linked `<label for="userEmail">`.',hint:'Use <label for="userEmail">Email</label><input type="email" id="userEmail" name="email" required>',validatorKeywords:["<label",'for="userEmail"',"<input",'type="email"','id="userEmail"'],validatorRegex:"<label[^>]*for=['\"]userEmail['\"][^>]*>[\\s\\S]*?<\\/label>[\\s\\S]*?<input[^>]*type=['\"]email['\"][^>]*id=['\"]userEmail['\"][^>]*>"},{id:"d5-t2",title:"Add Submit Button",instruction:'Add a `<button type="submit">Submit Form</button>`.',hint:'Use <button type="submit">Submit Form</button>',validatorKeywords:["<button",'type="submit"',"Submit Form","</button>"],validatorRegex:"<button[^>]*type=['\"]submit['\"][^>]*>\\s*Submit Form\\s*<\\/button>"}]},debuggingChallenge:{title:"Spot the Bug: Missing name Attribute on Inputs",buggyCode:`<form action="/login" method="POST">
  <input type="text" id="username">
  <input type="password" id="password">
  <button type="submit">Login</button>
</form>`,bugExplanation:'When a form submits, the browser sends key-value pairs based on the `name` attribute. Without `name="username"` and `name="password"`, the submitted payload is completely EMPTY!',fixedCode:`<form action="/login" method="POST">
  <input type="text" id="username" name="username" required>
  <input type="password" id="password" name="password" required>
  <button type="submit">Login</button>
</form>`},assignment:{title:"Homework Task: Comprehensive BCA Job Portal Form",instructions:["Build a job application form (`job-apply.html`).",'Include: Full Name, Email, Phone Number (`type="tel"`), Resume file upload (`type="file"`).',"Add radio buttons for Experience (Fresher, 1-2 Years, 3+ Years).","Add checkboxes for Known Technologies (HTML, CSS, JavaScript, C, SQL).","Add a `<textarea>` for Cover Letter.","Mark all essential fields with the `required` attribute."],submissionCriteria:"Test submitting the form in your browser with blank inputs to verify that native validation popups appear."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 05: Accessible forms, input types and native HTML5 validation",commands:["git add .",'git commit -m "Day 05: Accessible forms, input types and native HTML5 validation"',"git push origin main"],tips:"Run `git status` before committing to verify which files are staged."},vivaCheck:{question:'What happens to form data when the form method is "GET"?',options:["Data is encrypted with SHA-256 before transmission.","Form input values are appended visibly to the URL query string (e.g. ?name=rahul).","Data is stored inside localStorage permanently.","The form automatically downloads as a PDF file."],correctAnswer:1,explanation:"HTTP GET attaches form parameters directly into the URL as key-value query parameters, making it unsuitable for passwords and sensitive information."}},{id:"day-6",day:6,year:1,semester:1,specialization:"foundation",title:"HTML Semantic Elements & Page Architecture",slug:"day-6-html-semantic-elements-and-page-structure",category:"HTML Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Replace generic `<div>` soup with modern semantic tags.","Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.","Understand why semantic architecture improves SEO and accessibility (a11y).","Construct a complete semantic page wireframe."],concept:{overview:'Early web developers built entire layouts with hundreds of `<div class="nav">`, `<div class="main">` tags ("div soup"). HTML5 introduced semantic elements that clearly describe their meaning to both browser and developer.',keyPoints:["<header> houses top branding, site title, and global search.","<nav> is specifically designated for primary navigation link lists.","<main> wraps the dominant, unique content of the page (only one per document).","<article> represents self-contained content that makes sense if syndicated on its own.","<section> groups related thematic content under a heading.","<aside> houses sidebars, related links, or author bios."],analogy:'Semantic tags are like labels on shipping boxes: "Fragile", "Books", "Kitchen". Without labels, all boxes look identical.'},teacherDemo:{title:"Full Semantic Webpage Skeleton",explanation:"Every piece of the page lives inside its appropriate semantic container.",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
  <title>BCA Tech Blog</title>
</head>
<body>
  <header>
    <h1>NextSem Developer Digest</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#articles">Articles</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Roadmap to Becoming a Software Engineer</h2>
      <p>BCA provides a foundation, but hands-on projects build your career.</p>
    </article>
    <aside>
      <h3>Recommended Tools</h3>
      <p>VS Code, Git, Chrome DevTools.</p>
    </aside>
  </main>

  <footer>
    <p>\xa9 2026 NextSem Academy. All rights reserved.</p>
  </footer>
</body>
</html>`},practicalLab:{labTitle:"Day 6 Coding Lab: Semantic Magazine Layout",labDescription:"Assemble a semantic layout using `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>`.",language:"html",initialCode:`<body>
  <!-- Build semantic structure here -->
</body>`,tasks:[{id:"d6-t1",title:"Assemble Header with Navigation",instruction:"Inside `<body>`, create a `<header>` containing a `<nav>` with at least one `<a>` link.",hint:'<header><nav><a href="#home">Home</a></nav></header>',validatorKeywords:["<header>","<nav>","<a","</nav>","</header>"],validatorRegex:"<header>[\\s\\S]*?<nav>[\\s\\S]*?<a[^>]*>[\\s\\S]+?<\\/a>[\\s\\S]*?<\\/nav>[\\s\\S]*?<\\/header>"},{id:"d6-t2",title:"Add Main Container with Article & Footer",instruction:"Below header, add a `<main>` containing an `<article>` with an `<h2>`, followed by a `<footer>`.",hint:"<main><article><h2>Title</h2><p>Text</p></article></main><footer><p>Footer</p></footer>",validatorKeywords:["<main>","<article>","<h2>","</h2>","</article>","</main>","<footer>","</footer>"],validatorRegex:"<main>[\\s\\S]*?<article>[\\s\\S]*?<h2[^>]*>[\\s\\S]+?<\\/h2>[\\s\\S]*?<\\/article>[\\s\\S]*?<\\/main>[\\s\\S]*?<footer>[\\s\\S]+?<\\/footer>"}]},debuggingChallenge:{title:"Spot the Bug: Multiple <main> Elements",buggyCode:`<body>
  <main>
    <h1>Dashboard</h1>
  </main>
  <main>
    <h2>Sidebar Details</h2>
  </main>
</body>`,bugExplanation:"The HTML5 specification forbids having more than one visible `<main>` element per document. Main must contain the central unique content; the second element should be an `<aside>` or `<section>`.",fixedCode:`<body>
  <main>
    <h1>Dashboard</h1>
    <aside>
      <h2>Sidebar Details</h2>
    </aside>
  </main>
</body>`},assignment:{title:"Homework Task: Semantic College Portal Homepage",instructions:["Create `college-portal.html` using 100% semantic tags.","Header: College emblem image, site title, top navigation.","Main: Feature Section with announcement banner; Department Articles for BCA, MCA, and B.Tech.","Aside: Upcoming exam notices and university notification links.","Footer: Address, contact info, and copyright."],submissionCriteria:'Inspect document outline in the browser to ensure no `<div class="header">` or `<div class="footer">` hacks are present.'},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 06: Semantic page architecture replacing legacy div soup",commands:["git add .",'git commit -m "Day 06: Semantic page architecture replacing legacy div soup"',"git push origin main"],tips:"Writing clean semantic HTML directly improves Google Lighthouse SEO & Accessibility scores."},vivaCheck:{question:"What is the primary difference between `<section>` and `<article>`?",options:["<section> is used for images only; <article> is used for audio.","<article> is independent and syndicatable on its own (like a blog post); <section> represents a thematic sub-grouping of content.","<section> can only appear inside a footer.","There is no distinction in HTML5."],correctAnswer:1,explanation:"An `<article>` is intended to be self-contained and independently distributable (e.g., newspaper story, widget, blog post). A `<section>` is a generic thematic grouping."}},{id:"day-7",day:7,year:1,semester:1,specialization:"foundation",title:"HTML Mini Project — Student Developer Profile Website",slug:"day-7-html-mini-project-student-profile-website",category:"HTML Foundation",estimatedTime:"2.5 Hours Practical",difficulty:"Intermediate",objectives:["Synthesize Days 1–6 into a complete, standalone portfolio webpage.","Combine headings, paragraphs, lists, tables, images, links, forms, and semantic elements.","Deploy the project on GitHub with a professional README.md file.","Verify 100% HTML5 validation compliance."],concept:{overview:"Projects convert isolated syntax lessons into engineering competence. In Day 7, you create your very first portfolio asset: an authentic, multi-section developer profile webpage.",keyPoints:["A portfolio proves practical capability to evaluators and prospective employers.","Pure HTML structure must be readable and organized even before CSS styles are applied.","Every project must have a clear `README.md` file explaining what was built.","Host the project on GitHub so anyone can review your source code."],analogy:'This is your developer identity card. When someone asks "What have you built?", this is your first real answer.'},teacherDemo:{title:"Blueprint: Complete Student Profile Structure",explanation:"A full-page architecture incorporating all learned elements cleanly.",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Aarav Patel | BCA Student Developer</title>
</head>
<body>
  <header>
    <h1>Aarav Patel</h1>
    <p>Aspiring Full-Stack Software Developer • BCA 1st Year</p>
    <nav>
      <a href="#about">About</a> | 
      <a href="#skills">Skills</a> | 
      <a href="#education">Education</a> | 
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>I am a BCA student passionate about <strong>practical software development</strong>.</p>
    </section>

    <section id="skills">
      <h2>Technical Skills</h2>
      <ul>
        <li>HTML5 & Semantic Markup</li>
        <li>Windows 11 Command Prompt</li>
        <li>Git & GitHub Version Control</li>
      </ul>
    </section>

    <section id="education">
      <h2>Academic Records</h2>
      <table border="1">
        <tr><th>Year</th><th>Degree</th><th>Institution</th></tr>
        <tr><td>2026</td><td>BCA (Sem 1)</td><td>NextSem Academy</td></tr>
      </table>
    </section>

    <section id="contact">
      <h2>Get In Touch</h2>
      <form action="/contact" method="POST">
        <label for="msg">Message:</label><br>
        <textarea id="msg" name="message" required></textarea><br>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>

  <footer>
    <p>Built with pure HTML5 • Connect on <a href="https://github.com">GitHub</a></p>
  </footer>
</body>
</html>`},practicalLab:{labTitle:"Day 7 Coding Lab: Assemble Your Profile Showcase",labDescription:"Assemble the core sections of your profile: Header with name, About section, Skills list, and Contact form.",language:"html",initialCode:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Profile</title>
</head>
<body>
  <!-- Build complete profile here -->
</body>
</html>`,tasks:[{id:"d7-t1",title:"Header with Profile Info & Navigation",instruction:"Add `<header>` containing `<h1>`, `<p>`, and a `<nav>` with at least two links.",hint:'<header><h1>Name</h1><p>Bio</p><nav><a href="#about">About</a> <a href="#contact">Contact</a></nav></header>',validatorKeywords:["<header>","<h1>","</h1>","<nav>","</a>","</header>"],validatorRegex:"<header>[\\s\\S]*?<h1>[\\s\\S]+?<\\/h1>[\\s\\S]*?<nav>[\\s\\S]*?<a[^>]*>[\\s\\S]+?<\\/a>[\\s\\S]*?<\\/nav>[\\s\\S]*?<\\/header>"},{id:"d7-t2",title:"Skills List & Contact Form",instruction:"Inside `<main>`, add an `<ul>` list of skills and a `<form>` containing a submit button.",hint:'<main><section><ul><li>HTML5</li></ul></section><section><form><button type="submit">Send</button></form></section></main>',validatorKeywords:["<main>","<ul>","<li>","</li>","</ul>","<form>",'<button type="submit">',"</form>","</main>"],validatorRegex:"<main>[\\s\\S]*?<ul>[\\s\\S]*?<li>[\\s\\S]+?<\\/li>[\\s\\S]*?<\\/ul>[\\s\\S]*?<form>[\\s\\S]*?<button[^>]*type=['\"]submit['\"][^>]*>[\\s\\S]+?<\\/button>[\\s\\S]*?<\\/form>[\\s\\S]*?<\\/main>"}]},debuggingChallenge:{title:"Spot the Bug: Broken Bookmark Anchor Jumps",buggyCode:`<a href="about">Jump to About</a>
...
<section name="about">
  <h2>About Section</h2>
</section>`,bugExplanation:'For internal anchor jumps, the href MUST begin with a hash symbol (`href="#about"`), and the target element must use `id="about"` instead of deprecated `name` attributes.',fixedCode:`<a href="#about">Jump to About</a>
...
<section id="about">
  <h2>About Section</h2>
</section>`},assignment:{title:"Mini Project Milestone: Deploy to GitHub Repository",instructions:["Create a new GitHub repository named `student-profile-html`.","Place `index.html` and your profile image in the repository.","Add a `README.md` file featuring: Project Title, Live Preview link, Built With (HTML5), and Author info.","Enable GitHub Pages in your repository settings under Settings > Pages > Deploy from Branch.","Test your live URL on your mobile phone."],submissionCriteria:"Submit your live GitHub Pages link and repository URL."},githubWorkflow:{repoName:"student-profile-html",commitMessage:"Day 07: Complete HTML5 student developer profile project",commands:["git init","git add .",'git commit -m "Day 07: Complete HTML5 student developer profile project"',"git branch -M main","git remote add origin https://github.com/YOUR_USERNAME/student-profile-html.git","git push -u origin main"],tips:"Congratulations! This is your first official GitHub project repository. Keep it clean and documented."},vivaCheck:{question:"What is the purpose of the `README.md` file in a GitHub project repository?",options:["It executes backend database migration scripts.","It documents what the project does, how to run it locally, and highlights author credentials for visitors and interviewers.","It hides private API keys from the public.","It automatically compiles TypeScript to JavaScript."],correctAnswer:1,explanation:"A professional README.md acts as the welcome documentation of a repository, explaining project purpose, installation steps, and showcase links."}},{id:"day-8",day:8,year:1,semester:1,specialization:"foundation",title:"CSS Introduction & Connecting CSS to HTML",slug:"day-8-css-introduction-and-connecting-css",category:"CSS Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Understand the role of CSS (Cascading Style Sheets).","Compare the 3 ways to add CSS: Inline, Internal (<style>), and External (<link>).","Master the syntax of CSS rule sets: Selector, Property, Value.","Link an external `style.css` file properly to your HTML head."],concept:{overview:"CSS styles and paints your HTML skeleton. While HTML defines meaning and structure, CSS controls colors, layouts, typography, responsiveness, and visual polish.",keyPoints:['Inline CSS (`style="..."`) is strongly discouraged because it clutters HTML and violates separation of concerns.',"Internal CSS (`<style>` in `<head>`) is suitable for single-page experiments.",'External CSS (`<link rel="stylesheet" href="style.css">`) is the industry standard for production websites.',"A CSS declaration consists of `property: value;` enclosed in curly braces `{}`."],analogy:"If HTML is the human skeleton, CSS is the skin, clothes, hairstyle, and shoes."},teacherDemo:{title:"Connecting External CSS to HTML",explanation:"Notice how the link tag pulls styles from an external file cleanly.",language:"html",code:`<!-- Inside index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Connection Demo</title>
  <!-- Standard External Stylesheet Link -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>NextSem CSS Mastery</h1>
  <p>This text is styled via an external stylesheet.</p>
</body>
</html>`},practicalLab:{labTitle:"Day 8 Coding Lab: Connect Styles to HTML",labDescription:"Link an external stylesheet via `<link>` and write your first internal style rules.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<head>
  <!-- Add link to style.css and style block here -->
</head>
<body>
  <h1>Hello CSS</h1>
</body>
</html>`,tasks:[{id:"d8-t1",title:"Add External Stylesheet Link",instruction:'Inside `<head>`, add a `<link>` tag with `rel="stylesheet"` and `href="style.css"`.',hint:'<link rel="stylesheet" href="style.css">',validatorKeywords:["<link",'rel="stylesheet"','href="style.css"'],validatorRegex:"<link[^>]*rel=['\"]stylesheet['\"][^>]*href=['\"]style\\.css['\"][^>]*>"},{id:"d8-t2",title:"Add Internal <style> Block",instruction:"Inside `<head>`, add a `<style>` block setting `h1 { color: #04AA6D; }`.",hint:"<style>h1 { color: #04AA6D; }</style>",validatorKeywords:["<style>","h1","color:","</style>"],validatorRegex:"<style>[\\s\\S]*?h1[\\s\\S]*?\\{[\\s\\S]*?color:[\\s\\S]*?\\}[\\s\\S]*?<\\/style>"}]},debuggingChallenge:{title:"Spot the Bug: Broken External Link Tag",buggyCode:'<link src="style.css" type="css">',bugExplanation:'`<link>` tags do NOT use `src`! They use `href` to target stylesheets and `rel="stylesheet"` to declare the relationship. Without these, the browser ignores the file completely.',fixedCode:'<link rel="stylesheet" href="style.css">'},assignment:{title:"Homework Task: Create Dedicated style.css File",instructions:["Open your Day 7 project or create a new folder `bca-day-8`.","Create `index.html` and `style.css` side-by-side.","Link `style.css` in `index.html`.","In `style.css`, reset body margin to 0 and set default font-family to sans-serif.","Change heading colors to `#0c1328` and paragraph line-height to 1.6."],submissionCriteria:"Confirm in Chrome DevTools Network tab (F12) that `style.css` returns HTTP Status 200."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 08: External CSS integration and stylesheet architecture",commands:["git add .",'git commit -m "Day 08: External CSS integration and stylesheet architecture"',"git push origin main"],tips:"Keep HTML files and CSS files in clean directory structures (e.g. `css/style.css`)."},vivaCheck:{question:"Which method of applying CSS has the highest specificity/precedence by default?",options:["External stylesheet linked via <link>","Internal stylesheet defined in <style>",'Inline style defined directly on an element via the style="..." attribute',"Browser user-agent default styles"],correctAnswer:2,explanation:"Inline styles have a specificity weight of (1,0,0,0), overriding external and internal style rules unless `!important` is used."}},{id:"day-9",day:9,year:1,semester:1,specialization:"foundation",title:"CSS Selectors & Basic Styling",slug:"day-9-css-selectors-and-basic-styling",category:"CSS Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Master element/type selectors, class selectors (`.class`), and ID selectors (`#id`).","Understand selector specificity and inheritance.","Use descendant selectors (`div p`) and grouping selectors (`h1, h2, h3`).","Apply hover pseudo-classes (`:hover`, `:active`, `:focus`)."],concept:{overview:"CSS Selectors dictate WHICH HTML elements your style rules target. Mastering selectors gives you pinpoint control over styling without writing redundant code.",keyPoints:["Element selectors target every instance of an HTML tag (e.g. `p { ... }`).","Class selectors (`.badge`) can be reused across any number of elements.","ID selectors (`#navbar`) target a single unique element on the page.","Pseudo-classes like `:hover` style elements based on user interaction states."],analogy:'Selectors are like search filters. Element is "everyone wearing a shirt", class is "everyone on Team Blue", and ID is "Rahul Sharma specifically".'},teacherDemo:{title:"Class vs ID vs Pseudo-Class Styles",explanation:"See how classes enable modular, reusable styling.",language:"css",code:`/* Element Selector */
body {
  font-family: Arial, sans-serif;
  color: #333333;
}

/* Reusable Class Selector */
.btn-primary {
  background-color: #04AA6D;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease;
}

/* Interactive Hover State */
.btn-primary:hover {
  background-color: #038a58;
}

/* Unique ID Selector */
#main-header {
  border-bottom: 2px solid #e2e8f0;
  padding: 16px 0;
}`},practicalLab:{labTitle:"Day 9 Coding Lab: Card Styling with Classes",labDescription:"Apply a class named `.card` to style a container and style a button with a hover effect.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add .card and .card:hover styles here */
  </style>
</head>
<body>
  <div class="card">
    <h2>Specialization Course</h2>
    <p>Learn Full Stack Web Development.</p>
  </div>
</body>
</html>`,tasks:[{id:"d9-t1",title:"Style the .card Class",instruction:"In the `<style>` block, create a `.card` rule setting `padding: 20px;` and `background-color: #0c1328;`.",hint:".card { padding: 20px; background-color: #0c1328; }",validatorKeywords:[".card","padding:","background-color:"],validatorRegex:"\\.card[\\s\\S]*?\\{[\\s\\S]*?padding:[\\s\\S]*?background-color:[\\s\\S]*?\\}"},{id:"d9-t2",title:"Add Hover State",instruction:"Add a `.card:hover` rule setting a different border or background.",hint:".card:hover { border: 1px solid #04AA6D; }",validatorKeywords:[".card:hover","{","}"],validatorRegex:"\\.card:hover[\\s\\S]*?\\{[\\s\\S]+?\\}"}]},debuggingChallenge:{title:"Spot the Bug: Confusing Dot and Hash in Selectors",buggyCode:`/* Trying to style <button id="submitBtn" class="btn"> */
#btn {
  color: red;
}
.submitBtn {
  background: blue;
} `,bugExplanation:"Dots (`.`) are for CLASSES, and hashes (`#`) are for IDs! The developer inverted them. The selector should be `#submitBtn` and `.btn`.",fixedCode:`.btn {
  color: red;
}
#submitBtn {
  background: blue;
}`},assignment:{title:"Homework Task: Component Library Card Sheet",instructions:["Create a webpage demonstrating 4 reusable button variants using classes:","`.btn-success` (Green background), `.btn-danger` (Red background), `.btn-warning` (Amber background), and `.btn-outline` (Transparent with border).","Add smooth `:hover` transition effects to all buttons.","Use grouping selectors (`.btn-success, .btn-danger, ...`) for shared padding and font styles."],submissionCriteria:"Ensure all buttons use shared classes to prevent repeating code (DRY - Don’t Repeat Yourself)."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 09: CSS selectors hierarchy and reusable UI component classes",commands:["git add .",'git commit -m "Day 09: CSS selectors hierarchy and reusable UI component classes"',"git push origin main"],tips:"Organize your styles with comments separating base styles, layout, and component classes."},vivaCheck:{question:"Which of the following selectors has the highest CSS specificity value?",options:["div.card (Element + Class)","#profile-header (ID Selector)",".navbar .nav-link (Two Classes)","p (Element Selector)"],correctAnswer:1,explanation:"An ID selector has specificity (0,1,0,0), which overrides any number of classes (0,0,x,0) and element selectors (0,0,0,x)."}},{id:"day-10",day:10,year:1,semester:1,specialization:"foundation",title:"CSS Colors, Fonts & Text Styling",slug:"day-10-css-colors-fonts-and-text-styling",category:"CSS Foundation",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Understand color representations: Hex codes (`#04AA6D`), RGB/RGBA (`rgba(0,0,0,0.5)`), and HSL.","Import Google Fonts (@import or <link>) into web documents.","Control typography: `font-size`, `font-weight`, `line-height`, `letter-spacing`.","Format text layouts with `text-align`, `text-transform`, and `text-decoration`."],concept:{overview:"Typography and curated color harmony dictate 90% of user trust and perception on a website. Modern web apps use tailored HSL/Hex color palettes and crisp web fonts instead of generic browser defaults.",keyPoints:["Hex codes (`#ffffff`) represent red, green, and blue hex channels (00 to FF).","RGBA adds an Alpha channel (0.0 to 1.0) for transparent overlays and glassmorphism.",'Always provide fallback font families (e.g., `font-family: "Inter", sans-serif;`).',"Maintain a readable `line-height` of at least 1.5 to 1.6 for body paragraphs."],analogy:"Colors set the emotional mood of your room, while fonts are the voice tone in which your website speaks."},teacherDemo:{title:"Modern Typography & Google Font Integration",explanation:"Notice how importing the Inter font transforms the visual elegance immediately.",language:"css",code:`/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #060c18;
  color: #f1f5f9;
  line-height: 1.6;
}

h1 {
  color: #ffffff;
  font-size: 2.25rem; /* 36px */
  font-weight: 800;
  letter-spacing: -0.025em;
}

.text-accent {
  color: #04AA6D;
  font-weight: 600;
}

.subtitle {
  color: #94a3b8;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`},practicalLab:{labTitle:"Day 10 Coding Lab: High-Contrast Dark Mode Card",labDescription:"Style a dark-mode content showcase card with curated colors, line height, and font weights.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Write typography and color styles here */
  </style>
</head>
<body>
  <div class="promo-box">
    <h1>NextSem Developer Pro</h1>
    <p class="desc">Build real-world production projects every day.</p>
  </div>
</body>
</html>`,tasks:[{id:"d10-t1",title:"Set Dark Background & Crisp Text Color",instruction:"In `<style>`, set `.promo-box` with `background-color: #0c1328;` and `color: #ffffff;`.",hint:".promo-box { background-color: #0c1328; color: #ffffff; padding: 24px; }",validatorKeywords:[".promo-box","background-color:","#0c1328","color:","#ffffff"],validatorRegex:"\\.promo-box[\\s\\S]*?\\{[\\s\\S]*?background-color:\\s*#0c1328[\\s\\S]*?color:\\s*#ffffff[\\s\\S]*?\\}"},{id:"d10-t2",title:"Configure Line-Height & Letter-Spacing",instruction:"Add a `.desc` rule setting `line-height: 1.6;` and `color: #94a3b8;`.",hint:".desc { line-height: 1.6; color: #94a3b8; }",validatorKeywords:[".desc","line-height:","1.6"],validatorRegex:"\\.desc[\\s\\S]*?\\{[\\s\\S]*?line-height:\\s*1\\.6[\\s\\S]*?\\}"}]},debuggingChallenge:{title:"Spot the Bug: Font Name with Spaces Missing Quotes",buggyCode:`body {
  font-family: Open Sans, sans-serif;
}`,bugExplanation:"Font family names containing whitespace (e.g. `Open Sans`, `Courier New`) MUST be wrapped in quotation marks. Otherwise, some browsers will fail to parse the font declaration.",fixedCode:`body {
  font-family: "Open Sans", sans-serif;
}`},assignment:{title:"Homework Task: Themed Tech Article Layout",instructions:['Import a Google Font of your choice (e.g., "Outfit", "Poppins", or "Inter").',"Create a dark-themed blog article with a curated color palette: Background `#060c18`, Surface Card `#0c1328`, Primary Text `#ffffff`, Accent `#04AA6D`, Muted `#94a3b8`.","Apply `line-height: 1.7` to paragraphs to ensure optimal readability.","Add a call-out quote block with an italic font and an emerald green left border."],submissionCriteria:"Verify that your color contrast ratio passes WCAG AA accessibility standards."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 10: Google Fonts typography, dark theme color harmony and text metrics",commands:["git add .",'git commit -m "Day 10: Google Fonts typography, dark theme color harmony and text metrics"',"git push origin main"],tips:"You have completed the first 10 days of your 3-Year (360-Day) practical journey! Inspect your GitHub repository to celebrate your 10 commits."},vivaCheck:{question:"What does the fourth value in `rgba(4, 170, 109, 0.5)` represent?",options:["Hue rotation degree","Alpha channel representing opacity (transparency) from 0.0 (transparent) to 1.0 (opaque)","Brightness enhancement level","Saturation percentage"],correctAnswer:1,explanation:"The `a` in RGBA stands for Alpha, which controls the opacity of the color from 0.0 (100% transparent) to 1.0 (100% solid)."}},{id:"day-11",day:11,year:1,semester:1,specialization:"foundation",title:"CSS Box Model: Margin, Border, Padding & Content",slug:"day-11-css-box-model-margin-border-padding-content",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Understand the 4 layers of the CSS Box Model: Content, Padding, Border, Margin.","Differentiate between `box-sizing: content-box` and `box-sizing: border-box`.","Understand margin collapse behavior on vertical adjacent blocks.","Apply universal box-sizing reset `* { box-sizing: border-box; }` across all projects."],concept:{overview:"Every visible element in the browser viewport is a rectangular box. The Box Model dictates how width, padding, borders, and margins calculate final rendered dimensions on screen.",keyPoints:["Content: The raw text, image, or video nested inside the element.","Padding: Clears space INSIDE the border, around the content. Inherits background color.","Border: The boundary line encasing the padding and content.","Margin: Clears space OUTSIDE the border, separating the element from neighboring elements.","box-sizing: border-box ensures padding and borders DO NOT expand the total element width."],analogy:"Think of a picture frame: The photo is Content, the white cardboard matting is Padding, the wooden frame is Border, and the wall space between adjacent frames is Margin."},teacherDemo:{title:"Comparing content-box vs border-box",explanation:"Notice how border-box keeps the element width exactly 300px without spilling over.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 11 Coding Lab: Precision Box Model Card",labDescription:"Configure a card with 20px padding, a 2px solid border, 16px bottom margin, and border-box sizing.",language:"html",initialCode:`<style>
  .profile-card {
    width: 280px;
    /* Add padding, border, margin, and box-sizing below */
    background: #ffffff;
  }
</style>
<div class="profile-card">
  <h2>Er. Manoj Kumar</h2>
  <p>BCA Curriculum Architect & Software Engineer</p>
</div>`,tasks:[{id:"d11-t1",title:"Add Padding and Border-Box",instruction:"Add `padding: 20px;` and `box-sizing: border-box;` to .profile-card.",hint:"Include padding: 20px; box-sizing: border-box; inside the .profile-card CSS rule.",validatorKeywords:["padding:","box-sizing:","border-box"],validatorRegex:"padding:s*20px[sS]*?box-sizing:s*border-box"},{id:"d11-t2",title:"Add Border and Margin",instruction:"Add a `border: 2px solid #2563eb;` and `margin-bottom: 16px;`.",hint:"Write border: 2px solid #2563eb; and margin-bottom: 16px;.",validatorKeywords:["border:","margin-bottom:"],validatorRegex:"border:s*2pxs+solid[sS]*?margin-bottom:s*16px"}]},debuggingChallenge:{title:"Spot the Bug: Card Overflowing Container Due to content-box",buggyCode:`.container {
  width: 500px;
}
.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  /* Missing box-sizing causes total width to become 570px! */
}`,bugExplanation:"With default content-box, total width = 500 + 30*2 (padding) + 5*2 (border) = 570px, which breaks and overflows the 500px container!",fixedCode:`.sidebar {
  width: 500px;
  padding: 30px;
  border: 5px solid red;
  box-sizing: border-box; /* Total width is clamped strictly to 500px */
}`},assignment:{title:"Homework Task: Notification Alert Cards",instructions:["Create a folder named `day-11` in your repository.","Create an `index.html` file and define a universal reset `* { box-sizing: border-box; margin: 0; padding: 0; }`.","Build 3 alert cards: Success (green border), Warning (amber border), and Error (rose border).","Give each card `padding: 18px;`, `margin: 12px 0;`, and a rounded border of `border-radius: 12px;`."],submissionCriteria:"Inspect elements in Chrome DevTools Box Model visualizer to verify margin, border, padding."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 11: CSS Box Model, border-box dimensions and margin spacing",commands:["mkdir day-11","cd day-11","git add .",'git commit -m "Day 11: CSS Box Model, border-box dimensions and margin spacing"',"git push origin main"],tips:"Always use border-box in modern frontend web development to eliminate accidental overflow horizontal scrollbars."},vivaCheck:{question:"What is the default value of the CSS `box-sizing` property if unspecified?",options:["border-box","content-box","padding-box","margin-box"],correctAnswer:1,explanation:"The browser default is content-box, where padding and borders add onto the specified width/height rather than being absorbed inside it."}},{id:"day-12",day:12,year:1,semester:1,specialization:"foundation",title:"CSS Display Property: Block, Inline, Inline-Block & None",slug:"day-12-css-display-block-inline-inline-block-none",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Master block-level vs inline-level element behavior in normal document flow.","Understand why inline elements ignore top/bottom margin and explicit height/width.","Use `inline-block` to create multi-item button bars and inline tags.","Contrast `display: none` (removes element from layout flow) vs `visibility: hidden` (leaves invisible blank space)."],concept:{overview:"The `display` property is the fundamental switch controlling how an element participates in CSS formatting contexts.",keyPoints:["block: Starts on a new line and stretches across full available container width (e.g. <div>, <h1>, <p>).","inline: Does not start on a new line; only occupies space needed for its content. Width and height properties have NO effect.","inline-block: Sits in a line with surrounding text, but respects width, height, padding, and vertical margins.","display: none completely removes the element from rendering tree (zero layout footprint)."],analogy:"Block is like a full-width parking spot for a bus. Inline is like words flowing on a typed line. Inline-block is like a picture stamp glued right inside a sentence."},teacherDemo:{title:"Horizontal Button Bar with inline-block",explanation:"Converting list items into interactive inline-block pill buttons.",language:"html",code:`<style>
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
<span class="tag-item">JavaScript</span>`},practicalLab:{labTitle:"Day 12 Coding Lab: Inline-Block Navigation Buttons",labDescription:"Transform anchor links into pill buttons by setting display to inline-block with padding and border.",language:"html",initialCode:`<style>
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
</nav>`,tasks:[{id:"d12-t1",title:"Apply display: inline-block",instruction:"Add `display: inline-block;` to .btn-link.",hint:"Write display: inline-block; inside .btn-link.",validatorKeywords:["display:","inline-block"],validatorRegex:"display:s*inline-block"},{id:"d12-t2",title:"Add Padding and Margin",instruction:"Add `padding: 8px 18px;` and `margin-right: 10px;`.",hint:"Include padding: 8px 18px; and margin-right: 10px;.",validatorKeywords:["padding:","margin-right:"],validatorRegex:"padding:s*8pxs+18px[sS]*?margin-right:s*10px"}]},debuggingChallenge:{title:"Spot the Bug: Width Ignored on Inline Anchor Tag",buggyCode:`a.hero-btn {
  display: inline;
  width: 220px;
  height: 50px;
  padding: 10px;
}`,bugExplanation:"Elements with `display: inline` strictly ignore width and height CSS properties according to the W3C CSS specification.",fixedCode:`a.hero-btn {
  display: inline-block; /* Now width and height are strictly honored */
  width: 220px;
  height: 50px;
  padding: 10px;
}`},assignment:{title:"Homework Task: Tech Skill Badge Cloud",instructions:["Create folder `day-12` with `index.html`.","Create a skill cloud section containing 8 developer skill badges (e.g. Linux, Git, HTML, C, Python).","Style each badge with `display: inline-block`, distinct background colors, and `cursor: pointer`.","Add a secret badge with class `.hidden-badge` styled with `display: none`."],submissionCriteria:"Inspect element in browser to verify inline-block layout and absence of DOM reflow issues."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 12: CSS display modes, block vs inline-block and badge cloud",commands:["mkdir day-12","cd day-12","git add .",'git commit -m "Day 12: CSS display modes, block vs inline-block and badge cloud"',"git push origin main"],tips:"Use inline-block when you need buttons to sit side-by-side but retain explicit box padding and height."},vivaCheck:{question:"What is the visual difference between `display: none` and `visibility: hidden`?",options:["There is zero difference; they both behave identically.","display: none removes the element completely from page layout, while visibility: hidden hides it visually but still occupies space.","visibility: hidden deletes the element from HTML DOM permanently.","display: none makes the text transparent while keeping borders visible."],correctAnswer:1,explanation:"display: none causes the browser to not render the element at all, freeing its space. visibility: hidden renders a blank empty space of the exact same size."}},{id:"day-13",day:13,year:1,semester:1,specialization:"foundation",title:"CSS Positioning: Static, Relative, Absolute & Fixed",slug:"day-13-css-positioning-static-relative-absolute-fixed",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Understand normal document flow and default `position: static`.","Use `position: relative` as an offset reference and coordinate anchor.","Use `position: absolute` with top/right/bottom/left to overlay badges and popups.","Use `position: fixed` to stick navigation bars or announcement headers to the viewport."],concept:{overview:"CSS Positioning takes elements out of their natural document flow and pins them to coordinate offsets relative to parents, viewports, or ancestor bounds.",keyPoints:["static: Default flow. top, right, bottom, left properties have NO effect.","relative: Element is offset relative to its own normal position without disrupting neighboring flow.","absolute: Element is removed from normal flow and positioned relative to its closest non-static ancestor (usually a position: relative parent).","fixed: Element is pinned relative to the browser viewport window and stays fixed during scrolling.","z-index: Controls stacking order on the 3D depth axis (higher number stacks on top)."],analogy:"Relative is like claiming your chair in a room. Absolute is sticking a sticky note on the corner of that chair. Fixed is taping a sticker directly onto the camera lens."},teacherDemo:{title:"Card with Floating Top-Right Badge",explanation:"Parent uses position: relative; Badge uses position: absolute.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 13 Coding Lab: Floating Notification Badge Card",labDescription:'Position a "NEW" badge at top: 10px and right: 10px inside a position: relative parent card.',language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d13-t1",title:"Anchor Parent with position: relative",instruction:"Add `position: relative;` to .card-container.",hint:"Write position: relative; inside .card-container.",validatorKeywords:["position:","relative"],validatorRegex:"position:s*relative"},{id:"d13-t2",title:"Float Badge with position: absolute",instruction:"Add `position: absolute;`, `top: 10px;`, and `right: 10px;` to .card-badge.",hint:"Set position: absolute; top: 10px; right: 10px; in .card-badge.",validatorKeywords:["position:","absolute","top:","right:"],validatorRegex:"position:s*absolute[sS]*?top:s*10px[sS]*?right:s*10px"}]},debuggingChallenge:{title:"Spot the Bug: Absolute Child Escaping Outside Container",buggyCode:`.card-wrapper {
  /* Missing position: relative on container! */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  /* Button shoots to the top-right corner of the whole screen! */
}`,bugExplanation:"An absolute child looks for the nearest positioned ancestor. If no parent has position: relative/absolute, it positions relative to the <body> tag!",fixedCode:`.card-wrapper {
  position: relative; /* Now acts as the boundary origin for absolute children */
  width: 400px;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}`},assignment:{title:"Homework Task: Pinned Bottom Notification Bar",instructions:["Create folder `day-13` with `index.html`.","Build a long scrolling page with several dummy paragraphs.","Create a bottom announcement bar styled with `position: fixed; bottom: 0; left: 0; width: 100%;`.","Add a high `z-index: 100` so it stays floating above all scrolling page content."],submissionCriteria:"Scroll the webpage in Chrome to verify the bottom bar never moves or disappears."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 13: CSS positioning coordinate systems, absolute badges and fixed bars",commands:["mkdir day-13","cd day-13","git add .",'git commit -m "Day 13: CSS positioning coordinate systems, absolute badges and fixed bars"',"git push origin main"],tips:"Whenever using position: absolute, always double-check that the immediate parent has position: relative."},vivaCheck:{question:"Why must a parent container have `position: relative` when placing an `absolute` child inside it?",options:["It triggers hardware GPU animation rendering.","It establishes the parent as the coordinate origin (bounding box) for the absolute child.","It changes the parent background color automatically.","It makes the parent float to the left."],correctAnswer:1,explanation:"An absolute element calculates its top/right/bottom/left coordinates relative to its nearest positioned ancestor. Giving the parent position: relative locks the coordinate origin to the parent bounds."}},{id:"day-14",day:14,year:1,semester:1,specialization:"foundation",title:"Flexbox Architecture 1: Flex Container & Justify-Content",slug:"day-14-flexbox-container-direction-justify-content",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Understand the 1-dimensional Flexible Box (Flexbox) layout model.","Differentiate between the Main Axis and Cross Axis.","Use `display: flex` to align elements horizontally with zero float hacks.","Master `justify-content` alignment modes: center, space-between, space-around, space-evenly."],concept:{overview:"CSS Flexbox revolutionized web design by providing a predictable, 1-dimensional layout system that automatically distributes space and aligns items along an axis.",keyPoints:["display: flex: Applied to the parent container, transforming all direct children into flex items.","flex-direction: Sets the main axis (row is horizontal left-to-right, column is vertical top-to-bottom).","justify-content: Distributes items along the MAIN axis.","justify-content: space-between pushes first item to start, last item to end, and spaces the rest evenly.","gap: Replaces old margin hacks by setting clean gutters between flex children."],analogy:"Imagine books on a shelf: Flexbox lets you push them to the left, center them, or spread them out with equal breathing room automatically."},teacherDemo:{title:"Modern Header Bar with space-between",explanation:"Logo on the left, navigation links on the right, perfectly spaced.",language:"html",code:`<style>
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
</header>`},practicalLab:{labTitle:"Day 14 Coding Lab: Space-Between Flexbox Header",labDescription:"Create a flex container that spaces its logo and navigation links apart using justify-content: space-between and a 20px gap.",language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d14-t1",title:"Activate Flexbox on Header",instruction:"Add `display: flex;` and `justify-content: space-between;` to .app-header.",hint:"Write display: flex; justify-content: space-between; in .app-header.",validatorKeywords:["display:","flex","justify-content:","space-between"],validatorRegex:"display:s*flex[sS]*?justify-content:s*space-between"},{id:"d14-t2",title:"Add Flex Gap to Actions",instruction:"Add `display: flex;` and `gap: 16px;` to .header-actions.",hint:"Write display: flex; gap: 16px; inside .header-actions.",validatorKeywords:["display:","gap:","16px"],validatorRegex:"display:s*flex[sS]*?gap:s*16px"}]},debuggingChallenge:{title:"Spot the Bug: justify-content Applied to Children Instead of Container",buggyCode:`<div class="header">
  <div class="logo" style="justify-content: space-between;">Logo</div>
  <div class="nav">Links</div>
</div>`,bugExplanation:"`justify-content` is a FLEX CONTAINER property. It must be applied to the parent element (.header), not to an individual child item.",fixedCode:`.header {
  display: flex;
  justify-content: space-between; /* Properly placed on parent flex container */
}`},assignment:{title:"Homework Task: Social Media Share Toolbar",instructions:["Create folder `day-14` with `index.html`.","Create a toolbar containing 4 buttons (WhatsApp, LinkedIn, GitHub, Copy Link).","Use `display: flex; justify-content: center; gap: 12px;` to center all buttons perfectly.","Add hover background color changes to each button."],submissionCriteria:"Inspect in Chrome DevTools to ensure gap spacing is active and zero margin hacks are used."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 14: Flexbox main axis alignment, space-between navbars and gap property",commands:["mkdir day-14","cd day-14","git add .",'git commit -m "Day 14: Flexbox main axis alignment, space-between navbars and gap property"',"git push origin main"],tips:"Never use float: left or inline-block margins for navbars when Flexbox justify-content: space-between exists."},vivaCheck:{question:"What is the default direction of the main axis in a CSS Flexbox container?",options:["column (vertical)","row (horizontal left-to-right)","row-reverse","diagonal"],correctAnswer:1,explanation:"The initial default value of flex-direction is row, meaning items are arranged horizontally from left to right along the main axis."}},{id:"day-15",day:15,year:1,semester:1,specialization:"foundation",title:"Flexbox Architecture 2: Align-Items, Flex-Wrap & Responsive Cards",slug:"day-15-flexbox-align-items-flex-wrap-responsive-cards",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Master cross-axis vertical alignment with `align-items: center | stretch | flex-start`.","Use `flex-wrap: wrap` so multi-card layouts wrap gracefully without horizontal squishing.","Understand flex item sizing with `flex: 1` and `flex-basis`.","Build a multi-card responsive grid using pure Flexbox."],concept:{overview:"While justify-content aligns items horizontally, `align-items` aligns them vertically along the cross axis, and `flex-wrap` allows items to drop down to new lines when container space runs out.",keyPoints:["align-items: Controls item alignment across the CROSS axis (perpendicular to main axis).","align-items: center centers elements vertically inside the container.","flex-wrap: nowrap is default (forces all items onto a single cramped line).","flex-wrap: wrap lets items wrap into multiple rows naturally.","flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0% (absorbs equal leftover space)."],analogy:"Imagine words wrapping in a paragraph when you hit the right margin of a page. flex-wrap: wrap does that for cards!"},teacherDemo:{title:"Responsive Flex Card Grid with Wrapping",explanation:"Cards expand equally with flex: 1 and wrap onto new lines on smaller screens.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 15 Coding Lab: Centered Feature Cards with Wrap",labDescription:"Create a flex card container with flex-wrap: wrap, align-items: center, and 16px gap.",language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d15-t1",title:"Configure Flexbox with Wrap",instruction:"Add `display: flex;` and `flex-wrap: wrap;` to .showcase-container.",hint:"Write display: flex; flex-wrap: wrap; inside .showcase-container.",validatorKeywords:["display:","flex","flex-wrap:","wrap"],validatorRegex:"display:s*flex[sS]*?flex-wrap:s*wrap"},{id:"d15-t2",title:"Add Alignment and Gap",instruction:"Add `align-items: center;` and `gap: 16px;` to .showcase-container.",hint:"Include align-items: center; gap: 16px;.",validatorKeywords:["align-items:","center","gap:","16px"],validatorRegex:"align-items:s*center[sS]*?gap:s*16px"}]},debuggingChallenge:{title:"Spot the Bug: Cards Squished to Unreadable Thin Strips",buggyCode:`.gallery {
  display: flex;
  gap: 20px;
  /* Missing flex-wrap forces 10 wide cards into a single tiny line! */
}
.gallery-item {
  width: 300px;
}`,bugExplanation:"By default, flex-wrap is nowrap. Flexbox shrinks all children to prevent breaking into new lines, squishing cards into unreadable thin slivers.",fixedCode:`.gallery {
  display: flex;
  flex-wrap: wrap; /* Allows cards to drop onto the next row gracefully */
  gap: 20px;
}`},assignment:{title:"Homework Task: BCA 6-Semester Roadmap Cards",instructions:["Create folder `day-15` with `index.html`.","Build a container with 6 cards representing Semesters 1 through 6.","Use `display: flex; flex-wrap: wrap; gap: 16px;` with cards sized at `flex: 1 1 280px;`.","Inspect how resizing the browser window causes 3 columns -> 2 columns -> 1 column smoothly."],submissionCriteria:"Verify using responsive inspect mode that cards never overflow horizontally on mobile."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 15: Flex-wrap responsive cards, align-items cross axis centering",commands:["mkdir day-15","cd day-15","git add .",'git commit -m "Day 15: Flex-wrap responsive cards, align-items cross axis centering"',"git push origin main"],tips:"Whenever building card grids with Flexbox, always set flex-wrap: wrap so mobile screens wrap gracefully."},vivaCheck:{question:"Which CSS property vertically centers items in a standard horizontal (`flex-direction: row`) flex container?",options:["justify-content: center","align-items: center","vertical-align: middle","text-align: center"],correctAnswer:1,explanation:"align-items controls alignment along the cross axis. In row direction, the cross axis is vertical, so align-items: center centers items vertically."}},{id:"day-16",day:16,year:1,semester:1,specialization:"foundation",title:"CSS Grid System 1: Templates, Columns & Fractional Units",slug:"day-16-css-grid-templates-columns-rows-fractional-units",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Understand the 2-dimensional CSS Grid layout model (rows AND columns simultaneously).","Use `display: grid` on container parents.","Master `grid-template-columns` with fractional units (`1fr`) and `repeat()` notation.","Control column and row spacing using `gap: 24px`."],concept:{overview:"CSS Grid is a 2-dimensional layout engine designed for organizing content into precise rows and columns simultaneously, making complex multi-column layouts effortless.",keyPoints:["display: grid: Enables the 2D grid formatting context.","1fr (Fractional Unit): Represents a fraction of the available free space in the grid container.","grid-template-columns: repeat(3, 1fr) creates 3 equal-width responsive columns.","Unlike Flexbox (1-directional), Grid aligns items across both horizontal and vertical axes simultaneously."],analogy:"Flexbox is like stringing beads on a necklace (1D line). CSS Grid is like an Excel spreadsheet or graph paper with defined rows and columns (2D grid)."},teacherDemo:{title:"3-Column Grid with Fractional Units",explanation:"Equal 3-column dashboard using repeat(3, 1fr) and 20px gap.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 16 Coding Lab: 3-Column CSS Grid Dashboard",labDescription:"Create a 3-column CSS Grid using repeat(3, 1fr) and gap: 20px.",language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d16-t1",title:"Activate Grid with repeat(3, 1fr)",instruction:"Add `display: grid;` and `grid-template-columns: repeat(3, 1fr);` to .stats-grid.",hint:"Write display: grid; grid-template-columns: repeat(3, 1fr); in .stats-grid.",validatorKeywords:["display:","grid","grid-template-columns:","repeat(3, 1fr)"],validatorRegex:"display:s*grid[sS]*?grid-template-columns:s*repeat(3,s*1fr)"},{id:"d16-t2",title:"Add Grid Gap",instruction:"Add `gap: 20px;` to .stats-grid.",hint:"Include gap: 20px; inside .stats-grid.",validatorKeywords:["gap:","20px"],validatorRegex:"gap:s*20px"}]},debuggingChallenge:{title:"Spot the Bug: Fixed Pixel Columns Overflowing on Mobile",buggyCode:`.container {
  display: grid;
  grid-template-columns: 400px 400px 400px; /* Total 1200px breaks on mobile screens! */
}`,bugExplanation:"Using fixed pixel widths prevents columns from shrinking to fit smaller screens. Fractional units (1fr) scale dynamically to container bounds.",fixedCode:`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Dynamically fills available space */
}`},assignment:{title:"Homework Task: Student Portfolio Project Gallery",instructions:["Create folder `day-16` with `index.html`.","Create a 6-item project showcase gallery.","Use `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;`.","Style each project card with title, tech stack badge, and a GitHub view button."],submissionCriteria:"Inspect grid track lines in Chrome DevTools Grid Inspector overlay."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units",commands:["mkdir day-16","cd day-16","git add .",'git commit -m "Day 16: CSS Grid 2D layout, repeat syntax and fractional fr units"',"git push origin main"],tips:"Fractional units (fr) represent proportional fractions of remaining space and prevent horizontal overflow."},vivaCheck:{question:"What does 1fr mean in CSS Grid?",options:["1 fixed frame rate unit","1 fraction of the available free space in the grid container","1 font relative rem scale","100 pixels in standard resolution"],correctAnswer:1,explanation:"fr stands for fractional unit, representing a fraction of the unused space available inside the grid container."}},{id:"day-17",day:17,year:1,semester:1,specialization:"foundation",title:"CSS Grid System 2: Spanning & Newspaper Magazine Layout",slug:"day-17-css-grid-areas-spanning-newspaper-layout",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Master track spanning using `grid-column: span 2` and `grid-row: span 2`.","Build asymmetrical hero grids with featured large articles.","Understand grid line numbering (line 1, line 2, line -1).","Create a classic newspaper / tech magazine editorial layout."],concept:{overview:"Grid items do not have to be uniform squares. Using column and row spanning, individual grid items can stretch across multiple tracks to create captivating editorial designs.",keyPoints:["grid-column: span 2: Makes the item occupy 2 horizontal column tracks.","grid-row: span 2: Makes the item stretch across 2 vertical row tracks.","grid-column: 1 / -1: Spans full width from first grid line to the very last.","Asymmetric grid layouts draw visual attention to lead stories or primary calls to action."],analogy:"Look at the front page of a newspaper: The lead headline spans across 4 columns, while smaller side stories occupy single columns."},teacherDemo:{title:"Magazine Editorial Grid with Featured Hero Item",explanation:"First item spans 2 columns to dominate visual hierarchy.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 17 Coding Lab: Hero Banner Column Span",labDescription:"Make the .hero-card span 2 columns using grid-column: span 2 inside a 3-column grid.",language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d17-t1",title:"Span 2 Columns on Hero Card",instruction:"Add `grid-column: span 2;` to .hero-card.",hint:"Write grid-column: span 2; in .hero-card.",validatorKeywords:["grid-column:","span 2"],validatorRegex:"grid-column:s*spans+2"}]},debuggingChallenge:{title:"Spot the Bug: Column Span Exceeding Total Grid Tracks",buggyCode:`.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Container only has 2 columns! */
}
.banner {
  grid-column: span 4; /* Spanning 4 columns on a 2-column grid creates empty ghost tracks */
}`,bugExplanation:"Spanning more columns than defined in grid-template-columns forces the browser into implicit grid creation, breaking the intended layout.",fixedCode:`.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Defined 4 columns allows span 4 properly */
}
.banner {
  grid-column: span 4;
}`},assignment:{title:"Homework Task: Tech News Editorial Dashboard",instructions:["Create folder `day-17` with `index.html`.","Build a 4-column news magazine layout.","Lead story: Spans 2 columns and 2 rows (`grid-column: span 2; grid-row: span 2;`).","Add 4 regular news cards filling the remaining grid slots.","Add a full-width footer spanning all 4 columns (`grid-column: 1 / -1;`)."],submissionCriteria:"Inspect in Chrome DevTools to verify exact grid line coordinates."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing",commands:["mkdir day-17","cd day-17","git add .",'git commit -m "Day 17: CSS Grid spanning, asymmetric editorial layouts and line indexing"',"git push origin main"],tips:"Use grid-column: 1 / -1 to effortlessly span an item across the entire width of any grid."},vivaCheck:{question:"What does `grid-column: 1 / -1` accomplish on a CSS Grid item?",options:["It hides the element from view.","It spans the element across the entire width of the grid, from the very first to the very last column line.","It sets the width to negative 1 pixel.","It rotates the column upside down."],correctAnswer:1,explanation:"In CSS Grid line numbering, -1 refers to the last line of the explicit grid. 1 / -1 spans from the start line to the end line, covering 100% of the columns."}},{id:"day-18",day:18,year:1,semester:1,specialization:"foundation",title:"Responsive Design & Media Queries: Mobile-First Strategy",slug:"day-18-responsive-design-media-queries-mobile-first",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Understand Responsive Web Design (RWD) principles and fluid layouts.","Configure the critical viewport meta tag in the HTML head.","Write mobile-first CSS media queries using `@media (min-width: 768px)`.","Transform single-column mobile layouts into multi-column desktop layouts seamlessly."],concept:{overview:"Over 60% of web traffic originates from mobile devices. Responsive Web Design ensures websites adapt fluidly across phones, tablets, and wide desktop monitors using CSS Media Queries.",keyPoints:["Mobile-First Strategy: Write default CSS for small screens first, then use min-width media queries to enhance layouts as screen width grows.","@media (min-width: 768px) targets tablets and desktops.","@media (min-width: 1024px) targets large desktop monitors.",'Always ensure <meta name="viewport" content="width=device-width, initial-scale=1.0"> is in the HTML <head>.'],analogy:"Water adapts to the shape of whatever cup, bottle, or bowl it is poured into. Responsive design makes your web page flow naturally into any screen size."},teacherDemo:{title:"Mobile-First Dual Column Transformation",explanation:"1 column on mobile phones, transforms to 2 columns on tablets and desktops.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 18 Coding Lab: Responsive Grid Breakpoint",labDescription:"Configure a layout that is 1 column on mobile, and becomes 3 columns on screens 768px or wider using @media (min-width: 768px).",language:"html",initialCode:`<style>
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
</div>`,tasks:[{id:"d18-t1",title:"Write min-width: 768px Media Query",instruction:"Add `@media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }`.",hint:"Write @media (min-width: 768px) { .responsive-cards { grid-template-columns: repeat(3, 1fr); } }",validatorKeywords:["@media","min-width:","768px","grid-template-columns:","repeat(3, 1fr)"],validatorRegex:"@medias*(s*min-width:s*768pxs*)[sS]*?grid-template-columns:s*repeat(3,s*1fr)"}]},debuggingChallenge:{title:"Spot the Bug: Missing Viewport Meta Tag Breaking Mobile Scaling",buggyCode:`<!DOCTYPE html>
<html>
<head>
  <title>Responsive Site</title>
  <!-- Missing viewport meta tag! -->
</head>
<body>
  <h1>Why is my site zoomed out like desktop on mobile?</h1>
</body>
</html>`,bugExplanation:"Without the viewport meta tag, mobile browsers assume the page is designed for a 980px desktop and shrink the entire page down to a tiny, unreadable zoom.",fixedCode:`<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Site</title>
</head>`},assignment:{title:"Homework Task: Responsive BCA Course Landing Page",instructions:["Create folder `day-18` with `index.html`.","Build a header, hero section, and 3-card feature showcase.","On mobile (< 640px): 1 column layout with stacked navigation.","On tablet (>= 640px): 2 column card grid.","On desktop (>= 1024px): 3 column card grid with horizontal header navigation."],submissionCriteria:"Test using Chrome DevTools device mode toggling between iPhone, iPad, and Desktop."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 18: Mobile-first responsive design, media query breakpoints and fluid grids",commands:["mkdir day-18","cd day-18","git add .",'git commit -m "Day 18: Mobile-first responsive design, media query breakpoints and fluid grids"',"git push origin main"],tips:"Always write mobile styles outside media queries, and use min-width to progressively enhance larger screens."},vivaCheck:{question:"Why is the mobile-first CSS architecture preferred over desktop-first?",options:["Mobile-first code requires less memory and progressively enhances performance on constrained mobile devices.","Desktop computers cannot read CSS media queries.","Mobile devices only support pure HTML without CSS.","Desktop-first is forbidden by search engines."],correctAnswer:0,explanation:"Mobile-first ensures mobile users download simpler, lighter baseline CSS, and richer layout features are loaded conditionally as screen width increases."}},{id:"day-19",day:19,year:1,semester:1,specialization:"foundation",title:"CSS Transitions, Transforms & Hover Micro-Interactions",slug:"day-19-css-transitions-hover-micro-interactions-transform",category:"CSS Layouts",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Create smooth visual states using the `transition` property.","Manipulate geometry using `transform: translateY()`, `scale()`, and `rotate()`.","Build tactile card hover elevations with smooth box-shadow transitions.","Apply hardware GPU acceleration principles (`transform`, `opacity`) for 60fps animations."],concept:{overview:"Micro-animations turn static web pages into engaging, interactive applications. CSS Transitions smoothly interpolate changes between pseudo-class states like :hover and :active.",keyPoints:["transition: property duration timing-function delay (e.g., transition: all 0.25s ease).","transform: translateY(-4px) moves an element up smoothly without causing expensive DOM layout recalculations.","transform: scale(1.05) subtly enlarges buttons on hover for delightful tactile feedback.","Always animate transform and opacity rather than width, height, or top for 60fps performance."],analogy:"Imagine flipping a light switch: without transition, the room instantly snaps bright. With transition, a dimmer switch smoothly fades the light up over 0.3 seconds."},teacherDemo:{title:"Elevating Interactive Card with Smooth Shadow",explanation:"Notice how translateY and box-shadow combine for a premium physical lift effect.",language:"html",code:`<style>
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
</div>`},practicalLab:{labTitle:"Day 19 Coding Lab: Interactive Hover Button",labDescription:"Add a smooth transition: all 0.3s ease and transform: translateY(-3px) on :hover to .action-btn.",language:"html",initialCode:`<style>
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
<button class="action-btn">Launch Practice Lab</button>`,tasks:[{id:"d19-t1",title:"Add Transition Property",instruction:"Add `transition: all 0.3s ease;` to .action-btn.",hint:"Write transition: all 0.3s ease; inside .action-btn.",validatorKeywords:["transition:","0.3s","ease"],validatorRegex:"transition:s*(alls+)?0.3ss+ease"},{id:"d19-t2",title:"Add Hover Transform",instruction:"Add `transform: translateY(-3px);` to .action-btn:hover.",hint:"Include transform: translateY(-3px); inside .action-btn:hover.",validatorKeywords:["transform:","translateY(-3px)"],validatorRegex:"transform:s*translateY(-3px)"}]},debuggingChallenge:{title:"Spot the Bug: Janky Laggy Animation Using Margin-Top on Hover",buggyCode:`.card:hover {
  margin-top: -10px; /* Causes expensive browser reflow and layout thrashing! */
  transition: margin-top 0.3s;
}`,bugExplanation:"Animating margin or top triggers layout recalculation across the entire document tree. Always use transform: translateY() which is GPU-accelerated by the browser compositor.",fixedCode:`.card:hover {
  transform: translateY(-10px); /* Runs at 60fps on GPU without layout thrashing */
  transition: transform 0.3s ease;
}`},assignment:{title:"Homework Task: Interactive Pricing / Tier Cards",instructions:["Create folder `day-19` with `index.html`.","Build 3 subscription / course tier cards (Starter, Pro, Enterprise).","Apply `transition: transform 0.25s ease, box-shadow 0.25s ease` on all cards.","On `:hover`, elevate the hovered card by `translateY(-8px)` and deepen its drop-shadow.","Add a `:active` state that scales buttons down to `scale(0.96)` on click."],submissionCriteria:"Test hover and click micro-interactions in Google Chrome."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states",commands:["mkdir day-19","cd day-19","git add .",'git commit -m "Day 19: CSS transitions, GPU-accelerated transform translateY and tactile hover states"',"git push origin main"],tips:"Always animate transform and opacity for buttery 60fps mobile transitions with zero battery drain."},vivaCheck:{question:"Why is `transform: translateY()` preferred over `top` or `margin-top` for hover animations?",options:["transform runs on the GPU compositor thread without triggering layout reflow, guaranteeing smooth 60fps.","margin-top is deprecated in modern CSS.","transform works only in dark mode.","translateY reduces file download size."],correctAnswer:0,explanation:"Transform does not change geometry in the layout tree, meaning the browser composite engine renders it directly on the GPU without costly document reflow."}},{id:"day-20",day:20,year:1,semester:1,specialization:"foundation",title:"Sprint 2 Capstone: Responsive University Campus Portal",slug:"day-20-sprint-2-capstone-responsive-campus-portal",category:"CSS Layouts",estimatedTime:"3 Hours Practical",difficulty:"Intermediate",objectives:["Integrate all concepts from Sprint 2 into a production-grade multi-section portal.","Build a Flexbox sticky header with brand logo and responsive navigation.","Create a modern Hero banner with call-to-action buttons.","Build a 3-column CSS Grid showcasing BCA Academic Departments.","Deploy full mobile responsiveness with media queries and hover micro-animations."],concept:{overview:"Congratulations on reaching Day 20! Today you synthesize everything learned across Sprint 2 (Box Model, Display, Positioning, Flexbox, Grid, Media Queries, and Transitions) to build a complete Responsive University Campus Portal.",keyPoints:["Semantic Architecture: Use <header>, <nav>, <main>, <section>, and <footer>.","Global CSS Design System: Define CSS custom variables for primary brand blue (#2563eb), dark background, and clean cards.","Layout Integration: Flexbox for single-direction alignment (Navbar, Buttons) + CSS Grid for 2D multi-card departments.","100% Mobile Responsive: Perfectly readable on 360px mobile screens and wide 1440px desktop displays."],analogy:"Think of this as your semester midterm practical exam: taking all the separate tools in your toolbox and crafting a real, functional software product."},teacherDemo:{title:"Responsive Campus Portal Architecture",explanation:"Complete architecture demonstrating navigation, hero, and grid departments.",language:"html",code:`<!DOCTYPE html>
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
</html>`},practicalLab:{labTitle:"Day 20 Coding Lab: Complete Campus Portal",labDescription:"Assemble the final capstone portal incorporating a flex header, hero section, and responsive dept-grid.",language:"html",initialCode:`<style>
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
</main>`,tasks:[{id:"d20-t1",title:"Verify Portal Nav Flexbox",instruction:"Ensure .portal-nav has `display: flex;` and `justify-content: space-between;`.",hint:"Keep display: flex and justify-content: space-between in .portal-nav.",validatorKeywords:["display:","flex","justify-content:","space-between"],validatorRegex:"display:s*flex[sS]*?justify-content:s*space-between"},{id:"d20-t2",title:"Verify Portal Grid System",instruction:"Ensure .portal-grid has `display: grid;` and `grid-template-columns: repeat(3, 1fr);`.",hint:"Keep display: grid and grid-template-columns: repeat(3, 1fr); in .portal-grid.",validatorKeywords:["display:","grid","grid-template-columns:","repeat(3, 1fr)"],validatorRegex:"display:s*grid[sS]*?grid-template-columns:s*repeat(3,s*1fr)"}]},debuggingChallenge:{title:"Spot the Bug: Broken Mobile View on Full Capstone Portal",buggyCode:`.portal-grid {
  display: grid;
  grid-template-columns: 350px 350px 350px;
  width: 1050px; /* Hardcoded width breaks completely on smartphones! */
}`,bugExplanation:"Hardcoding widths like 1050px prevents responsive reflow and forces horizontal scrolling. Always use fluid grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) or media queries.",fixedCode:`.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
}`},assignment:{title:"Homework Task: Production Campus Portal GitHub Release",instructions:["Create folder `day-20` in your repository with `index.html` and `styles.css`.","Build a complete University Campus Portal homepage.","Section 1: Sticky Navigation Bar with Logo and Links.",'Section 2: Hero section with CTA button ("Apply for BCA 2026").',"Section 3: 4 Academic Department Cards with hover elevation (`translateY(-5px)`).","Section 4: Faculty Spotlight Section with 2-column layout.","Section 5: Professional Footer with Copyright and Quick Links.","Ensure 100% mobile responsiveness from 360px to 1440px."],submissionCriteria:"Push to GitHub and verify live repository in NextSem BCA Practical Portal."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal",commands:["mkdir day-20","cd day-20","git add .",'git commit -m "Day 20: Sprint 2 Capstone Project - Responsive University Campus Portal"',"git push origin main"],tips:"Milestone reached! You have finished Days 1–20 of your BCA Practical Degree journey. Showcase your repository on LinkedIn and WhatsApp!"},vivaCheck:{question:"What is the primary architectural difference between Flexbox and CSS Grid when building a full website layout?",options:["Flexbox is 1-dimensional (content-first along row or column), while CSS Grid is 2-dimensional (layout-first along rows and columns simultaneously).","Flexbox works only on mobile, while CSS Grid works only on desktop.","CSS Grid is deprecated in favor of Flexbox.","Flexbox requires JavaScript, while CSS Grid is pure HTML."],correctAnswer:0,explanation:"Flexbox is designed for 1-dimensional item distribution (like navigation bars or button groups), whereas CSS Grid is designed for 2-dimensional grid layouts (like entire page skeletons and card matrices)."}},{id:"day-21",day:21,year:1,semester:1,specialization:"foundation",title:"JavaScript Introduction: <script> Tag, Variables (let, const) & Data Types",slug:"day-21-javascript-introduction-variables-data-types",category:"JavaScript Basics",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Embed JavaScript inside HTML using the <script> tag.","Differentiate between const (immutable binding), let (reassignable), and legacy var.","Identify primitive data types: string, number, boolean, null, undefined, symbol.","Print diagnostics to browser DevTools using console.log() and inspect types with typeof."],concept:{overview:"JavaScript is the programming engine of the web. While HTML provides the skeleton and CSS provides the skin, JavaScript provides the nervous system and dynamic brain, enabling computations, user interactions, and DOM modifications.",keyPoints:["<script> tag: Connects JavaScript logic to an HTML document, usually before </body>.","const: Use by default for all variables whose reference should not change.","let: Use strictly when you know a variable will be reassigned (e.g. counters, accumulators).","var: Legacy function-scoped declaration from ES5; avoid in modern professional development.","typeof operator: Returns the string description of a value's data type."],analogy:"Think of const like a student ID card number (permanent once issued), let like a whiteboard tally of test scores (erased and rewritten as marks update), and console.log like the airplane black-box cockpit recorder."},teacherDemo:{title:"Declaring Variables and Inspecting Types in JavaScript",explanation:"See how const protects values from accidental reassignment while template literals cleanly inject variables into strings.",language:"html",code:`<!DOCTYPE html>
<html>
<head><title>Day 21 JavaScript Demo</title></head>
<body>
  <h2>Open Chrome DevTools (F12 -> Console)</h2>
  <script>
    const studentName = "Aarav Sharma";
    const rollNumber = 240101;
    let currentSemester = 1;
    let isEnrolled = true;

    console.log(\`Student: \${studentName} (Roll: \${rollNumber})\`);
    console.log("Type of studentName:", typeof studentName);
    console.log("Type of rollNumber:", typeof rollNumber);
    console.log("Type of isEnrolled:", typeof isEnrolled);
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 21 Coding Lab: Student Registry Variable Setup",labDescription:"Declare a permanent student name with const, a variable attendance score with let, and log them using a template literal.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <h1>Student Registry</h1>
  <script>
    // Task 1: Declare const studentName and let attendanceScore
    
    // Task 2: Log formatted status message using console.log
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Declare const studentName and let attendanceScore",instruction:"Declare a const variable named studentName with a string value, and a let variable named attendanceScore with a number value.",hint:'Example: const studentName = "Priya"; let attendanceScore = 92;',validatorKeywords:["const studentname","let attendancescore"],validatorRegex:"const\\s+studentName\\s*=[\\s\\S]*?let\\s+attendanceScore\\s*="},{id:"task-2",title:"Output via console.log",instruction:"Call console.log to print studentName and attendanceScore to the terminal/browser console.",hint:"Example: console.log(studentName, attendanceScore);",validatorKeywords:["console.log","studentname"],validatorRegex:"console\\.log\\([\\s\\S]*?studentName[\\s\\S]*?\\)"}]},debuggingChallenge:{title:"Spot the Bug: Illegal Assignment to Constant Variable",buggyCode:`const semesterMarks = 450;
semesterMarks = 475; // Error occurs here
console.log("Updated Marks:", semesterMarks);`,bugExplanation:"Variables declared with const cannot be reassigned. Attempting to assign a new primitive value throws TypeError: Assignment to constant variable.",fixedCode:`let semesterMarks = 450;
semesterMarks = 475; // Reassignment succeeds with let
console.log("Updated Marks:", semesterMarks);`},assignment:{title:"Personal Developer Specification Script",instructions:["Create day-21/index.html with valid HTML5 boilerplate.","Declare 5 variables covering string, number, boolean, null, and undefined types.","Use template literals to print a 4-line developer summary to console.log.","Inspect the script in Google Chrome DevTools console and verify zero errors."],submissionCriteria:"Push your day-21/index.html file with working <script> variables to your GitHub repo."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-21): add javascript intro variables and data types",commands:["mkdir day-21","cd day-21","git checkout -b feature/day-21-js-intro","git add index.html",'git commit -m "feat(day-21): add javascript intro variables and data types"',"git push origin feature/day-21-js-intro"],tips:"Always check the Console tab in Chrome DevTools (Press F12 or Ctrl+Shift+I) whenever writing JavaScript."},vivaCheck:{question:"What is the primary difference between let and const in modern JavaScript (ES6)?",options:["let allows reassignment to a new value; const prevents binding reassignment.","const variables can only hold numbers, while let variables hold strings.","let is hoisted to global scope, while const is local to functions only.","const is executed faster by V8 engine, but let supports arrays."],correctAnswer:0,explanation:"const creates an immutable binding (the identifier cannot be reassigned to a different reference/value), whereas let allows the variable identifier to be reassigned new values throughout its scope."}},{id:"day-22",day:22,year:1,semester:1,specialization:"foundation",title:"JavaScript Operators: Arithmetic, Strict Equality (===) & Logical Conditions",slug:"day-22-javascript-operators-strict-equality-logic",category:"JavaScript Basics",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Master arithmetic operations (+, -, *, /, %) and increment/decrement operators.","Understand why strict equality (===) is mandatory over loose equality (==).","Evaluate compound boolean expressions using AND (&&), OR (||), and NOT (!).","Compute university exam percentage scores and verify admission eligibility."],concept:{overview:"Operators allow you to perform calculations and make comparisons in code. In JavaScript, understanding type coercion and the distinction between loose equality (==) and strict equality (===) is fundamental to writing bug-free software.",keyPoints:["Arithmetic: Standard math (+, -, *, /) plus modulo (%) for finding remainders.","Strict Equality (===): Compares BOTH value and data type without automatic type conversion.",'Loose Equality (==): Performs implicit type coercion (e.g. "5" == 5 evaluates to true!), which leads to security and logic bugs.',"Logical AND (&&): Returns true only if both operands evaluate to truthy.","Logical OR (||): Returns true if at least one operand evaluates to truthy.","Logical NOT (!): Inverts the boolean truthiness of an operand."],analogy:"Loose equality (==) is like an airport gate agent who lets a passenger through because their movie prop paper bill says 100. Strict equality (===) inspects both the printed value AND whether it is real government currency of the expected material."},teacherDemo:{title:"Comparing Strict vs Loose Equality & Eligibility Check",explanation:'Notice how "100" == 100 is true, but "100" === 100 is false because string !== number.',language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    const userAge = 19;
    const hasCollegeID = true;

    // Strict equality comparison
    console.log("5 == '5' (Loose):", 5 == '5');     // true (Coerced)
    console.log("5 === '5' (Strict):", 5 === '5');   // false (Different types)

    // Logical condition
    const isEligibleForExam = (userAge >= 18) && hasCollegeID;
    console.log("Eligible for Exam:", isEligibleForExam);
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 22 Coding Lab: Exam Eligibility Evaluator",labDescription:"Calculate percentage marks from obtained and total marks, and check if the student passed with strict equality.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    const obtainedMarks = 425;
    const totalMarks = 500;
    
    // Task 1: Calculate percentage: (obtainedMarks / totalMarks) * 100
    
    // Task 2: Check eligibility using strict equality and comparison (>= 40)
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Calculate percentage score",instruction:"Compute percentage by dividing obtainedMarks by totalMarks, multiplying by 100, and storing in const percentage.",hint:"const percentage = (obtainedMarks / totalMarks) * 100;",validatorKeywords:["percentage","obtainedmarks","totalmarks"],validatorRegex:"const\\s+percentage\\s*=\\s*\\(?obtainedMarks\\s*\\/\\s*totalMarks\\)?\\s*\\*\\s*100"},{id:"task-2",title:"Check pass eligibility with comparison",instruction:"Declare const isPassed which evaluates to true if percentage >= 40, and log the result.",hint:"const isPassed = percentage >= 40; console.log(isPassed);",validatorKeywords:["ispassed","percentage","40"],validatorRegex:"const\\s+isPassed\\s*=\\s*percentage\\s*>=\\s*40"}]},debuggingChallenge:{title:"Spot the Bug: Accidental Single Equals Assignment in Condition",buggyCode:`let marks = 35;
if (marks = 100) { // Bug: Single equals assignment instead of comparison!
  console.log("Distinction Student!");
}`,bugExplanation:"Single equals (=) is an assignment operator, not a comparison. (marks = 100) assigns 100 to marks, which evaluates to truthy (100 is truthy), always executing the if block regardless of actual marks.",fixedCode:`let marks = 35;
if (marks === 100) { // Fixed: Strict equality comparison
  console.log("Distinction Student!");
} else {
  console.log("Standard Grade.");
}`},assignment:{title:"Admission Eligibility Calculator Script",instructions:["Create day-22/index.html with student test scores.","Implement arithmetic formulas for total, average, and percentage.","Write compound logical conditions: (mathScore >= 60 && physicsScore >= 55 && csScore >= 65).","Print formatted PASS/FAIL criteria to the browser console."],submissionCriteria:"Ensure your script uses strict equality (===) and proper logical operators."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-22): implement javascript operators and strict equality",commands:["mkdir day-22","cd day-22","git checkout -b feature/day-22-operators","git add index.html",'git commit -m "feat(day-22): implement javascript operators and strict equality"',"git push origin feature/day-22-operators"],tips:"Never use loose equality == in professional code. Always enforce === with ESLint rules."},vivaCheck:{question:'What is the evaluated output of the expression: typeof (5 + "5") in JavaScript?',options:['"string"','"number"',"10",'"NaN"'],correctAnswer:0,explanation:'In JavaScript, the + operator between a number and a string triggers type coercion (string concatenation). 5 + "5" evaluates to "55", and typeof "55" is "string".'}},{id:"day-23",day:23,year:1,semester:1,specialization:"foundation",title:"Control Flow: Decision Making with if, else if, else & switch Statements",slug:"day-23-javascript-conditionals-if-else-switch",category:"Control Flow",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Implement multi-branch decision trees using if, else if, and else.","Construct semester grade categorizers (Grade A+, A, B, C, F) based on percentage.","Use switch...case statements with break and default clauses for discrete matching.","Evaluate truthy and falsy values (0, empty string, null, undefined, NaN)."],concept:{overview:"Conditional statements direct the flow of program execution based on runtime conditions. When programs evaluate user inputs or calculation outputs, conditionals determine which branch of code executes.",keyPoints:["if block: Executes only when its condition expression resolves to truthy.","else if: Tests consecutive mutually exclusive conditions when previous tests fail.","else: Acts as the fallback bucket when all preceding conditions evaluate to false.","switch (val): Compares a value against multiple case clauses using strict equality (===).","break statement: Crucial in switch cases to terminate execution and prevent accidental fall-through.","default clause: The fallback branch in a switch statement if no case matches."],analogy:"Think of conditional branching like a railway junction switch: based on the destination code signal, the track physically shifts to direct the train down track A, track B, or the main line."},teacherDemo:{title:"Grading Engine Using if-else and switch Case",explanation:"See how marks are classified into letter grades, and how a switch evaluates day schedules.",language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    const score = 84;
    let letterGrade = "";

    if (score >= 90) {
      letterGrade = "A+";
    } else if (score >= 75) {
      letterGrade = "A";
    } else if (score >= 60) {
      letterGrade = "B";
    } else {
      letterGrade = "C";
    }
    console.log(\`Score \${score} receives Grade: \${letterGrade}\`);

    // Switch case example
    const dayOfWeek = "Monday";
    switch (dayOfWeek) {
      case "Monday":
        console.log("Schedule: BCA BCS-011 Practical Lab");
        break;
      case "Wednesday":
        console.log("Schedule: Mathematics Tutorial");
        break;
      default:
        console.log("Schedule: Self-Study & Revision");
    }
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 23 Coding Lab: Semester Marks Grade Classifier",labDescription:'Write an if-else if-else chain that assigns grade "Distinction" for marks >= 75, "First Class" for >= 60, and "Pass" otherwise.',language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    const marks = 78;
    let award = "";

    // Task 1: Construct if-else if-else chain
    
    // Task 2: Log the final award result
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Construct if-else if grading chain",instruction:'Check if marks >= 75 to assign award = "Distinction", else if marks >= 60 to assign award = "First Class", else award = "Pass".',hint:'if (marks >= 75) { award = "Distinction"; } else if (marks >= 60) { award = "First Class"; } else { award = "Pass"; }',validatorKeywords:["if (marks >= 75)","else if (marks >= 60)","distinction"],validatorRegex:"if\\s*\\(marks\\s*>=\\s*75\\)[\\s\\S]*?award\\s*=\\s*['\"]Distinction['\"][\\s\\S]*?else\\s+if"},{id:"task-2",title:"Output grade to console",instruction:"Log the award variable using console.log.",hint:"console.log(award);",validatorKeywords:["console.log(award)"],validatorRegex:"console\\.log\\([\\s\\S]*?award[\\s\\S]*?\\)"}]},debuggingChallenge:{title:"Spot the Bug: Missing break in switch Statement (Fall-through)",buggyCode:`const role = "student";
let accessLevel = "";

switch (role) {
  case "student":
    accessLevel = "Read Only";
    // Missing break!
  case "admin":
    accessLevel = "Full Access";
    break;
}
console.log("Access Level:", accessLevel); // Prints: Full Access! (Dangerous bug)`,bugExplanation:"Without a break statement, JavaScript execution falls through to subsequent case clauses regardless of whether they match.",fixedCode:`const role = "student";
let accessLevel = "";

switch (role) {
  case "student":
    accessLevel = "Read Only";
    break; // Fixed: Exits switch immediately
  case "admin":
    accessLevel = "Full Access";
    break;
}
console.log("Access Level:", accessLevel); // Prints: Read Only`},assignment:{title:"University Traffic Light / Fee Discount Engine",instructions:["Create day-23/index.html with interactive conditional logic.","Implement an enrollment fee discount engine based on student category (General: 0%, OBC: 10%, SC/ST: 25%).","Add input validation ensuring scores fall strictly between 0 and 100.","Use console.log to present a structured receipt summary."],submissionCriteria:"Ensure the code contains both an if-else if chain and a switch statement."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-23): add conditional branching and switch statements",commands:["mkdir day-23","cd day-23","git checkout -b feature/day-23-conditionals","git add index.html",'git commit -m "feat(day-23): add conditional branching and switch statements"',"git push origin feature/day-23-conditionals"],tips:"Always remember break statements in switch blocks to prevent security-compromising fall-throughs."},vivaCheck:{question:"Which of the following values is NOT falsy in JavaScript?",options:['"0" (string containing zero)',"0 (number zero)","null","undefined"],correctAnswer:0,explanation:'In JavaScript, any non-empty string is truthy, including "0", "false", and " ". The standard falsy values are false, 0, -0, 0n, "", null, undefined, and NaN.'}},{id:"day-24",day:24,year:1,semester:1,specialization:"foundation",title:"Loops & Iteration: for, while, and for...of Statements",slug:"day-24-javascript-loops-iteration-for-while",category:"Control Flow & Algorithms",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Write standard 3-part for loops: initialization, condition, increment.","Understand while loops and prevent infinite loops with reliable exit conditions.","Iterate through collections cleanly using modern for...of syntax.","Calculate cumulative totals, running averages, and generate multiplication tables."],concept:{overview:"Loops automate repetitive tasks by executing a block of code multiple times until a specified termination condition is met. They are the backbone of algorithms, data processing, and DOM rendering.",keyPoints:["for loop: Best when the number of iterations is known in advance: for (let i = 0; i < n; i++).","while loop: Best when looping until a condition changes dynamically: while (condition).","for...of: The cleanest modern ES6 way to iterate over iterable items (Arrays, Strings, Sets).","break: Immediately exits the loop regardless of condition.","continue: Skips the remainder of the current iteration and jumps to the next iteration.","Infinite loop trap: Forgetting to increment the loop counter freezes browser tabs."],analogy:"Think of a for loop like an automatic lap counter on an athletic track: Start at lap 0; check if laps < 10; run one lap; increase count by 1; stop when count reaches 10."},teacherDemo:{title:"Calculating Running Sums and Iterating Arrays",explanation:"See how loops calculate running sums and iterate over subject names without repetitive code.",language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    // 1. Classic for loop: Sum 1 to 10
    let totalSum = 0;
    for (let i = 1; i <= 10; i++) {
      totalSum += i;
    }
    console.log("Sum of 1 to 10:", totalSum); // 55

    // 2. Modern for...of loop: Array traversal
    const bcaSubjects = ["Computer Basics", "C Programming", "Discrete Math", "Communication"];
    for (const subject of bcaSubjects) {
      console.log("BCA Subject:", subject);
    }
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 24 Coding Lab: Multiplication Table & Array Total Generator",labDescription:"Write a for loop generating the 7-times multiplication table and sum an array of semester credits.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Generate 7-times table from 1 to 10 using a for loop
    
    // Task 2: Calculate total credits using for...of loop
    const credits = [4, 4, 3, 2, 4];
    let totalCredits = 0;
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Generate multiplication table with for loop",instruction:"Write a for loop with let i = 1 to i <= 10 printing i * 7 via console.log.",hint:'for (let i = 1; i <= 10; i++) { console.log("7 x " + i + " = " + (i * 7)); }',validatorKeywords:["for (let i = 1","i <= 10","console.log"],validatorRegex:"for\\s*\\(let\\s+i\\s*=\\s*1\\s*;\\s*i\\s*<=\\s*10\\s*;\\s*i\\+\\+\\)[\\s\\S]*?console\\.log"},{id:"task-2",title:"Sum credits using for...of loop",instruction:"Iterate over the credits array using for (const credit of credits) and add each to totalCredits.",hint:"for (const c of credits) { totalCredits += c; } console.log(totalCredits);",validatorKeywords:["for (const","of credits)","totalcredits +="],validatorRegex:"for\\s*\\(const\\s+\\w+\\s+of\\s+credits\\)[\\s\\S]*?totalCredits\\s*\\+="}]},debuggingChallenge:{title:"Spot the Bug: The Fatal Infinite Loop",buggyCode:`let count = 5;
while (count > 0) {
  console.log("Count is:", count);
  // Missing: count--;
  // Browser will freeze and crash!
}`,bugExplanation:"Because count is never decremented, count > 0 remains true permanently, resulting in an infinite loop that maxes out CPU and crashes the browser tab.",fixedCode:`let count = 5;
while (count > 0) {
  console.log("Count is:", count);
  count--; // Fixed: Ensures termination when count reaches 0
}`},assignment:{title:"Student Marksheet Statistical Analyzer",instructions:["Create day-24/index.html with an array of 6 student test scores.","Use a for loop to calculate the highest score, lowest score, and average marks.","Use a while loop to simulate an exam timer countdown from 10 to 0.","Display all calculated statistics cleanly in the DevTools console."],submissionCriteria:"Ensure all loops include correct incrementors and exit conditions."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-24): implement loops and array iteration algorithms",commands:["mkdir day-24","cd day-24","git checkout -b feature/day-24-loops","git add index.html",'git commit -m "feat(day-24): implement loops and array iteration algorithms"',"git push origin feature/day-24-loops"],tips:"Whenever testing while loops, always verify that your loop variable moves toward the exit condition on every iteration."},vivaCheck:{question:"What is the main difference between a while loop and a do...while loop?",options:["do...while executes its code block at least once, even if the condition is false initially.","while loops can only iterate over arrays, while do...while loops can iterate over numbers.","do...while is asynchronous, while while is synchronous.","There is no difference; they are syntactic aliases."],correctAnswer:0,explanation:"A do...while loop evaluates its test condition at the bottom (post-test), which guarantees that the loop body executes at least once before the condition is verified."}},{id:"day-25",day:25,year:1,semester:1,specialization:"foundation",title:"JavaScript Functions: Declarations, Arrow Syntax, Parameters & Scope",slug:"day-25-javascript-functions-arrow-syntax-scope",category:"Functions & Architecture",estimatedTime:"2 Hours Practical",difficulty:"Beginner",objectives:["Define reusable logic using function declarations and modern ES6 arrow functions.","Pass arguments to parameters and return computed outputs (pure functions).","Understand lexical scope, block scope, and function scope.","Create utility calculation helpers like calculatePercentage() and getGradeBadge()."],concept:{overview:"Functions are the fundamental building blocks of modular programming. Instead of duplicating lines of logic, functions encapsulate actions into reusable, testable subroutines that accept inputs, process data, and return results.",keyPoints:["Function Declaration: function name(param1, param2) { return result; } — hoisted in scope.","Arrow Function: const name = (param1, param2) => { return result; } — modern, concise ES6 syntax.","Implicit Return: In single-expression arrow functions, const add = (a, b) => a + b returns automatically without curly braces.",'Default Parameters: const greet = (name = "Student") => ... provides fallback values if argument is missing.',"Return statement: Immediately halts function execution and hands the output value back to the caller.","Scope: Variables defined inside a function are private to that function and inaccessible from outside."],analogy:"Think of a function like an automated espresso coffee machine: you insert water and beans (inputs/arguments), it grinds and brews (process), and it hands you a cup of coffee (return value)."},teacherDemo:{title:"Comparing Function Declarations and Arrow Functions",explanation:"See how both traditional declarations and modern arrow functions perform calculations and return values cleanly.",language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    // 1. Traditional Function Declaration
    function calculateSGPA(gradePoints, totalCredits) {
      if (totalCredits === 0) return 0;
      return (gradePoints / totalCredits).toFixed(2);
    }

    // 2. Modern ES6 Arrow Function
    const isPassingGrade = (score) => score >= 40;

    // 3. Arrow Function with Implicit Return
    const calculatePercentage = (marks, maxMarks) => (marks / maxMarks) * 100;

    console.log("SGPA:", calculateSGPA(82, 10)); // "8.20"
    console.log("Is 45 Passing?", isPassingGrade(45)); // true
    console.log("Percentage:", calculatePercentage(420, 500)); // 84
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 25 Coding Lab: Student Grade Calculation Functions",labDescription:"Create a function declaration and an arrow function to compute student marks percentages and pass status.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Create arrow function calculatePercentage(obtained, total)
    
    // Task 2: Create function checkExamStatus(percentage) returning "PASS" or "FAIL"
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Create calculatePercentage arrow function",instruction:"Define an arrow function calculatePercentage accepting (obtained, total) and returning (obtained / total) * 100.",hint:"const calculatePercentage = (obtained, total) => (obtained / total) * 100;",validatorKeywords:["calculatepercentage","=>","obtained","total"],validatorRegex:"const\\s+calculatePercentage\\s*=\\s*\\(?obtained,\\s*total\\)?\\s*=>"},{id:"task-2",title:"Create checkExamStatus function",instruction:'Write a function checkExamStatus(pct) that returns "PASS" if pct >= 40, else returns "FAIL".',hint:'function checkExamStatus(pct) { return pct >= 40 ? "PASS" : "FAIL"; }',validatorKeywords:["checkexamstatus","return","40"],validatorRegex:"function\\s+checkExamStatus\\s*\\([\\s\\S]*?\\)[\\s\\S]*?return[\\s\\S]*?40"}]},debuggingChallenge:{title:"Spot the Bug: Missing Return in Multi-line Arrow Function",buggyCode:`const getDiscount = (price) => {
  const discount = price * 0.15;
  // Missing: return discount;
};

const finalDiscount = getDiscount(1000);
console.log("Discount:", finalDiscount); // Prints: undefined!`,bugExplanation:"When an arrow function uses curly braces {}, it requires an explicit return statement. Without return, JavaScript functions return undefined by default.",fixedCode:`const getDiscount = (price) => {
  const discount = price * 0.15;
  return discount; // Fixed: Explicitly return the computed value
};

const finalDiscount = getDiscount(1000);
console.log("Discount:", finalDiscount); // Prints: 150`},assignment:{title:"Universal BCA Marksheet Utility Module",instructions:["Create day-25/index.html with modular JavaScript functions.","Write calculatePercentage(marks, total) and getLetterGrade(percentage).","Write formatStudentReport(name, percentage, letterGrade) returning a clean multiline string.","Test the functions with 3 student profiles and log reports to console."],submissionCriteria:"Ensure all functions return values instead of relying on global side-effects."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-25): add reusable functions arrow syntax and scope",commands:["mkdir day-25","cd day-25","git checkout -b feature/day-25-functions","git add index.html",'git commit -m "feat(day-25): add reusable functions arrow syntax and scope"',"git push origin feature/day-25-functions"],tips:"Prefer arrow functions for utility callbacks and short calculations, and keep functions small and focused on one task."},vivaCheck:{question:"What is the return value of a JavaScript function that does NOT contain a return statement?",options:["undefined","null","0","false"],correctAnswer:0,explanation:"In JavaScript, any function that finishes execution without hitting a return statement implicitly returns undefined."}},{id:"day-26",day:26,year:1,semester:1,specialization:"foundation",title:"JavaScript Arrays & Modern Transformation Methods: push, map, filter & reduce",slug:"day-26-javascript-arrays-methods-map-filter",category:"Data Structures",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Create and index arrays of student data.","Add and remove array elements using .push(), .pop(), and .splice().","Transform array items declaratively using .map().","Filter subsets of data using .filter() and aggregate totals with .reduce()."],concept:{overview:"Arrays are ordered collections of values. In modern JavaScript, array iteration methods like .map() and .filter() are preferred over imperative for loops because they produce cleaner, declarative code that does not mutate original data.",keyPoints:["Zero-indexed: The first element is array[0], length is array.length.",".push(item): Appends item to the end of the array (mutating).",".map(callback): Transforms every item and returns a BRAND NEW array of identical length.",".filter(callback): Tests each item and returns a BRAND NEW array containing only items that pass the truth test.",".reduce(callback, initial): Combines all array items into a single accumulated result (e.g. total sum).","Immutability: Modern React/Node workflows favor .map() and .filter() because they avoid mutating state."],analogy:"Think of an array like a conveyor belt of exam answer sheets. .map() stamps a grade on every sheet, .filter() picks out only sheets scoring 40 or higher, and .reduce() counts the total marks of all sheets into one ledger."},teacherDemo:{title:"Declarative Array Processing with map, filter, and reduce",explanation:"See how in 3 short lines we can filter passing scores, add bonus marks, and calculate the total sum.",language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    const examMarks = [35, 78, 92, 44, 28, 85];

    // 1. Filter: Keep only passing marks (>= 40)
    const passingScores = examMarks.filter(mark => mark >= 40);
    console.log("Passing Scores:", passingScores); // [78, 92, 44, 85]

    // 2. Map: Convert scores to percentages out of 100
    const formattedPercentages = examMarks.map(mark => mark + "%");
    console.log("Formatted:", formattedPercentages);

    // 3. Reduce: Calculate total marks
    const totalMarks = examMarks.reduce((sum, mark) => sum + mark, 0);
    console.log("Total Class Marks:", totalMarks);
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 26 Coding Lab: Student Roster Filter & Transform",labDescription:"Use .filter() to extract passing scores (>= 50) and .map() to award 5 bonus grace marks to all students.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    const scores = [45, 82, 38, 90, 67, 52];

    // Task 1: Filter passing scores (score >= 50) into const qualifiedScores
    
    // Task 2: Map scores adding 5 bonus marks into const bonusScores
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Filter scores >= 50",instruction:"Use scores.filter(score => score >= 50) and store the resulting array in const qualifiedScores.",hint:"const qualifiedScores = scores.filter(s => s >= 50);",validatorKeywords:["qualifiedscores","scores.filter",">= 50"],validatorRegex:"const\\s+qualifiedScores\\s*=\\s*scores\\.filter\\([\\s\\S]*?>=\\s*50[\\s\\S]*?\\)"},{id:"task-2",title:"Map scores with 5 bonus marks",instruction:"Use scores.map(score => score + 5) and store the resulting array in const bonusScores.",hint:"const bonusScores = scores.map(s => s + 5);",validatorKeywords:["bonusscores","scores.map","+ 5"],validatorRegex:"const\\s+bonusScores\\s*=\\s*scores\\.map\\([\\s\\S]*?\\+\\s*5[\\s\\S]*?\\)"}]},debuggingChallenge:{title:"Spot the Bug: Confusing .find() with .filter()",buggyCode:`const marks = [20, 65, 80, 45];
// Goal: Get all marks >= 40
const passing = marks.find(m => m >= 40); // Bug!
console.log("All passing:", passing); // Prints: 65 (Only the first match!)`,bugExplanation:".find() stops at and returns ONLY the first matching element. To collect ALL matching elements in an array, .filter() must be used.",fixedCode:`const marks = [20, 65, 80, 45];
// Fixed: .filter() returns an array with ALL matching elements
const passing = marks.filter(m => m >= 40);
console.log("All passing:", passing); // Prints: [65, 80, 45]`},assignment:{title:"BCA Course Credits & GPA Aggregator",instructions:['Create day-26/index.html with an array of subject score objects: { subject: "BCS-011", marks: 78, credits: 4 }.',"Use .filter() to extract high-scoring subjects (marks >= 75).","Use .map() to generate clean HTML list item strings: <li>Subject: Marks</li>.","Use .reduce() to compute the weighted average marks of the student."],submissionCriteria:"Ensure all array transformations use .map(), .filter(), and .reduce() without traditional for loops."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-26): implement array operations with map filter and reduce",commands:["mkdir day-26","cd day-26","git checkout -b feature/day-26-arrays","git add index.html",'git commit -m "feat(day-26): implement array operations with map filter and reduce"',"git push origin feature/day-26-arrays"],tips:"Remember that .map() and .filter() never modify the original array—they return a fresh new array."},vivaCheck:{question:"Does the JavaScript Array.prototype.map() method mutate the original array?",options:["No, it returns a new array with the transformed elements without mutating the original.","Yes, it overwrites each element in-place to save memory.","Only if the array contains primitive numbers.","Yes, unless Object.freeze() is called."],correctAnswer:0,explanation:"Array.prototype.map() is a pure non-mutating method: it returns a brand new array populated with the results of calling the provided function on every element in the calling array."}},{id:"day-27",day:27,year:1,semester:1,specialization:"foundation",title:"JavaScript Objects, Nested Data & JSON Serialization Basics",slug:"day-27-javascript-objects-nested-data-json",category:"Data Structures",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Model complex real-world entities using JavaScript object literals { key: value }.","Access and modify properties using dot notation and bracket notation.","Work with nested objects and arrays of objects (APIs dataset format).","Serialize objects to string using JSON.stringify() and deserialize with JSON.parse()."],concept:{overview:"Objects are keyed collections of properties and values. Everything in web applications—from user accounts to API responses from servers—is modeled using objects and JSON (JavaScript Object Notation).",keyPoints:['Object literal: const obj = { key: "value", age: 20 };',"Dot notation: obj.key — convenient when property name is a known valid identifier.",'Bracket notation: obj["key"] — required when property name is dynamic or contains special characters/spaces.',"JSON.stringify(obj): Converts a JavaScript object into a JSON string suitable for network transfer or localStorage.","JSON.parse(jsonString): Parses a JSON string back into a live JavaScript object.","Object Destructuring: const { name, roll } = student extracts properties directly into standalone variables."],analogy:'Think of an object like a student physical locker with labeled compartments: one label says "Roll Number", another says "Course", another holds a notebook with "Grades". JSON is like flattening all locker contents into a clean text inventory sheet to mail to university headquarters.'},teacherDemo:{title:"Creating Student Profile Object and Serializing to JSON",explanation:"See how properties, nested objects, and JSON serialization work together in application data management.",language:"html",code:`<!DOCTYPE html>
<html>
<body>
  <script>
    const student = {
      id: "BCA-2026-001",
      name: "Diya Patel",
      semester: 1,
      subjects: ["Computer Basics", "C Programming", "Discrete Mathematics"],
      address: {
        city: "New Delhi",
        pincode: 110001
      }
    };

    console.log("Student Name:", student.name);
    console.log("City:", student.address.city);

    // Convert object to JSON string (Serialization)
    const jsonString = JSON.stringify(student);
    console.log("JSON String:", jsonString);

    // Parse back to object (Deserialization)
    const reconstructed = JSON.parse(jsonString);
    console.log("Reconstructed Name:", reconstructed.name);
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 27 Coding Lab: Student Record Object & JSON Serializer",labDescription:"Create a student object with rollNo, name, and isEnrolled, then convert it to a JSON string with JSON.stringify().",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <script>
    // Task 1: Create studentRecord object with rollNo, name, isEnrolled
    
    // Task 2: Serialize studentRecord to JSON using JSON.stringify
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Create studentRecord object",instruction:'Define const studentRecord = { rollNo: 101, name: "Kavya", isEnrolled: true };',hint:'const studentRecord = { rollNo: 101, name: "Kavya", isEnrolled: true };',validatorKeywords:["studentrecord","rollno:","name:","isenrolled:"],validatorRegex:"const\\s+studentRecord\\s*=\\s*\\{[\\s\\S]*?rollNo:[\\s\\S]*?name:[\\s\\S]*?isEnrolled:"},{id:"task-2",title:"Serialize to JSON string",instruction:"Declare const studentJson = JSON.stringify(studentRecord); and log it to console.",hint:"const studentJson = JSON.stringify(studentRecord); console.log(studentJson);",validatorKeywords:["studentjson","json.stringify(studentrecord)"],validatorRegex:"const\\s+studentJson\\s*=\\s*JSON\\.stringify\\(studentRecord\\)"}]},debuggingChallenge:{title:"Spot the Bug: Accessing Undefined Nested Property Crash",buggyCode:`const student = {
  name: "Vikram"
  // address property is not defined
};

console.log(student.address.city); // Throws TypeError: Cannot read properties of undefined!`,bugExplanation:"student.address evaluates to undefined. Attempting to access .city on undefined immediately throws an unhandled TypeError: Cannot read properties of undefined.",fixedCode:`const student = {
  name: "Vikram"
};

// Fixed using Optional Chaining (?.)
console.log(student.address?.city || "City Not Provided"); // Safely prints fallback without error!`},assignment:{title:"University Department Course Catalog Object",instructions:["Create day-27/index.html with an array of 3 course objects.","Each object must contain code, title, credits, and an instructor nested object.","Use Object destructuring to extract course title and credits.","Store and retrieve the array using JSON.stringify() and JSON.parse()."],submissionCriteria:"Demonstrate proper object creation, nested access, and JSON stringification."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-27): add javascript objects and json serialization",commands:["mkdir day-27","cd day-27","git checkout -b feature/day-27-objects","git add index.html",'git commit -m "feat(day-27): add javascript objects and json serialization"',"git push origin feature/day-27-objects"],tips:'JSON keys must always be enclosed in double quotes in standard JSON strings (e.g. {"name": "Aarav"}).'},vivaCheck:{question:"What is the standard purpose of JSON.stringify() in web applications?",options:["To convert a JavaScript object into a JSON-formatted string for network transmission or storage.","To parse a JSON string from a server into a live JavaScript object.","To encrypt sensitive user passwords before sending to a database.","To compile JavaScript code into binary machine code."],correctAnswer:0,explanation:"JSON.stringify() serializes a JavaScript value/object into a JSON text string, which is the universal standard format for transmitting data across HTTP network requests and storing in localStorage."}},{id:"day-28",day:28,year:1,semester:1,specialization:"foundation",title:"DOM Selection: querySelector, textContent, innerHTML & Dynamic Styles",slug:"day-28-javascript-dom-selection-manipulation-styles",category:"DOM & Web APIs",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Understand the Document Object Model (DOM) tree architecture.","Target elements with document.querySelector() and document.querySelectorAll().","Modify element text safely with textContent vs innerHTML.","Update inline CSS styles dynamically with element.style and classList.toggle()."],concept:{overview:"The Document Object Model (DOM) is an object-oriented tree representation of the webpage. Through the DOM API, JavaScript can inspect, add, remove, and alter HTML tags, attributes, and CSS styling in real-time without reloading the page.",keyPoints:["document.querySelector(selector): Returns the FIRST element matching the CSS selector (class, ID, tag).","document.querySelectorAll(selector): Returns a NodeList of ALL matching elements.","textContent: Sets or retrieves plain text safely (immune to XSS script injection).","innerHTML: Parses and renders HTML markup (use cautiously with untrusted input).",'element.style.property: Sets inline CSS styles (e.g. element.style.backgroundColor = "blue").',"element.classList.add(), remove(), toggle(): Cleanest way to alter appearance by toggling pre-defined CSS classes."],analogy:"HTML is the static blueprint drawing of a house; the DOM is the physical constructed building with electrical wiring; JavaScript is the resident who can flip light switches, paint walls, and rearrange furniture inside."},teacherDemo:{title:"Selecting Elements and Updating Card Status Dynamically",explanation:"See how querySelector targets HTML elements and updates text and background color on the fly.",language:"html",code:`<!DOCTYPE html>
<html>
<head>
  <style>
    .status-card {
      padding: 16px;
      border-radius: 8px;
      background: #f1f5f9;
      font-family: sans-serif;
    }
    .active-badge {
      color: #16a34a;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="status-card">
    <h3 id="student-header">Student Record</h3>
    <p>Status: <span id="status-pill">Pending</span></p>
  </div>

  <script>
    // 1. Select elements
    const header = document.querySelector("#student-header");
    const pill = document.querySelector("#status-pill");

    // 2. Update content and styles
    header.textContent = "Aarav Sharma (BCA 1st Sem)";
    pill.textContent = "Verified & Active";
    pill.classList.add("active-badge");
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 28 Coding Lab: Live Status Badge Modifier",labDescription:"Select the heading with querySelector, update its textContent, and modify the badge element style color.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <h2 id="portal-title">Old Portal Title</h2>
  <span id="badge" style="color: red;">Inactive</span>

  <script>
    // Task 1: Select #portal-title and update its textContent to "Nextsem BCA Hub"
    
    // Task 2: Select #badge, update textContent to "Active", and style.color to "#16a34a"
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Update portal-title textContent",instruction:'Select #portal-title with querySelector and update textContent to "Nextsem BCA Hub".',hint:'const title = document.querySelector("#portal-title"); title.textContent = "Nextsem BCA Hub";',validatorKeywords:['queryselector("#portal-title")',"textcontent","nextsem bca hub"],validatorRegex:"document\\.querySelector\\(['\"]#portal-title['\"]\\)[\\s\\S]*?textContent\\s*=\\s*['\"]Nextsem BCA Hub['\"]"},{id:"task-2",title:"Update badge text and style color",instruction:'Select #badge, update textContent to "Active", and set style.color to "#16a34a".',hint:'const badge = document.querySelector("#badge"); badge.textContent = "Active"; badge.style.color = "#16a34a";',validatorKeywords:['queryselector("#badge")','textcontent = "active"',"style.color"],validatorRegex:"document\\.querySelector\\(['\"]#badge['\"]\\)[\\s\\S]*?style\\.color\\s*="}]},debuggingChallenge:{title:"Spot the Bug: Script Executing Before DOM Element Exists",buggyCode:`<head>
  <script>
    // Script runs before <body> is parsed!
    const heading = document.querySelector("#my-heading");
    heading.textContent = "New Title"; // Throws TypeError: Cannot set properties of null
  </script>
</head>
<body>
  <h1 id="my-heading">Original Title</h1>
</body>`,bugExplanation:'The browser executes <script> in <head> immediately before the <body> HTML is parsed, so document.querySelector("#my-heading") returns null.',fixedCode:`<body>
  <h1 id="my-heading">Original Title</h1>

  <!-- Fixed: Place <script> right before closing </body> tag -->
  <script>
    const heading = document.querySelector("#my-heading");
    heading.textContent = "New Title"; // Executes successfully
  </script>
</body>`},assignment:{title:"Interactive University Campus Announcement Banner",instructions:["Create day-28/index.html with an announcement card component.","Use document.querySelector() to target card title, date, and priority tag.","Write JavaScript that updates the text and applies dynamic styling based on priority.","Verify in the browser that all DOM updates apply cleanly on initial page load."],submissionCriteria:"Ensure DOM elements are targeted with querySelector and manipulated using textContent."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-28): implement dom selection textcontent and style manipulation",commands:["mkdir day-28","cd day-28","git checkout -b feature/day-28-dom-selection","git add index.html",'git commit -m "feat(day-28): implement dom selection textcontent and style manipulation"',"git push origin feature/day-28-dom-selection"],tips:"Always place <script> tags at the bottom of <body> or use the defer attribute in <head> to prevent null element errors."},vivaCheck:{question:"Why is textContent preferred over innerHTML when inserting user-generated text into a webpage?",options:["textContent treats all input as plain text, preventing Cross-Site Scripting (XSS) attacks.","innerHTML only works with external CSS stylesheets.","textContent is the only API supported by Chrome browser.","innerHTML converts all text to uppercase automatically."],correctAnswer:0,explanation:"innerHTML parses strings as HTML markup, meaning malicious users could inject <script> or event handlers (XSS vulnerability). textContent strictly inserts plain text without HTML parsing."}},{id:"day-29",day:29,year:1,semester:1,specialization:"foundation",title:"DOM Events: addEventListener, Click, Input & Form Submission with preventDefault",slug:"day-29-javascript-dom-events-listeners-prevent-default",category:"DOM & Web APIs",estimatedTime:"2 Hours Practical",difficulty:"Intermediate",objectives:["Bind event handlers cleanly using element.addEventListener().","Handle user clicks, real-time typing input events, and form submit events.","Prevent destructive browser default actions using event.preventDefault().","Build interactive widgets like real-time character counters and live text mirrormen."],concept:{overview:"Web applications are event-driven. An event is a signal that something has happened—a button click, a key press, or a form submission. Event listeners listen silently for these user actions and trigger handler functions in response.",keyPoints:['element.addEventListener("event", callback): Registers an event handler without overwriting other handlers.','"click" event: Fires when a user clicks with mouse or taps on a touch screen.','"input" event: Fires synchronously every time an input or textarea value changes.','"submit" event: Fires on <form> when the user submits (presses Enter or clicks submit button).',"event.preventDefault(): Stops default browser behaviors (such as form submission refreshing the webpage).","Event Object (e): Provides event metadata like e.target.value or e.key."],analogy:"Think of an event listener like a doorbell chime receiver: it sits quietly waiting for someone to press the physical button (event), and the moment the button is pressed, it rings the indoor chime (handler function)."},teacherDemo:{title:"Interactive Click Counter and Live Character Counter",explanation:"See how addEventListener handles button clicks and tracks character input in real time.",language:"html",code:`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .btn { padding: 8px 16px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h3>Interactive Counter</h3>
  <button id="counter-btn" class="btn">Clicks: <span id="count">0</span></button>

  <h3 style="margin-top: 24px;">Live Feedback Input</h3>
  <input type="text" id="feedback-input" placeholder="Type a message..." style="padding: 8px; width: 260px;" />
  <p>Character count: <span id="char-count">0</span></p>

  <script>
    let clicks = 0;
    const btn = document.querySelector("#counter-btn");
    const countDisplay = document.querySelector("#count");

    btn.addEventListener("click", () => {
      clicks++;
      countDisplay.textContent = clicks;
    });

    const input = document.querySelector("#feedback-input");
    const charDisplay = document.querySelector("#char-count");

    input.addEventListener("input", (e) => {
      charDisplay.textContent = e.target.value.length;
    });
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 29 Coding Lab: Form Submission with preventDefault & Feedback Box",labDescription:"Attach an event listener to a form, prevent the default refresh with e.preventDefault(), and display a submission confirmation message.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <form id="student-form">
    <input type="text" id="student-name" placeholder="Enter student name" required />
    <button type="submit" id="submit-btn">Register</button>
  </form>
  <p id="confirmation" style="display: none;"></p>

  <script>
    const form = document.querySelector("#student-form");
    const confirmation = document.querySelector("#confirmation");

    // Task 1: Attach submit event listener to form and call e.preventDefault()
    
    // Task 2: Display confirmation text and set style.display to "block"
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Attach submit listener with preventDefault",instruction:"Add a submit event listener to form that accepts event e and executes e.preventDefault().",hint:'form.addEventListener("submit", (e) => { e.preventDefault(); });',validatorKeywords:['form.addeventlistener("submit"',"e.preventdefault()"],validatorRegex:"form\\.addEventListener\\(['\"]submit['\"],[\\s\\S]*?e\\.preventDefault\\(\\)"},{id:"task-2",title:"Show confirmation message",instruction:'Inside the submit handler, set confirmation.textContent = "Registration Successful!" and confirmation.style.display = "block".',hint:'confirmation.textContent = "Registration Successful!"; confirmation.style.display = "block";',validatorKeywords:["confirmation.textcontent",'confirmation.style.display = "block"'],validatorRegex:"confirmation\\.textContent\\s*=[\\s\\S]*?confirmation\\.style\\.display\\s*=\\s*['\"]block['\"]"}]},debuggingChallenge:{title:"Spot the Bug: Calling Function Immediately Instead of Passing Reference",buggyCode:`function handleButtonClick() {
  console.log("Button clicked!");
}

const btn = document.querySelector("#my-btn");
// Bug: Calling the function with () inside addEventListener!
btn.addEventListener("click", handleButtonClick());`,bugExplanation:"Passing handleButtonClick() with parentheses invokes the function immediately when the line is parsed, passing its return value (undefined) to addEventListener instead of passing the function reference.",fixedCode:`function handleButtonClick() {
  console.log("Button clicked!");
}

const btn = document.querySelector("#my-btn");
// Fixed: Pass the function name without () as a callback reference
btn.addEventListener("click", handleButtonClick);`},assignment:{title:"Interactive Live Note Taker with Character Count",instructions:["Create day-29/index.html with a form containing a textarea and submit button.",'Add an "input" event listener displaying real-time character count (e.g. 42 / 200).',"Change character counter color to red if character count exceeds 180.","Add a submit listener that appends the note as a new paragraph element in the DOM."],submissionCriteria:"Ensure the form submission does not reload the page and uses e.preventDefault()."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-29): implement dom event listeners and form preventDefault",commands:["mkdir day-29","cd day-29","git checkout -b feature/day-29-events","git add index.html",'git commit -m "feat(day-29): implement dom event listeners and form preventDefault"',"git push origin feature/day-29-events"],tips:'Never use inline onclick="..." HTML attributes in modern applications; always bind events with element.addEventListener().'},vivaCheck:{question:"What is the purpose of calling event.preventDefault() inside a form submit event handler?",options:["It stops the default browser behavior of submitting the form via HTTP and reloading the page.","It clears all user input fields in the form automatically.","It validates email address syntax using regular expressions.","It encrypts the form payload before network dispatch."],correctAnswer:0,explanation:"Standard HTML forms reload the page when submitted. In modern Single Page Applications (SPAs) and interactive apps, e.preventDefault() stops this full page reload so JavaScript can validate and process data in-place."}},{id:"day-30",day:30,year:1,semester:1,specialization:"foundation",title:"Sprint 3 Capstone: Interactive Student SGPA & Grade Portal",slug:"day-30-mini-project-interactive-student-grade-cgpa-portal",category:"Mini Project Capstone",estimatedTime:"3 Hours Practical",difficulty:"Intermediate",objectives:["Assemble HTML5 forms, modern CSS layout, and JavaScript DOM mechanics into a production-grade mini app.","Collect subject marks dynamically from user form inputs and cast strings with Number().","Compute Total Marks, Percentage, SGPA (10-point scale), and Letter Grade.","Dynamically render grade reports in DOM with color-coded Pass/Fail badges.","Deploy the working application to your GitHub repository and personal portfolio."],concept:{overview:"This Sprint 3 Capstone integrates everything learned across Days 21–29 into a complete, interactive Single Page Application. Students build a real-world University Grade & SGPA Evaluation Portal that accepts subject marks, performs calculations, and renders professional report cards dynamically.",keyPoints:["Input Type Casting: Values from <input> elements are ALWAYS strings; use Number() or parseFloat() before arithmetic.","Modular Functions: Separate calculation logic (calculateSGPA) from DOM rendering logic (renderReport).","Form Handling: Intercept submissions with e.preventDefault() to update the dashboard instantly.","Dynamic DOM Construction: Create table rows and status pills with template literals or createElement.","UX Polish: Color-code badges: Emerald Green for First Class/Distinction, Red for Fail, Amber for Pass.","Sprint 3 Milestone: Marks the transition from basic scripting to building functional interactive web tools."],analogy:"Think of this project like the official IGNOU or Delhi University Grade Card web portal: students enter their marks, and the web app automatically computes credits, SGPA, grades, and displays their official term results."},teacherDemo:{title:"Complete Interactive Grade Calculator Architecture",explanation:"Study how the HTML form connects to JavaScript calculation logic and updates the DOM dynamically.",language:"html",code:`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #060c18; color: #fff; padding: 24px; }
    .card { background: #0c1328; border: 1px solid #1e293b; padding: 24px; border-radius: 12px; max-width: 500px; margin: auto; }
    input { width: 100%; padding: 10px; margin: 8px 0; background: #060c18; border: 1px solid #334155; color: #fff; border-radius: 6px; box-sizing: border-box; }
    button { width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .result-box { margin-top: 20px; padding: 16px; border-radius: 8px; background: #1e293b; display: none; }
    .badge-pass { color: #10b981; font-weight: bold; }
    .badge-fail { color: #ef4444; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🎓 BCA Grade Calculator</h2>
    <form id="grade-form">
      <input type="number" id="sub1" placeholder="BCS-011 Computer Basics Marks" required min="0" max="100" />
      <input type="number" id="sub2" placeholder="BCSL-013 Lab Practical Marks" required min="0" max="100" />
      <button type="submit">Calculate Grade</button>
    </form>
    <div id="results" class="result-box"></div>
  </div>

  <script>
    const form = document.querySelector("#grade-form");
    const results = document.querySelector("#results");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const m1 = Number(document.querySelector("#sub1").value);
      const m2 = Number(document.querySelector("#sub2").value);
      const total = m1 + m2;
      const percentage = (total / 200) * 100;
      const sgpa = (percentage / 9.5).toFixed(2);
      const isPass = m1 >= 40 && m2 >= 40;

      results.style.display = "block";
      results.innerHTML = "<h4>Performance Summary</h4>" +
        "<p>Total Marks: <strong>" + total + " / 200</strong></p>" +
        "<p>Percentage: <strong>" + percentage.toFixed(1) + "%</strong></p>" +
        "<p>Estimated SGPA: <strong>" + sgpa + "</strong></p>" +
        "<p>Status: <span class='" + (isPass ? "badge-pass" : "badge-fail") + "'>" + (isPass ? "PASS ✅" : "FAIL ❌") + "</span></p>";
    });
  </script>
</body>
</html>`},practicalLab:{labTitle:"Day 30 Coding Lab: Assemble Your University Grade Portal",labDescription:"Construct the form submit listener, compute total marks and percentage with Number(), and inject formatted results into the DOM.",language:"html",initialCode:`<!DOCTYPE html>
<html>
<body>
  <form id="calc-form">
    <input type="number" id="m1" placeholder="Subject 1" required />
    <input type="number" id="m2" placeholder="Subject 2" required />
    <button type="submit" id="btn-calc">Compute</button>
  </form>
  <div id="output-box" style="display: none;"></div>

  <script>
    const calcForm = document.querySelector("#calc-form");
    const outputBox = document.querySelector("#output-box");

    // Task 1: Add submit listener, preventDefault, and calculate total & percentage using Number()
    
    // Task 2: Render results into outputBox.innerHTML and set outputBox.style.display = "block"
    
  </script>
</body>
</html>`,tasks:[{id:"task-1",title:"Calculate total and percentage with Number()",instruction:'In the form submit listener, preventDefault and calculate const total = Number(document.querySelector("#m1").value) + Number(document.querySelector("#m2").value); and const pct = (total / 200) * 100;',hint:"e.preventDefault(); const total = Number(m1.value) + Number(m2.value); const pct = (total / 200) * 100;",validatorKeywords:["e.preventdefault()","number(","total / 200) * 100"],validatorRegex:"e\\.preventDefault\\(\\)[\\s\\S]*?Number\\([\\s\\S]*?\\)[\\s\\S]*?\\/\\s*200\\s*\\)\\s*\\*\\s*100"},{id:"task-2",title:"Render output into DOM",instruction:'Set outputBox.style.display = "block" and inject total and percentage into outputBox.innerHTML.',hint:'outputBox.style.display = "block"; outputBox.innerHTML = "<p>Total: " + total + "</p>";',validatorKeywords:['outputbox.style.display = "block"',"outputbox.innerhtml"],validatorRegex:"outputBox\\.style\\.display\\s*=\\s*['\"]block['\"][\\s\\S]*?outputBox\\.innerHTML\\s*="}]},debuggingChallenge:{title:"Spot the Bug: String Concatenation Trap in User Inputs",buggyCode:`const score1 = document.querySelector("#s1").value; // e.g. "80"
const score2 = document.querySelector("#s2").value; // e.g. "90"

const total = score1 + score2;
console.log("Total Score:", total); // Prints: "8090" instead of 170!`,bugExplanation:'Values read from HTML <input> elements are always strings. Using + concatenates "80" and "90" into "8090" instead of adding numbers.',fixedCode:`const score1 = Number(document.querySelector("#s1").value); // 80
const score2 = Number(document.querySelector("#s2").value); // 90

const total = score1 + score2;
console.log("Total Score:", total); // Fixed: Prints 170 (Mathematical addition)`},assignment:{title:"Production BCA SGPA & Semester Transcript Portal",instructions:["Create day-30/index.html and day-30/styles.css.","Support 4 BCA 1st Semester subjects: Computer Basics, PC Software Lab, Math, and Communication.","Compute overall SGPA, Division (Distinction / 1st / 2nd / Fail), and percentage.","Style with a sleek dark theme (#060c18 background, #0c1328 cards, blue buttons).","Deploy to GitHub Pages or Firebase and verify all interactions run smoothly."],submissionCriteria:"Submit a clean GitHub repository containing day-30/index.html and day-30/styles.css."},githubWorkflow:{repoName:"html-css-projects",commitMessage:"feat(day-30): build sprint 3 capstone interactive student grade portal",commands:["mkdir day-30","cd day-30","git checkout -b feature/day-30-capstone-grade-portal","git add index.html styles.css",'git commit -m "feat(day-30): build sprint 3 capstone interactive student grade portal"',"git push origin feature/day-30-capstone-grade-portal"],tips:"Test edge cases like entering 0 marks, 100 marks, or non-numeric inputs before publishing."},vivaCheck:{question:'Why does adding two <input> values directly (inputA.value + inputB.value) often result in unexpected outputs like "5060" instead of 110?',options:["Because input.value always returns data as a String; the + operator performs string concatenation instead of addition.","Because HTML form inputs are encrypted in UTF-16 hexadecimal format.","Because JavaScript requires an external math library to add numbers greater than 50.","Because the browser DOM parser rounds all input numbers to strings."],correctAnswer:0,explanation:"The value property of HTML input elements is typed as string. To perform mathematical addition, strings must be explicitly parsed using Number(val), parseInt(val, 10), or parseFloat(val)."}}];e.s(["CAREER_TRACKS",0,[{id:"web-dev",title:"Track 1 — Web & Full-Stack Development",badge:"High Demand",icon:"🌐",color:"from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400",description:"Master modern frontend & backend engineering: semantic HTML, responsive CSS, dynamic JavaScript, React, Node.js, Express, REST APIs, and database deployment.",targetRoles:["Frontend Developer","Full-Stack Developer","Web Application Engineer"],keySkills:["HTML5","CSS3 / Tailwind","Modern JS (ES6+)","DOM & APIs","React","Node.js","Express","MySQL / MongoDB","Git & GitHub CI/CD"],recommendedSemester:"Specialization starts Semester 3"},{id:"programming",title:"Track 2 — Software & Systems Programming",badge:"Core Engineering",icon:"💻",color:"from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-400",description:"Deep dive into computational problem solving, data structures, algorithm optimization, Object-Oriented Programming (OOP) in C++ / Java, and backend architecture.",targetRoles:["Software Developer","Backend Programmer","Junior Software Engineer","Systems Programmer"],keySkills:["C Programming","C++ / OOP","Data Structures & Algorithms","Pointers & Memory","SQL & RDBMS","Unit Testing","Linux Terminal"],recommendedSemester:"Specialization starts Semester 3"},{id:"data-ai",title:"Track 3 — Data Analytics & AI Fundamentals",badge:"Future Ready",icon:"📊",color:"from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400",description:"Transform raw data into actionable insights and intelligent systems using Python, SQL aggregations, Pandas, data visualization, and applied machine learning models.",targetRoles:["Data Analyst","Junior Data Engineer","Business Intelligence Associate","ML Trainee"],keySkills:["Python 3","SQL & Queries","Pandas & NumPy","Data Cleaning","Data Visualization (Matplotlib)","Jupyter Notebooks","ML Basics"],recommendedSemester:"Specialization starts Semester 3"},{id:"cloud-networking",title:"Track 4 — IT, Networking & Cloud Infrastructure",badge:"Enterprise Infrastructure",icon:"☁️",color:"from-cyan-500/20 to-sky-500/10 border-cyan-500/40 text-cyan-400",description:"Build and maintain enterprise computer networks, Linux servers, cloud virtual machines, subnetting architecture, troubleshooting protocols, and basic cybersecurity.",targetRoles:["IT Support Engineer","Network Administrator","Cloud Operations Support","Junior DevOps Engineer"],keySkills:["Computer Hardware","Linux Administration","IPv4/IPv6 Subnetting","Wireshark & Packet Analysis","Cloud VMs (AWS/GCP)","Network Security","Shell Scripting"],recommendedSemester:"Specialization starts Semester 3"}],"PRACTICAL_LESSONS",0,t,"PRACTICAL_SEMESTERS",0,[{semNumber:1,year:1,title:"Semester 1: Common Technical Foundation",focus:"Developer setup, Windows 11 terminal commands, HTML5, CSS3, basic JavaScript logic, and GitHub workflows.",daysRange:"Days 1–60",totalDays:60,coreSubjects:["BCS-111 / BCS-011: Computer Basics","BCSL-013: PC Software Lab","BCS-012: Basic Mathematics"],practicalHighlights:["Sprint 1 (Days 1–30): HTML5 & CSS3","Sprint 2 (Days 31–60): Responsive Layouts & Git","🪟 Windows 11 Terminal & GitHub Push"]},{semNumber:2,year:1,title:"Semester 2: Programming Fundamentals & Logic Building",focus:"Structured programming in C, pointer memory models, JavaScript DOM manipulation, and relational database queries.",daysRange:"Days 61–120",totalDays:60,coreSubjects:["MCS-011: Problem Solving & C","MCSL-017: C Lab","Database Foundation"],practicalHighlights:["Sprint 3 (Days 61–90): C & Memory Logic","Sprint 4 (Days 91–120): Advanced JS & SQL","Interactive SQL & Grade Tracker App"]},{semNumber:3,year:2,title:"Semester 3: Career Specialization Kickoff & DSA",focus:"Career track selection (Web / Software / Data / Cloud) + Data Structures & Algorithms and Advanced Database Systems.",daysRange:"Days 121–180",totalDays:60,coreSubjects:["MCS-021: Data & File Structures","MCS-023: Database Management Systems","MCSL-025: DSA Lab"],practicalHighlights:["Sprint 5 (Days 121–150): DSA in C/C++","Sprint 6 (Days 151–180): SQL & RDBMS","Linked Lists & Query Optimization"]},{semNumber:4,year:2,title:"Semester 4: Backend Engineering & Systems Architecture",focus:"Object-Oriented Programming (Java / C++ / Python), REST API architecture with Node.js/Express, and Linux command line.",daysRange:"Days 181–240",totalDays:60,coreSubjects:["MCS-024: OOP Technologies (Java/Python)","MCS-022: Operating Systems","Backend REST APIs"],practicalHighlights:["Sprint 7 (Days 181–210): OOP Architecture","Sprint 8 (Days 211–240): REST API Backend","Postman Testing & Linux Automation"]},{semNumber:5,year:3,title:"Semester 5: Advanced Architecture & Major Project Phase 1",focus:"Career specialization deep dive (React/Next.js or AI/Python or Cloud), Docker containers, authentication, and Capstone scoping.",daysRange:"Days 241–300",totalDays:60,coreSubjects:["BCS-051: Software Engineering","BCS-053: Web Programming","BCSL-056: Full Stack Lab"],practicalHighlights:["Sprint 9 (Days 241–270): Track Specialization","Sprint 10 (Days 271–300): Cloud & Docker","Major Capstone Phase 1 Submission"]},{semNumber:6,year:3,title:"Semester 6: Major Capstone, Production Portfolio & Job Readiness",focus:"Full production deployment, open-source portfolio polish, technical viva defense, resume preparation, and mock interview practice.",daysRange:"Days 301–360",totalDays:60,coreSubjects:["BCSP-064: Major Capstone Project","BCS-062: E-Commerce & Security","Career Viva Preparation"],practicalHighlights:["Sprint 11 (Days 301–330): Production Capstone","Sprint 12 (Days 331–360): Portfolio & Viva","Job Readiness & Viva Defense"]}],"PRACTICAL_SPRINTS",0,[{sprintNumber:1,year:1,semester:1,daysRange:"Days 1–30",title:"Sprint 1: Web Foundation & Semantic HTML/CSS",badge:"Sem 1 • Foundation",description:"Learn modern semantic HTML5, clean CSS layouts, responsive design, and developer command line workflow.",milestoneProject:"Interactive Developer Portfolio v1 (Day 30 Mini Project)"},{sprintNumber:2,year:1,semester:1,daysRange:"Days 31–60",title:"Sprint 2: Modern CSS Layouts, Grid & Git Workflows",badge:"Sem 1 • Frontend",description:"Master advanced Flexbox, CSS Grid systems, animations, media queries, and professional GitHub repository publishing.",milestoneProject:"Responsive University Campus Portal (Day 60 Project)"},{sprintNumber:3,year:1,semester:2,daysRange:"Days 61–90",title:"Sprint 3: C Programming & Computational Logic",badge:"Sem 2 • Logic",description:"Deep dive into variables, pointers, dynamic memory allocation, structs, and terminal problem solving in C.",milestoneProject:"Terminal-Based Student Record System in C (Day 90 Project)"},{sprintNumber:4,year:1,semester:2,daysRange:"Days 91–120",title:"Sprint 4: JavaScript DOM & Interactive Applications",badge:"Sem 2 • Interactive",description:"Event-driven programming, DOM tree manipulation, localStorage state management, and basic SQL query sandbox.",milestoneProject:"Interactive Student Grade & Quiz Management App (Day 120)"},{sprintNumber:5,year:2,semester:3,daysRange:"Days 121–150",title:"Sprint 5: Data Structures & Algorithms in C/C++",badge:"Sem 3 • Core DSA",description:"Implement arrays, singly/doubly linked lists, stacks, queues, trees, recursion, and time complexity benchmarking.",milestoneProject:"Visual Data Structure Explorer & Memory Debugger (Day 150)"},{sprintNumber:6,year:2,semester:3,daysRange:"Days 151–180",title:"Sprint 6: Database Systems & Relational SQL Architecture",badge:"Sem 3 • Database",description:"Design normalized tables, primary/foreign keys, joins, aggregations, transactions, and indexing in MySQL/PostgreSQL.",milestoneProject:"Hospital & Healthcare Database Management System (Day 180)"},{sprintNumber:7,year:2,semester:4,daysRange:"Days 181–210",title:"Sprint 7: Object-Oriented Software Design (OOP)",badge:"Sem 4 • Architecture",description:"Classes, inheritance, polymorphism, encapsulation, interfaces, and clean design patterns in Java/C++/Python.",milestoneProject:"Enterprise Banking & Transaction Management System (Day 210)"},{sprintNumber:8,year:2,semester:4,daysRange:"Days 211–240",title:"Sprint 8: Backend REST APIs & Linux Shell Engineering",badge:"Sem 4 • Backend",description:"Build Node.js & Express REST servers, routing, middleware, JWT authentication, and Linux server shell automation.",milestoneProject:"Secured Student Enterprise REST API with Auth (Day 240)"},{sprintNumber:9,year:3,semester:5,daysRange:"Days 241–270",title:"Sprint 9: Career Track Deep-Dive Specialization",badge:"Sem 5 • Track Focus",description:"Intensive practice in chosen track: Full-Stack React/Next.js, Python Data/AI, or Cloud/DevOps infrastructure.",milestoneProject:"Career Specialization Production Feature Module (Day 270)"},{sprintNumber:10,year:3,semester:5,daysRange:"Days 271–300",title:"Sprint 10: Cloud Deployment, Docker & CI/CD Pipelines",badge:"Sem 5 • DevOps",description:"Containerize apps with Docker, configure environment variables, setup GitHub Actions, and deploy to cloud VMs.",milestoneProject:"Containerized Multi-Service Web App on Cloud (Day 300)"},{sprintNumber:11,year:3,semester:6,daysRange:"Days 301–330",title:"Sprint 11: Major Capstone Industry Project Build",badge:"Sem 6 • Capstone",description:"Build an end-to-end industry-grade software product, write technical architecture documentation, and push to GitHub.",milestoneProject:"Major Capstone Production Web Application (Day 330)"},{sprintNumber:12,year:3,semester:6,daysRange:"Days 331–360",title:"Sprint 12: Production Portfolio & Technical Viva Defense",badge:"Sem 6 • Job Ready",description:"Live domain deployment, GitHub portfolio showcase, technical viva voce simulation, and resume interview defense.",milestoneProject:"Live Production Portfolio & Industry Job Readiness (Day 360)"}]])},41987,e=>{"use strict";let t=(0,e.i(56420).default)("share-2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);e.s(["Share2",0,t],41987)},55207,45312,59798,58010,e=>{"use strict";e.s(["default",()=>E],55207);var t=e.i(43476),a=e.i(71645),s=e.i(22016),i=e.i(63676),r=e.i(51757),n=e.i(69846),o=e.i(82022),l=e.i(28623),d=e.i(67784),c=e.i(97923),u=e.i(84026),p=e.i(67927),m=e.i(49882),h=e.i(21357),g=e.i(76248),b=e.i(20245),x=e.i(74082);e.s(["default",()=>v],45312);var y=e.i(41987),f=e.i(56522);function v(){let{socialLinks:e,updateSocialLinks:s,completedDays:i}=(0,b.useStudentProgress)(),[n,l]=(0,a.useState)(e?.linkedin||""),[d,c]=(0,a.useState)(e?.instagram||""),[u,p]=(0,a.useState)(e?.whatsapp||""),[m,h]=(0,a.useState)(!1);(0,a.useEffect)(()=>{l(e?.linkedin||""),c(e?.instagram||""),p(e?.whatsapp||"")},[e]);let g=async e=>{e.preventDefault(),await s({linkedin:n.trim(),instagram:d.trim(),whatsapp:u.trim()}),h(!0),setTimeout(()=>h(!1),2500)},x=u.replace(/[^0-9]/g,""),v=x?`https://wa.me/${x}`:"",k=n.trim().startsWith("http")?n.trim():n.trim()?`https://linkedin.com/in/${n.trim().replace(/^@/,"")}`:"",w=d.trim().startsWith("http")?d.trim():d.trim()?`https://instagram.com/${d.trim().replace(/^@/,"")}`:"",S=encodeURIComponent(`🚀 Hi! I am practicing full-stack BCA coding on NextSem Academy.
✅ Completed: ${i.length} Practical Coding Days with real GitHub pushes!
Check out the BCA Practical Portal: https://ignou-study-notes-by-nextsem.web.app/bca/practical`),C=`https://api.whatsapp.com/send?text=${S}`;return(0,t.jsxs)("div",{className:"p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-4",children:[(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("h4",{className:"text-xs sm:text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2",children:[(0,t.jsx)("span",{children:"Professional & Social Integrations"}),(0,t.jsx)("span",{className:"text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800",children:"Portfolio & Network"})]}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500 mt-0.5",children:"Link your professional profiles for job recruiters and share verified coding milestones on WhatsApp."})]}),(0,t.jsxs)("a",{href:C,target:"_blank",rel:"noopener noreferrer",className:"self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer",title:"Share your practical coding milestones with mentors or friends on WhatsApp",children:[(0,t.jsx)(y.Share2,{size:13}),(0,t.jsx)("span",{children:"Share on WhatsApp"})]})]}),(0,t.jsxs)("form",{onSubmit:g,className:"space-y-3.5",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-3",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("label",{className:"text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"w-4 h-4 rounded bg-[#0a66c2] text-white flex items-center justify-center text-[10px] font-bold",children:"in"}),(0,t.jsx)("span",{children:"LinkedIn"})]}),k&&(0,t.jsxs)("a",{href:k,target:"_blank",rel:"noopener noreferrer",className:"text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5",children:[(0,t.jsx)("span",{children:"Visit"}),(0,t.jsx)(o.ExternalLink,{size:10})]})]}),(0,t.jsx)("input",{type:"text",value:n,onChange:e=>l(e.target.value),placeholder:"username or profile link",className:"w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("label",{className:"text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"w-4 h-4 rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold",children:"ig"}),(0,t.jsx)("span",{children:"Instagram"})]}),w&&(0,t.jsxs)("a",{href:w,target:"_blank",rel:"noopener noreferrer",className:"text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5",children:[(0,t.jsx)("span",{children:"Visit"}),(0,t.jsx)(o.ExternalLink,{size:10})]})]}),(0,t.jsx)("input",{type:"text",value:d,onChange:e=>c(e.target.value),placeholder:"@username or profile link",className:"w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("label",{className:"text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5",children:[(0,t.jsx)("span",{className:"w-4 h-4 rounded bg-[#25d366] text-white flex items-center justify-center text-[10px] font-bold",children:"wa"}),(0,t.jsx)("span",{children:"WhatsApp Phone"})]}),v&&(0,t.jsxs)("a",{href:v,target:"_blank",rel:"noopener noreferrer",className:"text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5",children:[(0,t.jsx)("span",{children:"Chat"}),(0,t.jsx)(o.ExternalLink,{size:10})]})]}),(0,t.jsx)("input",{type:"text",value:u,onChange:e=>p(e.target.value),placeholder:"+91 9876543210",className:"w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-1",children:[(0,t.jsx)("div",{className:"text-[10px] text-slate-400 font-mono",children:m?(0,t.jsxs)("span",{className:"text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1",children:[(0,t.jsx)(r.CheckCircle2,{size:12}),"Social links saved & synchronized!"]}):(0,t.jsx)("span",{children:"Stored securely & synced across devices"})}),(0,t.jsxs)("button",{type:"submit",className:"px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer",children:[(0,t.jsx)(f.Save,{size:13}),(0,t.jsx)("span",{children:"Save Profiles"})]})]})]})]})}var k=e.i(9584),w=e.i(56420);let S=(0,w.default)("hard-drive",[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]]);var C=e.i(31214),j=e.i(64569),N=e.i(28276),D=e.i(4139),A=e.i(52330),T=e.i(13285),P=e.i(89664);function L({isOpen:e,onClose:s}){let[r,n]=(0,a.useState)("sync");return((0,a.useEffect)(()=>{let t=t=>{"Escape"===t.key&&e&&s()};return e?(window.addEventListener("keydown",t),document.body.style.overflow="hidden"):document.body.style.overflow="",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e,s]),e)?(0,t.jsx)("div",{className:"fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200",children:(0,t.jsxs)("div",{className:"w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-black text-black dark:text-white border-2 border-blue-600/30 dark:border-blue-600/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-start justify-between gap-4 shrink-0",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("span",{className:"px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white flex items-center gap-1.5",children:[(0,t.jsx)(l.Sparkles,{size:12}),"Student Architecture Blueprint"]}),(0,t.jsxs)("span",{className:"text-xs text-slate-500 dark:text-slate-400 font-semibold hidden sm:inline",children:["Curriculum Architect: ",(0,t.jsx)("strong",{className:"text-black dark:text-white",children:"Er. Manoj Kumar"})]})]}),(0,t.jsx)("h2",{className:"text-lg sm:text-2xl font-black tracking-tight text-black dark:text-white flex items-center gap-2",children:"How Your Progress & Practical Roadmap Works"}),(0,t.jsx)("p",{className:"text-xs sm:text-sm text-slate-600 dark:text-slate-400",children:"Complete transparent walkthrough of our Local-First zero-lag engine, Google Cloud sync, and 360-day BCA practical curriculum."})]}),(0,t.jsx)("button",{onClick:s,className:"p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors shrink-0 cursor-pointer","aria-label":"Close Guide",children:(0,t.jsx)(i.X,{size:20})})]}),(0,t.jsxs)("div",{className:"px-4 sm:px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0",children:[(0,t.jsxs)("button",{onClick:()=>n("sync"),className:`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${"sync"===r?"border-blue-600 text-blue-600 dark:text-blue-400":"border-transparent text-slate-500 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(k.Database,{size:15}),(0,t.jsx)("span",{children:"1. Data Sync & Offline Engine"})]}),(0,t.jsxs)("button",{onClick:()=>n("roadmap"),className:`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${"roadmap"===r?"border-blue-600 text-blue-600 dark:text-blue-400":"border-transparent text-slate-500 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(m.Calendar,{size:15}),(0,t.jsx)("span",{children:"2. 360-Day Degree Blueprint"})]}),(0,t.jsxs)("button",{onClick:()=>n("protocol"),className:`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${"protocol"===r?"border-blue-600 text-blue-600 dark:text-blue-400":"border-transparent text-slate-500 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(u.ShieldCheck,{size:15}),(0,t.jsx)("span",{children:"3. 4-Step Practical Protocol"})]}),(0,t.jsxs)("button",{onClick:()=>n("tracks"),className:`pb-3 px-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${"tracks"===r?"border-blue-600 text-blue-600 dark:text-blue-400":"border-transparent text-slate-500 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(N.Compass,{size:15}),(0,t.jsx)("span",{children:"4. Career Tracks & Socials"})]})]}),(0,t.jsxs)("div",{className:"p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed",children:["sync"===r&&(0,t.jsxs)("div",{className:"space-y-5 animate-in fade-in duration-150",children:[(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3",children:[(0,t.jsx)(j.Zap,{className:"text-blue-600 dark:text-blue-400 shrink-0 mt-0.5",size:20}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"font-extrabold text-blue-900 dark:text-blue-300",children:'Why does my profile say "Saved Locally on Device"?'}),(0,t.jsxs)("p",{className:"text-xs sm:text-sm text-blue-800 dark:text-blue-400 mt-1",children:["It means your coding submissions, day milestones, and GitHub links are saved into your device's browser memory (",(0,t.jsx)("code",{children:"localStorage"}),") in ",(0,t.jsx)("strong",{children:"0 milliseconds"}),". It guarantees you will never experience lag, loading spinners, or lose work if your internet cuts out!"]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold",children:[(0,t.jsx)(S,{size:18}),(0,t.jsx)("span",{children:"Tier 1: Device Memory (Instant 0ms)"})]}),(0,t.jsxs)("ul",{className:"text-xs space-y-2 text-slate-600 dark:text-slate-400",children:[(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Instant Page Loads:"})," Zero wait time when navigating between practical days."]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"100% Offline Practice:"})," Practice coding labs and study without active Wi-Fi."]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Persistent Cache:"})," Survives tab closures, browser restarts, and computer reboots."]})]})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold",children:[(0,t.jsx)(C.Cloud,{size:18}),(0,t.jsx)("span",{children:"Tier 2: Google Cloud Firestore (Backup)"})]}),(0,t.jsxs)("ul",{className:"text-xs space-y-2 text-slate-600 dark:text-slate-400",children:[(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Silent Background Sync:"})," Seamlessly uploads your progress to your Google Account."]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Multi-Device Access:"})," Switch between mobile phone and PC without losing completed days."]})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)(P.Check,{size:14,className:"text-emerald-500 shrink-0 mt-0.5"}),(0,t.jsxs)("span",{children:[(0,t.jsx)("strong",{children:"Disaster Recovery:"})," Even if you clear your browser history, logging back into Google restores your record."]})]})]})]})]}),(0,t.jsxs)("div",{className:"rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden",children:[(0,t.jsx)("div",{className:"p-3 bg-neutral-100 dark:bg-neutral-900 font-bold text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400",children:"Status Indicator Legend"}),(0,t.jsxs)("div",{className:"divide-y divide-neutral-200 dark:divide-neutral-800 text-xs",children:[(0,t.jsxs)("div",{className:"p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2",children:[(0,t.jsxs)("div",{className:"font-bold flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-blue-500"}),(0,t.jsx)("span",{children:"💾 Saved Locally on Device"})]}),(0,t.jsx)("div",{className:"text-slate-600 dark:text-slate-400",children:"Your milestones are stored securely on this computer/phone. Safe, instant, and offline-ready."})]}),(0,t.jsxs)("div",{className:"p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2",children:[(0,t.jsxs)("div",{className:"font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-emerald-500 animate-pulse"}),(0,t.jsx)("span",{children:"☁️ Synced to Cloud (Safe & Backed Up)"})]}),(0,t.jsx)("div",{className:"text-slate-600 dark:text-slate-400",children:"Background sync has mirrored all your submissions to Firebase Firestore under your verified Google UID."})]})]})]})]}),"roadmap"===r&&(0,t.jsxs)("div",{className:"space-y-5 animate-in fade-in duration-150",children:[(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2",children:[(0,t.jsxs)("h4",{className:"font-extrabold text-base flex items-center gap-2",children:[(0,t.jsx)(m.Calendar,{className:"text-blue-600",size:18}),(0,t.jsx)("span",{children:"Why 360 Practical Days for a 3-Year BCA Degree?"})]}),(0,t.jsxs)("p",{className:"text-xs sm:text-sm text-slate-600 dark:text-slate-400",children:["Many students ask: ",(0,t.jsx)("em",{children:'"If a degree is 3 years, why isn\'t it 365 or 1000 days?"'})," Here is the exact academic calculation designed by Er. Manoj Kumar:"]})]}),(0,t.jsxs)("div",{className:"p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-neutral-50 to-blue-50 dark:from-blue-950/20 dark:via-neutral-950 dark:to-blue-950/20 border-2 border-blue-600/30 text-center space-y-2",children:[(0,t.jsx)("div",{className:"text-xs uppercase font-extrabold text-blue-600 dark:text-blue-400 tracking-wider",children:"The Master Academic Formula"}),(0,t.jsxs)("div",{className:"text-lg sm:text-2xl font-black",children:["6 Semesters × 60 Practical Lab Days = ",(0,t.jsx)("span",{className:"text-blue-600 dark:text-blue-400",children:"360 Practical Days"})]}),(0,t.jsxs)("p",{className:"text-xs text-slate-500 max-w-xl mx-auto",children:["In a university semester (6 calendar months), there are approximately 90 teaching days excluding exam months, holidays, and preparation breaks. Exactly ",(0,t.jsx)("strong",{children:"60 of those days are dedicated to rigorous hands-on laboratory programming"}),"."]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",children:[(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("span",{className:"font-black text-sm text-blue-600 dark:text-blue-400",children:"Semester 1"}),(0,t.jsx)("span",{className:"text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white",children:"ACTIVE NOW"})]}),(0,t.jsx)("div",{className:"text-xs font-bold",children:"Days 1 – 60"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"Computer Basics, Linux CLI, Git & GitHub, Pure HTML5 & DevTools."})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1",children:[(0,t.jsx)("span",{className:"font-bold text-sm",children:"Semester 2"}),(0,t.jsx)("div",{className:"text-xs font-bold text-slate-500",children:"Days 61 – 120"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"C Language Fundamentals, Pointers, Arrays, and Memory Architecture."})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1",children:[(0,t.jsx)("span",{className:"font-bold text-sm",children:"Semester 3"}),(0,t.jsx)("div",{className:"text-xs font-bold text-slate-500",children:"Days 121 – 180"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"Data Structures & Algorithms in C/C++, Stacks, Queues, Binary Trees."})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1",children:[(0,t.jsx)("span",{className:"font-bold text-sm",children:"Semester 4"}),(0,t.jsx)("div",{className:"text-xs font-bold text-slate-500",children:"Days 181 – 240"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"Object Oriented Programming (C++/Java), RDBMS & Practical SQL Lab."})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1",children:[(0,t.jsx)("span",{className:"font-bold text-sm",children:"Semester 5"}),(0,t.jsx)("div",{className:"text-xs font-bold text-slate-500",children:"Days 241 – 300"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"Full-Stack Web Development, Modern React, Node.js REST APIs & Cloud DBs."})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-1",children:[(0,t.jsx)("span",{className:"font-bold text-sm",children:"Semester 6"}),(0,t.jsx)("div",{className:"text-xs font-bold text-slate-500",children:"Days 301 – 360"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500",children:"Industry Capstone Project, Comprehensive Viva Defense & Placement Portfolio."})]})]})]}),"protocol"===r&&(0,t.jsxs)("div",{className:"space-y-5 animate-in fade-in duration-150",children:[(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2",children:[(0,t.jsxs)("h4",{className:"font-extrabold text-base flex items-center gap-2",children:[(0,t.jsx)(u.ShieldCheck,{className:"text-blue-600",size:18}),(0,t.jsx)("span",{children:"The Mandatory 4-Step Completion Protocol"})]}),(0,t.jsx)("p",{className:"text-xs sm:text-sm text-slate-600 dark:text-slate-400",children:'Unlike traditional platforms where you simply click "Next" without learning, NextSem enforces 4 strict prerequisites to certify each day:'})]}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3",children:[(0,t.jsx)("div",{className:"w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0",children:"1"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"font-bold text-sm",children:"Verified Google Authentication"}),(0,t.jsx)("p",{className:"text-xs text-slate-500 mt-0.5",children:"Ensures every student has a unique identity, prevents anonymous bot spam, and links progress to your permanent cloud profile."})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3",children:[(0,t.jsx)("div",{className:"w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0",children:"2"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"font-bold text-sm",children:"100% Task-Based Coding Lab Verification"}),(0,t.jsx)("p",{className:"text-xs text-slate-500 mt-0.5",children:"You must run the in-app interactive code compiler and pass all unit assertions. You cannot fake code completion."})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3",children:[(0,t.jsx)("div",{className:"w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0",children:"3"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"font-bold text-sm",children:"Technical Oral Viva Check"}),(0,t.jsx)("p",{className:"text-xs text-slate-500 mt-0.5",children:"Answer the university examiner viva question correctly to test conceptual understanding and prepare for semester oral examinations."})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start gap-3",children:[(0,t.jsx)("div",{className:"w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0",children:"4"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h5",{className:"font-bold text-sm",children:"Real GitHub Repository Submission"}),(0,t.jsxs)("p",{className:"text-xs text-slate-500 mt-0.5",children:["Submit your live repository URL (e.g. ",(0,t.jsx)("code",{children:"https://github.com/yourname/bca-day-1"}),"). Generic dummy placeholders are strictly blocked."]})]})]})]})]}),"tracks"===r&&(0,t.jsxs)("div",{className:"space-y-5 animate-in fade-in duration-150",children:[(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-2",children:[(0,t.jsxs)("h4",{className:"font-extrabold text-base flex items-center gap-2",children:[(0,t.jsx)(N.Compass,{className:"text-blue-600",size:18}),(0,t.jsx)("span",{children:"Choose Your Industry Specialization Track"})]}),(0,t.jsx)("p",{className:"text-xs sm:text-sm text-slate-600 dark:text-slate-400",children:"Align your 3-year BCA journey with real market hiring roles. You can toggle your active track anytime from your profile dashboard:"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5",children:[(0,t.jsxs)("div",{className:"font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(A.Code2,{className:"text-blue-600",size:16}),(0,t.jsx)("span",{children:"Full-Stack Web Engineering"})]}),(0,t.jsx)("p",{className:"text-xs text-slate-500",children:"HTML5, Tailwind, JavaScript, React, Node.js, Express, PostgreSQL, Next.js, and Cloud Deployment."})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5",children:[(0,t.jsxs)("div",{className:"font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(T.Layers,{className:"text-emerald-600",size:16}),(0,t.jsx)("span",{children:"Modern Frontend & UI Architecture"})]}),(0,t.jsx)("p",{className:"text-xs text-slate-500",children:"Responsive CSS systems, interactive DOM simulations, State Machines, React 19, and Figma-to-code."})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5",children:[(0,t.jsxs)("div",{className:"font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(D.Terminal,{className:"text-purple-600",size:16}),(0,t.jsx)("span",{children:"Backend Systems & RDBMS"})]}),(0,t.jsx)("p",{className:"text-xs text-slate-500",children:"C/C++ Memory Management, Linux CLI, Data Structures, Relational SQL Design, and REST API microservices."})]}),(0,t.jsxs)("div",{className:"p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5",children:[(0,t.jsxs)("div",{className:"font-bold text-sm flex items-center gap-2",children:[(0,t.jsx)(l.Sparkles,{className:"text-amber-500",size:16}),(0,t.jsx)("span",{children:"AI, Data & Cloud Foundations"})]}),(0,t.jsx)("p",{className:"text-xs text-slate-500",children:"Python scripting, Linear Data Models, Git automation, Firebase Cloud, and AI LLM prompt integrations."})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2",children:[(0,t.jsxs)("div",{className:"font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2",children:[(0,t.jsx)(y.Share2,{size:14}),(0,t.jsx)("span",{children:"Public Proof of Work Integration"})]}),(0,t.jsxs)("p",{className:"text-xs text-blue-900 dark:text-blue-300",children:["Connect your ",(0,t.jsx)("strong",{children:"LinkedIn"}),", ",(0,t.jsx)("strong",{children:"GitHub"}),", and ",(0,t.jsx)("strong",{children:"Instagram"})," handles from your profile. After completing each day, tap the ",(0,t.jsx)("strong",{children:"WhatsApp Share"})," button at the bottom of the lesson to share your daily coding streak with peers, study groups, and mentors!"]})]})]})]}),(0,t.jsxs)("div",{className:"p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0",children:[(0,t.jsx)("div",{className:"text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left",children:"Have questions about the roadmap? Discuss with mentors or explore daily lessons."}),(0,t.jsx)("div",{className:"flex items-center gap-2 w-full sm:w-auto",children:(0,t.jsx)("button",{onClick:s,className:"flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer text-center",children:"Got it! Return to Practice"})})]})]})}):null}e.s(["default",0,L],59798),e.s(["default",()=>I],58010);let M=(0,w.default)("chart-column",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);function I({onAction:e}){let{cbtScore:i,user:n}=(0,b.useStudentProgress)(),[l,d]=(0,a.useState)(!1),c="/cbt";if(!i)return(0,t.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-3",children:[(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0",children:"💻"}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("h2",{className:"text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2",children:[(0,t.jsx)("span",{children:"Computer Competency Test (CBT)"}),(0,t.jsx)("span",{className:"text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400",children:"100 MCQs"})]}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500 dark:text-slate-400",children:"Windows OS • Linux • MS Office • Networking • Git • Web Tech"})]})]}),(0,t.jsx)("span",{className:"text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto",children:"Not Attempted Yet"})]}),(0,t.jsx)("p",{className:"text-xs text-slate-600 dark:text-slate-300 leading-relaxed",children:"Test your technical fundamentals with our standard 90-minute Computer-Based Assessment. Submitting your test will automatically certify and link your official score to this student profile!"}),(0,t.jsxs)("div",{className:"flex items-center justify-between pt-2 border-t border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("span",{className:"text-[11px] text-slate-500 font-mono",children:"Passing Criteria: 60% (60/100 Marks)"}),(0,t.jsxs)(s.default,{href:c,onClick:e,className:"px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all active:scale-95 shadow-sm",children:[(0,t.jsx)("span",{children:"Launch CBT Assessment"}),(0,t.jsx)(o.ExternalLink,{size:13})]})]})]});let u=i.passed??i.score>=60;return(0,t.jsxs)("div",{className:"p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-xs space-y-4",children:[(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2.5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs",children:"🎓"}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("h2",{className:"text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2",children:[(0,t.jsx)("span",{children:"National Computer Competency"}),(0,t.jsx)("span",{className:"text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800",children:"100 MCQs"})]}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500 dark:text-slate-400",children:"Verified NextSem Assessment Credential"})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 self-start sm:self-auto",children:(0,t.jsxs)("span",{className:`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border flex items-center gap-1.5 ${u?"bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800":"bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800"}`,children:[(0,t.jsx)(r.CheckCircle2,{size:12}),(0,t.jsx)("span",{children:i.status||(u?"PASSED (PROMOTED)":"NEEDS PRACTICE")})]})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2.5",children:[(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider block",children:"Score"}),(0,t.jsxs)("span",{className:"text-xl font-black text-black dark:text-white mt-0.5 block",children:[i.score," ",(0,t.jsxs)("span",{className:"text-xs text-slate-400 font-normal",children:["/ ",i.totalQuestions||100]})]}),(0,t.jsxs)("span",{className:"text-[10px] text-blue-600 dark:text-blue-400 font-bold block mt-0.5",children:[i.percentage,"% Total"]})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider block",children:"Accuracy"}),(0,t.jsxs)("span",{className:"text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block",children:[i.accuracy,"%"]}),(0,t.jsx)("span",{className:"text-[10px] text-slate-400 font-mono block mt-0.5",children:"Correct / Attempted"})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider block",children:"Time Elapsed"}),(0,t.jsx)("span",{className:"text-xl font-black text-black dark:text-white mt-0.5 block",children:i.timeSpentFormatted||(i.timeSpentSeconds?`${Math.floor(i.timeSpentSeconds/60)}m ${i.timeSpentSeconds%60}s`:"90m")}),(0,t.jsx)("span",{className:"text-[10px] text-slate-400 font-mono block mt-0.5",children:"90m Max Allowed"})]}),(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("span",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-wider block",children:"Certified Date"}),(0,t.jsx)("span",{className:"text-sm font-black text-black dark:text-white mt-1.5 block truncate",children:i.submittedAt?new Date(i.submittedAt).toLocaleDateString(void 0,{dateStyle:"medium"}):"Recent"}),(0,t.jsxs)("span",{className:"text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500"}),"Cloud Synced"]})]})]}),i.categoryStats&&Object.keys(i.categoryStats).length>0&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("button",{onClick:()=>d(e=>!e),className:"text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer",children:[(0,t.jsx)(M,{size:13}),(0,t.jsx)("span",{children:l?"Hide Topic Proficiency Breakdown":"View Topic Proficiency Breakdown (9 Sections)"})]}),l&&(0,t.jsx)("div",{className:"p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-2.5 animate-in fade-in duration-200",children:Object.entries(i.categoryStats).map(([e,a])=>{let s=a.total>0?Math.round(a.correct/a.total*100):0;return(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between text-[11px] font-bold",children:[(0,t.jsx)("span",{className:"text-slate-700 dark:text-slate-300",children:e}),(0,t.jsxs)("span",{className:"font-mono text-slate-500",children:[(0,t.jsx)("strong",{children:a.correct})," / ",a.total," (",s,"%)"]})]}),(0,t.jsx)("div",{className:"w-full h-1.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-blue-600 rounded-full transition-all duration-300",style:{width:`${s}%`}})})]},e)})})]}),(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("span",{className:"text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5",children:[(0,t.jsx)("span",{children:"🔒 Certified under Google Account:"}),(0,t.jsx)("strong",{className:"text-black dark:text-white font-mono",children:n?.email||"Google Verified"})]}),(0,t.jsx)("div",{className:"flex items-center gap-2",children:(0,t.jsxs)(s.default,{href:c,onClick:e,className:"px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all",children:[(0,t.jsx)("span",{children:"Review Answers & Retake"}),(0,t.jsx)(o.ExternalLink,{size:12})]})})]})]})}function E({isOpen:e,onClose:y}){let{user:f,completedDays:k,githubRepoUrls:w,githubUsername:S,selectedTrack:C,setSelectedTrack:j,isCloudSynced:N,signIn:D,signOut:A}=(0,b.useStudentProgress)(),[T,P]=(0,a.useState)("all"),[M,B]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let t=t=>{"Escape"===t.key&&e&&y()};return e?(window.addEventListener("keydown",t),document.body.style.overflow="hidden"):document.body.style.overflow="",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e,y]);let R=k.filter(e=>e<=60).length,H=Math.min(100,Math.round(R/60*100));x.CAREER_TRACKS.find(e=>e.id===C)||x.CAREER_TRACKS[0];let O=Array.from({length:60},(e,t)=>t+1).find(e=>!k.includes(e))||1,F=x.PRACTICAL_LESSONS.find(e=>e.day===O),G=x.PRACTICAL_LESSONS.filter(e=>"completed"===T?k.includes(e.day):"pending"!==T||!k.includes(e.day));return(0,t.jsxs)("div",{className:`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm transition-all duration-200 select-none ${e?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}`,onClick:y,"aria-hidden":!e,children:[(0,t.jsxs)("div",{className:`w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl p-5 sm:p-7 text-black dark:text-white relative flex flex-col gap-6 transition-all duration-200 will-change-transform ${e?"scale-100 translate-y-0":"scale-95 translate-y-2"}`,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between pb-4 border-b border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-xl bg-blue-50 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 flex items-center justify-center text-blue-600 dark:text-blue-400",children:(0,t.jsx)(l.Sparkles,{size:16})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"text-sm sm:text-base font-black text-black dark:text-white leading-tight",children:"Student Learning Dashboard"}),(0,t.jsx)("p",{className:"text-[11px] text-slate-500 font-mono",children:"BCA Practical Coding System • Er. Manoj Kumar"})]})]}),(0,t.jsx)("button",{onClick:y,className:"w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer",title:"Close Dashboard",children:(0,t.jsx)(i.X,{size:16})})]}),(0,t.jsxs)("div",{className:"rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3.5",children:[f?.photo?(0,t.jsx)("img",{src:f.photo,alt:f.name,loading:"eager",decoding:"async",className:"w-14 h-14 rounded-2xl border-2 border-blue-600 object-cover shadow-sm shrink-0"}):(0,t.jsx)("div",{className:"w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-sm shrink-0",children:f?.isGuest?"G":f?.name?.charAt(0)||"S"}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)("h3",{className:"text-base font-black text-black dark:text-white",children:f?.name||"Guest Student"}),f?.isGuest?(0,t.jsx)("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-neutral-700",children:"Guest Mode"}):(0,t.jsxs)("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800 flex items-center gap-1",children:[(0,t.jsx)(u.ShieldCheck,{size:11}),"Verified Google Account"]})]}),(0,t.jsx)("div",{className:"text-xs text-slate-500 font-mono mt-0.5",children:f?.email||"guest@nextsem.local"}),(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-2 mt-1.5 text-[11px] font-bold",children:[N?(0,t.jsxs)("span",{className:"text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5",title:"Your progress is backed up to Google Cloud and accessible across devices",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"}),"☁️ Synced to Cloud (Safe & Backed Up)"]}):(0,t.jsxs)("span",{className:"text-slate-500 dark:text-slate-400 flex items-center gap-1.5",title:"Your progress is saved directly in this browser's memory for 0ms instant loading and offline practice",children:[(0,t.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-blue-500"}),"💾 Saved Locally on Device (Offline-Ready • Instant)"]}),(0,t.jsxs)("button",{onClick:()=>B(!0),className:"inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors cursor-pointer",title:"Click to understand how local storage, cloud sync, and the 360-day practical roadmap works",children:[(0,t.jsx)(g.HelpCircle,{size:12}),(0,t.jsx)("span",{children:"How it works?"})]})]})]})]}),(0,t.jsxs)("div",{className:"flex sm:flex-col items-center gap-2 shrink-0",children:[f?.isGuest?(0,t.jsxs)("button",{onClick:()=>{y(),D()},className:"w-full px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer",title:"Sign in with Google to enable cloud backup",children:[(0,t.jsx)(c.LogIn,{size:13}),(0,t.jsx)("span",{children:"Connect Google"})]}):null,(0,t.jsxs)("button",{onClick:()=>{y(),A()},className:"px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer",children:[(0,t.jsx)(d.LogOut,{size:13}),(0,t.jsx)("span",{children:f?.isGuest?"Exit Guest":"Sign Out"})]})]})]}),(0,t.jsxs)("div",{className:"px-3.5 py-2.5 rounded-2xl bg-blue-50/80 dark:bg-neutral-900 border border-blue-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-2.5",children:[(0,t.jsx)("span",{className:"w-5 h-5 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5",children:"ℹ️"}),(0,t.jsxs)("div",{className:"leading-snug",children:[(0,t.jsx)("span",{className:"font-black text-black dark:text-white",children:"3-Year BCA Degree Practical Structure:"})," ","A 3-year degree has ",(0,t.jsx)("strong",{children:"6 Semesters"}),". Each semester has ",(0,t.jsx)("strong",{children:"60 practical lab days"})," (15 weeks × 4 lab classes/week)."," ",(0,t.jsx)("strong",{children:"6 Semesters × 60 Days = 360 Total Practical Coding Days"})," across your entire 3-year degree."]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2.5",children:[(0,t.jsxs)("div",{className:"p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("div",{className:"text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider flex items-center justify-between",children:[(0,t.jsx)("span",{children:"Sem 1 Practical"}),(0,t.jsx)("span",{className:"text-[9px] font-bold text-slate-400",children:"Active"})]}),(0,t.jsxs)("div",{className:"text-xl font-black text-black dark:text-white mt-1",children:[R," ",(0,t.jsx)("span",{className:"text-xs text-slate-400 font-normal",children:"/ 60 Days"})]}),(0,t.jsxs)("div",{className:"text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate",children:["3-Yr Total: ",k.length," / 360 Labs"]})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("div",{className:"text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider",children:"Sem 1 Sprints"}),(0,t.jsxs)("div",{className:"text-xl font-black text-blue-600 dark:text-blue-400 mt-1",children:[H,"% ",(0,t.jsx)("span",{className:"text-xs text-slate-400 font-normal",children:"done"})]}),(0,t.jsx)("div",{className:"text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate",children:"Sprint 1 (Days 1–30)"})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("div",{className:"text-[10px] font-black uppercase text-slate-500 tracking-wider",children:"GitHub Repos"}),(0,t.jsxs)("div",{className:"text-xl font-black text-black dark:text-white mt-1",children:[Object.keys(w).length," ",(0,t.jsx)("span",{className:"text-xs text-slate-400 font-normal",children:"verified"})]}),(0,t.jsx)("div",{className:"text-[9px] text-slate-500 dark:text-slate-400 mt-1 truncate",children:"Portfolio Pushes"})]}),(0,t.jsxs)("div",{className:"p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsx)("div",{className:"text-[10px] font-black uppercase text-slate-500 tracking-wider",children:"Active Day"}),(0,t.jsxs)("div",{className:"text-xl font-black text-black dark:text-white mt-1",children:["Day ",O]}),(0,t.jsx)("div",{className:"text-[9px] text-blue-600 dark:text-blue-400 mt-1 font-bold truncate",children:"Current Target"})]})]}),(0,t.jsxs)("div",{className:"p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold mb-2",children:[(0,t.jsx)("span",{className:"text-black dark:text-white",children:"Semester 1 Practical Progress (Days 1–60)"}),(0,t.jsxs)("span",{className:"text-blue-600 dark:text-blue-400 font-mono",children:[R," of ",60," Days (",H,"%)"]})]}),(0,t.jsx)("div",{className:"w-full h-2.5 rounded-full bg-slate-200 dark:bg-neutral-800 overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-blue-600 rounded-full transition-all duration-500",style:{width:`${Math.max(5,H)}%`}})}),F&&(0,t.jsxs)("div",{className:"mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("span",{className:"text-[11px] text-slate-600 dark:text-slate-400 truncate",children:["Next Up: ",(0,t.jsxs)("strong",{className:"text-black dark:text-white",children:["Day ",F.day,": ",F.title]})]}),(0,t.jsxs)(s.default,{href:`/bca/practical/${F.slug}`,onClick:y,className:"px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shrink-0 inline-flex items-center gap-1 transition-all active:scale-95",children:[(0,t.jsx)("span",{children:"Continue"}),(0,t.jsx)(p.ChevronRight,{size:12})]})]})]}),(0,t.jsx)(I,{onAction:y}),(0,t.jsxs)("div",{className:"p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-3.5",children:[(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0",children:"⚡"}),(0,t.jsx)("div",{children:(0,t.jsxs)("h4",{className:"text-xs sm:text-sm font-black text-black dark:text-white uppercase tracking-wider flex items-center gap-2",children:[(0,t.jsx)("span",{children:"Practical Lesson Updates"}),(0,t.jsx)("span",{className:"text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-800",children:"Coding Labs Only"})]})})]}),(0,t.jsxs)("div",{className:"flex items-center gap-1 self-start sm:self-auto bg-slate-200 dark:bg-neutral-800 p-0.5 rounded-xl text-[10px] font-bold",children:[(0,t.jsxs)("button",{onClick:()=>P("all"),className:`px-2 py-1 rounded-lg transition-all cursor-pointer ${"all"===T?"bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs":"text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`,children:["All (",x.PRACTICAL_LESSONS.length,")"]}),(0,t.jsxs)("button",{onClick:()=>P("completed"),className:`px-2 py-1 rounded-lg transition-all cursor-pointer ${"completed"===T?"bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs":"text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`,children:["Done (",k.length,")"]}),(0,t.jsxs)("button",{onClick:()=>P("pending"),className:`px-2 py-1 rounded-lg transition-all cursor-pointer ${"pending"===T?"bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-black shadow-xs":"text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`,children:["To Do (",Math.max(0,x.PRACTICAL_LESSONS.length-k.length),")"]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-blue-200 dark:border-blue-900/40 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"}),(0,t.jsx)("span",{className:"font-bold text-black dark:text-white text-[11px]",children:"Sprint 1 (Days 1–10): HTML5 & Resume"})]}),(0,t.jsx)("span",{className:"text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded",children:"Live Now"})]}),(0,t.jsxs)("div",{className:"p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 flex items-center justify-between opacity-80",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"w-2 h-2 rounded-full bg-amber-500 shrink-0"}),(0,t.jsx)("span",{className:"font-bold text-black dark:text-white text-[11px]",children:"Sprint 2 (Days 11–20): CSS3 & Flexbox"})]}),(0,t.jsx)("span",{className:"text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded",children:"Next Sprint"})]})]}),(0,t.jsx)("div",{className:"space-y-2 max-h-56 overflow-y-auto pr-1",children:G.map(e=>{let a=k.includes(e.day),i=w[e.day.toString()];return(0,t.jsxs)("div",{className:`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${a?"bg-white dark:bg-neutral-950 border-emerald-500/30":"bg-white dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 hover:border-blue-500/50"}`,children:[(0,t.jsxs)("div",{className:"flex items-start sm:items-center gap-2.5 min-w-0",children:[(0,t.jsxs)("div",{className:`px-2 py-1 rounded-lg font-mono text-[11px] font-black shrink-0 ${a?"bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800":"bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-neutral-700"}`,children:["Day ",e.day]}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,t.jsx)("span",{className:"text-xs font-black text-black dark:text-white truncate",children:e.title}),10===e.day&&(0,t.jsx)("span",{className:"text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500 text-black",children:"🏆 Portfolio Project"})]}),(0,t.jsxs)("div",{className:"text-[10px] text-slate-500 flex items-center gap-2 mt-0.5",children:[(0,t.jsx)("span",{children:e.category}),(0,t.jsx)("span",{children:"•"}),(0,t.jsx)("span",{children:e.estimatedTime}),(0,t.jsx)("span",{children:"•"}),(0,t.jsxs)("span",{children:[e.practicalLab.tasks.length," Coding Tasks"]})]})]})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 shrink-0 self-end sm:self-center",children:a?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{className:"text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1",children:[(0,t.jsx)(r.CheckCircle2,{size:13}),(0,t.jsx)("span",{children:"Passed"})]}),i&&(0,t.jsx)("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",title:"View Verified GitHub Repository",children:(0,t.jsx)(n.GitBranch,{size:13})}),(0,t.jsx)(s.default,{href:`/bca/practical/${e.slug}`,onClick:y,className:"px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-[11px] transition-all",children:"Review"})]}):(0,t.jsxs)(s.default,{href:`/bca/practical/${e.slug}`,onClick:y,className:"px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-all active:scale-95",children:[(0,t.jsx)(h.Play,{size:11}),(0,t.jsx)("span",{children:"Start Lab"})]})})]},e.id)})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-xs font-black uppercase tracking-wider text-slate-500 mb-2",children:"Selected Career Track:"}),(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2",children:x.CAREER_TRACKS.map(e=>{let a=e.id===C;return(0,t.jsxs)("button",{onClick:()=>j(e.id),className:`p-3 rounded-xl border text-left transition-all cursor-pointer ${a?"bg-blue-50 dark:bg-neutral-900 border-blue-600 text-black dark:text-white shadow-sm":"bg-slate-50 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-neutral-700"}`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,t.jsxs)("span",{className:"text-xs font-bold flex items-center gap-1.5",children:[(0,t.jsx)("span",{children:e.icon}),(0,t.jsx)("span",{children:e.title.split("—")[1]||e.title})]}),a&&(0,t.jsx)("span",{className:"text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-600 text-white",children:"Active"})]}),(0,t.jsx)("p",{className:"text-[10px] text-slate-500 line-clamp-1",children:e.targetRoles.join(", ")})]},e.id)})})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsx)("span",{className:"text-xs font-black uppercase tracking-wider text-slate-500",children:"Verified GitHub Project Repositories:"}),(0,t.jsxs)("span",{className:"text-[11px] font-mono text-slate-500",children:[Object.keys(w).length," Pushed"]})]}),0===Object.keys(w).length?(0,t.jsx)("div",{className:"p-4 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-dashed border-slate-300 dark:border-neutral-800 text-center text-xs text-slate-500",children:"No practical projects submitted yet. Complete any practical day and submit your GitHub repository link to build your developer portfolio!"}):(0,t.jsx)("div",{className:"space-y-1.5 max-h-36 overflow-y-auto",children:Object.entries(w).map(([e,a])=>(0,t.jsxs)("div",{className:"flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 truncate",children:[(0,t.jsxs)("span",{className:"px-1.5 py-0.5 rounded bg-blue-50 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold shrink-0",children:["Day ",e]}),(0,t.jsx)("span",{className:"font-mono text-[11px] text-slate-700 dark:text-slate-300 truncate",children:a.replace(/^https?:\/\/github\.com\//,"")})]}),(0,t.jsx)("a",{href:a,target:"_blank",rel:"noopener noreferrer",className:"p-1 rounded text-slate-400 hover:text-blue-600 transition-colors shrink-0",title:"View on GitHub",children:(0,t.jsx)(o.ExternalLink,{size:14})})]},e))})]}),(0,t.jsx)(v,{}),(0,t.jsxs)("div",{className:"pt-2 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-center gap-2",children:[(0,t.jsxs)(s.default,{href:"/bca/practical",onClick:y,className:"flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95",children:[(0,t.jsx)(m.Calendar,{size:14,className:"text-blue-600 dark:text-blue-400"}),(0,t.jsx)("span",{children:"Practical Portal"})]}),(0,t.jsxs)(s.default,{href:`/bca/practical/${F?.slug||"day-1-html-setup-first-webpage"}`,onClick:y,className:"flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm",children:[(0,t.jsx)(h.Play,{size:14}),(0,t.jsxs)("span",{children:["Continue Day ",O]})]}),(0,t.jsx)("a",{href:`https://api.whatsapp.com/send?text=${encodeURIComponent("🚀 Check out my BCA Practical Learning Progress on NextSem: https://ignou-study-notes-by-nextsem.web.app/bca/practical")}`,target:"_blank",rel:"noopener noreferrer",className:"flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm",children:(0,t.jsx)("span",{children:"WhatsApp Share"})})]})]}),(0,t.jsx)(L,{isOpen:M,onClose:()=>B(!1)})]})}},1597,e=>{"use strict";let t=(0,e.i(56420).default)("user-plus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);e.s(["UserPlus",0,t],1597)},92870,e=>{"use strict";let t=(0,e.i(56420).default)("user-check",[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);e.s(["UserCheck",0,t],92870)},1279,e=>{"use strict";let t=(0,e.i(56420).default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);e.s(["User",0,t],1279)},20245,e=>{"use strict";e.s(["StudentProgressProvider",()=>D,"useStudentProgress",()=>A],20245);var t=e.i(43476),a=e.i(71645),s=e.i(53699),i=e.i(99940),r=e.i(54228),n=e.i(54937),o=e.i(4095),l=e.i(76481),d=e.i(80230);e.i(51718);var c=e.i(72779),u=e.i(7777);e.i(36180);var p=e.i(17689),m=e.i(63802),h=e.i(21765),g=e.i(55207),b=e.i(63676),x=e.i(97923),y=e.i(1597),f=e.i(92870),v=e.i(96315),k=e.i(6537),w=e.i(1279),S=e.i(99847),C=e.i(51757);function j({isOpen:e,onClose:s,defaultTab:i="login"}){let{signIn:r,signInWithEmail:n,signUpWithEmail:o,signInAsGuest:l}=A(),[d,c]=(0,a.useState)("login"),[u,p]=(0,a.useState)(""),[m,h]=(0,a.useState)(""),[g,N]=(0,a.useState)(""),[D,T]=(0,a.useState)(!1),[P,L]=(0,a.useState)(null),[M,I]=(0,a.useState)(null);if((0,a.useEffect)(()=>{i&&c(i),L(null),I(null)},[e,i]),(0,a.useEffect)(()=>{let t=t=>{"Escape"===t.key&&e&&s()};return e?(window.addEventListener("keydown",t),document.body.style.overflow="hidden"):document.body.style.overflow="",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e,s]),!e)return null;let E=async e=>{e.preventDefault(),L(null),I(null),T(!0);try{let e=await n(m,g);e.success?(I("Welcome back! Signed in successfully."),setTimeout(()=>{s()},350)):L(e.error||"Failed to log in.")}catch(e){L(e?.message||"An unexpected error occurred.")}finally{T(!1)}},B=async e=>{e.preventDefault(),L(null),I(null),T(!0);try{let e=await o(u,m,g);e.success?(I("Account created successfully! Welcome to NextSem."),setTimeout(()=>{s()},350)):L(e.error||"Failed to create account.")}catch(e){L(e?.message||"An unexpected error occurred.")}finally{T(!1)}},R=async()=>{L(null),T(!0);try{await r(),s()}catch(e){e?.code!=="auth/popup-closed-by-user"&&L("Google Sign-In failed: "+(e?.message||e)),T(!1)}};return(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm select-none animate-in fade-in duration-200",onClick:s,children:(0,t.jsxs)("div",{className:"w-full max-w-md rounded-3xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 text-black dark:text-white relative flex flex-col gap-5 will-change-transform animate-in zoom-in-95 duration-200",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-sm",children:"</>"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-extrabold text-sm uppercase tracking-wider text-black dark:text-white",children:"NextSem Academy"}),(0,t.jsx)("p",{className:"text-[10px] text-slate-500 font-mono",children:"In-App Student Authentication"})]})]}),(0,t.jsx)("button",{onClick:s,className:"p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer",children:(0,t.jsx)(b.X,{size:18})})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-bold",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>{c("login"),L(null)},className:`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${"login"===d?"bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-extrabold shadow-sm":"text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(x.LogIn,{size:14}),(0,t.jsx)("span",{children:"Sign In"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{c("signup"),L(null)},className:`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${"signup"===d?"bg-white dark:bg-black text-blue-600 dark:text-blue-400 font-extrabold shadow-sm":"text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"}`,children:[(0,t.jsx)(y.UserPlus,{size:14}),(0,t.jsx)("span",{children:"Create Account"})]})]}),P&&(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2",children:[(0,t.jsx)(S.AlertCircle,{size:15,className:"shrink-0 mt-0.5"}),(0,t.jsx)("span",{children:P})]}),M&&(0,t.jsxs)("div",{className:"p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2",children:[(0,t.jsx)(C.CheckCircle2,{size:15,className:"shrink-0"}),(0,t.jsx)("span",{children:M})]}),"login"===d&&(0,t.jsxs)("form",{onSubmit:E,className:"space-y-3.5",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1",children:"Student Email"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(v.Mail,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{type:"email",required:!0,value:m,onChange:e=>h(e.target.value),placeholder:"student@example.com",className:"w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1",children:"Password"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(k.Lock,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{type:"password",required:!0,value:g,onChange:e=>N(e.target.value),placeholder:"••••••••",className:"w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsx)("button",{type:"submit",disabled:D,className:"w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50",children:D?"Signing In...":"Log In to NextSem"})]}),"signup"===d&&(0,t.jsxs)("form",{onSubmit:B,className:"space-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1",children:"Full Name"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(w.User,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{type:"text",required:!0,value:u,onChange:e=>p(e.target.value),placeholder:"e.g. Rahul Sharma",className:"w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1",children:"Student Email"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(v.Mail,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{type:"email",required:!0,value:m,onChange:e=>h(e.target.value),placeholder:"rahul@example.com",className:"w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1",children:"Create Password"}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(k.Lock,{size:15,className:"absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"}),(0,t.jsx)("input",{type:"password",required:!0,minLength:6,value:g,onChange:e=>N(e.target.value),placeholder:"At least 6 characters",className:"w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-black dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"})]})]}),(0,t.jsx)("button",{type:"submit",disabled:D,className:"w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer disabled:opacity-50 mt-1",children:D?"Creating Account...":"Create Free Student Account"})]}),(0,t.jsxs)("div",{className:"relative flex items-center justify-center my-1",children:[(0,t.jsx)("div",{className:"w-full border-t border-slate-200 dark:border-neutral-800"}),(0,t.jsx)("span",{className:"absolute bg-white dark:bg-neutral-950 px-2 text-[10px] font-black uppercase tracking-wider text-slate-400",children:"or instant options"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("button",{type:"button",onClick:R,disabled:D,className:"w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs active:scale-95",title:"In-Page Google Authentication without popup windows",children:[(0,t.jsxs)("svg",{className:"w-4 h-4 shrink-0",viewBox:"0 0 24 24",children:[(0,t.jsx)("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,t.jsx)("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,t.jsx)("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),(0,t.jsx)("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),(0,t.jsx)("span",{children:"Continue with Google (In-Page)"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{L(null),l(u||"Student"),I("Guest session active! Instant access granted."),setTimeout(()=>{s()},200)},className:"w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95",children:[(0,t.jsx)(f.UserCheck,{size:14,className:"text-blue-600 dark:text-blue-400"}),(0,t.jsx)("span",{children:"Continue as Guest (Instant 0ms Access)"})]})]}),(0,t.jsx)("p",{className:"text-[10px] text-slate-400 text-center font-mono",children:"Zero popup windows • In-App Secure Authentication"})]})})}let N=(0,a.createContext)(void 0);function D({children:e}){let[b,x]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user");return e?JSON.parse(e):null}catch{return null}}),[y,f]=(0,a.useState)(!1),[v,k]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest",a=localStorage.getItem(`nextsem_practical_completed_${t}`);return a?JSON.parse(a):[]}catch{return[]}}),[w,S]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest",a=localStorage.getItem(`nextsem_practical_github_urls_${t}`);return a?JSON.parse(a):{}}catch{return{}}}),[C,A]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest";return localStorage.getItem(`nextsem_practical_gh_username_${t}`)||""}catch{return""}}),[T,P]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest";return localStorage.getItem(`nextsem_practical_track_${t}`)||"web-dev"}catch{return"web-dev"}}),[L,M]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest",a=localStorage.getItem(`nextsem_practical_socials_${t}`);return a?JSON.parse(a):{}}catch{return{}}}),[I,E]=(0,a.useState)(!1),[B,R]=(0,a.useState)(()=>{try{let e=localStorage.getItem("nextsem_user"),t=e?JSON.parse(e).email:"guest",a=localStorage.getItem(`nextsem_cbt_score_${t}`)||localStorage.getItem("nextsem_cbt_score_latest");return a?JSON.parse(a):null}catch{return null}}),[H,O]=(0,a.useState)(!1),[F,G]=(0,a.useState)(!1),_=(0,a.useCallback)(()=>{O(!0)},[]),z=(0,a.useCallback)(()=>{O(!1)},[]),W=(0,a.useCallback)(()=>{G(!0)},[]),U=(0,a.useCallback)(()=>{G(!1)},[]);(0,a.useEffect)(()=>{let e=()=>G(!0);return window.addEventListener("open_google_auth",e),window.addEventListener("open_inapp_auth",e),()=>{window.removeEventListener("open_google_auth",e),window.removeEventListener("open_inapp_auth",e)}},[]);let q=(0,a.useCallback)(e=>{try{let t=localStorage.getItem(`nextsem_practical_completed_${e}`),a=localStorage.getItem(`nextsem_practical_github_urls_${e}`),s=localStorage.getItem(`nextsem_practical_gh_username_${e}`),i=localStorage.getItem(`nextsem_practical_track_${e}`),r=localStorage.getItem(`nextsem_practical_socials_${e}`),n=localStorage.getItem(`nextsem_cbt_score_${e}`)||localStorage.getItem("nextsem_cbt_score_latest");if(t)k(JSON.parse(t));else{let t=[];for(let a=1;a<=90;a++)"true"===localStorage.getItem(`nextsem_practical_day_${a}_done_${e}`)&&t.push(a);k(t)}a&&S(JSON.parse(a)),s&&A(s),i&&P(i),r?M(JSON.parse(r)):M({}),n?R(JSON.parse(n)):R(null)}catch(e){console.error("Failed to load local progress:",e)}},[]),J=(0,a.useCallback)(async e=>{try{let t=e.email||"student",a=(0,p.doc)(s.db,"users_progress",e.uid),i=await (0,m.getDoc)(a),r=[],n={},o="",l="web-dev",d={},c=null;if(i.exists()){let e=i.data();e.cbt_score&&(c=e.cbt_score),e.bca_practical&&(r=e.bca_practical.completedDays||[],n=e.bca_practical.githubRepoUrls||{},o=e.bca_practical.githubUsername||"",l=e.bca_practical.selectedTrack||"web-dev",d=e.bca_practical.socialLinks||{})}let u=localStorage.getItem(`nextsem_practical_completed_${t}`),h=u?JSON.parse(u):[],g=Array.from(new Set([...r,...h])).sort((e,t)=>e-t),b=localStorage.getItem(`nextsem_practical_github_urls_${t}`),x=b?JSON.parse(b):{},y={...n,...x},f=o||localStorage.getItem(`nextsem_practical_gh_username_${t}`)||"",v=l||localStorage.getItem(`nextsem_practical_track_${t}`)||"web-dev",w=localStorage.getItem(`nextsem_practical_socials_${t}`),C=w?JSON.parse(w):{},j={...d,...C},N=localStorage.getItem(`nextsem_cbt_score_${t}`)||localStorage.getItem("nextsem_cbt_score_latest"),D=c;if(N)try{let e=JSON.parse(N);D?e.submittedAt&&D.submittedAt&&new Date(e.submittedAt).getTime()>=new Date(D.submittedAt).getTime()&&(D=e):D=e}catch{}D&&(R(D),localStorage.setItem(`nextsem_cbt_score_${t}`,JSON.stringify(D)),localStorage.setItem("nextsem_cbt_score_latest",JSON.stringify(D))),k(g),S(y),A(f),P(v),M(j),E(!0),localStorage.setItem(`nextsem_practical_completed_${t}`,JSON.stringify(g)),localStorage.setItem(`nextsem_practical_github_urls_${t}`,JSON.stringify(y)),localStorage.setItem(`nextsem_practical_gh_username_${t}`,f),localStorage.setItem(`nextsem_practical_track_${t}`,v),localStorage.setItem(`nextsem_practical_socials_${t}`,JSON.stringify(j)),await (0,m.setDoc)(a,{email:e.email,displayName:e.displayName,photoURL:e.photoURL,...D?{cbt_score:D}:{},bca_practical:{completedDays:g,githubRepoUrls:y,githubUsername:f,selectedTrack:v,socialLinks:j,lastUpdated:new Date().toISOString()}},{merge:!0})}catch(e){console.warn("Silent background firestore sync warning:",e),E(!1)}},[]);(0,a.useEffect)(()=>{(0,d.getRedirectResult)(s.auth).then(e=>{if(e&&e.user){let t=e.user,a={uid:t.uid,name:t.displayName||"NextSem Student",email:t.email||"student@nextsem.local",photo:t.photoURL,isGuest:!1};x(a),localStorage.setItem("nextsem_user",JSON.stringify(a)),q(a.email),J(t).catch(()=>{})}}).catch(e=>{console.warn("Redirect auth check:",e)});let e=(0,c.onAuthStateChanged)(s.auth,e=>{if(e){let t={uid:e.uid,name:e.displayName||"NextSem Student",email:e.email||"student@nextsem.local",photo:e.photoURL,isGuest:!1};x(t),localStorage.setItem("nextsem_user",JSON.stringify(t)),q(t.email),f(!1),J(e).catch(()=>{})}else{try{let e=localStorage.getItem("nextsem_user");if(e){let t=JSON.parse(e);if(t&&(t.email||t.uid)){x(t),E(!1),q(t.email||"guest"),f(!1);return}}}catch(e){console.error("Failed to parse saved user session",e)}x(null),E(!1),q("guest"),f(!1)}});return()=>e()},[q,J]);let Y=(0,a.useCallback)(async()=>{try{let e=await (0,s.signInWithGoogle)();if(e&&e.user){let t=e.user,a={uid:t.uid,name:t.displayName||"NextSem Student",email:t.email||"student@nextsem.local",photo:t.photoURL,isGuest:!1};x(a),localStorage.setItem("nextsem_user",JSON.stringify(a)),q(a.email),J(t).catch(()=>{})}}catch(e){throw console.error("Google Sign-In failed:",e),e?.code==="auth/configuration-not-found"||e?.message?.includes("CONFIGURATION_NOT_FOUND")?alert("Google Sign-In is not enabled in Firebase Console for this project. Please use Instant Guest Mode or In-App Email login."):e?.code!=="auth/popup-closed-by-user"&&console.warn("Google Auth Notice:",e?.message||e),e}},[q,J]),$=(0,a.useCallback)(async e=>{try{let t=i.GoogleAuthProvider.credential(e),a=(await (0,r.signInWithCredential)(s.auth,t)).user,n={uid:a.uid,name:a.displayName||"NextSem Student",email:a.email||"student@nextsem.local",photo:a.photoURL,isGuest:!1};return x(n),localStorage.setItem("nextsem_user",JSON.stringify(n)),q(n.email),J(a).catch(()=>{}),!0}catch(e){return console.error("Google One Tap token sign-in error:",e),!1}},[q,J]),K=(0,a.useCallback)((e,t)=>{let a=t.trim().toLowerCase(),s=e.trim()||a.split("@")[0],i={uid:`google_${a.replace(/[^a-zA-Z0-9]/g,"_")}`,name:s,email:a,photo:null,isGuest:!1};x(i),localStorage.setItem("nextsem_user",JSON.stringify(i)),q(a)},[q]),V=(0,a.useCallback)(async(e,t)=>{let a=e.trim().toLowerCase();if(!a||!t)return{success:!1,error:"Please enter your email and password."};try{let e=(await (0,n.signInWithEmailAndPassword)(s.auth,a,t)).user,i={uid:e.uid,name:e.displayName||a.split("@")[0],email:e.email||a,photo:e.photoURL,isGuest:!1};return x(i),localStorage.setItem("nextsem_user",JSON.stringify(i)),q(i.email),J(e).catch(()=>{}),{success:!0}}catch(i){if(console.warn("Firebase email sign-in fallback/error:",i),(i?.code==="auth/user-not-found"||i?.code==="auth/invalid-credential")&&t.length>=6)try{let e=(await (0,o.createUserWithEmailAndPassword)(s.auth,a,t)).user,i={uid:e.uid,name:a.split("@")[0],email:e.email||a,photo:null,isGuest:!1};return x(i),localStorage.setItem("nextsem_user",JSON.stringify(i)),q(i.email),J(e).catch(()=>{}),{success:!0}}catch(e){if(e?.code==="auth/email-already-in-use")return{success:!1,error:"Incorrect password for this email. Please check your password or continue with 'Google' / 'Instant Guest Mode'."}}if(i?.code==="auth/configuration-not-found"||i?.code==="auth/operation-not-allowed"||i?.code==="auth/network-request-failed"){let e={uid:`student_${a.replace(/[^a-zA-Z0-9]/g,"_")}`,name:a.split("@")[0],email:a,photo:null,isGuest:!1};return x(e),localStorage.setItem("nextsem_user",JSON.stringify(e)),q(a),{success:!0}}let e="Failed to sign in. Please check your credentials.";return i?.code==="auth/user-not-found"||i?.code==="auth/wrong-password"||i?.code==="auth/invalid-credential"?e="Invalid email or password. Please click 'Create Free Account' or continue with 'Google' / 'Instant Guest Mode'.":i?.code==="auth/invalid-email"&&(e="Please enter a valid email address."),{success:!1,error:e}}},[q,J]),Q=(0,a.useCallback)(async(e,t,a)=>{let i=e.trim()||"Student",r=t.trim().toLowerCase();if(!r||!a)return{success:!1,error:"Please enter your name, email, and password."};if(a.length<6)return{success:!1,error:"Password must be at least 6 characters long."};try{let e=(await (0,o.createUserWithEmailAndPassword)(s.auth,r,a)).user;await (0,l.updateProfile)(e,{displayName:i});let t={uid:e.uid,name:i,email:r,photo:null,isGuest:!1};return x(t),localStorage.setItem("nextsem_user",JSON.stringify(t)),q(r),J(e).catch(()=>{}),{success:!0}}catch(t){if(console.warn("Firebase sign-up fallback:",t),t?.code==="auth/configuration-not-found"||t?.code==="auth/operation-not-allowed"){let e={uid:`student_${r.replace(/[^a-zA-Z0-9]/g,"_")}`,name:i,email:r,photo:null,isGuest:!1};return x(e),localStorage.setItem("nextsem_user",JSON.stringify(e)),q(r),{success:!0}}let e="Failed to create account.";return t?.code==="auth/email-already-in-use"?e="This email is already registered. Please sign in instead.":t?.code==="auth/weak-password"?e="Password is too weak. Please use at least 6 characters.":t?.code==="auth/invalid-email"&&(e="Please enter a valid email address."),{success:!1,error:e}}},[q,J]),Z=(0,a.useCallback)(e=>{let t=e?.trim()||"Guest Student",a={uid:`guest_${Date.now()}`,name:t,email:"guest@nextsem.local",photo:null,isGuest:!0};x(a),E(!1),localStorage.setItem("nextsem_user",JSON.stringify(a)),q(a.email)},[q]),X=(0,a.useCallback)(async()=>{try{b?.isGuest||await (0,u.signOut)(s.auth),localStorage.removeItem("nextsem_user"),x(null),R(null),E(!1),q("guest")}catch(e){console.error("Sign Out failed:",e)}},[b,q]),ee=(0,a.useCallback)(e=>e<=1||v.includes(e-1),[v]),et=(0,a.useCallback)(e=>v.includes(e),[v]),ea=(0,a.useCallback)(async(e,t)=>{if(!b)return{success:!1,message:"Google Sign-In Required: You must be logged in with your Google account to record your completed project and unlock the next lesson."};let a=t.trim();if(!a)return{success:!1,message:"Please provide your GitHub repository or commit URL."};let i=a.match(/^https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(\/.*)?$/i);if(!i)return{success:!1,message:"Invalid GitHub URL format. Please provide your real project repository link (e.g., https://github.com/your-username/html-day1-portfolio)."};let r=i[2],n=r.toLowerCase(),o=i[3].toLowerCase().replace(/\.git$/,"");if(["your-username","your_username","yourname","username","example","octocat","user","template","null","undefined","none","student","facebook","vercel","google","microsoft","github"].includes(n))return{success:!1,message:`"${r}" is an example placeholder. Please provide your OWN personal GitHub account repository URL where you pushed your project.`};if(["your-repo","your-repo-name","repo-name","my-repo","example-repo","placeholder","repo","project-name","project","none","undefined"].includes(o))return{success:!1,message:`"${i[3]}" looks like a template placeholder. Please provide the actual repository name where your code is pushed.`};let l=Array.from(new Set([...v,e])).sort((e,t)=>e-t),d={...w,[e.toString()]:a};k(l),S(d),r&&!C&&A(r);let c=b.email;localStorage.setItem(`nextsem_practical_completed_${c}`,JSON.stringify(l)),localStorage.setItem(`nextsem_practical_github_urls_${c}`,JSON.stringify(d)),localStorage.setItem(`nextsem_practical_day_${e}_done_${c}`,"true"),r&&localStorage.setItem(`nextsem_practical_gh_username_${c}`,r),b&&!b.isGuest&&((0,m.setDoc)((0,p.doc)(s.db,"users_progress",b.uid),{email:b.email,displayName:b.name,photoURL:b.photo,bca_practical:{completedDays:l,githubRepoUrls:d,githubUsername:r||C,selectedTrack:T,lastUpdated:new Date().toISOString()}},{merge:!0}).then(()=>E(!0)).catch(e=>console.error("Firestore sync warning:",e)),(0,m.setDoc)((0,p.doc)(s.db,"bca_practical_stories",`${b.uid}_day_${e}`),{userId:b.uid,userName:b.name,userPhoto:b.photo,day:e,githubRepoUrl:a,timestamp:new Date().toISOString()},{merge:!0}).catch(()=>{}));try{let t=localStorage.getItem("nextsem_user_custom_stories"),s=t?JSON.parse(t):[],i={id:`auto-day-${e}-${Date.now()}`,day:e,lessonTitle:`Day ${e} Practical Milestone`,category:e<=10?"HTML":e<=20?"CSS":"JavaScript",timestamp:"Just now",caption:`Completed Day ${e} and pushed verified code to GitHub! Technical Viva passed 100%. 🚀`,vivaScore:"100% Viva Approved",githubRepoUrl:a,techTags:["BCA","Practical","Milestone","VerifiedCode"],gradientTheme:"from-blue-600 via-indigo-600 to-purple-800",createdAt:Date.now()},r=s.filter(t=>t.day!==e);localStorage.setItem("nextsem_user_custom_stories",JSON.stringify([i,...r]))}catch(e){console.warn("Could not auto-save story status:",e)}return(0,h.triggerCelebration)(),{success:!0,message:`Day ${e} successfully submitted! Story status published to community feed.`}},[b,v,w,C,T]),es=(0,a.useCallback)(async e=>{P(e);let t=b?b.email:"guest";localStorage.setItem(`nextsem_practical_track_${t}`,e),b&&!b.isGuest&&(0,m.setDoc)((0,p.doc)(s.db,"users_progress",b.uid),{bca_practical:{selectedTrack:e,lastUpdated:new Date().toISOString()}},{merge:!0}).catch(()=>{})},[b]),ei=(0,a.useCallback)(async e=>{A(e);let t=b?b.email:"guest";localStorage.setItem(`nextsem_practical_gh_username_${t}`,e),b&&!b.isGuest&&(0,m.setDoc)((0,p.doc)(s.db,"users_progress",b.uid),{bca_practical:{githubUsername:e,lastUpdated:new Date().toISOString()}},{merge:!0}).catch(()=>{})},[b]),er=(0,a.useCallback)(async e=>{let t={...L,...e};M(t);let a=b?b.email:"guest";localStorage.setItem(`nextsem_practical_socials_${a}`,JSON.stringify(t)),b&&!b.isGuest&&(0,m.setDoc)((0,p.doc)(s.db,"users_progress",b.uid),{bca_practical:{socialLinks:t,lastUpdated:new Date().toISOString()}},{merge:!0}).catch(()=>{})},[b,L]),en=(0,a.useCallback)(async e=>{R(e);try{localStorage.setItem("nextsem_cbt_score_latest",JSON.stringify(e));let t=b?b.email:"guest";localStorage.setItem(`nextsem_cbt_score_${t}`,JSON.stringify(e))}catch(e){console.warn("Local storage write error for CBT score:",e)}return b&&!b.isGuest?((0,m.setDoc)((0,p.doc)(s.db,"users_progress",b.uid),{email:b.email,displayName:b.name,photoURL:b.photo,cbt_score:e,lastUpdated:new Date().toISOString()},{merge:!0}).then(()=>E(!0)).catch(e=>console.warn("Firestore background sync warning for CBT score:",e)),E(!0),(0,h.triggerCelebration)(),{success:!0,message:"Your CBT score has been permanently linked and saved to your Google Cloud profile!"}):((0,h.triggerCelebration)(),{success:!0,message:"Score saved to device! Sign in with Google to permanently link your badge to Google Cloud."})},[b]),eo=(0,a.useMemo)(()=>({user:b,loading:y,completedDays:v,githubRepoUrls:w,githubUsername:C,selectedTrack:T,socialLinks:L,updateSocialLinks:er,isCloudSynced:I,cbtScore:B,saveCbtScore:en,isProfileDashboardOpen:H,openProfileDashboard:_,closeProfileDashboard:z,isAuthModalOpen:F,openAuthModal:W,closeAuthModal:U,signIn:Y,signInWithGoogleToken:$,signInDirectlyAsStudent:K,signInWithEmail:V,signUpWithEmail:Q,signInAsGuest:Z,signOut:X,isDayCompleted:et,isDayUnlocked:ee,completeDayWithGitHub:ea,setSelectedTrack:es,setGithubUsername:ei}),[b,y,v,w,C,T,L,er,I,B,en,H,_,z,F,W,U,Y,$,K,V,Q,Z,X,et,ee,ea,es,ei]);return(0,t.jsxs)(N.Provider,{value:eo,children:[e,(0,t.jsx)(g.default,{isOpen:H,onClose:z}),(0,t.jsx)(j,{isOpen:F,onClose:U})]})}function A(){let e=(0,a.useContext)(N);if(!e)throw Error("useStudentProgress must be used within a StudentProgressProvider");return e}}]);