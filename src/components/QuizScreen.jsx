import React, { useEffect, useState } from 'react';
import quizQuestions from '../quizData';

export default function QuizScreen({ onQuit, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [disableButtons, setDisableButtons] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResults, setShowResults] = useState(false);



  const question = quizQuestions[current];

  useEffect(() => {
    if (showAnswer) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleTimeout();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [current, showAnswer]);

  const handleTimeout = () => {
    if (!selected) {
      setShowAnswer(true);
      setDisableButtons(true);
      setShowTimeoutModal(true);
    }
  };

  const handleSelect = (option) => {
    if (disableButtons || showAnswer) return;
    setSelected(option);
  };

  const handleCheckAnswer = () => {
  if (showAnswer) {
    handleNextQuestion();
  } else {
    if (selected === question.answer) {
      setScore((s) => s + 1);
    }
    setAnsweredCount((c) => c + 1); // ✅ Always increment on check
    setShowAnswer(true);
    setDisableButtons(true);
  }
};

  const handleNextQuestion = () => {
    const next = current + 1;
    if (next >= quizQuestions.length) {
      setShowResults(true);
    } else {
      setCurrent(next);
      setSelected(null);
      setShowAnswer(false);
      setDisableButtons(false);
      setTimer(10);
      setShowTimeoutModal(false);
    }
  };

  const handleQuit = () => {
    setShowQuitConfirm(true);
  };

  return (
    <>
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl text-center relative z-10">
        {/* Score and progress */}
        <div className="flex justify-between mb-4 text-sm text-gray-600">
          <span>Score: {score}</span>
          <span>
            Question {current + 1} of {quizQuestions.length}
          </span>
        </div>

        {/* Timer */}
        <div className="text-xl font-semibold text-rose-600 mb-4">
          ⏱️ {timer}s remaining
        </div>

        {/* Question */}
        <div className="relative w-full mb-4 h-6">
          
  {/* Progress Bar Background */}
  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-rose-300 via-red-350 to-rose-400 rounded-full transition-all duration-500 ease-in-out"
      style={{
        width: `${answeredCount / quizQuestions.length * 100}%`,
      }}
    ></div>
  </div>

  {/* Berry overlay positioned at the end */}
  <img
    src="/renderberryferry.png"
    alt="Berry"
    className="absolute h-6 w-6 transition-all duration-500 ease-in-out"
    style={{ 
      top: -6,
      left: `calc(${answeredCount / quizQuestions.length * 100}% - 12px)`,
      zIndex: 10,
    }}
  />
</div>


{/* Question with number prefix */}
<h2 className="text-2xl font-semibold mb-6">
  Q{current + 1}. {question.question}
</h2>


        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt, idx) => {
            let bgColor = 'bg-rose-500 hover:bg-rose-700';
            let textColor = 'text-white';

            if (showAnswer) {
              if (opt === question.answer) {
                bgColor = 'bg-green-500';
              } else if (opt === selected && selected !== question.answer) {
                bgColor = 'bg-red-500';
              } else {
                bgColor = 'bg-gray-200';
                textColor = 'text-gray-600';
              }
            } else if (selected === opt) {
              bgColor = 'bg-rose-700';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                disabled={disableButtons}
                className={`w-full py-2 px-4 rounded-xl transition ${bgColor} ${textColor} cursor-pointer`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleQuit}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition cursor-pointer"
          >
            Quit Quiz
          </button>

          <button
  onClick={handleCheckAnswer}
  disabled={!selected && !showAnswer}
  className={`py-2 px-6 rounded-xl font-semibold transition ${
    (!selected && !showAnswer)
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-black hover:bg-neutral-900 text-white cursor-pointer'
  }`}
>
  {showAnswer
    ? (current === quizQuestions.length - 1 ? 'Show Results' : 'Next Question')
    : 'Check Answer'}
</button>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Are you sure you want to quit?</h2>
            <p className="mb-6 text-gray-600">Your progress will be lost.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowQuitConfirm(false);
                  onQuit();
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
              >
                Yes, Quit
              </button>
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Ran Out Modal */}
      {showTimeoutModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">⏰ Time ran out!</h2>
            <p className="mb-6 text-gray-600">You didn’t select an answer in time.</p>
            <button
              onClick={() => setShowTimeoutModal(false)}
              className="bg-black text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {showResults && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">You are now Berryfied! 🍓</h2>
      <p className="mb-2 text-lg text-gray-700">You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{quizQuestions.length}</span></p>

      <img src="/berryfied-badge.png" alt="Berryfied Badge" className="w-24 mx-auto my-4" />

      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => onQuit()}
          className="bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
        >
          Play Again
        </button>

       <button
  onClick={() => {
    const tweetText = encodeURIComponent("I just got Berryfied on the Boundless quiz! 🍓");
    const shareUrl = encodeURIComponent(`https://your-site.vercel.app/share?score=${score}`);
    const tweetLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${shareUrl}`;
    window.open(tweetLink, "_blank");
  }}
  className="bg-black hover:bg-neutral-900 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
>
  Share on X
</button>

      </div>
    </div>
  </div>
)}
    </>
  );
}


