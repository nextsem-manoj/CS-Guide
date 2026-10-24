const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../src/data/bcaPracticalData.ts');
let content = fs.readFileSync(target, 'utf8');

// 1. Day 32 teacherDemo
content = content.replace(
  /li\.innerHTML = `[\s\S]*?<span onclick="toggleTask\(\$\{t\.id\}\)"[\s\S]*?<\/button>[\s\S]*?`;/m,
  `li.innerHTML = '<span onclick="toggleTask(' + t.id + ')" style="cursor:pointer;">' + t.text + '</span><button class="del-btn" onclick="deleteTask(' + t.id + ')">Delete</button>';`
);

// 2. Day 32 assignment
content = content.replace(
  /li\.innerHTML = `[\s\S]*?<input type="checkbox" \$\{t\.done \? "checked" : ""\}[\s\S]*?<\/button>[\s\S]*?`;/m,
  `li.innerHTML = '<div><input type="checkbox" ' + (t.done ? "checked" : "") + ' onchange="toggleTask(' + t.id + ')" /><span class="title" style="margin-left: 8px;">' + t.title + '</span><span class="badge badge-' + t.priority + '">' + t.priority + '</span></div><button class="del-btn" onclick="deleteTask(' + t.id + ')">Delete</button>';`
);

// 3. Day 34 teacherDemo
content = content.replace(
  /li\.innerHTML = `<span>New Student \(\\\$\{newId\.toString\(\)\.slice\(-4\)\}\)<\/span><div><button class="btn-fav">⭐<\/button><button class="btn-del">Delete<\/button><\/div>`;/,
  `li.innerHTML = '<span>New Student (' + newId.toString().slice(-4) + ')</span><div><button class="btn-fav">⭐</button><button class="btn-del">Delete</button></div>';`
);

// 4. Day 34 assignment
content = content.replace(
  /li\.innerHTML = `<span>\\\$\{text\}<\/span><div><button class="btn-done">✓<\/button><button class="btn-del">✕<\/button><\/div>`;/,
  `li.innerHTML = '<span>' + text + '</span><div><button class="btn-done">✓</button><button class="btn-del">✕</button></div>';`
);

// 5. Day 38 assignment
content = content.replace(
  /div\.innerHTML = `<h3>\\\$\{p\.title\}<\/h3><p>\\\$\{p\.body\}<\/p>`;/,
  `div.innerHTML = '<h3>' + p.title + '</h3><p>' + p.body + '</p>';`
);

// 6. Day 39 assignment
content = content.replace(
  /div\.innerHTML = `<a class="repo-name" href="\\\$\{r\.html_url\}" target="_blank">\\\$\{r\.name\}<\/a><span class="star-badge">⭐ \\\$\{r\.stargazers_count\}<\/span>`;/,
  `div.innerHTML = '<a class="repo-name" href="' + r.html_url + '" target="_blank">' + r.name + '</a><span class="star-badge">⭐ ' + r.stargazers_count + '</span>';`
);

// 7. Day 40 teacherDemo
content = content.replace(
  /card\.innerHTML = `[\s\S]*?<h4>\$\{r\.title\}<\/h4>[\s\S]*?<button class="btn-bm">[\s\S]*?<\/button>[\s\S]*?`;/m,
  `card.innerHTML = '<h4>' + r.title + '</h4><p style="color:#94a3b8;font-size:13px;">' + r.desc + '</p><button class="btn-view">View Details</button><button class="btn-bm">' + (isBm ? "★ Saved" : "☆ Save") + '</button>';`
);

// 8. Day 40 assignment
content = content.replace(
  /card\.innerHTML = `[\s\S]*?<h3>\$\{s\.code\}<\/h3>[\s\S]*?<button class="btn-save">[\s\S]*?<\/button>[\s\S]*?`;/m,
  `card.innerHTML = '<div><h3>' + s.code + '</h3><div style="font-weight:bold;font-size:14px;margin-bottom:6px;">' + s.name + '</div><p>' + s.desc + '</p></div><div class="actions"><button class="btn-view">Details</button><button class="btn-save">' + (isSaved ? "★ Saved" : "☆ Save") + '</button></div>';`
);

fs.writeFileSync(target, content, 'utf8');
console.log("Fixed nested backticks successfully!");
