const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board;
let turn = '🙉'; /* au début c'est 🙉 qui joue*/
let win;
let score = {
    '🙉': 0,
    '🥵': 0
};

const squares = Array.from(document.querySelectorAll('#board .square'));

/*bouton*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    if (winner) {
        score[winner] += 1;  
    }
    return winner ? winner : board.includes('') ? null : 'T';
}

/* Fonction de gestion des clics sur les cases*/
function handleTurn(event) {
    let idx = squares.findIndex(function(square) {
        return square === event.target;

    });
    let imageurl = turn === '🙉' ? 'téléchargé (1).jpg' : 'téléchargé.jpg';
    if (board[idx]) return;
    board[idx] = turn;
    turn = turn === '🙉' ? '🥵' : '🙉';
    win = getWinner(); 
    render(); 
}

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    win = null;
    turn = '🙉'; 
    render();
}


function render() {
    const player1Image = 'téléchargé (1).jpg'; 
    const player2Image = 'téléchargé.jpg'; 

    board.forEach(function(mark, index) {
        const square = squares[index];
        if (mark === '🙉') {
            square.innerHTML = `<img src="${player1Image}" alt="Joueur 1" class="token">`;
        } else if (mark === '🥵') {
            square.innerHTML = `<img src="${player2Image}" alt="Joueur 2" class="token">`;
        } else {
            square.innerHTML = '';
        }
    });

    messages.textContent = win === 'T' ? `Égalité!` : win ? `${win} Gagne la partie!` : `C'est le tour de ${turn}`;

    document.getElementById('score-x').textContent = score['🙉'];
    document.getElementById('score-o').textContent = score['🥵'];
}

init();
const dialogue = document.getElementById("dialogue");
const closeButton = document.getElementById("fermer");
const fermerToujours = document.getElementById("fermerToujours");
let memoireFermer = localStorage.getItem("fermer");
 
 
 
/*Lorsque on clique sur le bouton ça commence la fonction fermer*/
closeButton.addEventListener("click", fermer);
 

function fermer() {
  dialogue.close();
}

fermerToujours.addEventListener("click", fermerToujoursFunc);
/*Ferme la boite de dialogue et met en local storage le montant de memoireFermer*/
function fermerToujoursFunc() {
  dialogue.close();
  memoireFermer++;
  localStorage.setItem("fermer", memoireFermer);
}
/*Convertit en nombre l'information transmisse pour de faire fonctionner la prochaine boucle*/
if (memoireFermer) {
  testf = parseInt(memoireFermer);
}
else {
  memoireFermer = 0;
}
  /*si le montant est supérieur à 1 n'affiche plus la boite de dialogue*/
if (memoireFermer < 1) {
  dialogue.showModal();
}
else {
  dialogue.close();
}

