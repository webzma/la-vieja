export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("board", turn);
}

export const resetGameToStorage = () => { 
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
}