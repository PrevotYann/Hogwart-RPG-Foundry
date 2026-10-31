
const RUCHY_CONFIG = {
    "stan-w-obliczu": { cecha: "odwaga" },
    "zdobadz-czego-szukasz": { cecha: ["odwaga", "spryt"] },
    "pomoz-lub-przeszkodz": { cecha: "lojalnosc" },
    "zbliz-sie-stworzenie": { cecha: "lojalnosc" },
    "ukryj-sie": { cecha: "spryt" },
    "zdobadz-wiedze": { cecha: "intelekt" },
    "rzuc-zaklecie": { cecha: "magia" },
    "pojedynek": { cecha: "magia" },
    "uwarz-eliksir": { cecha: "magia" },
    "uzyj-obiektu": { cecha: "magia" },
    // Ruchy Quidditcha - nie pojawiają się po zwykłym rzucie na cechę
    "mecz-quidditcha": { cecha: ["odwaga", "spryt", "intelekt", "lojalnosc"], quidditch: true },
    "zloty-znicz": { cecha: ["odwaga", "spryt", "intelekt", "lojalnosc"], quidditch: true }
};


const CECHY_MAP = {
    "odwaga": "Odwaga",
    "spryt": "Spryt",
    "lojalnosc": "Lojalnosc",
    "intelekt": "Intelekt",
    "magia": "Magia"
};

export const CECHY = Object.keys(CECHY_MAP);


export const BAZA_RUCHOW = new Proxy({}, {
    get(target, prop) {
        if (typeof prop !== "string" || !(prop in RUCHY_CONFIG)) return target[prop];
        const config = RUCHY_CONFIG[prop];
        return {
            cecha: config.cecha,
            quidditch: !!config.quidditch,
            nazwa: game.i18n.localize(`MOVES.${prop}.name`),
            sukces: game.i18n.localize(`MOVES.${prop}.success`),
            kompromis: game.i18n.localize(`MOVES.${prop}.compromise`),
            porazka: game.i18n.localize(`MOVES.${prop}.failure`)
        };
    },
    ownKeys() {
        return Object.keys(RUCHY_CONFIG);
    },
    getOwnPropertyDescriptor(target, prop) {
        if (prop in RUCHY_CONFIG) {
            return { enumerable: true, configurable: true };
        }
    }
});


export function pobierzNazweCechy(cechaKlucz) {
    const cecha = (cechaKlucz || "").toLowerCase().trim();
    const jsonKey = CECHY_MAP[cecha] || cecha;
    return game.i18n.localize(`HOGWART.Stats.${jsonKey}`);
}


export async function generujHtmlRuchow(actor, cechaKlucz, wynikRzutu) {
    const cecha = (cechaKlucz || "").toLowerCase().trim();

    const pasujaceRuchy = Object.entries(BAZA_RUCHOW).filter(([id, move]) => {
        if (move.quidditch) return false;
        if (Array.isArray(move.cecha)) {
            return move.cecha.includes(cecha);
        }
        return move.cecha === cecha;
    });

    if (pasujaceRuchy.length === 0) return "";

    const nazwaCechyPrzetlumaczona = pobierzNazweCechy(cecha).toUpperCase();
    const txtDostepneRuchy = game.i18n.localize("HOGWART.Roll.AvailableMoves");

    let html = `<div class="hogwart-moves-card" style="border: 1px solid #7a0303; padding: 8px; border-radius: 5px; background: rgba(0,0,0,0.05); margin-top: 10px;">`;
    html += `<h4 style="margin: 0 0 8px 0; text-align: center; border-bottom: 1px solid #7a0303; padding-bottom: 4px;">${txtDostepneRuchy} (${nazwaCechyPrzetlumaczona})</h4>`;

    pasujaceRuchy.forEach(([id, ruch]) => {
        html += `
            <div style="margin-bottom: 6px;">
                <button type="button" class="btn-moj-ruch" data-ruch-id="${id}" data-wynik="${wynikRzutu}" style="width: 100%; text-align: left; padding: 6px 8px; cursor: pointer; background: #2b2b2b; color: #fff; border: 1px solid #7a0303; border-radius: 3px; font-weight: bold;">
                    📖 ${ruch.nazwa}
                </button>
            </div>
        `;
    });

    html += `</div>`;

    return html;
}

// Wynik ruchu dla danego rezultatu (lub wszystkie trzy wyniki, gdy brak rezultatu)
export function wynikRuchuHtml(ruchId, wynikRzutu) {
    const ruch = BAZA_RUCHOW[ruchId];
    if (!ruch) return "";

    const total = Number(wynikRzutu);

    const txtSuccess = game.i18n.localize("HOGWART.Roll.Success");
    const txtPartial = game.i18n.localize("HOGWART.Roll.Partial");
    const txtFailure = game.i18n.localize("HOGWART.Roll.Failure");

    let html = `<div class="hogwart-move-result" style="border: 2px solid #7a0303; padding: 10px; border-radius: 5px; background: #fff; color: #111;">`;
    html += `<h3 style="margin: 0 0 8px 0; color: #7a0303; border-bottom: 1px solid #ccc; padding-bottom: 4px; text-align: center;">${ruch.nazwa}</h3>`;

    if (!isNaN(total)) {
        if (total >= 10) {
            html += `<div style="padding: 6px; background: rgba(39, 174, 96, 0.15); border-left: 4px solid #27ae60;">`;
            html += `<strong style="color: #27ae60;">${txtSuccess}:</strong><br><span style="font-size: 0.9em;">${ruch.sukces}</span>`;
            html += `</div>`;
        } else if (total >= 7) {
            html += `<div style="padding: 6px; background: rgba(211, 84, 0, 0.15); border-left: 4px solid #d35400;">`;
            html += `<strong style="color: #d35400;">${txtPartial}:</strong><br><span style="font-size: 0.9em;">${ruch.kompromis}</span>`;
            html += `</div>`;
        } else {
            html += `<div style="padding: 6px; background: rgba(192, 57, 43, 0.15); border-left: 4px solid #c0392b;">`;
            html += `<strong style="color: #c0392b;">${txtFailure}:</strong><br><span style="font-size: 0.9em;">${ruch.porazka}</span>`;
            html += `</div>`;
        }
    } else {
        html += `<div style="margin-bottom: 8px; padding: 6px; background: rgba(39, 174, 96, 0.15); border-left: 4px solid #27ae60;"><strong>${txtSuccess}:</strong><br><span style="font-size: 0.9em;">${ruch.sukces}</span></div>`;
        html += `<div style="margin-bottom: 8px; padding: 6px; background: rgba(211, 84, 0, 0.15); border-left: 4px solid #d35400;"><strong>${txtPartial}:</strong><br><span style="font-size: 0.9em;">${ruch.kompromis}</span></div>`;
        html += `<div style="padding: 6px; background: rgba(192, 57, 43, 0.15); border-left: 4px solid #c0392b;"><strong>${txtFailure}:</strong><br><span style="font-size: 0.9em;">${ruch.porazka}</span></div>`;
    }

    html += `</div>`;
    return html;
}

export async function wykonajRuch(ruchId, actorInput, wynikRzutu) {
    const html = wynikRuchuHtml(ruchId, wynikRzutu);
    if (!html) return;

    const actor = actorInput?.actor || actorInput;
    const speakerData = actor ? ChatMessage.getSpeaker({ actor: actor }) : ChatMessage.getSpeaker();

    await ChatMessage.create({
        speaker: speakerData,
        content: html
    });
}
