const DOMY = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"];
const KLUCZE_DOMOW = { gryffindor: "Gryffindor", hufflepuff: "Hufflepuff", ravenclaw: "Ravenclaw", slytherin: "Slytherin" };
const PUNKTY_STARTOWE = [250, 275, 300, 325, 350, 375];

const t = (klucz, dane) => dane ? game.i18n.format(klucz, dane) : game.i18n.localize(klucz);
const nazwaDomu = dom => t(`HOGWART.Narrator.${KLUCZE_DOMOW[dom]}`);

export class HogwartNarratorSheet extends foundry.appv1.sheets.ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["hogwart", "sheet", "actor", "narrator"],
            template: "systems/systemHogwartRPG/templates/actor-narrator-sheet.hbs",
            width: 900,
            height: 750,
            resizable: true
        });
    }

    getData() {
        const context = super.getData();
        const systemData = context.actor.system;

        systemData.glownePostacie = systemData.glownePostacie || {
            "1": { nazwa: "", dom: "", rok: "" },
            "2": { nazwa: "", dom: "", rok: "" },
            "3": { nazwa: "", dom: "", rok: "" },
            "4": { nazwa: "", dom: "", rok: "" },
            "5": { nazwa: "", dom: "", rok: "" }
        };

        systemData.postacieNarratora = systemData.postacieNarratora || {
            "1": { nazwa: "", rola: "", cecha: "" },
            "2": { nazwa: "", rola: "", cecha: "" },
            "3": { nazwa: "", rola: "", cecha: "" },
            "4": { nazwa: "", rola: "", cecha: "" },
            "5": { nazwa: "", rola: "", cecha: "" },
            "6": { nazwa: "", rola: "", cecha: "" }
        };

        systemData.zagrozenia = systemData.zagrozenia || {
            "1": { tytul: "", dotyczy: "", stawka: "", krok: "" },
            "2": { tytul: "", dotyczy: "", stawka: "", krok: "" },
            "3": { tytul: "", dotyczy: "", stawka: "", krok: "" }
        };

        context.system = systemData;
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isEditable) return;

        html.find(".hg-punkty").click(this._onPunktyDomu.bind(this));
        html.find(".hg-punkty-start").click(this._onPunktyStartowe.bind(this));
        html.find(".hg-zwyciezca").click(this._onZwyciezca.bind(this));
        html.find(".hg-koniec-sesji").click(this._onKoniecSesji.bind(this));
        html.find(".hg-koniec-roku").click(this._onKoniecRoku.bind(this));
    }

    // Przyznaj lub odejmij punkty domu (5 / 10 / 20 / 50)
    async _onPunktyDomu(event) {
        event.preventDefault();
        const opcjeDomow = DOMY.map(d => `<option value="${d}">${nazwaDomu(d)}</option>`).join("");
        const opcjePunktow = [5, 10, 20, 50].map(p => `<option value="${p}">${t(`HOGWART.UI.Points${p}`)}</option>`).join("");
        const content = `
            <div style="display: flex; flex-direction: column; gap: 6px;">
                <label>${t("HOGWART.Narrator.Dom")} <select name="dom">${opcjeDomow}</select></label>
                <label>${t("HOGWART.UI.PointsAmount")} <select name="ilosc">${opcjePunktow}</select></label>
                <label><input type="radio" name="kierunek" value="1" checked> ${t("HOGWART.UI.PointsGive")}</label>
                <label><input type="radio" name="kierunek" value="-1"> ${t("HOGWART.UI.PointsTake")}</label>
                <label>${t("HOGWART.UI.PointsReason")} <input type="text" name="powod"></label>
            </div>`;

        const dane = await foundry.applications.api.DialogV2.wait({
            window: { title: t("HOGWART.UI.HousePoints") },
            content,
            buttons: [{
                action: "ok",
                label: t("HOGWART.UI.Confirm"),
                default: true,
                callback: (ev, button) => new foundry.applications.ux.FormDataExtended(button.form).object
            }],
            rejectClose: false
        });
        if (!dane) return;

        const zmiana = Number(dane.ilosc) * Number(dane.kierunek);
        const obecne = Number(this.actor.system.punkty?.[dane.dom]) || 0;
        await this.actor.update({ [`system.punkty.${dane.dom}`]: obecne + zmiana });

        const klucz = zmiana > 0 ? "HOGWART.UI.PointsGiven" : "HOGWART.UI.PointsTaken";
        let content2 = `<p>⏳ <strong>${t(klucz, { points: Math.abs(zmiana), house: nazwaDomu(dane.dom) })}</strong></p>`;
        if (dane.powod) content2 += `<p><em>${foundry.utils.escapeHTML(dane.powod)}</em></p>`;
        await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), content: content2 });
    }

    // Punkty startowe domów: 1k6 na tabeli 250-375 dla każdego domu
    async _onPunktyStartowe(event) {
        event.preventDefault();
        const zgoda = await foundry.applications.api.DialogV2.confirm({
            window: { title: t("HOGWART.UI.StartPoints") },
            content: `<p>${t("HOGWART.UI.StartPointsConfirm")}</p>`,
            rejectClose: false
        });
        if (!zgoda) return;

        const zmiany = {};
        const linie = [];
        for (const dom of DOMY) {
            const roll = await new Roll("1d6").evaluate();
            const punkty = PUNKTY_STARTOWE[roll.total - 1];
            zmiany[`system.punkty.${dom}`] = punkty;
            linie.push(`<li>${nazwaDomu(dom)} : 🎲 ${roll.total} → <strong>${punkty}</strong></li>`);
        }
        await this.actor.update(zmiany);
        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: `<h3>${t("HOGWART.UI.StartPoints")}</h3><ul>${linie.join("")}</ul>`
        });
    }

    // Zwycięzca z zeszłego roku: tabela domów (1k6, 5-6 przerzut)
    async _onZwyciezca(event) {
        event.preventDefault();
        const roll = await new Roll("1d4").evaluate();
        const dom = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"][roll.total - 1];
        await this.actor.update({ "system.zeszlorocznyZwyciezca": nazwaDomu(dom) });
        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<h3>${t("HOGWART.Narrator.ZwyciezcaZeszloroczny")}</h3><p>🏆 <strong>${nazwaDomu(dom)}</strong></p>`
        });
    }

    async _onKoniecSesji(event) {
        event.preventDefault();
        const doProgresu = game.actors.filter(a => a.type === "character" && ["pd1", "pd2", "pd3", "pd4"].every(k => a.system[k]));
        let content = `<h3>📜 ${t("HOGWART.UI.EndSession")}</h3>${t("HOGWART.UI.EndSessionMsg")}`;
        if (doProgresu.length) {
            content += `<p>⭐ ${t("HOGWART.UI.EndSessionAdvance", { names: doProgresu.map(a => a.name).join(", ") })}</p>`;
        }
        await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: this.actor }), content });
    }

    // Koniec roku szkolnego: odzyskanie Szczęścia, Awans, opcjonalnie kolejny rok
    async _onKoniecRoku(event) {
        event.preventDefault();
        const dane = await foundry.applications.api.DialogV2.wait({
            window: { title: t("HOGWART.UI.EndYear") },
            content: `<p>${t("HOGWART.UI.EndYearConfirm")}</p>
                <label><input type="checkbox" name="kolejnyRok" checked> ${t("HOGWART.UI.AdvanceYear")}</label>`,
            buttons: [{
                action: "ok",
                label: t("HOGWART.UI.Confirm"),
                default: true,
                callback: (ev, button) => new foundry.applications.ux.FormDataExtended(button.form).object
            }],
            rejectClose: false
        });
        if (!dane) return;

        const postacie = game.actors.filter(a => a.type === "character");
        for (const actor of postacie) {
            const zmiany = { "system.szczescie1": false, "system.szczescie2": false, "system.szczescie3": false };
            if (dane.kolejnyRok) {
                const rok = Number(actor.system.rokNauki) || 1;
                if (rok < 7) zmiany["system.rokNauki"] = String(rok + 1);
            }
            await actor.update(zmiany);
        }

        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            content: `<h3>🎓 ${t("HOGWART.UI.EndYear")}</h3>${t("HOGWART.UI.EndYearMsg")}`
        });
    }
}
