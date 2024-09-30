import Timer from "../Timer/Timer";
import "./question.css";

export const Question = ({ question, time, timerKey }) => {
  return (
    <div className="question">
      <h3>Question:</h3>
      <p>{question || "Push Sort button to display a question"}</p>
      {time && <Timer key={timerKey} time={time} />} {/* Render Timer only if time is passed */}
    </div>
  );
};
