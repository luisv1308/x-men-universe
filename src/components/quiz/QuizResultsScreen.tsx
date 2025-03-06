import React from "react";
import { useQuizStore } from "../../store/quiz/quizStore";
import { Link } from "react-router";

const QuizResultsScreen: React.FC = () => {
  const { score, questions, progress, resetGame } = useQuizStore();

  return (
    <div className="flex flex-col items-center justify-center   text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>
      <p className="text-lg">
        Puntuación: {score} / {questions.length}
      </p>
      <ul className="mt-4">
        {questions.map((q, index) => (
          <li
            key={index}
            className={`mb-2 ${
              progress[index] === "correct" ? "text-green-500" : "text-red-500"
            }`}
          >
            {q.question}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-4">Tu nivel de mutante es:</h2>
      <p className="text-lg font-bold mt-4 text-green-500">
        {score / questions.length <= 0.3
          ? "¿Estás seguro de que viste X-Men?"
          : score / questions.length <= 0.6
          ? "Mutante en entrenamiento"
          : score / questions.length <= 0.9
          ? "Miembro oficial de los X-Men"
          : "¡Eres un Omega-Level Mutant!"}
      </p>
      <Link
        to="/quiz"
        onClick={resetGame}
        className="mt-4 p-2 bg-blue-500 rounded"
      >
        Reiniciar
      </Link>
    </div>
  );
};

export default QuizResultsScreen;
