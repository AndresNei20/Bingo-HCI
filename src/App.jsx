import { useState, useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { Table } from "./components/table/Table";
import { Footer } from "./components/footer/Footer";
import { Question } from "./components/Question/Question";
import FileUpload from "./components/FileUpload/FileUpload";
import Timer from "./components/Timer/Timer"; // Import the new Timer component

function App() {
  const [squares, setSquares] = useState([]);
  const [newlySortedId, setNewlySortedId] = useState(null);
  const [highlightedLetter, setHighlightedLetter] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // To trigger timer reset when sorting new question

  // Function to get the letter for each number
  const getChar = (number) => {
    if (number >= 0 && number < 8) return "B";
    if (number >= 8 && number < 16) return "I";
    if (number >= 16 && number < 24) return "N";
    if (number >= 24 && number < 32) return "G";
    return "O";
  };

  // Initialize squares with questions and time
  const initializeSquares = (questionsWithTime) => {
    setSquares(
      Array.from(Array(40)).map((_, idx) => ({
        id: idx + 1,
        char: getChar(idx),
        state: false,
        question: questionsWithTime[idx].question,
        time: questionsWithTime[idx].time, // Set the time for each square
      }))
    );
  };

  // Function to handle file upload data
  const handleFileUpload = (questionsWithTime) => {
    initializeSquares(questionsWithTime); // Initialize with question and time
    setFileUploaded(true);
  };

  const sortNumber = () => {
    const newSorted = squares.filter((square) => !square.state).sort(() => 0.5 - Math.random())[0];
    if (newSorted) {
      setNewlySortedId(newSorted.id);
      setHighlightedLetter(newSorted.char);
      setSquares((prevState) =>
        prevState.map((square) =>
          square.id === newSorted.id ? { ...square, state: true } : square
        )
      );
      setTimerKey((prevKey) => prevKey + 1); // Reset the timer when a new question is sorted
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="content-info">
          <NavBar highlightedLetter={highlightedLetter} />
          {fileUploaded ? (
            <>
              <div className="sorter">
                <div className="current">
                  <div className="pick">
                    {newlySortedId ? `${newlySortedId}` : "?"}
                  </div>
                </div>
                <Question
                  question={
                    newlySortedId ? squares[newlySortedId - 1].question : ""
                  }
                  time={newlySortedId ? squares[newlySortedId - 1].time : null} // Pass the time for the current question
                  timerKey={timerKey} // Pass the key to reset the timer
                />
              </div>
              <button className="btn" onClick={sortNumber}>
                Sort
              </button>
              <Footer />
            </>
          ) : (
            <FileUpload onFileUpload={handleFileUpload} />
          )}
        </div>
        {fileUploaded && (
          <div className="content-bingo">
            <Table squares={squares} newlySortedId={newlySortedId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
