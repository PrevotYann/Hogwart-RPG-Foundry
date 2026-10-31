import { HogwartNarratorSheet } from "./narrator-sheet.js";
import { HogwartNpcSheet } from "./npc-sheet.js";
import { wykonajRzutCechy, rzucZaklecie, rzucZaklecieZPrzedmiotu, uzyjPrzedmiotu, rzutQuidditch, rzutOpuszczenia, uzyjSzczescia, wszystkieStany, ogloszenieOpuszczenia, SYSTEM_ID } from "./dice.js";
import { inicjalizujSceneStartowa } from "./sceneManager.js";
import { wykonajRuch } from "./moves.js";
import { przygotujZaklecia, TYPY_ZAKLEC } from "./spells.js";

const { ActorSheet, ItemSheet } = foundry.appv1.sheets;
const { DocumentSheetConfig } = foundry.applications.apps;

export class HogwartActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["hogwart", "sheet", "actor", "hogwart-actor-sheet", "hogwart-custom-sheet"],
            template: "systems/systemHogwartRPG/templates/actor-sheet.hbs",
            width: 950,
            height: 750,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "arkusz" }]
        });
    }

    getData() {
        const context = super.getData();
        const actorData = this.actor.toObject(false);

        context.system = actorData.system || {};
        context.flags = actorData.flags || {};
        context.items = actorData.items || [];

        context.zaklecia = [];
        context.przedmioty = [];

        for (let item of context.items) {
            item.img = item.img || Item.DEFAULT_ICON;
            if (item.type === "zaklecie") {
                const typ = TYPY_ZAKLEC[item.system?.typ] || TYPY_ZAKLEC.urok;
                item.ikona = typ.ikona;
                item.klasa = typ.klasa;
                item.etykieta = game.i18n.localize(typ.etykieta);
                context.zaklecia.push(item);
            } else {
                context.przedmioty.push(item);
            }
        }

        context.kartaZaklec = przygotujZaklecia(context.system.zaklecia || {});
        context.wszystkieStany = wszystkieStany(this.actor);

        context.system.domySelected = {
            "gryffindor": game.i18n.localize("HOGWART.Narrator.Gryffindor"),
            "slytherin": game.i18n.localize("HOGWART.Narrator.Slytherin"),
            "ravenclaw": game.i18n.localize("HOGWART.Narrator.Ravenclaw"),
            "hufflepuff": game.i18n.localize("HOGWART.Narrator.Hufflepuff")
        };
        context.system.lataSelected = {
            "1": game.i18n.localize("HOGWART.Glowna.1"),
            "2": game.i18n.localize("HOGWART.Glowna.2"),
            "3": game.i18n.localize("HOGWART.Glowna.3"),
            "4": game.i18n.localize("HOGWART.Glowna.4"),
            "5": game.i18n.localize("HOGWART.Glowna.5"),
            "6": game.i18n.localize("HOGWART.Glowna.6"),
            "7": game.i18n.localize("HOGWART.Glowna.7")
        };
        context.system.krewSelected = {
            "czysta": game.i18n.localize("HOGWART.Glowna.Pure"),
            "polkrwi": game.i18n.localize("HOGWART.Glowna.Half"),
            "mugolak": game.i18n.localize("HOGWART.Glowna.Muggleborn")
        };

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        const wybranyDom = this.actor.system?.dom || this.actor.system?.house || "";
        this.element.removeClass("gryffindor slytherin ravenclaw hufflepuff");
        if (wybranyDom) {
            this.element.addClass(wybranyDom.toLowerCase());
        }

        if (!this.isEditable) return;

        html.find('.rollable').click(this._onRoll.bind(this));
        html.find('.hg-zaklecie-rzut').click(this._onSpell.bind(this));
        html.find('.hg-quidditch').click(this._onQuidditch.bind(this));
        html.find('.hg-opusc').click(() => rzutOpuszczenia(this.actor));
        html.find('.item-create').click(this._onItemCreate.bind(this));
        html.find('.item-edit').click(this._onItemEdit.bind(this));
        html.find('.item-delete').click(this._onItemDelete.bind(this));
        html.find('.item-use').click(this._onItemUse.bind(this));
        html.find('.item-cast').click(this._onItemCast.bind(this));
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type || "przedmiot";
        const itemData = {
            name: game.i18n.localize(type === "zaklecie" ? "HOGWART.UI.NewSpell" : "HOGWART.UI.NewItem"),
            type: type,
            system: {}
        };
        return await Item.create(itemData, { parent: this.actor });
    }

    _onItemEdit(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        if (item) item.sheet.render(true);
    }

    async _onItemDelete(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        if (item) await item.delete();
        li.slideUp(200, () => this.render(false));
    }

    async _onItemUse(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        if (item) await uzyjPrzedmiotu(this.actor, item);
    }

    async _onItemCast(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        if (item) await rzucZaklecieZPrzedmiotu(this.actor, item, { wymusRzut: event.shiftKey });
    }

    async _onRoll(event) {
        event.preventDefault();
        const dataset = event.currentTarget.dataset;

        if (dataset.roll || dataset.cecha) {
            await wykonajRzutCechy(this.actor, dataset.cecha, { pominDialog: event.shiftKey });
        }
    }

    async _onSpell(event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.zaklecie;
        await rzucZaklecie(this.actor, id, { wymusRzut: event.shiftKey });
    }

    async _onQuidditch(event) {
        event.preventDefault();
        await rzutQuidditch(this.actor, event.currentTarget.dataset.ruch);
    }
}


export class HogwartItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["hogwart", "sheet", "item"],
            template: "systems/systemHogwartRPG/templates/item-sheet.hbs",
            width: 480,
            height: 480
        });
    }

    getData() {
        const context = super.getData();
        context.system = this.item.toObject(false).system || {};
        context.jestZakleciem = this.item.type === "zaklecie";
        if (context.jestZakleciem) {
            context.typyZaklec = Object.fromEntries(Object.entries(TYPY_ZAKLEC).map(([k, v]) => [k, game.i18n.localize(v.etykieta)]));
            context.lataZaklec = { 0: game.i18n.localize("HOGWART.UI.SpellNoYear") };
            for (let rok = 1; rok <= 7; rok++) context.lataZaklec[rok] = game.i18n.localize(`HOGWART.Spells.${rok}Year`);
        }
        return context;
    }
}


// Inicjalizacja Foundry
Hooks.once("init", async function () {
    console.log("Hogwart System | Rejestracja arkuszy i inicjalizacja...");

    try {
        DocumentSheetConfig.unregisterSheet(Actor, "core", ActorSheet);
    } catch (err) {
        console.warn("Hogwart System |", err);
    }

    DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, HogwartActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "HOGWART.UI.SheetCharacter"
    });

    DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, HogwartNarratorSheet, {
        types: ["narrator"],
        makeDefault: true,
        label: "HOGWART.UI.SheetNarrator"
    });

    DocumentSheetConfig.registerSheet(Actor, SYSTEM_ID, HogwartNpcSheet, {
        types: ["npc"],
        makeDefault: true,
        label: "HOGWART.UI.SheetNpc"
    });

    DocumentSheetConfig.registerSheet(Item, SYSTEM_ID, HogwartItemSheet, {
        types: ["przedmiot", "zaklecie"],
        makeDefault: true,
        label: "HOGWART.UI.SheetItem"
    });

    game.settings.register(SYSTEM_ID, "aventureProposee", {
        scope: "world", config: false, type: Boolean, default: false
    });

    await foundry.applications.handlebars.loadTemplates([
        "systems/systemHogwartRPG/templates/actor-history.hbs"
    ]);
});

Hooks.once("ready", async function () {
    await inicjalizujSceneStartowa();
    await zaproponujPrzygode();
});

// Raz na świat: otwórz okno importu przygody z kompendium dla MG
async function zaproponujPrzygode() {
    if (!game.user.isGM || game.settings.get(SYSTEM_ID, "aventureProposee")) return;
    const pack = game.packs.get(`${SYSTEM_ID}.aventure-citrouilles`);
    if (!pack) return;
    await game.settings.set(SYSTEM_ID, "aventureProposee", true);
    const index = await pack.getIndex();
    const adventure = index.size ? await pack.getDocument(index.contents[0]._id) : null;
    adventure?.sheet.render(true);
}

Hooks.on("renderChatMessageHTML", (message, html) => {
    html.querySelectorAll(".btn-moj-ruch").forEach(btn => btn.addEventListener("click", async event => {
        event.preventDefault();
        const ruchId = btn.dataset.ruchId;
        const wynik = btn.dataset.wynik;

        let actor = game.user.character
            || canvas.tokens?.controlled[0]?.actor
            || (message.speaker?.actor ? game.actors.get(message.speaker.actor) : null);

        await wykonajRuch(ruchId, actor, wynik);
    }));

    html.querySelectorAll(".hg-szczescie").forEach(btn => {
        if (message.getFlag(SYSTEM_ID, "rzut")?.szczescieUzyte) {
            btn.disabled = true;
            return;
        }
        btn.addEventListener("click", async event => {
            event.preventDefault();
            btn.disabled = true;
            await uzyjSzczescia(message);
        });
    });

    html.querySelectorAll(".hg-opusc").forEach(btn => btn.addEventListener("click", async event => {
        event.preventDefault();
        const actor = game.actors.get(btn.dataset.actorId);
        if (!actor?.isOwner) {
            ui.notifications.warn(game.i18n.localize("HOGWART.UI.NotOwner"));
            return;
        }
        await rzutOpuszczenia(actor);
    }));
});

// Gdy zaznaczono ostatni (8.) Stan: zaproponuj rzut na opuszczenie historii
Hooks.on("updateActor", (actor, changed, options, userId) => {
    if (userId !== game.user.id || actor.type !== "character") return;
    const zmienioneStany = Object.entries(changed.system || {}).filter(([k, v]) => k.startsWith("stan") && v === true);
    if (zmienioneStany.length === 0) return;
    if (wszystkieStany(actor)) ogloszenieOpuszczenia(actor);
});
