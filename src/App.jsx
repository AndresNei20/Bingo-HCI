import { useState } from 'react';
import './App.css';
import { NavBar } from './components/navBar/NavBar';
import { Table } from './components/table/Table';
import { Question } from './components/question/Question';
import VoiceIcon from "../src/assets/voice-icon.svg";

// Predefined list of 40 questions
const questions = [
  "Question 1 for B1", "Question 2 for B2", "Question 3 for B3", "Question 4 for B4",
  "Question 5 for B5", "Question 6 for B6", "Question 7 for B7", "Question 8 for B8",
  "Question 9 for I1", "Question 10 for I2", "Question 11 for I3", "Question 12 for I4",
  "Question 13 for I5", "Question 14 for I6", "Question 15 for I7", "Question 16 for I8",
  "Question 17 for N1", "Question 18 for N2", "Question 19 for N3", "Question 20 for N4",
  "Question 21 for N5", "Question 22 for N6", "Question 23 for N7", "Question 24 for N8",
  "Question 25 for G1", "Question 26 for G2", "Question 27 for G3", "Question 28 for G4",
  "Question 29 for G5", "Question 30 for G6", "Question 31 for G7", "Question 32 for G8",
  "Question 33 for O1", "Question 34 for O2", "Question 35 for O3", "Question 36 for O4",
  "Question 37 for O5", "Question 38 for O6", "Question 39 for O7", "Question 40 for O8"
];

// Function to get the letter for each number
const getChar = function (number) {
  if (number >= 0 && number < 8) {
    return "B";
  } else if (number >= 8 && number < 16) {
    return "I";
  } else if (number >= 16 && number < 24) {
    return "N";
  } else if (number >= 24 && number < 32) {
    return "G";
  } else {
    return "O";
  }
};

// Function to select a random unsorted square
const sample = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

function App() {
  const [squares, setSquares] = useState(
    Array.from(Array(40)).map((_, idx) => {
      return { id: idx + 1, char: getChar(idx), state: false, question: questions[idx] };
    })
  );

  const [currentSorted, setCurrentSorted] = useState({
    id: 0,
    char: "X",
    state: false,
    question: ""
  });

  const sortNumber = () => {
    const newSorted = sample(squares.filter((square) => square.state === false));
    if (newSorted) {
      setCurrentSorted(newSorted);  // Update the sorted question and number
      setSquares((prevState) =>
        prevState.map((square) => {
          if (square.id === newSorted.id) {
            return { ...square, state: true };  // Mark this square as sorted
          } else {
            return square;
          }
        })
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className='content-info'>
          <NavBar />
          <div className="sorter">
            <div className="current">
              <div>{currentSorted.char}{currentSorted.id}</div>
            </div>
            <button className="btn" onClick={sortNumber}>
              Sort
            </button>
            <Question question={currentSorted.question} /> {/* Display the sorted question */}
          </div>
        </div>
        <div className='content-bingo'>
          <Table squares={squares} />
        </div>
      </div>
    </div>
  );
}


export default App;
