import "./fileupload.css";
import React, { useState } from "react";
import Papa from "papaparse"; // For CSV parsing
import * as XLSX from "xlsx"; // For Excel parsing

const templateUrl = "https://docs.google.com/spreadsheets/d/1Ugag0wfHr8lRwSVsqVXMn9rn9ITgxtX-d9j2qPg_JDk/export?format=xlsx";
const materialUrl = "https://drive.google.com/uc?export=download&id=1cwE-9_Oz7nCtHdY552PM6J6oc2ashqMG";

const FileUpload = ({ onFileUpload }) => {
  const [fileUploaded, setFileUploaded] = useState(false); 

  // Function to handle file upload and parse CSV or Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileType = file.name.split(".").pop();

    if (fileType === "csv") {
      // Parse CSV file
      Papa.parse(file, {
        complete: (result) => {
          // Skip first 3 rows and get data starting from column B for questions and C for times
          const questionsWithTime = result.data.slice(3, 43).map((row) => ({
            question: row[1],  // Column B - questions
            time: row[2],      // Column C - time in seconds
          }));
          onFileUpload(questionsWithTime); // Send questions and times back to App component
          setFileUploaded(true); 
        },
        error: (error) => console.error("Error parsing CSV file:", error),
      });
    } else if (fileType === "xlsx" || fileType === "xls") {
      // Parse Excel file
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Skip first 3 rows and get data starting from column B for questions and C for times
        const questionsWithTime = json.slice(3, 43).map((row) => ({
          question: row[1],  // Column B - questions
          time: row[2],      // Column C - time in seconds
        }));
        onFileUpload(questionsWithTime); 
        setFileUploaded(true);
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Unsupported file format");
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        id="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "none" }} 
      />

      {!fileUploaded && (
        <>
          <label htmlFor="file" className="custom-file-upload">
            <img className="upload-icon" src="./uploadicon.svg" alt="Upload icon" /> 
            Upload Your File
          </label>
          <p className="directions-upload">The file must be a CSV or Excel with 40 questions and time values. </p>
          <p className="highlighted-paragraph">You can download the template below and use it as your guide </p>
          <div className="download-links">
            <a href={templateUrl} download="question-template.xlsx" className="download-template-btn">
              <img className="upload-icon" src="./download.svg" alt="Upload icon" />
              Download Question Template
            </a>
            <a href={materialUrl} download="bingo-cards.pdf" className="download-template-btn">
              <img className="upload-icon" src="./download.svg" alt="Upload icon" />
              Download Bingo Cards File
            </a>
          </div>
        </>
      )}

      {fileUploaded && <p className="upload-success-message">File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;
