// Lista zaklęć z karty "Zaklęcia" (id = klucz w system.zaklecia)
// typ: urok | leczenie | klatwa | zly | obrona | eliksir | transmutacja | niewybaczalne
// inkantacja: domyślna inkantacja (może być nadpisana kluczem HOGWART.Incant.<id>)
// nazwa: klucz tłumaczenia nazwy (gdy brak inkantacji), opis: klucz tłumaczenia opisu
export const ZAKLECIA = [
    { id: "alohomora", rok: 1, typ: "urok", inkantacja: "Alohomora", opis: "HOGWART.Spells.Alohomora" },
    { id: "colovaria", rok: 1, typ: "urok", inkantacja: "Colovaria", opis: "HOGWART.Spells.Colovaria" },
    { id: "diminuendo", rok: 1, typ: "urok", inkantacja: "Diminuendo", opis: "HOGWART.Spells.Diminuendo" },
    { id: "lumos", rok: 1, typ: "urok", inkantacja: "Lumos", opis: "HOGWART.Spells.Lumos" },
    { id: "periculum", rok: 1, typ: "urok", inkantacja: "Periculum", opis: "HOGWART.Spells.Periculum" },
    { id: "spongify", rok: 1, typ: "urok", inkantacja: "Spongify", opis: "HOGWART.Spells.Spongify" },
    { id: "tergeo", rok: 1, typ: "urok", inkantacja: "Tergeo", opis: "HOGWART.Spells.Tergeo" },
    { id: "wingardium", rok: 1, typ: "urok", inkantacja: "Wingardium Leviosa", opis: "HOGWART.Spells.Wingardium" },
    { id: "calvario", rok: 1, typ: "klatwa", inkantacja: "Calvario", opis: "HOGWART.Spells.Calvario" },
    { id: "locomotor", rok: 1, typ: "klatwa", inkantacja: "Locomotor Mortis", opis: "HOGWART.Spells.Locomotor" },
    { id: "petrificus", rok: 1, typ: "klatwa", inkantacja: "Petrificus Totalus", opis: "HOGWART.Spells.Totalus" },
    { id: "slugulus", rok: 1, typ: "klatwa", inkantacja: "Slugulus Eructo", opis: "HOGWART.Spells.Slugulus" },
    { id: "finite", rok: 1, typ: "obrona", inkantacja: "Finite Incantatem", opis: "HOGWART.Spells.Finite" },
    { id: "ventus", rok: 1, typ: "zly", inkantacja: "Ventus", opis: "HOGWART.Spells.Ventus" },
    { id: "belkotliwy", rok: 1, typ: "eliksir", nazwa: "HOGWART.Spells.Belkotliwy" },
    { id: "napar", rok: 1, typ: "eliksir", nazwa: "HOGWART.Spells.Uspokajajacy" },
    { id: "kaszel", rok: 1, typ: "eliksir", nazwa: "HOGWART.Spells.Kaszel" },
    { id: "zmniejszajacy", rok: 1, typ: "eliksir", nazwa: "HOGWART.Spells.Zmniejszajacy" },

    { id: "epoximise", rok: 2, typ: "transmutacja", inkantacja: "Epoximise", opis: "HOGWART.Spells.Epoximise" },
    { id: "flagrate", rok: 2, typ: "transmutacja", inkantacja: "Flagrate", opis: "HOGWART.Spells.Flagrate" },
    { id: "fumos", rok: 2, typ: "transmutacja", inkantacja: "Fumos", opis: "HOGWART.Spells.Fumos" },
    { id: "incendio", rok: 2, typ: "transmutacja", inkantacja: "Incendio", opis: "HOGWART.Spells.Incendio" },
    { id: "serpensortia", rok: 2, typ: "transmutacja", inkantacja: "Serpensortia", opis: "HOGWART.Spells.Serpen" },
    { id: "expelliarmus", rok: 2, typ: "urok", inkantacja: "Expelliarmus", opis: "HOGWART.Spells.Expelliarmus" },
    { id: "obscuro", rok: 2, typ: "urok", inkantacja: "Obscuro", opis: "HOGWART.Spells.Obscuro" },
    { id: "reparo", rok: 2, typ: "urok", inkantacja: "Reparo", opis: "HOGWART.Spells.Reparo" },
    { id: "mucus", rok: 2, typ: "klatwa", inkantacja: "Mucus ad Nauseam", opis: "HOGWART.Spells.Mucus" },
    { id: "protego", rok: 2, typ: "obrona", inkantacja: "Protego", opis: "HOGWART.Spells.Protego" },
    { id: "rictusempra", rok: 2, typ: "zly", inkantacja: "Rictusempra", opis: "HOGWART.Spells.Rictu" },
    { id: "steleus", rok: 2, typ: "zly", inkantacja: "Steleus", opis: "HOGWART.Spells.Steleus" },
    { id: "titillando", rok: 2, typ: "zly", inkantacja: "Titillando", opis: "HOGWART.Spells.Titi" },
    { id: "postarzajacy", rok: 2, typ: "eliksir", nazwa: "HOGWART.Spells.Postarzajacy" },
    { id: "upiekszajacy", rok: 2, typ: "eliksir", nazwa: "HOGWART.Spells.Beati" },
    { id: "czkawka", rok: 2, typ: "eliksir", nazwa: "HOGWART.Spells.Czkawka" },
    { id: "mandragory", rok: 2, typ: "eliksir", nazwa: "HOGWART.Spells.Mandragor1", opis: "HOGWART.Spells.Mandragor2" },
    { id: "szczuroszczet", rok: 2, typ: "eliksir", nazwa: "HOGWART.Spells.Szczur1", opis: "HOGWART.Spells.Szczur2" },

    { id: "anteoculatia", rok: 3, typ: "zly", inkantacja: "Anteoculatia", opis: "HOGWART.Spells.Anteoculatia" },
    { id: "colloshoo", rok: 3, typ: "zly", inkantacja: "Colloshoo", opis: "HOGWART.Spells.Colloshoo" },
    { id: "engorgio", rok: 3, typ: "zly", inkantacja: "Engorgio", opis: "HOGWART.Spells.Engorgio" },
    { id: "tarantallegra", rok: 3, typ: "zly", inkantacja: "Tarantallegra", opis: "HOGWART.Spells.Tarantallegra" },
    { id: "ferula", rok: 3, typ: "leczenie", inkantacja: "Ferula", opis: "HOGWART.Spells.Ferula" },
    { id: "herbivicus", rok: 3, typ: "urok", inkantacja: "Herbivicus", opis: "HOGWART.Spells.Herbivicus" },
    { id: "illegibilus", rok: 3, typ: "urok", inkantacja: "Illegibilus", opis: "HOGWART.Spells.Illegibilus" },
    { id: "impervius", rok: 3, typ: "urok", inkantacja: "Impervius", opis: "HOGWART.Spells.Impervius" },
    { id: "priorincantato", rok: 3, typ: "urok", inkantacja: "Prior Incantato", opis: "HOGWART.Spells.Prior_Incantato" },
    { id: "mimblewimble", rok: 3, typ: "klatwa", inkantacja: "Mimble Wimble", opis: "HOGWART.Spells.Mimble_Wimble" },
    { id: "orchideous", rok: 3, typ: "transmutacja", inkantacja: "Orchideous", opis: "HOGWART.Spells.Orchideous" },
    { id: "reparifarge", rok: 3, typ: "transmutacja", inkantacja: "Reparifarge", opis: "HOGWART.Spells.Reparifarge" },
    { id: "riddikulus", rok: 3, typ: "obrona", inkantacja: "Riddikulus", opis: "HOGWART.Spells.Riddikulus" },
    { id: "wywardekompresyjny", rok: 3, typ: "eliksir", nazwa: "HOGWART.Spells.dekompresyjny" },
    { id: "eliksirpieprzowy", rok: 3, typ: "eliksir", nazwa: "HOGWART.Spells.pieprzowy1", opis: "HOGWART.Spells.pieprzowy2" },
    { id: "olejekobludy", rok: 3, typ: "eliksir", nazwa: "HOGWART.Spells.Grzegorz", opis: "HOGWART.Spells.Grzegorz2" },
    { id: "eliksirslodkiegosnu", rok: 3, typ: "eliksir", nazwa: "HOGWART.Spells.snu" },
    { id: "eliksirrozdymajacy", rok: 3, typ: "eliksir", nazwa: "HOGWART.Spells.rozdymajacy" },

    { id: "accio", rok: 4, typ: "urok", inkantacja: "Accio", opis: "HOGWART.Spells.Accio" },
    { id: "depulso", rok: 4, typ: "urok", inkantacja: "Depulso", opis: "HOGWART.Spells.Depulso" },
    { id: "diffindo", rok: 4, typ: "urok", inkantacja: "Diffindo", opis: "HOGWART.Spells.Diffindo" },
    { id: "quietus", rok: 4, typ: "urok", inkantacja: "Quietus", opis: "HOGWART.Spells.Quietus" },
    { id: "sonorus", rok: 4, typ: "urok", inkantacja: "Sonorus", opis: "HOGWART.Spells.Sonorus" },
    { id: "dretwota", rok: 4, typ: "urok", nazwa: "HOGWART.Spells.Stupity1", opis: "HOGWART.Spells.Stupity2" },
    { id: "avis", rok: 4, typ: "transmutacja", inkantacja: "Avis", opis: "HOGWART.Spells.Avis" },
    { id: "incaercerous", rok: 4, typ: "transmutacja", inkantacja: "Incaercerous", opis: "HOGWART.Spells.Incaercerous" },
    { id: "densaugeo", rok: 4, typ: "zly", inkantacja: "Densaugeo", opis: "HOGWART.Spells.Densaugeo" },
    { id: "furnunculus", rok: 4, typ: "zly", inkantacja: "Furnunculus", opis: "HOGWART.Spells.Furnunculus" },
    { id: "impedimenta", rok: 4, typ: "zly", inkantacja: "Impedimenta", opis: "HOGWART.Spells.Impedimenta" },
    { id: "locomotorwibbly", rok: 4, typ: "zly", inkantacja: "Locomotor Wibbly", opis: "HOGWART.Spells.Wibbly" },
    { id: "episkey", rok: 4, typ: "leczenie", inkantacja: "Episkey", opis: "HOGWART.Spells.Episkey" },
    { id: "reducto", rok: 4, typ: "klatwa", inkantacja: "Reducto", opis: "HOGWART.Spells.Reducto" },
    { id: "blemishblitzer", rok: 4, typ: "eliksir", inkantacja: "Blemish Blitzer", opis: "HOGWART.Spells.Blemish" },
    { id: "ochronaognia", rok: 4, typ: "eliksir", nazwa: "HOGWART.Spells.FireProtection" },
    { id: "przeczyszczajacy", rok: 4, typ: "eliksir", nazwa: "HOGWART.Spells.ClearPotion" },
    { id: "pobudzajacy", rok: 4, typ: "eliksir", nazwa: "HOGWART.Spells.Pobudza" },

    { id: "anapneo", rok: 5, typ: "leczenie", inkantacja: "Anapneo", opis: "HOGWART.Spells.Anapneo" },
    { id: "vulnerasanentur", rok: 5, typ: "leczenie", inkantacja: "Vulnera Sanentur", opis: "HOGWART.Spells.Sanentur" },
    { id: "aperio", rok: 5, typ: "urok", inkantacja: "Aperio", opis: "HOGWART.Spells.Aperio" },
    { id: "colloportus", rok: 5, typ: "urok", inkantacja: "Colloportus", opis: "HOGWART.Spells.Colloportus" },
    { id: "expectopatronum", rok: 5, typ: "urok", inkantacja: "Expecto Patronum", opis: "HOGWART.Spells.Patronum" },
    { id: "repellomuggletum", rok: 5, typ: "urok", inkantacja: "Repello Muggletum", opis: "HOGWART.Spells.Muggletum" },
    { id: "silencio", rok: 5, typ: "urok", inkantacja: "Silencio", opis: "HOGWART.Spells.Silencio" },
    { id: "specialisrevelio", rok: 5, typ: "urok", inkantacja: "Specialis Revelio", opis: "HOGWART.Spells.Specialis" },
    { id: "cantis", rok: 5, typ: "zly", inkantacja: "Cantis", opis: "HOGWART.Spells.Cantis" },
    { id: "oppugno", rok: 5, typ: "zly", inkantacja: "Oppugno", opis: "HOGWART.Spells.Oppugno" },
    { id: "relashio", rok: 5, typ: "zly", inkantacja: "Relashio", opis: "HOGWART.Spells.Relashio" },
    { id: "evanesco", rok: 5, typ: "transmutacja", inkantacja: "Evanesco", opis: "HOGWART.Spells.Evanesco" },
    { id: "protegototalum", rok: 5, typ: "obrona", inkantacja: "Protego Totalum", opis: "HOGWART.Spells.Totalum" },
    { id: "amortencja", rok: 5, typ: "eliksir", nazwa: "HOGWART.Spells.Amortencja1", opis: "HOGWART.Spells.Amortencja2" },
    { id: "zaciemniajacyumysl", rok: 5, typ: "eliksir", nazwa: "HOGWART.Spells.zaciemniajacy" },
    { id: "esencjadyptamu", rok: 5, typ: "eliksir", nazwa: "HOGWART.Spells.dyptamu1", opis: "HOGWART.Spells.dyptamu2" },
    { id: "antidotumamortencja", rok: 5, typ: "eliksir", nazwa: "HOGWART.Spells.AntidotumA" },
    { id: "wyostrzajacyhumor", rok: 5, typ: "eliksir", nazwa: "HOGWART.Spells.humoru" },

    { id: "aguamenti", rok: 6, typ: "transmutacja", inkantacja: "Aguamenti", opis: "HOGWART.Spells.Aguamenti" },
    { id: "aportacja", rok: 6, typ: "transmutacja", nazwa: "HOGWART.Spells.Aportacja1", opis: "HOGWART.Spells.Aportacja2" },
    { id: "confundo", rok: 6, typ: "urok", inkantacja: "Confundo", opis: "HOGWART.Spells.Confundo" },
    { id: "deprimo", rok: 6, typ: "urok", inkantacja: "Deprimo", opis: "HOGWART.Spells.Deprimo" },
    { id: "muffliato", rok: 6, typ: "urok", inkantacja: "Muffliato", opis: "HOGWART.Spells.Muffliato" },
    { id: "revelio", rok: 6, typ: "urok", inkantacja: "Revelio", opis: "HOGWART.Spells.Revelio" },
    { id: "ebublio", rok: 6, typ: "zly", inkantacja: "Ebublio", opis: "HOGWART.Spells.Ebublio" },
    { id: "flipendo", rok: 6, typ: "zly", inkantacja: "Flipendo", opis: "HOGWART.Spells.Flipendo" },
    { id: "jezlep", rok: 6, typ: "zly", nazwa: "HOGWART.Spells.Jezlep1", opis: "HOGWART.Spells.Jezlep2" },
    { id: "melofors", rok: 6, typ: "zly", inkantacja: "Melofors", opis: "HOGWART.Spells.Melofors" },
    { id: "pullus", rok: 6, typ: "zly", inkantacja: "Pullus", opis: "HOGWART.Spells.Pullus" },
    { id: "emendo", rok: 6, typ: "leczenie", inkantacja: "Emendo", opis: "HOGWART.Spells.Emendo" },
    { id: "gemino", rok: 6, typ: "klatwa", inkantacja: "Gemino", opis: "HOGWART.Spells.Gemino" },
    { id: "zywejsmierci", rok: 6, typ: "eliksir", nazwa: "HOGWART.Spells.smierci" },
    { id: "duszacygaz", rok: 6, typ: "eliksir", nazwa: "HOGWART.Spells.gaz1", opis: "HOGWART.Spells.gaz2" },
    { id: "dodajacywigoru", rok: 6, typ: "eliksir", nazwa: "HOGWART.Spells.wigor" },
    { id: "veritaserum", rok: 6, typ: "eliksir", inkantacja: "Veritaserum", opis: "HOGWART.Spells.Veritaserum" },
    { id: "antidotumveritaserum", rok: 6, typ: "eliksir", nazwa: "HOGWART.Spells.Antidotum" },

    { id: "baubillious", rok: 7, typ: "transmutacja", inkantacja: "Baubillious", opis: "HOGWART.Spells.Baubillious" },
    { id: "confrigo", rok: 7, typ: "klatwa", inkantacja: "Confringo", opis: "HOGWART.Spells.Confringo" },
    { id: "duro", rok: 7, typ: "urok", inkantacja: "Duro", opis: "HOGWART.Spells.Duro" },
    { id: "homenumrevelio", rok: 7, typ: "urok", inkantacja: "Homenum Revelio", opis: "HOGWART.Spells.Homenum" },
    { id: "legillimens", rok: 7, typ: "urok", inkantacja: "Legilimens", opis: "HOGWART.Spells.Legilimens" },
    { id: "obliviate", rok: 7, typ: "urok", inkantacja: "Obliviate", opis: "HOGWART.Spells.Obliviate" },
    { id: "portus", rok: 7, typ: "urok", inkantacja: "Portus", opis: "HOGWART.Spells.Portus" },
    { id: "fiantoduri", rok: 7, typ: "obrona", inkantacja: "Fianto Duri", opis: "HOGWART.Spells.Duri" },
    { id: "levicorpus", rok: 7, typ: "zly", inkantacja: "Levicorpus", opis: "HOGWART.Spells.Levicorpus" },
    { id: "mutatio", rok: 7, typ: "zly", inkantacja: "Mutatio", opis: "HOGWART.Spells.Mutatio" },
    { id: "redactum", rok: 7, typ: "zly", inkantacja: "Redactum", opis: "HOGWART.Spells.Redactum" },
    { id: "vermiculus", rok: 7, typ: "zly", inkantacja: "Vermiculus", opis: "HOGWART.Spells.Vermiculus" },
    { id: "uzupelniajacykrew", rok: 7, typ: "eliksir", nazwa: "HOGWART.Spells.krew" },
    { id: "wzbudzajacye", rok: 7, typ: "eliksir", nazwa: "HOGWART.Spells.euforia" },
    { id: "felixfelicis", rok: 7, typ: "eliksir", inkantacja: "Felix Felicis", opis: "HOGWART.Spells.Felicis" },
    { id: "zanikpamieci", rok: 7, typ: "eliksir", nazwa: "HOGWART.Spells.zanik" },
    { id: "wielosokowy", rok: 7, typ: "eliksir", nazwa: "HOGWART.Spells.wielosokowy1", opis: "HOGWART.Spells.wielosokowy2" },
    { id: "szkielewzro", rok: 7, typ: "eliksir", nazwa: "HOGWART.Spells.Szkiele-Wzro1", opis: "HOGWART.Spells.Szkiele-Wzro2" },

    { id: "avadakedavra", rok: 0, typ: "niewybaczalne", inkantacja: "Avada Kedavra", opis: "HOGWART.Legend.avada" },
    { id: "cruciatus", rok: 0, typ: "niewybaczalne", nazwa: "HOGWART.Legend.crucio2", opis: "HOGWART.Legend.crucio" },
    { id: "imperio", rok: 0, typ: "niewybaczalne", inkantacja: "Imperio", opis: "HOGWART.Legend.Imperio" }
];

export const TYPY_ZAKLEC = {
    urok: { ikona: "fa-star-of-life", klasa: "ikona-urok", etykieta: "HOGWART.Legend.Uroki" },
    leczenie: { ikona: "fa-heart", klasa: "ikona-leczenie", etykieta: "HOGWART.Legend.Leczenie" },
    klatwa: { ikona: "fa-bolt", klasa: "ikona-klatwa", etykieta: "HOGWART.Legend.Curse" },
    zly: { ikona: "fa-bahai", klasa: "ikona-zly-urok", etykieta: "HOGWART.Legend.BadUroki" },
    obrona: { ikona: "fa-shield-alt", klasa: "ikona-obrona", etykieta: "HOGWART.Legend.Obrona" },
    eliksir: { ikona: "fa-flask", klasa: "ikona-eliksir", etykieta: "HOGWART.Legend.Eliksiry" },
    transmutacja: { ikona: "fa-wine-glass", klasa: "ikona-transmutacja", etykieta: "HOGWART.Legend.Transmutacja" },
    niewybaczalne: { ikona: "fa-skull", klasa: "ikona-niewybaczalne", etykieta: "HOGWART.Legend.Niewybaczalne" }
};

export function pobierzZaklecie(id) {
    return ZAKLECIA.find(z => z.id === id);
}

// Nazwa wyświetlana zaklęcia (inkantacja lub przetłumaczona nazwa eliksiru)
export function nazwaZaklecia(zaklecie) {
    const kluczInkantacji = `HOGWART.Incant.${zaklecie.id}`;
    if (game.i18n.has(kluczInkantacji)) return game.i18n.localize(kluczInkantacji);
    if (zaklecie.inkantacja) return zaklecie.inkantacja;
    return game.i18n.localize(zaklecie.nazwa);
}

export function opisZaklecia(zaklecie) {
    return zaklecie.opis ? game.i18n.localize(zaklecie.opis) : "";
}

// Dane do szablonu karty: lata 1-7 + zaklęcia niewybaczalne
export function przygotujZaklecia(znane = {}) {
    const lata = [];
    for (let rok = 1; rok <= 7; rok++) {
        lata.push({
            rok,
            tytul: game.i18n.localize(`HOGWART.Spells.${rok}Year`),
            zaklecia: ZAKLECIA.filter(z => z.rok === rok).map(z => przygotujWpis(z, znane))
        });
    }
    const niewybaczalne = ZAKLECIA.filter(z => z.rok === 0).map(z => przygotujWpis(z, znane));
    return { lata, niewybaczalne };
}

function przygotujWpis(zaklecie, znane) {
    const typ = TYPY_ZAKLEC[zaklecie.typ];
    return {
        id: zaklecie.id,
        znane: !!znane[zaklecie.id],
        nazwa: nazwaZaklecia(zaklecie),
        opis: opisZaklecia(zaklecie),
        ikona: typ.ikona,
        klasa: typ.klasa,
        etykieta: game.i18n.localize(typ.etykieta)
    };
}
