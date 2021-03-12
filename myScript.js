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
  const setName = (name) => {
    Player.name = name
  }

  return {getName, getSymbol, setName}
}


const Game = (() => {
  let player1
  let player2
  const winDiv = document.getElementById("winner")
  const turnDiv = document.getElementById("turn")
  let players = [player1, player2];
  let board = [];
  let turn = 0;

  const newGame = () => {
    player1 = Player('Max', "X")
    player2 = Player('Meg', 'O')
    players = [player1,player2]
    turn = 0; 
    board = Gameboard.newBoard();
    Gameboard.displayController(board);
    turnDiv.textContent = `It's ${players[turn].getName()}'s turn!`;
    winDiv.textContent = '';
  }

  const checkWinner = (arr) => {
    console.log(arr)
    if (arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != '' ||
        arr[3] == arr[4] && arr[4] == arr[5] && arr[3] != '' ||
        arr[6] == arr[7] && arr[7] == arr[8] && arr[6] != '' ||
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
      board = Gameboard.getBoard()
      
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
          return
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

  const setPlayerOne = (name) => {
    player1 = Player(name,"X")
    players[0]=player1
    turnDiv.textContent = `It's ${players[turn].getName()}'s turn!`

  }

  const setPlayerTwo = (name) => {
    player2 = Player(name,"O")
    players[1]=player2
    turnDiv.textContent = `It's ${players[turn].getName()}'s turn!`
  }


  return{
    newGame,
    playTile,
    checkWinner,
    checkDraw,
    checkFree,
    setPlayerOne,
    setPlayerTwo
  }
})();



window.addEventListener('load', Game.newGame);
const tiles = document.querySelectorAll(".space");
const resetGame = document.getElementById('reset');
const player1But = document.getElementById('player1');
const player1Form = document.getElementById('p1');
const player2But = document.getElementById('player2');
const player2Form = document.getElementById('p2');

tiles.forEach(tile => tile.addEventListener("click", (event) => {
  Game.playTile(event.target)
}))
resetGame.addEventListener("click", Game.newGame)

player1But.addEventListener("click", (event) => {
  Game.setPlayerOne(player1Form.value);
  player1Form.value= '';
})

player2But.addEventListener("click", (event) => {
  Game.setPlayerTwo(player2Form.value)
  player2Form.value = ''
})
