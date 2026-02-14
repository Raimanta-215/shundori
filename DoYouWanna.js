let indexDialogue = 0;
let chapitreActuel = 0;

// État du typage pour éviter les superpositions et gérer l'arrêt instantané
const typingState = {
    isTyping: false,
    currentTimer: null,
    currentElement: null,
    currentFullText: '',
    justFinished: false
};

const etapes = {
    0: {
        titre: "Je vais te dire un secret mais ne le dis à personne",
        fond: "url(img/back_0.png)",
        gifCat: "img/gifCat.gif",
        bouton: "Commencer",
        type: "intro"
    },
    1: {
        titre: "Prologue : Un rêve ?",
        fond: "url(img/back_1.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: "* Je reconnais ce lieu et ces gens... Luca a trouvé un plan sympa pour marquer mon annif quand même ! *" },
            { nom: "Raisa", texte: "* C'est vraimment une folie l'ambiance feu camp, la musique, mes potes qui dansent ... *" },
            { nom: "Raisa", texte: "* Mais je ne la vois plus... *" },
            { nom: "Raisa", texte: "* Où est‑elle, RAISA ? *" },
            { nom: "RAISA", texte: " **Un peu plus loin**   HAAAAHAAAAHAAA!!! Attends Luca, je suis parterre ... " },
            { nom: "Raisa", texte: "* Elle a l'ai de s'amuser !! Je veux la rejoindre aussi... *" },
            { nom: "Raisa", texte: "* Mais c'est ma crush....*" },
        ],
        choix: [
            { texte: "S'allonger avec elle dans l'herbe", suite: 12 },
            { texte: "Rester debout et l'observer", suite: 13 }
        ]
    },
    12: {
        titre: "Secret d'ordre public",
        fond: "url(img/back_sol.png)", 
        type: "dialogue",
        dialogues: [
            { nom: "RAISA", texte: "AHHHHH RAISAAAA VIENS !!!!" },
            {nom: "Raisa", texte: "* Je m'allonge à côté d'elle.. mais l'alcool me rends très confiante et je me met quansi sur elle dans ses bras omg *" },
            { nom: "Raisa", texte: "* Je me sens tellement bien et une envie soudaine qui me ressemble pas me traverse l'esprit. *" },
            { nom: "Raisa", texte: "* Je veux lui avouer mes sentiments... *" },
            { nom: "Raisa", texte: "Ra... RAISA... Je vais te dire un secret mais ne le dis à PERSONNE ! " },
            { nom: "RAISA", texte: "Vasy dis moi !?" },
            { nom: "Raisa", texte: "Je crois que j'ai des sentiments pour toi ..." },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "Raisa", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "Raisa", texte: "* Ca va faire 10 minutes ... Damn je n'aurais pas du... *" },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: "Quoi ?! Mais... Moi aussi j'ai des sentiments pour toi  !!" },
        ],
        choix: [{ texte: "EHHHHH TOUT LE MONDE, RAISA C'EST MA CRUSHHHHH", suite: 2 }]
    },
    13: {
        titre: "Regret ?",
        fond: "url(img/back_danse.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: " Je n'ose pas l'avouer. Je serai trop gênée et je ne veux pas qu'elle me rejette." },
            { nom: "RAISA", texte: "**se lève et se rapproche** RAISA !!!!! AAAAHHHHH VIENS AVEC MOI J'AIME PAS QUANS T'ES LOIN DE MOI!!!" },
            { nom: "Raisa", texte: "* J'ai bien entendu ?! Ou peut être que c'est moi qui interprète ... * JE SUIS LAAAA!!! " },
            { nom: "RAISA", texte: "**Met sa main sur la taille de Raisa pour la coller à elle**  TU ES MAGNIFIQUE CE SOIR !!" },
            { nom: "Raisa", texte: "* ... On est très proches .. ca ne me gêne pas, l'alcool m'a donné confiance ... et elle a flirté totue la soirée...*" },
            { nom: "Raisa", texte: "Ra... RAISA... Je vais te dire un secret mais ne le dis à PERSONNE ! " },
            { nom: "RAISA", texte: "Vasy dis moi !?" },
            { nom: "Raisa", texte: "Je crois que j'ai des sentiments pour toi ..." },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "Raisa", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: ".........." },
            { nom: "Raisa", texte: "* Ca va faire 10 minutes ... Damn je n'aurais pas du... *" },
            { nom: "RAISA", texte: ".........." },
            { nom: "RAISA", texte: "Quoi ?! Mais... Moi aussi j'ai des sentiments pour toi  !!" },

        ],
        choix: [{ texte: "EHHHHH TOUT LE MONDE, RAISA C'EST MA CRUSHHHHH", suite: 4 }]
    }
    ,
    2: {
        titre: "Le lendemain",
        fond: "url(img/chambre_wavre.png)",
        type: "transition",
        description: "Raisa se reveile avec une gueule de bois et la tête tournante. Elle a des vagues souvenir de la soirée .... MAIS OUI ! Elle se rappelle avoir avoué ses sentiments !!!! Elle est génée tout à coup de voir Raisa dormir à ôté d'elle !! Ellle pense que Raisa se rappelle suremment plus mais elle, elle a envie d'y croire.",
        bouton: "Revasser",
        next: 21
    },

    4: {
        titre: "Interlude",
        fond: "url(img/back_0.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Narrateur", texte: "La finalité aurait été la même !" }
        ],
        choix: [{ texte: "Continuer", suite: 2 }]
    },

    21: {
        titre: "Petit‑déj romantique",
        fond: "url(img/4.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: "*Je m'imagine déjà à la St-Valentin avec elle....*" },
            { nom: "Raisa", texte: "*On aurait préparé un petit‑déj ensemble, avec des petit coeurs PARTOUUUTTT !! *" },
            { nom: "Raisa", texte: "*Elle aurrait dit quelque chose du genre : *" },
            { nom: "RAISA", texte: "MOOOHH !! Merci mon coeur !! Mais même ce petit dej n'est pas aussi sucré que toi ;)." },
            { nom: "Raisa", texte: "*Et moi je rougirait et je lui dirait que c'est pas vrai alors que si, c'est tellement vrai... *" },
        ],
        choix: [{ texte: "Continuer", suite: 22 }]
    },

    22: {
        titre: "Atelier chocolat à la maison <3",
        fond: "url(img/5.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: "* Je lui aurait prpéparé du chocolat en forme de coeur... *" },
            { nom: "Raisa", texte: "* J'aurait pu lui enlver le choclat en coin de la lèvre moi même ... ou sinon elle l'aurait fait*" },
            { nom: "RAISA", texte: "* Passe son pouce sur la lèvre de Raisa pour enlever le choclat puis le ramène à sa bouche pour le mnager* " },
            { nom: "RAISA", texte: "* Flirt * Il t'en restait un peu <3" },
        ],
        choix: [{ texte: "Suivant", suite: 24 }]
    },

    24: {
        titre: "Bright de lumières",
        fond: "url(img/6.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: "*Les lumières sont tellement belles et je me serre encore plus contre elle pendant que je lui tiens la main*" },
            { nom: "Raisa", texte: "Regardes, elles sont magnifiques les lumières, mon coeur! <3" },
            {nom: "RAISA", texte: "**regarde profondémenet les yeux de Raisa**  " },
            { nom: "RAISA", texte: "Oui, je les vois scintiller dans tes yeux ... " },
        ],
        choix: [{ texte: "Aller au resto", suite: 25 }]
    },

25: {
        titre: "Le restaurant chic",
        fond: "url(img/7.png)",
        type: "dialogue",
        dialogues: [
            { nom: "Raisa", texte: "*On mange un diner romantique à la chandelle... je ne fais que fanasmer ... masi c'est tellement beau*" },
            { nom: "RAISA", texte: "**prenant les mains de Raisa** Tu semble distraite, tout va bien?" },
            { nom: "Raisa", texte: "Oui, oui ne t'inquète pas :) "},
            {nom: "Raisa", texte: "*Et je continue à revasser*" }
        ],
        choix: [
            // On ajoute l'action spéciale ici :
            { texte: "Savourer le moment", suite: 3, action: "fadeToBlackAndWakeUp" }
        ]
        // (Supprime la ligne shakeAfter: true ici)
    },
    
    3: {
        titre: "Réalité ?!",
        fond: "url(img/8.png)",
        type: "minigame",
        description: "Une grande lumière blanche ; RAISA te réveille doucement.",
        dialogues: [
            { nom: "RAISA", texte: "**faisant beacoup de bisous doux à Raisa** " },
            { nom: "Raisa", texte: "*Je me reveille des tendres bisous que ma chérie me donne*" },
            { nom: "RAISA", texte: "T'as bien dormi mon coeur ?" },
            { nom: "Raisa", texte: "Très bien mon ange! J'ai fais un très beau rêve ... *et je lui raconte mon rêve *" },
            { nom: "RAISA", texte: "Un très beau rêve, mi hoy. J'ai aussi quelque chose pour toi en rapprot avec ce que t'as rêvé :)" },
        ],
        // mini‑jeu : une séquence de gifs puis une lettre cliquable
        minigame: {
            gifs: [
                { file: 'img/coeur.gif', caption: "Je te donne mon coeur" },
                { file: 'img/shy.gif', caption: "Excitée et contente" },
                { file: 'img/flower.gif', caption: "Voilà des fleurs" },
                { file: 'img/shy.gif', caption: "Encore heureuse" },
                { file: 'img/lettre.gif', caption: "Une lettre..." }
            ],
            letterImage: 'img/letter.jpg'
        }
    }
};

window.onload = function() {
    demarrerEtape(0);
    radnomGlitch();
}

function demarrerEtape(numero) {
    chapitreActuel = numero;
    indexDialogue = 0;
    const etape = etapes[numero];
    
    // NETTOYAGE : Cacher les overlays de fin et de mini-jeu si on revient au début
    if (numero === 0) {
        const endOverlay = document.getElementById('end-overlay');
        if (endOverlay) endOverlay.style.display = 'none';
        
        const minigameOverlay = document.getElementById('minigame-overlay');
        if (minigameOverlay) minigameOverlay.style.display = 'none';
        
        const proposalModal = document.getElementById('proposal-modal');
        if (proposalModal) proposalModal.style.display = 'none';
    }
    
    document.body.style.backgroundImage = etape.fond;
    document.getElementById("glitch").style.backgroundImage = etape.fond;
    document.getElementById("choices").innerHTML = "";
    if (etape.type === "intro" || etape.type === "transition") {
        document.getElementById("intro").style.display = "block";
        document.getElementById("dialogue").style.display = "none";
        
        // NETTOYAGE CRUCIAL : Supprime les anciens boutons de choix
        document.getElementById("choices").innerHTML = ""; 

        const dialogueContainer = document.getElementById("dialogue-container");
        if (dialogueContainer) dialogueContainer.style.display = "none";

        typeText("chapitre", etape.titre, 60);

        // Affiche la description si elle existe
        const introText = document.getElementById("intro-text");
        if (introText) introText.innerText = etape.description || "";

        const startBtn = document.getElementById("start-button");
        if (startBtn) {
            startBtn.innerText = etape.bouton || "Continuer";
            // Si c'est l'étape 0, on veut aller à l'étape 1
            // Sinon, on va à etape.next
            const prochaineEtape = (numero === 0) ? 1 : etape.next;
            startBtn.onclick = function() { demarrerEtape(prochaineEtape); };
        }
        document.getElementById("gif-cat").style.display = etape.gifCat ? "block" : "none";
        const existingChar = document.getElementById('character-img');
        if (existingChar) existingChar.style.display = 'none';
    } else {
        document.getElementById("intro").style.display = "none";
        // Affiche le conteneur et la zone de dialogue
        const dialogueContainer = document.getElementById("dialogue-container");
        if (dialogueContainer) dialogueContainer.style.display = "block";
        document.getElementById("dialogue").style.display = "block";
        document.getElementById("chapitre").innerText = etape.titre;
        document.getElementById("gif-cat").style.display = "none";
        const existingChar = document.getElementById('character-img');
        if (existingChar) existingChar.style.display = 'none';
        // For minigame steps we first run their short dialogue, then start the minigame
        continuerDialogue();
    }
}

// ----- Mini‑jeu pour l'étape 7 -----
function startMinigame(etape) {
    // cacher les éléments habituels
    document.getElementById('intro').style.display = 'none';
    document.getElementById('dialogue-container').style.display = 'none';

    // créer overlay si nécessaire
    let overlay = document.getElementById('minigame-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'minigame-overlay';
        document.getElementById('game-content').appendChild(overlay);
    }
    overlay.innerHTML = '';
    overlay.style.display = 'flex';

    // creer zone de dialogue courte pour la ligne de RAISA puis mini jeu
    const lineWrap = document.createElement('div');
    lineWrap.id = 'minigame-line';
    overlay.appendChild(lineWrap);

    // afficher la ligne de RAISA (si présente)
    if (etape.dialogues && etape.dialogues.length > 0) {
        const d = etape.dialogues[0];
        const p = document.createElement('p');
        p.className = 'minigame-speaker';
        p.innerHTML = `<strong>${d.nom} :</strong> ${d.texte}`;
        lineWrap.appendChild(p);
    }

    // zone pour gifs
    const gifZone = document.createElement('div');
    gifZone.id = 'minigame-gifzone';
    overlay.appendChild(gifZone);

    const img = document.createElement('img');
    img.id = 'minigame-gif';
    gifZone.appendChild(img);

    const caption = document.createElement('div');
    caption.id = 'minigame-caption';
    gifZone.appendChild(caption);

    // show first gif and advance on click
    const gifs = (etape.minigame && etape.minigame.gifs) || [];
    let idx = 0;

    function showIndex(i) {
        const g = gifs[i];
        if (!g) return;
        img.src = g.file;
        caption.innerText = g.caption || '';
        // if last (letter) show letter overlay when clicked
        if (i === gifs.length - 1) {
            // show letter button overlay after gif loads or click
            img.onclick = () => showLetter(etape.minigame && etape.minigame.letterImage);
        } else {
            img.onclick = () => { idx++; if (idx < gifs.length) showIndex(idx); };
        }
    }
    showIndex(0);

    // cleanup helper
    function cleanup() {
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        document.getElementById('dialogue-container').style.display = 'block';
    }

    // letter handler
    function showLetter(letterSrc) {
        // zone lettre cliquable
        const letter = document.createElement('img');
        letter.id = 'minigame-letter';
        letter.src = letterSrc || 'img/letter.png';
        gifZone.appendChild(letter);

        // on click open proposal modal
        letter.onclick = () => {
            showProposalModal(cleanup);
        };
    }

    // expose to global for testing (not required)
    window._minigameCleanup = cleanup;
}

function showProposalModal(doneCallback) {
    // create modal
    let modal = document.getElementById('proposal-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'proposal-modal';
        document.getElementById('game-content').appendChild(modal);
    }
    modal.innerHTML = '';
    modal.style.display = 'flex';

    const box = document.createElement('div');
    box.className = 'proposal-box';
    box.innerHTML = `<h2>VEUX‑TU ÊTRE MA VALENTINE ?</h2>`;
    modal.appendChild(box);

    const btns = document.createElement('div');
    btns.className = 'proposal-buttons';
    const yes = document.createElement('button');
    yes.className = 'fill yes';
    yes.innerText = '💕 Oui';
    const no = document.createElement('button');
    no.className = 'fill no';
    no.innerText = ' Non';
    btns.appendChild(yes);
    btns.appendChild(no);
    box.appendChild(btns);

    // yes click: show end screen (fin du jeu) instead of retourner au resto
    yes.onclick = () => {
        modal.style.display = 'none';
        if (doneCallback) doneCallback();
        showEndScreen('img/end.jpg');
    };

    // no click: explode animation then disable
    no.onclick = (e) => {
        no.classList.add('explode');
        no.disabled = true;
        setTimeout(() => {
            no.style.visibility = 'hidden';
        }, 700);
    };
}

function continuerDialogue() {
    // Ignorer les clics trop proches après avoir forcé la fin du texte
    if (typingState.justFinished) return;

    // Si on est en train de taper, un clic force la fin du texte courant
    if (typingState.isTyping) {
        finishTyping();
        return;
    }

    const etape = etapes[chapitreActuel];
    const zoneTexte = document.getElementById("text");
    const dialogueContainer = document.getElementById('dialogue-container');
    // créer l'élément image du personnage si nécessaire
    let charImg = document.getElementById('character-img');
    if (!charImg) {
        charImg = document.createElement('img');
        charImg.id = 'character-img';
        charImg.style.display = 'none';
        // placer l'image dans le conteneur de dialogue pour la positionner juste au-dessus
        const parent = dialogueContainer || document.getElementById('game-content') || document.body;
        parent.appendChild(charImg);
    }
    
    if (indexDialogue < etape.dialogues.length) {
        const d = etape.dialogues[indexDialogue];
        // Afficher l'image du personnage selon le nom exact (respect de la casse)
        if (charImg) {
            if (d.nom === 'Raisa') {
                charImg.src = 'img/Raisa_perso.png';
                charImg.style.display = 'block';
                charImg.classList.add('left');
                charImg.classList.remove('right');
            } else if (d.nom === 'RAISA') {
                charImg.src = 'img/RAISA-perso.png';
                charImg.style.display = 'block';
                charImg.classList.add('right');
                charImg.classList.remove('left');
            } else {
                charImg.style.display = 'none';
                charImg.classList.remove('left');
                charImg.classList.remove('right');
            }
        }
        // Format : Nom du perso en gras + son texte
        const contenu = `<strong>${d.nom} :</strong> ${d.texte}`;
        typeText("text", contenu, 30);
        indexDialogue++;
    } else {
        // Si on a fini le texte : lancer le mini‑jeu s'il existe, sinon afficher les choix
        const charImg = document.getElementById('character-img');
        if (charImg) charImg.style.display = 'none';
        if (etape && etape.type === 'minigame' && etape.minigame) {
            // lancer le mini jeu après la courte conversation
            startMinigame(etape);
        } else if (etape && etape.shakeAfter && !etape._shaken) {
            etape._shaken = true;
            triggerScreenShake(() => {
                afficherChoix(etape.choix);
            });
        } else {
            afficherChoix(etape.choix);
        }
    }
}

// Ajoute un effet de tremblement de l'écran
function triggerScreenShake(callback, duration = 700) {
    const container = document.getElementById('game-container') || document.body;
    container.classList.add('shake');
    // retire la classe après la durée et appelle le callback
    setTimeout(() => {
        container.classList.remove('shake');
        if (typeof callback === 'function') callback();
    }, duration);
}

// Affiche l'écran de fin avec une image et un bouton retour au menu
function showEndScreen(imageSrc) {
    let end = document.getElementById('end-overlay');
    if (!end) {
        end = document.createElement('div');
        end.id = 'end-overlay';
        document.getElementById('game-content').appendChild(end);
    }
    end.innerHTML = '';
    end.style.display = 'flex';

    const img = document.createElement('img');
    img.id = 'end-image';
    img.src = imageSrc || 'img/end.jpg';
    end.appendChild(img);

    const btn = document.createElement('button');
    btn.className = 'fill';
    btn.innerText = 'Je t\'aime amar jaan <3';
    btn.onclick = () => {
        end.style.display = 'none';
        // On force le nettoyage de l'interface de dialogue avant de repartir à 0
        document.getElementById("choices").innerHTML = ""; 
        document.getElementById("text").innerHTML = "";
        demarrerEtape(0);
    };
    end.appendChild(btn);
}

function afficherChoix(choix) {
    const container = document.getElementById("choices");
    container.innerHTML = "";
    choix.forEach(c => {
        const btn = document.createElement("button");
        btn.classList.add("fill");
        btn.innerText = c.texte;
        btn.onclick = (e) => {
            e.stopPropagation(); // Évite de déclencher continuerDialogue
            
            // Si le choix possède l'action spéciale du réveil
            if (c.action === "fadeToBlackAndWakeUp") {
                triggerFadeAndWakeUp(() => demarrerEtape(c.suite));
            } else {
                // Comportement classique
                const target = etapes[c.suite];
                if (target && target.shakeAfter) {
                    startDimThenShake(() => demarrerEtape(c.suite));
                } else {
                    demarrerEtape(c.suite);
                }
            }
        };
        container.appendChild(btn);
    });
}

function startDimThenShake(next) {
    // create dim overlay
    let dim = document.getElementById('dim-overlay');
    if (!dim) {
        dim = document.createElement('div');
        dim.id = 'dim-overlay';
        const parent = document.getElementById('game-content') || document.body;
        parent.appendChild(dim);
    }
    dim.style.display = 'block';
    // force reflow then fade in
    void dim.offsetWidth;
    dim.style.opacity = '0.6';

    // after a short fade (300ms), do the shake then call next
    setTimeout(() => {
        triggerScreenShake(() => {
            // hide dim quickly before starting next so mini game shows properly
            dim.style.opacity = '0';
            setTimeout(() => { dim.style.display = 'none'; if (typeof next === 'function') next(); }, 220);
        }, 900);
    }, 320);
}

function typeText(element, text, speed = 50) {
    let i = 0;
    const elem = document.getElementById(element);
    if (!elem) return;
    elem.innerHTML = "";

    // Met à jour l'état global
    typingState.isTyping = true;
    typingState.currentElement = element;
    typingState.currentFullText = text;

    // Pour gérer le HTML (balises <strong>)
    let isTag = false;

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === "<") isTag = true;
            if (text.charAt(i) === ">") isTag = false;

            elem.innerHTML = text.substring(0, i + 1);
            i++;
            typingState.currentTimer = setTimeout(type, isTag ? 0 : speed);
        } else {
            // terminé
            typingState.isTyping = false;
            typingState.currentTimer = null;
        }
    }
    type();
}

// Glitch functions
function radnomGlitch() {
    triggerGlitch();
    setTimeout(radnomGlitch, Math.random() * 5000 + 1000);
}
function triggerGlitch() {
    const glitch = document.getElementById("glitch");
    glitch.classList.add("active");
    setTimeout(() => glitch.classList.remove("active"), 700);
}

function finishTyping() {
    if (!typingState.isTyping) return;
    if (typingState.currentTimer) clearTimeout(typingState.currentTimer);
    const elem = document.getElementById(typingState.currentElement);
    if (elem) elem.innerHTML = typingState.currentFullText;
    typingState.isTyping = false;
    typingState.currentTimer = null;
    typingState.justFinished = true;
    setTimeout(() => { typingState.justFinished = false; }, 250);
}


function triggerFadeAndWakeUp(callback) {
    // 1. Créer l'écran noir et le texte s'ils n'existent pas
    let blackScreen = document.getElementById('black-screen');
    let wakeUpText = document.getElementById('wake-up-text');
    
    if (!blackScreen) {
        blackScreen = document.createElement('div');
        blackScreen.id = 'black-screen';
        
        wakeUpText = document.createElement('div');
        wakeUpText.id = 'wake-up-text';
        wakeUpText.innerText = "Bonjour mon coeur ?";
        
        blackScreen.appendChild(wakeUpText);
        document.body.appendChild(blackScreen);
    }
    
    // On s'assure que le display est en flex pour centrer le texte
    blackScreen.style.display = 'flex';
    blackScreen.style.transition = 'opacity 2.5s ease-in-out';
    wakeUpText.style.opacity = '0';
    wakeUpText.classList.remove('tremble-active'); // Reset de l'animation
    
    // Force la mise à jour CSS
    void blackScreen.offsetWidth; 
    
    // 2. Lancer le fondu lent (tout devient noir)
    blackScreen.style.opacity = '1';

    // 3. Quand l'écran est totalement noir (2.5s plus tard), le texte apparaît
    setTimeout(() => {
        wakeUpText.style.opacity = '1';
        wakeUpText.classList.add('tremble-active'); // Le texte se met à trembler
        
        // 4. On laisse le texte à l'écran pendant 3 secondes pour qu'il soit lu
        setTimeout(() => {
            
            // Charge silencieusement le chapitre suivant en arrière-plan (l'écran blanc)
            if (typeof callback === 'function') callback();

            // Déclenche le grand tremblement
            const container = document.getElementById('game-container') || document.body;
            container.classList.add('violent-shake');

            // Retire le noir très rapidement comme un flash
            blackScreen.style.transition = 'opacity 0.2s ease-out';
            blackScreen.style.opacity = '0';
            wakeUpText.style.opacity = '0';

            // 5. Nettoyer après le tremblement
            setTimeout(() => {
                container.classList.remove('violent-shake');
                blackScreen.style.display = 'none';
                wakeUpText.classList.remove('tremble-active');
            }, 1000); // Le temps de l'animation violent-shake

        }, 3000); // Temps de lecture de "T'as bien dormi mon coeur ?"

    }, 2500); // Temps d'attente du fondu au noir
}