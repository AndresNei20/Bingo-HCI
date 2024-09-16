import "./question.css";

export const Question = ({ question }) => {
  return (
    <div className="question">
      <h3>Question:</h3>
      <p>{question || "Push Sort button to display a question"}</p>
    </div>
  );
};
