const Gameboard = (() => {
  const tiles = document.querySelectorAll(".space");
  const newBoard = () => ['','','','','','','','',''];
  const displayController = (arr) => {
    for(i=0; i<arr.length; i++) {
      tiles[i].textContent = `${arr[i]}`
    }
  };
  const showTiles = () => console.log(tiles);
  const getBoard = () => {
    let arr = [];
    tiles.forEach(tile => arr.push(tile.textContent))
    return arr
  }
  const checkWinner = (arr) => {
    if (arr[0] == arr[1] && arr[1] == arr[2] && arr[0] != '' ||
        arr[3] == arr[4] && arr[4] == arr[5] && arr[3] != '' ||
        arr[5] == arr[6] && arr[7] == arr[8] && arr[5] != '' ||
        arr[0] == arr[3] && arr[3] == arr[6] && arr[0] != '' ||
        arr[1] == arr[4] && arr[4] == arr[7] && arr[1] != '' ||
        arr[2] == arr[5] && arr[5] == arr[8] && arr[2] != '' ||
        arr[0] == arr[4] && arr[4] == arr[8] && arr[0] != '' ||
        arr[2] == arr[4] && arr[4] == arr[6] && arr[2] != '' ){
          return true
        }
    return false
  }
  const checkFree = (tile) => {
    if (tile.textContent == ''){
      return true;
    } 
    return false
  }
  return {
    newBoard,
    displayController,
    showTiles,
    getBoard,
    checkWinner,
    checkFree
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
  const players = [player1, player2];
  let turn = 0;

  const newGame = () => {
    turn = 0; 
    let board = Gameboard.newBoard()
    Gameboard.displayController(board)
  }
  
  const playTile = (tile) => {
    if (Gameboard.checkFree(tile)){
      const board = Gameboard.getBoard()
      console.log(tile[data-spot])
      board[tile['data-spot']] == players[turn].getSymbol
      console.log(board)
    }else{

    return
  }
 
}
  return{
    newGame,
    playTile
  }
})();



window.addEventListener('load', Game.newGame)
const tiles = document.querySelectorAll(".space")
tiles.forEach(tile => tile.addEventListener("click", (event) => {
  Game.playTile(event.target)
}))
