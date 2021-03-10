const Gameboard = (() => {
  const tiles = document.getElementsByClassName("space");

  const newBoard = () => new Array(9);
  const displayController = (arr) => {
    for(i=0; i<arr.length; i++) {
      tiles[i].textContent = `${arr[i]}`
    }
  };
  const showTiles = () => console.log(tiles);
  return {
    newBoard,
    displayController,
    showTiles
  };
})();


