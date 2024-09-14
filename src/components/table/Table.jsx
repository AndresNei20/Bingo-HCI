import { Square } from "../square/Square";
import "./table.css";

export const Table = ({ squares, newlySortedId }) => {
  const columns = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="table">
      {columns.map((char) => (
        <div key={char} className="column">
          {squares
            .filter((square) => square.char === char)
            .map((square) => {
              const squareClass = square.state
                ? square.id === newlySortedId
                  ? 'square current-sorted' // Newly sorted
                  : 'square sorted'        // Previously sorted
                : 'square';                 // Not sorted
              return <Square key={square.id} square={square} squareClass={squareClass} />;
            })}
        </div>
      ))}
    </div>
  );
};
