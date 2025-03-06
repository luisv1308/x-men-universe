import { create } from "zustand";
import questionsData from "../../assets/quiz-sp.json";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";
import buzzer from "../../assets/sounds/buzzer.mp3";

const correctAudio = new Audio(correctSound);
const wrongAudio = new Audio(wrongSound);
const buzzerAudio = new Audio(buzzer);

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type Difficulty = "easy" | "medium" | "hard";

type QuizState = {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  difficulty: Difficulty | null;
  timeLeft: number;
  gameState: "start" | "playing" | "results";
  selectedAnswer: string | null;
  answerStatus: "correct" | "wrong" | null;
  progress: ("correct" | "wrong" | null)[];
  startGame: (difficulty: Difficulty) => void;
  answerQuestion: (answer: string) => void;
  resetGame: () => void;
  tick: () => void;
};

const difficultyTimes = {
  easy: 30,
  medium: 20,
  hard: 10,
};

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  difficulty: null,
  timeLeft: 30,
  gameState: "start",
  selectedAnswer: null,
  answerStatus: null,
  progress: [],

  startGame: (difficulty) => {
    const shuffledQuestions = [...questionsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 10);
    set({
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      score: 0,
      difficulty,
      gameState: "playing",
      timeLeft: difficultyTimes[difficulty],
      selectedAnswer: null,
      answerStatus: null,
      progress: new Array(shuffledQuestions.length).fill(null),
    });
  },

  answerQuestion: (answer) => {
    set((state) => {
      const isCorrect = state.questions[state.currentQuestionIndex].answer === answer;
      if (isCorrect) {
        correctAudio.play();
      } else {
        wrongAudio.play();
      }
  
      const newProgress = [...state.progress];
      newProgress[state.currentQuestionIndex] = isCorrect ? 'correct' : 'wrong';
  
      return {
        selectedAnswer: answer,
        answerStatus: isCorrect ? 'correct' : 'wrong',
        score: isCorrect ? state.score + 1 : state.score,
        progress: newProgress,
        timeLeft: 0, // Evita que siga bajando y muestre -1
      };
    });
  
    setTimeout(() => {
      set((state) => {
        const nextIndex = state.currentQuestionIndex + 1;
        const isGameOver = nextIndex >= state.questions.length;
        return {
          currentQuestionIndex: nextIndex,
          gameState: isGameOver ? 'results' : 'playing',
          timeLeft: state.difficulty ? difficultyTimes[state.difficulty] : 30,
          selectedAnswer: null,
          answerStatus: null,
        };
      });
    }, 2200);
  },

  tick: () => {
    set((state) => {
      if (state.selectedAnswer !== null) return {}; // No hacer nada si ya respondieron
  
      if (state.timeLeft > 0) {
        return { timeLeft: state.timeLeft - 1 };
      } else {
        buzzerAudio.play();
        const nextIndex = state.currentQuestionIndex + 1;
        const isGameOver = nextIndex >= state.questions.length;
        return {
          currentQuestionIndex: nextIndex,
          gameState: isGameOver ? 'results' : 'playing',
          timeLeft: state.difficulty ? difficultyTimes[state.difficulty] : 30,
        };
      }
    });
  },

  resetGame: () =>
    set({
      gameState: "start",
      questions: [],
      score: 0,
      currentQuestionIndex: 0,
      difficulty: null,
      timeLeft: 30,
      selectedAnswer: null,
      answerStatus: null,
      progress: [],
    }),
}));
