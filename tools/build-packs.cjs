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
  coreVersion: "14", systemId: SYSTEM, systemVersion: "2.1.0",
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

// --- Adventure: Les Citrouilles qui murmuraient ---
// Splits an HTML file on <!-- PAGE: Name --> or <!-- PAGE: Name | image=path --> markers
function htmlPages(file) {
  const parts = fs.readFileSync(file, "utf8").split(/<!-- PAGE: (.+?) -->/).slice(1);
  const pages = [];
  for (let i = 0; i < parts.length; i += 2) {
    const [name, ...opts] = parts[i].split("|").map(s => s.trim());
    const image = opts.find(o => o.startsWith("image="))?.slice(6);
    pages.push({ name, image, content: parts[i + 1].trim() });
  }
  return pages;
}

function adventurePack() {
  const NAME = "aventure-citrouilles";
  const dir = path.join(SRC, NAME);
  const data = require(path.resolve(dir, "data.cjs"));
  const { ART } = data;
  const aid = (...parts) => id(NAME, ...parts);

  // Spells known by every pregen: all 1st and 2nd year spells of module/spells.js
  const spellsSrc = fs.readFileSync(path.join(repoDir, "module", "spells.js"), "utf8");
  const spellYears = new Map([...spellsSrc.matchAll(/\{ id: "([^"]+)", rok: (\d)/g)].map(m => [m[1], Number(m[2])]));
  const knownSpells = list => Object.fromEntries(list.flatMap(s => {
    if (s === "rok<=2") return [...spellYears].filter(([, rok]) => rok >= 1 && rok <= 2).map(([k]) => [k, true]);
    if (!spellYears.has(s)) throw new Error(`Unknown spell id "${s}"`);
    return [[s, true]];
  }));

  // Symbolic keys -> ids
  const refs = { Actor: {}, Item: {}, Scene: {}, RollTable: {}, JournalEntry: {}, Page: {}, Folder: {} };
  const allActors = [...data.pregens, ...data.npcs, ...data.creatures, data.narrator];
  for (const a of allActors) refs.Actor[a.key] = aid("actor", a.key);
  for (const it of data.items) refs.Item[it.key] = aid("item", it.key);
  for (const s of data.scenes) refs.Scene[s.key] = aid("scene", s.key);
  for (const t of data.tables) refs.RollTable[t.key] = aid("table", t.key);
  for (const f of data.folders) refs.Folder[f.key] = aid("folder", f.key);
  const journals = [
    { key: "guide", name: "Les Citrouilles qui murmuraient – Guide de la Narratrice", file: "guide.html" },
    { key: "aides", name: "Les Citrouilles qui murmuraient – Aides de jeu", file: "aides.html" }
  ];
  for (const j of journals) {
    refs.JournalEntry[j.key] = aid("journal", j.key);
    j.pages = htmlPages(path.join(dir, j.file));
    for (const p of j.pages) refs.Page[`${j.key}/${p.name}`] = [refs.JournalEntry[j.key], aid("page", j.key, p.name)];
  }
  const ref = (type, key) => {
    const v = refs[type][key];
    if (!v) throw new Error(`${NAME}: unknown ${type} reference "${key}"`);
    return v;
  };
  const resolve = html => html
    .replace(/@Page\[([^\]]+)\]/g, (_, k) => { const [j, p] = ref("Page", k); return `@UUID[JournalEntry.${j}.JournalEntryPage.${p}]`; })
    .replace(/@(Actor|Item|Scene|RollTable)\[([^\]]+)\]/g, (_, type, k) => `@UUID[${type}.${ref(type, k)}]`);
  const deep = obj => typeof obj === "string" ? resolve(obj)
    : Array.isArray(obj) ? obj.map(deep)
    : obj && typeof obj === "object" ? Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, deep(v)])) : obj;
  const base = (i, folder) => ({ folder: folder ? ref("Folder", folder) : null, sort: (i + 1) * 100000, ownership: { default: 0 }, flags: {}, _stats: stats() });

  const folders = data.folders.map((f, i) => ({
    _id: ref("Folder", f.key), name: f.name, type: f.type, color: f.color || null, description: "",
    folder: f.parent ? ref("Folder", f.parent) : null, sorting: "m", sort: (i + 1) * 100000, flags: {}, _stats: stats()
  }));

  const itemDoc = (it, i, _id, folder) => ({
    _id, name: it.name, type: it.type, img: it.img,
    system: it.type === "zaklecie" ? { opis: it.opis, rok: it.rok, typ: it.typ } : { opis: it.opis },
    effects: [], ...base(i, folder)
  });
  const items = data.items.map((it, i) => itemDoc(it, i, ref("Item", it.key), "f-items"));

  const token = (a, linked, disposition) => ({
    name: a.name, actorLink: linked, disposition, displayName: 30,
    width: a.size || 1, height: a.size || 1,
    texture: { src: `${ART}/tokens/${a.token}.png` }, sight: { enabled: false }
  });
  const actorDoc = (a, i, type, folder, extra) => ({
    _id: ref("Actor", a.key), name: a.name, type,
    img: a.token ? `${ART}/tokens/${a.token}.png` : "icons/svg/book.svg",
    items: [], effects: [], ...base(i, folder), ...extra
  });
  const actors = [
    ...data.pregens.map((a, i) => actorDoc(a, i, "character", "f-pj", {
      system: { ...a.system, zaklecia: knownSpells(a.system.zaklecia) },
      prototypeToken: token(a, true, 1),
      items: a.items.map((it, j) => itemDoc({ ...it, type: "przedmiot" }, j, aid("actor-item", a.key, it.name), null))
    })),
    ...data.npcs.map((a, i) => actorDoc(a, i, "npc", "f-pnj", { system: a.system, prototypeToken: token(a, true, 0) })),
    ...data.creatures.map((a, i) => actorDoc(a, i, "npc", "f-creatures", { system: a.system, prototypeToken: token(a, !a.unlinked, -1) })),
    actorDoc(data.narrator, 0, "narrator", "f-actors", { system: data.narrator.system, prototypeToken: { name: data.narrator.name, actorLink: true } })
  ];

  const journal = journals.map((j, i) => ({
    _id: ref("JournalEntry", j.key), name: j.name, categories: [],
    pages: j.pages.map((p, k) => ({
      _id: refs.Page[`${j.key}/${p.name}`][1], name: p.name,
      title: { show: false, level: 1 },
      ...(p.image
        ? { type: "image", src: `${ART}/${p.image}`, image: { caption: p.content.replace(/<[^>]+>/g, "") }, text: { format: 1, content: "" } }
        : { type: "text", src: null, image: {}, text: { format: 1, content: p.content } }),
      video: { controls: true, volume: 0.5 }, system: {},
      sort: (k + 1) * 100000, ownership: { default: -1 }, flags: {}, _stats: stats()
    })),
    ...base(i, "f-journal")
  }));

  const tables = data.tables.map((t, i) => {
    const faces = Number(/^1d(\d+)$/.exec(t.formula)?.[1]);
    if (faces !== t.results.length) throw new Error(`Table "${t.name}": formula ${t.formula} does not match ${t.results.length} results`);
    return {
      _id: ref("RollTable", t.key), name: t.name, img: "icons/svg/d20-grey.svg", description: t.description,
      formula: t.formula, replacement: true, displayRoll: true,
      results: t.results.map((text, r) => ({
        _id: aid("result", t.key, r), type: "text", name: text, img: "icons/svg/d20-black.svg", description: "",
        weight: 1, range: [r + 1, r + 1], drawn: false, flags: {}, _stats: stats()
      })),
      ...base(i, "f-tables"), flags: { [SYSTEM]: { cle: t.key } }
    };
  });

  const macros = data.macros.map((m, i) => ({
    _id: aid("macro", m.key), name: m.name, type: "script", img: m.img, scope: "global",
    command: m.command, author: null, ...base(i, "f-macros")
  }));

  const scenes = data.scenes.map((s, i) => ({
    _id: ref("Scene", s.key), name: s.name, navName: s.navName, navigation: true, navOrder: i,
    background: { src: s.img }, width: s.width, height: s.height, padding: 0,
    initial: { x: s.width / 2, y: s.height / 2, scale: 0.5 },
    backgroundColor: "#111111",
    grid: { type: 1, size: 100, distance: 1.5, units: "m", alpha: 0.1, color: "#000000" },
    tokenVision: false, fog: { exploration: false },
    environment: { darknessLevel: s.darkness, globalLight: { enabled: true } },
    tokens: s.tokens.map((t, k) => {
      const a = allActors.find(x => x.key === t.actor);
      const linked = !a.unlinked;
      return {
        _id: aid("token", s.key, k), ...token(a, linked, data.pregens.includes(a) ? 1 : data.creatures.includes(a) ? -1 : 0),
        actorId: ref("Actor", a.key), x: t.x, y: t.y, hidden: !!t.hidden
      };
    }),
    notes: s.notes.map((n, k) => {
      const [entryId, pageId] = ref("Page", n.page);
      return {
        _id: aid("note", s.key, k), entryId, pageId, x: n.x, y: n.y,
        texture: { src: "icons/svg/book.svg" }, iconSize: 48, text: n.text, fontSize: 32
      };
    }),
    ...base(i, "f-scenes")
  }));

  const adventureId = aid("adventure");
  return [[`!adventures!${adventureId}`, deep({
    _id: adventureId, name: data.adventure.name, img: data.adventure.img,
    caption: data.adventure.caption, description: data.adventure.description,
    actors, combats: [], items, journal, scenes, tables, macros, cards: [], playlists: [], folders,
    folder: null, sort: 0, flags: {}, _stats: stats()
  })]];
}

(async () => {
  await writePack("aventure-citrouilles", adventurePack());
  await writePack("regles-fr", rulesJournal());
  await writePack("livres-pdf", pdfJournal());
  await writePack("objets-magiques-fr", itemsPack());
  await writePack("tables-fr", tablesPack());
})().catch(err => {
  console.error(err);
  process.exit(1);
});
