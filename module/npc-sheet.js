// Arkusz Postaci Narratora / stworzenia (typ aktora "npc")
// W grze nie ma statystyk dla BN: tylko rola, cecha, opis, ruchy Narratora i sekret.
const t = klucz => game.i18n.localize(klucz);

export const RODZAJE_BN = {
    uczen: "HOGWART.Npc.Kind.uczen",
    nauczyciel: "HOGWART.Npc.Kind.nauczyciel",
    personel: "HOGWART.Npc.Kind.personel",
    duch: "HOGWART.Npc.Kind.duch",
    stworzenie: "HOGWART.Npc.Kind.stworzenie",
    inny: "HOGWART.Npc.Kind.inny"
};

const DOMY_BN = {
    "": "HOGWART.Npc.NoHouse",
    gryffindor: "HOGWART.Narrator.Gryffindor",
    hufflepuff: "HOGWART.Narrator.Hufflepuff",
    ravenclaw: "HOGWART.Narrator.Ravenclaw",
    slytherin: "HOGWART.Narrator.Slytherin"
};

export class HogwartNpcSheet extends foundry.appv1.sheets.ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["hogwart", "sheet", "actor", "hogwart-npc-sheet"],
            template: "systems/systemHogwartRPG/templates/actor-npc-sheet.hbs",
            width: 640,
            height: 720,
            resizable: true
        });
    }

    async getData() {
        const context = super.getData();
        const system = this.actor.toObject(false).system || {};
        const TextEditor = foundry.applications.ux.TextEditor.implementation;
        const wzbogac = tekst => TextEditor.enrichHTML(tekst || "", { secrets: this.actor.isOwner, relativeTo: this.actor });

        context.system = system;
        context.isGM = game.user.isGM;
        context.rodzaje = Object.fromEntries(Object.entries(RODZAJE_BN).map(([k, v]) => [k, t(v)]));
        context.domy = Object.fromEntries(Object.entries(DOMY_BN).map(([k, v]) => [k, t(v)]));
        context.wzbogacone = {
            opis: await wzbogac(system.opis),
            ruchy: await wzbogac(system.ruchy),
            sekret: await wzbogac(system.sekret)
        };
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        const dom = this.actor.system?.dom || "";
        this.element.removeClass("gryffindor slytherin ravenclaw hufflepuff");
        if (dom) this.element.addClass(dom);

        if (!this.isEditable) return;
        html.find(".hg-do-notatek").click(this._onDodajDoNotatek.bind(this));
    }

    // Wpisuje BN do pierwszego wolnego wiersza "Postacie Narratora" w Notatkach Narratora
    async _onDodajDoNotatek(event) {
        event.preventDefault();
        const notatki = game.actors.find(a => a.type === "narrator" && a.isOwner);
        if (!notatki) {
            ui.notifications.warn(t("HOGWART.Npc.NoNarrator"));
            return;
        }
        const wiersze = notatki.system.postacieNarratora || {};
        if (Object.values(wiersze).some(w => w?.nazwa === this.actor.name)) {
            ui.notifications.info(game.i18n.format("HOGWART.Npc.AlreadyInNotes", { name: this.actor.name, notes: notatki.name }));
            return;
        }
        const wolny = Object.keys(wiersze).find(k => !wiersze[k]?.nazwa);
        if (!wolny) {
            ui.notifications.warn(t("HOGWART.Npc.NotesFull"));
            return;
        }
        await notatki.update({
            [`system.postacieNarratora.${wolny}`]: {
                nazwa: this.actor.name,
                rola: this.actor.system.rola || "",
                cecha: this.actor.system.cecha || ""
            }
        });
        ui.notifications.info(game.i18n.format("HOGWART.Npc.AddedToNotes", { name: this.actor.name, notes: notatki.name }));
    }
}
