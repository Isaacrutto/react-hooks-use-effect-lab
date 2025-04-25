import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle countdown
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          onAnswered(false);  // Trigger onAnswered when time runs out
          return 10;           // Reset time to 10 seconds
        }
      });
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or the effect runs again
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);  // Dependency array: effect runs when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);  // Reset the timer to 10 seconds when the user answers
    onAnswered(isCorrect); // Notify parent component whether the answer was correct
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
