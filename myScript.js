const Gameboard = (() => {
  const tiles = document.querySelectorAll(".space");
  const newBoard = () => ['','','','','','','','',''];
  const displayController = (arr) => {
    for(i=0; i<arr.length; i++) {
      tiles[i].textContent = `${arr[i]}`
    }
  };
  const getBoard = () => {
    let arr = [];
    tiles.forEach(tile => arr.push(tile.textContent))
    return arr
  }

  
  return {
    newBoard,
    displayController,
    getBoard,
   
  };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {getName, getSymbol}
}


const Game = (() => {
  const player1 = Player('Max', "X")
  const player2 = Player('Meg', 'O')
  const winDiv = document.getElementById("winner")
  const turnDiv = document.getElementById("turn")
  const players = [player1, player2];
  let turn = 0;

  const newGame = () => {
    turn = 0; 
    let board = Gameboard.newBoard();
    Gameboard.displayController(board);
    turnDiv.textContent = `It's ${players[turn].getName()}'s turn!`;
    winDiv.textContent = '';
  }

  const checkWinner = (arr) => {
    if (arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != '' ||
        arr[3] == arr[4] && arr[4] == arr[5] && arr[3] != '' ||
        arr[6] == arr[7] && arr[7] == arr[8] && arr[5] != '' ||
        arr[0] == arr[3] && arr[3] == arr[6] && arr[0] != '' ||
        arr[1] == arr[4] && arr[4] == arr[7] && arr[1] != '' ||
        arr[2] == arr[5] && arr[5] == arr[8] && arr[2] != '' ||
        arr[0] == arr[4] && arr[4] == arr[8] && arr[0] != '' ||
        arr[2] == arr[4] && arr[4] == arr[6] && arr[2] != '' ){
          return true
        }
    return false
  }

  const checkDraw = (arr) => !arr.includes("")
  
  const playTile = (tile) => {
    if (Game.checkFree(tile)){
      const board = Gameboard.getBoard()
      board[parseInt(tile.dataset.spot)] = players[turn].getSymbol();
      Gameboard.displayController(board);
      if (Game.checkWinner(board)){
        winDiv.textContent = `${players[turn].getName()} won!`
        turnDiv.textContent = ''
      }
      else{
        if(Game.checkDraw(board)){
          winDiv.textContent = "It's a draw!"
          turnDiv.textContent = ""
        }
        else{
          if(turn == 0){
            turn = 1;
          }else{
            turn = 0;
          }
        }
        turnDiv.textContent = `It's ${players[turn].getName()}'s turn!`
      }
    }
    return
  }

  const checkFree = (tile) => {
    if (tile.textContent == ''){
      return true;
    } 
    return false
  }

  return{
    newGame,
    playTile,
    checkWinner,
    checkDraw,
    checkFree
  }
})();



window.addEventListener('load', Game.newGame)
const tiles = document.querySelectorAll(".space")
const resetGame = document.getElementById('reset')
tiles.forEach(tile => tile.addEventListener("click", (event) => {
  Game.playTile(event.target)
}))
