const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer ;
let gameGrid;

const winningPosition  = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// lets create a function to initialize the game

function initializeGame (){

    currentPlayer = "X";
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    gameGrid = ["","","","","","","","",""];

    // update UI

    boxes.forEach((box,index) => {

        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';

        // removing green background after winning
        box.classList = `box box${index+1}`;
    });


    newGameBtn.classList.remove('active');
    
};


initializeGame();



// NEw game button

newGameBtn.addEventListener('click' , initializeGame);


function swapTurn (){

    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    // updating UI

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function handleClick(index){

    if(gameGrid[index] === ""){

        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = 'none';
        // swap turn
        swapTurn();

        // check if game overed
        gameOver();
    }
}


boxes.forEach((box, index) => {
    
    box.addEventListener('click', () => {
        handleClick(index);
    });

});



// Game Over Logic

function gameOver(){

   let answer  = "";

   winningPosition.forEach((position) =>{

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]))

        {
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            // disabling pointer events

            boxes.forEach(box => {

                box.style.pointerEvents = "none";

            });

            boxes[position[0]].classList.add('winner');
            boxes[position[1]].classList.add('winner');
            boxes[position[2]].classList.add('winner');

        }

   });


    // If we have a winner

    if( answer !== ""){
        gameInfo.innerText = `Winner is - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    // if game tied
    let count = 0;
    gameGrid.forEach((box) => {

        if(box !== ""){
            count++;
        }

    });

    if(count === 9){
        newGameBtn.classList.add('active');
        gameInfo.innerText = 'Game Tied!'
    }

}

