import React from "react";
import Papa from "papaparse"; // For CSV parsing
import * as XLSX from "xlsx"; // For Excel parsing

const FileUpload = ({ onFileUpload }) => {
  // Function to handle file upload and parse CSV or Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileType = file.name.split(".").pop();

    if (fileType === "csv") {
      // Parse CSV file
      Papa.parse(file, {
        complete: (result) => {
          const questions = result.data.map((row) => row[0]).slice(0, 40);
          onFileUpload(questions); // Send questions back to App component
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
        const questions = json.map((row) => row[0]).slice(0, 40);
        onFileUpload(questions); // Send questions back to App component
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Unsupported file format");
    }
  };

  return (
    <div className="file-upload">
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
      <p>Upload a CSV or Excel file with 40 questions (one per row)</p>
    </div>
  );
};

export default FileUpload;
