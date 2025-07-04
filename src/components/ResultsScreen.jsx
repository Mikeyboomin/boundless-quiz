import React from 'react';

export default function ResultsScreen({ score, total, onRestart }) {
  const appUrl = 'https://your-quiz-app-url.com'; // Replace with your actual app URL

  const handleShare = () => {
    const text = encodeURIComponent(
      `I just got Berryfied and received the Proof of Berry Badge! 🍓 Get yours here: ${appUrl}`
    );

    const imageUrl = encodeURIComponent('https://via.placeholder.com/1200x630.png?text=Berryfied+Badge'); // Replace with your actual badge URL later

    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${appUrl}&hashtags=Berryfied,ProofOfBerry`;

    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl text-center space-y-6">
      <h1 className="text-3xl font-bold text-rose-600">You are now Berryfied! 🍓</h1>
      
      <p className="text-xl text-gray-800 font-semibold">
        You scored {score} out of {total}
      </p>

      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold cursor-pointer"
        >
          Play Again
        </button>

        <button
          onClick={handleShare}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-xl font-semibold cursor-pointer"
        >
          Share to Twitter
        </button>
      </div>
    </div>
  );
}
