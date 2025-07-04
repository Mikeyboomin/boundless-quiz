import { useEffect, useState } from 'react';
import quizQuestions from '../quizData';

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

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
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4">
      {/* Starry canvas background */}
      <canvas id="starfield" className="absolute inset-0 w-full h-full z-0" />

      {/* Quiz content */}
      <div className="relative z-10 max-w-xl w-full p-6 bg-black bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl text-center">
        {showResults ? (
          <div>
            <h2 className="text-2xl text-yellow-500 font-bold mb-4">Quiz Complete! 🎉</h2>
            <p className="text-lg text-gray-200">
              You scored {score} out of {quizQuestions.length}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-yellow-500 mb-6">
              {quizQuestions[current].question}
            </h2>
            <div className="space-y-4">
              {quizQuestions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-xl transition duration-200"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
