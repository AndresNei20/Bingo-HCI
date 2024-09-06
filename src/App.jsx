import { useState } from 'react'
import './App.css'
import { NavBar } from './components/navBar/NavBar';
import { Table } from './components/table/Table';
import VoiceIcon from "../src/assets/voice-icon.svg";

const getChar = function (number) {
  if (number >= 0 && number < 15) {
    return "B";
  } else if (number >= 15 && number < 30) {
    return "I";
  } else if (number >= 30 && number < 45) {
    return "N";
  } else if (number >= 45 && number < 60) {
    return "G";
  } else {
    return "O";
  }
};

const sample = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function App() {
  const [squares, setSquares] = useState(
    Array.from(Array(75)).map((_, idx) => {
      return { id: idx + 1, char: getChar(idx), state: false };
    })
  );
  const [currentSorted, setCurrentSorted] = useState({
    id: 0,
    char: "X",
    state: false
  });

  const sortNumber = () => {
    const newSorted = sample(
      squares.filter((square) => square.state === false)
    );
    if (newSorted) {
      setCurrentSorted(newSorted);
      setSquares((prevState) =>
        prevState.map((square) => {
          if (square.id === newSorted.id) {
            return { ...square, state: true };
          } else {
            return square;
          }
        })
      );
    }
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="sorter">
          <div className="current">
            <div>{currentSorted.char}</div>
            {currentSorted.id}
          </div>
          <button className="btn" onClick={sortNumber}>
            Sortear
          </button>
          <br />
          <button className="btn">
            <img src={VoiceIcon} alt="Voice icon." />
          </button>
        </div>
        <Table squares={squares} />
      </div>
    </div>
  );
}

export default App;
