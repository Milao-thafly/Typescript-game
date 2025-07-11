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
import { organs } from "./organ.js";
const requiredOrgans = ["Heart", "Brain", "Stomach", "Lungs", "Gut", "Biceps"];
let gameEnded = false;
let gameVictory = true;
let timers;
//TIMER
let seconds = 10;
// Il va initialiser l'interval de nos chiffre à 0 pour le décompte
let timerInterval = null;
//La fonction va permettre de remplacer sur un padding a gauche par un caractère pour toujours être à deux chiffre.
function padStartManual(str, targetLength, padChar) {
    while (str.length < targetLength) {
        str = padChar + str;
    }
    return str;
}
//Ici on va initialiser le padChar des éléments concerné par notre variable de temps en premier lieux 
//Lui dire qu'il nous faut en partant d'une conversion en string nos seconde. Qu'il faut toujours 2 chiffre d'affiché.
//Que si on est sensé descendre à moins de deux chiffres. Garder le timer à deux en faisant un padding à gauche avec 0.
const timer = padStartManual(String(seconds), 2, "0");
//Ici on va faire une fonction qui ne return rien par un void. 
// On va lui créer une constante au nom de timerElement en ciblant la div timer.
// on va changer le texte de la div avec padStartManual plus en haut 
function updateTimerDisplay() {
    console.log("Timer updated to:", seconds);
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        // padStartManual veux dire à quel moment je commence mon padding pour remplacer le troue par le 0.
        timerElement.textContent = padStartManual(String(seconds), 2, "0");
    }
    //On va mettre aussi un petit coup de css en allant lier une class CSS qui nous servira a avoir un text en 8bit 
    timerElement === null || timerElement === void 0 ? void 0 : timerElement.classList.add("fontEnd");
}
//La on va dire dans une fonction que notre timer va commencer grace au chargement de la page. A changer 
function startGameTimer() {
    console.log("Starting timer...");
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
    }, 1000);
}
//Le timer fini. On va pouvoir lancer endGame.
function endGame() {
    //On va avoir dans la console un message qui dit temps écoulé.
    console.log("le temps est écoulé");
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
            const divEndMessage = document.createElement("div");
            const endMessage = document.createElement("p");
            endMessage.innerText = "1312 was to lowkey to win";
            // On lie la div a notre constante emt
            end_message_target.appendChild(divEndMessage);
            //on lie la div au paragraph
            divEndMessage.appendChild(endMessage);
            //Ici on fait disparaitre le timer avec un display none.
            timerElement.classList.add("noTimer");
            //Ici on applique le css fontEnd a notre divEndMessage.
            divEndMessage.classList.add("fontEnd");
        }
    }
    ;
}
//Non fonctionnel
function checkVictoryCondition() {
    const bucket = document.querySelector(".bucket");
    if (!bucket || gameEnded)
        return;
    const bucketOrgans = Array.from(bucket.querySelectorAll("img"))
        .map(img => { var _a, _b; return (_b = (_a = img.dataset.name) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) !== null && _b !== void 0 ? _b : ""; });
    const allPresent = requiredOrgans.every((organ) => bucketOrgans
        .map(name => name.trim().toLowerCase())
        .indexOf(organ.toLowerCase()) !== -1);
    if (allPresent) {
        gameEnded = true;
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        const endMessageTarget = document.getElementById("endText");
        if (endMessageTarget) {
            const div = document.createElement("div");
            const p = document.createElement("p");
            p.innerText = "Bravo, vous avez gagné ! 🎉";
            p.classList.add("fontEnd");
            div.appendChild(p);
            endMessageTarget.appendChild(div);
        }
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.textContent = "00";
            timerElement.classList.add("noTimer", "timer-finished");
        }
    }
}
//CLASS POUR PLAYGROUND D'ORGAN
export class OrganLand {
    constructor() {
        this.selectedOrgan = null;
        this.playground = [];
        const play = document.querySelectorAll(".playground");
        this.playground = Array.from(play);
        // if(play){
        //     throw new Error("ENCULÉ!!!!");
        // }
        this.setupBucketDrop();
        this.setupHitBox();
    }
    setupHitBox() {
        const margin = 20;
        organs.forEach((organ) => {
            const hitbox = document.createElement("div");
            hitbox.classList.add("hitbox");
            hitbox.style.position = "absolute";
            hitbox.style.left = `${organ.left}px`;
            hitbox.style.top = `${organ.top}px`;
            hitbox.style.width = `${organ.width + 20}px`;
            hitbox.style.height = `${organ.height + 20}px`;
            hitbox.style.zIndex = "3";
            hitbox.addEventListener("click", (canDrag) => {
                canDrag.stopPropagation();
                this.selectedOrgan = organ;
            });
            // if (organs !== null) {
            //     organs.forEach((organs) => {
            //     })
            // }
            const bod = document.getElementsByClassName("organInBody");
            const organDragable = document.createElement("img");
            organDragable.src = organ.imgSrc;
            organDragable.alt = organ.name;
            organDragable.classList.add("organs");
            // organDragable.style.position = "absolute";
            organDragable.style.top = "0";
            organDragable.style.left = "0";
            organDragable.style.width = "100%";
            organDragable.style.height = "100%";
            organDragable.style.pointerEvents = "auto";
            organDragable.style.cursor = "grab";
            organDragable.style.zIndex = "10";
            organDragable.addEventListener("click", () => {
                this.selectedOrgan = organ;
                console.log("bieng");
            });
            organDragable.setAttribute("draggable", "true");
            organDragable.dataset.name = organ.name;
            organDragable.addEventListener("dragstart", (drag) => {
                var _a;
                console.log("dragstart", organ.name);
                (_a = drag.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", organ.name);
            });
            hitbox.appendChild(organDragable);
            this.playground[0].appendChild(hitbox);
            if (!this.playground[0]) {
                throw new Error("playground not found !");
            }
        });
        this.setupHitboxDrop();
    }
    setupBucketDrop() {
        const bucket = document.querySelector(".bucket");
        if (!bucket)
            return;
        bucket.addEventListener("dragover", (draged) => {
            draged.preventDefault();
        });
        bucket.addEventListener("drop", (droped) => {
            var _a;
            droped.preventDefault();
            const organName = (_a = droped.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
            if (!organName)
                return;
            const draggedOrgans = document.querySelectorAll(".organs");
            draggedOrgans.forEach((organ) => {
                if (organ instanceof HTMLImageElement && organ.dataset.name === organName) {
                    // organ.style.opacity = "0";
                    // organ.style.pointerEvents = "none";
                    organ.remove();
                    const organInBucket = document.createElement("img");
                    organInBucket.src = organ.src;
                    organInBucket.alt = organ.alt;
                    organInBucket.classList.add("organs");
                    organInBucket.dataset.name = organName;
                    organInBucket.style.opacity = "1";
                    organInBucket.style.width = "50px";
                    bucket.appendChild(organInBucket);
                }
            });
        });
    }
    setupHitboxDrop() {
        const hitboxes = document.querySelectorAll(".hitbox");
        hitboxes.forEach((hitbox) => {
            hitbox.addEventListener("dragover", (draghitbox) => {
                draghitbox.preventDefault();
            });
            hitbox.addEventListener("drop", (dropedhit) => {
                var _a;
                dropedhit.preventDefault();
                const organName = (_a = dropedhit.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
                if (!organName)
                    return;
                const draggedOrgans = document.querySelectorAll(".organs");
                draggedOrgans.forEach((organImg) => {
                    if (organImg.dataset.name === organName &&
                        organImg.parentElement !== hitbox) {
                        organImg.remove;
                        organImg.style.opacity = "1";
                        organImg.style.pointerEvents = "none";
                        hitbox.appendChild(organImg);
                    }
                });
            });
        });
        checkVictoryCondition();
    }
}
;
window.addEventListener("DOMContentLoaded", () => {
    startGameTimer();
    new OrganLand();
});
