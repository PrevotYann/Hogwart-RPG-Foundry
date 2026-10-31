/**
 * Validates the built packs against Foundry's own document schemas.
 * Run inside the Foundry container:
 *   node tools/validate-packs.mjs <repoDir> <foundryAppDir>
 */
import path from "node:path";
import { createRequire } from "node:module";

const [repoDir, appDir] = process.argv.slice(2);
const require = createRequire(import.meta.url);
const { ClassicLevel } = require(path.join(appDir, "node_modules", "classic-level"));
await import(path.join(appDir, "common", "server.mjs"));
const { documents } = globalThis.foundry;

// Minimal CONFIG / game stubs so that system sub-types are accepted
globalThis.CONFIG ??= {};
globalThis.game = {
  system: { id: "systemHogwartRPG", documentTypes: { Item: { przedmiot: {}, zaklecie: {} }, Actor: { character: {}, narrator: {} } } },
  model: {
    Item: { base: {}, przedmiot: {}, zaklecie: {} },
    Actor: { base: {}, character: {}, narrator: {} },
    JournalEntryPage: Object.fromEntries(["text", "image", "pdf", "video"].map(t => [t, {}])),
    TableResult: Object.fromEntries(Object.values(foundry.CONST.TABLE_RESULT_TYPES).map(t => [t, {}]))
  }
};

const packs = {
  "regles-fr": { cls: documents.BaseJournalEntry, embedded: { pages: "!journal.pages!" }, prefix: "!journal!" },
  "livres-pdf": { cls: documents.BaseJournalEntry, embedded: { pages: "!journal.pages!" }, prefix: "!journal!" },
  "objets-magiques-fr": { cls: documents.BaseItem, embedded: {}, prefix: "!items!" },
  "tables-fr": { cls: documents.BaseRollTable, embedded: { results: "!tables.results!" }, prefix: "!tables!" }
};

let errors = 0;
for (const [name, cfg] of Object.entries(packs)) {
  const db = new ClassicLevel(path.join(repoDir, "packs", name), { keyEncoding: "utf8", valueEncoding: "json" });
  await db.open();
  const all = new Map();
  for await (const [k, v] of db.iterator()) all.set(k, v);
  await db.close();

  let count = 0;
  for (const [key, doc] of all) {
    if (!key.startsWith(cfg.prefix)) continue;
    const data = structuredClone(doc);
    for (const [field, embPrefix] of Object.entries(cfg.embedded)) {
      data[field] = doc[field].map(childId => {
        const child = all.get(`${embPrefix}${doc._id}.${childId}`);
        if (!child) throw new Error(`${name}: missing embedded ${field} ${childId}`);
        return structuredClone(child);
      });
    }
    try {
      const d = new cfg.cls(data, { strict: true });
      d.validate({ strict: true });
      count++;
    } catch (err) {
      errors++;
      console.error(`${name} / ${doc.name}: ${process.env.DEBUG ? err.stack : err.message}`);
    }
  }
  console.log(`${name}: ${count} documents valid`);
}
process.exit(errors ? 1 : 0);
