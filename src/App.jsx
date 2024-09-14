import { useState, useEffect } from 'react';
import './App.css';
import { NavBar } from './components/navBar/NavBar';
import { Table } from './components/table/Table';
import { Question } from './components/question/Question';
import { Logo } from './components/logo/Logo';
import { Footer } from './components/footer/Footer';


// Google Sheets CSV URL
const csvUrl = 'https://docs.google.com/spreadsheets/d/1Ugag0wfHr8lRwSVsqVXMn9rn9ITgxtX-d9j2qPg_JDk/gviz/tq?tqx=out:csv';

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

// Function to fetch CSV data from Google Sheets
const fetchCSV = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data.split('\n').map((row) => row.split(','));
};

function App() {
  const [squares, setSquares] = useState([]);
  const [newlySortedId, setNewlySortedId] = useState(null);

  // Function to check for updates in the spreadsheet
  const checkForUpdates = async () => {
    const csvData = await fetchCSV(csvUrl);
    
    // Assuming the questions are in the first column of the CSV
    const questions = csvData.map(row => row[0]);

    // Check if the fetched questions differ from the current ones
    const isDifferent = squares.some((square, idx) => square.question !== questions[idx]);

    // If there are changes, update the state
    if (isDifferent) {
      setSquares(
        Array.from(Array(40)).map((_, idx) => ({
          id: idx + 1,
          char: getChar(idx),
          state: squares[idx]?.state || false, // Preserve current state
          question: questions[idx],
        }))
      );
    }
  };

  // Fetch the questions from Google Sheets and set the initial state
  useEffect(() => {
    const fetchQuestions = async () => {
      const csvData = await fetchCSV(csvUrl);
      
      // Assuming the questions are in the first column of the CSV
      const questions = csvData.map(row => row[0]);

      // Initialize squares with the fetched questions
      setSquares(
        Array.from(Array(40)).map((_, idx) => ({
          id: idx + 1,
          char: getChar(idx),
          state: false,
          question: questions[idx],
        }))
      );
    };

    fetchQuestions();

    // Set up a polling interval to check for changes every 10 seconds
    const intervalId = setInterval(checkForUpdates, 10000); // 10 seconds interval

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

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
      <Footer>
      
      </Footer>
    </div>
  );
}

export default App;
