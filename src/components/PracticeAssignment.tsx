"use client";

import React, { useState, useCallback } from 'react';
import { useProgress } from '../context/ProgressContext';
import { HelpCircle, CheckCircle, Award, AlertCircle } from 'lucide-react';
import InteractivePre from './InteractivePre';

interface PracticeAssignmentProps {
  chapterId: string;
  instructions: string[];
}

const CHAPTER_HINTS: Record<string, string[]> = {
  "p0-1-setup": [
    "Download Chrome: <a href='https://www.google.com/chrome/' target='_blank' class='text-blue-400 hover:underline font-bold'>Google Chrome</a>",
    "During VS Code installation, verify that the <strong>'Add to PATH'</strong> checkbox is ticked."
  ],
  "p0-2-terminal": [
    "To create a directory, run:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>mkdir nextsem-practice</pre>",
    "To enter the directory, run:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>cd nextsem-practice</pre>",
    "To create a file inside the folder, run:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>touch hello.txt</pre>"
  ],
  "p0-3-vscode": [
    "Open the Extensions view by clicking the Extensions icon on the left Activity Bar or by pressing:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>Ctrl + Shift + X</pre>",
    "Search for <strong>'Prettier'</strong> or <strong>'Live Server'</strong> inside the marketplace search bar and click the green Install button."
  ],
  "p0-4-git": [
    "Initialize repository:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>git init</pre>",
    "Stage all changes:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>git add .</pre>",
    "Commit snapshot:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>git commit -m \"first commit\"</pre>"
  ],
  "p0-5-devtools": [
    "Switch the playground tab to <strong>JS</strong> using the tab buttons at the top of the editor, then type your JavaScript code there.",
    "Declaring the topics array:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>const topics = [\n  { topic: \"HTML\", status: \"Done\" },\n  { topic: \"CSS\", status: \"Active\" },\n  { topic: \"DevTools\", status: \"Studying\" }\n];</pre>",
    "Logging and tabling the array:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>console.log(topics);\nconsole.table(topics);</pre>",
    "For loop over topics:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>for (let i = 0; i < topics.length; i++) {\n  console.log(topics[i].topic);\n}</pre>"
  ],
  "p1-2-links-and-media": [
    "External link syntax (target='_blank'):<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;a href=\"https://nextsem.online\" target=\"_blank\" rel=\"noopener noreferrer\"&gt;Visit Nextsem&lt;/a&gt;</pre>",
    "Image tag with alt text:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;img src=\"logo.svg\" alt=\"Nextsem Logo\" width=\"120\" height=\"40\" /&gt;</pre>",
    "Audio/Video embedding with native player controls:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;video src=\"/walkthrough.mp4\" controls width=\"480\"&gt;\n  Your browser does not support video.\n&lt;/video&gt;</pre>"
  ],
  "p1-3-lists-and-tables": [
    "Ordered list syntax:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;ol&gt;\n  &lt;li&gt;Step One&lt;/li&gt;\n  &lt;li&gt;Step Two&lt;/li&gt;\n&lt;/ol&gt;</pre>",
    "Table layout skeleton:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;table&gt;\n  &lt;thead&gt;\n    &lt;tr&gt;\n      &lt;th&gt;Day&lt;/th&gt;\n      &lt;th&gt;Subject&lt;/th&gt;\n    &lt;/tr&gt;\n  &lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;\n      &lt;td&gt;Monday&lt;/td&gt;\n      &lt;td&gt;HTML5&lt;/td&gt;\n    &lt;/tr&gt;\n  &lt;/tbody&gt;\n&lt;/table&gt;</pre>"
  ],
  "p1-4-forms-and-inputs": [
    "Form wrapping inputs structure:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;form action=\"/register\" method=\"POST\"&gt;\n  &lt;label for=\"email\"&gt;Email:&lt;/label&gt;\n  &lt;input type=\"email\" id=\"email\" required /&gt;\n  &lt;button type=\"submit\"&gt;Submit&lt;/button&gt;\n&lt;/form&gt;</pre>",
    "Password field with minimum character limit:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;input type=\"password\" minlength=\"8\" required /&gt;</pre>"
  ],
  "p1-5-semantics-and-seo": [
    "A standard HTML5 page skeleton with semantic tags:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>&lt;header&gt;\n  &lt;nav&gt;...&lt;/nav&gt;\n&lt;/header&gt;\n&lt;main&gt;\n  &lt;article&gt;\n    &lt;h1&gt;Lesson Header&lt;/h1&gt;\n  &lt;/article&gt;\n&lt;/main&gt;\n&lt;footer&gt;\n  &lt;p&gt;&amp;copy; 2026&lt;/p&gt;\n&lt;/footer&gt;</pre>"
  ],
  "p2-1-selectors": [
    "Select using ID (#), Class (.), or HTML Tag Name:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>/* ID Selector (Blue) */\n#main-title { color: blue; }\n\n/* Class Selector (Green) */\n.title { color: green; }\n\n/* Element Tag Selector (Red) */\nh1 { color: red; }</pre>"
  ],
  "p2-2-colors": [
    "Styling gradients & text-shadows:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.card {\n  background: linear-gradient(135deg, #0b1329, #00ffff);\n  color: white;\n  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);\n}</pre>"
  ],
  "p2-3-box-model": [
    "Global box sizing setup:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>*, *::before, *::after {\n  box-sizing: border-box;\n}</pre>",
    "Box sizing property rule:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.box {\n  width: 300px;\n  padding: 30px;\n  border: 10px solid black;\n  box-sizing: border-box; /* total width stays 300px */\n}</pre>"
  ],
  "p2-4-positioning": [
    "Sticky element styling:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.sticky-header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}</pre>",
    "Absolute positioned badges within relative containers:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}</pre>"
  ],
  "p2-5-flexbox": [
    "Flex elements distribution layout:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.nav-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 15px;\n}</pre>"
  ],
  "p2-6-grid": [
    "Auto-fitting columns gallery layout:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.grid-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}</pre>"
  ],
  "p2-7-transitions": [
    "Hover animations with transition and scale properties:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>.card {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card:hover {\n  transform: scale(1.03);\n  box-shadow: 0 10px 20px rgba(0, 255, 255, 0.25);\n}</pre>"
  ],
  "p2-8-variables-themes": [
    "CSS variables implementation:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>:root {\n  --primary-color: #39ff14;\n}\nbody.dark {\n  --primary-color: #ff007f;\n}\n.card {\n  background-color: var(--primary-color);\n}</pre>"
  ],
  "p3-1-basics": [
    "Variables assignment and console logging:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>const name = \"Alex\";\nlet age = 20;\nconst isStudent = true;\n\nconsole.log(name, age, isStudent);</pre>"
  ],
  "p3-2-control-flow": [
    "Conditionals if/else logic:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>if (age &gt;= 18) {\n  console.log(\"Access Granted\");\n} else {\n  console.log(\"Access Denied\");\n}</pre>",
    "Loops statement rendering even numbers:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>for (let i = 0; i &lt;= 10; i += 2) {\n  console.log(i);\n}</pre>"
  ],
  "p3-3-functions": [
    "Classic functions vs Arrow functions syntax:<br><pre class='font-mono bg-[#090f1e] border border-blue-500/10 p-2.5 rounded-lg text-yellow-405 mt-2 text-[11px] overflow-x-auto'>// Classic\nfunction greetUser(name) {\n  return \"Hello \" + name;\n}\n\n// Arrow\nconst greetUser = (name) =&gt; \"Hello \" + name;</pre>"
  ]
};

// ── Complete working answers for each chapter assignment ──
const CHAPTER_ANSWERS: Record<string, { html?: string; css?: string; js?: string }> = {
  "p0-2-terminal": { html: `mkdir nextsem-practice\ncd nextsem-practice\ntouch hello.txt` },
  "p0-4-git": { html: `git init\ngit add .\ngit commit -m "first commit"` },
  "p0-5-devtools": {
    js: `const topics = [\n  { topic: "HTML", status: "Done" },\n  { topic: "CSS", status: "Active" },\n  { topic: "DevTools", status: "Studying" }\n];\n\nconsole.log(topics);\nconsole.table(topics);\n\nfor (let i = 0; i < topics.length; i++) {\n  console.log(topics[i].topic);\n}`,
  },
  "p1-1-intro-and-text": {
    html: `<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8"><title>My Page</title></head>\n<body>\n  <h1>Welcome to Nextsem Academy</h1>\n  <h2>About Me</h2>\n  <p>I am learning web development step by step.</p>\n  <strong>Key skill:</strong> HTML5\n  <br><em>Enjoying every chapter!</em>\n</body>\n</html>`,
  },
  "p1-2-links-and-media": {
    html: `<a href="https://nextsem.online" target="_blank" rel="noopener noreferrer">Visit Nextsem</a>\n\n<img src="https://picsum.photos/300/200" alt="Nextsem Logo" width="300" height="200" />\n\n<video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" controls width="480">\n  Your browser does not support video.\n</video>`,
  },
  "p1-3-lists-and-tables": {
    html: `<h2>My Skills</h2>\n<ul><li>HTML5</li><li>CSS3</li><li>JavaScript</li></ul>\n\n<h2>Study Plan</h2>\n<ol><li>Complete HTML module</li><li>Master CSS layouts</li><li>Build JS projects</li></ol>\n\n<h2>Weekly Schedule</h2>\n<table border="1" cellpadding="8">\n  <thead><tr><th>Day</th><th>Subject</th></tr></thead>\n  <tbody>\n    <tr><td>Monday</td><td>HTML5</td></tr>\n    <tr><td>Tuesday</td><td>CSS3</td></tr>\n  </tbody>\n</table>`,
  },
  "p1-4-forms-and-inputs": {
    html: `<form action="/register" method="POST">\n  <label for="name">Full Name:</label><br>\n  <input type="text" id="name" name="name" required /><br><br>\n  <label for="email">Email:</label><br>\n  <input type="email" id="email" name="email" required /><br><br>\n  <label for="password">Password:</label><br>\n  <input type="password" id="password" minlength="8" required /><br><br>\n  <button type="submit">Sign Up</button>\n</form>`,
  },
  "p1-5-semantics-and-seo": {
    html: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Nextsem Academy">\n  <title>Nextsem</title>\n</head>\n<body>\n  <header><nav><a href="/">Home</a> <a href="/about">About</a></nav></header>\n  <main>\n    <article><h1>Welcome to Nextsem</h1><p>Your web dev journey starts here.</p></article>\n  </main>\n  <footer><p>&copy; 2026 Nextsem Academy</p></footer>\n</body>\n</html>`,
  },
  "p2-1-selectors": {
    html: `<h1 id="main-title">Main Title (ID)</h1>\n<h1 class="title">Class Title</h1>\n<h1>Plain H1 Tag</h1>`,
    css: `#main-title { color: blue; font-size: 28px; }\n.title { color: green; font-style: italic; }\nh1 { font-family: sans-serif; border-bottom: 2px solid #ccc; padding-bottom: 4px; }`,
  },
  "p2-2-colors": {
    html: `<div class="card"><h2>Nextsem Card</h2><p>Gradients and text-shadow!</p></div>`,
    css: `.card {\n  background: linear-gradient(135deg, #0b1329, #00ffff);\n  color: white;\n  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);\n  padding: 30px;\n  border-radius: 12px;\n  max-width: 400px;\n  margin: 20px auto;\n}`,
  },
  "p2-3-box-model": {
    html: `<div class="box">Box Model Demo</div>`,
    css: `*, *::before, *::after { box-sizing: border-box; }\n.box {\n  width: 300px;\n  padding: 30px;\n  border: 10px solid #3b82f6;\n  margin: 20px auto;\n  background: #1e3a5f;\n  color: white;\n  font-family: sans-serif;\n  text-align: center;\n  border-radius: 8px;\n}`,
  },
  "p2-4-positioning": {
    html: `<header class="sticky-header">Sticky Nav</header>\n<div class="card"><p>Product</p><span class="badge">NEW</span></div>`,
    css: `.sticky-header { position: sticky; top: 0; z-index: 100; background: #1e3a5f; color: white; padding: 14px 20px; font-weight: bold; }\n.card { position: relative; background: #f1f5f9; padding: 40px 20px; margin: 20px auto; max-width: 300px; border-radius: 12px; }\n.badge { position: absolute; top: 10px; right: 10px; background: #ef4444; color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }`,
  },
  "p2-5-flexbox": {
    html: `<nav class="nav-container">\n  <span class="logo">Nextsem</span>\n  <div><a href="#">Home</a> <a href="#">Courses</a></div>\n  <button>Sign In</button>\n</nav>`,
    css: `.nav-container { display: flex; justify-content: space-between; align-items: center; gap: 15px; padding: 14px 24px; background: #0b1329; color: white; border-radius: 10px; }\n.logo { font-weight: 900; font-size: 18px; color: #39ff14; }\na { color: #94a3b8; text-decoration: none; margin: 0 8px; }\nbutton { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; }`,
  },
  "p2-6-grid": {
    html: `<div class="grid-gallery">\n  <div class="item">Card 1</div>\n  <div class="item">Card 2</div>\n  <div class="item">Card 3</div>\n  <div class="item">Card 4</div>\n  <div class="item">Card 5</div>\n</div>`,
    css: `.grid-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 20px; }\n.item { background: linear-gradient(135deg, #1e3a5f, #3b82f6); color: white; padding: 40px 20px; border-radius: 12px; text-align: center; font-weight: bold; font-family: sans-serif; }`,
  },
  "p2-7-transitions": {
    html: `<div class="card">Hover over me!</div>`,
    css: `.card { width: 200px; height: 120px; margin: 60px auto; background: linear-gradient(135deg, #1e3a5f, #3b82f6); color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: sans-serif; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; }\n.card:hover { transform: scale(1.08); box-shadow: 0 10px 30px rgba(0,200,255,0.4); }`,
  },
  "p2-8-variables-themes": {
    html: `<div class="card"><p>Theme Demo</p><button onclick="document.body.classList.toggle('dark')">Toggle Theme</button></div>`,
    css: `:root { --primary-color: #39ff14; --bg: #ffffff; --text: #1e293b; }\nbody.dark { --primary-color: #ff007f; --bg: #0b1329; --text: #e2e8f0; }\nbody { background: var(--bg); color: var(--text); transition: all 0.4s; padding: 30px; font-family: sans-serif; }\n.card { border: 3px solid var(--primary-color); padding: 24px; border-radius: 12px; max-width: 300px; }\nbutton { background: var(--primary-color); border: none; padding: 10px 20px; border-radius: 8px; margin-top: 12px; cursor: pointer; font-weight: bold; }`,
  },
  "p3-1-basics": {
    js: `const name = "Alex";\nlet age = 20;\nconst isStudent = true;\n\nconsole.log(name, age, isStudent);\nconsole.log("Type:", typeof isStudent);\nconsole.log("Name length:", name.length);`,
  },
  "p3-2-control-flow": {
    js: `const age = 20;\n\nif (age >= 18) {\n  console.log("Access Granted");\n} else {\n  console.log("Access Denied");\n}\n\nfor (let i = 0; i <= 10; i += 2) {\n  console.log("Even:", i);\n}`,
  },
  "p3-3-functions": {
    js: `function greetUser(name) {\n  return "Hello " + name + "!";\n}\n\nconst greetArrow = (name) => "Hi " + name + " from arrow!";\n\nconsole.log(greetUser("Alex"));\nconsole.log(greetArrow("Jordan"));`,
  },
  "p3-4-arrays": {
    js: `const fruits = ["Apple", "Banana", "Cherry"];\nfruits.push("Mango");\nconsole.log("After push:", fruits);\nfruits.pop();\nconsole.log("After pop:", fruits);\nconsole.log("First:", fruits[0]);`,
  },
  "p3-5-array-iterators": {
    js: `const numbers = [1,2,3,4,5,6,7,8,9,10];\n\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled:", doubled);\n\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum:", sum);`,
  },
  "p3-6-objects": {
    js: `const student = {\n  name: "Alex",\n  age: 20,\n  course: "Web Development",\n  greet() { return "Hi, I am " + this.name; }\n};\n\nconsole.log(student.name);\nconsole.log(student.greet());\n\nconst { name, course } = student;\nconsole.log(name, course);`,
  },
  "p3-7-dom-selection": {
    html: `<h1 id="title">Hello DOM!</h1>\n<p class="info">Paragraph 1</p>\n<p class="info">Paragraph 2</p>\n<button onclick="changeTitle()">Change Title</button>`,
    js: `function changeTitle() {\n  const title = document.getElementById("title");\n  title.textContent = "Title Changed!";\n  title.style.color = "#39ff14";\n  document.querySelectorAll(".info").forEach(el => el.style.color = "#3b82f6");\n}`,
  },
  "p3-8-dom-manipulation": {
    html: `<div id="container"><p>Original content</p></div>\n<button onclick="addItem()">Add Item</button>\n<button onclick="removeItem()">Remove Last</button>`,
    js: `function addItem() {\n  const c = document.getElementById("container");\n  const p = document.createElement("p");\n  p.textContent = "Added at " + new Date().toLocaleTimeString();\n  p.style.color = "#39ff14";\n  c.appendChild(p);\n}\nfunction removeItem() {\n  const c = document.getElementById("container");\n  if (c.lastElementChild) c.removeChild(c.lastElementChild);\n}`,
  },
  "p3-9-events": {
    html: `<button id="btn">Click Me!</button>\n<div id="output" style="margin-top:16px;font-family:sans-serif;"></div>`,
    js: `let count = 0;\ndocument.getElementById("btn").addEventListener("click", () => {\n  count++;\n  const out = document.getElementById("output");\n  out.textContent = "Clicked " + count + " time(s)!";\n  out.style.color = count % 2 === 0 ? "#3b82f6" : "#39ff14";\n});`,
  },
  "p3-10-storages": {
    js: `localStorage.setItem("theme", "dark");\n\nconst saved = localStorage.getItem("theme");\nconsole.log("Saved theme:", saved);\n\nif (saved === "dark") console.log("Dark mode active!");\n\nsessionStorage.setItem("session_user", "Alex");\nconsole.log("Session user:", sessionStorage.getItem("session_user"));`,
  },
};

const validateAssignment = (chapterId: string, html: string, css: string, js: string): boolean => {
  const cleanHtml = (html || "").toLowerCase().trim();
  const cleanCss = (css || "").toLowerCase().trim();
  const cleanJs = (js || "").toLowerCase().trim();

  // If user hasn't added anything meaningful, reject
  if (cleanHtml.length < 5 && cleanCss.length < 5 && cleanJs.length < 5) {
    return false;
  }

  switch (chapterId) {
    case "p0-2-terminal":
      // Requires mkdir, cd, and touch terminal commands
      return cleanHtml.includes("mkdir ") && cleanHtml.includes("cd ") && cleanHtml.includes("touch ");
    
    case "p0-4-git":
      // Requires git init, git add, git commit
      return cleanHtml.includes("git init") && cleanHtml.includes("git add") && cleanHtml.includes("git commit");
      
    case "p0-5-devtools":
      // JS tab: array of objects with topic+status keys, console.table, for loop
      return (
        cleanJs.includes("const topics") &&
        cleanJs.includes("console.log") &&
        cleanJs.includes("console.table") &&
        cleanJs.includes("for")
      );

    case "p1-2-links-and-media":
      // 1. External link to nextsem.online with target="_blank"
      // 2. img with alt attribute
      // 3. video or audio with controls
      const hasLink = cleanHtml.includes("href=") && cleanHtml.includes("nextsem.online") && (cleanHtml.includes("target=\"_blank\"") || cleanHtml.includes("target='_blank'"));
      const hasImg = cleanHtml.includes("<img") && cleanHtml.includes("alt=");
      const hasMedia = (cleanHtml.includes("<video") || cleanHtml.includes("<audio") || cleanHtml.includes("<iframe")) && cleanHtml.includes("controls");
      return hasLink && hasImg && hasMedia;

    case "p1-3-lists-and-tables":
      // 1. ol and ul lists
      // 2. table with tr, th, td
      const hasLists = cleanHtml.includes("<ol") && cleanHtml.includes("<ul");
      const hasTable = cleanHtml.includes("<table") && cleanHtml.includes("<tr") && (cleanHtml.includes("<th") || cleanHtml.includes("<td"));
      return hasLists && hasTable;

    case "p1-4-forms-and-inputs":
      // signup form, email, password minlength 8, required
      const hasForm = cleanHtml.includes("<form") && (cleanHtml.includes("type=\"email\"") || cleanHtml.includes("type='email'")) && (cleanHtml.includes("type=\"password\"") || cleanHtml.includes("type='password'"));
      const hasRequired = cleanHtml.includes("required");
      const hasMinLength = cleanHtml.includes("minlength=") || cleanHtml.includes("minlength=\"8\"") || cleanHtml.includes("minlength='8'");
      return hasForm && hasRequired && hasMinLength;

    case "p1-5-semantics-and-seo":
      // header, nav, main, article, footer
      return cleanHtml.includes("<header") && cleanHtml.includes("<nav") && cleanHtml.includes("<main") && cleanHtml.includes("<article") && cleanHtml.includes("<footer");

    case "p2-1-selectors":
      // h1 selector, class title selector, ID main-title selector
      return cleanCss.includes("h1") && cleanCss.includes(".title") && cleanCss.includes("#main-title");

    case "p2-2-colors":
      // linear-gradient background, text-shadow
      return cleanCss.includes("linear-gradient") && cleanCss.includes("text-shadow");

    case "p2-3-box-model":
      // box-sizing: border-box
      return cleanCss.includes("box-sizing") && cleanCss.includes("border-box");

    case "p2-4-positioning":
      // position: sticky, position: absolute, position: relative
      return cleanCss.includes("sticky") && cleanCss.includes("absolute") && cleanCss.includes("relative");

    case "p2-5-flexbox":
      // display: flex, justify-content: space-between, align-items: center
      return cleanCss.includes("flex") && cleanCss.includes("space-between") && cleanCss.includes("center");

    case "p2-6-grid":
      // display: grid, grid-template-columns, minmax
      return cleanCss.includes("grid") && cleanCss.includes("grid-template-columns") && cleanCss.includes("minmax");

    case "p2-7-transitions":
      // transition, transform: scale, hover
      return cleanCss.includes("transition") && cleanCss.includes("transform") && cleanCss.includes("scale") && cleanCss.includes(":hover");

    case "p2-8-variables-themes":
      // var(--), :root, .dark or body.dark
      return cleanCss.includes("var(") && cleanCss.includes(":root") && (cleanCss.includes(".dark") || cleanCss.includes("dark"));

    case "p3-1-basics":
      // const, let, console.log
      return cleanJs.includes("const ") && cleanJs.includes("let ") && cleanJs.includes("console.log");

    case "p3-2-control-flow":
      // if/else, for
      return cleanJs.includes("if") && cleanJs.includes("else") && cleanJs.includes("for");

    case "p3-3-functions":
      // function and => (arrow function)
      return (cleanJs.includes("function ") || cleanJs.includes("arrow") || cleanJs.includes("const ")) && cleanJs.includes("=>");

    default:
      // Fallback: require some text modifications
      return cleanHtml.length > 25 || cleanCss.length > 15 || cleanJs.length > 15;
  }
};

const getInitialLanguageClass = (chapterId: string): string => {
  if (chapterId.includes('terminal') || chapterId.includes('cli')) return 'language-cmd';
  if (chapterId.startsWith('p2-')) return 'language-css';
  if (chapterId.startsWith('p3-') || chapterId === 'p0-5-devtools') return 'language-javascript';
  return 'language-html';
};

const getInitialCode = (chapterId: string): string => {
  if (chapterId.includes('terminal') || chapterId.includes('cli')) {
    return `:: Write your Windows Command Prompt commands here\n`;
  }
  if (chapterId.startsWith('p2-')) {
    return `/* Write your CSS styling rules here to complete the assignment */\n`;
  }
  if (chapterId.startsWith('p3-') || chapterId === 'p0-5-devtools') {
    return `// Write your JavaScript code here\n// Click the JS tab above, then Run Code to see console outputs\n`;
  }
  return `<!-- Write your HTML structure here to complete the assignment -->\n`;
};

export default function PracticeAssignment({ chapterId, instructions }: PracticeAssignmentProps) {
  const { completedAssignments, markAssignmentComplete, markAssignmentIncomplete } = useProgress();
  const isDone = completedAssignments?.[chapterId] || false;
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [answerLoaded, setAnswerLoaded] = useState(false);
  const [playgroundKey, setPlaygroundKey] = useState(0);

  // Playground code state listeners
  const [currentHtml, setCurrentHtml] = useState("");
  const [currentCss, setCurrentCss] = useState("");
  const [currentJs, setCurrentJs] = useState("");

  const handleCodeChange = useCallback((h: string, c: string, j: string) => {
    setCurrentHtml(h);
    setCurrentCss(c);
    setCurrentJs(j);
  }, []);

  const answer = CHAPTER_ANSWERS[chapterId];

  const handleShowAnswer = () => {
    setAnswerLoaded(true);
    setPlaygroundKey(k => k + 1); // force playground remount with answer code
  };

  const hints = CHAPTER_HINTS[chapterId] || [
    "Follow the checklist tasks carefully to complete the assignment.",
    "Toggle 'Run Code' to compile and preview your outputs inside the Live Interactive Sandbox."
  ];

  // Evaluate current code validity (allow bypass if answer was loaded)
  const isValid = answerLoaded || validateAssignment(chapterId, currentHtml, currentCss, currentJs);

  const handleToggleDone = () => {
    if (isDone) {
      markAssignmentIncomplete(chapterId);
    } else {
      if (!isValid) {
        setValidationError("Your code doesn't satisfy the practice tasks yet. Check the instructions, use the hints, and make sure to write the required structures in the editor.");
        setTimeout(() => setValidationError(null), 5000);
        return;
      }
      markAssignmentComplete(chapterId);
    }
  };

  return (
    <div className="bg-gray-100/80 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 md:p-6 my-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Award className="text-yellow-500 w-6 h-6 shrink-0" />
        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white m-0">🎓 Practice Assignment Tasks</h3>
      </div>

      {/* Instructions List */}
      <ul className="space-y-2.5 mb-6 text-gray-700 dark:text-slate-350 pl-5 list-decimal text-xs md:text-sm font-medium leading-relaxed">
        {instructions.map((step, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: step }} />
        ))}
      </ul>

      {/* Hints Section */}
      {hints.length > 0 && (
        <div className="mb-6 bg-blue-50/80 dark:bg-slate-900/60 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <HelpCircle size={13} /> Stuck? Hints available
            </span>
            <button 
              onClick={() => {
                setShowHint(!showHint);
                setCurrentHintIndex(0);
              }}
              className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-bold underline transition-colors"
            >
              {showHint ? "Hide Hint" : "Reveal Hint"}
            </button>
          </div>

          {showHint && (
            <div className="mt-3 text-xs text-gray-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 p-3 rounded-lg leading-relaxed animate-in slide-in-from-top-2 duration-200">
              <div className="text-xs text-gray-800 dark:text-slate-200 leading-relaxed font-semibold" dangerouslySetInnerHTML={{ __html: hints[currentHintIndex] }} />
              {hints.length > 1 && (
                <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-blue-200 dark:border-blue-500/10">
                  <span className="text-[10px] text-gray-400 dark:text-slate-500">Hint {currentHintIndex + 1} of {hints.length}</span>
                  <button 
                    onClick={() => setCurrentHintIndex((prev) => (prev + 1) % hints.length)}
                    className="text-[10px] font-black text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Next Hint &rarr;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Show Answer button */}
          {answer && !answerLoaded && (
            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-500/20">
              <button
                onClick={handleShowAnswer}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-600 dark:text-amber-400 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>💡</span>
                <span>Load Working Answer into Playground</span>
              </button>
              <p className="text-[9px] text-center text-slate-400 mt-1.5">This loads a complete, runnable solution — study it and try to understand it!</p>
            </div>
          )}
          {answerLoaded && (
            <p className="mt-3 text-[10px] text-center text-emerald-500 font-black pt-2 border-t border-emerald-500/20">✓ Answer loaded into playground below — click Run Code to see it work!</p>
          )}
        </div>
      )}

      {/* The Built-in Interactive Playground */}
      <div className="mb-6">
        <InteractivePre
          key={playgroundKey}
          initialHtml={answerLoaded && answer?.html ? answer.html : undefined}
          initialCss={answerLoaded && answer?.css ? answer.css : undefined}
          initialJs={answerLoaded && answer?.js ? answer.js : undefined}
          onChangeCode={handleCodeChange}
        >
          <code className={getInitialLanguageClass(chapterId)}>
            {answerLoaded
              ? (answer?.js || answer?.css || answer?.html || getInitialCode(chapterId))
              : getInitialCode(chapterId)}
          </code>
        </InteractivePre>
      </div>

      {/* Inline Validation Error */}
      {validationError && (
        <div className="mb-4 flex items-start gap-2 px-3 py-2.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
          <p className="text-xs text-rose-700 dark:text-rose-400 font-medium leading-snug">{validationError}</p>
        </div>
      )}

      {/* Completion Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-slate-800">
        <div className="text-xs text-gray-500 dark:text-slate-400">
          {isDone ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 animate-bounce">
              <CheckCircle size={16} /> Ready to complete this chapter!
            </span>
          ) : !isValid ? (
            <span className="text-rose-600 dark:text-rose-400/90 font-medium">
              🔒 Code requirements not met yet. Complete the tasks above.
            </span>
          ) : (
            <span className="text-blue-600 dark:text-blue-400 font-bold animate-pulse">
              🎉 Tasks verified! Click the button on the right to complete.
            </span>
          )}
        </div>
        
        <button
          onClick={handleToggleDone}
          className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all active:scale-95 flex items-center gap-2 shrink-0 ${
            isDone 
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10" 
              : !isValid
                ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border border-gray-300 dark:border-slate-700/60 cursor-not-allowed opacity-60"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10 animate-pulse"
          }`}
        >
          <CheckCircle size={14} />
          {isDone ? "Assignment Completed!" : "Mark Assignment as Done"}
        </button>
      </div>
    </div>
  );
}
