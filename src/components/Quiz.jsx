import { useState } from 'react';
import quizQuestions from '../quizData';



export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (selected) => {
    if (selected === quizQuestions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < quizQuestions.length) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl text-center">
      {showResults ? (
        <div>
          <h2 className="text-2xl text-blue-700 font-bold mb-4">Quiz Complete! 🎉</h2>
          <p className="text-lg">You scored {score} out of {quizQuestions.length}</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-replicalight text-black mb-6">{quizQuestions[current].question}</h2>
          <div className="space-y-4">
            {quizQuestions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="w-full py-2 px-4 bg-rose-500 hover:bg-rose-700 text-white rounded-xl transition cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
