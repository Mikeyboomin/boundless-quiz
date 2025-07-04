import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import quizQuestions from './quizData';

export default function App() {
  const [mode, setMode] = useState('home'); // "home" | "quiz" | "results"
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setScore(0);
    setMode('quiz');
  };

  const handleEndQuiz = (finalScore) => {
    setScore(finalScore);
    setMode('results');
  };

  const handleRestart = () => {
    setScore(0);
    setMode('home');
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      {mode === 'home' && <HomeScreen onStart={handleStartQuiz} />}
      {mode === 'quiz' && (
        <QuizScreen
          questions={quizQuestions}
          onQuit={handleRestart}
          onFinish={handleEndQuiz}
        />
      )}
      {mode === 'results' && (
        <ResultsScreen
          score={score}
          total={quizQuestions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
