/* =============================================================================
   École de Sorcellerie — Français CE2  |  Logique de l'application
   -----------------------------------------------------------------------------
   Aucune bibliothèque, aucun outil de build.
   Plusieurs enfants peuvent utiliser la même page : chacun a sa fiche
   (prénom, maison, points, sorts, statistiques), enregistrée dans le
   navigateur (localStorage). Un bouton permet d'exporter / importer les
   sauvegardes pour les transférer d'un appareil à un autre.
   ============================================================================= */

(function () {
  "use strict";

  /* ===========================================================================
     1. PARAMÈTRES DU JEU  (faciles à ajuster)
     =========================================================================== */

  const QUESTIONS_PAR_SESSION = 6;
  const XP_BONNE_REPONSE = 10;

  // Bonus de série : nombre de bonnes réponses d'affilée -> XP bonus
  function bonusSerie(serie) {
    if (serie >= 6) return 12;
    if (serie === 5) return 8;
    if (serie === 4) return 5;
    if (serie === 3) return 3;
    return 0;
  }

  const MAISONS = {
    gryffondor: { nom: "Gryffondor", embleme: "🦁", principale: "#7a0d0d", secondaire: "#d3a625" },
    serdaigle:  { nom: "Serdaigle",  embleme: "🦅", principale: "#0e1a40", secondaire: "#946b2d" },
    poufsouffle:{ nom: "Poufsouffle",embleme: "🦡", principale: "#8d6b12", secondaire: "#372e29" },
    serpentard: { nom: "Serpentard", embleme: "🐍", principale: "#1a472a", secondaire: "#8a8a8a" },
  };

  // Paliers = les années d'études à Poudlard. seuil = XP nécessaire.
  const ANNEES = [
    { num: 1, seuil: 0,    titre: "Première année — la Répartition" },
    { num: 2, seuil: 200,  titre: "Deuxième année — apprenti confirmé" },
    { num: 3, seuil: 450,  titre: "Troisième année — sorties à Pré-au-Lard" },
    { num: 4, seuil: 750,  titre: "Quatrième année — le Tournoi" },
    { num: 5, seuil: 1100, titre: "Cinquième année — les BUSE" },
    { num: 6, seuil: 1500, titre: "Sixième année — cours avancés" },
    { num: 7, seuil: 2000, titre: "Septième année — presque diplômé·e" },
  ];
  const DIPLOME_SEUIL = 2600;

  // Sorts à débloquer selon l'XP.
  const SORTS = [
    { id: "lumos",            nom: "Lumos",            seuil: 0,    embleme: "💡", desc: "Fait briller le bout de ta baguette." },
    { id: "wingardium",       nom: "Wingardium Leviosa",seuil: 80,  embleme: "🪶", desc: "Fais léviter les objets." },
    { id: "alohomora",        nom: "Alohomora",        seuil: 220,  embleme: "🔓", desc: "Ouvre les portes fermées à clé." },
    { id: "reparo",           nom: "Reparo",           seuil: 420,  embleme: "🔧", desc: "Répare ce qui est cassé." },
    { id: "expelliarmus",     nom: "Expelliarmus",     seuil: 700,  embleme: "⚡", desc: "Le sortilège de désarmement." },
    { id: "protego",          nom: "Protego",          seuil: 1000, embleme: "🛡️", desc: "Crée un bouclier magique." },
    { id: "expecto-patronum", nom: "Expecto Patronum", seuil: 1400, embleme: "🦌", desc: "Invoque ton Patronus." },
  ];

  const CHOIXPEAU = [
    { q: "Devant un problème difficile, tu…",
      r: [
        { t: "fonces sans hésiter", m: "gryffondor" },
        { t: "réfléchis longtemps avant d'agir", m: "serdaigle" },
        { t: "demandes de l'aide à un ami", m: "poufsouffle" },
        { t: "cherches la façon la plus maligne", m: "serpentard" },
      ] },
    { q: "Ta plus grande qualité, c'est…",
      r: [
        { t: "le courage", m: "gryffondor" },
        { t: "la curiosité", m: "serdaigle" },
        { t: "la gentillesse", m: "poufsouffle" },
        { t: "l'ambition", m: "serpentard" },
      ] },
    { q: "En récréation, on te trouve plutôt…",
      r: [
        { t: "à jouer à un jeu qui bouge", m: "gryffondor" },
        { t: "à lire ou observer", m: "serdaigle" },
        { t: "avec plein de copains", m: "poufsouffle" },
        { t: "à organiser le jeu et les règles", m: "serpentard" },
      ] },
    { q: "Un animal te ressemble :",
      r: [
        { t: "le lion", m: "gryffondor" },
        { t: "l'aigle", m: "serdaigle" },
        { t: "le blaireau", m: "poufsouffle" },
        { t: "le serpent", m: "serpentard" },
      ] },
  ];

  /* ===========================================================================
     2. SAUVEGARDE — plusieurs fiches d'enfants
     ---------------------------------------------------------------------------
     Structure enregistrée :
     {
       version: 2,
       profilActifId: "p...",
       profils: [ { id, nom, maison, xp, bonnesReponses, totalReponses,
                    meilleureSerie, creeLe }, ... ],
       reglages: { sons: true }
     }
     =========================================================================== */

  const CLE_SAUVEGARDE = "poudlard-francais-ce2";
  let memoireSeule = false; // true si localStorage est indisponible

  function nouvelId() {
    return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function profilVierge(nom) {
    return {
      id: nouvelId(),
      nom: nom || "",
      maison: "",
      xp: 0,
      bonnesReponses: 0,
      totalReponses: 0,
      meilleureSerie: 0,
      reussies: {},          // { cléQuestion: true } — questions déjà réussies
      creeLe: Date.now(),
    };
  }

  // Complète une fiche chargée d'une ancienne version avec les champs manquants.
  function assainirProfil(p) {
    if (typeof p.xp !== "number") p.xp = 0;
    if (typeof p.bonnesReponses !== "number") p.bonnesReponses = 0;
    if (typeof p.totalReponses !== "number") p.totalReponses = 0;
    if (typeof p.meilleureSerie !== "number") p.meilleureSerie = 0;
    if (!p.reussies || typeof p.reussies !== "object") p.reussies = {};
    return p;
  }

  function sauvegardeVierge() {
    return { version: 3, profilActifId: null, profils: [], reglages: { sons: true } };
  }

  function chargerSauvegarde() {
    let data;
    try {
      const brut = localStorage.getItem(CLE_SAUVEGARDE);
      data = brut ? JSON.parse(brut) : null;
    } catch (e) {
      memoireSeule = true;
      return sauvegardeVierge();
    }
    if (!data || typeof data !== "object") return sauvegardeVierge();

    // Migration depuis l'ancienne version (une seule fiche à la racine).
    if (!Array.isArray(data.profils)) {
      const ancien = data;
      data = sauvegardeVierge();
      data.reglages.sons = ancien.sons !== false;
      if (ancien.maison || ancien.xp) {
        const p = profilVierge(ancien.nom || "Sorcier");
        p.maison = ancien.maison || "";
        p.xp = ancien.xp || 0;
        p.bonnesReponses = ancien.bonnesReponses || 0;
        p.totalReponses = ancien.totalReponses || 0;
        p.meilleureSerie = ancien.meilleureSerie || 0;
        data.profils.push(p);
        data.profilActifId = p.id;
      }
    }
    if (!data.reglages) data.reglages = { sons: true };
    if (!Array.isArray(data.profils)) data.profils = [];
    data.profils.forEach(assainirProfil);
    data.version = 3;
    return data;
  }

  function sauver() {
    try {
      localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(sauvegarde));
    } catch (e) {
      memoireSeule = true;
    }
  }

  let sauvegarde = chargerSauvegarde();
  let profilEnCreation = null;   // fiche en cours de création (non encore ajoutée)
  let choixpeauCible = "creation"; // "creation" ou "resort"

  function profilActif() {
    return sauvegarde.profils.find(p => p.id === sauvegarde.profilActifId) || null;
  }

  // Raccourci : "etat" désigne toujours la fiche de l'enfant en cours de jeu.
  let etat = profilActif();

  /* ===========================================================================
     3. CALCULS DE PROGRESSION
     =========================================================================== */

  function anneeActuelle(xp) {
    let courante = ANNEES[0];
    for (const a of ANNEES) if (xp >= a.seuil) courante = a;
    return courante;
  }

  function prochainPalier(xp) {
    for (const a of ANNEES) if (xp < a.seuil) return { seuil: a.seuil, titre: "Année " + a.num };
    if (xp < DIPLOME_SEUIL) return { seuil: DIPLOME_SEUIL, titre: "Diplôme de Poudlard" };
    return null;
  }

  function sortsDebloques(xp) {
    return SORTS.filter(s => xp >= s.seuil);
  }

  function progressionVersProchain(xp) {
    const anneeCour = anneeActuelle(xp);
    const suivant = prochainPalier(xp);
    if (!suivant) return { pourcent: 100, texte: "Progression maximale atteinte ✨" };
    const base = anneeCour.seuil;
    const pourcent = Math.max(0, Math.min(100, Math.round(((xp - base) / (suivant.seuil - base)) * 100)));
    return { pourcent, texte: xp + " / " + suivant.seuil + " points de magie" };
  }

  // Clé stable d'une question, pour retenir qu'elle a été réussie.
  // Elle dépend du thème et du texte : modifier le texte "réinitialise" la question.
  function cleQuestion(q) {
    let base;
    if (q.type === "tableau" || q.type === "erreur") {
      base = (q._themeId || "") + "|" + q.type + "|" + (q.verbe || "") + "|" +
             (q.consigne || "") + "|" + (q.fausse || "") + "|" +
             (q.formes ? JSON.stringify(q.formes) : "");
    } else {
      base = (q._themeId || "") + "|" + (q.type || "") + "|" + (q.phrase || "");
    }
    let h = 0;
    for (let i = 0; i < base.length; i++) h = (Math.imul(h, 31) + base.charCodeAt(i)) | 0;
    return "q" + (h >>> 0).toString(36);
  }
  function estReussie(q) { return !!(etat && etat.reussies && etat.reussies[cleQuestion(q)]); }

  /* ===========================================================================
     4. AVATAR (SVG qui évolue)
     =========================================================================== */

  function avatarSVG(p) {
    const m = MAISONS[p.maison] || MAISONS.gryffondor;
    const annee = anneeActuelle(p.xp).num;
    const aBaguette = p.xp >= 50;
    const aLivre = annee >= 2;
    const aChouette = annee >= 3;
    const aBalai = annee >= 4;
    const aPatronus = p.xp >= 1400;

    return '' +
    '<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar de sorcier">' +
      (aPatronus ? '<ellipse cx="100" cy="140" rx="92" ry="104" fill="#bfe9ff" opacity="0.35"/>' : '') +
      '<path d="M58 232 Q58 132 100 120 Q142 132 142 232 Z" fill="' + m.principale + '"/>' +
      '<rect x="80" y="116" width="40" height="14" rx="3" fill="' + m.secondaire + '"/>' +
      '<rect x="94" y="124" width="12" height="74" rx="3" fill="' + m.secondaire + '"/>' +
      '<rect x="94" y="140" width="12" height="8" fill="' + m.principale + '"/>' +
      '<rect x="94" y="164" width="12" height="8" fill="' + m.principale + '"/>' +
      '<circle cx="100" cy="94" r="26" fill="#f2c9a0"/>' +
      '<circle cx="91" cy="93" r="7" fill="none" stroke="#333" stroke-width="2"/>' +
      '<circle cx="109" cy="93" r="7" fill="none" stroke="#333" stroke-width="2"/>' +
      '<line x1="98" y1="93" x2="102" y2="93" stroke="#333" stroke-width="2"/>' +
      '<path d="M68 80 L100 18 L132 80 Z" fill="#2b2440"/>' +
      '<ellipse cx="100" cy="82" rx="44" ry="10" fill="#2b2440"/>' +
      '<path d="M92 55 L108 50 L104 66 Z" fill="' + m.secondaire + '"/>' +
      (aBaguette ? '<line x1="140" y1="150" x2="176" y2="108" stroke="#6b4a2b" stroke-width="4" stroke-linecap="round"/><circle cx="176" cy="108" r="4" fill="#fff3b0"/>' : '') +
      (aLivre ? '<rect x="22" y="150" width="34" height="26" rx="3" fill="#5b3a29"/><rect x="26" y="154" width="26" height="18" fill="#e8dcc0"/><line x1="39" y1="154" x2="39" y2="172" stroke="#5b3a29" stroke-width="2"/>' : '') +
      (aChouette ? '<g transform="translate(150 44)"><ellipse cx="0" cy="0" rx="13" ry="16" fill="#cdbfa5"/><circle cx="-5" cy="-3" r="3" fill="#3a2a1a"/><circle cx="5" cy="-3" r="3" fill="#3a2a1a"/><path d="M-3 2 L3 2 L0 7 Z" fill="#e0a030"/><path d="M-11 -12 L-6 -6" stroke="#8a7a5a" stroke-width="3"/><path d="M11 -12 L6 -6" stroke="#8a7a5a" stroke-width="3"/></g>' : '') +
      (aBalai ? '<g transform="rotate(18 40 214)"><line x1="16" y1="216" x2="70" y2="196" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/><path d="M70 196 l24 -7 -5 15 -16 7 z" fill="#c98a3c"/></g>' : '') +
    '</svg>';
  }

  /* ===========================================================================
     5. SONS (petits bips, sans fichier)
     =========================================================================== */

  let audioCtx = null;
  function bip(type) {
    if (!sauvegarde.reglages.sons) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g); g.connect(audioCtx.destination);
      const t = audioCtx.currentTime;
      if (type === "bon") { o.frequency.setValueAtTime(660, t); o.frequency.setValueAtTime(990, t + 0.09); }
      else if (type === "palier") { o.frequency.setValueAtTime(523, t); o.frequency.setValueAtTime(784, t + 0.1); o.frequency.setValueAtTime(1046, t + 0.2); }
      else { o.frequency.setValueAtTime(220, t); o.frequency.setValueAtTime(160, t + 0.12); }
      g.gain.setValueAtTime(0.14, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (type === "palier" ? 0.4 : 0.22));
      o.start(t);
      o.stop(t + (type === "palier" ? 0.42 : 0.24));
    } catch (e) { /* pas de son, tant pis */ }
  }

  /* ===========================================================================
     6. DÉCOR : étoiles et bougies volantes
     =========================================================================== */

  function decorerCiel() {
    const ciel = document.getElementById("ciel");
    if (!ciel) return;
    for (let i = 0; i < 60; i++) {
      const e = document.createElement("span");
      e.className = "etoile";
      e.style.left = Math.random() * 100 + "%";
      e.style.top = Math.random() * 62 + "%";
      e.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      ciel.appendChild(e);
    }
    for (let i = 0; i < 7; i++) {
      const b = document.createElement("span");
      b.className = "bougie";
      b.style.left = (8 + Math.random() * 84) + "%";
      b.style.top = (28 + Math.random() * 46) + "%";
      b.style.animationDelay = (Math.random() * 9).toFixed(2) + "s";
      ciel.appendChild(b);
    }
  }

  /* ===========================================================================
     6bis. CÉLÉBRATION (fin d'entraînement, récompense débloquée)
     =========================================================================== */

  function reduireAnimations() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // opts : { grand:bool, titre:string, sousTitre:string }
  //  - grand=false : simple gerbe d'étincelles (fin d'entraînement sans récompense)
  //  - grand=true  : voile sombre + grand titre + gerbe large (récompense débloquée)
  function celebrer(opts) {
    opts = opts || {};
    bip(opts.grand ? "palier" : "bon");
    if (reduireAnimations()) return;

    const vieux = document.getElementById("celebration");
    if (vieux) vieux.remove();

    const c = document.createElement("div");
    c.id = "celebration";
    c.setAttribute("aria-hidden", "true");
    if (opts.grand) c.classList.add("grand");

    if (opts.grand) {
      const halo = document.createElement("div");
      halo.className = "halo";
      c.appendChild(halo);

      const titre = document.createElement("div");
      titre.className = "titre-celeb";
      titre.textContent = opts.titre || "Bravo !";
      c.appendChild(titre);

      if (opts.sousTitre) {
        const st = document.createElement("div");
        st.className = "sous-titre-celeb";
        st.textContent = opts.sousTitre;
        c.appendChild(st);
      }
    }

    const emojis = opts.grand
      ? ["✨", "⭐", "🌟", "⚡", "🎉", "🪄"]
      : ["✨", "⭐", "🌟"];
    const nb = opts.grand ? 76 : 44;
    for (let i = 0; i < nb; i++) {
      const p = document.createElement("span");
      p.className = "particule";
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * (opts.grand ? 480 : 320);
      p.style.setProperty("--dx", (Math.cos(angle) * dist).toFixed(0) + "px");
      p.style.setProperty("--dy", (Math.sin(angle) * dist - 40).toFixed(0) + "px");
      p.style.setProperty("--rot", (Math.random() * 720 - 360).toFixed(0) + "deg");
      p.style.setProperty("--dur", (1 + Math.random() * (opts.grand ? 1.5 : 1)).toFixed(2) + "s");
      p.style.setProperty("--del", (Math.random() * 0.35).toFixed(2) + "s");
      p.style.fontSize = (14 + Math.random() * 18).toFixed(0) + "px";
      c.appendChild(p);
    }

    document.body.appendChild(c);
    requestAnimationFrame(() => c.classList.add("on"));
    setTimeout(() => c.remove(), opts.grand ? 3200 : 1900);
  }

  /* ===========================================================================
     7. NAVIGATION ENTRE ÉCRANS
     =========================================================================== */

  const ecrans = document.querySelectorAll(".ecran");
  const boutonsNav = document.querySelectorAll("nav [data-aller]");
  const ECRANS_JOUEUR = ["ecran-accueil", "ecran-quiz", "ecran-resultat", "ecran-progression"];

  function montrer(idEcran) {
    // Les écrans de jeu exigent une fiche active complète.
    if (ECRANS_JOUEUR.indexOf(idEcran) !== -1 && (!etat || !etat.maison)) {
      idEcran = sauvegarde.profils.length ? "ecran-profils" : "ecran-creation";
      if (idEcran === "ecran-creation" && !profilEnCreation) profilEnCreation = profilVierge("");
    }
    ecrans.forEach(e => e.classList.toggle("actif", e.id === idEcran));
    boutonsNav.forEach(b => b.classList.toggle("actif", b.dataset.aller === idEcran));
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (idEcran === "ecran-profils") rendreProfils();
    if (idEcran === "ecran-creation") rendreCreation();
    if (idEcran === "ecran-accueil") rendreAccueil();
    if (idEcran === "ecran-progression") rendreProgression();
  }

  boutonsNav.forEach(b => b.addEventListener("click", () => montrer(b.dataset.aller)));

  function appliquerCouleursMaison(maison) {
    const m = MAISONS[maison] || MAISONS.gryffondor;
    document.documentElement.style.setProperty("--maison-principale", m.principale);
    document.documentElement.style.setProperty("--maison-secondaire", m.secondaire);
  }

  /* ===========================================================================
     8. ÉCRAN « QUI JOUE ? » (liste des enfants)
     =========================================================================== */

  function rendreProfils() {
    const boite = document.getElementById("contenu-profils");
    const profils = sauvegarde.profils;

    let html = '<h2 class="centre">Qui joue aujourd\'hui&nbsp;?</h2>';
    if (!profils.length) {
      html += '<p class="centre">Aucun sorcier pour l\'instant. Crée le premier&nbsp;!</p>';
    }
    html += '<div class="grille-profils" id="grille-profils">';
    profils.forEach(p => {
      const m = MAISONS[p.maison] || MAISONS.gryffondor;
      const annee = anneeActuelle(p.xp);
      html +=
        '<div class="profil-carte" data-id="' + p.id + '">' +
          '<button class="pc-suppr" data-suppr="' + p.id + '" title="Supprimer">✕</button>' +
          '<div class="pc-avatar">' + avatarSVG(p) + '</div>' +
          '<div class="pc-nom">' + (escapeHtml(p.nom) || "Sans nom") + '</div>' +
          '<div class="pc-info">' + m.embleme + ' ' + m.nom + '</div>' +
          '<div class="pc-info">Année ' + annee.num + ' · ' + p.xp + ' pts</div>' +
        '</div>';
    });
    html +=
      '<div class="profil-carte nouveau" id="carte-nouveau">' +
        '<span class="plus">＋</span><span>Nouveau sorcier</span>' +
      '</div>' +
    '</div>';

    html +=
      '<div class="rangee-actions">' +
        (profils.length ? '<button class="secondaire" id="btn-gerer">✎ Gérer / supprimer</button>' : '') +
        '<button class="secondaire" id="btn-exporter">💾 Exporter les sauvegardes</button>' +
        '<button class="secondaire" id="btn-importer">📂 Importer</button>' +
        '<input type="file" id="fichier-import" accept="application/json,.json" hidden>' +
      '</div>' +
      (memoireSeule
        ? '<p class="note">⚠️ Ce navigateur n\'autorise pas l\'enregistrement local : la progression sera perdue en fermant l\'onglet. Utilise l\'adresse en ligne (https) plutôt qu\'un fichier ouvert directement.</p>'
        : '<p class="note">Les fiches sont enregistrées sur cet appareil. « Exporter » crée un fichier de sauvegarde à recharger sur un autre appareil.</p>');

    boite.innerHTML = html;

    boite.querySelectorAll(".profil-carte[data-id]").forEach(c => {
      c.addEventListener("click", e => {
        if (e.target.closest(".pc-suppr")) return;
        choisirProfil(c.dataset.id);
      });
    });
    boite.querySelectorAll("[data-suppr]").forEach(b => {
      b.addEventListener("click", () => supprimerProfil(b.dataset.suppr));
    });
    document.getElementById("carte-nouveau").addEventListener("click", demarrerCreation);

    const btnGerer = document.getElementById("btn-gerer");
    if (btnGerer) btnGerer.addEventListener("click", () => {
      document.getElementById("grille-profils").classList.toggle("gestion");
    });

    document.getElementById("btn-exporter").addEventListener("click", exporterSauvegardes);
    const fichier = document.getElementById("fichier-import");
    document.getElementById("btn-importer").addEventListener("click", () => fichier.click());
    fichier.addEventListener("change", importerSauvegardes);
  }

  function choisirProfil(id) {
    sauvegarde.profilActifId = id;
    etat = profilActif();
    sauver();
    appliquerCouleursMaison(etat.maison);
    montrer("ecran-accueil");
  }

  function supprimerProfil(id) {
    const p = sauvegarde.profils.find(x => x.id === id);
    if (!p) return;
    if (!confirm('Supprimer définitivement la fiche de « ' + (p.nom || "ce sorcier") + ' » ?\nToute sa progression sera perdue.')) return;
    sauvegarde.profils = sauvegarde.profils.filter(x => x.id !== id);
    if (sauvegarde.profilActifId === id) sauvegarde.profilActifId = null;
    etat = profilActif();
    sauver();
    rendreProfils();
  }

  /* ===========================================================================
     9. CRÉATION D'UN SORCIER
     =========================================================================== */

  function demarrerCreation() {
    profilEnCreation = profilVierge("");
    montrer("ecran-creation");
  }

  function rendreCreation() {
    if (!profilEnCreation) profilEnCreation = profilVierge("");
    const boite = document.getElementById("contenu-creation");
    boite.innerHTML =
      '<h2>Un nouveau sorcier arrive à Poudlard</h2>' +
      '<p><label>Son prénom :<br>' +
      '<input class="champ-nom" id="saisie-nom" maxlength="20" placeholder="Ex : Léa" value="' + escapeHtml(profilEnCreation.nom) + '"></label></p>' +
      '<button class="gros plein-large" id="btn-choixpeau">🎩 Laisser le Choixpeau répartir</button>' +
      '<p class="note">…ou choisir directement la maison :</p>' +
      '<div class="grille-maisons">' +
        Object.keys(MAISONS).map(k =>
          '<button data-maison="' + k + '"><span class="embleme">' + MAISONS[k].embleme + '</span>' + MAISONS[k].nom + '</button>'
        ).join('') +
      '</div>' +
      (sauvegarde.profils.length ? '<button class="lien-changer" id="btn-annuler-creation">← Retour à la liste</button>' : '');

    const champNom = document.getElementById("saisie-nom");

    document.getElementById("btn-choixpeau").addEventListener("click", () => {
      profilEnCreation.nom = (champNom.value || "").trim();
      choixpeauCible = "creation";
      lancerChoixpeau();
    });
    boite.querySelectorAll("[data-maison]").forEach(b => b.addEventListener("click", () => {
      profilEnCreation.nom = (champNom.value || "").trim();
      finaliserCreation(b.dataset.maison);
    }));
    const annuler = document.getElementById("btn-annuler-creation");
    if (annuler) annuler.addEventListener("click", () => { profilEnCreation = null; montrer("ecran-profils"); });
  }

  function finaliserCreation(maison) {
    profilEnCreation.nom = profilEnCreation.nom || "Sorcier";
    profilEnCreation.maison = maison;
    sauvegarde.profils.push(profilEnCreation);
    sauvegarde.profilActifId = profilEnCreation.id;
    etat = profilEnCreation;
    profilEnCreation = null;
    sauver();
    appliquerCouleursMaison(etat.maison);
    montrer("ecran-accueil");
  }

  /* ===========================================================================
     10. ÉCRAN ACCUEIL (entraînements)
     =========================================================================== */

  function rendreAccueil() {
    const boite = document.getElementById("contenu-accueil");
    const m = MAISONS[etat.maison];
    const annee = anneeActuelle(etat.xp);
    const prog = progressionVersProchain(etat.xp);
    appliquerCouleursMaison(etat.maison);

    boite.innerHTML =
      '<div class="bandeau-joueur">' +
        '<div class="mini-avatar">' + avatarSVG(etat) + '</div>' +
        '<div class="infos">' +
          '<strong>' + (escapeHtml(etat.nom) || "Sorcier·ère") + '</strong> — ' + m.embleme + ' ' + m.nom +
          '<div class="annee">Année ' + annee.num + ' · ' + escapeHtml(annee.titre) + '</div>' +
          '<div class="barre-xp"><span style="width:' + prog.pourcent + '%"></span></div>' +
          '<div class="xp-texte">' + prog.texte + '</div>' +
        '</div>' +
      '</div>' +
      '<button class="lien-changer" id="btn-changer-sorcier">↔ Changer de sorcier</button>' +
      '<h2 style="margin-top:14px">Choisis ton entraînement</h2>' +
      '<p class="consigne">Une session = ' + QUESTIONS_PAR_SESSION + ' questions courtes. Les questions déjà réussies ne reviennent pas.</p>' +
      '<div class="liste-themes" id="liste-themes"></div>' +
      '<p class="note">Période en cours : ' + escapeHtml(PERIODES.periode1.titre) + '</p>';

    document.getElementById("btn-changer-sorcier").addEventListener("click", () => montrer("ecran-profils"));

    const liste = document.getElementById("liste-themes");
    const periode = PERIODES.periode1;

    const totalPeriode = collecterQuestions(periode.themes);
    const restantPeriode = totalPeriode.filter(q => !estReussie(q)).length;
    const btnMelange = document.createElement("button");
    btnMelange.className = "melange";
    btnMelange.innerHTML = "🎲 Mélange surprise " +
      "<span class='note'>(" + restantPeriode + " question" + (restantPeriode > 1 ? "s" : "") + " à découvrir)</span>";
    btnMelange.addEventListener("click", () => demarrerSession(periode.themes));
    liste.appendChild(btnMelange);

    periode.themes.forEach(theme => {
      const total = theme.questions.length;
      const restant = collecterQuestions([theme]).filter(q => !estReussie(q)).length;
      const b = document.createElement("button");
      b.innerHTML = "📘 " + escapeHtml(theme.titre) + " <span class='note'>(" +
        (restant === 0 ? "✅ tout réussi" : restant + " / " + total + " à découvrir") + ")</span>";
      b.addEventListener("click", () => demarrerSession([theme]));
      liste.appendChild(b);
    });
  }

  /* ===========================================================================
     11. LE CHOIXPEAU
     =========================================================================== */

  let choixpeauScores = null;
  let choixpeauIndex = 0;

  function lancerChoixpeau() {
    choixpeauScores = { gryffondor: 0, serdaigle: 0, poufsouffle: 0, serpentard: 0 };
    choixpeauIndex = 0;
    montrer("ecran-choixpeau");
    rendreQuestionChoixpeau();
  }

  function rendreQuestionChoixpeau() {
    const boite = document.getElementById("contenu-choixpeau");
    const item = CHOIXPEAU[choixpeauIndex];
    boite.innerHTML =
      '<p class="quiz-haut"><span>Question ' + (choixpeauIndex + 1) + ' / ' + CHOIXPEAU.length + '</span></p>' +
      '<p class="phrase-question">' + escapeHtml(item.q) + '</p>' +
      '<div class="zone-choix" id="choix-choixpeau"></div>';
    const zone = document.getElementById("choix-choixpeau");
    item.r.forEach(rep => {
      const b = document.createElement("button");
      b.textContent = rep.t;
      b.style.minWidth = "100%";
      b.style.textAlign = "left";
      b.addEventListener("click", () => {
        choixpeauScores[rep.m] += 1;
        choixpeauIndex += 1;
        if (choixpeauIndex < CHOIXPEAU.length) rendreQuestionChoixpeau();
        else terminerChoixpeau();
      });
      zone.appendChild(b);
    });
  }

  function terminerChoixpeau() {
    let meilleure = "gryffondor";
    for (const k in choixpeauScores) if (choixpeauScores[k] > choixpeauScores[meilleure]) meilleure = k;
    const m = MAISONS[meilleure];
    const boite = document.getElementById("contenu-choixpeau");
    boite.innerHTML =
      '<div class="deblocage"><div class="grand">' + m.embleme + '</div>' +
      '<p>Le Choixpeau a décidé : <strong>' + m.nom + '</strong> !</p></div>' +
      '<div class="boutons-fin">' +
      '<button class="gros" id="btn-accepte-maison">Rejoindre ' + m.nom + '</button>' +
      '<button class="secondaire" id="btn-recommence-choixpeau">Recommencer le test</button>' +
      '</div>';
    document.getElementById("btn-accepte-maison").addEventListener("click", () => appliquerMaisonChoixpeau(meilleure));
    document.getElementById("btn-recommence-choixpeau").addEventListener("click", lancerChoixpeau);
    document.querySelectorAll("#contenu-choixpeau .deblocage").forEach(el => el.classList.add("fanfare"));
    celebrer({ grand: true, titre: m.nom + " " + m.embleme, sousTitre: "Bienvenue dans ta maison !" });
  }

  function appliquerMaisonChoixpeau(maison) {
    if (choixpeauCible === "resort" && etat) {
      etat.maison = maison;
      sauver();
      appliquerCouleursMaison(maison);
      montrer("ecran-progression");
    } else {
      finaliserCreation(maison);
    }
  }

  /* ===========================================================================
     12. SESSION DE QUIZ
     =========================================================================== */

  let session = null;

  function collecterQuestions(themes) {
    const tout = [];
    themes.forEach(t => t.questions.forEach(q =>
      tout.push(Object.assign({ _theme: t.titre, _themeId: t.id }, q))));
    return tout;
  }

  function melanger(tab) {
    const a = tab.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // themes = tableau de thèmes (voir PERIODES). On enlève les questions déjà
  // réussies, on vise environ 1/3 de questions "lentes" (cahier / tableau), et
  // on ne rallonge jamais la session en répétant des questions.
  const TYPES_LENTS = ["cahier", "tableau"];
  function demarrerSession(themes) {
    const toutes = collecterQuestions(themes);
    let dispo = toutes.filter(q => !estReussie(q));

    if (dispo.length === 0) {
      const ok = confirm(
        "Bravo ! Toutes les questions de cette sélection ont déjà été réussies.\n\n" +
        "Veux-tu les revoir toutes depuis le début ?");
      if (!ok) return;
      toutes.forEach(q => { delete etat.reussies[cleQuestion(q)]; });
      sauver();
      dispo = toutes.slice();
    }

    const cible = Math.min(QUESTIONS_PAR_SESSION, dispo.length);
    const nbLentsVoulu = Math.round(cible / 3);

    const lents = melanger(dispo.filter(q => TYPES_LENTS.indexOf(q.type) !== -1));
    const autres = melanger(dispo.filter(q => TYPES_LENTS.indexOf(q.type) === -1));

    const nbLents = Math.min(nbLentsVoulu, lents.length);
    let choisies = lents.slice(0, nbLents).concat(autres.slice(0, cible - nbLents));
    if (choisies.length < cible) {
      const reste = dispo.filter(q => choisies.indexOf(q) === -1);
      choisies = choisies.concat(melanger(reste).slice(0, cible - choisies.length));
    }
    choisies = melanger(choisies);

    session = {
      questions: choisies,
      index: 0,
      bonnes: 0,
      serie: 0,
      serieMax: 0,
      xpGagne: 0,
      xpAvant: etat.xp,
      repondu: false,
    };
    montrer("ecran-quiz");
    rendreQuestion();
  }

  const elCompteur = document.getElementById("quiz-compteur");
  const elSerie = document.getElementById("quiz-serie");
  const elBarre = document.getElementById("quiz-barre-progression");
  const elConsigne = document.getElementById("quiz-consigne");
  const elPhrase = document.getElementById("quiz-phrase");
  const elZone = document.getElementById("quiz-zone-reponse");
  const elRetour = document.getElementById("quiz-retour");
  const elContinuer = document.getElementById("quiz-continuer");

  function rendreQuestion() {
    session.repondu = false;
    const q = session.questions[session.index];

    elCompteur.textContent = "Question " + (session.index + 1) + " / " + session.questions.length;
    elBarre.style.width = Math.round((session.index / session.questions.length) * 100) + "%";
    elSerie.textContent = "🔥 série " + session.serie;
    elSerie.classList.toggle("inactive", session.serie < 2);

    elConsigne.textContent = q.consigne || "";
    elPhrase.innerHTML = q.phrase ? phraseAvecTrou(q.phrase) : "";
    elPhrase.hidden = !q.phrase;

    elRetour.hidden = true;
    elRetour.innerHTML = "";
    elContinuer.hidden = true;
    elContinuer.disabled = false;
    elZone.innerHTML = "";

    if (q.type === "qcm") rendreQCM(q);
    else if (q.type === "cahier") rendreCahier(q);
    else if (q.type === "tableau") rendreTableau(q);
    else if (q.type === "erreur") rendreErreur(q);
    else rendreSaisie(q);
  }

  // Conjugaison complète en une ligne : "je chante, tu chantes, il chante…"
  function conjugaisonEnLigne(formes) {
    return formes.map(f => {
      const forme = f.forme != null ? f.forme : (f.debut + f.fin);
      return f.pron + (/['’]$/.test(f.pron) ? "" : " ") + forme;
    }).join(", ") + ".";
  }

  function phraseAvecTrou(phrase) {
    const p = escapeHtml(phrase || "");
    return p.replace(/…/g, '<span class="trou-vide">?</span>');
  }

  function rendreCahier(q) {
    const wrap = document.createElement("div");
    wrap.className = "zone-cahier";
    wrap.innerHTML =
      '<div class="cahier-consigne-ecrire">✍️ Écris ta réponse sur ton cahier, puis regarde la correction.</div>' +
      '<button class="gros" id="btn-voir-correction">Voir la correction</button>' +
      '<div id="bloc-correction" hidden>' +
        '<div class="correction-box"><span class="etiq">Correction</span>' +
        '<span class="texte">' + escapeHtml(q.correction || "") + '</span></div>' +
        '<p class="consigne">Compare avec ton cahier. Alors ?</p>' +
        '<div class="auto-eval">' +
          '<button class="gros btn-oui" id="btn-cahier-oui">✅ J\'avais tout bon</button>' +
          '<button class="gros btn-non" id="btn-cahier-non">✏️ J\'avais une erreur</button>' +
        '</div>' +
      '</div>';
    elZone.appendChild(wrap);

    const btnOui = document.getElementById("btn-cahier-oui");
    const btnNon = document.getElementById("btn-cahier-non");

    document.getElementById("btn-voir-correction").addEventListener("click", function () {
      this.hidden = true;
      document.getElementById("bloc-correction").hidden = false;
      // Anti-saut : on laisse le temps de comparer avant d'autoriser l'auto-évaluation.
      btnOui.disabled = true; btnNon.disabled = true;
      setTimeout(() => { btnOui.disabled = false; btnNon.disabled = false; }, 600);
    });
    btnOui.addEventListener("click", () => {
      if (session.repondu || btnOui.disabled) return;
      wrap.querySelectorAll("button").forEach(b => b.disabled = true);
      finaliserReponse(q, true, { montrerReponse: false });
    });
    btnNon.addEventListener("click", () => {
      if (session.repondu || btnNon.disabled) return;
      wrap.querySelectorAll("button").forEach(b => b.disabled = true);
      finaliserReponse(q, false, { montrerReponse: false });
    });
  }

  /* --- Type "tableau" : compléter une conjugaison complète -------------------
     q.verbe : "chanter"
     q.formes : 6 entrées dans l'ordre je / tu / il / nous / vous / ils
       - fixe  : { pron: "je", forme: "chante" }
       - trou  : { pron: "tu", debut: "chant", fin: "es" }   (debut peut être "")
  ------------------------------------------------------------------------------ */
  function rendreTableau(q) {
    const wrap = document.createElement("div");
    wrap.className = "zone-tableau";

    const titre = document.createElement("div");
    titre.className = "tab-titre";
    titre.textContent = "Le verbe « " + q.verbe + " » au présent";
    wrap.appendChild(titre);

    const grille = document.createElement("div");
    grille.className = "tab-grille";
    q.formes.forEach((f, i) => {
      const cellePron = document.createElement("div");
      cellePron.className = "pron";
      cellePron.textContent = f.pron;
      grille.appendChild(cellePron);

      const celleForme = document.createElement("div");
      celleForme.className = "forme";
      if (f.fin == null) {
        celleForme.textContent = f.forme;
      } else {
        if (f.debut) {
          const rad = document.createElement("span");
          rad.className = "radical";
          rad.textContent = f.debut;
          celleForme.appendChild(rad);
        }
        const inp = document.createElement("input");
        inp.type = "text";
        inp.autocomplete = "off";
        inp.autocapitalize = "off";
        inp.spellcheck = false;
        inp.dataset.i = i;
        inp.setAttribute("aria-label", f.pron);
        celleForme.appendChild(inp);
      }
      grille.appendChild(celleForme);
    });
    wrap.appendChild(grille);

    const accents = document.createElement("div");
    accents.className = "accents";
    ["é", "è", "ê", "à", "â", "î", "ï", "ç", "œ", "’"].forEach(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = c;
      b.addEventListener("click", () => {
        const inp = wrap.querySelector("input:focus") || wrap.querySelector("input:not([disabled])");
        if (!inp) return;
        const d = inp.selectionStart, fi = inp.selectionEnd;
        inp.value = inp.value.slice(0, d) + c + inp.value.slice(fi);
        inp.focus();
        inp.selectionStart = inp.selectionEnd = d + 1;
      });
      accents.appendChild(b);
    });
    wrap.appendChild(accents);

    const valider = document.createElement("button");
    valider.className = "gros";
    valider.textContent = "Valider";
    valider.addEventListener("click", () => {
      if (session.repondu) return;
      validerTableau(q, wrap);
    });
    wrap.appendChild(valider);

    elZone.appendChild(wrap);
    wrap.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); valider.click(); }
    });
    const premier = wrap.querySelector("input");
    if (premier) setTimeout(() => premier.focus(), 50);
  }

  function validerTableau(q, wrap) {
    let toutJuste = true;
    wrap.querySelectorAll("input").forEach(inp => {
      const f = q.formes[+inp.dataset.i];
      const saisi = inp.value.trim();
      const ok = normalise(saisi) === normalise(f.fin) ||
                 normalise(saisi) === normalise((f.debut || "") + f.fin);
      inp.disabled = true;
      inp.classList.add(ok ? "juste" : "faux");
      if (!ok) {
        toutJuste = false;
        const corr = document.createElement("span");
        corr.className = "tab-corrige";
        corr.textContent = "→ " + (f.debut || "") + f.fin;
        inp.parentNode.appendChild(corr);
      }
    });
    wrap.querySelectorAll(".accents, button.gros").forEach(el => el.hidden = true);

    const ligne = document.createElement("div");
    ligne.className = "tab-complet";
    ligne.textContent = conjugaisonEnLigne(q.formes);
    wrap.appendChild(ligne);

    finaliserReponse(q, toutJuste, { detailFaux: "Compare avec la conjugaison complète ci-dessus." });
  }

  /* --- Type "erreur" : trouver la forme mal écrite --------------------------
     q.verbe, q.formes : liste des 6 formes complètes (chaînes),
     q.fausse : la forme incorrecte (présente dans q.formes),
     q.correcte : sa correction.
  ------------------------------------------------------------------------------ */
  function rendreErreur(q) {
    const wrap = document.createElement("div");
    wrap.className = "zone-erreur";

    const titre = document.createElement("div");
    titre.className = "tab-titre";
    titre.textContent = "Le verbe « " + q.verbe + " » au présent";
    wrap.appendChild(titre);

    q.formes.forEach(forme => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = forme;
      b.addEventListener("click", () => {
        if (session.repondu) return;
        validerErreur(q, forme, b, wrap);
      });
      wrap.appendChild(b);
    });
    elZone.appendChild(wrap);
  }

  function validerErreur(q, forme, btn, wrap) {
    const juste = normalise(forme) === normalise(q.fausse);
    wrap.querySelectorAll("button").forEach(b => {
      b.disabled = true;
      if (normalise(b.textContent) === normalise(q.fausse)) {
        b.classList.add("faute");
        const fl = document.createElement("span");
        fl.className = "fleche-corr";
        fl.textContent = "→ " + q.correcte;
        b.after(fl);
      }
    });
    if (juste) btn.classList.add("trouve");

    const ligne = document.createElement("div");
    ligne.className = "tab-complet";
    ligne.textContent = "Conjugaison correcte : " +
      q.formes.map(f => normalise(f) === normalise(q.fausse) ? q.correcte : f).join(", ") + ".";
    wrap.appendChild(ligne);

    finaliserReponse(q, juste, {
      detailFaux: "La forme mal écrite était « " + q.fausse + " » → il faut écrire « " + q.correcte + " »."
    });
  }

  function rendreQCM(q) {
    const zone = document.createElement("div");
    zone.className = "zone-choix";
    melanger(q.choix).forEach(choix => {
      const b = document.createElement("button");
      b.textContent = choix;
      b.addEventListener("click", () => validerReponse(q, choix, b));
      zone.appendChild(b);
    });
    elZone.appendChild(zone);
  }

  function rendreSaisie(q) {
    const wrap = document.createElement("div");
    wrap.className = "zone-saisie";

    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Ta réponse");
    wrap.appendChild(input);

    const accents = document.createElement("div");
    accents.className = "accents";
    ["é", "è", "ê", "à", "â", "î", "ï", "ç", "œ", "’"].forEach(c => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = c;
      b.addEventListener("click", () => {
        const deb = input.selectionStart, fin = input.selectionEnd;
        input.value = input.value.slice(0, deb) + c + input.value.slice(fin);
        input.focus();
        input.selectionStart = input.selectionEnd = deb + 1;
      });
      accents.appendChild(b);
    });
    wrap.appendChild(accents);

    const valider = document.createElement("button");
    valider.className = "gros";
    valider.textContent = "Valider";
    valider.addEventListener("click", () => {
      if (session.repondu) return;
      const rep = input.value.trim();
      if (!rep) { input.focus(); return; }
      validerReponse(q, rep, null);
    });
    wrap.appendChild(valider);

    elZone.appendChild(wrap);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); valider.click(); }
    });
    setTimeout(() => input.focus(), 50);
  }

  function normalise(s) {
    return String(s).toLowerCase().trim()
      .replace(/’/g, "'")
      .replace(/\s+/g, " ")
      .replace(/[.!?;:]+$/, "");
  }

  function estCorrecte(q, reponseDonnee) {
    const attendues = (q.reponses && q.reponses.length ? q.reponses : [q.reponse]).map(normalise);
    return attendues.indexOf(normalise(reponseDonnee)) !== -1;
  }

  // Pour les QCM et les questions à écrire au clavier.
  function validerReponse(q, reponseDonnee, boutonClique) {
    if (session.repondu) return;
    const juste = estCorrecte(q, reponseDonnee);

    elZone.querySelectorAll("button").forEach(b => b.disabled = true);
    if (q.type === "qcm") {
      elZone.querySelectorAll(".zone-choix button").forEach(b => {
        if (normalise(b.textContent) === normalise(q.reponse)) b.classList.add("juste");
        else if (b === boutonClique) b.classList.add("faux");
      });
    } else {
      const input = elZone.querySelector("input");
      if (input) { input.disabled = true; input.classList.add(juste ? "juste" : "faux"); }
      const aides = elZone.querySelector(".accents");
      if (aides) aides.hidden = true;
      elZone.querySelectorAll(".zone-saisie > button.gros").forEach(b => b.hidden = true);
    }

    finaliserReponse(q, juste, { montrerReponse: true });
  }

  // Étape commune : score, points, retenue de la réussite, message, suite.
  function finaliserReponse(q, juste, opts) {
    if (session.repondu) return;
    session.repondu = true;
    opts = opts || {};
    etat.totalReponses += 1;

    if (juste) {
      session.bonnes += 1;
      etat.bonnesReponses += 1;
      session.serie += 1;
      session.serieMax = Math.max(session.serieMax, session.serie);
      etat.meilleureSerie = Math.max(etat.meilleureSerie, session.serie);
      etat.reussies[cleQuestion(q)] = true;   // ne sera plus reposée

      const bonus = bonusSerie(session.serie);
      const gain = XP_BONNE_REPONSE + bonus;
      session.xpGagne += gain;
      etat.xp += gain;

      elRetour.className = "retour bon";
      elRetour.innerHTML =
        '<div class="titre-retour">✨ Bravo !</div>' +
        (q.explication ? '<div>' + escapeHtml(q.explication) + '</div>' : '') +
        '<div class="gain">+' + XP_BONNE_REPONSE + ' points' +
        (bonus ? ' &nbsp;·&nbsp; série ×' + session.serie + ' : +' + bonus + ' bonus !' : '') + '</div>';
      bip("bon");
    } else {
      session.serie = 0;
      let corps;
      if (opts.montrerReponse) {
        corps = '<div>La bonne réponse était : <strong>' + escapeHtml(q.reponse) + '</strong></div>';
      } else if (opts.detailFaux) {
        corps = '<div>' + escapeHtml(opts.detailFaux) + '</div>';
      } else {
        corps = '<div>Cet exercice te sera reproposé une prochaine fois.</div>';
      }
      elRetour.className = "retour mauvais";
      elRetour.innerHTML =
        '<div class="titre-retour">' + (opts.montrerReponse ? "Presque !" : "Ce n'est pas grave !") + '</div>' +
        corps +
        (q.explication ? '<div>' + escapeHtml(q.explication) + '</div>' : '');
      bip("faux");
    }

    sauver();

    elSerie.textContent = "🔥 série " + session.serie;
    elSerie.classList.toggle("inactive", session.serie < 2);
    elRetour.hidden = false;
    elContinuer.textContent = (session.index + 1 < session.questions.length) ? "Continuer" : "Voir mon résultat";
    elContinuer.hidden = false;

    // Anti-saut : on empêche un appui « réflexe » (Entrée ou double-clic)
    // de passer à la question suivante avant d'avoir vu la correction.
    elContinuer.disabled = true;
    setTimeout(() => { elContinuer.disabled = false; }, 600);

    // On amène le bouton à l'écran s'il est hors champ (utile sur téléphone).
    if (elContinuer.scrollIntoView) elContinuer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  elContinuer.addEventListener("click", () => {
    if (!session || !session.repondu || elContinuer.disabled) return;
    session.index += 1;
    if (session.index < session.questions.length) rendreQuestion();
    else terminerSession();
  });

  /* ===========================================================================
     13. ÉCRAN RÉSULTAT
     =========================================================================== */

  function terminerSession() {
    const anneeAvant = anneeActuelle(session.xpAvant).num;
    const anneeApres = anneeActuelle(etat.xp).num;
    const sortsAvant = sortsDebloques(session.xpAvant).map(s => s.id);
    const nouveauxSorts = sortsDebloques(etat.xp).filter(s => sortsAvant.indexOf(s.id) === -1);

    document.getElementById("resultat-score").textContent = session.bonnes + " / " + session.questions.length;
    document.getElementById("resultat-lignes").innerHTML =
      '<p><strong>+' + session.xpGagne + '</strong> points de magie gagnés</p>' +
      '<p>Meilleure série : <strong>' + session.serieMax + '</strong> 🔥</p>';

    const zoneDeb = document.getElementById("resultat-deblocages");
    zoneDeb.innerHTML = "";

    const diplome = etat.xp >= DIPLOME_SEUIL && session.xpAvant < DIPLOME_SEUIL;

    if (anneeApres > anneeAvant) {
      const a = ANNEES.find(x => x.num === anneeApres);
      zoneDeb.innerHTML +=
        '<div class="deblocage"><div class="grand">🎓</div>' +
        '<p>Tu passes en <strong>année ' + anneeApres + '</strong> !<br>' + escapeHtml(a.titre) + '</p></div>';
    }
    nouveauxSorts.forEach(s => {
      zoneDeb.innerHTML +=
        '<div class="deblocage"><div class="grand">' + s.embleme + '</div>' +
        '<p>Nouveau sort débloqué : <strong>' + escapeHtml(s.nom) + '</strong><br>' +
        '<span class="note">' + escapeHtml(s.desc) + '</span></p></div>';
    });
    if (diplome) {
      zoneDeb.innerHTML +=
        '<div class="deblocage"><div class="grand">🏰</div><p><strong>Sorcier·ère diplômé·e de Poudlard !</strong> Félicitations !</p></div>';
    }

    montrer("ecran-resultat");

    // --- Animations de félicitations -------------------------------------
    const scoreEl = document.getElementById("resultat-score");
    scoreEl.classList.remove("pop");
    void scoreEl.offsetWidth;               // force le redémarrage de l'animation
    scoreEl.classList.add("pop");

    document.querySelectorAll("#resultat-deblocages .deblocage").forEach((el, i) => {
      el.style.animationDelay = (0.15 + i * 0.35).toFixed(2) + "s, " + (0.45 + i * 0.35).toFixed(2) + "s";
      el.classList.add("fanfare");
    });

    const recompense = anneeApres > anneeAvant || nouveauxSorts.length > 0 || diplome;
    if (recompense) {
      let sous;
      if (diplome) sous = "Sorcier·ère diplômé·e de Poudlard !";
      else if (nouveauxSorts.length) sous = "Nouveau sort : " + nouveauxSorts[0].nom + " " + nouveauxSorts[0].embleme;
      else sous = "Tu passes en année " + anneeApres + " ! 🎓";
      celebrer({ grand: true, titre: "BRAVO ⚡", sousTitre: sous });
    } else {
      const parfait = session.bonnes === session.questions.length;
      celebrer({
        titre: parfait ? "Sans faute ! ✨" : "Bravo !",
        sousTitre: session.bonnes + " / " + session.questions.length + "  ·  +" + session.xpGagne + " points de magie",
      });
    }
  }

  document.getElementById("btn-encore").addEventListener("click", () => montrer("ecran-accueil"));
  document.getElementById("btn-voir-progression").addEventListener("click", () => montrer("ecran-progression"));
  document.getElementById("btn-retour-accueil").addEventListener("click", () => montrer("ecran-accueil"));

  /* ===========================================================================
     14. ÉCRAN PROGRESSION
     =========================================================================== */

  function rendreProgression() {
    const boite = document.getElementById("contenu-progression");
    const m = MAISONS[etat.maison];
    const annee = anneeActuelle(etat.xp);
    const prog = progressionVersProchain(etat.xp);
    const debloques = sortsDebloques(etat.xp).map(s => s.id);
    const precision = etat.totalReponses ? Math.round((etat.bonnesReponses / etat.totalReponses) * 100) : 0;
    const questionsPeriode = collecterQuestions(PERIODES.periode1.themes);
    const nbReussies = questionsPeriode.filter(q => estReussie(q)).length;
    appliquerCouleursMaison(etat.maison);

    boite.innerHTML =
      '<h2 class="centre">' + (escapeHtml(etat.nom) || "Sorcier·ère") + ' — ' + m.embleme + ' ' + m.nom + '</h2>' +
      avatarSVG(etat).replace("<svg ", '<svg class="avatar-grand" ') +
      '<p class="centre titre-annee">Année ' + annee.num + ' · ' + escapeHtml(annee.titre) + '</p>' +
      '<div class="barre-xp"><span style="width:' + prog.pourcent + '%"></span></div>' +
      '<p class="centre note">' + prog.texte + '</p>' +

      '<h2 style="margin-top:20px">Les années de Poudlard</h2>' +
      '<div class="frise">' +
        ANNEES.map(a =>
          '<div class="an ' + (etat.xp >= a.seuil ? (a.num === annee.num ? "actuelle" : "faite") : "") + '">' +
          '<span class="num">' + a.num + '</span>' + a.seuil + ' pts</div>'
        ).join('') +
        '<div class="an ' + (etat.xp >= DIPLOME_SEUIL ? "faite" : "") + '"><span class="num">🎓</span>' + DIPLOME_SEUIL + ' pts</div>' +
      '</div>' +

      '<h2 style="margin-top:16px">Mes sorts</h2>' +
      '<div class="grille-sorts">' +
        SORTS.map(s => {
          const ok = debloques.indexOf(s.id) !== -1;
          return '<div class="sort ' + (ok ? "" : "verrou") + '">' +
            '<div class="grand" style="font-size:1.6rem">' + (ok ? s.embleme : "🔒") + '</div>' +
            '<div class="nom">' + (ok ? escapeHtml(s.nom) : "? ? ?") + '</div>' +
            '<div class="desc">' + (ok ? escapeHtml(s.desc) : "Encore un peu d'entraînement…") + '</div>' +
            '<div class="seuil">' + s.seuil + ' points</div>' +
          '</div>';
        }).join('') +
      '</div>' +

      '<div class="stats-ligne">' +
        '<div class="stat"><strong>' + etat.bonnesReponses + '</strong><span>bonnes réponses</span></div>' +
        '<div class="stat"><strong>' + precision + '%</strong><span>de réussite</span></div>' +
        '<div class="stat"><strong>' + etat.meilleureSerie + '</strong><span>meilleure série</span></div>' +
        '<div class="stat"><strong>' + nbReussies + ' / ' + questionsPeriode.length + '</strong><span>questions maîtrisées</span></div>' +
      '</div>' +

      '<div class="rangee-actions">' +
        '<button class="secondaire" id="btn-changer-sorcier2">↔ Changer de sorcier</button>' +
        '<button class="secondaire" id="btn-resort">🎩 Changer de maison</button>' +
        '<button class="secondaire" id="btn-revoir">🔁 Revoir toutes les questions</button>' +
      '</div>' +

      '<div class="pied">' +
        '<label class="interrupteur"><input type="checkbox" id="chk-sons" ' + (sauvegarde.reglages.sons ? "checked" : "") + '> Sons</label>' +
        '<button class="secondaire danger" id="btn-reset">Remettre à zéro cette fiche</button>' +
      '</div>';

    document.getElementById("btn-changer-sorcier2").addEventListener("click", () => montrer("ecran-profils"));
    document.getElementById("btn-resort").addEventListener("click", () => {
      choixpeauCible = "resort";
      lancerChoixpeau();
    });
    document.getElementById("btn-revoir").addEventListener("click", () => {
      if (confirm("Remettre toutes les questions dans les « à découvrir » de « " + (etat.nom || "ce sorcier") + " » ?\n(Les points de magie et les sorts sont gardés.)")) {
        etat.reussies = {};
        sauver();
        rendreProgression();
      }
    });
    document.getElementById("chk-sons").addEventListener("change", e => {
      sauvegarde.reglages.sons = e.target.checked; sauver();
    });
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Remettre à zéro la progression de « " + (etat.nom || "ce sorcier") + " » ?\n(Le prénom et la maison sont conservés.)")) {
        etat.xp = 0;
        etat.bonnesReponses = 0;
        etat.totalReponses = 0;
        etat.meilleureSerie = 0;
        etat.reussies = {};
        sauver();
        montrer("ecran-accueil");
      }
    });
  }

  /* ===========================================================================
     15. EXPORT / IMPORT DES SAUVEGARDES
     =========================================================================== */

  function exporterSauvegardes() {
    const blob = new Blob([JSON.stringify(sauvegarde, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = "poudlard-francais-sauvegarde-" + date + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function importerSauvegardes(e) {
    const fichier = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!fichier) return;
    const lecteur = new FileReader();
    lecteur.onload = () => {
      let data;
      try { data = JSON.parse(lecteur.result); }
      catch (err) { alert("Fichier illisible : ce n'est pas une sauvegarde valide."); return; }
      if (!data || !Array.isArray(data.profils)) {
        alert("Ce fichier ne contient pas de sauvegarde Poudlard Français.");
        return;
      }
      if (!confirm("Remplacer les fiches de cet appareil par celles du fichier ?\n(" + data.profils.length + " sorcier(s) dans le fichier.)")) return;
      sauvegarde = data;
      if (!sauvegarde.reglages) sauvegarde.reglages = { sons: true };
      sauvegarde.profils.forEach(assainirProfil);
      sauvegarde.version = 3;
      sauvegarde.profilActifId = null;
      etat = null;
      sauver();
      montrer("ecran-profils");
    };
    lecteur.readAsText(fichier);
  }

  /* ===========================================================================
     16. UTILITAIRES
     =========================================================================== */

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ===========================================================================
     17. DÉMARRAGE
     =========================================================================== */

  decorerCiel();

  if (etat && etat.maison) {
    appliquerCouleursMaison(etat.maison);
    montrer("ecran-accueil");
  } else if (sauvegarde.profils.length) {
    montrer("ecran-profils");
  } else {
    profilEnCreation = profilVierge("");
    montrer("ecran-creation");
  }

})();
