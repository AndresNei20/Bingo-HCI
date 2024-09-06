import { Square } from "../square/Square";
import "./table.css";

export const Table = ({ squares }) => {
  return (
    <div className="table">
      {squares.map((square) => {
        return <Square key={square.id} square={square} />;
      })}
    </div>
  );
}