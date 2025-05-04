
import React, { useEffect } from "react";
import { QuizQuestion, QuizMode } from "@/types/quiz";
import { Check, X, ArrowRight, Clock3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AIRecommendations from "./AIRecommendations";

interface ActiveQuizProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  timeLeft: number;
  score: number;
  streakCount: number;
  isAnswered: boolean;
  selectedOption: number | null;
  quizMode: QuizMode;
  allQuestions: QuizQuestion[];
  onAnswer: (index: number | null) => void;
  onNext: () => void;
  onSelectRelatedQuestion?: (questionId: string) => void;
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({
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
  onSelectRelatedQuestion
}) => {
  const progressPercentage = ((currentQuestionIndex + 1) / quizMode.questionCount) * 100;
  
  // Animation effect for new question
  useEffect(() => {
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
      questionContainer.classList.add('question-enter');
      
      const timer = setTimeout(() => {
        questionContainer.classList.remove('question-enter');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestion.id]);
  
  // Animation for correct/incorrect answers
  useEffect(() => {
    if (isAnswered) {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      const resultElement = document.getElementById('answer-result');
      if (resultElement) {
        resultElement.classList.add(isCorrect ? 'answer-correct' : 'answer-incorrect');
      }
    }
  }, [isAnswered, selectedOption, currentQuestion.correctAnswer]);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium flex items-center">
          <span className="bg-heritage-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
            {currentQuestionIndex + 1}
          </span>
          / {quizMode.questionCount}
        </p>
        
        <div className="flex items-center">
          <Clock3 size={16} className="mr-1" />
          <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-heritage-red animate-pulse' : ''}`}>
            {timeLeft}s
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm">得分: </span>
          <span className="text-heritage-red font-medium ml-1 score-value">{score}</span>
        </div>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="mb-6 h-2 bg-heritage-gold/20"
        indicatorClassName="bg-heritage-gold"
        isAnimated={true}
      />
      
      {streakCount >= 3 && (
        <div className="mb-4 bg-heritage-gold/10 p-2 rounded-lg flex items-center justify-between animate-bounce-subtle">
          <span className="text-sm font-medium text-heritage-gold flex items-center">
            <span className="mr-1">🔥</span> {streakCount} 连胜
          </span>
          <Badge className="bg-heritage-gold border-none animate-pulse">
            +{streakCount >= 5 ? 20 : 10} 积分
          </Badge>
        </div>
      )}
      
      <div id="question-container" className="mb-6 transition-all duration-300">
        <div className="mb-4 flex items-center">
          <Badge className="bg-heritage-paper border-heritage-gold/20 text-heritage-text mr-2">
            {currentQuestion.category === "traditional" && "传统文化"}
            {currentQuestion.category === "opera" && "戏曲"}
            {currentQuestion.category === "crafts" && "传统工艺"}
            {currentQuestion.category === "festival" && "传统节日"}
            {currentQuestion.category === "general" && "通用知识"}
          </Badge>
          <Badge className="bg-heritage-paper border-heritage-gold/20 text-heritage-text">
            {currentQuestion.difficulty === "easy" && "简单"}
            {currentQuestion.difficulty === "medium" && "中等"}
            {currentQuestion.difficulty === "hard" && "困难"}
          </Badge>
        </div>
        
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={`option-button w-full text-left p-3 rounded-lg border transition-all duration-300 transform ${
                isAnswered
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-50 border-green-500 scale-[1.02]'
                    : selectedOption === index
                      ? 'bg-red-50 border-red-500'
                      : 'border-gray-200'
                  : selectedOption === index
                    ? 'bg-heritage-paper border-heritage-gold scale-[1.02]'
                    : 'border-gray-200 hover:border-heritage-gold/50 hover:-translate-y-1 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && (
                  index === currentQuestion.correctAnswer ? (
                    <Check size={18} className="text-green-500" />
                  ) : selectedOption === index ? (
                    <X size={18} className="text-red-500" />
                  ) : null
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {isAnswered && (
        <div id="answer-result" className="mb-6 transition-all duration-300">
          <div className={`p-3 rounded-lg ${
            selectedOption === currentQuestion.correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-sm font-medium mb-1">
              {selectedOption === currentQuestion.correctAnswer ? '回答正确！' : '回答错误！'}
            </p>
            <p className="text-xs">{currentQuestion.explanation}</p>
          </div>
        </div>
      )}
      
      {isAnswered && (
        <>
          <AIRecommendations 
            currentQuestion={currentQuestion} 
            allQuestions={allQuestions}
            onQuestionSelect={(id) => onSelectRelatedQuestion?.(id)}
          />
          
          <Button 
            onClick={onNext}
            className="w-full bg-heritage-teal hover:bg-heritage-teal/90 transition-transform hover:scale-105 duration-300"
          >
            {currentQuestionIndex < quizMode.questionCount - 1 ? '下一题' : '查看结果'}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </>
      )}
    </div>
  );
};

export default ActiveQuiz;
