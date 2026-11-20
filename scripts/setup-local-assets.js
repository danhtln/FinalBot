const fs = require('fs');
const path = require('path');

// 1. Read thanhvien.html to get the embedded base64 portraits
const htmlPath = path.join(__dirname, '..', 'public', 'modules', 'thanhvien.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

function extractBase64(name) {
  const regex = new RegExp(name + ':\\s*"data:image\\/jpeg;base64,([^"]+)"');
  const match = htmlContent.match(regex);
  return match ? Buffer.from(match[1], 'base64') : null;
}

const marcus = extractBase64('marcus');
const sophie = extractBase64('sophie');
const julian = extractBase64('julian');
const elena = extractBase64('elena');

console.log('Extracted portraits:', {
  marcus: !!marcus,
  sophie: !!sophie,
  julian: !!julian,
  elena: !!elena,
});

// Member mappings:
// 01: Tran Thanh Danh (Leader) -> marcus
// 02: Le Khang (Motion Lead) -> sophie
// 03: Cao Minh Khoi (AI Engineer) -> julian
// 04: Chau Hong Lam (UI/UX) -> elena
// 05: Nguyen Thanh Tien (Full-stack) -> marcus
// 06: Vo Huu Tien (Data/Planner) -> sophie
// 07: Le Bach Long Vi (QA/DevOps) -> julian

const memberPortraits = [
  { file: 'member-01.jpg', buf: marcus },
  { file: 'member-02.jpg', buf: sophie },
  { file: 'member-03.jpg', buf: julian },
  { file: 'member-04.jpg', buf: elena },
  { file: 'member-05.jpg', buf: marcus },
  { file: 'member-06.jpg', buf: sophie },
  { file: 'member-07.jpg', buf: julian },
];

const membersDir = path.join(__dirname, '..', 'public', 'images', 'members');
if (!fs.existsSync(membersDir)) {
  fs.mkdirSync(membersDir, { recursive: true });
}

for (const m of memberPortraits) {
  if (m.buf) {
    fs.writeFileSync(path.join(membersDir, m.file), m.buf);
    console.log(`Saved ${m.file} (${m.buf.length} bytes)`);
  }
}

// 2. Also save copies for memory photos (devlog)
const devlogDir = path.join(__dirname, '..', 'public', 'images', 'devlog');
if (!fs.existsSync(devlogDir)) {
  fs.mkdirSync(devlogDir, { recursive: true });
}

const memoryPhotos = [
  { file: 'memory-01.jpg', buf: marcus },
  { file: 'memory-02.jpg', buf: julian },
  { file: 'memory-03.jpg', buf: sophie },
  { file: 'memory-04.jpg', buf: elena },
];

for (const p of memoryPhotos) {
  if (p.buf) {
    fs.writeFileSync(path.join(devlogDir, p.file), p.buf);
    console.log(`Saved devlog ${p.file}`);
  }
}

// 3. Team logo and Team photo
const teamDir = path.join(__dirname, '..', 'public', 'images', 'team');
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}
if (marcus) {
  fs.writeFileSync(path.join(teamDir, 'team-photo.jpg'), marcus);
  console.log('Saved team-photo.jpg');
}

// 4. Products posters
const prodDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(prodDir)) {
  fs.mkdirSync(prodDir, { recursive: true });
}
const prodPosters = [
  { file: 'product-01-poster.jpg', buf: marcus },
  { file: 'product-02-poster.jpg', buf: julian },
  { file: 'product-03-poster.jpg', buf: sophie },
];
for (const p of prodPosters) {
  if (p.buf) {
    fs.writeFileSync(path.join(prodDir, p.file), p.buf);
    console.log(`Saved product poster ${p.file}`);
  }
}

console.log('Asset generation complete!');
