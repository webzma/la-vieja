import { Square } from "../Square";
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  let textWinner;

  if (winner === "❌") {
    textWinner = "Ganó X";
  } else if (winner === "⚪") {
    textWinner = "Ganó O";
  }

  return (
    <section className="winner">
      <div className="text">
        {winner === false && <h2>¡EMPATE!</h2>}

        <h2>{textWinner}</h2>

        {winner && (
          <header className="win">{<Square>{`${winner}`}</Square>}</header>
        )}

        <footer>
          <button className="startAgain-btn" onClick={resetGame}>
            Empezar de nuevo
          </button>
        </footer>
      </div>
    </section>
  );
}
