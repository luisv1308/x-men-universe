import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuizStore } from "../../store/quiz/quizStore";

const QuizStartScreen: React.FC = () => {
  const { startGame } = useQuizStore();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <h1 className="text-4xl font-bold mb-6">X-Men Quiz</h1>
      <p className="text-lg mb-4">¿Cuánto sabes sobre los X-Men?</p>
      <div className="mb-4">
        <label className="block mb-2">Selecciona la dificultad:</label>
        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value as "easy" | "medium" | "hard")
          }
          className="p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="easy">Fácil (3 preguntas)</option>
          <option value="medium">Normal (5 preguntas)</option>
          <option value="hard">Difícil (10 preguntas)</option>
        </select>
      </div>
      <button
        onClick={() => {
            startGame(difficulty);
            navigate("/quiz/game"); // Navega a la pantalla de juego
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold"
      >
        Comenzar
      </button>
    </div>
  );
};

export default QuizStartScreen;
