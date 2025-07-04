import React, { useEffect } from 'react';

export default function HomeScreen({ onStart }) {
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = Array(200).fill().map(() => ({
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black px-4 text-center relative overflow-hidden">
      {/* Starry background */}
      <canvas id="starfield" className="absolute inset-0 w-full h-full z-0" />

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center">
        <img
          src="/veristar.png"
          alt="Berry"
          className="w-16 h-16 mb-6 object-contain"
        />

        <h1 className="text-5xl font-bold text-yellow-500 mb-4">Welcome to VeriStar Pt2!</h1>

        <p className="text-gray-300 max-w-md mx-auto mb-6 text-center">
          Get ready to test your knowledge of Succinct Stage 2.5.<br /> This quiz will challenge your understanding of Succinct Stage 2.5, the prover network, and the $PROVE token.
        </p>

        <button
          onClick={onStart}
          className="bg-yellow-500 text-black font-semibold py-2 px-5 rounded-xl border border-transparent transition cursor-pointer hover:bg-black hover:text-yellow-500 hover:border-yellow-500"
        >
          Start Quiz
        </button>

        <p className="mt-6 text-sm text-gray-500">Built by 0xboomin with ❤️</p>
      </div>
    </div>
  );
}

