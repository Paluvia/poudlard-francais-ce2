/* =============================================================================
   CONTENU PÉDAGOGIQUE — École de Sorcellerie (Français CE2)
   =============================================================================

   Ce fichier contient TOUTES les questions. Il est fait pour être enrichi
   facilement au fil de l'année, sans toucher au reste du code.

   ---------------------------------------------------------------------------
   FORMAT D'UNE QUESTION
   ---------------------------------------------------------------------------
   {
     type: "qcm"     -> l'enfant choisit parmi des boutons
        ou "trou"     -> l'enfant écrit la réponse au clavier
        ou "cahier",  -> l'enfant écrit sur son cahier, regarde la correction,
                         puis coche « j'avais bon » ou « j'avais une erreur »

     consigne: "Choisis la bonne écriture.",   // ce qu'il faut faire
     phrase: "Harry … une baguette magique.",  // le caractère … marque le trou

     // pour "qcm" :
     choix: ["a", "as", "à"],
     reponse: "a",                             // doit être exactement dans "choix"

     // pour "trou" :
     reponse: "vais",
     reponses: ["vais", "je vais"],            // variantes acceptées (optionnel)

     // pour "cahier" :
     correction: "Les élèves vont à la bibliothèque.",  // la réponse modèle

     explication: "aller → ils vont…"          // montrée après la réponse
   }

   ---------------------------------------------------------------------------
   RÈGLES
   ---------------------------------------------------------------------------
   - Une question réussie n'est plus reposée à cet enfant (sauf s'il la
     « revoit » depuis l'écran Progression). Une question ratée revient.
   - Environ 1 question sur 3 d'une session est de type "cahier".
   - Modifier le texte d'une question (champ "phrase") remet cette question
     dans les questions « à découvrir » : c'est normal.

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
        { type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Nous … prêts pour le cours de potions.",
          choix: ["sommes", "êtes", "sont"], reponse: "sommes",
          explication: "être : je suis, tu es, il est, nous sommes, vous êtes, ils sont." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Le professeur Rogue … de mauvaise humeur.",
          choix: ["es", "est", "ait"], reponse: "est",
          explication: "Avec « il » / « elle », être fait « est »." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Vous … les meilleurs en métamorphose.",
          choix: ["sommes", "êtes", "sont"], reponse: "êtes",
          explication: "Avec « vous », être fait « êtes » (accent circonflexe sur le ê)." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe être.",
          phrase: "Les portraits des sorciers … accrochés au mur.",
          choix: ["est", "sont", "ont"], reponse: "sont",
          explication: "« Les portraits » = ils : être fait « sont »." },

        { type: "trou", consigne: "Conjugue le verbe être au présent.",
          phrase: "Les fantômes … invisibles le jour.",
          reponse: "sont", reponses: ["sont", "ils sont", "elles sont"],
          explication: "ils sont. être : je suis, tu es, il est, nous sommes, vous êtes, ils sont." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe avoir.",
          phrase: "Les élèves de première année … peur de la Forêt interdite.",
          choix: ["a", "ont", "sont"], reponse: "ont",
          explication: "avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont. « avoir peur »." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe avoir.",
          phrase: "J'… un balai flambant neuf.",
          choix: ["ai", "aie", "es"], reponse: "ai",
          explication: "Avec « je », avoir fait « ai » : j'ai." },

        { type: "trou", consigne: "Conjugue le verbe avoir au présent.",
          phrase: "Vous … de la chance d'avoir Hagrid comme professeur.",
          reponse: "avez", reponses: ["avez", "vous avez"],
          explication: "vous avez. avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont." },

        { type: "qcm", consigne: "« a » (verbe avoir) ou « à » (mot invariable) ?",
          phrase: "Hermione pense … ses révisions.",
          choix: ["a", "à"], reponse: "à",
          explication: "On ne peut pas dire « avait ». C'est « à », le mot invariable." },

        { type: "qcm", consigne: "« a » (verbe avoir) ou « à » (mot invariable) ?",
          phrase: "Ron … oublié sa cravate dans le dortoir.",
          choix: ["a", "à"], reponse: "a",
          explication: "On peut dire « avait oublié » : c'est le verbe avoir, « a »." },

        { type: "qcm", consigne: "« on » ou « ont » ?",
          phrase: "… range les chaudrons à la fin du cours.",
          choix: ["On", "Ont"], reponse: "On",
          explication: "« on » = quelqu'un. « ont » = verbe avoir (ils ont)." },

        { type: "qcm", consigne: "« on » ou « ont » ?",
          phrase: "Les elfes de maison … tout nettoyé.",
          choix: ["on", "ont"], reponse: "ont",
          explication: "« Les elfes ont nettoyé » : verbe avoir, « ont »." },

        { type: "qcm", consigne: "« et » (= et puis) ou « est » (verbe être) ?",
          phrase: "Harry … Ron sont dans la même chambre.",
          choix: ["et", "est"], reponse: "et",
          explication: "« et » relie deux mots. On ne peut pas dire « Harry était Ron »." },

        { type: "qcm", consigne: "« et » ou « est » ?",
          phrase: "Le Vif d'or … minuscule et rapide.",
          choix: ["et", "est"], reponse: "est",
          explication: "On peut dire « était minuscule » : verbe être, « est »." },

        { type: "qcm", consigne: "« son » (à lui) ou « sont » (verbe être) ?",
          phrase: "Neville a encore perdu … crapaud.",
          choix: ["son", "sont"], reponse: "son",
          explication: "« son crapaud » = le crapaud à lui. « sont » = verbe être (ils sont)." },

        { type: "qcm", consigne: "« son » ou « sont » ?",
          phrase: "Les couloirs du château … sombres la nuit.",
          choix: ["son", "sont"], reponse: "sont",
          explication: "« Les couloirs étaient sombres » : verbe être, « sont »." },

        { type: "qcm", consigne: "Quelle phrase est écrite sans erreur ?",
          phrase: "a / à / et / est : une seule phrase est juste.",
          choix: ["Il a une baguette et elle est magique.",
                  "Il à une baguette est elle et magique.",
                  "Il a une baguette est elle est magique."],
          reponse: "Il a une baguette et elle est magique.",
          explication: "a = avoir · et = et puis · est = être." },

        { type: "cahier", consigne: "Écris ces phrases en remplaçant « je » par « nous ».",
          phrase: "« Je suis à Poudlard. J'ai un hibou. »",
          correction: "Nous sommes à Poudlard. Nous avons un hibou.",
          explication: "être → nous sommes · avoir → nous avons." },

        { type: "cahier", consigne: "Recopie la phrase en corrigeant les 2 erreurs.",
          phrase: "« Les élèves on cours et il sont en retard. »",
          correction: "Les élèves ont cours et ils sont en retard.",
          explication: "on → ont (verbe avoir) · il → ils (le sujet est au pluriel)." },

        { type: "cahier", consigne: "Conjugue le verbe être au présent avec tous les pronoms (je, tu, il, nous, vous, ils).",
          phrase: "verbe : être",
          correction: "je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
          explication: "À apprendre par cœur : c'est un verbe qu'on utilise tout le temps." },

        { type: "cahier", consigne: "Conjugue le verbe avoir au présent avec tous les pronoms.",
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
        { type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Nous … au cours de vol sur balai.",
          choix: ["allons", "allez", "vont"], reponse: "allons",
          explication: "aller : je vais, tu vas, il va, nous allons, vous allez, ils vont." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Le Poudlard Express … vers l'école.",
          choix: ["va", "vas", "vont"], reponse: "va",
          explication: "« le train » = il : aller fait « va »." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe aller.",
          phrase: "Vous … chez le directeur après le dîner.",
          choix: ["allons", "allez", "vont"], reponse: "allez",
          explication: "Avec « vous », aller fait « allez »." },

        { type: "trou", consigne: "Conjugue le verbe aller au présent.",
          phrase: "Les élèves de troisième année … à Pré-au-Lard.",
          reponse: "vont", reponses: ["vont", "ils vont", "elles vont"],
          explication: "ils vont. aller : je vais, tu vas, il va, nous allons, vous allez, ils vont." },

        { type: "qcm", consigne: "à / au / aux ? (aller + le lieu)",
          phrase: "Harry va … terrain de Quidditch pour s'entraîner.",
          choix: ["à", "au", "aux"], reponse: "au",
          explication: "« à + le » se transforme en « au » : au terrain." },

        { type: "qcm", consigne: "à / au / aux ?",
          phrase: "Nous allons … serres de botanique.",
          choix: ["à", "au", "aux"], reponse: "aux",
          explication: "« à + les » se transforme en « aux » : aux serres." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Je … mes devoirs de sortilèges avant le dîner.",
          choix: ["fais", "fait", "fez"], reponse: "fais",
          explication: "faire : je fais, tu fais, il fait, nous faisons, vous faites, ils font." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Hermione … toujours ses exercices en avance.",
          choix: ["fais", "fait", "fez"], reponse: "fait",
          explication: "Avec « elle », faire fait « fait »." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Vous … une potion très dangereuse.",
          choix: ["faisez", "faites", "faisiez"], reponse: "faites",
          explication: "Avec « vous », faire fait « faites » (comme « vous êtes », « vous dites »)." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe faire.",
          phrase: "Les elfes … la cuisine pour tout le château.",
          choix: ["font", "fait", "faisent"], reponse: "font",
          explication: "Avec « ils », faire fait « font »." },

        { type: "trou", consigne: "Conjugue le verbe faire au présent.",
          phrase: "Nous … attention pendant le cours de potions.",
          reponse: "faisons", reponses: ["faisons", "nous faisons"],
          explication: "nous faisons (on écrit « ai » même si on entend « e »)." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Le Choixpeau … dans quelle maison tu iras.",
          choix: ["dis", "dit", "dix"], reponse: "dit",
          explication: "dire : je dis, tu dis, il dit, nous disons, vous dites, ils disent." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Tu … toujours la vérité à tes amis.",
          choix: ["dis", "dit", "dies"], reponse: "dis",
          explication: "Avec « tu », dire fait « dis »." },

        { type: "qcm", consigne: "Choisis la bonne forme du verbe dire.",
          phrase: "Vous … au revoir au professeur Chourave.",
          choix: ["disez", "dites", "disiez"], reponse: "dites",
          explication: "Avec « vous », dire fait « dites » (comme « vous faites »)." },

        { type: "trou", consigne: "Conjugue le verbe dire au présent.",
          phrase: "Les jumeaux … un secret à l'oreille de Ron.",
          reponse: "disent", reponses: ["disent", "ils disent"],
          explication: "ils disent. dire : je dis, tu dis, il dit, nous disons, vous dites, ils disent." },

        { type: "qcm", consigne: "Complète.",
          phrase: "Que … -vous pendant les vacances ?",
          choix: ["faisez", "faites", "faisiez"], reponse: "faites",
          explication: "« vous faites », jamais « vous faisez »." },

        { type: "cahier", consigne: "Écris la phrase au présent en conjuguant les verbes entre parenthèses.",
          phrase: "« Aujourd'hui, nous (aller) à Pré-au-Lard et nous (faire) des achats. »",
          correction: "Aujourd'hui, nous allons à Pré-au-Lard et nous faisons des achats.",
          explication: "aller → nous allons · faire → nous faisons." },

        { type: "cahier", consigne: "Conjugue le verbe faire au présent avec tous les pronoms.",
          phrase: "verbe : faire",
          correction: "je fais, tu fais, il fait, nous faisons, vous faites, ils font.",
          explication: "Les pièges : « nous faisons » et « vous faites »." },

        { type: "cahier", consigne: "Recopie en corrigeant les 2 erreurs.",
          phrase: "« Vous faisez un vœu et vous le disez tout bas. »",
          correction: "Vous faites un vœu et vous le dites tout bas.",
          explication: "vous faites · vous dites (jamais « faisez » ni « disez »)." },

        { type: "cahier", consigne: "Écris la phrase en remplaçant « je » par « ils ».",
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
        { type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Je … la carte du Maraudeur avec attention. (regarder)",
          choix: ["regarde", "regardes", "regardent"], reponse: "regarde",
          explication: "-er au présent : je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent." },

        { type: "qcm", consigne: "Conjugue au présent.",
          phrase: "Tu … vers la serre numéro trois. (marcher)",
          choix: ["marche", "marches", "marchent"], reponse: "marches",
          explication: "Avec « tu », un verbe en -er prend -es." },

        { type: "qcm", consigne: "Attention à la terminaison qu'on n'entend pas.",
          phrase: "Les hiboux … le courrier chaque matin. (apporter)",
          choix: ["apporte", "apportent", "apportes"], reponse: "apportent",
          explication: "« Les hiboux » = ils : on écrit -ent (muet)." },

        { type: "qcm", consigne: "Attention à la terminaison qu'on n'entend pas.",
          phrase: "Dans la classe, les chaudrons … doucement. (chauffer)",
          choix: ["chauffe", "chauffent", "chauffes"], reponse: "chauffent",
          explication: "« Les chaudrons » = ils : terminaison -ent." },

        { type: "qcm", consigne: "Verbe en -ger : on garde le « e » devant « ons ».",
          phrase: "Nous … à la Grande Salle à midi. (manger)",
          choix: ["mangons", "mangeons", "mangions"], reponse: "mangeons",
          explication: "manger → nous mangeons (le « e » garde le son [j])." },

        { type: "qcm", consigne: "Verbe en -ger : on garde le « e » devant « ons ».",
          phrase: "Nous … nos affaires avant de sortir. (ranger)",
          choix: ["rangons", "rangeons", "rangions"], reponse: "rangeons",
          explication: "ranger → nous rangeons." },

        { type: "qcm", consigne: "Verbe en -cer : le « c » devient « ç » devant « ons ».",
          phrase: "Nous … le cours par une révision. (commencer)",
          choix: ["commencons", "commençons", "commencions"], reponse: "commençons",
          explication: "commencer → nous commençons (ç pour garder le son [s])." },

        { type: "qcm", consigne: "Verbe en -cer : le « c » devient « ç » devant « ons ».",
          phrase: "Nous … prudemment sur nos balais. (avancer)",
          choix: ["avancons", "avançons", "avancions"], reponse: "avançons",
          explication: "avancer → nous avançons." },

        { type: "qcm", consigne: "Terminaison -ez ou infinitif -er ?",
          phrase: "Vous … bien votre potion avant de la boire. (mélanger)",
          choix: ["mélangez", "mélanger"], reponse: "mélangez",
          explication: "Après « vous », on écrit -ez : vous mélangez." },

        { type: "qcm", consigne: "Terminaison -ez ou infinitif -er ?",
          phrase: "Il faut … la formule à voix haute. (prononcer)",
          choix: ["prononcez", "prononcer"], reponse: "prononcer",
          explication: "Après « il faut », le verbe reste à l'infinitif : -er." },

        { type: "qcm", consigne: "Quel pronom convient ?",
          phrase: "… écoutons le professeur Flitwick.",
          choix: ["Nous", "Vous", "Ils"], reponse: "Nous",
          explication: "La terminaison « -ons » va avec « nous »." },

        { type: "qcm", consigne: "Le sujet « la classe » est au singulier.",
          phrase: "La classe de Gryffondor … un grand exposé sur les dragons. (préparer)",
          choix: ["prépare", "préparent", "prépares"], reponse: "prépare",
          explication: "« la classe » = elle (un seul groupe) : terminaison -e." },

        { type: "trou", consigne: "Conjugue « jouer » au présent.",
          phrase: "Nous … dans la cour pendant la récréation.",
          reponse: "jouons", reponses: ["jouons", "nous jouons"],
          explication: "nous jouons (terminaison -ons)." },

        { type: "trou", consigne: "Conjugue « travailler » au présent.",
          phrase: "Les élèves sérieux … tous les soirs.",
          reponse: "travaillent", reponses: ["travaillent", "ils travaillent"],
          explication: "ils travaillent (terminaison -ent, muette)." },

        { type: "qcm", consigne: "« on » se conjugue comme « il ».",
          phrase: "On … une nouvelle formule aujourd'hui. (étudier)",
          choix: ["étudie", "étudies", "étudient"], reponse: "étudie",
          explication: "on étudie (comme « il étudie »)." },

        { type: "cahier", consigne: "Écris la phrase en mettant le sujet au pluriel.",
          phrase: "« Le sorcier lance un sort et récite la formule. »",
          correction: "Les sorciers lancent un sort et récitent la formule.",
          explication: "Sujet au pluriel → verbes en -ent (qu'on n'entend pas)." },

        { type: "cahier", consigne: "Écris la phrase au présent en conjuguant les verbes.",
          phrase: "« Nous (commencer) le cours, puis nous (ranger) le matériel et nous (manger). »",
          correction: "Nous commençons le cours, puis nous rangeons le matériel et nous mangeons.",
          explication: "-cer → çons · -ger → geons." },

        { type: "cahier", consigne: "Recopie en corrigeant les erreurs de terminaison.",
          phrase: "« Les élèves regarde le tableau et écoute la maîtresse. »",
          correction: "Les élèves regardent le tableau et écoutent la maîtresse.",
          explication: "Sujet pluriel « les élèves » → -ent." },

        { type: "cahier", consigne: "Transforme la phrase avec « vous ».",
          phrase: "« Tu ranges ta chambre et tu fermes la fenêtre. »",
          correction: "Vous rangez votre chambre et vous fermez la fenêtre.",
          explication: "Avec « vous » : terminaison -ez, et « ta » devient « votre »." },

        { type: "cahier", consigne: "Conjugue le verbe « chanter » au présent avec tous les pronoms.",
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
        { type: "qcm", consigne: "a (verbe avoir) ou à (mot invariable) ?",
          phrase: "Le cours de vol commence … huit heures.",
          choix: ["a", "à"], reponse: "à",
          explication: "Ici on ne peut pas dire « avait » : c'est « à »." },

        { type: "qcm", consigne: "a ou à ?",
          phrase: "Ce vieux chaudron … déjà servi mille fois.",
          choix: ["a", "à"], reponse: "a",
          explication: "On peut dire « avait servi » : verbe avoir, « a »." },

        { type: "qcm", consigne: "a ou à ?",
          phrase: "Luna retourne … la bibliothèque.",
          choix: ["a", "à"], reponse: "à",
          explication: "« retourne à un endroit » : « à » invariable." },

        { type: "qcm", consigne: "et (= et puis) ou est (verbe être) ?",
          phrase: "Le chien … le chat de Rusard dorment ensemble.",
          choix: ["et", "est"], reponse: "et",
          explication: "« et » relie deux mots : le chien ET le chat." },

        { type: "qcm", consigne: "et ou est ?",
          phrase: "La cape de Harry … vraiment magique.",
          choix: ["et", "est"], reponse: "est",
          explication: "On peut dire « était magique » : verbe être, « est »." },

        { type: "qcm", consigne: "on (= quelqu'un) ou ont (verbe avoir) ?",
          phrase: "Ce matin, … doit rendre le devoir de potions.",
          choix: ["on", "ont"], reponse: "on",
          explication: "« on doit » = quelqu'un doit. « ont » = ils ont." },

        { type: "qcm", consigne: "on ou ont ?",
          phrase: "Les sorciers … des pouvoirs magiques.",
          choix: ["on", "ont"], reponse: "ont",
          explication: "« les sorciers ont » : verbe avoir, « ont »." },

        { type: "qcm", consigne: "son (à lui / à elle) ou sont (verbe être) ?",
          phrase: "Drago parle à … hibou dans la volière.",
          choix: ["son", "sont"], reponse: "son",
          explication: "« son hibou » = le hibou à lui." },

        { type: "qcm", consigne: "son ou sont ?",
          phrase: "Les Détraqueurs … très effrayants.",
          choix: ["son", "sont"], reponse: "sont",
          explication: "On peut dire « étaient effrayants » : verbe être, « sont »." },

        { type: "qcm", consigne: "ou (= ou bien) ou où (= à quel endroit) ?",
          phrase: "Tu préfères le jus de citrouille … la Bièraubeurre ?",
          choix: ["ou", "où"], reponse: "ou",
          explication: "« ou bien » : « ou » sans accent (un choix)." },

        { type: "qcm", consigne: "ou ou où ?",
          phrase: "… as-tu rangé ta baguette ?",
          choix: ["Ou", "Où"], reponse: "Où",
          explication: "« à quel endroit » : « où » avec un accent." },

        { type: "qcm", consigne: "ou ou où ?",
          phrase: "La Grande Salle est l'endroit … tout le monde mange.",
          choix: ["ou", "où"], reponse: "où",
          explication: "« l'endroit où » : lieu, donc « où » avec accent." },

        { type: "trou", consigne: "Complète avec ou / où.",
          phrase: "Je ne sais pas … est passé mon manuel de sortilèges.",
          reponse: "où", reponses: ["où"],
          explication: "« à quel endroit est passé… » : « où » avec accent." },

        { type: "qcm", consigne: "Complète.",
          phrase: "Poudlard … une école … les élèves apprennent la magie.",
          choix: ["est … où", "et … ou", "est … ou"], reponse: "est … où",
          explication: "« est » (verbe être) · « où » (le lieu où on apprend)." },

        { type: "cahier", consigne: "Recopie la phrase en choisissant le bon mot.",
          phrase: "« Harry (a/à) une cape (et/est) elle (est/et) magique. »",
          correction: "Harry a une cape et elle est magique.",
          explication: "a = avoir · et = et puis · est = être." },

        { type: "cahier", consigne: "Recopie en corrigeant les 2 erreurs.",
          phrase: "« Les élèves on cours ou il sont en récréation. »",
          correction: "Les élèves ont cours ou ils sont en récréation.",
          explication: "on → ont (verbe avoir) · il → ils. « ou » (= ou bien) reste sans accent." },

        { type: "cahier", consigne: "Écris une phrase avec « a » (verbe avoir), puis une phrase avec « à ».",
          phrase: "à toi d'inventer",
          correction: "Exemple : Elle a un balai neuf. / Elle va à l'école des sorciers.",
          explication: "« a » = avoir (on peut dire « avait ») · « à » = mot invariable." },

        { type: "cahier", consigne: "Écris une phrase avec « ou » (= ou bien), puis une phrase avec « où » (le lieu).",
          phrase: "à toi d'inventer",
          correction: "Exemple : Tu veux du thé ou du café ? / Voici la salle où nous dormons.",
          explication: "« où » avec accent = à quel endroit." },

        { type: "trou", consigne: "Complète avec a / à.",
          phrase: "Elle apprend … voler sur un balai.",
          reponse: "à", reponses: ["à"],
          explication: "« apprendre à faire quelque chose » : « à » invariable." },

        { type: "qcm", consigne: "Quelle phrase est correcte ?",
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
        { type: "qcm", consigne: "Devant m, b, p, le son [an] s'écrit « am ». Complète.",
          phrase: "Ron cueille un ch…pignon dans la forêt.",
          choix: ["am", "an"], reponse: "am",
          explication: "champignon : « am » devant le « p »." },

        { type: "qcm", consigne: "Devant m, b, p, le son [on] s'écrit « om ». Complète.",
          phrase: "Le professeur compte le n…bre d'élèves.",
          choix: ["om", "on"], reponse: "om",
          explication: "nombre : « om » devant le « b »." },

        { type: "qcm", consigne: "Devant m, b, p, le son [in] s'écrit « im ». Complète.",
          phrase: "Neville adore gr…per aux arbres.",
          choix: ["im", "in"], reponse: "im",
          explication: "grimper : « im » devant le « p »." },

        { type: "qcm", consigne: "Complète (attention : ici il n'y a pas de m, b, p juste après).",
          phrase: "Harry pl…ge dans le lac noir.",
          choix: ["on", "om"], reponse: "on",
          explication: "plonge : le son [on] est suivi de « g », on écrit « on »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "l'animal qui grimpe aux arbres et cache des noisettes",
          choix: ["un écureuil", "un écureil", "un écurueil"], reponse: "un écureuil",
          explication: "écureuil se termine par « euil »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "elles poussent sur les arbres et tombent en automne",
          choix: ["des feuilles", "des feuiles", "des feuillent"], reponse: "des feuilles",
          explication: "feuille s'écrit « euille » ; au pluriel, on ajoute un s : feuilles." },

        { type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "une très grande masse de roche, très haute",
          choix: ["une montagne", "une montaigne", "une montanie"], reponse: "une montagne",
          explication: "montagne s'écrit avec « gn »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "le petit animal gris qui aime le fromage",
          choix: ["une souris", "une souri", "une sourit"], reponse: "une souris",
          explication: "souris se termine par un « s » (même au singulier)." },

        { type: "qcm", consigne: "Choisis la bonne écriture du mot.",
          phrase: "on s'en sert pour balayer la salle commune",
          choix: ["un balai", "un balet", "un ballai"], reponse: "un balai",
          explication: "le balai (pour balayer) se termine par « ai »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du son [j] (comme dans « jour »).",
          phrase: "Un pi…on se pose sur le rebord de la fenêtre.",
          choix: ["ge", "g", "j"], reponse: "ge",
          explication: "pigeon : « ge » pour garder le son [j] devant « o »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du son [f].",
          phrase: "Hermione range un vieux télé…one dans son sac.",
          choix: ["ph", "f"], reponse: "ph",
          explication: "téléphone s'écrit avec « ph »." },

        { type: "qcm", consigne: "Choisis la bonne écriture du son [s] (devant a, o, u).",
          phrase: "Un gar…on cueille des plantes avec le professeur.",
          choix: ["ç", "c", "ss"], reponse: "ç",
          explication: "garçon : « ç » pour faire le son [s] devant « o »." },

        { type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "l'arbre est près de la … (cours d'eau)",
          choix: ["rivière", "rivère", "riviére"], reponse: "rivière",
          explication: "rivière : « i » puis « è » (accent grave)." },

        { type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "les Sombrals vivent dans la … interdite",
          choix: ["forêt", "forét", "forè"], reponse: "forêt",
          explication: "forêt : accent circonflexe sur le « ê », puis un « t » muet." },

        { type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "Poudlard organise une grande … de fin d'année",
          choix: ["fête", "féte", "fète"], reponse: "fête",
          explication: "fête : accent circonflexe sur le « ê »." },

        { type: "qcm", consigne: "Quelle est la bonne écriture ?",
          phrase: "Harry … des bonbons chez Honeydukes",
          choix: ["achète", "achéte", "achette"], reponse: "achète",
          explication: "achète : accent grave sur le « è »." },

        { type: "cahier", consigne: "Recopie ces mots en plaçant les accents.",
          phrase: "« eleve — fenetre — pres — theatre »",
          correction: "élève — fenêtre — près — théâtre",
          explication: "é (fermé), è (ouvert), ê (circonflexe). On écoute bien le son." },

        { type: "cahier", consigne: "Recopie la phrase en corrigeant les accents.",
          phrase: "« La forét est prés de la riviere. »",
          correction: "La forêt est près de la rivière.",
          explication: "forêt (ê), près (è), rivière (è)." },

        { type: "cahier", consigne: "Écris 3 mots dans lesquels le son [an] s'écrit « am ».",
          phrase: "indice : c'est le cas devant m, b, p",
          correction: "Exemples : chambre, tambour, jambe, lampe, campagne.",
          explication: "Devant m, b, p : on écrit « am » (et « om », « im », « em »)." },

        { type: "cahier", consigne: "Recopie en écrivant correctement le son [j].",
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
        { type: "qcm", consigne: "Quelle lettre muette termine le mot ? (pense à « petite »)",
          phrase: "un petit chaudron  →  peti…",
          choix: ["t", "d", "s"], reponse: "t",
          explication: "petite → petit (avec un « t »)." },

        { type: "qcm", consigne: "Quelle lettre muette ? (pense à « chanteuse », « chanter »)",
          phrase: "un chan… magique  →  chan…",
          choix: ["t", "s", "d"], reponse: "t",
          explication: "chanter, chanteuse → un chant." },

        { type: "qcm", consigne: "Quelle lettre muette ? (pense à « la bordure »)",
          phrase: "le bor… du lac  →  bor…",
          choix: ["d", "t", "s"], reponse: "d",
          explication: "la bordure → le bord (avec un « d »)." },

        { type: "qcm", consigne: "Quelle lettre muette ? (pense à « grise »)",
          phrase: "un ciel gri…  →  gri…",
          choix: ["s", "t", "x"], reponse: "s",
          explication: "grise → gris (avec un « s »)." },

        { type: "qcm", consigne: "Quelle lettre muette ? (pense à « la rangée », « ranger »)",
          phrase: "le premier ran… de la classe  →  ran…",
          choix: ["g", "t", "d"], reponse: "g",
          explication: "ranger, rangée → un rang (avec un « g »)." },

        { type: "trou", consigne: "Écris la lettre muette finale. (pense à « tapisser »)",
          phrase: "un tapi… de sorcier  →  tapi…",
          reponse: "s", reponses: ["s"],
          explication: "tapisser → un tapis." },

        { type: "trou", consigne: "Écris la lettre muette finale. (pense à « nicher »)",
          phrase: "un ni… d'oiseau  →  ni…",
          reponse: "d", reponses: ["d"],
          explication: "nicher → un nid (avec un « d »)." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un chapeau pointu  →  des …",
          choix: ["chapeaux", "chapeaus", "chapeau"], reponse: "chapeaux",
          explication: "Les noms en -eau prennent « -x » au pluriel." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un cheval  →  des …",
          choix: ["chevaux", "chevals", "cheveaux"], reponse: "chevaux",
          explication: "Les noms en -al font souvent « -aux » au pluriel." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un journal  →  des …",
          choix: ["journaux", "journals", "journeaux"], reponse: "journaux",
          explication: "journal → journaux." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un hibou  →  des …",
          choix: ["hiboux", "hibous", "hibaux"], reponse: "hiboux",
          explication: "hibou fait partie des noms en -ou qui prennent « -x » (hiboux, choux, cailloux…)." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un jeu de cartes  →  des …",
          choix: ["jeux", "jeus", "jeaux"], reponse: "jeux",
          explication: "Les noms en -eu prennent « -x » : des jeux." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "une souris grise  →  des …",
          choix: ["souris", "sourises", "souriss"], reponse: "souris",
          explication: "Les noms déjà terminés par -s ne changent pas au pluriel." },

        { type: "qcm", consigne: "Choisis le pluriel correct.",
          phrase: "un nez  →  des …",
          choix: ["nez", "nés", "nezs"], reponse: "nez",
          explication: "Les noms terminés par -z ne changent pas au pluriel." },

        { type: "cahier", consigne: "Écris ces groupes de mots au pluriel.",
          phrase: "« un cheval rapide — un château fort — un hibou gris »",
          correction: "des chevaux rapides — des châteaux forts — des hiboux gris",
          explication: "cheval → chevaux · château → châteaux · hibou → hiboux · l'adjectif s'accorde aussi." },

        { type: "cahier", consigne: "Recopie en corrigeant les accords.",
          phrase: "« Les élèves portent des chapeau pointu et des cape noir. »",
          correction: "Les élèves portent des chapeaux pointus et des capes noires.",
          explication: "chapeau → chapeaux · cape → capes · les adjectifs s'accordent (pointus, noires)." },

        { type: "cahier", consigne: "Trouve la lettre muette et recopie chaque mot en entier.",
          phrase: "« un cha_ (qui miaule) — le vent chau_ — un li_ (pour dormir) »",
          correction: "un chat — le vent chaud — un lit",
          explication: "chatte → chat · chaude → chaud · lit (on pense à « la literie »)." },

        { type: "cahier", consigne: "Écris le féminin, puis le mot masculin avec sa lettre finale.",
          phrase: "« lour… — blan… — gran… »",
          correction: "lourde → lourd — blanche → blanc — grande → grand",
          explication: "Le féminin fait entendre la lettre muette du masculin." },

        { type: "cahier", consigne: "Écris la phrase au pluriel.",
          phrase: "« Le vieux journal parle de magie. »",
          correction: "Les vieux journaux parlent de magie.",
          explication: "journal → journaux · le verbe se met aussi au pluriel : parlent." },

        { type: "qcm", consigne: "Choisis la bonne phrase.",
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
        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il s'entraîne au balai … une heure.",
          choix: ["depuis", "depui", "depuit"], reponse: "depuis",
          explication: "« depuis » se termine par -uis." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "… , nous irons visiter Pré-au-Lard.",
          choix: ["Bientôt", "Bientot", "Biento"], reponse: "Bientôt",
          explication: "« bientôt » : accent circonflexe sur le « ô », et un « t » final." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Range d'abord tes affaires, … tu joueras.",
          choix: ["ensuite", "en suite", "ensuitte"], reponse: "ensuite",
          explication: "« ensuite » s'écrit en un seul mot." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il a cherché sa baguette … dans le dortoir.",
          choix: ["partout", "par tout", "partous"], reponse: "partout",
          explication: "« partout » s'écrit en un seul mot, sans « s »." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Neville est maladroit, … il est très courageux.",
          choix: ["pourtant", "pourtan", "pour tant"], reponse: "pourtant",
          explication: "« pourtant » (= malgré cela) se termine par -ant." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Les quatre amis travaillent … à la bibliothèque.",
          choix: ["ensemble", "ensembles", "en semble"], reponse: "ensemble",
          explication: "« ensemble » ne prend jamais de « s » : c'est un mot invariable." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Hier il pleuvait ; … , il fait beau.",
          choix: ["aujourd'hui", "aujourd'huit", "ajourd'hui"], reponse: "aujourd'hui",
          explication: "« aujourd'hui » : une apostrophe, et se termine par -ui." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il a … terminé son devoir : il lui reste une ligne.",
          choix: ["presque", "presqu", "près que"], reponse: "presque",
          explication: "« presque » s'écrit en un seul mot." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Luna lit … le soir, pas tous les jours.",
          choix: ["parfois", "par fois", "parfoi"], reponse: "parfois",
          explication: "« parfois » (= de temps en temps) s'écrit en un seul mot, avec un « s »." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "… , les sorciers voyageaient en carrosse volant.",
          choix: ["Autrefois", "Autre fois", "Autrefoi"], reponse: "Autrefois",
          explication: "« autrefois » (= il y a longtemps) : un seul mot, avec un « s »." },

        { type: "qcm", consigne: "Choisis le mot invariable.",
          phrase: "Le train part … cinq minutes.",
          choix: ["dans", "dent", "d'en"], reponse: "dans",
          explication: "« dans » (le temps ou le lieu) s'écrit d-a-n-s." },

        { type: "qcm", consigne: "Choisis le mot invariable.",
          phrase: "Il s'entraîne dur … jamais se plaindre.",
          choix: ["sans", "sens", "cent"], reponse: "sans",
          explication: "« sans » = il ne se plaint pas. s-a-n-s." },

        { type: "trou", consigne: "Complète avec un mot invariable (comparaison).",
          phrase: "Un Éclair de Feu vole … vite qu'un Nimbus.",
          reponse: "plus", reponses: ["plus"],
          explication: "« plus vite que » : comparaison." },

        { type: "trou", consigne: "Complète (= dans ce cas).",
          phrase: "Si tu es d'accord, … on commence.",
          reponse: "alors", reponses: ["alors"],
          explication: "« alors » : conséquence, se termine par -ors." },

        { type: "qcm", consigne: "Choisis la bonne écriture.",
          phrase: "Il n'arrive … à l'heure au cours de potions.",
          choix: ["jamais", "jamait", "jamai"], reponse: "jamais",
          explication: "« jamais » se termine par -ais." },

        { type: "cahier", consigne: "Recopie la phrase sans erreur (attention aux mots invariables et aux verbes).",
          phrase: "« Il travail beaucou, mais il fini bientot. »",
          correction: "Il travaille beaucoup, mais il finit bientôt.",
          explication: "beaucoup (avec « p »), bientôt (accent + « t »), et les verbes : il travaille, il finit." },

        { type: "cahier", consigne: "Complète l'histoire avec : d'abord, ensuite, enfin.",
          phrase: "« … je me lève, … je m'habille, … je pars à l'école. »",
          correction: "D'abord je me lève, ensuite je m'habille, enfin je pars à l'école.",
          explication: "Ces mots servent à ranger les actions dans l'ordre." },

        { type: "cahier", consigne: "Écris une phrase avec « pendant », puis une phrase avec « depuis ».",
          phrase: "à toi d'inventer",
          correction: "Exemple : Il pleut pendant la récréation. / Il attend depuis dix minutes.",
          explication: "Ces mots ne changent jamais d'orthographe." },

        { type: "cahier", consigne: "Recopie ces mots invariables sans erreur (à apprendre par cœur).",
          phrase: "« toujour — beaucou — quelquefoi — longtemp — maintenan »",
          correction: "toujours — beaucoup — quelquefois — longtemps — maintenant",
          explication: "Presque tous ont une lettre muette à la fin." },

        { type: "trou", consigne: "Complète (= une grande quantité).",
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
        { type: "qcm", consigne: "Quelle lettre vient juste après le F dans l'alphabet ?",
          phrase: "… E … F … ?",
          choix: ["G", "E", "H"], reponse: "G",
          explication: "… E, F, G, H … Le G suit le F." },

        { type: "qcm", consigne: "Quelle lettre vient juste avant le M ?",
          phrase: "… ? … M …",
          choix: ["L", "N", "K"], reponse: "L",
          explication: "… K, L, M, N … Le L précède le M." },

        { type: "qcm", consigne: "Dans le dictionnaire, lequel vient en premier ?",
          phrase: "hibou · balai · chaudron",
          choix: ["balai", "chaudron", "hibou"], reponse: "balai",
          explication: "On classe par la 1re lettre : b, c, h → « balai » d'abord." },

        { type: "qcm", consigne: "Lequel vient en premier dans le dictionnaire ?",
          phrase: "potion · poison",
          choix: ["poison", "potion"], reponse: "poison",
          explication: "« poi-s » et « poi-t » : le « s » vient avant le « t »." },

        { type: "qcm", consigne: "Lequel vient en dernier dans le dictionnaire ?",
          phrase: "sort · sorcier · souris",
          choix: ["souris", "sort", "sorcier"], reponse: "souris",
          explication: "« sor… » vient avant « sou… » (o puis r, o puis u : le « u » est après le « r »)." },

        { type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "chat · chien · cheval",
          choix: ["chat", "cheval", "chien"], reponse: "chat",
          explication: "On compare la 3e lettre : cha… avant che… (a avant e)." },

        { type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "lune · livre",
          choix: ["livre", "lune"], reponse: "livre",
          explication: "« li… » avant « lu… » : le « i » est avant le « u »." },

        { type: "qcm", consigne: "Lequel vient en premier ?",
          phrase: "magie · maison · manger",
          choix: ["magie", "maison", "manger"], reponse: "magie",
          explication: "On compare la 3e lettre : mag… avant mai… avant man…" },

        { type: "trou", consigne: "Écris la lettre qui vient juste après le P.",
          phrase: "… O … P … ?",
          reponse: "q", reponses: ["q"],
          explication: "… O, P, Q, R …" },

        { type: "cahier", consigne: "Range ces mots dans l'ordre alphabétique.",
          phrase: "« sorcier — baguette — potion — école — hibou »",
          correction: "baguette — école — hibou — potion — sorcier",
          explication: "On classe par la 1re lettre : b, é(e), h, p, s." },

        { type: "cahier", consigne: "Range ces mots dans l'ordre alphabétique (ils commencent tous par « c »).",
          phrase: "« chat — cape — chaudron — cœur — classe »",
          correction: "cape — chat — chaudron — classe — cœur",
          explication: "On compare la 2e lettre, puis la 3e : ca…, ch(a), ch(a-t/u), cl…, cœ…" },

        { type: "cahier", consigne: "Écris l'alphabet en entier, en minuscules.",
          phrase: "de a à z",
          correction: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
          explication: "26 lettres. C'est l'ordre qu'on utilise dans le dictionnaire." }
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
