# Hogwart-RPG-Foundry
# PL
Cześć! 
Mam przyjemność opublikować pełnoprawny system do FoundryVTT do systemu [Hogwart RPG](https://dbb-8.itch.io/hogwarts-rpg), autorstwa Davida Brunell-Brutman. System obsługuje język polski i angielski. Jest to mój pierwszy system do FoundryVTT napisany przy pomocy internetu, poradników oraz drobnych wskazówek AI.
<br>System zawiera:
<br>• Karta postaci, zmieniająca kolory w zależności od domu
<br>• System rzutów na cechy, połączony z dostępnymi ruchami
<br>• Arkusz narratora (MG)
<br>• Automatyczna, domyślna scena w klimacie Hogwart RPG<br>
**Jak zainstalować?**<br>
[Manifest link](https://github.com/PrevotYann/Hogwart-RPG-Foundry/releases/latest/download/system.json) należy wkleić w okienku do instalacji systemu:
<img width="1137" height="72" alt="image" src="https://github.com/user-attachments/assets/148b983f-fdb8-4167-82b5-8e0162c79eb7" />
<br>System będzie aktualizowany i rozwijany, ponieważ chciałabym się rozwijać w kierunku FoundryVTT.
<br>Pozdrawiam,<br>
AryaWeronika
# ENG
Hello!
I am pleased to publish a full-fledged FoundryVTT system for the [Hogwart RPG](https://dbb-8.itch.io/hogwarts-rpg) system, authored by David Brunell-Brutman. The system supports both Polish and English. This is my first FoundryVTT system, written using the internet, tutorials, and small AI tips.
<br>The system includes:
<br>• A character sheet that changes colors depending on the house
<br>• A trait roll system linked to available moves
<br>• A storyteller (GM) sheet
<br>• An automatic, default scene in the Hogwarts RPG style<br>
**How to install?**<br>
[The Manifest link](https://github.com/PrevotYann/Hogwart-RPG-Foundry/releases/latest/download/system.json) you should paste in the system installation window:
<img width="1137" height="72" alt="image" src="https://github.com/user-attachments/assets/148b983f-fdb8-4167-82b5-8e0162c79eb7" />
<br>The system will be updated and developed as I plan to expand into FoundryVTT.<br>
Best regards,<br>
AryaWeronika

# FR
Le système est disponible en français : la terminologie et les textes suivent la traduction française [Hogwarts : Le JDR](https://mori-drak.itch.io/hogwarts-le-jdr) (traduction BHeng, Mori Dragon, DeReel ; mise en page Magimax, Marc), autorisée par l’auteur original.<br>
**Installation :** collez ce [lien de manifeste](https://github.com/PrevotYann/Hogwart-RPG-Foundry/releases/latest/download/system.json) dans la fenêtre d’installation de système de Foundry (v13 ou v14), puis choisissez « Français » dans les paramètres de langue.

**Contenu (v2.0.0)**
- Fiche de personnage complète : Traits, États (avec malus automatiques), Chance, Expérience, Progrès, Amis & Rivaux, animal, Matière préférée, objets magiques, sorts par année.
- Jets 2d6 + Trait avec fenêtre de bonus (+1 Ami·e / Rival·e, +1 Matière préférée, modificateur libre) ; Maj+clic pour lancer directement.
- Toutes les Actions de base, Actions magiques et Actions de Quidditch (Jouer un match, Attraper le Vif d’or).
- Automatisations : Expérience cochée sur 6-, bouton « Chance » pour changer un jet en 10+, sort inconnu = 1 point de Chance, sort appris il y a 2 ans ou plus = réussite sans jet, jet pour quitter l’histoire quand les 8 États sont cochés.
- Notes de la Narratrice : points de maison (5/10/20/50), points de départ, vainqueur de l’année précédente, fin de session, fin d’année scolaire (Chance regagnée, passage à l’année suivante).
- Compendiums : Règles (FR), Tables aléatoires (FR) pour la création de personnage, le Patronus, les noms, lieux, créatures, Sérieuses Conséquences…, Objets magiques (FR), et les livres de règles PDF (PL / EN / FR).

Le contenu du jeu original et de sa traduction est distribué sous licence [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) ; cette œuvre transformative n’est pas à vendre et n’est ni autorisée ni approuvée par J.K. Rowling ou Warner Bros.

**Développement :** les compendiums sont générés depuis `src/packs` avec `tools/build-packs.cjs` (nécessite le module `classic-level` de Foundry) ; `tools/check.mjs` et `tools/validate-packs.mjs` valident le manifeste, les templates, les traductions et les documents.
