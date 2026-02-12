let indexDialogue = 0;
let chapitreActuel = 0;

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
            { nom: "R", texte: "Le crépitement du bois... Cette odeur de fumée sucrée... Je connais cet endroit." },
            { nom: "R", texte: "Les visages autour du feu sont flous, mais leurs rires résonnent comme une vieille chanson oubliée." },
            { nom: "R", texte: "Tout le monde danse. C'est joyeux, presque trop. C'est le genre de bonheur qui fait mal parce qu'on sait qu'il est déjà passé." },
            { nom: "R", texte: "Et là, au milieu du chaos de la fête, je la vois. RA." },
            { nom: "RA", texte: "*Hips* ! Regarde-moi ça... Le ciel tourne plus vite que nous, tu ne trouves pas ?" },
            { nom: "R", texte: "Elle rigole toute seule avant de se laisser tomber lourdement dans l'herbe haute. Elle est complètement ivre." }
        ],
        choix: [
            { texte: "S'allonger avec elle dans l'herbe", suite: 2 },
            { texte: "Rester debout et l'observer", suite: 3 }
        ]
    },
    2: {
        titre: "Le sol et les étoiles",
        fond: "url(img/back_1.png)", //changer plus tard
        type: "dialogue",
        dialogues: [
            { nom: "R", texte: "Je me laisse glisser au sol. L'herbe est fraîche, elle pique un peu la nuque." },
            { nom: "RA", texte: "Ah... T'es là toi. T'as vu ? Si on regarde bien, les étoiles font des cercles." },
            { nom: "R", texte: "On reste là, épaule contre épaule. Le bruit de la fête devient un lointain bourdonnement." },
            { nom: "RA", texte: "C'est bien ici. On devrait rester ici pour toujours, non ?" }
        ],
        choix: [{ texte: "Retourner au début", suite: 0 }]
    },
    3: {
        titre: "Le regret",
        fond: "url(img/back_1.png)",
        type: "dialogue",
        dialogues: [
            { nom: "R", texte: "Je reste immobile. Je n'ose pas briser la distance. C'est toujours comme ça, n'est-ce pas ?" },
            { nom: "R", texte: "Toujours à regarder le bonheur des autres sans savoir comment y entrer." },
            { nom: "R", texte: "Si seulement j'avais tendu la main ce soir-là. Si seulement j'avais dit quelque chose." },
            { nom: "RA", texte: "HÉ ! Pourquoi tu fais cette tête de enterrement ?" },
            { nom: "R", texte: "Avant que je ne puisse répondre, elle se relève d'un coup sec, les yeux pétillants malgré l'alcool." },
            { nom: "RA", texte: "Allez, arrête de réfléchir ! Viens danser, c'est un ordre !" },
            { nom: "R", texte: "Elle m'attrape les mains. Sa peau est chaude. On commence à tourner, et pour une seconde, le regret disparaît." }
        ],
        choix: [{ texte: "Retourner au début", suite: 0 }]
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
    
    document.body.style.backgroundImage = etape.fond;
    document.getElementById("glitch").style.backgroundImage = etape.fond;
    document.getElementById("choices").innerHTML = "";

    if (etape.type === "intro") {
        document.getElementById("intro").style.display = "block";
        document.getElementById("dialogue").style.display = "none";
        // Masque aussi le conteneur global de dialogue (utile si il était caché/visible)
        const dialogueContainer = document.getElementById("dialogue-container");
        if (dialogueContainer) dialogueContainer.style.display = "none";
        typeText("chapitre", etape.titre, 60);
        document.getElementById("gif-cat").style.display = "block";
    } else {
        document.getElementById("intro").style.display = "none";
        // Affiche le conteneur et la zone de dialogue
        const dialogueContainer = document.getElementById("dialogue-container");
        if (dialogueContainer) dialogueContainer.style.display = "block";
        document.getElementById("dialogue").style.display = "block";
        document.getElementById("chapitre").innerText = etape.titre;
        document.getElementById("gif-cat").style.display = "none";
        continuerDialogue();
    }
}

function continuerDialogue() {
    const etape = etapes[chapitreActuel];
    const zoneTexte = document.getElementById("text");
    
    if (indexDialogue < etape.dialogues.length) {
        const d = etape.dialogues[indexDialogue];
        // Format : Nom du perso en gras + son texte
        const contenu = `<strong>${d.nom} :</strong> ${d.texte}`;
        typeText("text", contenu, 30);
        indexDialogue++;
    } else {
        // Si on a fini le texte, on montre les choix
        afficherChoix(etape.choix);
    }
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
            demarrerEtape(c.suite);
        };
        container.appendChild(btn);
    });
}

function typeText(element, text, speed = 50) {
    let i = 0;
    const elem = document.getElementById(element);
    elem.innerHTML = "";
    
    // Pour gérer le HTML (balises <strong>)
    let isTag = false;
    let currentText = "";

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === "<") isTag = true;
            if (text.charAt(i) === ">") isTag = false;
            
            elem.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, isTag ? 0 : speed);
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