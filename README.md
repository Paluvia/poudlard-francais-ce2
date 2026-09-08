# ⚡ École de Sorcellerie — Français CE2

Petite application web pour rendre les exercices de français plus ludiques,
sur le thème de Harry Potter. Faite maison, gratuite, sans aucune dépendance.

En complément des devoirs de classe — pas un remplacement.

---

## Lancer l'application

### Le plus simple
Double-clique sur **`index.html`**. Il s'ouvre dans le navigateur.

> ⚠️ Selon le navigateur, l'ouverture directe d'un fichier local peut empêcher
> l'**enregistrement de la progression** (elle serait perdue en fermant l'onglet).
> Si c'est le cas, utilise la méthode ci-dessous.

### Avec un petit serveur local (progression garantie)
Dans un terminal, depuis ce dossier :

```bash
cd poudlard-francais && python3 -m http.server 8000
```

Puis ouvre <http://localhost:8000> dans le navigateur.
Pour arrêter le serveur : `Ctrl + C`.

---

## Les écrans

| Écran | Rôle |
|-------|------|
| **Sorciers** | Liste des enfants. On choisit qui joue, on crée un nouveau sorcier, on gère (renommer via suppression + recréation, supprimer), on exporte / importe les sauvegardes. |
| **Nouveau sorcier** | Prénom + répartition dans une maison (test du Choixpeau ou choix direct). |
| **Accueil** | Bandeau du sorcier en cours + choix de l'entraînement. Chaque thème affiche le nombre de questions **encore à découvrir**. |
| **Question / réponse** | 10 questions par session (moins si presque tout est réussi). Points de magie à chaque bonne réponse, bonus de série. |
| **Ma progression** | Avatar qui évolue, années de Poudlard, sorts débloqués, statistiques (dont « questions maîtrisées »). Boutons : changer de sorcier, changer de maison, **revoir toutes les questions**, remettre à zéro cette fiche. |

## Questions déjà réussies

- Quand une question est **réussie**, elle n'est plus reposée à cet enfant.
- Quand elle est **ratée**, elle reviendra dans une prochaine session.
- Bouton **« Revoir toutes les questions »** (écran Progression) : remet tout
  dans les « à découvrir », sans toucher aux points ni aux sorts.
- Une session vise **environ 1 question sur 3 de type « cahier »** : l'enfant
  écrit la phrase sur son cahier, affiche la correction, compare, puis coche
  « j'avais tout bon » ou « j'avais une erreur » (auto-évaluation).

## Animation de félicitations

À la fin d'un entraînement, une **gerbe d'étincelles** s'affiche. Si l'enfant
**débloque une récompense** (nouvelle année de Poudlard, nouveau sort, diplôme)
ou est **réparti dans sa maison**, l'animation est plus grande : voile magique,
grand « BRAVO » et pluie d'étoiles, et les cartes de récompense rebondissent.
Le tout respecte le réglage système « réduire les animations » et le bouton
**Sons**. Code : fonction `celebrer()` dans `app.js`, styles `#celebration`
dans `style.css`.

## Plusieurs enfants

Chaque enfant a **sa propre fiche** (prénom, maison, points, sorts, stats),
enregistrée dans le navigateur (localStorage), sous une seule clé
`poudlard-francais-ce2`. On bascule de l'un à l'autre depuis l'écran **Sorciers**
(ou le lien « Changer de sorcier »).

## Sauvegarde et transfert entre appareils

- La progression est enregistrée automatiquement **sur l'appareil utilisé**
  (elle ne se synchronise pas toute seule entre un PC et une tablette).
- Sur l'écran **Sorciers** : **« Exporter les sauvegardes »** télécharge un
  fichier `.json` contenant toutes les fiches. **« Importer »** recharge ce
  fichier sur un autre appareil (il remplace les fiches locales).
- ⚠️ Ouvrir `index.html` directement (adresse `file://`) peut empêcher
  l'enregistrement selon le navigateur. L'adresse en ligne (https, une fois
  hébergée) n'a pas ce problème.

---

## Ajouter / modifier des questions

Tout est dans **`contenu.js`**. Le format d'une question est décrit en haut du
fichier. En résumé :

```js
// Question à choix multiples
{
  type: "qcm",
  consigne: "Choisis la bonne écriture.",
  phrase: "Harry … une baguette magique.",   // le … est le trou
  choix: ["a", "as", "à"],
  reponse: "a",                               // doit être exactement dans "choix"
  explication: "« a » vient du verbe avoir…"
}

// Question à écrire sur le cahier (auto-corrigée par l'enfant)
{
  type: "cahier",
  consigne: "Écris la phrase au présent.",
  phrase: "« Aujourd'hui, les élèves (aller) à la bibliothèque. »",
  correction: "Aujourd'hui, les élèves vont à la bibliothèque.",  // réponse modèle
  explication: "aller → ils vont."
}

// Question où l'enfant écrit la réponse
{
  type: "trou",
  consigne: "Conjugue le verbe aller.",
  phrase: "Je … à Poudlard.",
  reponse: "vais",
  reponses: ["vais", "je vais"],   // variantes acceptées (optionnel)
  explication: "Je vais. Aller : je vais, tu vas…"
}
```

Pour ajouter une question : ajoute un objet dans le tableau `questions` du thème
voulu, dans `periode1.themes`.

### Ajouter une nouvelle période (période 2, 3, …)

1. Dans `contenu.js`, copie le bloc `const periode1 = { … }`.
2. Renomme-le `periode2`, change le `titre` et les `themes`.
3. Ajoute-le dans l'objet `PERIODES` en bas du fichier :
   ```js
   const PERIODES = { periode1: periode1, periode2: periode2 };
   ```

> Pour l'instant l'application joue toujours `periode1`. Pour basculer sur une
> autre période, remplace `PERIODES.periode1` par `PERIODES.periode2` dans
> `app.js` (fonction `rendreAccueil`, variable `periode`). Un sélecteur de
> période pourra être ajouté plus tard.

---

## Régler la difficulté et les récompenses

Dans **`app.js`**, tout en haut, section *« PARAMÈTRES DU JEU »* :

- `QUESTIONS_PAR_SESSION` — nombre de questions par entraînement (10 par défaut).
- `XP_BONNE_REPONSE` — points gagnés par bonne réponse (10).
- `bonusSerie(serie)` — points bonus selon le nombre de bonnes réponses d'affilée.
- `ANNEES` — les paliers (années de Poudlard) et l'XP nécessaire pour chacun.
- `SORTS` — les sorts à débloquer et leur seuil d'XP.

L'avatar (fonction `avatarSVG`) gagne automatiquement :
la baguette à 50 points, le grimoire en année 2, la chouette en année 3,
le balai en année 4, une aura de Patronus à 1400 points.

## Le décor

Le fond (ciel étoilé, lune, silhouette du château de Poudlard, bougies
volantes) est un **dessin original en SVG/CSS**, dans `index.html` (`<div id="ciel">`)
et `style.css`. Aucune image des films n'est utilisée : ce sont des visuels
sous droits d'auteur qu'on ne peut pas héberger. Pour mettre tes propres
images (que tu as le droit d'utiliser), crée un dossier `images/` et remplace
le contenu de `#ciel` par un `<img>` ou un `background-image`.

---

## Contenu actuel — Période 1 (rentrée CE2)

**≈ 150 questions, 8 thèmes** (dont ~1/3 à écrire sur le cahier) :

1. Le présent : **être et avoir** (+ homophones a/à, on/ont, est/es/et, son/sont)
2. Le présent : **aller, faire et dire** (+ à/au/aux ; « vous faites », « vous dites »)
3. Le présent : **les verbes en -er** (nous mangeons / commençons, -ent muet,
   -er vs -ez, sujet = groupe nominal)
4. **Les homophones** grammaticaux (a/à, et/est, on/ont, son/sont, ou/où)
5. **Les sons difficiles et les accents** (m devant m/b/p, gn, ill, ph, ç,
   é/è/ê, mots à orthographe piégeuse)
6. **Lettres muettes finales et pluriel des noms** (peti**t**, bor**d**… ;
   -s / -x / -aux ; cheval → chevaux)
7. **Les mots invariables** (liste CE2 élargie, en phrases)
8. **L'ordre alphabétique** (classer des mots, lettre avant / après)

Niveau visé : **CE2 début d'année** (consolidation du CE1 + nouvelles notions).
Pour ajuster, voir *« Régler la difficulté »* ci-dessous et éditer `contenu.js`.

---

## Fichiers

```
poudlard-francais/
├── index.html     structure des écrans
├── style.css      apparence (thème parchemin + couleurs de maison)
├── app.js         logique : navigation, quiz, points, progression, avatar
├── contenu.js     TOUTES les questions  ← c'est ici qu'on enrichit
└── README.md      ce fichier
```
