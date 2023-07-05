import "../index.css";
import { Square } from "../components/Square";
import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS } from "../constanst";
import { checkWinner } from "../logic/checkWinner";
import { WinnerModal } from "../components/WinnerModal/WinnerModal";
import { saveGameToStorage, resetGameToStorage } from "../logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turnPlayer, setTurnPlayer] = useState(() => {
    const turnPlayerFromStorage = window.localStorage.getItem("turn");
    return turnPlayerFromStorage ? JSON.parse(turnPlayerFromStorage) : TURNS.x;
  });

  const [winner, setWinner] = useState(null);

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurnPlayer(TURNS.x);
    setWinner(null);
    resetGameToStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) {
      alert("Jugada incorrecta");
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turnPlayer;
    setBoard(newBoard);
    updateTurn();

    saveGameToStorage({
      board: newBoard,
      turn: turnPlayer,
    });

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const updateTurn = () => {
    const newTurn = turnPlayer === TURNS.x ? TURNS.o : TURNS.x;
    setTurnPlayer(newTurn);
  };

  return (
    <>
      <section className="board">
        <h1>La vieja 😁</h1>
        <div className="game">
          {board.map((squareValue, index) => {
            return (
              <Square index={index} key={index} updateBoard={updateBoard}>
                {squareValue}
              </Square>
            );
          })}
        </div>
      </section>

      <section className="turn">
        <Square isSelected={turnPlayer === TURNS.x}>{TURNS.x}</Square>

        <Square isSelected={turnPlayer === TURNS.o}>{TURNS.o}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </>
  );
}

export default App;
