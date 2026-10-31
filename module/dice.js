import { generujHtmlRuchow, pobierzNazweCechy, wynikRuchuHtml, CECHY } from "./moves.js";
import { pobierzZaklecie, nazwaZaklecia, opisZaklecia } from "./spells.js";

export const SYSTEM_ID = "systemHogwartRPG";

const STANY = [
    "stanPrzestraszony", "stanZly", "stanZestresowany", "stanZazdrosny",
    "stanZawstydzony", "stanRanny", "stanPrzeklety", "stanNieprzytomny"
];
const PUNKTY_DOSWIADCZENIA = ["pd1", "pd2", "pd3", "pd4"];
const PUNKTY_SZCZESCIA = ["szczescie1", "szczescie2", "szczescie3"];

const t = (klucz, dane) => dane ? game.i18n.format(klucz, dane) : game.i18n.localize(klucz);


// Zwykły rzut na cechę (kliknięcie cechy na karcie)
export async function wykonajRzutCechy(actor, cechaNazwa, { pominDialog = false } = {}) {
    return wykonajRzut(actor, { cecha: cechaNazwa, pominDialog });
}


/**
 * Rzut 2k6 + cecha, z modyfikatorami ze Stanów i z okna dialogowego.
 * @param {Actor} actor
 * @param {object} opcje
 * @param {string} [opcje.cecha]           Klucz cechy (odwaga, spryt, intelekt, lojalnosc, magia)
 * @param {string} [opcje.ruchId]          Ruch, którego wynik ma być pokazany od razu
 * @param {string} [opcje.tytul]           Dodatkowy tytuł (np. nazwa zaklęcia)
 * @param {string} [opcje.dodatek]         Dodatkowy HTML pod tytułem
 * @param {Array}  [opcje.wyborCechy]      Lista {cecha, etykieta} do wyboru w oknie (Quidditch)
 * @param {boolean} [opcje.pominDialog]    Pomija okno z modyfikatorami
 */
export async function wykonajRzut(actor, { cecha, ruchId, tytul, dodatek, wyborCechy, pominDialog = false } = {}) {
    if (!actor) return;

    if (actor.system.stanNieprzytomny === true) {
        ui.notifications.warn(t("HOGWART.UI.Unconscious", { name: actor.name }));
        return;
    }

    let bonusy = { przyjaciel: false, przedmiot: false, mod: 0, cecha };
    if (!pominDialog || wyborCechy) {
        const wynik = await oknoModyfikatorow(actor, { cecha, ruchId, tytul, wyborCechy });
        if (!wynik) return;
        bonusy = wynik;
    }

    const kluczCechy = (bonusy.cecha || cecha || "").toLowerCase().trim();
    const cechaWartosc = Number(actor.system[kluczCechy]) || 0;
    const { modyfikator, opisModow } = modyfikatoryStanow(actor, kluczCechy);
    let suma = modyfikator;

    if (bonusy.przyjaciel) {
        suma += 1;
        opisModow.push(`<strong>${t("HOGWART.UI.FriendBonus")}:</strong> +1`);
    }
    if (bonusy.przedmiot) {
        suma += 1;
        opisModow.push(`<strong>${t("HOGWART.UI.SubjectBonus")}:</strong> +1`);
    }
    const inny = Number(bonusy.mod) || 0;
    if (inny !== 0) {
        suma += inny;
        opisModow.push(`<strong>${t("HOGWART.UI.OtherBonus")}:</strong> ${inny > 0 ? "+" : ""}${inny}`);
    }

    let formula = `2d6 + ${cechaWartosc}`;
    if (suma !== 0) {
        formula += suma > 0 ? ` + ${suma}` : ` - ${Math.abs(suma)}`;
    }

    const roll = new Roll(formula, actor.getRollData());
    await roll.evaluate();

    const nazwaCechyPrzetlumaczona = pobierzNazweCechy(kluczCechy).toUpperCase();
    let flavorText = "";
    if (tytul) flavorText += `<h3 style="margin: 0 0 4px 0;">${tytul}</h3>`;
    if (dodatek) flavorText += `<div style="font-size: 12px; margin-bottom: 6px;">${dodatek}</div>`;
    flavorText += `${t("HOGWART.Roll.TraitRoll")} <strong>${nazwaCechyPrzetlumaczona}</strong>`;

    if (opisModow.length > 0) {
        flavorText += `<hr><small style="color: #444;">${opisModow.join("<br>")}</small>`;
    }

    if (ruchId) {
        flavorText += `<div style="margin-top: 10px;">${wynikRuchuHtml(ruchId, roll.total)}</div>`;
    } else {
        flavorText += wynikOgolnyHtml(roll.total);
        const ruchyHtml = await generujHtmlRuchow(actor, kluczCechy, roll.total);
        if (ruchyHtml) flavorText += `<div style="margin-top: 10px;">${ruchyHtml}</div>`;
    }

    // Porażka: automatycznie zaznacz punkt Doświadczenia
    let pdZaznaczone = null;
    if (roll.total <= 6) {
        const wynikPd = await zaznaczDoswiadczenie(actor);
        pdZaznaczone = wynikPd.klucz;
        flavorText += `<p class="hg-info" style="margin: 8px 0 0 0; font-size: 12px;">⭐ ${wynikPd.komunikat}</p>`;
    }

    // Szczęście: zmiana wyniku na 10+
    if (roll.total < 10 && wolnySzczescie(actor)) {
        flavorText += `<button type="button" class="hg-szczescie" style="margin-top: 8px; width: 100%; cursor: pointer;">🍀 ${t("HOGWART.UI.SpendLuck")}</button>`;
    }

    await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: flavorText,
        flags: {
            [SYSTEM_ID]: {
                rzut: { actorId: actor.id, cecha: kluczCechy, ruchId: ruchId || null, tytul: tytul || null, total: roll.total, pdZaznaczone, szczescieUzyte: false }
            }
        }
    });
    return roll;
}


function modyfikatoryStanow(actor, kluczCechy) {
    let modyfikator = 0;
    const opisModow = [];
    const s = actor.system;

    if (kluczCechy === "odwaga" && s.stanPrzestraszony === true) {
        modyfikator -= 2;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Afraid")}:</strong> -2`);
    }
    if (kluczCechy === "spryt" && s.stanZly === true) {
        modyfikator -= 2;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Angry")}:</strong> -2`);
    }
    if (kluczCechy === "intelekt" && s.stanZestresowany === true) {
        modyfikator -= 2;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Stressed")}:</strong> -2`);
    }
    if (kluczCechy === "lojalnosc" && s.stanZazdrosny === true) {
        modyfikator -= 2;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Jealous")}:</strong> -2`);
    }
    if (kluczCechy === "magia" && s.stanZawstydzony === true) {
        modyfikator -= 2;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Embarrassed")}:</strong> -2`);
    }
    if (s.stanRanny === true) {
        modyfikator -= 1;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Injured")}:</strong> -1`);
    }
    if (s.stanPrzeklety === true && s.przekletyCecha && kluczCechy === s.przekletyCecha.toLowerCase()) {
        modyfikator -= 1;
        opisModow.push(`<strong>${t("HOGWART.Conditions.Cursed")}:</strong> -1`);
    }
    return { modyfikator, opisModow };
}


function wynikOgolnyHtml(total) {
    let titleWynik, descWynik, borderColor, bgColor;
    if (total <= 6) {
        titleWynik = t("HOGWART.Roll.Failure");
        descWynik = t("HOGWART.Roll.FailureDesc");
        borderColor = "#c0392b";
        bgColor = "rgba(192, 57, 43, 0.08)";
    } else if (total <= 9) {
        titleWynik = t("HOGWART.Roll.Partial");
        descWynik = t("HOGWART.Roll.PartialDesc");
        borderColor = "#d35400";
        bgColor = "rgba(211, 84, 0, 0.08)";
    } else {
        titleWynik = t("HOGWART.Roll.Success");
        descWynik = t("HOGWART.Roll.SuccessDesc");
        borderColor = "#27ae60";
        bgColor = "rgba(39, 174, 96, 0.08)";
    }
    return `
      <div style="margin-top: 12px; padding: 10px; border-left: 4px solid ${borderColor}; background: ${bgColor}; border-radius: 0 4px 4px 0;">
        <strong style="color: ${borderColor}; font-size: 14px; font-weight: bold;">${titleWynik}</strong><br>
        <span style="font-size: 12px; line-height: 1.4; display: block; margin-top: 4px; color: #1a1a1a;">
          ${descWynik}
        </span>
      </div>
    `;
}


async function oknoModyfikatorow(actor, { cecha, ruchId, tytul, wyborCechy }) {
    const s = actor.system;
    const nazwa = tytul || (ruchId ? game.i18n.localize(`MOVES.${ruchId}.name`) : pobierzNazweCechy(cecha));

    let content = `<div class="hg-roll-dialog" style="display: flex; flex-direction: column; gap: 6px;">`;
    if (wyborCechy) {
        content += `<p style="margin: 0;"><strong>${t("HOGWART.UI.PickApproach")}</strong></p>`;
        wyborCechy.forEach((opcja, i) => {
            const wartosc = Number(s[opcja.cecha]) || 0;
            content += `<label><input type="radio" name="cecha" value="${opcja.cecha}" ${i === 0 ? "checked" : ""}> ${opcja.etykieta} (${wartosc >= 0 ? "+" : ""}${wartosc})</label>`;
        });
        content += `<hr style="width: 100%;">`;
    }
    content += `<label><input type="checkbox" name="przyjaciel"> ${t("HOGWART.UI.FriendOption")}</label>`;
    const przedmioty = [s.ulubionyPrzedmiot1, s.ulubionyPrzedmiot2].filter(p => p).join(", ");
    content += `<label><input type="checkbox" name="przedmiot"> ${t("HOGWART.UI.SubjectOption")}${przedmioty ? ` <em>(${przedmioty})</em>` : ""}</label>`;
    content += `<label style="display: flex; align-items: center; gap: 6px;">${t("HOGWART.UI.OtherModifier")} <input type="number" name="mod" value="0" style="width: 60px;"></label>`;
    content += `<p style="margin: 0; font-size: 11px; opacity: 0.8;">${t("HOGWART.UI.ShiftHint")}</p>`;
    content += `</div>`;

    const dane = await foundry.applications.api.DialogV2.wait({
        window: { title: nazwa },
        content,
        buttons: [{
            action: "rzut",
            label: t("HOGWART.UI.Roll"),
            icon: "fas fa-dice",
            default: true,
            callback: (event, button) => new foundry.applications.ux.FormDataExtended(button.form).object
        }],
        rejectClose: false
    });
    if (!dane) return null;
    return {
        cecha: dane.cecha || cecha,
        przyjaciel: !!dane.przyjaciel,
        przedmiot: !!dane.przedmiot,
        mod: Number(dane.mod) || 0
    };
}


// --- Doświadczenie i Szczęście ---

async function zaznaczDoswiadczenie(actor) {
    const wolny = PUNKTY_DOSWIADCZENIA.find(k => !actor.system[k]);
    if (!wolny) return { klucz: null, komunikat: t("HOGWART.UI.XpAlreadyFull") };

    await actor.update({ [`system.${wolny}`]: true });
    const ile = PUNKTY_DOSWIADCZENIA.filter(k => actor.system[k]).length;
    const komunikat = ile >= 4 ? `${t("HOGWART.UI.XpMarked", { n: ile })} ${t("HOGWART.UI.XpFull")}` : t("HOGWART.UI.XpMarked", { n: ile });
    return { klucz: wolny, komunikat };
}

function wolnySzczescie(actor) {
    return PUNKTY_SZCZESCIA.find(k => !actor.system[k]) || null;
}

async function zaznaczSzczescie(actor) {
    const wolny = wolnySzczescie(actor);
    if (!wolny) return false;
    await actor.update({ [`system.${wolny}`]: true });
    return true;
}

// Kliknięcie "Wydaj punkt Szczęścia" pod rzutem
export async function uzyjSzczescia(message) {
    const dane = message.getFlag(SYSTEM_ID, "rzut");
    if (!dane) return;
    const actor = game.actors.get(dane.actorId);
    if (!actor) return;

    if (!actor.isOwner) {
        ui.notifications.warn(t("HOGWART.UI.NotOwner"));
        return;
    }
    if (dane.szczescieUzyte) {
        ui.notifications.warn(t("HOGWART.UI.LuckAlreadyUsed"));
        return;
    }
    const wolny = wolnySzczescie(actor);
    if (!wolny) {
        ui.notifications.warn(t("HOGWART.UI.NoLuck"));
        return;
    }

    const zmiany = { [`system.${wolny}`]: true };
    // Rzut nie jest już porażką: cofnij automatycznie zaznaczone Doświadczenie
    if (dane.pdZaznaczone) zmiany[`system.${dane.pdZaznaczone}`] = false;
    await actor.update(zmiany);

    try {
        await message.setFlag(SYSTEM_ID, "rzut", { ...dane, szczescieUzyte: true });
    } catch (err) {
        console.warn("Hogwart System | Nie można oznaczyć wiadomości:", err);
    }

    let content = `<p>🍀 <strong>${t("HOGWART.UI.LuckSpent", { name: actor.name })}</strong></p>`;
    if (dane.tytul) content += `<p style="margin: 0 0 6px 0;"><em>${dane.tytul}</em></p>`;
    if (dane.ruchId) {
        content += wynikRuchuHtml(dane.ruchId, 10);
    } else {
        content += wynikOgolnyHtml(10);
        content += await generujHtmlRuchow(actor, dane.cecha, 10);
    }

    await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content
    });
}


// --- Zaklęcia i eliksiry ---

export async function rzucZaklecie(actor, zaklecieId, { wymusRzut = false } = {}) {
    const zaklecie = pobierzZaklecie(zaklecieId);
    if (!zaklecie) return;
    return rzucOpisaneZaklecie(actor, {
        typ: zaklecie.typ,
        rok: zaklecie.rok,
        nazwa: nazwaZaklecia(zaklecie),
        opis: opisZaklecia(zaklecie),
        znane: !!actor.system.zaklecia?.[zaklecieId],
        wymusRzut
    });
}

// Zaklęcie lub eliksir jako przedmiot (typ "zaklecie"): posiadanie go na karcie = znajomość
export async function rzucZaklecieZPrzedmiotu(actor, item, { wymusRzut = false } = {}) {
    const opis = item.system?.opis || "";
    return rzucOpisaneZaklecie(actor, {
        typ: item.system?.typ || "urok",
        rok: Number(item.system?.rok) || 0,
        nazwa: item.name,
        opis: foundry.utils.escapeHTML ? foundry.utils.escapeHTML(opis) : opis,
        znane: true,
        wymusRzut
    });
}

async function rzucOpisaneZaklecie(actor, { typ, rok, nazwa, opis, znane, wymusRzut }) {
    const eliksir = typ === "eliksir";
    const ruchId = eliksir ? "uwarz-eliksir" : "rzuc-zaklecie";
    const tytul = `${t(eliksir ? "HOGWART.UI.BrewTitle" : "HOGWART.UI.CastTitle")} : ${nazwa}`;

    if (actor.system.stanNieprzytomny === true) {
        ui.notifications.warn(t("HOGWART.UI.Unconscious", { name: actor.name }));
        return;
    }

    let dodatek = opis ? `<em>${opis}</em>` : "";
    if (typ === "niewybaczalne") {
        dodatek += `<p style="color: #7a0303; margin: 4px 0 0 0;">💀 ${t("HOGWART.Legend.nieOpis2")}</p>`;
    }

    // Nieznane zaklęcie lub eliksir: trzeba zaznaczyć punkt Szczęścia
    if (!znane) {
        if (!wolnySzczescie(actor)) {
            ui.notifications.warn(t("HOGWART.UI.UnknownNoLuck", { spell: nazwa }));
            return;
        }
        const zgoda = await foundry.applications.api.DialogV2.confirm({
            window: { title: t("HOGWART.UI.UnknownTitle") },
            content: `<p>${t("HOGWART.UI.UnknownSpell", { name: actor.name, spell: nazwa })}</p>`,
            rejectClose: false
        });
        if (!zgoda) return;
        await zaznaczSzczescie(actor);
        dodatek += `<p style="margin: 4px 0 0 0;">🍀 ${t("HOGWART.UI.LuckForUnknown")}</p>`;
        return wykonajRzut(actor, { cecha: "magia", ruchId, tytul, dodatek });
    }

    // Zaklęcia z co najmniej dwóch lat wcześniej udają się bez rzutu (poza stresującą sytuacją)
    const rokPostaci = Number(actor.system.rokNauki) || 1;
    if (!eliksir && rok > 0 && rok <= rokPostaci - 2 && !wymusRzut) {
        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor }),
            content: `<div class="hogwart-move-result" style="border: 2px solid #27ae60; padding: 10px; border-radius: 5px;">
                <h3 style="margin: 0 0 6px 0;">${tytul}</h3>
                ${dodatek ? `<div style="font-size: 12px; margin-bottom: 6px;">${dodatek}</div>` : ""}
                <p style="margin: 0;">✨ ${t("HOGWART.UI.Mastered", { spell: nazwa })}</p>
            </div>`
        });
        return;
    }

    return wykonajRzut(actor, { cecha: "magia", ruchId, tytul, dodatek });
}


// --- Przedmioty magiczne ---

export async function uzyjPrzedmiotu(actor, item) {
    const opis = item.system?.opis || "";
    return wykonajRzut(actor, {
        cecha: "magia",
        ruchId: "uzyj-obiektu",
        tytul: `${t("MOVES.uzyj-obiektu.name")} : ${item.name}`,
        dodatek: opis ? `<em>${foundry.utils.escapeHTML ? foundry.utils.escapeHTML(opis) : opis}</em>` : ""
    });
}


// --- Quidditch ---

export async function rzutQuidditch(actor, ruchId) {
    const prefiks = ruchId === "zloty-znicz" ? "Snitch" : "Match";
    const wyborCechy = ["odwaga", "spryt", "intelekt", "lojalnosc"].map(cecha => ({
        cecha,
        etykieta: t(`HOGWART.Quidditch.${prefiks}.${cecha}`)
    }));
    return wykonajRzut(actor, { ruchId, wyborCechy });
}


// --- Opuszczenie historii ---

export function wszystkieStany(actor) {
    return STANY.every(k => actor.system[k] === true);
}

export async function rzutOpuszczenia(actor) {
    if (!wszystkieStany(actor)) {
        ui.notifications.warn(t("HOGWART.UI.ExitNotAll"));
        return;
    }

    let najlepsza = CECHY[0];
    for (const cecha of CECHY) {
        if ((Number(actor.system[cecha]) || 0) > (Number(actor.system[najlepsza]) || 0)) najlepsza = cecha;
    }
    const wartosc = Number(actor.system[najlepsza]) || 0;

    const roll = new Roll(`2d6 + ${wartosc}`);
    await roll.evaluate();

    let wynik;
    if (roll.total >= 10) {
        const zmiany = Object.fromEntries(STANY.map(k => [`system.${k}`, false]));
        zmiany["system.przekletyCecha"] = "";
        await actor.update(zmiany);
        wynik = `${t("HOGWART.Conditions.Result10")}<br>${t("HOGWART.UI.ScarReminder")}`;
    } else if (roll.total >= 7) {
        await actor.update({ "system.stanNieprzytomny": false });
        wynik = `${t("HOGWART.Conditions.Result79")}<br>${t("HOGWART.UI.ScarReminder")}`;
    } else {
        wynik = t("HOGWART.Conditions.Result6");
    }

    await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor }),
        flavor: `<h3 style="margin: 0 0 4px 0;">${t("HOGWART.UI.ExitTitle")}</h3>
            ${t("HOGWART.Roll.TraitRoll")} <strong>${pobierzNazweCechy(najlepsza).toUpperCase()}</strong>
            <div style="margin-top: 8px; font-size: 12px;">${wynik}</div>`
    });
}

// Wiadomość po zaznaczeniu ostatniego (8.) Stanu
export async function ogloszenieOpuszczenia(actor) {
    await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `<p>💀 <strong>${t("HOGWART.UI.ExitPrompt", { name: actor.name })}</strong></p>
            <button type="button" class="hg-opusc" data-actor-id="${actor.id}" style="width: 100%; cursor: pointer;">🎲 ${t("HOGWART.UI.ExitButton")}</button>`
    });
}
