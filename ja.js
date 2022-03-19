var listeAtome;
var univers = [];
var couleurActive;
var debug = false;
var compteFait = false;
var cible = 0;
var point = 0;
var bouton;

//mode debug qui affiche les atomes
function debugeur() {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (univers[x][y].atome && cell.etat != 1) {
        if (debug) {
          enleverCible(univers[x][y]);
        } else {
          var img = document.createElement("img");
          img.src = "atom.png";
          univers[x][y].dom.appendChild(img);
        }
      }
    }
  }
  debug = !debug;
}

//creer les cellule dans la liste Univers
function creerUnivers() {
  Atome();
  var li, co, ligne;
  for (li = 0; li < 10; li += 1) {
    ligne = [];
    for (co = 0; co < 10; co += 1) {
      cell = new cellule(li, co);
      listeAtome.forEach((cellCourante) => {
        if (cellCourante.x == li && cellCourante.y == co) {
          console.log(cellCourante);
          cell.atome = true;
        }
      });
      ligne.push(cell);
    }
    univers.push(ligne);
  }
}

//initialise le jeu
function init() {
  creerUnivers();
  bouton = document.getElementById("validate");
  bouton.style.display = "none";
  bouton.addEventListener("click", (event) => {
    comptePoint();
  });

  var div = document.getElementById("jeu");
  var tableau = document.createElement("table");
  div.appendChild(tableau);

  var tbody = document.createElement("tbody");
  tableau.appendChild(tbody);
  for (let y = 0; y < 10; y++) {
    var tr = document.createElement("tr");
    tr.className = "ligne_" + y;
    tbody.appendChild(tr);

    for (let x = 0; x < 10; x++) {
      var td = document.createElement("td");
      td.className = "colonne_" + x;

      univers[y][x].dom = td;
      univers[y][x].initialiser();

      tr.appendChild(td);
    }
  }
}

//creer les 5 atomes cacher au hasard
function Atome() {
  listeAtome = [];
  for (let a = 0; a < 5; a++) {
    var x = getRandomInt(1, 8);
    var y = getRandomInt(1, 8);
    listeAtome[a] = {
      x,
      y,
    };
  }
  console.log(listeAtome);
}

// objet cellule ,gère les différents type de cellules
function cellule(li, co) {
  this.li = li;
  this.co = co;
  this.etat = -1;
  this.atome = false;
  this.grille = li > 0 && li < 9 && co > 0 && co < 9;
  this.initialiser = function () {
    var couleur = "";

    if (this.li === 0 && this.co === 0) {
      ajoutCible(this);
      this.dom.addEventListener("click", (event) => {
        debugeur();
      });
    }

    if (
      (this.li === 0 && this.co === 9) ||
      (this.li === 9 && this.co === 0) ||
      (this.li === 0 && this.co === 0) ||
      (this.li === 9 && this.co === 9)
    ) {
      // les 4 coins
      couleur = "grey";
    } else if (
      this.li === 0 ||
      this.co === 0 ||
      this.li === 9 ||
      this.co === 9
    ) {
      // les boutons latéraux ou les pions joué
      couleur = "darkgrey";
      this.dom.addEventListener("click", (event) => {
        if (this.etat == -1) {
          couleurActive = getRandomColor();
          sens(this);
          point++;
        }
        this.etat = 1;
      });
    } else {
      couleur = "white";
      this.dom.addEventListener("click", (event) => {
        if (this.etat === -1 && cible < 5) {
          ajoutCible(this);
          cible++;
          this.etat = 1;
        } else if (this.etat === 1) {
          enleverCible(this);
          cible--;
          this.etat = -1;
          bouton.style.display = "none";
        }
        if (cible >= 5) {
          bouton.style.display = "block";
        }
      });
    }
    this.dom.style.backgroundColor = couleur;
  };
}

//ajoute les drapeau pour cibler les atomes cachés
function ajoutCible(cell) {
  var img = document.createElement("img");
  img.src = "drapeau.png";
  cell.dom.appendChild(img);
}

//* les enlèves
function enleverCible(cell) {
  cell.dom.removeChild(cell.dom.firstChild);
}

//gestion du sens du rayon X selon le cotès
function sens(cell) {
  cell.dom.style.backgroundColor = couleurActive;
  var celluTir;

  if (cell.li == 0) {
    celluTir = resultatDuTir(cell, 1, 0);
  } else if (cell.li == 9) {
    celluTir = resultatDuTir(cell, -1, 0);
  } else if (cell.co == 0) {
    celluTir = resultatDuTir(cell, 0, 1);
  } else if (cell.co == 9) {
    celluTir = resultatDuTir(cell, 0, -1);
    console.log(celluTir);
  }
  if (celluTir != null) {
    if (celluTir.li == cell.li && celluTir.co == cell.co) {
    } else {
      point++;
      celluTir.dom.style.backgroundColor = couleurActive;
    }
  }
}

//compte les points
function comptePoint() {

  if (compteFait == false) {
    let decompteAtom = point;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (!univers[x][y].atome && univers[x][y].etat == 1) {
          point = point + 5;
        }
      }
    }
    if (decompteAtom == point) {
        document.body.style.backgroundColor = "green";
      alert(
        " Bravo vous avez trouvez tout les atomes. Votre score est de " + point
      );
    } else {
        document.body.style.backgroundColor = "red";
      alert(
        " Vous n'avez pas trouvé tout les atomes . Votre score est de " + point
      );
    }

    compteFait = true;
  
  }
}

//retourne la cellule qui resulte du tire
function resultatDuTir(cell, vl, vc) {
  var s = univers[cell.li + vl][cell.co + vc];
  console.log(s);

  if (!s.grille) {
    return s;

    //cas à définir
  }
  if (s.atome) {
    return null; // Absorption
  }
  if (vc === 0) {
    if (univers[s.li][s.co - 1].atome) {
      if (!cell.grille) {
        return cell;
      }
      return resultatDuTir(cell, 0, 1);
    }
    if (univers[s.li][s.co + 1].atome) {
      if (!cell.grille) {
        return cell;
      }
      return resultatDuTir(cell, 0, -1);
    }
  } else {
    if (univers[s.li - 1][s.co].atome) {
      if (!cell.grille) {
        return cell;
      }
      return resultatDuTir(cell, 1, 0);
    }
    if (univers[s.li + 1][s.co].atome) {
      if (!cell.grille) {
        return cell;
      }
      return resultatDuTir(cell, -1, 0);
    }
  }
  return resultatDuTir(s, vl, vc);
}

//retourne une couleur aléatoire
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//retourne un entier aléatoire
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
