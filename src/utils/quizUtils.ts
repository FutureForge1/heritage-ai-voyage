
import { QuizQuestion, QuizMode } from "@/types/quiz";

export const filterQuestionsByMode = (questions: QuizQuestion[], mode: QuizMode): QuizQuestion[] => {
  // Filter questions based on difficulty
  let filteredQuestions = questions;
  
  if (mode.difficulty !== "mixed") {
    filteredQuestions = questions.filter(q => q.difficulty === mode.difficulty);
  }
  
  // If not enough questions, add from other difficulties
  if (filteredQuestions.length < mode.questionCount) {
    const additionalQuestions = questions.filter(q => q.difficulty !== mode.difficulty);
    filteredQuestions = [...filteredQuestions, ...additionalQuestions];
  }
  
  // Shuffle and take required number of questions
  return shuffleArray([...filteredQuestions]).slice(0, mode.questionCount);
};

export const calculateStreakBonus = (streakCount: number): number => {
  if (streakCount >= 5) return 20;
  if (streakCount >= 3) return 10;
  return 0;
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
