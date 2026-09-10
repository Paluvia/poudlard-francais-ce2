/* =============================================================================
   CONTENU PÉDAGOGIQUE — École de Sorcellerie (Français CE2)
   =============================================================================

   Ce fichier contient TOUTES les questions. Il est fait pour être enrichi
   facilement au fil de l'année, sans toucher au reste du code.

   ---------------------------------------------------------------------------
   FORMAT D'UNE QUESTION
   ---------------------------------------------------------------------------
   {
     id: "etre-avoir-04",   // IDENTIFIANT UNIQUE ET STABLE. Ne jamais le changer
                            // ni le réutiliser. Convention : "<idThème>-NN".
                            // Sert au suivi des bugs et à la mémorisation des
                            // questions réussies (on peut donc corriger le texte
                            // d'une question sans remettre à zéro les élèves).

     type: "qcm"     -> l'enfant choisit parmi des boutons
        ou "trou"     -> l'enfant écrit la réponse au clavier
        ou "cahier"   -> l'enfant écrit sur son cahier, regarde la correction,
                         puis coche « j'avais bon » ou « j'avais une erreur »
        ou "tableau"  -> compléter une conjugaison complète (plusieurs cases)
        ou "erreur",  -> repérer la forme mal écrite dans une conjugaison

     consigne: "Choisis la bonne écriture.",   // ce qu'il faut faire
     phrase: "Harry … une baguette magique.",  // le caractère … marque le trou
                                               // (pas de phrase pour tableau / erreur)

     // pour "qcm" :
     choix: ["a", "as", "à"],
     reponse: "a",                             // doit être exactement dans "choix"

     // pour "trou" :
     reponse: "vais",
     reponses: ["vais", "je vais"],            // variantes acceptées (optionnel)

     // pour "cahier" :
     correction: "Les élèves vont à la bibliothèque.",  // la réponse modèle

     // pour "tableau" : le verbe + les 6 personnes dans l'ordre
     verbe: "chanter",
     formes: [
       { pron: "je", forme: "chante" },              // case déjà remplie
       { pron: "tu", debut: "chant", fin: "es" },    // case à compléter : « chant__ »
       { pron: "il/elle", debut: "chant", fin: "e" },
       { pron: "nous", forme: "chantons" },
       { pron: "vous", debut: "chant", fin: "ez" },
       { pron: "ils/elles", forme: "chantent" }
     ],
     // « debut » peut être "" (l'enfant tape toute la forme, ex. être : { pron:"vous", debut:"", fin:"êtes" })
     // l'enfant peut taper la terminaison seule ("es") ou la forme entière ("chantes")

     // pour "erreur" : le verbe, les 6 formes complètes, celle qui est fausse et sa correction
     verbe: "finir",
     formes: ["je finis","tu finis","il finit","nous finisons","vous finissez","ils finissent"],
     fausse: "nous finisons",
     correcte: "nous finissons",

     explication: "aller → ils vont…"          // montrée après la réponse
   }

   ---------------------------------------------------------------------------
   RÈGLES
   ---------------------------------------------------------------------------
   - Une question réussie n'est plus reposée à cet enfant (sauf s'il la
     « revoit » depuis l'écran Progression). Une question ratée revient.
   - Une session = 6 questions ; environ 1 sur 3 est "lente" (cahier / tableau).
   - Modifier le texte d'une question (champ "phrase", "verbe"…) remet cette
     question dans les questions « à découvrir » : c'est normal.

   ---------------------------------------------------------------------------
   AJOUTER UNE NOUVELLE PÉRIODE
   ---------------------------------------------------------------------------
   1. Copie le bloc "periode1", colle-le en dessous, renomme-le "periode2".
   2. Change le titre et les thèmes.
   3. Ajoute "periode2" dans l'objet PERIODES tout en bas.
   ============================================================================= */

const periode1 = {
  id: "periode1",
  titre: "Période 1 — La rentrée à Poudlard",
  themes: [

    /* ====================================================================== */
    {
      id: "etre-avoir",
      titre: "Le présent : être et avoir",
      questions: [
        { id: "etre-avoir-01", type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Nous … prêts pour le cours de potions.",
          choix: ["sommes", "êtes", "sont"], reponse: "sommes",
          explication: "être : je suis, tu es, il est, nous sommes, vous êtes, ils sont." },

        { id: "etre-avoir-02", type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Le professeur Rogue … de mauvaise humeur.",
          choix: ["es", "est", "ait"], reponse: "est",
          explication: "Avec « il » / « elle », être fait « est »." },

        { id: "etre-avoir-03", type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Vous … les meilleurs en métamorphose.",
          choix: ["sommes", "êtes", "sont"], reponse: "êtes",
          explication: "Avec « vous », être fait « êtes » (accent circonflexe sur le ê)." },

        { id: "etre-avoir-04", type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Les portraits des sorciers … accrochés au mur.",
          choix: ["est", "sont", "ont"], reponse: "sont",
          explication: "« Les portraits » = ils : être fait « sont »." },

        { id: "etre-avoir-05", type: "trou", consigne: "Conjugue le verbe être au présent.",
          phrase: "Les fantômes … invisibles le jour.",
          reponse: "sont", reponses: ["sont", "ils sont", "elles sont"],
          explication: "ils sont. être : je suis, tu es, il est, nous sommes, vous êtes, ils sont." },

        { id: "etre-avoir-06", type: "qcm", consigne: "Choisis la bonne forme du verbe avoir.",
          phrase: "Les élèves de première année … peur de la Forêt interdite.",
          choix: ["a", "ont", "sont"], reponse: "ont",
          explication: "avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont. « avoir peur »." },

        { id: "etre-avoir-07", type: "qcm", consigne: "Choisis la bonne forme du verbe avoir.",
          phrase: "J'… un balai flambant neuf.",
          choix: ["ai", "aie", "es"], reponse: "ai",
          explication: "Avec « je », avoir fait « ai » : j'ai." },

        { id: "etre-avoir-08", type: "trou", consigne: "Conjugue le verbe avoir au présent.",
          phrase: "Vous … de la chance d'avoir Hagrid comme professeur.",
          reponse: "avez", reponses: ["avez", "vous avez"],
          explication: "vous avez. avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont." },

        { id: "etre-avoir-09", type: "qcm", consigne: "« a » (verbe avoir) ou « à » (mot invariable) ?",
          phrase: "Hermione pense … ses révisions.",
          choix: ["a", "à"], reponse: "à",
          explication: "On ne peut pas dire « avait ». C'est « à », le mot invariable." },

        { id: "etre-avoir-10", type: "qcm", consigne: "« a » (verbe avoir) ou « à » (mot invariable) ?",
          phrase: "Ron … oublié sa cravate dans le dortoir.",
          choix: ["a", "à"], reponse: "a",
          explication: "On peut dire « avait oublié » : c'est le verbe avoir, « a »." },

        { id: "etre-avoir-11", type: "qcm", consigne: "« on » ou « ont » ?",
          phrase: "… range les chaudrons à la fin du cours.",
          choix: ["On", "Ont"], reponse: "On",
          explication: "« on » = quelqu'un. « ont » = verbe avoir (ils ont)." },

        { id: "etre-avoir-12", type: "qcm", consigne: "« on » ou « ont » ?",
          phrase: "Les elfes de maison … tout nettoyé.",
          choix: ["on", "ont"], reponse: "ont",
          explication: "« Les elfes ont nettoyé » : verbe avoir, « ont »." },

        { id: "etre-avoir-13", type: "qcm", consigne: "« et » (= et puis) ou « est » (verbe être) ?",
          phrase: "Harry … Ron sont dans la même chambre.",
          choix: ["et", "est"], reponse: "et",
          explication: "« et » relie deux mots. On ne peut pas dire « Harry était Ron »." },

        { id: "etre-avoir-14", type: "qcm", consigne: "« et » ou « est » ?",
          phrase: "Le Vif d'or … minuscule et rapide.",
          choix: ["et", "est"], reponse: "est",
          explication: "On peut dire « était minuscule » : verbe être, « est »." },

        { id: "etre-avoir-15", type: "qcm", consigne: "« son » (à lui) ou « sont » (verbe être) ?",
          phrase: "Neville a encore perdu … crapaud.",
          choix: ["son", "sont"], reponse: "son",
          explication: "« son crapaud » = le crapaud à lui. « sont » = verbe être (ils sont)." },

        { id: "etre-avoir-16", type: "qcm", consigne: "« son » ou « sont » ?",
          phrase: "Les couloirs du château … sombres la nuit.",
          choix: ["son", "sont"], reponse: "sont",
          explication: "« Les couloirs étaient sombres » : verbe être, « sont »." },

        { id: "etre-avoir-17", type: "qcm", consigne: "Quelle phrase est écrite sans erreur ?",
          phrase: "a / à / et / est : une seule phrase est juste.",
          choix: ["Il a une baguette et elle est magique.",
                  "Il à une baguette est elle et magique.",
                  "Il a une baguette est elle est magique."],
          reponse: "Il a une baguette et elle est magique.",
          explication: "a = avoir · et = et puis · est = être." },

        { id: "etre-avoir-18", type: "cahier", consigne: "Écris ces phrases en remplaçant « je » par « nous ».",
          phrase: "« Je suis à Poudlard. J'ai un hibou. »",
          correction: "Nous sommes à Poudlard. Nous avons un hibou.",
          explication: "être → nous sommes · avoir → nous avons." },

        { id: "etre-avoir-19", type: "cahier", consigne: "Recopie la phrase en corrigeant les 2 erreurs.",
          phrase: "« Les élèves on cours et il sont en retard. »",
          correction: "Les élèves ont cours et ils sont en retard.",
          explication: "on → ont (verbe avoir) · il → ils (le sujet est au pluriel)." },

        { id: "etre-avoir-20", type: "cahier", consigne: "Conjugue le verbe être au présent avec tous les pronoms (je, tu, il, nous, vous, ils).",
          phrase: "verbe : être",
          correction: "je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
          explication: "À apprendre par cœur : c'est un verbe qu'on utilise tout le temps." },

        { id: "etre-avoir-21", type: "cahier", consigne: "Conjugue le verbe avoir au présent avec tous les pronoms.",
          phrase: "verbe : avoir",
          correction: "j'ai, tu as, il a, nous avons, vous avez, ils ont.",
          explication: "Attention : « il a » (sans accent), « ils ont » (avec un t)." }
      ]
    },

    /* ====================================================================== */
    {
      id: "aller-faire-dire",
      titre: "Le présent : aller, faire et dire",
      questions: [
        { id: "aller-faire-dire-01", type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Nous … au cours de vol sur balai.",
          choix: ["allons", "allez", "vont"], reponse: "allons",
          explication: "aller : je vais, tu vas, il va, nous allons, vous allez, ils vont." },

        { id: "aller-faire-dire-02", type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Le Poudlard Express … vers l'école.",
          choix: ["va", "vas", "vont"], reponse: "va",
          explication: "« le train » = il : aller fait « va »." },

        { id: "aller-faire-dire-03", type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Vous … chez le directeur après le dîner.",
          choix: ["allons", "allez", "vont"], reponse: "allez",
          explication: "Avec « vous », aller fait « allez »." },

        { id: "aller-faire-dire-04", type: "trou", consigne: "Conjugue le verbe aller au présent.",
          phrase: "Les élèves de troisième année … à Pré-au-Lard.",
          reponse: "vont", reponses: ["vont", "ils vont", "elles vont"],
          explication: "ils vont. aller : je vais, tu vas, il va, nous allons, vous allez, ils vont." },

        { id: "aller-faire-dire-05", type: "qcm", consigne: "à / au / aux ? (aller + le lieu)",
          phrase: "Harry va … terrain de Quidditch pour s'entraîner.",
          choix: ["à", "au", "aux"], reponse: "au",
          explication: "« à + le » se transforme en « au » : au terrain." },

        { id: "aller-faire-dire-06", type: "qcm", consigne: "à / au / aux ?",
          phrase: "Nous allons … serres de botanique.",
          choix: ["à", "au", "aux"], reponse: "aux",
          explication: "« à + les » se transforme en « aux » : aux serres." },

        { id: "aller-faire-dire-07", type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Je … mes devoirs de sortilèges avant le dîner.",
          choix: ["fais", "fait", "fez"], reponse: "fais",
          explication: "faire : je fais, tu fais, il fait, nous faisons, vous faites, ils font." },

        { id: "aller-faire-dire-08", type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Hermione … toujours ses exercices en avance.",
          choix: ["fais", "fait", "fez"], reponse: "fait",
          explication: "Avec « elle », faire fait « fait »." },

        { id: "aller-faire-dire-09", type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Vous … une potion très dangereuse.",
          choix: ["faisez", "faites", "faisiez"], reponse: "faites",
          explication: "Avec « vous », faire fait « faites » (comme « vous êtes », « vous dites »)." },

        { id: "aller-faire-dire-10", type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Les elfes … la cuisine pour tout le château.",
          choix: ["font", "fait", "faisent"], reponse: "font",
          explication: "Avec « ils », faire fait « font »." },

        { id: "aller-faire-dire-11", type: "trou", consigne: "Conjugue le verbe faire au présent.",
          phrase: "Nous … attention pendant le cours de potions.",
          reponse: "faisons", reponses: ["faisons", "nous faisons"],
          explication: "nous faisons (on écrit « ai » même si on entend « e »)." },

        { id: "aller-faire-dire-12", type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Le Choixpeau … dans quelle maison tu iras.",
          choix: ["dis", "dit", "dix"], reponse: "dit",
          explication: "dire : je dis, tu dis, il dit, nous disons, vous dites, ils disent." },

        { id: "aller-faire-dire-13", type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Tu … toujours la vérité à tes amis.",
          choix: ["dis", "dit", "dies"], reponse: "dis",
          explication: "Avec « tu », dire fait « dis »." },

        { id: "aller-faire-dire-14", type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Vous … au revoir au professeur Chourave.",
          choix: ["disez", "dites", "disiez"], reponse: "dites",
          explication: "Avec « vous », dire fait « dites » (comme « vous faites »)." },

        { id: "aller-faire-dire-15", type: "trou", consigne: "Conjugue le verbe dire au présent.",
          phrase: "Les jumeaux … un secret à l'oreille de Ron.",
          reponse: "disent", reponses: ["disent", "ils disent"],
          explication: "ils disent. dire : je dis, tu dis, il dit, nous disons, vous dites, ils disent." },

        { id: "aller-faire-dire-16", type: "qcm", consigne: "Complète.",
          phrase: "Que … -vous pendant les vacances ?",
          choix: ["faisez", "faites", "faisiez"], reponse: "faites",
          explication: "« vous faites », jamais « vous faisez »." },

        { id: "aller-faire-dire-17", type: "cahier", consigne: "Écris la phrase au présent en conjuguant les verbes entre parenthèses.",
          phrase: "« Aujourd'hui, nous (aller) à Pré-au-Lard et nous (faire) des achats. »",
          correction: "Aujourd'hui, nous allons à Pré-au-Lard et nous faisons des achats.",
          explication: "aller → nous allons · faire → nous faisons." },

        { id: "aller-faire-dire-18", type: "cahier", consigne: "Conjugue le verbe faire au présent avec tous les pronoms.",
          phrase: "verbe : faire",
          correction: "je fais, tu fais, il fait, nous faisons, vous faites, ils font.",
          explication: "Les pièges : « nous faisons » et « vous faites »." },

        { id: "aller-faire-dire-19", type: "cahier", consigne: "Recopie en corrigeant les 2 erreurs.",
          phrase: "« Vous faisez un vœu et vous le disez tout bas. »",
          correction: "Vous faites un vœu et vous le dites tout bas.",
          explication: "vous faites · vous dites (jamais « faisez » ni « disez »)." },

        { id: "aller-faire-dire-20", type: "cahier", consigne: "Écris la phrase en remplaçant « je » par « ils ».",
          phrase: "« Je vais en cours, je fais mes exercices et je dis la formule. »",
          correction: "Ils vont en cours, ils font leurs exercices et ils disent la formule.",
          explication: "aller → ils vont · faire → ils font · dire → ils disent." }
      ]
    },

    /* ====================================================================== */
    {
      id: "verbes-er",
      titre: "Le présent : les verbes en -er",
      questions: [
        { id: "verbes-er-01", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Je … la carte du Maraudeur avec attention. (regarder)",
          choix: ["regarde", "regardes", "regardent"], reponse: "regarde",
          explication: "-er au présent : je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent." },

        { id: "verbes-er-02", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Tu … vers la serre numéro trois. (marcher)",
          choix: ["marche", "marches", "marchent"], reponse: "marches",
          explication: "Avec « tu », un verbe en -er prend -es." },

        { id: "verbes-er-03", type: "qcm", consigne: "Attention à la terminaison qu'on n'entend pas.",
          phrase: "Les hiboux … le courrier chaque matin. (apporter)",
          choix: ["apporte", "apportent", "apportes"], reponse: "apportent",
          explication: "« Les hiboux » = ils : on écrit -ent (muet)." },

        { id: "verbes-er-04", type: "qcm", consigne: "Attention à la terminaison qu'on n'entend pas.",
          phrase: "Dans la classe, les chaudrons … doucement. (chauffer)",
          choix: ["chauffe", "chauffent", "chauffes"], reponse: "chauffent",
          explication: "« Les chaudrons » = ils : terminaison -ent." },

        { id: "verbes-er-05", type: "qcm", consigne: "Verbe en -ger : on garde le « e » devant « ons ».",
          phrase: "Nous … à la Grande Salle à midi. (manger)",
          choix: ["mangons", "mangeons", "mangions"], reponse: "mangeons",
          explication: "manger → nous mangeons (le « e » garde le son [j])." },

        { id: "verbes-er-06", type: "qcm", consigne: "Verbe en -ger : on garde le « e » devant « ons ».",
          phrase: "Nous … nos affaires avant de sortir. (ranger)",
          choix: ["rangons", "rangeons", "rangions"], reponse: "rangeons",
          explication: "ranger → nous rangeons." },

        { id: "verbes-er-07", type: "qcm", consigne: "Verbe en -cer : le « c » devient « ç » devant « ons ».",
          phrase: "Nous … le cours par une révision. (commencer)",
          choix: ["commencons", "commençons", "commencions"], reponse: "commençons",
          explication: "commencer → nous commençons (ç pour garder le son [s])." },

        { id: "verbes-er-08", type: "qcm", consigne: "Verbe en -cer : le « c » devient « ç » devant « ons ».",
          phrase: "Nous … prudemment sur nos balais. (avancer)",
          choix: ["avancons", "avançons", "avancions"], reponse: "avançons",
          explication: "avancer → nous avançons." },

        { id: "verbes-er-09", type: "qcm", consigne: "Terminaison -ez ou infinitif -er ?",
          phrase: "Vous … bien votre potion avant de la boire. (mélanger)",
          choix: ["mélangez", "mélanger"], reponse: "mélangez",
          explication: "Après « vous », on écrit -ez : vous mélangez." },

        { id: "verbes-er-10", type: "qcm", consigne: "Terminaison -ez ou infinitif -er ?",
          phrase: "Il faut … la formule à voix haute. (prononcer)",
          choix: ["prononcez", "prononcer"], reponse: "prononcer",
          explication: "Après « il faut », le verbe reste à l'infinitif : -er." },

        { id: "verbes-er-11", type: "qcm", consigne: "Quel pronom convient ?",
          phrase: "… écoutons le professeur Flitwick.",
          choix: ["Nous", "Vous", "Ils"], reponse: "Nous",
          explication: "La terminaison « -ons » va avec « nous »." },

        { id: "verbes-er-12", type: "qcm", consigne: "Le sujet « la classe » est au singulier.",
          phrase: "La classe de Gryffondor … un grand exposé sur les dragons. (préparer)",
          choix: ["prépare", "préparent", "prépares"], reponse: "prépare",
          explication: "« la classe » = elle (un seul groupe) : terminaison -e." },

        { id: "verbes-er-13", type: "trou", consigne: "Conjugue « jouer » au présent.",
          phrase: "Nous … dans la cour pendant la récréation.",
          reponse: "jouons", reponses: ["jouons", "nous jouons"],
          explication: "nous jouons (terminaison -ons)." },

        { id: "verbes-er-14", type: "trou", consigne: "Conjugue « travailler » au présent.",
          phrase: "Les élèves sérieux … tous les soirs.",
          reponse: "travaillent", reponses: ["travaillent", "ils travaillent"],
          explication: "ils travaillent (terminaison -ent, muette)." },

        { id: "verbes-er-15", type: "qcm", consigne: "« on » se conjugue comme « il ».",
          phrase: "On … une nouvelle formule aujourd'hui. (étudier)",
          choix: ["étudie", "étudies", "étudient"], reponse: "étudie",
          explication: "on étudie (comme « il étudie »)." },

        { id: "verbes-er-16", type: "cahier", consigne: "Écris la phrase en mettant le sujet au pluriel.",
          phrase: "« Le sorcier lance un sort et récite la formule. »",
          correction: "Les sorciers lancent un sort et récitent la formule.",
          explication: "Sujet au pluriel → verbes en -ent (qu'on n'entend pas)." },

        { id: "verbes-er-17", type: "cahier", consigne: "Écris la phrase au présent en conjuguant les verbes.",
          phrase: "« Nous (commencer) le cours, puis nous (ranger) le matériel et nous (manger). »",
          correction: "Nous commençons le cours, puis nous rangeons le matériel et nous mangeons.",
          explication: "-cer → çons · -ger → geons." },

        { id: "verbes-er-18", type: "cahier", consigne: "Recopie en corrigeant les erreurs de terminaison.",
          phrase: "« Les élèves regarde le tableau et écoute la maîtresse. »",
          correction: "Les élèves regardent le tableau et écoutent la maîtresse.",
          explication: "Sujet pluriel « les élèves » → -ent." },

        { id: "verbes-er-19", type: "cahier", consigne: "Transforme la phrase avec « vous ».",
          phrase: "« Tu ranges ta chambre et tu fermes la fenêtre. »",
          correction: "Vous rangez votre chambre et vous fermez la fenêtre.",
          explication: "Avec « vous » : terminaison -ez, et « ta » devient « votre »." },

        { id: "verbes-er-20", type: "cahier", consigne: "Conjugue le verbe « chanter » au présent avec tous les pronoms.",
          phrase: "verbe : chanter",
          correction: "je chante, tu chantes, il chante, nous chantons, vous chantez, ils chantent.",
          explication: "C'est le modèle de tous les verbes en -er." }
      ]
    },

    /* ====================================================================== */
    {
      id: "homophones",
      titre: "Les homophones (a/à, et/est, on/ont…)",
      questions: [
        { id: "homophones-01", type: "qcm", consigne: "a (verbe avoir) ou à (mot invariable) ?",
          phrase: "Le cours de vol commence … huit heures.",
          choix: ["a", "à"], reponse: "à",
          explication: "Ici on ne peut pas dire « avait » : c'est « à »." },

        { id: "homophones-02", type: "qcm", consigne: "a ou à ?",
          phrase: "Ce vieux chaudron … déjà servi mille fois.",
          choix: ["a", "à"], reponse: "a",
          explication: "On peut dire « avait servi » : verbe avoir, « a »." },

        { id: "homophones-03", type: "qcm", consigne: "a ou à ?",
          phrase: "Luna retourne … la bibliothèque.",
          choix: ["a", "à"], reponse: "à",
          explication: "« retourne à un endroit » : « à » invariable." },

        { id: "homophones-04", type: "qcm", consigne: "et (= et puis) ou est (verbe être) ?",
          phrase: "Le chien … le chat de Rusard dorment ensemble.",
          choix: ["et", "est"], reponse: "et",
          explication: "« et » relie deux mots : le chien ET le chat." },

        { id: "homophones-05", type: "qcm", consigne: "et ou est ?",
          phrase: "La cape de Harry … vraiment magique.",
          choix: ["et", "est"], reponse: "est",
          explication: "On peut dire « était magique » : verbe être, « est »." },

        { id: "homophones-06", type: "qcm", consigne: "on (= quelqu'un) ou ont (verbe avoir) ?",
          phrase: "Ce matin, … doit rendre le devoir de potions.",
          choix: ["on", "ont"], reponse: "on",
          explication: "« on doit » = quelqu'un doit. « ont » = ils ont." },

        { id: "homophones-07", type: "qcm", consigne: "on ou ont ?",
          phrase: "Les sorciers … des pouvoirs magiques.",
          choix: ["on", "ont"], reponse: "ont",
          explication: "« les sorciers ont » : verbe avoir, « ont »." },

        { id: "homophones-08", type: "qcm", consigne: "son (à lui / à elle) ou sont (verbe être) ?",
          phrase: "Drago parle à … hibou dans la volière.",
          choix: ["son", "sont"], reponse: "son",
          explication: "« son hibou » = le hibou à lui." },

        { id: "homophones-09", type: "qcm", consigne: "son ou sont ?",
          phrase: "Les Détraqueurs … très effrayants.",
          choix: ["son", "sont"], reponse: "sont",
          explication: "On peut dire « étaient effrayants » : verbe être, « sont »." },

        { id: "homophones-10", type: "qcm", consigne: "ou (= ou bien) ou où (= à quel endroit) ?",
          phrase: "Tu préfères le jus de citrouille … la Bièraubeurre ?",
          choix: ["ou", "où"], reponse: "ou",
          explication: "« ou bien » : « ou » sans accent (un choix)." },

        { id: "homophones-11", type: "qcm", consigne: "ou ou où ?",
          phrase: "… as-tu rangé ta baguette ?",
          choix: ["Ou", "Où"], reponse: "Où",
          explication: "« à quel endroit » : « où » avec un accent." },

        { id: "homophones-12", type: "qcm", consigne: "ou ou où ?",
          phrase: "La Grande Salle est l'endroit … tout le monde mange.",
          choix: ["ou", "où"], reponse: "où",
          explication: "« l'endroit où » : lieu, donc « où » avec accent." },

        { id: "homophones-13", type: "trou", consigne: "Complète avec ou / où.",
          phrase: "Je ne sais pas … est passé mon manuel de sortilèges.",
          reponse: "où", reponses: ["où"],
          explication: "« à quel endroit est passé… » : « où » avec accent." },

        { id: "homophones-14", type: "qcm", consigne: "Complète.",
          phrase: "Poudlard … une école … les élèves apprennent la magie.",
          choix: ["est … où", "et … ou", "est … ou"], reponse: "est … où",
          explication: "« est » (verbe être) · « où » (le lieu où on apprend)." },

        { id: "homophones-15", type: "cahier", consigne: "Recopie la phrase en choisissant le bon mot.",
          phrase: "« Harry (a/à) une cape (et/est) elle (est/et) magique. »",
          correction: "Harry a une cape et elle est magique.",
          explication: "a = avoir · et = et puis · est = être." },

        { id: "homophones-16", type: "cahier", consigne: "Recopie en corrigeant les 2 erreurs.",
          phrase: "« Les élèves on cours ou il sont en récréation. »",
          correction: "Les élèves ont cours ou ils sont en récréation.",
          explication: "on → ont (verbe avoir) · il → ils. « ou » (= ou bien) reste sans accent." },

        { id: "homophones-17", type: "cahier", consigne: "Écris une phrase avec « a » (verbe avoir), puis une phrase avec « à ».",
          phrase: "à toi d'inventer",
          correction: "Exemple : Elle a un balai neuf. / Elle va à l'école des sorciers.",
          explication: "« a » = avoir (on peut dire « avait ») · « à » = mot invariable." },

        { id: "homophones-18", type: "cahier", consigne: "Écris une phrase avec « ou » (= ou bien), puis une phrase avec « où » (le lieu).",
          phrase: "à toi d'inventer",
          correction: "Exemple : Tu veux du thé ou du café ? / Voici la salle où nous dormons.",
          explication: "« où » avec accent = à quel endroit." },

        { id: "homophones-19", type: "trou", consigne: "Complète avec a / à.",
          phrase: "Elle apprend … voler sur un balai.",
          reponse: "à", reponses: ["à"],
          explication: "« apprendre à faire quelque chose » : « à » invariable." },

        { id: "homophones-20", type: "qcm", consigne: "Quelle phrase est correcte ?",
          phrase: "on / ont / a / et / est : une seule phrase est juste.",
          choix: ["On a gagné et on est contents.",
                  "Ont a gagné est on est contents.",
                  "On a gagné et ont est contents."],
          reponse: "On a gagné et on est contents.",
          explication: "on (quelqu'un) · a (avoir) · et (et puis) · est (être)." }
      ]
    },

    /* ====================================================================== */
    {
      id: "sons-accents",
      titre: "Les sons difficiles et les accents",
      questions: [
        { id: "sons-accents-01", type: "qcm", consigne: "Devant m, b, p, le son [an] s'écrit « am ». Complète.",
          phrase: "Ron cueille un ch…pignon dans la forêt.",
          choix: ["am", "an"], reponse: "am",
          explication: "champignon : « am » devant le « p »." },

        { id: "sons-accents-02", type: "qcm", consigne: "Devant m, b, p, le son [on] s'écrit « om ». Complète.",
          phrase: "Le professeur compte le n…bre d'élèves.",
          choix: ["om", "on"], reponse: "om",
          explication: "nombre : « om » devant le « b »." },

        { id: "sons-accents-03", type: "qcm", consigne: "Devant m, b, p, le son [in] s'écrit « im ». Complète.",
          phrase: "Neville adore gr…per aux arbres.",
          choix: ["im", "in"], reponse: "im",
          explication: "grimper : « im » devant le « p »." },

        { id: "sons-accents-04", type: "qcm", consigne: "Complète (attention : ici il n'y a pas de m, b, p juste après).",
          phrase: "Harry pl…ge dans le lac noir.",
          choix: ["on", "om"], reponse: "on",
          explication: "plonge : le son [on] est suivi de « g », on écrit « on »." },

        { id: "sons-accents-05", type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "l'animal qui grimpe aux arbres et cache des noisettes",
          choix: ["un écureuil", "un écureil", "un écurueil"], reponse: "un écureuil",
          explication: "écureuil se termine par « euil »." },

        { id: "sons-accents-06", type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "elles poussent sur les arbres et tombent en automne",
          choix: ["des feuilles", "des feuiles", "des feuillent"], reponse: "des feuilles",
          explication: "feuille s'écrit « euille » ; au pluriel, on ajoute un s : feuilles." },

        { id: "sons-accents-07", type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "une très grande masse de roche, très haute",
          choix: ["une montagne", "une montaigne", "une montanie"], reponse: "une montagne",
          explication: "montagne s'écrit avec « gn »." },

        { id: "sons-accents-08", type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "le petit animal gris qui aime le fromage",
          choix: ["une souris", "une souri", "une sourit"], reponse: "une souris",
          explication: "souris se termine par un « s » (même au singulier)." },

        { id: "sons-accents-09", type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "on s'en sert pour balayer la salle commune",
          choix: ["un balai", "un balet", "un ballai"], reponse: "un balai",
          explication: "le balai (pour balayer) se termine par « ai »." },

        { id: "sons-accents-10", type: "qcm", consigne: "Choisis la bonne écriture du son [j] (comme dans « jour »).",
          phrase: "Un pi…on se pose sur le rebord de la fenêtre.",
          choix: ["ge", "g", "j"], reponse: "ge",
          explication: "pigeon : « ge » pour garder le son [j] devant « o »." },

        { id: "sons-accents-11", type: "qcm", consigne: "Choisis la bonne écriture du son [f].",
          phrase: "Hermione range un vieux télé…one dans son sac.",
          choix: ["ph", "f"], reponse: "ph",
          explication: "téléphone s'écrit avec « ph »." },

        { id: "sons-accents-12", type: "qcm", consigne: "Choisis la bonne écriture du son [s] (devant a, o, u).",
          phrase: "Un gar…on cueille des plantes avec le professeur.",
          choix: ["ç", "c", "ss"], reponse: "ç",
          explication: "garçon : « ç » pour faire le son [s] devant « o »." },

        { id: "sons-accents-13", type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "l'arbre est près de la … (cours d'eau)",
          choix: ["rivière", "rivère", "riviére"], reponse: "rivière",
          explication: "rivière : « i » puis « è » (accent grave)." },

        { id: "sons-accents-14", type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "les Sombrals vivent dans la … interdite",
          choix: ["forêt", "forét", "forè"], reponse: "forêt",
          explication: "forêt : accent circonflexe sur le « ê », puis un « t » muet." },

        { id: "sons-accents-15", type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "Poudlard organise une grande … de fin d'année",
          choix: ["fête", "féte", "fète"], reponse: "fête",
          explication: "fête : accent circonflexe sur le « ê »." },

        { id: "sons-accents-16", type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "Harry … des bonbons chez Honeydukes",
          choix: ["achète", "achéte", "achette"], reponse: "achète",
          explication: "achète : accent grave sur le « è »." },

        { id: "sons-accents-17", type: "cahier", consigne: "Recopie ces mots en plaçant les accents.",
          phrase: "« eleve — fenetre — pres — theatre »",
          correction: "élève — fenêtre — près — théâtre",
          explication: "é (fermé), è (ouvert), ê (circonflexe). On écoute bien le son." },

        { id: "sons-accents-18", type: "cahier", consigne: "Recopie la phrase en corrigeant les accents.",
          phrase: "« La forét est prés de la riviere. »",
          correction: "La forêt est près de la rivière.",
          explication: "forêt (ê), près (è), rivière (è)." },

        { id: "sons-accents-19", type: "cahier", consigne: "Écris 3 mots dans lesquels le son [an] s'écrit « am ».",
          phrase: "indice : c'est le cas devant m, b, p",
          correction: "Exemples : chambre, tambour, jambe, lampe, campagne.",
          explication: "Devant m, b, p : on écrit « am » (et « om », « im », « em »)." },

        { id: "sons-accents-20", type: "cahier", consigne: "Recopie en écrivant correctement le son [j].",
          phrase: "« un pi…on — une bou…ie — une ca…e »",
          correction: "un pigeon — une bougie — une cage",
          explication: "Le son [j] s'écrit « g » devant e/i, et « ge » devant a/o/u." }
      ]
    },

    /* ====================================================================== */
    {
      id: "lettre-finale-pluriel",
      titre: "Lettres muettes et pluriel des noms",
      questions: [
        { id: "lettre-finale-pluriel-01", type: "qcm", consigne: "Quelle lettre muette termine le mot ? (pense à « petite »)",
          phrase: "un petit chaudron  →  peti…",
          choix: ["t", "d", "s"], reponse: "t",
          explication: "petite → petit (avec un « t »)." },

        { id: "lettre-finale-pluriel-02", type: "qcm", consigne: "Quelle lettre muette ? (pense à « chanteuse », « chanter »)",
          phrase: "un chan… magique  →  chan…",
          choix: ["t", "s", "d"], reponse: "t",
          explication: "chanter, chanteuse → un chant." },

        { id: "lettre-finale-pluriel-03", type: "qcm", consigne: "Quelle lettre muette ? (pense à « la bordure »)",
          phrase: "le bor… du lac  →  bor…",
          choix: ["d", "t", "s"], reponse: "d",
          explication: "la bordure → le bord (avec un « d »)." },

        { id: "lettre-finale-pluriel-04", type: "qcm", consigne: "Quelle lettre muette ? (pense à « grise »)",
          phrase: "un ciel gri…  →  gri…",
          choix: ["s", "t", "x"], reponse: "s",
          explication: "grise → gris (avec un « s »)." },

        { id: "lettre-finale-pluriel-05", type: "qcm", consigne: "Quelle lettre muette ? (pense à « la rangée », « ranger »)",
          phrase: "le premier ran… de la classe  →  ran…",
          choix: ["g", "t", "d"], reponse: "g",
          explication: "ranger, rangée → un rang (avec un « g »)." },

        { id: "lettre-finale-pluriel-06", type: "trou", consigne: "Écris la lettre muette finale. (pense à « tapisser »)",
          phrase: "un tapi… de sorcier  →  tapi…",
          reponse: "s", reponses: ["s"],
          explication: "tapisser → un tapis." },

        { id: "lettre-finale-pluriel-07", type: "trou", consigne: "Écris la lettre muette finale. (pense à « nicher »)",
          phrase: "un ni… d'oiseau  →  ni…",
          reponse: "d", reponses: ["d"],
          explication: "nicher → un nid (avec un « d »)." },

        { id: "lettre-finale-pluriel-08", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un chapeau pointu  →  des …",
          choix: ["chapeaux", "chapeaus", "chapeau"], reponse: "chapeaux",
          explication: "Les noms en -eau prennent « -x » au pluriel." },

        { id: "lettre-finale-pluriel-09", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un cheval  →  des …",
          choix: ["chevaux", "chevals", "cheveaux"], reponse: "chevaux",
          explication: "Les noms en -al font souvent « -aux » au pluriel." },

        { id: "lettre-finale-pluriel-10", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un journal  →  des …",
          choix: ["journaux", "journals", "journeaux"], reponse: "journaux",
          explication: "journal → journaux." },

        { id: "lettre-finale-pluriel-11", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un hibou  →  des …",
          choix: ["hiboux", "hibous", "hibaux"], reponse: "hiboux",
          explication: "hibou fait partie des noms en -ou qui prennent « -x » (hiboux, choux, cailloux…)." },

        { id: "lettre-finale-pluriel-12", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un jeu de cartes  →  des …",
          choix: ["jeux", "jeus", "jeaux"], reponse: "jeux",
          explication: "Les noms en -eu prennent « -x » : des jeux." },

        { id: "lettre-finale-pluriel-13", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "une souris grise  →  des …",
          choix: ["souris", "sourises", "souriss"], reponse: "souris",
          explication: "Les noms déjà terminés par -s ne changent pas au pluriel." },

        { id: "lettre-finale-pluriel-14", type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un nez  →  des …",
          choix: ["nez", "nés", "nezs"], reponse: "nez",
          explication: "Les noms terminés par -z ne changent pas au pluriel." },

        { id: "lettre-finale-pluriel-15", type: "cahier", consigne: "Écris ces groupes de mots au pluriel.",
          phrase: "« un cheval rapide — un château fort — un hibou gris »",
          correction: "des chevaux rapides — des châteaux forts — des hiboux gris",
          explication: "cheval → chevaux · château → châteaux · hibou → hiboux · l'adjectif s'accorde aussi." },

        { id: "lettre-finale-pluriel-16", type: "cahier", consigne: "Recopie en corrigeant les accords.",
          phrase: "« Les élèves portent des chapeau pointu et des cape noir. »",
          correction: "Les élèves portent des chapeaux pointus et des capes noires.",
          explication: "chapeau → chapeaux · cape → capes · les adjectifs s'accordent (pointus, noires)." },

        { id: "lettre-finale-pluriel-17", type: "cahier", consigne: "Trouve la lettre muette et recopie chaque mot en entier.",
          phrase: "« un cha_ (qui miaule) — le vent chau_ — un li_ (pour dormir) »",
          correction: "un chat — le vent chaud — un lit",
          explication: "chatte → chat · chaude → chaud · lit (on pense à « la literie »)." },

        { id: "lettre-finale-pluriel-18", type: "cahier", consigne: "Écris le féminin, puis le mot masculin avec sa lettre finale.",
          phrase: "« lour… — blan… — gran… »",
          correction: "lourde → lourd — blanche → blanc — grande → grand",
          explication: "Le féminin fait entendre la lettre muette du masculin." },

        { id: "lettre-finale-pluriel-19", type: "cahier", consigne: "Écris la phrase au pluriel.",
          phrase: "« Le vieux journal parle de magie. »",
          correction: "Les vieux journaux parlent de magie.",
          explication: "journal → journaux · le verbe se met aussi au pluriel : parlent." },

        { id: "lettre-finale-pluriel-20", type: "qcm", consigne: "Choisis la bonne phrase.",
          phrase: "Pense au pluriel de « cheval » et à la terminaison du verbe.",
          choix: ["Les chevaux galopent dans les prés.",
                  "Les chevals galopent dans les prés.",
                  "Les chevaux galope dans les prés."],
          reponse: "Les chevaux galopent dans les prés.",
          explication: "cheval → chevaux, et « ils galopent » (-ent)." }
      ]
    },

    /* ====================================================================== */
    {
      id: "mots-invariables",
      titre: "Les mots invariables",
      questions: [
        { id: "mots-invariables-01", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il s'entraîne au balai … une heure.",
          choix: ["depuis", "depui", "depuit"], reponse: "depuis",
          explication: "« depuis » se termine par -uis." },

        { id: "mots-invariables-02", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "… , nous irons visiter Pré-au-Lard.",
          choix: ["Bientôt", "Bientot", "Biento"], reponse: "Bientôt",
          explication: "« bientôt » : accent circonflexe sur le « ô », et un « t » final." },

        { id: "mots-invariables-03", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Range d'abord tes affaires, … tu joueras.",
          choix: ["ensuite", "en suite", "ensuitte"], reponse: "ensuite",
          explication: "« ensuite » s'écrit en un seul mot." },

        { id: "mots-invariables-04", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il a cherché sa baguette … dans le dortoir.",
          choix: ["partout", "par tout", "partous"], reponse: "partout",
          explication: "« partout » s'écrit en un seul mot, sans « s »." },

        { id: "mots-invariables-05", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Neville est maladroit, … il est très courageux.",
          choix: ["pourtant", "pourtan", "pour tant"], reponse: "pourtant",
          explication: "« pourtant » (= malgré cela) se termine par -ant." },

        { id: "mots-invariables-06", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Les quatre amis travaillent … à la bibliothèque.",
          choix: ["ensemble", "ensembles", "en semble"], reponse: "ensemble",
          explication: "« ensemble » ne prend jamais de « s » : c'est un mot invariable." },

        { id: "mots-invariables-07", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Hier il pleuvait ; … , il fait beau.",
          choix: ["aujourd'hui", "aujourd'huit", "ajourd'hui"], reponse: "aujourd'hui",
          explication: "« aujourd'hui » : une apostrophe, et se termine par -ui." },

        { id: "mots-invariables-08", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il a … terminé son devoir : il lui reste une ligne.",
          choix: ["presque", "presqu", "près que"], reponse: "presque",
          explication: "« presque » s'écrit en un seul mot." },

        { id: "mots-invariables-09", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Luna lit … le soir, pas tous les jours.",
          choix: ["parfois", "par fois", "parfoi"], reponse: "parfois",
          explication: "« parfois » (= de temps en temps) s'écrit en un seul mot, avec un « s »." },

        { id: "mots-invariables-10", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "… , les sorciers voyageaient en carrosse volant.",
          choix: ["Autrefois", "Autre fois", "Autrefoi"], reponse: "Autrefois",
          explication: "« autrefois » (= il y a longtemps) : un seul mot, avec un « s »." },

        { id: "mots-invariables-11", type: "qcm", consigne: "Choisis le mot invariable.",
          phrase: "Le train part … cinq minutes.",
          choix: ["dans", "dent", "d'en"], reponse: "dans",
          explication: "« dans » (le temps ou le lieu) s'écrit d-a-n-s." },

        { id: "mots-invariables-12", type: "qcm", consigne: "Choisis le mot invariable.",
          phrase: "Il s'entraîne dur … jamais se plaindre.",
          choix: ["sans", "sens", "cent"], reponse: "sans",
          explication: "« sans » = il ne se plaint pas. s-a-n-s." },

        { id: "mots-invariables-13", type: "trou", consigne: "Complète avec un mot invariable (comparaison).",
          phrase: "Un Éclair de Feu vole … vite qu'un Nimbus.",
          reponse: "plus", reponses: ["plus"],
          explication: "« plus vite que » : comparaison." },

        { id: "mots-invariables-14", type: "trou", consigne: "Complète (= dans ce cas).",
          phrase: "Si tu es d'accord, … on commence.",
          reponse: "alors", reponses: ["alors"],
          explication: "« alors » : conséquence, se termine par -ors." },

        { id: "mots-invariables-15", type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il n'arrive … à l'heure au cours de potions.",
          choix: ["jamais", "jamait", "jamai"], reponse: "jamais",
          explication: "« jamais » se termine par -ais." },

        { id: "mots-invariables-16", type: "cahier", consigne: "Recopie la phrase sans erreur (attention aux mots invariables et aux verbes).",
          phrase: "« Il travail beaucou, mais il fini bientot. »",
          correction: "Il travaille beaucoup, mais il finit bientôt.",
          explication: "beaucoup (avec « p »), bientôt (accent + « t »), et les verbes : il travaille, il finit." },

        { id: "mots-invariables-17", type: "cahier", consigne: "Complète l'histoire avec : d'abord, ensuite, enfin.",
          phrase: "« … je me lève, … je m'habille, … je pars à l'école. »",
          correction: "D'abord je me lève, ensuite je m'habille, enfin je pars à l'école.",
          explication: "Ces mots servent à ranger les actions dans l'ordre." },

        { id: "mots-invariables-18", type: "cahier", consigne: "Écris une phrase avec « pendant », puis une phrase avec « depuis ».",
          phrase: "à toi d'inventer",
          correction: "Exemple : Il pleut pendant la récréation. / Il attend depuis dix minutes.",
          explication: "Ces mots ne changent jamais d'orthographe." },

        { id: "mots-invariables-19", type: "cahier", consigne: "Recopie ces mots invariables sans erreur (à apprendre par cœur).",
          phrase: "« toujour — beaucou — quelquefoi — longtemp — maintenan »",
          correction: "toujours — beaucoup — quelquefois — longtemps — maintenant",
          explication: "Presque tous ont une lettre muette à la fin." },

        { id: "mots-invariables-20", type: "trou", consigne: "Complète (= une grande quantité).",
          phrase: "J'ai … de devoirs ce soir.",
          reponse: "beaucoup", reponses: ["beaucoup"],
          explication: "« beaucoup » : le « p » final ne s'entend pas." }
      ]
    },

    /* ====================================================================== */
    {
      id: "ordre-alphabetique",
      titre: "L'ordre alphabétique",
      questions: [
        { id: "ordre-alphabetique-01", type: "qcm", consigne: "Quelle lettre vient juste après le F dans l'alphabet ?",
          phrase: "… E … F … ?",
          choix: ["G", "E", "H"], reponse: "G",
          explication: "… E, F, G, H … Le G suit le F." },

        { id: "ordre-alphabetique-02", type: "qcm", consigne: "Quelle lettre vient juste avant le M ?",
          phrase: "… ? … M …",
          choix: ["L", "N", "K"], reponse: "L",
          explication: "… K, L, M, N … Le L précède le M." },

        { id: "ordre-alphabetique-03", type: "qcm", consigne: "Dans le dictionnaire, lequel vient en premier ?",
          phrase: "hibou · balai · chaudron",
          choix: ["balai", "chaudron", "hibou"], reponse: "balai",
          explication: "On classe par la 1re lettre : b, c, h → « balai » d'abord." },

        { id: "ordre-alphabetique-04", type: "qcm", consigne: "Lequel vient en premier dans le dictionnaire ?",
          phrase: "potion · poison",
          choix: ["poison", "potion"], reponse: "poison",
          explication: "« poi-s » et « poi-t » : le « s » vient avant le « t »." },

        { id: "ordre-alphabetique-05", type: "qcm", consigne: "Lequel vient en dernier dans le dictionnaire ?",
          phrase: "sort · sorcier · souris",
          choix: ["souris", "sort", "sorcier"], reponse: "souris",
          explication: "« sor… » vient avant « sou… » (o puis r, o puis u : le « u » est après le « r »)." },

        { id: "ordre-alphabetique-06", type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "chat · chien · cheval",
          choix: ["chat", "cheval", "chien"], reponse: "chat",
          explication: "On compare la 3e lettre : cha… avant che… (a avant e)." },

        { id: "ordre-alphabetique-07", type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "lune · livre",
          choix: ["livre", "lune"], reponse: "livre",
          explication: "« li… » avant « lu… » : le « i » est avant le « u »." },

        { id: "ordre-alphabetique-08", type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "magie · maison · manger",
          choix: ["magie", "maison", "manger"], reponse: "magie",
          explication: "On compare la 3e lettre : mag… avant mai… avant man…" },

        { id: "ordre-alphabetique-09", type: "trou", consigne: "Écris la lettre qui vient juste après le P.",
          phrase: "… O … P … ?",
          reponse: "q", reponses: ["q"],
          explication: "… O, P, Q, R …" },

        { id: "ordre-alphabetique-10", type: "cahier", consigne: "Range ces mots dans l'ordre alphabétique.",
          phrase: "« sorcier — baguette — potion — école — hibou »",
          correction: "baguette — école — hibou — potion — sorcier",
          explication: "On classe par la 1re lettre : b, é(e), h, p, s." },

        { id: "ordre-alphabetique-11", type: "cahier", consigne: "Range ces mots dans l'ordre alphabétique (ils commencent tous par « c »).",
          phrase: "« chat — cape — chaudron — cœur — classe »",
          correction: "cape — chat — chaudron — classe — cœur",
          explication: "On compare la 2e lettre, puis la 3e : ca…, ch(a), ch(a-t/u), cl…, cœ…" },

        { id: "ordre-alphabetique-12", type: "cahier", consigne: "Écris l'alphabet en entier, en minuscules.",
          phrase: "de a à z",
          correction: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
          explication: "26 lettres. C'est l'ordre qu'on utilise dans le dictionnaire." }
      ]
    },

    /* ====================================================================== */
    {
      id: "conj-2e-groupe",
      titre: "Le présent : verbes du 2e groupe (-ir)",
      questions: [
        { id: "conj-2e-groupe-01", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Les élèves … leur exercice de mathématiques. (finir)",
          choix: ["finissent", "finit", "finis"], reponse: "finissent",
          explication: "2e groupe : je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent." },

        { id: "conj-2e-groupe-02", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Je … un livre à la bibliothèque de Poudlard. (choisir)",
          choix: ["choisis", "choisit", "choisi"], reponse: "choisis",
          explication: "Avec « je », le 2e groupe prend -is : je choisis." },

        { id: "conj-2e-groupe-03", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Tu … beaucoup cette année ! (grandir)",
          choix: ["grandis", "grandit", "grandi"], reponse: "grandis",
          explication: "Avec « tu », le 2e groupe prend -is : tu grandis." },

        { id: "conj-2e-groupe-04", type: "qcm", consigne: "Conjugue au présent (attention au pluriel).",
          phrase: "Nous … avant de lever la main. (réfléchir)",
          choix: ["réfléchissons", "réfléchons", "réflechissons"], reponse: "réfléchissons",
          explication: "Au 2e groupe, « nous » prend -issons : nous réfléchissons." },

        { id: "conj-2e-groupe-05", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Vous … le chaudron d'eau claire. (remplir)",
          choix: ["remplissez", "remplez", "remplisez"], reponse: "remplissez",
          explication: "Au 2e groupe, « vous » prend -issez : vous remplissez." },

        { id: "conj-2e-groupe-06", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Le public … à la fin du match de Quidditch. (applaudir)",
          choix: ["applaudit", "applaudis", "aplaudit"], reponse: "applaudit",
          explication: "Avec « il » / « le public », le 2e groupe prend -it : il applaudit." },

        { id: "conj-2e-groupe-07", type: "qcm", consigne: "Terminaison qu'on n'entend pas.",
          phrase: "En automne, les feuilles … puis tombent. (rougir)",
          choix: ["rougissent", "rougit", "rougisent"], reponse: "rougissent",
          explication: "« Les feuilles » = ils : ils rougissent (-issent, muet)." },

        { id: "conj-2e-groupe-08", type: "qcm", consigne: "1er ou 2e groupe ? « grandir » est du 2e groupe.",
          phrase: "Nous … de quelques centimètres chaque année. (grandir)",
          choix: ["grandissons", "grandons", "grandisons"], reponse: "grandissons",
          explication: "grandir → nous grandissons (jamais « grandons »)." },

        { id: "conj-2e-groupe-09", type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Elle … toujours à la maîtresse. (obéir)",
          choix: ["obéit", "obéis", "obéi"], reponse: "obéit",
          explication: "Avec « elle », le 2e groupe prend -it : elle obéit." },

        { id: "conj-2e-groupe-10", type: "qcm", consigne: "Conjugue au présent. « on » se conjugue comme « il ».",
          phrase: "On … le pas dans la montée. (ralentir)",
          choix: ["ralentit", "ralentis", "ralenti"], reponse: "ralentit",
          explication: "on ralentit (comme « il ralentit »)." },

        { id: "conj-2e-groupe-11", type: "trou", consigne: "Conjugue « finir » au présent.",
          phrase: "Nous … la dictée avant la récréation.",
          reponse: "finissons", reponses: ["finissons", "nous finissons"],
          explication: "nous finissons : au pluriel du 2e groupe, on ajoute -iss-." },

        { id: "conj-2e-groupe-12", type: "trou", consigne: "Conjugue « choisir » au présent.",
          phrase: "Les capitaines … leur équipe.",
          reponse: "choisissent", reponses: ["choisissent", "ils choisissent"],
          explication: "ils choisissent (-issent, qu'on n'entend pas)." },

        { id: "conj-2e-groupe-13", type: "cahier", consigne: "Écris tout le présent du verbe « finir » (je, tu, il, nous, vous, ils).",
          phrase: "verbe : finir (2e groupe)",
          correction: "je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.",
          explication: "Terminaisons du 2e groupe : -is, -is, -it, -issons, -issez, -issent." },

        { id: "conj-2e-groupe-14", type: "cahier", consigne: "Écris tout le présent du verbe « grandir ».",
          phrase: "verbe : grandir (2e groupe)",
          correction: "je grandis, tu grandis, il grandit, nous grandissons, vous grandissez, ils grandissent.",
          explication: "Comme « finir » : -iss- à toutes les personnes du pluriel." },

        { id: "conj-2e-groupe-15", type: "tableau", consigne: "Complète la conjugaison au présent.",
          verbe: "finir",
          formes: [
            { pron: "je", forme: "finis" },
            { pron: "tu", debut: "fin", fin: "is" },
            { pron: "il/elle", debut: "fin", fin: "it" },
            { pron: "nous", forme: "finissons" },
            { pron: "vous", debut: "fin", fin: "issez" },
            { pron: "ils/elles", forme: "finissent" }
          ],
          explication: "2e groupe : -is, -is, -it, -issons, -issez, -issent." },

        { id: "conj-2e-groupe-16", type: "tableau", consigne: "Complète la conjugaison au présent.",
          verbe: "réussir",
          formes: [
            { pron: "je", debut: "réuss", fin: "is" },
            { pron: "tu", forme: "réussis" },
            { pron: "il/elle", forme: "réussit" },
            { pron: "nous", debut: "réuss", fin: "issons" },
            { pron: "vous", forme: "réussissez" },
            { pron: "ils/elles", debut: "réuss", fin: "issent" }
          ],
          explication: "réussir : nous réussissons, ils réussissent." },

        { id: "conj-2e-groupe-17", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "finir",
          formes: ["je finis", "tu finis", "il finit", "nous finisons", "vous finissez", "ils finissent"],
          fausse: "nous finisons", correcte: "nous finissons",
          explication: "Au 2e groupe, « nous » prend deux s : nous finissons." },

        { id: "conj-2e-groupe-18", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "choisir",
          formes: ["je choisis", "tu choisis", "il choisit", "nous choisissons", "vous choisisez", "ils choisissent"],
          fausse: "vous choisisez", correcte: "vous choisissez",
          explication: "vous choisissez : deux s." }
      ]
    },

    /* ====================================================================== */
    {
      id: "conj-revision-tableaux",
      titre: "Révision : les conjugaisons complètes (présent)",
      questions: [
        { id: "conj-revision-tableaux-01", type: "tableau", consigne: "Complète la conjugaison au présent.",
          verbe: "chanter",
          formes: [
            { pron: "je", forme: "chante" },
            { pron: "tu", debut: "chant", fin: "es" },
            { pron: "il/elle", debut: "chant", fin: "e" },
            { pron: "nous", forme: "chantons" },
            { pron: "vous", debut: "chant", fin: "ez" },
            { pron: "ils/elles", forme: "chantent" }
          ],
          explication: "1er groupe : -e, -es, -e, -ons, -ez, -ent." },

        { id: "conj-revision-tableaux-02", type: "tableau", consigne: "Complète la conjugaison au présent (verbe en -ger).",
          verbe: "manger",
          formes: [
            { pron: "je", debut: "mang", fin: "e" },
            { pron: "tu", forme: "manges" },
            { pron: "il/elle", forme: "mange" },
            { pron: "nous", debut: "mang", fin: "eons" },
            { pron: "vous", forme: "mangez" },
            { pron: "ils/elles", debut: "mang", fin: "ent" }
          ],
          explication: "manger : « nous mangeons » garde le e pour le son [j]." },

        { id: "conj-revision-tableaux-03", type: "tableau", consigne: "Complète la conjugaison au présent (2e groupe).",
          verbe: "grandir",
          formes: [
            { pron: "je", forme: "grandis" },
            { pron: "tu", debut: "grand", fin: "is" },
            { pron: "il/elle", forme: "grandit" },
            { pron: "nous", debut: "grand", fin: "issons" },
            { pron: "vous", forme: "grandissez" },
            { pron: "ils/elles", debut: "grand", fin: "issent" }
          ],
          explication: "2e groupe : -iss- à tout le pluriel." },

        { id: "conj-revision-tableaux-04", type: "tableau", consigne: "Complète la conjugaison du verbe être au présent.",
          verbe: "être",
          formes: [
            { pron: "je", forme: "suis" },
            { pron: "tu", debut: "", fin: "es" },
            { pron: "il/elle", forme: "est" },
            { pron: "nous", forme: "sommes" },
            { pron: "vous", debut: "", fin: "êtes" },
            { pron: "ils/elles", debut: "", fin: "sont" }
          ],
          explication: "être : je suis, tu es, il est, nous sommes, vous êtes, ils sont." },

        { id: "conj-revision-tableaux-05", type: "tableau", consigne: "Complète la conjugaison du verbe avoir au présent.",
          verbe: "avoir",
          formes: [
            { pron: "j'", forme: "ai" },
            { pron: "tu", forme: "as" },
            { pron: "il/elle", debut: "", fin: "a" },
            { pron: "nous", debut: "", fin: "avons" },
            { pron: "vous", forme: "avez" },
            { pron: "ils/elles", debut: "", fin: "ont" }
          ],
          explication: "avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont." },

        { id: "conj-revision-tableaux-06", type: "tableau", consigne: "Complète la conjugaison du verbe aller au présent.",
          verbe: "aller",
          formes: [
            { pron: "je", debut: "", fin: "vais" },
            { pron: "tu", forme: "vas" },
            { pron: "il/elle", forme: "va" },
            { pron: "nous", debut: "", fin: "allons" },
            { pron: "vous", forme: "allez" },
            { pron: "ils/elles", debut: "", fin: "vont" }
          ],
          explication: "aller : je vais, tu vas, il va, nous allons, vous allez, ils vont." },

        { id: "conj-revision-tableaux-07", type: "tableau", consigne: "Complète la conjugaison du verbe faire au présent.",
          verbe: "faire",
          formes: [
            { pron: "je", forme: "fais" },
            { pron: "tu", forme: "fais" },
            { pron: "il/elle", forme: "fait" },
            { pron: "nous", debut: "", fin: "faisons" },
            { pron: "vous", debut: "", fin: "faites" },
            { pron: "ils/elles", debut: "", fin: "font" }
          ],
          explication: "faire : nous faisons, vous faites, ils font." },

        { id: "conj-revision-tableaux-08", type: "tableau", consigne: "Complète la conjugaison du verbe venir au présent.",
          verbe: "venir",
          formes: [
            { pron: "je", forme: "viens" },
            { pron: "tu", debut: "", fin: "viens" },
            { pron: "il/elle", forme: "vient" },
            { pron: "nous", debut: "", fin: "venons" },
            { pron: "vous", forme: "venez" },
            { pron: "ils/elles", debut: "", fin: "viennent" }
          ],
          explication: "venir : je viens, nous venons, ils viennent (deux n)." },

        { id: "conj-revision-tableaux-09", type: "tableau", consigne: "Complète la conjugaison du verbe prendre au présent.",
          verbe: "prendre",
          formes: [
            { pron: "je", forme: "prends" },
            { pron: "tu", forme: "prends" },
            { pron: "il/elle", forme: "prend" },
            { pron: "nous", debut: "", fin: "prenons" },
            { pron: "vous", debut: "", fin: "prenez" },
            { pron: "ils/elles", debut: "", fin: "prennent" }
          ],
          explication: "prendre : nous prenons, ils prennent (deux n)." },

        { id: "conj-revision-tableaux-10", type: "tableau", consigne: "Complète la conjugaison du verbe voir au présent.",
          verbe: "voir",
          formes: [
            { pron: "je", debut: "", fin: "vois" },
            { pron: "tu", forme: "vois" },
            { pron: "il/elle", forme: "voit" },
            { pron: "nous", debut: "", fin: "voyons" },
            { pron: "vous", forme: "voyez" },
            { pron: "ils/elles", debut: "", fin: "voient" }
          ],
          explication: "voir : nous voyons, ils voient." },

        { id: "conj-revision-tableaux-11", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "être",
          formes: ["je suis", "tu es", "il est", "nous somme", "vous êtes", "ils sont"],
          fausse: "nous somme", correcte: "nous sommes",
          explication: "nous sommes (avec un s)." },

        { id: "conj-revision-tableaux-12", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "aller",
          formes: ["je vais", "tu vas", "il va", "nous allons", "vous aller", "ils vont"],
          fausse: "vous aller", correcte: "vous allez",
          explication: "Avec « vous » : -ez, pas l'infinitif -er." },

        { id: "conj-revision-tableaux-13", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "faire",
          formes: ["je fais", "tu fais", "il fait", "nous faisons", "vous faisez", "ils font"],
          fausse: "vous faisez", correcte: "vous faites",
          explication: "« vous faites », jamais « vous faisez »." },

        { id: "conj-revision-tableaux-14", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "jouer",
          formes: ["je joue", "tu joues", "il joue", "nous jouons", "vous jouez", "ils joue"],
          fausse: "ils joue", correcte: "ils jouent",
          explication: "Avec « ils » : -ent (qu'on n'entend pas)." },

        { id: "conj-revision-tableaux-15", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "réfléchir",
          formes: ["je réfléchis", "tu réfléchis", "il réfléchit", "nous réfléchissons", "vous réfléchissez", "ils réfléchisent"],
          fausse: "ils réfléchisent", correcte: "ils réfléchissent",
          explication: "2e groupe : ils réfléchissent (deux s)." },

        { id: "conj-revision-tableaux-16", type: "erreur", consigne: "Une forme est mal écrite. Clique dessus.",
          verbe: "venir",
          formes: ["je viens", "tu viens", "il vient", "nous venons", "vous venez", "ils vienent"],
          fausse: "ils vienent", correcte: "ils viennent",
          explication: "ils viennent : deux n." },

        { id: "conj-revision-tableaux-17", type: "cahier", consigne: "Écris tout le présent du verbe « être ».",
          phrase: "verbe : être",
          correction: "je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
          explication: "À connaître par cœur." },

        { id: "conj-revision-tableaux-18", type: "cahier", consigne: "Écris tout le présent du verbe « faire ».",
          phrase: "verbe : faire",
          correction: "je fais, tu fais, il fait, nous faisons, vous faites, ils font.",
          explication: "Pièges : nous faisons, vous faites." },

        { id: "conj-revision-tableaux-19", type: "cahier", consigne: "Écris tout le présent du verbe « prendre ».",
          phrase: "verbe : prendre",
          correction: "je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent.",
          explication: "nous prenons (un n), ils prennent (deux n)." },

        { id: "conj-revision-tableaux-20", type: "cahier", consigne: "Choisis un verbe en -er et écris tout son présent (je, tu, il, nous, vous, ils).",
          phrase: "un verbe du 1er groupe au choix",
          correction: "Exemple avec « regarder » : je regarde, tu regardes, il regarde, nous regardons, vous regardez, ils regardent.",
          explication: "Tous les verbes en -er suivent ce modèle." }
      ]
    }

  ]
};

/* -----------------------------------------------------------------------------
   Pour ajouter la période 2 : décommente et complète, puis ajoute-la
   dans PERIODES ci-dessous.

   const periode2 = {
     id: "periode2",
     titre: "Période 2 — L'automne à Poudlard",
     themes: [ { id: "...", titre: "...", questions: [ ... ] } ]
   };
----------------------------------------------------------------------------- */

const PERIODES = {
  periode1: periode1,
  // periode2: periode2,
};
