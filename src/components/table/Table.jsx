import { Square } from "../square/Square";
import "./table.css";

export const Table = ({ squares }) => {
  const columns = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="table">
      {columns.map((char) => (
        <div key={char} className="column">
          {squares
            .filter((square) => square.char === char)
            .map((square) => (
              <Square key={square.id} square={square} />
            ))}
        </div>
      ))}
    </div>
  );
};
