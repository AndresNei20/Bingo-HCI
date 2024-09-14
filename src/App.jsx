import { useState } from 'react';
import './App.css';
import { NavBar } from './components/navBar/NavBar';
import { Table } from './components/table/Table';
import { Question } from './components/question/Question';
import VoiceIcon from "../src/assets/voice-icon.svg";

const questions = [ /* Your predefined questions array */ ];

// Function to get the letter for each number
const getChar = function (number) {
  if (number >= 0 && number < 8) return "B";
  if (number >= 8 && number < 16) return "I";
  if (number >= 16 && number < 24) return "N";
  if (number >= 24 && number < 32) return "G";
  return "O";
};

// Function to select a random unsorted square
const sample = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function App() {
  const [squares, setSquares] = useState(
    Array.from(Array(40)).map((_, idx) => ({
      id: idx + 1,
      char: getChar(idx),
      state: false,
      question: questions[idx],
    }))
  );

  const [newlySortedId, setNewlySortedId] = useState(null);

  const sortNumber = () => {
    const newSorted = sample(squares.filter((square) => !square.state));
    if (newSorted) {
      setNewlySortedId(newSorted.id); // Set the newly sorted square ID
      setSquares((prevState) =>
        prevState.map((square) =>
          square.id === newSorted.id ? { ...square, state: true } : square
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="content-info">
          <NavBar />
          <div className="sorter">
            <div className="current">
              <div className='pick'>
                {newlySortedId ? `${getChar(newlySortedId - 1)}${newlySortedId}` : "Sort a number"}
              </div>
            </div>
            <Question question={newlySortedId ? squares[newlySortedId - 1].question : ""} />
          </div>
          <button className="btn" onClick={sortNumber}>
            Sort
          </button>
        </div>
        <div className="content-bingo">
          <Table squares={squares} newlySortedId={newlySortedId} />
        </div>
      </div>
    </div>
  );
}

export default App;
