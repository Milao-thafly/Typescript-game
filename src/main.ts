// A NE PAS FAIRE: SUPPRIMER LE PADCHAR ET COMPTER SUR STR = STR. ON EST BON POUR BOUCLE INFINI
// function padStartManual(str: string, targetLength: number,): string {
//     while (str.length < targetLength) {
//         str =  str
//     }
//     return str;
// }
// function updateTimerDisplay(): void {
//     const timerElement = document.getElementById("timer");
//     if (timerElement) {
//         timerElement.textContent = padStartManual(String(seconds), 2);
//     }
// }

// 



//


import {organs} from "./organ";


let seconds: number = 20;
// Il va initialiser l'interval de nos chiffre à 0 pour le décompte
let timerInterval: number | null = null;


//La fonction va permettre de remplacer sur un padding a gauche par un caractère pour toujours être à deux chiffre.
function padStartManual(str: string, targetLength: number,padChar: string): string {
    while (str.length < targetLength) {
        str = padChar + str
    }
    return str;
}


//Ici on va initialiser le padChar des éléments concerné par notre variable de temps en premier lieux 
//Lui dire qu'il nous faut en partant d'une conversion en string nos seconde. Qu'il faut toujours 2 chiffre d'affiché.
//Que si on est sensé descendre à moins de deux chiffres. Garder le timer à deux en faisant un padding à gauche avec 0.
const timer = padStartManual(String(seconds), 2,"0");
//Ici on va faire une fonction qui ne return rien par un void. 
// On va lui créer une constante au nom de timerElement en ciblant la div timer.
// on va changer le texte de la div avec padStartManual plus en haut 
function updateTimerDisplay(): void {
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        // padStartManual veux dire à quel moment je commence mon padding pour remplacer le troue par le 0.
        timerElement.textContent = padStartManual(String(seconds), 2, "0");
    }
    //On va mettre aussi un petit coup de css en allant lier une class CSS qui nous servira a avoir un text en 8bit 
    timerElement?.classList.add("fontEnd")
}

//La on va dire dans une fonction que notre timer va commencer grace au chargement de la page. A changer 
function startGameTimer(): void {
    //Ici on cible notre fonction updateTimerDisplay
    updateTimerDisplay();

    //Ici je vais demander à la variable global de setInterval de 1000 millisecondes pour enlever 1 seconde. 
    timerInterval = window.setInterval(() => {
        seconds--;

        updateTimerDisplay();
        //La on va dire que si seconds est égal ou en dessous de 0 et que le timer est encore actif on clearInterval.
        //Puis on set timerInterval à null. On appelera notre fonction endgame.
        if (seconds <= 0 && timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;

            endGame();
        }
    } ,1000)
}


//Le timer fini. On va pouvoir lancer endGame.
function endGame(): void {
    //On va avoir dans la console un message qui dit temps écoulé.
    console.log("le temps est écoulé")
    const timerElement = document.getElementById("timer");
    // On dit que si timer element est différent de null on va mettre un contenu textuel à 00.
    //On va lui mettre une class timer finished.
    if (timerElement) {
        timerElement.textContent = "00";
        timerElement.classList.add("timer-finished");


        //Ici on va lier une constante endmsgtarget à la div endText
        const end_message_target = document.getElementById("endText"); 
        //Si la emt est pas null.
        if (end_message_target) {
        //On fait une div et un paragraph avec un texte 
        const divEndMessage:  HTMLDivElement = document.createElement("div");
        const endMessage: HTMLParagraphElement = document.createElement("p");
        endMessage.innerText = "1312 was to lowkey to win"
        

        // On lie la div a notre constante emt
        end_message_target.appendChild(divEndMessage)
        //on lie la div au paragraph
        divEndMessage.appendChild(endMessage)
        //Ici on fait disparaitre le timer avec un display none.
        timerElement.classList.add("noTimer")
        //Ici on applique le css fontEnd a notre divEndMessage.
        divEndMessage.classList.add("fontEnd")
        }
    };

    
        
        
        
    
}
window.addEventListener("DOMContentLoaded", () => {
    startGameTimer();
});







export class OrganLand {
    constructor(){
        this.setupHitBox();
    }

    private setupHitBox() {
        organs.forEach((organ) => {
            const hitbox: HTMLDivElement| null = document.createElement ("div")
        })
    } 
}
export{}