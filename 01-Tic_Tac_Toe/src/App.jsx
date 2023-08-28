import { useState } from 'react';
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx';
import { TURNS, WINNER_COMBOS } from './constants.js';
import { WinnerModal } from './components/WinnerModal.jsx';

function App() {

  //Tablero
  //Comprueba si hay datos en el localStorage
  //Después se rellenará con 'X' u 'O'
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage 
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  //Turnos
  //Comprueba si hay datos en el localStorage
  //Si no, empieza la 'X'
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
      
  });

  //null es que no hay ganador, false es empate
  const [winner, setWinner] = useState(null);

  //comprueba si hay algun ganador
  const checkWinner = (board) => {

    //revisamos todas las combinaciones ganadoras
    //si hay alguna, devuelve 'x' u 'o'
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo;
      if(board[a] && board[a] === board[b] &&
        board[a] === board[c]) {
          return board[a]
        }
    }
    
    //si no hay ninguna, devolvemos null
    return null
  }
  
  //actualiza el tablero
  const updateBoard = (index) => {


    //no se actualiza si ya se ha seleccionado o hay ganador
    if(board[index] || winner) return

    //actualizamos el valor en el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);

    //se revisa si hay ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } 
    else if(checkEndGame(newBoard)){
      setWinner(false);
    }

    
  }

  const checkEndGame = (newBoard) => {
    //hay empate si no hay espacios vacios restantes
    return newBoard.every((square) => square !== null)
  } 

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe Actualizado</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((square ,index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                  {square}
                </Square>
            )
          }) 
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
     
    </main>
  )
}

export default App
