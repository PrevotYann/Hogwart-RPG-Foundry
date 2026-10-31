/**
 * Generates schematic reference art (SVG) of the bundled adventure
 * "Les Citrouilles qui murmuraient": maps, cover, tokens and item icons.
 * Reference layouts only; final generated JPG/PNG assets are maintained separately.
 * Usage: node tools/generate-adventure-art.cjs <repoDir> [referenceOutputDir]
 */
const fs = require("fs");
const path = require("path");

const repoDir = process.argv[2] || path.join(__dirname, "..");
const OUT = process.argv[3] || path.join(repoDir, ".art-work", "adventure-reference");
for (const d of ["maps", "tokens", "icons"]) fs.mkdirSync(path.join(OUT, d), { recursive: true });

const write = (rel, svg) => fs.writeFileSync(path.join(OUT, rel), svg.trim() + "\n");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const svg = (w, h, body, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}
${body}
</svg>`;
const text = (x, y, s, { size = 40, fill = "#fff", anchor = "middle", weight = "bold", family = "Georgia, serif", extra = "" } = {}) =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${extra}>${esc(s)}</text>`;
const label = (x, y, s, size = 44) => text(x, y, s, { size, fill: "#fff", extra: `stroke="#000" stroke-width="${size / 8}" paint-order="stroke"` });
const pumpkin = (cx, cy, r, face = false) => `<g>
  <ellipse cx="${cx - r * 0.45}" cy="${cy}" rx="${r * 0.55}" ry="${r * 0.85}" fill="#d9701e"/>
  <ellipse cx="${cx + r * 0.45}" cy="${cy}" rx="${r * 0.55}" ry="${r * 0.85}" fill="#d9701e"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.6}" ry="${r * 0.9}" fill="#ef8a2b"/>
  <rect x="${cx - r * 0.1}" y="${cy - r * 1.15}" width="${r * 0.2}" height="${r * 0.35}" fill="#4d6b1f"/>
  ${face ? `<polygon points="${cx - r * 0.45},${cy - r * 0.2} ${cx - r * 0.2},${cy - r * 0.2} ${cx - r * 0.32},${cy - r * 0.45}" fill="#ffe27a"/>
  <polygon points="${cx + r * 0.45},${cy - r * 0.2} ${cx + r * 0.2},${cy - r * 0.2} ${cx + r * 0.32},${cy - r * 0.45}" fill="#ffe27a"/>
  <path d="M${cx - r * 0.5},${cy + r * 0.2} Q${cx},${cy + r * 0.7} ${cx + r * 0.5},${cy + r * 0.2} Q${cx},${cy + r * 0.4} ${cx - r * 0.5},${cy + r * 0.2}" fill="#ffe27a"/>` : ""}
</g>`;
const grid = (w, h, size, color = "rgba(255,255,255,0.06)") => {
  let lines = "";
  for (let x = size; x < w; x += size) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${color}" stroke-width="2"/>`;
  for (let y = size; y < h; y += size) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${color}" stroke-width="2"/>`;
  return lines;
};
const placeholderStamp = (w, h) => text(w - 30, h - 30, "Illustration provisoire", { size: 28, fill: "rgba(255,255,255,0.45)", anchor: "end", weight: "normal" });

// ---------------------------------------------------------------- Maps

function mapParc() {
  const w = 3000, h = 2000;
  let b = `<rect width="${w}" height="${h}" fill="#24351f"/>`;
  // Lake
  b += `<path d="M0,1250 C300,1150 700,1250 900,1450 C1050,1600 950,2000 950,2000 L0,2000 Z" fill="#1d3a5a"/>`;
  b += label(420, 1700, "Lac noir");
  // Forest
  for (let i = 0; i < 60; i++) {
    const x = 2300 + ((i * 137) % 700), y = 80 + ((i * 263) % 1850), r = 70 + (i % 4) * 20;
    b += `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? "#12220f" : "#182c14"}"/>`;
  }
  b += label(2650, 1000, "Forêt interdite");
  // Paths
  b += `<path d="M850,700 C1100,800 1300,900 1500,1000 S1900,1100 2050,1150" stroke="#8a7a5a" stroke-width="40" fill="none"/>`;
  b += `<path d="M1500,1000 C1500,1200 1450,1400 1400,1600" stroke="#8a7a5a" stroke-width="30" fill="none"/>`;
  // Castle
  b += `<g fill="#6f6f78" stroke="#2a2a30" stroke-width="8">
    <rect x="150" y="150" width="650" height="520"/>
    <rect x="100" y="100" width="140" height="240"/><rect x="700" y="80" width="150" height="280"/>
    <rect x="380" y="40" width="120" height="200"/><rect x="560" y="560" width="160" height="180"/>
  </g>`;
  b += `<g fill="#ffd36b">${[[260, 300], [400, 300], [540, 300], [260, 450], [400, 450], [540, 450]].map(([x, y]) => `<rect x="${x}" y="${y}" width="40" height="60"/>`).join("")}</g>`;
  b += label(475, 760, "Château de Poudlard", 52);
  // Greenhouses 1-6
  for (let i = 0; i < 6; i++) {
    const x = 1150 + i * 150, y = 650;
    b += `<rect x="${x}" y="${y}" width="120" height="200" rx="40" fill="rgba(170,220,230,0.35)" stroke="#cfeef5" stroke-width="6"/>`;
    b += label(x + 60, y + 120, String(i + 1), 46);
  }
  b += label(1560, 620, "Serres 1 à 6", 40);
  // Greenhouse 7 (overgrown)
  b += `<rect x="2000" y="1050" width="260" height="360" rx="60" fill="rgba(120,170,120,0.35)" stroke="#9fd39f" stroke-width="8" stroke-dasharray="30 12"/>`;
  b += `<path d="M2000,1100 C2080,1180 1980,1260 2060,1350 M2260,1080 C2200,1200 2290,1250 2230,1400" stroke="#3f7a2a" stroke-width="18" fill="none"/>`;
  b += label(2130, 1250, "7", 80);
  b += label(2130, 1480, "Serre n°7 (condamnée)", 40);
  // Pumpkin patch & keeper hut
  for (let i = 0; i < 14; i++) b += pumpkin(1250 + (i % 7) * 70, 1350 + Math.floor(i / 7) * 90, 28);
  b += label(1460, 1560, "Potager des citrouilles", 36);
  b += `<rect x="1700" y="1450" width="200" height="150" fill="#5a3b22" stroke="#2a1a0e" stroke-width="8"/><polygon points="1680,1450 1800,1360 1920,1450" fill="#3a2414"/>`;
  b += label(1800, 1660, "Cabane du garde-chasse", 34);
  // Moon
  b += `<circle cx="1500" cy="200" r="90" fill="#f5f0d0" opacity="0.9"/><circle cx="1540" cy="180" r="80" fill="#24351f" opacity="0.6"/>`;
  b += text(1500, 360, "Le parc de Poudlard — nuit d’Halloween", { size: 46, fill: "#f5f0d0" });
  b += placeholderStamp(w, h);
  write("maps/parc-poudlard.svg", svg(w, h, b));
}

function mapGrandeSalle() {
  const w = 2400, h = 1800;
  let b = `<rect width="${w}" height="${h}" fill="#3a332c"/>` + grid(w, h, 100, "rgba(0,0,0,0.25)");
  b += `<rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#1b1712" stroke-width="40"/>`;
  // Staff table
  b += `<rect x="500" y="120" width="1400" height="160" fill="#2a1d12" stroke="#c9a54a" stroke-width="6"/>`;
  b += `<rect x="600" y="300" width="1200" height="100" fill="#4a3a2a"/>`;
  b += label(1200, 220, "Table des professeurs", 48);
  // House tables
  const maisons = [["Gryffondor", "#7f0909"], ["Poufsouffle", "#c49a12"], ["Serdaigle", "#1d2f6b"], ["Serpentard", "#1a472a"]];
  maisons.forEach(([nom, c], i) => {
    const x = 330 + i * 480;
    b += `<rect x="${x}" y="520" width="220" height="1000" fill="#5b3b20" stroke="${c}" stroke-width="14"/>`;
    b += `<rect x="${x - 60}" y="520" width="40" height="1000" fill="#3b2614"/><rect x="${x + 240}" y="520" width="40" height="1000" fill="#3b2614"/>`;
    b += label(x + 110, 500, nom, 40);
  });
  // Floating candles
  for (let i = 0; i < 40; i++) {
    const x = 150 + ((i * 211) % 2100), y = 450 + ((i * 337) % 1150);
    b += `<circle cx="${x}" cy="${y}" r="14" fill="#ffe9a0" opacity="0.85"/><circle cx="${x}" cy="${y}" r="34" fill="#ffd36b" opacity="0.15"/>`;
  }
  // Pumpkins along the walls
  for (let i = 0; i < 10; i++) {
    b += pumpkin(140, 500 + i * 120, 36, i % 3 === 0);
    b += pumpkin(w - 140, 500 + i * 120, 36, i % 3 === 1);
  }
  b += pumpkin(1200, 1000, 70, true);
  b += label(1200, 1120, "La grande citrouille", 32);
  // Doors
  b += `<rect x="1050" y="${h - 80}" width="300" height="60" fill="#6b4a2b"/>`;
  b += label(1200, h - 110, "Grandes portes", 36);
  b += placeholderStamp(w, h);
  write("maps/grande-salle.svg", svg(w, h, b));
}

function mapReserve() {
  const w = 2000, h = 1400;
  let b = `<rect width="${w}" height="${h}" fill="#2b2420"/>` + grid(w, h, 100, "rgba(0,0,0,0.3)");
  b += `<rect x="30" y="30" width="${w - 60}" height="${h - 60}" fill="none" stroke="#120e0b" stroke-width="30"/>`;
  // Shelves
  for (let i = 0; i < 6; i++) {
    const x = 200 + i * 280;
    b += `<rect x="${x}" y="150" width="120" height="800" fill="#4e3420" stroke="#1e130a" stroke-width="6"/>`;
    for (let j = 0; j < 16; j++) b += `<rect x="${x + 10}" y="${165 + j * 49}" width="100" height="36" fill="${["#6b2a2a", "#2a4b6b", "#3b5a2a", "#6b5a2a"][(i + j) % 4]}"/>`;
  }
  // Chains
  b += `<path d="M180,140 L1880,140" stroke="#b0b0b0" stroke-width="8" stroke-dasharray="20 10"/>`;
  b += label(1000, 110, "Réserve — accès interdit sans autorisation signée", 36);
  // Rope barrier & entrance
  b += `<path d="M100,1150 L1900,1150" stroke="#8b0000" stroke-width="14"/>`;
  b += `<rect x="900" y="1260" width="200" height="80" fill="#6b4a2b"/>`;
  b += label(1000, 1240, "Entrée", 34);
  // Librarian desk
  b += `<rect x="150" y="1000" width="320" height="110" fill="#5b3b20" stroke="#c9a54a" stroke-width="5"/>`;
  b += `<circle cx="420" cy="1040" r="22" fill="#ffd36b"/>`;
  b += label(310, 990, "Bureau de la bibliothécaire", 30);
  // Book lectern
  b += `<rect x="1580" y="1000" width="200" height="110" fill="#3b2614" stroke="#7fbf7f" stroke-width="6"/>`;
  b += `<rect x="1610" y="1020" width="140" height="70" fill="#2f5a2a"/>`;
  b += label(1680, 990, "Flore des Murmures", 30);
  b += placeholderStamp(w, h);
  write("maps/reserve-bibliotheque.svg", svg(w, h, b));
}

function mapSerre() {
  const w = 2400, h = 1800;
  let b = `<rect width="${w}" height="${h}" fill="#1a2418"/>`;
  // Soil inside
  b += `<rect x="200" y="150" width="2000" height="1450" rx="200" fill="#3a2c1e"/>` + grid(w, h, 100, "rgba(0,0,0,0.25)");
  // Glass walls
  b += `<rect x="200" y="150" width="2000" height="1450" rx="200" fill="rgba(160,210,220,0.08)" stroke="#bfe6ee" stroke-width="16"/>`;
  for (let x = 400; x < 2200; x += 200) b += `<line x1="${x}" y1="150" x2="${x}" y2="1600" stroke="rgba(191,230,238,0.25)" stroke-width="6"/>`;
  // Broken panes
  b += `<polygon points="200,600 260,650 200,720" fill="#1a2418"/><polygon points="2200,400 2140,470 2200,520" fill="#1a2418"/>`;
  b += `<g fill="#bfe6ee" opacity="0.6"><polygon points="240,700 270,690 260,730"/><polygon points="2120,480 2150,470 2140,510"/></g>`;
  // Door (south)
  b += `<rect x="1100" y="1580" width="200" height="60" fill="#6b4a2b"/>`;
  b += label(1200, 1700, "Porte (verrouillée — Alohomora)", 36);
  // Benches with pots
  for (const [x, y] of [[300, 300], [300, 1250], [1850, 1250]]) {
    b += `<rect x="${x}" y="${y}" width="250" height="90" fill="#5b3b20"/>`;
    for (let i = 0; i < 4; i++) b += `<circle cx="${x + 35 + i * 60}" cy="${y + 45}" r="20" fill="#8b4a2b"/>`;
  }
  b += label(425, 280, "Établi d’Hortense", 30);
  // Pumpkin patch
  for (let i = 0; i < 12; i++) b += pumpkin(1650 + (i % 4) * 120, 330 + Math.floor(i / 4) * 140, 42, i % 2 === 0);
  b += label(1830, 780, "Citrouilles-Échos", 34);
  // Vines from the centre
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, x2 = 1200 + Math.cos(a) * 700, y2 = 850 + Math.sin(a) * 520;
    b += `<path d="M1200,850 Q${1200 + Math.cos(a + 0.6) * 380},${850 + Math.sin(a + 0.6) * 300} ${x2},${y2}" stroke="#3f7a2a" stroke-width="26" fill="none" stroke-linecap="round"/>`;
  }
  // The Murmurelle + mother pumpkin
  b += `<circle cx="1200" cy="850" r="230" fill="#2f5a2a" stroke="#88c070" stroke-width="10"/>`;
  b += pumpkin(1200, 880, 130, true);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    b += `<ellipse cx="${1200 + Math.cos(a) * 200}" cy="${850 + Math.sin(a) * 200}" rx="60" ry="30" fill="#b04ab0" transform="rotate(${(a * 180) / Math.PI} ${1200 + Math.cos(a) * 200} ${850 + Math.sin(a) * 200})"/>`;
  }
  b += label(1200, 1150, "La Murmurelle & la Citrouille-Mère", 40);
  // Ghost corner
  b += `<circle cx="380" cy="850" r="60" fill="rgba(220,235,255,0.35)"/>`;
  b += label(380, 960, "Buée sur la vitre", 28);
  b += text(1200, 90, "Serre n°7", { size: 60, fill: "#d8f0c8" });
  b += placeholderStamp(w, h);
  write("maps/serre-7.svg", svg(w, h, b));
}

function cover() {
  const w = 1200, h = 600;
  let b = `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c1f"/><stop offset="1" stop-color="#3a1d0b"/></linearGradient></defs>`;
  b += `<rect width="${w}" height="${h}" fill="url(#g)"/>`;
  b += `<circle cx="980" cy="120" r="70" fill="#f5f0d0"/>`;
  b += `<g fill="#0b0710"><rect x="80" y="260" width="300" height="340"/><rect x="60" y="180" width="70" height="200"/><rect x="330" y="150" width="80" height="230"/><rect x="200" y="120" width="60" height="180"/></g>`;
  b += pumpkin(700, 480, 90, true) + pumpkin(880, 520, 60, true) + pumpkin(540, 530, 50, false);
  b += `<path d="M560,420 C620,330 700,360 760,300 S880,260 900,200" stroke="#3f7a2a" stroke-width="14" fill="none"/>`;
  b += text(w / 2, 110, "Les Citrouilles", { size: 72, fill: "#ffb347" });
  b += text(w / 2, 190, "qui murmuraient", { size: 64, fill: "#ffb347" });
  b += text(w / 2, 240, "Une aventure pour Hogwarts : Le JDR", { size: 28, fill: "#f5f0d0", weight: "normal" });
  b += placeholderStamp(w, h);
  write("couverture.svg", svg(w, h, b));
}

// ---------------------------------------------------------------- Tokens

const COULEURS = {
  gryffindor: ["#7f0909", "#ffc500"], hufflepuff: ["#ecb939", "#372e29"], ravenclaw: ["#0e1a40", "#946b2d"],
  slytherin: ["#1a472a", "#aaaaaa"], prof: ["#3b2a4a", "#c9a54a"], ghost: ["#9fb7c9", "#ffffff"]
};

function portrait(file, initials, kind, sub) {
  const [fond, anneau] = COULEURS[kind];
  const s = 400;
  let b = `<circle cx="200" cy="200" r="190" fill="${fond}" stroke="${anneau}" stroke-width="16" ${kind === "ghost" ? 'opacity="0.75"' : ""}/>`;
  // simple bust silhouette
  b += `<circle cx="200" cy="165" r="70" fill="rgba(255,255,255,0.18)"/><path d="M90,330 C110,250 290,250 310,330 Z" fill="rgba(255,255,255,0.18)"/>`;
  b += text(200, 225, initials, { size: 120, fill: anneau === "#aaaaaa" ? "#e0e0e0" : anneau, extra: 'stroke="#000" stroke-width="6" paint-order="stroke"' });
  if (sub) b += text(200, 330, sub, { size: 34, fill: "#fff", extra: 'stroke="#000" stroke-width="5" paint-order="stroke"' });
  write(`tokens/${file}.svg`, svg(s, s, b));
}

function creatureTokens() {
  // Murmurelle: a vine-flower with a mouth
  let b = `<circle cx="300" cy="300" r="290" fill="#1d3318" stroke="#88c070" stroke-width="14"/>`;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * 360;
    b += `<ellipse cx="300" cy="140" rx="55" ry="120" fill="#b04ab0" transform="rotate(${a} 300 300)"/>`;
  }
  b += `<circle cx="300" cy="300" r="110" fill="#2f5a2a" stroke="#d8f0c8" stroke-width="6"/>`;
  b += `<path d="M230,310 Q300,380 370,310 Q300,340 230,310" fill="#0b0710"/>`;
  b += `<circle cx="260" cy="270" r="14" fill="#ffe27a"/><circle cx="340" cy="270" r="14" fill="#ffe27a"/>`;
  write("tokens/murmurelle.svg", svg(600, 600, b));

  write("tokens/citrouille-echo.svg", svg(400, 400, `<circle cx="200" cy="200" r="190" fill="#2b1a0b" stroke="#ef8a2b" stroke-width="12"/>${pumpkin(200, 215, 120, true)}`));
  write("tokens/citrouille-mere.svg", svg(600, 600, `<circle cx="300" cy="300" r="290" fill="#2b1a0b" stroke="#88c070" stroke-width="14"/>${pumpkin(300, 320, 190, true)}
    <path d="M60,200 C150,260 120,380 220,420 M540,200 C450,260 480,380 380,420" stroke="#3f7a2a" stroke-width="22" fill="none"/>`));

  // Bat swarm
  let bats = `<circle cx="200" cy="200" r="190" fill="#1a1426" stroke="#ef8a2b" stroke-width="12"/>`;
  for (const [x, y, k] of [[200, 170, 1], [120, 250, 0.7], [280, 250, 0.7], [140, 120, 0.5], [270, 110, 0.5]]) {
    bats += `<path transform="translate(${x} ${y}) scale(${k})" d="M0,0 C-30,-40 -80,-30 -110,0 C-80,-5 -70,20 -55,30 C-40,10 -20,10 0,25 C20,10 40,10 55,30 C70,20 80,-5 110,0 C80,-30 30,-40 0,0 Z" fill="#0b0710" stroke="#ef8a2b" stroke-width="3"/>`;
  }
  write("tokens/chauves-souris.svg", svg(400, 400, bats));
}

// ---------------------------------------------------------------- Item icons

function icons() {
  const frame = (body, fond = "#2a2018") => svg(128, 128, `<rect x="4" y="4" width="120" height="120" rx="16" fill="${fond}" stroke="#c9a54a" stroke-width="4"/>${body}`);
  write("icons/carnet-ambroise.svg", frame(`<rect x="32" y="24" width="64" height="82" rx="4" fill="#ecb939"/><rect x="38" y="24" width="6" height="82" fill="#372e29"/><path d="M60,50 Q70,40 80,50 Q70,60 60,50" fill="#3f7a2a"/><line x1="52" y1="72" x2="88" y2="72" stroke="#372e29" stroke-width="3"/><line x1="52" y1="84" x2="84" y2="84" stroke="#372e29" stroke-width="3"/>`));
  write("icons/flore-des-murmures.svg", frame(`<rect x="26" y="26" width="76" height="80" rx="4" fill="#2f5a2a" stroke="#88c070" stroke-width="3"/><circle cx="64" cy="62" r="18" fill="#b04ab0"/><circle cx="64" cy="62" r="7" fill="#ffe27a"/><path d="M26,40 L14,40 M26,90 L14,90" stroke="#b0b0b0" stroke-width="4"/>`));
  write("icons/graine-murmurelle.svg", frame(`<ellipse cx="64" cy="70" rx="22" ry="30" fill="#5a3b22" stroke="#b04ab0" stroke-width="3"/><path d="M64,40 C60,28 72,22 76,16" stroke="#88c070" stroke-width="4" fill="none"/><path d="M54,70 Q64,82 74,70" stroke="#b04ab0" stroke-width="3" fill="none"/>`));
  write("icons/lanterne-citrouille.svg", frame(pumpkin(64, 70, 34, true)));
  write("icons/gants-hortense.svg", frame(`<path d="M40,104 L40,56 C40,50 48,50 48,56 L48,40 C48,34 56,34 56,40 L56,34 C56,28 64,28 64,34 L64,40 C64,34 72,34 72,40 L72,64 L80,56 C86,50 92,56 88,62 L72,92 L72,104 Z" fill="#3f7a2a" stroke="#1d3318" stroke-width="3"/>`));
  write("icons/vox-reddita.svg", frame(`<line x1="30" y1="100" x2="80" y2="50" stroke="#c9a54a" stroke-width="7" stroke-linecap="round"/><path d="M86,30 L90,42 L102,44 L92,52 L96,64 L86,56 L76,64 L80,52 L70,44 L82,42 Z" fill="#ffe27a"/><path d="M96,78 Q106,86 96,94 M104,72 Q118,86 104,100" stroke="#bfe6ee" stroke-width="4" fill="none"/>`, "#1d2f6b"));
  write("icons/philtre-rossignol.svg", frame(`<path d="M52,24 L76,24 L76,44 C96,54 98,96 64,104 C30,96 32,54 52,44 Z" fill="#bfe6ee" stroke="#fff" stroke-width="3" opacity="0.9"/><path d="M40,74 C50,64 78,64 88,74 C88,94 40,94 40,74 Z" fill="#b04ab0"/><path d="M58,80 Q64,72 72,80 L66,84 Z" fill="#372e29"/>`, "#3b2a4a"));
  write("icons/lumos-solem.svg", frame(`<circle cx="64" cy="64" r="22" fill="#ffe27a"/>${Array.from({ length: 12 }, (_, i) => `<line x1="64" y1="30" x2="64" y2="16" stroke="#ffe27a" stroke-width="5" stroke-linecap="round" transform="rotate(${i * 30} 64 64)"/>`).join("")}`, "#5a3b22"));
}

mapParc();
mapGrandeSalle();
mapReserve();
mapSerre();
cover();
portrait("leonie-barbefeu", "LB", "gryffindor", "Gryffondor");
portrait("tobias-plumerai", "TP", "ravenclaw", "Serdaigle");
portrait("capucine-ashby", "CA", "hufflepuff", "Poufsouffle");
portrait("evariste-corbin", "ÉC", "slytherin", "Serpentard");
portrait("ambroise-tisserand", "AT", "hufflepuff", "Disparu");
portrait("hortense-valeriane", "HV", "prof", "Botanique");
portrait("octavie-marbrenoire", "OM", "slytherin", "Préfète");
portrait("anselme-graves", "AG", "ghost", "Fantôme");
portrait("ignace-pommeroy", "IP", "prof", "Directeur adj.");
portrait("ombeline-feuillard", "OF", "prof", "Bibliothèque");
creatureTokens();
icons();
console.log(`Schematic reference art written to ${OUT}`);
