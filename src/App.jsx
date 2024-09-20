import { useState } from "react";
import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { Table } from "./components/table/Table";
import { Footer } from "./components/footer/Footer";
import { Question } from "./components/Question/Question";
import FileUpload from "./components/FileUpload/FileUpload"; // Import the new FileUpload component

function App() {
  const [squares, setSquares] = useState([]);
  const [newlySortedId, setNewlySortedId] = useState(null);
  const [highlightedLetter, setHighlightedLetter] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false); // State to track if the file is uploaded

  // Function to get the letter for each number
  const getChar = (number) => {
    if (number >= 0 && number < 8) return "B";
    if (number >= 8 && number < 16) return "I";
    if (number >= 16 && number < 24) return "N";
    if (number >= 24 && number < 32) return "G";
    return "O";
  };

  // Initialize squares with questions
  const initializeSquares = (questions) => {
    setSquares(
      Array.from(Array(40)).map((_, idx) => ({
        id: idx + 1,
        char: getChar(idx),
        state: false,
        question: questions[idx],
      }))
    );
  };

  // Function to handle file upload data
  const handleFileUpload = (questions) => {
    initializeSquares(questions);
    setFileUploaded(true); // Hide the FileUpload component after the file is uploaded
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
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="content-info">
          <NavBar highlightedLetter={highlightedLetter} />
          {fileUploaded ? ( // Conditionally render FileUpload based on fileUploaded state
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
                />
              </div>
              <button className="btn" onClick={sortNumber}>
                Sort
              </button>
              <Footer />
            </>
          ) : (
            <FileUpload onFileUpload={handleFileUpload} /> // Show FileUpload component initially
          )}
        </div>
        {fileUploaded && ( // Only show the Table if a file has been uploaded
          <div className="content-bingo">
            <Table squares={squares} newlySortedId={newlySortedId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
