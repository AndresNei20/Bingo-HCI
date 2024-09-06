
import "./square.css";

export  const Square = ({ key, square }) => {
  if (square.state === true) {
    return (
      <div className="square sorted">
        <div className="char">{square.char}</div>
        {square.id}
      </div>
    );
  } else {
    return (
      <div className="square">
        <div className="char">{square.char}</div>
        {square.id}
      </div>
    );
  }
}
