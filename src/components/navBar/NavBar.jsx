import "./navbar.css";

export const NavBar = ({ highlightedLetter }) => {
  return (
    <nav className="navbar">
      <span>
        <span className={`letter ${highlightedLetter === "B" ? "highlight" : ""}`}>B</span>
        <span className={`letter ${highlightedLetter === "I" ? "highlight" : ""}`}>I</span>
        <span className={`letter ${highlightedLetter === "N" ? "highlight" : ""}`}>N</span>
        <span className={`letter ${highlightedLetter === "G" ? "highlight" : ""}`}>G</span>
        <span className={`letter ${highlightedLetter === "O" ? "highlight" : ""}`}>O</span>
      </span>
    </nav>
  );
};
