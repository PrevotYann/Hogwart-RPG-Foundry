/**
 * Builds the system compendium packs (LevelDB) from src/packs.
 * Usage (needs Foundry's node_modules for classic-level):
 *   node tools/build-packs.cjs <repoDir> <path/to/classic-level>
 * Example inside the Foundry container:
 *   node /tmp/repo/tools/build-packs.cjs /tmp/repo /home/node/resources/app/node_modules/classic-level
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const [repoDir, classicLevelPath] = process.argv.slice(2);
if (!repoDir || !classicLevelPath) {
  console.error("Usage: node build-packs.cjs <repoDir> <classic-level path>");
  process.exit(1);
}
const { ClassicLevel } = require(classicLevelPath);

const SRC = path.join(repoDir, "src", "packs");
const OUT = path.join(repoDir, "packs");
const SYSTEM = "systemHogwartRPG";
const NOW = Date.UTC(2026, 9, 31);

// Stable 16-character ids so that rebuilding a pack keeps document links valid
const id = (...parts) => crypto.createHash("sha1").update(parts.join("|")).digest("hex").slice(0, 16);

const stats = () => ({
  coreVersion: "14", systemId: SYSTEM, systemVersion: "2.0.0",
  createdTime: NOW, modifiedTime: NOW, lastModifiedBy: null,
  compendiumSource: null, duplicateSource: null, exportSource: null
});

async function writePack(name, entries) {
  const dir = path.join(OUT, name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const db = new ClassicLevel(dir, { keyEncoding: "utf8", valueEncoding: "json" });
  await db.open();
  const batch = db.batch();
  for (const [key, value] of entries) batch.put(key, value);
  await batch.write();
  await db.compactRange("\x00", "\xff");
  await db.close();
  console.log(`${name}: ${entries.length} records`);
}

// --- Journal: règles (FR) ---
function rulesJournal() {
  const html = fs.readFileSync(path.join(SRC, "regles-fr.html"), "utf8");
  const parts = html.split(/<!-- PAGE: (.+?) -->/).slice(1);
  const entryId = id("journal", "regles-fr");
  const entries = [];
  const pageIds = [];
  for (let i = 0; i < parts.length; i += 2) {
    const name = parts[i].trim();
    const content = parts[i + 1].trim();
    const pageId = id("page", "regles-fr", name);
    pageIds.push(pageId);
    entries.push([`!journal.pages!${entryId}.${pageId}`, {
      _id: pageId, name, type: "text",
      title: { show: false, level: 1 },
      text: { format: 1, content },
      image: {}, video: { controls: true, volume: 0.5 }, src: null, system: {},
      sort: (i / 2 + 1) * 100000, ownership: { default: -1 }, flags: {}, _stats: stats()
    }]);
  }
  entries.unshift([`!journal!${entryId}`, {
    _id: entryId, name: "Hogwarts : Le JDR – Règles (FR)", pages: pageIds,
    folder: null, categories: [], sort: 0, ownership: { default: 0 }, flags: {}, _stats: stats()
  }]);
  return entries;
}

// --- Journal: PDF rulebooks ---
function pdfJournal() {
  const entryId = id("journal", "livres-pdf");
  const pdfs = [
    ["Hogwarts : Le JDR (FR)", "systems/systemHogwartRPG/assets/hogwarts-le-jdr-vf.pdf"],
    ["Fiche de personnage (FR)", "systems/systemHogwartRPG/assets/hogwarts-le-jdr-vf-fiche-perso.pdf"],
    ["Core Rulebook (EN)", "systems/systemHogwartRPG/assets/podrecznikENG.pdf"],
    ["Podręcznik (PL)", "systems/systemHogwartRPG/assets/podrecznik.pdf"]
  ];
  const entries = [];
  const pageIds = [];
  pdfs.forEach(([name, src], i) => {
    const pageId = id("page", "livres-pdf", name);
    pageIds.push(pageId);
    entries.push([`!journal.pages!${entryId}.${pageId}`, {
      _id: pageId, name, type: "pdf", src,
      title: { show: true, level: 1 }, text: { format: 1, content: "" },
      image: {}, video: { controls: true, volume: 0.5 }, system: {},
      sort: (i + 1) * 100000, ownership: { default: -1 }, flags: {}, _stats: stats()
    }]);
  });
  entries.unshift([`!journal!${entryId}`, {
    _id: entryId, name: "Livres de règles / Rulebooks / Podręczniki (PDF)", pages: pageIds,
    folder: null, categories: [], sort: 0, ownership: { default: 0 }, flags: {}, _stats: stats()
  }]);
  return entries;
}

// --- Items: objets magiques ---
function itemsPack() {
  const items = JSON.parse(fs.readFileSync(path.join(SRC, "objets-magiques-fr.json"), "utf8"));
  return items.map((it, i) => {
    const _id = id("item", it.name);
    return [`!items!${_id}`, {
      _id, name: it.name, type: "przedmiot", img: it.img || "icons/svg/item-bag.svg",
      system: { opis: it.opis }, effects: [], folder: null, sort: (i + 1) * 100000,
      ownership: { default: 0 }, flags: {}, _stats: stats()
    }];
  });
}

// --- RollTables ---
function tablesPack() {
  const tables = JSON.parse(fs.readFileSync(path.join(SRC, "tables-fr.json"), "utf8"));
  const entries = [];
  tables.forEach((table, ti) => {
    const tableId = id("table", table.name);
    const resultIds = [];
    let next = 1;
    let max = 0;
    table.results.forEach((r, ri) => {
      const [range, text] = Array.isArray(r) ? r : [[next, next], r];
      next = range[1] + 1;
      max = Math.max(max, range[1]);
      const resultId = id("result", table.name, ri);
      resultIds.push(resultId);
      entries.push([`!tables.results!${tableId}.${resultId}`, {
        _id: resultId, type: "text", name: text, img: "icons/svg/d20-black.svg", description: "",
        weight: range[1] - range[0] + 1, range, drawn: false, flags: {}, _stats: stats()
      }]);
    });
    const faces = Number(/^1d(\d+)$/.exec(table.formula)?.[1]);
    if (faces !== max) throw new Error(`Table "${table.name}": formula ${table.formula} does not match ${max} results`);
    entries.push([`!tables!${tableId}`, {
      _id: tableId, name: table.name, img: "icons/svg/d20-grey.svg",
      description: table.description || "", results: resultIds, formula: table.formula,
      replacement: true, displayRoll: true, folder: null, sort: (ti + 1) * 100000,
      ownership: { default: 0 }, flags: {}, _stats: stats()
    }]);
  });
  return entries;
}

(async () => {
  await writePack("regles-fr", rulesJournal());
  await writePack("livres-pdf", pdfJournal());
  await writePack("objets-magiques-fr", itemsPack());
  await writePack("tables-fr", tablesPack());
})().catch(err => {
  console.error(err);
  process.exit(1);
});
