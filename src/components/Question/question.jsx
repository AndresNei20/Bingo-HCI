import './question.css';

export const Question = ({ question }) => {
  return (
    <div className="question">
      <h3>Question:</h3>
      <p>{question || "Sort a number to display a question"}</p>
    </div>
  );
};
