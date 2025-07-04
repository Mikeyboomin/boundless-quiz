import React, { useEffect, useState } from 'react';
import quizQuestions from '../quizData';

export default function QuizScreen({ onQuit }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [score, setScore] = useState(0);

  const question = quizQuestions[current];

  useEffect(() => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array(200).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;
        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
      });
      requestAnimationFrame(draw);
    }

    draw();
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNextQuestion = () => {
    if (selected === question.answer) {
      setScore((s) => s + 1);
    }

    if (current + 1 >= quizQuestions.length) {
      setShowResults(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleQuit = () => setShowQuitConfirm(true);

  return (
    <>
      <canvas id="starfield" className="fixed inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-xl mx-auto mt-12 p-6 bg-[#1a1a1a] border border-yellow-500 text-white rounded-2xl shadow-xl text-center">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-4 text-sm text-gray-300">
              <span>Score: {score}</span>
              <span>Question {current + 1} of {quizQuestions.length}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Q{current + 1}. {question.question}</h2>

            <div className="space-y-3 mb-6">
              {question.options.map((opt, idx) => {
                const isSelected = selected === opt;
                const bgColor = isSelected
                  ? 'bg-black text-yellow-500'
                  : 'bg-yellow-500 hover:bg-black hover:text-yellow-500';
                const textColor = isSelected ? '' : 'text-black';

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className={`w-full py-2 px-4 rounded-xl transition ${bgColor} ${textColor} cursor-pointer`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleQuit}
                className="bg-black hover:bg-yellow-500 text-white hover:text-black border border-yellow-400 py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
              >
                Quit Quiz
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!selected}
                className={`py-2 px-6 rounded-xl font-semibold border transition ${
                  !selected
                    ? 'bg-gray-500 text-gray-300 border-gray-500 cursor-not-allowed'
                    : 'bg-black hover:bg-yellow-500 text-white hover:text-black border-yellow-400 cursor-pointer'
                }`}
              >
                {current === quizQuestions.length - 1 ? 'Show Results' : 'Next Question'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl text-yellow-500 font-normal mb-1">Your Score</h2>
            <p className="text-xl text-yellow-500 font-normal mb-4">
              {score} / {quizQuestions.length}
            </p>

            <button
              onClick={() => setShowAnswersModal(true)}
              className="text-gray-400 hover:text-yellow-500 no-underline mb-6"
            >
              Correct Answers
            </button>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  const tweetText = encodeURIComponent(
                    `I just scored ${score} / ${quizQuestions.length} on the VeriStar Pt2 quiz week 20 by\n@0xboomin\n! #SuccinctRockStar`
                  );
                  const tweetLink = `https://twitter.com/intent/tweet?text=${tweetText}`;
                  window.open(tweetLink, '_blank');
                }}
                className="bg-yellow-500 hover:bg-black hover:text-yellow-500 text-black py-1 px-3 text-sm rounded-md font-semibold transition cursor-pointer"
              >
                Share on X
              </button>

              <button
                onClick={onQuit}
                className="bg-black border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black py-1 px-3 text-sm rounded-md font-semibold transition cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          </>
        )}
        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500">Built by 0xboomin with ❤️</p>
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white border border-yellow-500 rounded-2xl p-6 w-[90%] max-w-sm shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to quit?</h2>
            <p className="mb-6 text-gray-400">Your progress will be lost.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowQuitConfirm(false);
                  onQuit();
                }}
                className="bg-yellow-500 hover:bg-black hover:text-yellow-500 text-black py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
              >
                Yes, Quit
              </button>
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="bg-black border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Correct Answers Modal */}
      {showAnswersModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] text-white border border-yellow-500 rounded-2xl p-6 w-[90%] max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Correct Answers</h2>
            <ul className="text-left max-h-96 overflow-y-auto space-y-2 text-gray-300">
              {quizQuestions.map((q, i) => (
                <li key={i}>
                  <span className="text-yellow-400 font-bold">Q{i + 1}:</span> {q.answer}
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAnswersModal(false)}
                className="bg-yellow-500 hover:bg-black hover:text-yellow-500 text-black py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
