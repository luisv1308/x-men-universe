import React, { useEffect } from "react";
import { useQuizStore } from "../../store/quiz/quizStore";
import QuizResultsScreen from "./QuizResultsScreen";

const QuizScreen: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    answerQuestion,
    score,
    gameState,
    timeLeft,
    tick,
    selectedAnswer,
    answerStatus,
    progress,
  } = useQuizStore();

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, tick]);

  if (gameState === "results") return <QuizResultsScreen />;
  if (gameState !== "playing") return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white p-4">
      <h2 className="text-2xl font-bold mb-4">
        Pregunta {currentQuestionIndex + 1}
      </h2>
      <div className="w-full max-w-md flex gap-1 mb-4 justify-center">
        {progress.map((status, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              status === "correct"
                ? "bg-green-500"
                : status === "wrong"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
      <p className="text-lg mb-6">{currentQuestion.question}</p>
      <div className="w-full max-w-md flex flex-col gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => answerQuestion(option)}
            className={`quiz-button ${
              selectedAnswer === option
                ? answerStatus === "correct"
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <p
        className={`mt-6 text-xl font-bold ${
          timeLeft < 5 ? "text-red-500" : "text-white"
        }`}
      >
        Tiempo restante: {timeLeft} segundos
      </p>
      <p className="mt-2">Puntuación: {score}</p>
    </div>
  );
};

export default QuizScreen;
