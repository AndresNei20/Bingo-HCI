import "./square.css";

export const Square = ({ square, squareClass }) => {
  return (
    <div className={squareClass}>
      <div className="char">{square.char}</div>
      {square.id}
    </div>
  );
};
