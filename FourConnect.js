var tableRow;
var tableData;
var playerTurn;
var cells;
var resetBtn;
var currentPlayer = 1;
let winner;
var ColorArray = [];


//To get the name of the PLayers

while (!player1){
    var player1 = prompt('Player One: Enter your name. You will be red.');
};
var player1Color = 'red';

while (!player2){
    var player2 = prompt('Player Two: Enter your name. You will be black.');
};
var player2Color = 'black';

// var RowLen = prompt('Please enter number of rows');
// var ColLen = prompt('Please enter number of column');

var RowLen = 5;
var ColLen = 5;
var Pieces = 4;


$(document).ready(function(){
    for (var i=0;i<RowLen;i++){
        $("#game-table").append(`<tr id="game-row${i}"></tr>`);
        for (var j=0;j<ColLen;j++){
            $("#game-row"+i).append(`<td id="game-col${j}" class="cell"></td>`);
        }
    }
    LoadAllHttpCallAsync();
})

const LoadAllHttpCallAsync = async () => {
    await AssignValue();
    await FunctionAssignToCell();
    await AssigEventToResetBtn();
}

const AssignValue = async ()=>{
    //Assigning different elements to the variables to acces them

    tableRow = document.getElementsByTagName('tr');
    tableData = document.getElementsByTagName('td');
    playerTurn = document.querySelector('.player-turn');
    cells = document.querySelectorAll('.cell');
    resetBtn = document.querySelector('.reset');

    //Passing player name to show who's turn that is 1st player here
    playerTurn.textContent = `Hey ${player1} it's your turn!`
}




// Funtions

function changeColor(e){
    // Get clicked column index
    let column = e.target.cellIndex;
    let row = [];

    for (i = tableRow.length-1; i > -1; i--){
        if (tableRow[i].children[column].style.backgroundColor == 'yellow'){
            row.push(tableRow[i].children[column]);
            if (currentPlayer === 1){
                row[0].style.backgroundColor = 'red';
                if (horizontalCheck()|| verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player1} WINS!!`;
                    playerTurn.style.color = player1Color;
                    return alert(`${player1} WINS!!`);
                }else{
                    playerTurn.textContent = `Hey ${player2} it's your turn`
                    return currentPlayer = 2;
                }
            }else{
                row[0].style.backgroundColor = 'black';
                if (horizontalCheck()|| verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    playerTurn.textContent = `${player2} WINS!!`;
                    playerTurn.style.color = player2Color;
                    return alert(`${player2} WINS!!`);
                }else{
                    playerTurn.textContent = `Hey ${player1} it's your turn`;
                    return currentPlayer = 1;
                }
                
            }
        }
    }
   
}

const FunctionAssignToCell = async ()=>{
    //Assigning click event to all the cells to execute function changeColor
    Array.prototype.forEach.call(tableData, (cell) => {
        cell.addEventListener('click', changeColor);
        // Set all cells to yellow for new game.
        cell.style.backgroundColor = 'yellow';
    });
}


const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//Function to match and check for the four connect
function colorMatchCheck(colorArray){
    var flag = false;
    var ColorIndex= [];
    if (currentPlayer == 1){
        var count = countOccurrences(colorArray,'red')
        if(count >= Pieces){
            colorArray.map((color,index) =>{
                if(color == 'red'){
                    ColorIndex.push(index)
                }
            })
            for(var i=1;i<ColorIndex.length;i++){
                if(ColorIndex[i]-ColorIndex[i-1] == 1){
                    flag = true;
                }else{
                    flag = false;
                    break;
                }

            }
        }

    }
    else if(currentPlayer == 2){
        var count = countOccurrences(colorArray,'black')
        if(count >= Pieces){
            colorArray.map((color,index) =>{
                if(color == 'black'){
                    ColorIndex.push(index)
                }
            })
            for(var i=1;i<ColorIndex.length;i++){
                if(ColorIndex[i]-ColorIndex[i-1] == 1){
                    flag = true;
                }else{
                    flag = false;
                    break;
                }

            }
        }
    }
    return flag;
}

//Horizontally check the color match
function horizontalCheck(){
    var flag = false;
    for (let row = 0; row < RowLen; row++){
        ColorArray = [];
        for (let col =0; col < ColLen; col++){
            ColorArray.push(tableRow[row].children[col].style.backgroundColor)
        }
    flag = colorMatchCheck(ColorArray);
    if (flag == true){break}   
    }
    return flag;
}


//Vertically check the color match
function verticalCheck(){
    var flag = false;
    for (let col = 0; col < ColLen; col++){
        ColorArray = [];
        for (let row = 0; row < RowLen; row++){
            ColorArray.push(tableRow[row].children[col].style.backgroundColor) 
        }
        flag = colorMatchCheck(ColorArray);
        if (flag == true){break}    
    }
    return flag;
}

//Diagonally check for color match
function diagonalCheck(){
    var r = ColLen;
    var c = RowLen;
    for(let col = 0; col < c; col++){
        var x = col;
        ColorArray = [];
        for (let row = 0; row < r; row++){
            ColorArray.push(tableRow[row].children[x].style.backgroundColor)
            x += 1; 
        }
        r-=1;
        c-=1;
        flag = colorMatchCheck(ColorArray);
        if (flag == true){break}   
    }
    return flag;
}


//Diagonally check for color match
function diagonalCheck2(){
    for(let col = 0; col < ColLen; col++){
        var x = col;
        ColorArray = [];
        for (let row = RowLen; row = 0; row--){
            ColorArray.push(tableRow[row].children[x].style.backgroundColor)
            x+=1;
        }
    }
}

const AssigEventToResetBtn=async () =>{
    //Adding event listener to Reset Button
    resetBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = 'yellow';
        });
        playerTurn.style.color = 'black';
        return (currentPlayer === 1 ? playerTurn.textContent = `Hey ${player1} it's your turn` : playerTurn.textContent = `Hey ${player2} it's your turn`);
    });
}

