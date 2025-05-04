
import { useState, useEffect } from "react";
import { Award, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion, QuizMode } from "@/types/quiz";

export interface ActiveQuizProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  timeLeft: number;
  score: number;
  streakCount: number;
  isAnswered: boolean;
  selectedOption: number | null;
  quizMode: QuizMode;
  allQuestions: QuizQuestion[]; // Add this missing property
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
}

const ActiveQuiz = ({
  currentQuestion,
  currentQuestionIndex,
  timeLeft,
  score,
  streakCount,
  isAnswered,
  selectedOption,
  quizMode,
  allQuestions,
  onAnswer,
  onNext,
}: ActiveQuizProps) => {
  const [timeBarValue, setTimeBarValue] = useState(100);
  
  // Calculate percentage of time left
  useEffect(() => {
    setTimeBarValue((timeLeft / quizMode.timeLimit) * 100);
  }, [timeLeft, quizMode.timeLimit]);

  const handleOptionClick = (index: number) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <div id="question-container" className="bg-white rounded-xl p-6 shadow-md animate-fade-in">
      {/* Question Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-heritage-red font-bold text-xl mr-2">Q{currentQuestionIndex + 1}</span>
          <span className="text-sm text-gray-500">/ {quizMode.questionCount}</span>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Award size={16} className="text-heritage-gold mr-1" />
            <span className="font-medium score-value">{score}</span>
          </div>
          
          <div className="flex items-center text-heritage-red">
            <Clock size={16} className="mr-1" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
        </div>
      </div>
      
      {/* Time Progress Bar */}
      <div className="mb-4">
        <Progress 
          value={timeBarValue} 
          indicatorClassName={timeBarValue < 30 ? "bg-heritage-red animate-pulse" : "bg-heritage-teal"} 
          className="h-2"
        />
      </div>
      
      {/* Question */}
      <div className="mb-6">
        <div className="px-3 py-1 bg-heritage-gold/20 text-heritage-gold text-xs rounded-full mb-2 inline-block">
          {currentQuestion.category === "traditional" ? "传统文化" :
           currentQuestion.category === "opera" ? "戏曲" : 
           currentQuestion.category === "crafts" ? "传统工艺" : 
           currentQuestion.category === "festival" ? "传统节日" : "文化常识"}
        </div>
        <h2 className="text-lg font-bold">{currentQuestion.question}</h2>
      </div>
      
      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 
              ${isAnswered ? 
                index === currentQuestion.correctAnswer ? 
                  "bg-green-100 border-green-500 text-green-800" : 
                index === selectedOption ? 
                  "bg-red-100 border-red-500 text-red-800" : 
                  "bg-white border-gray-200" 
                : "bg-white border-gray-200 hover:border-heritage-gold hover:bg-heritage-gold/10"}`}
            onClick={() => handleOptionClick(index)}
          >
            <span className="font-medium">{option}</span>
          </div>
        ))}
      </div>
      
      {/* Explanation */}
      {isAnswered && (
        <div className={`p-4 rounded-lg mb-6 ${selectedOption === currentQuestion.correctAnswer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <h3 className="font-medium mb-1">
            {selectedOption === currentQuestion.correctAnswer ? "答对了！" : "不对哦..."}
          </h3>
          <p className="text-sm">{currentQuestion.explanation}</p>
        </div>
      )}
      
      {/* Next Button */}
      {isAnswered && (
        <button 
          className="w-full py-3 bg-heritage-red text-white rounded-lg hover:bg-heritage-red/90 transition-all duration-200 transform hover:scale-105"
          onClick={onNext}
        >
          继续
        </button>
      )}
      
      {/* Streak Indicator */}
      {streakCount > 0 && (
        <div className="absolute top-2 right-2">
          <div className="px-2 py-1 bg-heritage-gold/20 rounded-full text-xs flex items-center">
            <Award size={12} className="text-heritage-gold mr-1" />
            <span>{streakCount} 连胜</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveQuiz;
