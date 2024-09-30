import { useState, useEffect } from "react";
import "./timer.css"; // CSS for styling

const Timer = ({ time }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    setSeconds(time); // Reset the timer when the time prop changes
  }, [time]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [seconds]);

  // Calculate the percentage of time left to adjust the width of the progress bar
  const percentage = (seconds / time) * 100;

  return (
    <div className="timer">
      <div
        className="progress-background"
        style={{ width: `${percentage}%` }} // Adjust width based on remaining time
      ></div>
      <span className="timer-text">Time left: {seconds > 0 ? seconds : "Time's up!"}</span>
    </div>
  );
};

export default Timer;
