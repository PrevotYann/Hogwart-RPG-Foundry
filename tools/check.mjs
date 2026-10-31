/**
 * Static checks: manifest schema, Handlebars templates, translation keys.
 * Run inside the Foundry container:
 *   node tools/check.mjs <repoDir> <foundryAppDir>
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const [repoDir, appDir] = process.argv.slice(2);
const require = createRequire(import.meta.url);
await import(path.join(appDir, "common", "server.mjs"));
globalThis.CONFIG ??= {};
globalThis.game = { model: { Actor: {}, Item: {} } };
globalThis.getDocumentClass ??= name => foundry.documents[`Base${name}`];
const appPackage = JSON.parse(fs.readFileSync(path.join(appDir, "package.json"), "utf8"));
globalThis.release ??= {
  ...appPackage.release, version: appPackage.version,
  maxGeneration: appPackage.release.generation, maxStableGeneration: appPackage.release.generation
};
let errors = 0;
const fail = msg => { errors++; console.error("✗", msg); };

// 1. Manifest
const manifest = JSON.parse(fs.readFileSync(path.join(repoDir, "system.json"), "utf8"));
try {
  const sys = new foundry.packages.BaseSystem(manifest, { strict: true });
  sys.validate({ strict: true });
  const codes = Object.fromEntries(Object.entries(CONST.PACKAGE_AVAILABILITY_CODES).map(([k, v]) => [v, k]));
  console.log(`✓ system.json valid (${sys.version}, availability on Foundry ${release.version}: ${codes[sys.availability]})`);
} catch (err) {
  fail(`system.json: ${err.message}`);
}

// 2. Templates
const Handlebars = require(path.join(appDir, "node_modules", "handlebars"));
const tplDir = path.join(repoDir, "templates");
for (const f of fs.readdirSync(tplDir)) {
  try {
    Handlebars.precompile(fs.readFileSync(path.join(tplDir, f), "utf8"));
  } catch (err) {
    fail(`${f}: ${err.message}`);
  }
}
console.log("✓ templates compiled");

// 3. Translation keys used in code and templates exist in every language
const flat = (o, p = "", r = {}) => {
  for (const [k, v] of Object.entries(o)) {
    const q = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") flat(v, q, r);
    else r[q] = v;
  }
  return r;
};
const langs = Object.fromEntries(manifest.languages.map(l => [l.lang,
  flat(JSON.parse(fs.readFileSync(path.join(repoDir, l.path), "utf8").replace(/^﻿/, "")))]));

const sources = [
  ...fs.readdirSync(path.join(repoDir, "module")).map(f => path.join(repoDir, "module", f)),
  ...fs.readdirSync(tplDir).map(f => path.join(tplDir, f))
];
const used = new Set();
for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(/["'`]((?:HOGWART|MOVES|TYPES)\.[A-Za-z0-9_.-]+)["'`]/g)) used.add(m[1]);
}
// Dynamic keys
for (const ruch of ["stan-w-obliczu", "zdobadz-czego-szukasz", "pomoz-lub-przeszkodz", "zbliz-sie-stworzenie", "ukryj-sie", "zdobadz-wiedze", "rzuc-zaklecie", "pojedynek", "uwarz-eliksir", "uzyj-obiektu", "mecz-quidditcha", "zloty-znicz"]) {
  for (const k of ["name", "success", "compromise", "failure"]) used.add(`MOVES.${ruch}.${k}`);
}
for (let i = 1; i <= 7; i++) used.add(`HOGWART.Spells.${i}Year`);
for (const p of ["Match", "Snitch"]) for (const c of ["odwaga", "spryt", "intelekt", "lojalnosc"]) used.add(`HOGWART.Quidditch.${p}.${c}`);
for (const p of [5, 10, 20, 50]) used.add(`HOGWART.UI.Points${p}`);
for (const t of ["character", "narrator", "npc"]) used.add(`TYPES.Actor.${t}`);
for (const t of ["przedmiot", "zaklecie"]) used.add(`TYPES.Item.${t}`);

for (const [lang, keys] of Object.entries(langs)) {
  const missing = [...used].filter(k => !k.endsWith(".") && !(k in keys));
  if (missing.length) fail(`${lang}: missing ${missing.join(", ")}`);
  else console.log(`✓ ${lang}: all ${used.size} keys present`);
}
process.exit(errors ? 1 : 0);
