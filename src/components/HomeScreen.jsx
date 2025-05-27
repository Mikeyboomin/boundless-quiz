import React from 'react';

export default function HomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 px-4 text-center">
      <img
        src="/berry.png"
        alt="Berry"
        className="w-40 h-40 mb-6 rounded-full shadow-lg border-4 border-rose-300"
      />

      <h1 className="text-5xl font-bold text-rose-700 mb-4">Welcome to the Boundless Quiz!</h1>

      <p className="text-gray-700 max-w-md mb-6">
        Get ready to test your knowledge of Boundless. But first, we recommend reading the{' '}
        <a
          href="https://risczero.notion.site/socialberriescontentguide"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-600 underline hover:text-rose-800"
        >
          Boundless resources
        </a>{' '}
        to prepare yourself.
      </p>

      <button
        onClick={onStart}
        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition cursor-pointer"
      >
        Start Quiz
      </button>
    </div>
  );
}