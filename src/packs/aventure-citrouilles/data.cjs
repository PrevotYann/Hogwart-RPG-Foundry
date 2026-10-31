/**
 * Données de l'aventure « Les Citrouilles qui murmuraient ».
 * Compilées dans le compendium Adventure par tools/build-packs.cjs.
 *
 * Références symboliques (résolues en @UUID stables à la compilation) :
 *   @Actor[cle]{Libellé}  @Item[cle]{…}  @Scene[cle]{…}  @RollTable[cle]{…}
 *   @Page[journal/Nom de la page]{…}
 */
const ART = "systems/systemHogwartRPG/assets/aventure-citrouilles";

// -------------------------------------------------------------- Aventure

const adventure = {
  name: "Les Citrouilles qui murmuraient",
  img: `${ART}/couverture.jpg`,
  caption: "Une aventure courte pour Hogwarts : Le JDR — 2 à 5 joueurs, 3 à 4 heures",
  description: `<p><strong>C’est le soir d’Halloween à Poudlard.</strong> Les citrouilles géantes qui décorent la Grande Salle se sont mises à murmurer… et ce qu’elles chuchotent, ce sont vos secrets. Pendant ce temps, Ambroise Tisserand, un discret Poufsouffle de 2e année, n’est pas venu au banquet. Il reste quelques heures avant minuit pour découvrir ce qui pousse dans la serre condamnée n°7.</p>
<p>Ce module contient :</p>
<ul>
<li>le <strong>Guide de la Narratrice</strong> (synopsis, horloge de minuit, 4 scènes, dénouements, Menaces et Mystères) ;</li>
<li>les <strong>Aides de jeu</strong> à montrer aux joueurs (carnet, extrait de livre, messages du fantôme…) ;</li>
<li><strong>4 Personnages Principaux pré-tirés</strong> de 3e année, prêts à jouer ;</li>
<li><strong>6 Personnages de la Narratrice</strong> et <strong>4 créatures</strong>, avec leurs Actions de Narratrice ;</li>
<li>des <strong>Notes de la Narratrice</strong> déjà remplies (Mystères, Personnages, Menaces) ;</li>
<li><strong>4 scènes</strong> (parc, Grande Salle, Réserve, serre n°7), <strong>3 tables aléatoires</strong>, <strong>8 objets, sorts et potions</strong> et une macro.</li>
</ul>
<p><em>Illustrations originales générées par IA : cartes sans texte, portraits et objets dans un style peint.</em></p>
<p style="font-size: 0.85em">Aventure originale pour <em>Hogwarts : Le JDR</em>, d’après le jeu de David Brunell-Brutman et sa traduction française. Contenu sous licence CC BY-NC-SA 4.0 ; œuvre de fan non commerciale, ni autorisée ni approuvée par J.K. Rowling ou Warner Bros.</p>`
};

// -------------------------------------------------------------- Dossiers

const folders = [
  { key: "f-actors", name: "Les Citrouilles qui murmuraient", type: "Actor", color: "#d9701e" },
  { key: "f-pj", name: "Personnages principaux (pré-tirés)", type: "Actor", parent: "f-actors" },
  { key: "f-pnj", name: "Personnages de la Narratrice", type: "Actor", parent: "f-actors" },
  { key: "f-creatures", name: "Créatures", type: "Actor", parent: "f-actors" },
  { key: "f-items", name: "Les Citrouilles qui murmuraient", type: "Item", color: "#d9701e" },
  { key: "f-journal", name: "Les Citrouilles qui murmuraient", type: "JournalEntry", color: "#d9701e" },
  { key: "f-scenes", name: "Les Citrouilles qui murmuraient", type: "Scene", color: "#d9701e" },
  { key: "f-tables", name: "Les Citrouilles qui murmuraient", type: "RollTable", color: "#d9701e" },
  { key: "f-macros", name: "Les Citrouilles qui murmuraient", type: "Macro", color: "#d9701e" }
];

// -------------------------------------------------------------- Objets, sorts, potions

const items = [
  {
    key: "carnet", name: "Carnet d’Ambroise", type: "przedmiot", img: `${ART}/icons/carnet-ambroise.png`,
    opis: "Un petit carnet jaune et noir, couvert de croquis de plantes. Les dernières pages parlent de « la dame de la serre sept » qui l’écoute et l’appelle par son nom. (Voir l’aide de jeu « Le carnet d’Ambroise ».) Ce n’est pas un objet magique : il ne nécessite aucun jet."
  },
  {
    key: "flore", name: "Flore des Murmures (livre de la Réserve)", type: "przedmiot", img: `${ART}/icons/flore-des-murmures.png`,
    opis: "Un vieux traité de botanique enchaîné dans la Réserve de la bibliothèque. Quand on l’ouvre, ses pages bruissent comme des feuilles. Il décrit la Murmurelle, le sortilège Vox Reddita et la recette du Philtre de Rossignol. Lire le livre ne demande pas de jet ; l’utiliser comme objet magique (ex. : lui demander de s’ouvrir à la bonne page dans le noir) demande un jet + Magie."
  },
  {
    key: "graine", name: "Graine de Murmurelle", type: "przedmiot", img: `${ART}/icons/graine-murmurelle.png`,
    opis: "Une graine brune veinée de violet, tiède au toucher. Si on la tient près de l’oreille, on entend sa propre voix chuchoter. Hortense Valériane en a acheté trois dans l’Allée des Embrumes ; il lui en reste deux dans une boîte en fer, sur son établi. Utilisée comme objet magique, elle peut répéter la dernière phrase prononcée à côté d’elle."
  },
  {
    key: "lanterne", name: "Lanterne-citrouille ensorcelée", type: "przedmiot", img: `${ART}/icons/lanterne-citrouille.png`,
    opis: "Une petite citrouille évidée, enchantée pour briller d’une lumière dorée qui ne s’éteint jamais (sauf si on lui dit « bonne nuit »). Le professeur Pommeroy en confie une à chaque élève qui aide à décorer la Grande Salle. Sa lumière fait reculer les vrilles de la Murmurelle."
  },
  {
    key: "gants", name: "Gants en peau de dragon d’Hortense", type: "przedmiot", img: `${ART}/icons/gants-hortense.png`,
    opis: "Des gants de jardinage verts, tachés de pollen violet. Qui les porte peut saisir une vrille ou une plante dangereuse sans subir l’État Blessé·e (sur 7-9 en Faisant face au danger, la menace ne te blesse pas au contact)."
  },
  {
    key: "vox", name: "Vox Reddita – Sortilège de la Voix rendue", type: "zaklecie", rok: 3, typ: "urok", img: `${ART}/icons/vox-reddita.png`,
    opis: "Un ancien enchantement décrit dans la Flore des Murmures. Il rend sa voix à qui l’a perdue, qu’elle ait été volée par une créature, un maléfice ou une potion. Lancé sur la Murmurelle, il libère toutes les voix qu’elle a prises. On l’apprend en lisant le livre (aucun jet), puis on le lance normalement (jet + Magie)."
  },
  {
    key: "rossignol", name: "Philtre de Rossignol", type: "zaklecie", rok: 3, typ: "eliksir", img: `${ART}/icons/philtre-rossignol.png`,
    opis: "Une potion violette qui sent le miel. Qui la boit ne peut pas perdre sa voix jusqu’au lever du soleil, et n’est pas Effrayé·e par le chant de la Murmurelle. Ingrédients : une plume de Jobberknoll, une cuillère de miel de la Cuisine, trois gouttes de rosée de citrouille. La recette est dans la Flore des Murmures ; on la prépare avec l’Action « Préparer une potion »."
  },
  {
    key: "lumos-solem", name: "Lumos Solem – Sortilège de Lumière solaire", type: "zaklecie", rok: 3, typ: "urok", img: `${ART}/icons/lumos-solem.png`,
    opis: "Une variante de Lumos qui projette un rayon de vraie lumière du jour. La Flore des Murmures précise que la Murmurelle « se referme sous le soleil ». On peut l’apprendre auprès d’un élève plus âgé, d’un professeur ou du livre."
  }
];

// -------------------------------------------------------------- Personnages principaux (pré-tirés)

const SORTS_1_2 = "rok<=2"; // le compilateur coche tous les sorts de 1re et 2e année

const pregens = [
  {
    key: "leonie", name: "Léonie Barbefeu", token: "leonie-barbefeu",
    system: {
      dom: "gryffindor", rokNauki: "3", czystoscKrwi: "mugolak",
      odwaga: 3, intelekt: 1, lojalnosc: 1, spryt: -1, magia: 0,
      cera: "Taches de rousseur", wlosy: "Roux", budowa: "Petite",
      ambicja: "Amusement", rozdzkaDrewno: "Épicéa", rozdzkaWyglad: "Ornée", rozdzkaRdzen: "Plume de phénix",
      ulubionyPrzedmiot1: "Défense contre les Forces du Mal",
      zwierzakGatunek: "Chat", zwierzakImie: "Biscotte",
      przyjaciel1: "Capucine Ashby", przyjaciel2: "", rywal: "Évariste Corbin",
      pd1: true, pd2: true, pd3: true,
      biografia: "Fille de deux dentistes de Brighton, Léonie a découvert la magie en faisant léviter le chat du voisin. Elle fonce d’abord, réfléchit ensuite, et rit très fort quand elle a peur.\n\nSecret possible : elle a peur du noir et dort avec une veilleuse moldue cachée sous son oreiller.\n\nSorts de 3e année : Riddikulus.",
      zaklecia: [SORTS_1_2, "riddikulus"]
    },
    items: [{ name: "Boules puantes", img: "icons/consumables/potions/bottle-bulb-corked-green.webp", opis: "De petites boules à l’odeur pestilentielle." }]
  },
  {
    key: "tobias", name: "Tobias Plumerai", token: "tobias-plumerai",
    system: {
      dom: "ravenclaw", rokNauki: "3", czystoscKrwi: "polkrwi",
      odwaga: -1, intelekt: 3, lojalnosc: 0, spryt: 1, magia: 1,
      cera: "Mate", wlosy: "Noirs", budowa: "Mince",
      ambicja: "Connaissance", rozdzkaDrewno: "Noyer", rozdzkaWyglad: "Longue", rozdzkaRdzen: "Crin de licorne",
      ulubionyPrzedmiot1: "Botanique",
      zwierzakGatunek: "Chouette", zwierzakImie: "Socrate",
      przyjaciel1: "Évariste Corbin", przyjaciel2: "", rywal: "Léonie Barbefeu",
      pd1: true, pd2: true,
      biografia: "Fils d’une herboriste sorcière et d’un professeur de mathématiques moldu, Tobias a lu tous les livres de Botanique de la bibliothèque… sauf ceux de la Réserve. Il prend des notes sur tout, y compris sur ses amis.\n\nSecret possible : il a déjà « emprunté » la carte de bibliothèque d’un élève de 5e année pour entrer dans la Réserve, et il s’est fait peur.\n\nSorts de 3e année : Herbivicus, Prior Incantato.",
      zaklecia: [SORTS_1_2, "herbivicus", "priorincantato"]
    },
    items: [{ name: "Rapeltout", img: "icons/commodities/gems/pearl-blue-gold.webp", opis: "Une petite boule de verre qui se remplit de fumée rouge quand on a oublié quelque chose." }]
  },
  {
    key: "capucine", name: "Capucine Ashby", token: "capucine-ashby",
    system: {
      dom: "hufflepuff", rokNauki: "3", czystoscKrwi: "polkrwi",
      odwaga: 1, intelekt: 0, lojalnosc: 2, spryt: -1, magia: 2,
      cera: "Foncée", wlosy: "Châtains", budowa: "Robuste",
      ambicja: "Amitié", rozdzkaDrewno: "Cèdre", rozdzkaWyglad: "Ordinaire", rozdzkaRdzen: "Ventricule de dragon",
      ulubionyPrzedmiot1: "Soins aux Créatures Magiques",
      zwierzakGatunek: "Rat", zwierzakImie: "Navet",
      przyjaciel1: "Léonie Barbefeu", przyjaciel2: "Ambroise Tisserand", rywal: "Octavie Marbrenoire",
      pd1: true, pd2: true,
      biografia: "Capucine a toujours un biscuit dans la poche pour un animal ou un élève triste. C’est elle qui a pris le petit Ambroise sous son aile à la rentrée, même si elle l’a un peu délaissé ces dernières semaines.\n\nSecret possible : elle a oublié l’anniversaire d’Ambroise la semaine dernière, et elle s’en veut terriblement.\n\nSorts de 3e année : Ferula, Impervius.",
      zaklecia: [SORTS_1_2, "ferula", "impervius"]
    },
    items: [{ name: "Chandelle éternelle", img: "icons/sundries/lights/candle-unlit-white.webp", opis: "Une bougie enchantée qui brûle indéfiniment." }]
  },
  {
    key: "evariste", name: "Évariste Corbin", token: "evariste-corbin",
    system: {
      dom: "slytherin", rokNauki: "3", czystoscKrwi: "czysta",
      odwaga: 0, intelekt: 1, lojalnosc: -1, spryt: 3, magia: 1,
      cera: "Pâle", wlosy: "Blonds", budowa: "Grande",
      ambicja: "Pouvoir", rozdzkaDrewno: "If", rozdzkaWyglad: "D’occasion", rozdzkaRdzen: "Ventricule de dragon",
      ulubionyPrzedmiot1: "Potions",
      zwierzakGatunek: "", zwierzakImie: "",
      przyjaciel1: "Tobias Plumerai", przyjaciel2: "", rywal: "Léonie Barbefeu",
      pd1: true,
      biografia: "Héritier d’une vieille famille de sang-pur ruinée, Évariste porte la baguette usée de son grand-oncle et un sourire qui cache tout. Il veut devenir le plus grand maître des potions de sa génération, et il ne supporte pas qu’on le prenne pour un gentil.\n\nSecret possible : sa famille n’a plus un Gallion ; ses belles robes sont des robes d’occasion retouchées par sa mère.\n\nSorts de 3e année : Mimble Wimble (Mutismus), Engorgio, Somnifère.",
      zaklecia: [SORTS_1_2, "mimblewimble", "engorgio", "eliksirslodkiegosnu"]
    },
    items: [{ name: "Plume à Papote", img: "icons/sundries/documents/document-letter-tan.webp", opis: "Une plume qui écrit automatiquement ce qui est dit en sa présence." }]
  }
];

// -------------------------------------------------------------- Personnages de la Narratrice

const npcs = [
  {
    key: "ambroise", name: "Ambroise Tisserand", token: "ambroise-tisserand",
    system: {
      rodzaj: "uczen", dom: "hufflepuff", rola: "L’élève disparu (2e année)", cecha: "Chuchote, rougit, parle aux plantes",
      opis: `<p>Petit, roux, toujours un peu de terre sous les ongles. Ambroise est le genre d’élève que personne ne remarque, ce qui lui convient… presque. Il passe ses soirées seul près des serres et confie ses pensées aux plantes, qui « au moins, ne se moquent pas ».</p>
<p>Depuis deux semaines, il rend visite chaque soir à la Murmurelle de la serre n°7, qui lui répond avec sa propre voix. Hier soir, elle lui a pris sa voix… puis tout le reste : il dort maintenant dans le cœur de la @Actor[mere]{Citrouille-Mère}.</p>`,
      ruchy: `<ul>
<li>Sa voix, faible et lointaine, sort d’une citrouille : « J’ai froid… serre sept… »</li>
<li>Une fois libéré : il ne peut que chuchoter ou écrire, jusqu’à ce qu’on lui rende sa voix (Vox Reddita, ou la mort de la Murmurelle).</li>
<li>Il défend la plante : « Elle est seule, comme moi. Ne lui faites pas de mal ! »</li>
<li>Il se cache derrière un Personnage Principal qu’il aime bien et refuse de bouger.</li>
</ul>`,
      sekret: `<p>Ambroise s’écrit à lui-même des lettres qu’il signe de faux noms, pour faire croire à ses camarades de dortoir qu’il a beaucoup d’amis. La Murmurelle connaît ce secret ; les citrouilles le répètent pendant le banquet.</p>`
    }
  },
  {
    key: "hortense", name: "Hortense Valériane", token: "hortense-valeriane",
    system: {
      rodzaj: "nauczyciel", dom: "", rola: "Nouvelle assistante en Botanique", cecha: "Parle très vite, rit nerveusement, toujours gantée",
      opis: `<p>Jeune sorcière enthousiaste, arrivée à la rentrée pour seconder le professeur de Botanique. Elle a les joues roses, les cheveux pleins de feuilles et des gants verts tachés de pollen violet. Elle rêve de la Médaille Verte de la Société Botanique de Grande-Bretagne.</p>
<p>Elle a planté une graine de Murmurelle, une espèce que l’on croyait éteinte, dans la serre n°7 condamnée, en espérant la présenter au concours. Elle ne sait pas que la plante a déjà avalé la voix d’un élève.</p>`,
      ruchy: `<ul>
<li>Change de sujet en parlant (très vite) d’engrais à la bouse de dragon.</li>
<li>Ment pour couvrir son secret : « La serre sept ? Condamnée depuis 1890, voyons ! »</li>
<li>Leur donne des devoirs supplémentaires : « Trente centimètres de parchemin sur la Mandragore ! »</li>
<li>Craque si on la met face aux preuves, et propose son aide (et ses @Item[gants]{gants en peau de dragon}).</li>
</ul>`,
      sekret: `<p>Elle a acheté trois graines de Murmurelle à Mme Ronceneuve, une marchande de l’Allée des Embrumes, avec l’argent de ses économies. Il lui en reste deux, dans une boîte en fer sur son établi de la serre n°7. Elle a jeté un sortilège de Verrouillage sur la porte de la serre, mais Ambroise entre par un carreau cassé.</p>`
    }
  },
  {
    key: "octavie", name: "Octavie Marbrenoire", token: "octavie-marbrenoire",
    system: {
      rodzaj: "uczen", dom: "slytherin", rola: "Préfète de Serpentard (5e année)", cecha: "Voix glaciale, carnet de retenues à la main",
      opis: `<p>Grande, impeccable, insignes astiqués. Octavie patrouille dans les couloirs avec un carnet où elle note chaque infraction. Elle déteste l’imprévu et adore retirer des points.</p>
<p>Ce soir, une citrouille révèle son propre secret devant toute la table de Serpentard. Furieuse et humiliée, elle cherche le coupable… et pourrait devenir une alliée inattendue si les Personnages Principaux lui prouvent que ce ne sont pas eux.</p>`,
      ruchy: `<ul>
<li>Leur interdit quelque chose : « Retour au dortoir. Immédiatement. »</li>
<li>Retire 10 points (retard), 20 points (couvre-feu) ou 50 points (mise en danger d’un élève).</li>
<li>Les suit à distance pour les prendre en flagrant délit.</li>
<li>Lance un sort sur eux : Locomotor Mortis, Petrificus Totalus, Silencio.</li>
<li>Si elle perd sa voix (23 h), elle écrit ses ordres sur un parchemin, de plus en plus vite.</li>
</ul>`,
      sekret: `<p>Octavie a terriblement peur du noir depuis qu’un Épouvantard l’a enfermée dans un placard en 1re année. Elle patrouille toujours avec trois Lumos à la fois. Si les Personnages Principaux la protègent dans l’obscurité du parc, elle leur sera redevable.</p>`
    }
  },
  {
    key: "anselme", name: "Anselme Graves, le Fantôme muet", token: "anselme-graves",
    system: {
      rodzaj: "duch", dom: "ravenclaw", rola: "Fantôme de la serre n°7, témoin du passé", cecha: "Ne parle pas, écrit dans la buée",
      opis: `<p>Un garçon de 15 ans en robe de Serdaigle à l’ancienne, translucide et bleuté, une plume derrière l’oreille. Anselme était un brillant élève en Botanique en 1890, quand il a cultivé la première Murmurelle de Poudlard. Elle lui a pris sa voix, puis son souffle. La serre a été condamnée le lendemain.</p>
<p>Il hante le couloir des serres et le vitrage de la serre n°7. Il ne peut pas parler : il écrit des messages dans la buée des vitres, la poussière ou le givre (voir l’aide de jeu « Écrit dans la buée »).</p>`,
      ruchy: `<ul>
<li>Écrit un avertissement dans la buée : « ELLE CHANTE À MINUIT ».</li>
<li>Montre du doigt un endroit, un livre, une personne, puis disparaît dans le mur.</li>
<li>Fait chuter brutalement la température : tout le monde frissonne, les bougies s’éteignent.</li>
<li>S’il est effrayé ou maltraité, il s’enfuit et ne revient pas de la scène.</li>
</ul>`,
      sekret: `<p>Anselme sait que la Murmurelle ne se nourrit que de secrets <em>volés</em> : un secret avoué de plein gré, à voix haute, devant des amis, l’empoisonne. Il n’a jamais eu personne à qui avouer le sien (il avait triché à ses BUSE de Botanique). S’il peut enfin l’écrire devant les Personnages Principaux, il trouve la paix.</p>`
    }
  },
  {
    key: "pommeroy", name: "Professeur Ignace Pommeroy", token: "ignace-pommeroy",
    system: {
      rodzaj: "nauczyciel", dom: "", rola: "Directeur adjoint, maître du banquet", cecha: "Moustache cirée, ne croit jamais les élèves",
      opis: `<p>Un sorcier rond et jovial qui enseigne les Sortilèges et organise le banquet d’Halloween depuis trente-deux ans. Il est très fier de « ses » citrouilles, qu’il fait livrer chaque année du potager du garde-chasse.</p>
<p>Comme tous les adultes de Poudlard, il est sage, incrédule et parfaitement inutile : des citrouilles qui murmurent ? « Une farce de Gryffondor, sans aucun doute ! »</p>`,
      ruchy: `<ul>
<li>Donne 5 points pour une décoration réussie, en retire 10 pour « farce de mauvais goût ».</li>
<li>Rit, tapote une citrouille et dit : « Vous voyez bien qu’elles ne disent rien ! » (elle se tait juste à ce moment-là.)</li>
<li>Confie une @Item[lanterne]{lanterne-citrouille} à chaque élève qui aide à décorer.</li>
<li>Envoie tout le monde au lit à 21 h précises.</li>
</ul>`,
      sekret: `<p>Il a perdu sa propre voix pendant une semaine en 1971, quand il était élève, après avoir écouté « une drôle de fleur » près de la serre n°7. Personne ne l’a cru à l’époque. Si un Personnage Principal le lui rappelle avec un jet réussi pour Trouver une information ou Obtenir ce qu’on veut, il pâlit… et les laisse faire.</p>`
    }
  },
  {
    key: "ombeline", name: "Mlle Ombeline Feuillard", token: "ombeline-feuillard",
    system: {
      rodzaj: "personel", dom: "", rola: "Bibliothécaire, gardienne de la Réserve", cecha: "Chut ! permanent, lunettes en demi-lune",
      opis: `<p>Mince et sèche comme une page de vieux grimoire, Mlle Feuillard voit chaque livre de la bibliothèque comme un enfant à protéger des élèves. Personne n’entre dans la Réserve sans une autorisation signée par un professeur.</p>`,
      ruchy: `<ul>
<li>« Chut ! » (un Personnage Principal devient Embarrassé·e).</li>
<li>Exige une autorisation signée, et l’examine à la loupe.</li>
<li>Fait sa ronde avec une lampe : quelqu’un ou quelque chose cherche les intrus.</li>
<li>Ferme la bibliothèque à 20 h, pendant le banquet, et va dîner.</li>
</ul>`,
      sekret: `<p>Elle a horreur des citrouilles, dont l’odeur lui donne des éternuements terribles. Une citrouille posée dans la bibliothèque la fait fuir pour de bon.</p>`
    }
  }
];

// -------------------------------------------------------------- Créatures

const creatures = [
  {
    key: "murmurelle", name: "La Murmurelle", token: "murmurelle", size: 3,
    system: {
      rodzaj: "stworzenie", dom: "", rola: "Plante magique affamée de secrets (Menace principale)", cecha: "Parle avec les voix qu’elle a volées",
      opis: `<p>Une plante grimpante énorme, aux vrilles d’un vert sombre et aux fleurs violettes en forme de bouche, qui a envahi la serre n°7. Elle se nourrit de secrets chuchotés : elle les répète, apprend la voix de ceux qui les confient, et finit par la leur prendre. Ses racines courent sous le potager, jusque dans les citrouilles du banquet.</p>
<p>À minuit, la nuit d’Halloween, elle fleurit : son chant vole la voix de tous ceux qui l’entendent.</p>
<h3>Points faibles</h3>
<ul>
<li><strong>La lumière du soleil</strong> (Lumos Solem, lanternes, beaucoup de Lumos) : ses vrilles se referment et reculent.</li>
<li><strong>Le silence</strong> (Silencio, Mutismus sur ses fleurs) : son chant s’interrompt un moment.</li>
<li><strong>Vox Reddita</strong> : elle rend toutes les voix volées et se fane à moitié.</li>
<li><strong>Un secret avoué de plein gré</strong>, à voix haute, devant ses amis : il l’empoisonne. Si chaque Personnage Principal présent avoue un vrai secret, elle s’effondre.</li>
<li><strong>Le feu</strong> (Incendio) la brûle… et la serre aussi, avec Ambroise dedans.</li>
<li><strong>La douceur</strong> : en l’Approchant comme une créature magique (+ Loyauté), on peut l’endormir et la rempoter.</li>
</ul>
<p>Il n’y a pas de points de vie dans ce jeu : la Murmurelle est vaincue quand l’histoire le dit, c’est-à-dire quand les Personnages Principaux ont trouvé et réussi l’une de ces solutions.</p>`,
      ruchy: `<ul>
<li>Répète à voix haute, avec la voix de son propriétaire, le secret d’un Personnage Principal (Embarrassé·e).</li>
<li>Imite la voix d’un ami pour attirer quelqu’un seul dans les vrilles (les séparer).</li>
<li>Enlace un Personnage Principal et le soulève dans les airs (Blessé·e s’il se débat sans protection).</li>
<li>Vole une voix : le personnage ne peut plus prononcer d’incantation (Ensorcelé·e) ; lancer un sort sans incantation coûte alors 1 point de Chance.</li>
<li>Chante : tout le monde dans la serre est Effrayé·e, sauf ceux qui ont bu le Philtre de Rossignol.</li>
<li>Resserre la Citrouille-Mère autour d’Ambroise (mettre en danger une chose à laquelle ils tiennent).</li>
<li>Propose un marché : « Donne-moi un secret, un vrai, et je te rends le garçon. » (Elle ment : un secret donné la rend plus forte.)</li>
</ul>`,
      sekret: `<p>La Murmurelle n’est pas méchante : elle a faim, et elle est seule. Elle a été plantée par Hortense avec une graine de Mme Ronceneuve, et ses racines ont déjà atteint le Hall d’entrée. Si on la laisse fleurir, elle produira des graines… des dizaines.</p>`
    }
  },
  {
    key: "mere", name: "La Citrouille-Mère", token: "citrouille-mere", size: 2,
    system: {
      rodzaj: "stworzenie", dom: "", rola: "Cocon végétal où dort Ambroise", cecha: "Bat comme un cœur, tiède, couverte de vrilles",
      opis: `<p>Une citrouille gigantesque au centre de la serre, deux fois plus grande qu’un élève, enveloppée de vrilles. On entend à l’intérieur une respiration lente : c’est Ambroise, endormi. Elle s’ouvre si la Murmurelle est vaincue, si on lui rend la voix d’Ambroise (Vox Reddita), ou si on la découpe avec précaution (Diffindo, Faire face au danger).</p>`,
      ruchy: `<ul>
<li>Se referme un peu plus : la voix d’Ambroise devient plus faible.</li>
<li>Pulse d’une lumière orange : toutes les Citrouilles-Échos se tournent vers les intrus.</li>
<li>Recrache une vrille qui fait trébucher quelqu’un.</li>
</ul>`,
      sekret: ""
    }
  },
  {
    key: "echo", name: "Citrouille-Écho", token: "citrouille-echo", size: 1, unlinked: true,
    system: {
      rodzaj: "stworzenie", dom: "", rola: "Sbire de la Murmurelle", cecha: "Ricane, répète tout ce qu’on dit",
      opis: `<p>Des citrouilles ordinaires reliées aux racines de la Murmurelle. Leurs visages sculptés bougent quand elles parlent, et leurs voix sont celles des élèves qu’elles ont entendus. Dans la Grande Salle, elles se contentent de murmurer ; dans la serre n°7, elles roulent, mordillent et encerclent les intrus. Un bon sort les fait taire ou éclater en purée.</p>`,
      ruchy: `<ul>
<li>Répète tout ce que disent les Personnages Principaux, plus fort, pour attirer un préfet ou un professeur.</li>
<li>Murmure un secret (tire sur la table @RollTable[murmures]{Ce que murmurent les citrouilles}).</li>
<li>Roule dans les jambes de quelqu’un, qui tombe.</li>
<li>Mord une cheville (Blessé·e) ou une baguette, qui roule sous un établi.</li>
</ul>`,
      sekret: ""
    }
  },
  {
    key: "chauves-souris", name: "Nuée de chauves-souris enchantées", token: "chauves-souris", size: 2, unlinked: true,
    system: {
      rodzaj: "stworzenie", dom: "", rola: "Décorations du banquet devenues folles", cecha: "Couinent avec des voix d’élèves",
      opis: `<p>Chaque année, le professeur Pommeroy enchante des centaines de chauves-souris en papier noir qui volent au plafond de la Grande Salle. Ce soir, certaines se sont posées sur les citrouilles et ont appris leurs murmures. Elles volent en nuée en couinant des secrets.</p>`,
      ruchy: `<ul>
<li>Fondent sur une table : les assiettes volent, tout le monde est éclaboussé de jus de citrouille.</li>
<li>Emportent un objet (une lettre, une baguette, un carnet) vers le plafond.</li>
<li>Couinent un secret au-dessus de la table des professeurs.</li>
</ul>`,
      sekret: ""
    }
  }
];

// -------------------------------------------------------------- Notes de la Narratrice

const narrator = {
  key: "notes", name: "Notes de la Narratrice – Les Citrouilles qui murmuraient",
  system: {
    rok: "31 octobre (année au choix du groupe)",
    zeszlorocznyZwyciezca: "",
    tajemnice: "• Où est Ambroise Tisserand ?\n• Pourquoi les citrouilles connaissent-elles nos secrets ?\n• Que s’est-il passé dans la serre n°7 ?\n• (Mystères proposés par les joueurs…)",
    glownePostacie: {
      1: { nazwa: "Léonie Barbefeu", dom: "Gryffondor", rok: "3" },
      2: { nazwa: "Tobias Plumerai", dom: "Serdaigle", rok: "3" },
      3: { nazwa: "Capucine Ashby", dom: "Poufsouffle", rok: "3" },
      4: { nazwa: "Évariste Corbin", dom: "Serpentard", rok: "3" },
      5: { nazwa: "", dom: "", rok: "" }
    },
    postacieNarratora: {
      1: { nazwa: "Ambroise Tisserand", rola: "Élève disparu", cecha: "Chuchote, parle aux plantes" },
      2: { nazwa: "Hortense Valériane", rola: "Assistante en Botanique", cecha: "Parle très vite" },
      3: { nazwa: "Octavie Marbrenoire", rola: "Préfète de Serpentard", cecha: "Voix glaciale" },
      4: { nazwa: "Anselme Graves", rola: "Fantôme muet", cecha: "Écrit dans la buée" },
      5: { nazwa: "Pr Ignace Pommeroy", rola: "Directeur adjoint", cecha: "Ne croit jamais les élèves" },
      6: { nazwa: "Mlle Ombeline Feuillard", rola: "Bibliothécaire", cecha: "Chut !" }
    },
    zagrozenia: {
      1: {
        tytul: "La Murmurelle fleurira à minuit",
        dotyczy: "Tout Poudlard, Ambroise, la Murmurelle",
        stawka: "La voix de tous les élèves du château",
        krok: "19 h : les citrouilles murmurent au banquet → 21 h : des vrilles sortent des dalles du Hall → 23 h : Octavie et d’autres perdent leur voix → minuit : floraison, chant, graines"
      },
      2: {
        tytul: "Ambroise s’efface dans la Citrouille-Mère",
        dotyczy: "Ambroise, Capucine, Hortense",
        stawka: "Ambroise (il quitte l’histoire)",
        krok: "Sa voix appelle depuis les citrouilles → elle faiblit → elle se tait (23 h) → à minuit, il devient une Citrouille-Écho"
      },
      3: {
        tytul: "Les citrouilles révèlent les secrets de tous",
        dotyczy: "Les Personnages Principaux, Octavie, Hortense, Ambroise",
        stawka: "Amitiés, réputations et points de maison",
        krok: "Un secret de Personnage Principal → le secret d’Octavie (elle cherche un coupable) → le secret d’Hortense devant les professeurs → tous les secrets du dortoir"
      }
    }
  }
};

// -------------------------------------------------------------- Tables

const tables = [
  {
    key: "murmures", name: "Ce que murmurent les citrouilles", formula: "1d12",
    description: "À tirer quand une citrouille (ou une chauve-souris) murmure pendant le banquet ou dans la serre.",
    results: [
      "« Ambroise écrit lui-même les lettres qu’il reçoit… » (secret d’Ambroise)",
      "« J’ai froid… serre sept… » (voix d’Ambroise, très faible)",
      "« Octavie dort avec trois Lumos allumés. Elle a peur du noir. » (secret d’Octavie)",
      "« Trois graines, trente Gallions, Allée des Embrumes… » (secret d’Hortense)",
      "« Elle chante à minuit. » (voix inconnue, très vieille)",
      "« J’ai triché à mes BUSE de Botanique. » (secret d’Anselme le fantôme, voix de 1890)",
      "« Pommeroy a perdu sa voix en 1971… et personne ne l’a cru. »",
      "« Mlle Feuillard éternue dès qu’elle sent une citrouille. »",
      "Le secret d’un Personnage Principal : demande au joueur ce qu’il ne voudrait surtout pas entendre à voix haute.",
      "Le secret d’un Personnage Principal : demande au joueur ce qu’il ne voudrait surtout pas entendre à voix haute.",
      "Une rumeur fausse mais vexante sur un Personnage Principal (invente-la, ou demande à son Rival).",
      "La citrouille répète, mot pour mot, la dernière phrase prononcée par un Personnage Principal… mais avec la voix d’Ambroise."
    ]
  },
  {
    key: "rumeurs", name: "Rumeurs du banquet d’Halloween", formula: "1d6",
    description: "Ce qu’on entend aux tables des maisons pendant le banquet (vrai ou faux, à toi de voir).",
    results: [
      "« Il paraît que la serre n°7 est hantée depuis qu’un élève y est mort, il y a cent ans. » (vrai)",
      "« La nouvelle assistante de Botanique sort tous les soirs avec une lanterne vers le potager. » (vrai)",
      "« Ce sont les jumeaux de Gryffondor qui ont ensorcelé les citrouilles. » (faux)",
      "« Le petit Tisserand ? Il dort à l’infirmerie, il paraît. » (faux : l’infirmière ne l’a pas vu)",
      "« Pommeroy a fait livrer les citrouilles du potager collé à la vieille serre. » (vrai)",
      "« Un Serpentard a entendu une citrouille l’appeler par son prénom… et il a fui en pyjama. » (vrai, à moitié)"
    ]
  },
  {
    key: "actions-murmurelle", name: "Que fait la Murmurelle ?", formula: "1d6",
    description: "Quand tu ne sais pas quelle Action de Narratrice jouer dans la serre n°7.",
    results: [
      "Elle répète le secret d’un Personnage Principal avec sa voix (Embarrassé·e).",
      "Elle imite la voix d’un ami pour attirer quelqu’un seul dans les vrilles.",
      "Une vrille enlace un Personnage Principal et le soulève (Blessé·e s’il se débat sans protection).",
      "Elle vole une voix : plus d’incantation possible (Ensorcelé·e).",
      "Elle chante : tout le monde est Effrayé·e, sauf ceux qui ont bu le Philtre de Rossignol.",
      "Elle propose un marché : « Un secret, un vrai, et je te rends le garçon. » (Elle ment.)"
    ]
  }
];

// -------------------------------------------------------------- Macro

const macros = [
  {
    key: "macro-murmure", name: "Une citrouille murmure…", img: `${ART}/tokens/citrouille-echo.png`,
    command: `// Tire un murmure sur la table de l'aventure « Les Citrouilles qui murmuraient »
const table = game.tables.find(t => t.getFlag("systemHogwartRPG", "cle") === "murmures")
  ?? game.tables.getName("Ce que murmurent les citrouilles");
if (!table) return ui.notifications.warn("Table « Ce que murmurent les citrouilles » introuvable : importe d'abord l'aventure.");
await table.draw({ rollMode: CONST.DICE_ROLL_MODES.PRIVATE });`
  }
];

// -------------------------------------------------------------- Scènes

const scenes = [
  {
    key: "salle", name: "La Grande Salle – Banquet d’Halloween", navName: "Grande Salle", img: `${ART}/maps/grande-salle.jpg`,
    width: 2400, height: 1800, darkness: 0, active: false,
    notes: [
      { page: "guide/Scène 1 – Les citrouilles parlent", x: 1200, y: 1000, text: "Scène 1" },
      { page: "guide/Scène 2 – Sur la piste d’Ambroise", x: 1200, y: 200, text: "Scène 2 : le banquet" }
    ],
    tokens: [
      { actor: "pommeroy", x: 1100, y: 300 },
      { actor: "hortense", x: 1500, y: 300 },
      { actor: "octavie", x: 1700, y: 1300 },
      { actor: "echo", x: 100, y: 600 }, { actor: "echo", x: 2200, y: 900 },
      { actor: "chauves-souris", x: 900, y: 500, hidden: true }
    ]
  },
  {
    key: "reserve", name: "La Réserve de la bibliothèque", navName: "Réserve", img: `${ART}/maps/reserve-bibliotheque.jpg`,
    width: 2000, height: 1400, darkness: 0.3,
    notes: [{ page: "guide/Scène 2 – Sur la piste d’Ambroise", x: 1680, y: 1050, text: "Flore des Murmures" }],
    tokens: [{ actor: "ombeline", x: 300, y: 1000 }]
  },
  {
    key: "parc", name: "Le parc de Poudlard (nuit)", navName: "Parc", img: `${ART}/maps/parc-poudlard.jpg`,
    width: 3000, height: 2000, darkness: 0.4,
    notes: [
      { page: "guide/Scène 3 – Après le couvre-feu", x: 1500, y: 1000, text: "Scène 3" },
      { page: "guide/Scène 4 – La serre n°7", x: 2130, y: 1250, text: "Serre n°7" }
    ],
    tokens: [{ actor: "octavie", x: 900, y: 800, hidden: true }, { actor: "anselme", x: 1900, y: 1100, hidden: true }]
  },
  {
    key: "serre", name: "La serre n°7", navName: "Serre n°7", img: `${ART}/maps/serre-7.jpg`,
    width: 2400, height: 1800, darkness: 0.5,
    notes: [
      { page: "guide/Scène 4 – La serre n°7", x: 1200, y: 1500, text: "Scène 4" },
      { page: "guide/Dénouements", x: 1200, y: 600, text: "Dénouements" }
    ],
    tokens: [
      { actor: "murmurelle", x: 1050, y: 550 },
      { actor: "mere", x: 1100, y: 800 },
      { actor: "echo", x: 1600, y: 300 }, { actor: "echo", x: 1800, y: 450 }, { actor: "echo", x: 1700, y: 600 },
      { actor: "anselme", x: 300, y: 800, hidden: true }
    ]
  }
];

module.exports = { adventure, folders, items, pregens, npcs, creatures, narrator, tables, macros, scenes, ART };
