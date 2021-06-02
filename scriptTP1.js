class Joueur{
    xo;
    image;

    constructor(xo, image) {
        this.xo = xo;
        this.image = image;
    }
}

let joueurs = [new Joueur('X', "imgx.png"), new Joueur('O', "imgo.png")];
let tour = 0;

let grille = ['T','i','C','t','A','c','T','0','E'];
let casesPrises = 0;

let erreur = document.getElementById("erreur");

function attribuerCase(element, index){
    let img = document.getElementsByTagName("img")[0];

    if(erreur.style.visibility === "visible"){
        erreur.style.visibility = "hidden";
    }

    grille[index]=joueurs[tour].xo;
    casesPrises++;

    element.innerHTML = joueurs[tour].xo;
    element.setAttribute("class", joueurs[tour].xo);
    element.setAttribute("onclick", "dejaPris()");

    let gagne = false;
    if((grille[0]===grille[4] && grille[0]===grille[8]) || (grille[2]===grille[4] && grille[2]===grille[6])){
        gagne = true;
    }

    for(let i = 0; i<3 && !gagne; i ++){
        if((grille[i]===grille[i+3] && grille[i]===grille[i+6]) || (grille[i*3]===grille[i*3+1] && grille[i*3]===grille[i*3+2])){
            gagne = true;
        }
    }

    if(gagne){
        afficheGagnant(joueurs[tour].xo+" gagne !");
    }
    else {
        if(casesPrises === 9){
            afficheGagnant("Partie nulle !")
            img.setAttribute("src", "imgnulle.png");
        }
        else {
            if(tour === 0) {
                tour = 1;
            }
            else{
                tour = 0;
            }

            let tourJoueur = document.getElementById("joueur");
            tourJoueur.innerHTML = "Joueur " + joueurs[tour].xo;
            tourJoueur.setAttribute("class", joueurs[tour].xo);
            img.setAttribute("src", joueurs[tour].image);
        }
    }

}

function dejaPris(){
    erreur.style.visibility = "visible";
}

function afficheGagnant(message){

    let gagnant = document.getElementById("gagnant");
    gagnant.innerHTML = message;
    gagnant.style.visibility = "visible";
    document.getElementById("joueur").style.visibility = "hidden";

    let tds = document.getElementsByTagName("td");
    for(let i=0; i<tds.length;i++) {
        tds[i].removeAttribute("onclick");
    }
}
