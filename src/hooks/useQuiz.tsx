
import { useState, useEffect, useCallback } from "react";
import { QuizMode, QuizQuestion } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";
import { filterQuestionsByMode, calculateStreakBonus, analyzeKnowledgeGaps } from "@/utils/quizUtils";

interface UseQuizProps {
  questions: QuizQuestion[];
}

export const useQuiz = ({ questions }: UseQuizProps) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedQuizMode, setSelectedQuizMode] = useState<QuizMode | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("daily");
  const [answeredQuestions, setAnsweredQuestions] = useState<
    { question: QuizQuestion; correct: boolean }[]
  >([]);
  const [knowledgeGaps, setKnowledgeGaps] = useState<string[]>([]);
  const [selectedKnowledgeNode, setSelectedKnowledgeNode] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    // Load user data from session storage
    const storedPoints = sessionStorage.getItem("quizPoints");
    const storedAchievements = sessionStorage.getItem("quizAchievements");
    
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints));
    }
    
    if (storedAchievements) {
      setUnlockedAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (quizStarted && !quizFinished && !isAnswered && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      if (timeLeft === 0) {
        handleAnswer(null);
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizFinished, isAnswered, timeLeft]);

  // Analyze knowledge gaps when user has answered enough questions
  useEffect(() => {
    if (answeredQuestions.length >= 5) {
      const allCategories = ["traditional", "opera", "crafts", "festival", "general"];
      const gaps = analyzeKnowledgeGaps(answeredQuestions, allCategories);
      setKnowledgeGaps(gaps);
      
      if (gaps.length > 0) {
        toast({
          title: "学习提示",
          description: `我们发现您在 ${gaps.map(gap => {
            if (gap === "traditional") return "传统文化";
            if (gap === "opera") return "戏曲";
            if (gap === "crafts") return "传统工艺";
            if (gap === "festival") return "传统节日";
            return "通用知识";
          }).join(', ')} 方面的知识有所欠缺，建议多加学习。`,
        });
      }
    }
  }, [answeredQuestions, toast]);

  const selectQuizMode = (mode: QuizMode | null) => {
    setSelectedQuizMode(mode);
  };
  
  const startQuiz = () => {
    if (!selectedQuizMode) return;
    
    setIsLoading(true);
    setTimeout(() => {
      // Filter questions for the selected mode
      const quizQuestions = filterQuestionsByMode(questions, selectedQuizMode);
      setFilteredQuestions(quizQuestions);
      
      setQuizStarted(true);
      setQuizFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setStreakCount(0);
      setTimeLeft(selectedQuizMode.timeLimit);
      setAnsweredQuestions([]);
      setIsLoading(false);
      
      // Add entrance animation to question container
      const questionContainer = document.getElementById('question-container');
      if (questionContainer) {
        questionContainer.classList.add('question-enter');
        setTimeout(() => {
          questionContainer.classList.remove('question-enter');
        }, 500);
      }
    }, 1000);
  };

  const handleAnswer = (optionIndex: number | null) => {
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    
    if (!filteredQuestions.length) return;
    
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const isCorrect = optionIndex === correctAnswer;
    
    // Track answered questions for knowledge analysis
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      // Correct answer
      setScore(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      
      // Award bonus points for streaks
      const streakBonus = calculateStreakBonus(streakCount);
      const questionPoints = 20 + streakBonus;
      
      // Update total points with animation
      const pointsDisplay = document.querySelector('.score-value');
      if (pointsDisplay) {
        pointsDisplay.classList.add('score-increase');
        setTimeout(() => {
          pointsDisplay.classList.remove('score-increase');
        }, 1000);
      }
      
      setTotalPoints(prev => prev + questionPoints);
      
      // Show toast for streak
      if (streakCount + 1 >= 3) {
        toast({
          title: `${streakCount + 1}连胜！`,
          description: `额外奖励 ${streakBonus} 点积分`,
        });
      }
    } else {
      // Reset streak on wrong answer
      setStreakCount(0);
    }
  };

  const nextQuestion = useCallback(() => {
    if (!selectedQuizMode || !filteredQuestions.length) return;
    
    if (currentQuestionIndex < selectedQuizMode.questionCount - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setTimeLeft(selectedQuizMode.timeLimit);
      
      // Add entrance animation to next question
      setTimeout(() => {
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
          questionContainer.classList.add('question-enter');
          setTimeout(() => {
            questionContainer.classList.remove('question-enter');
          }, 500);
        }
      }, 50);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, selectedQuizMode, filteredQuestions]);

  const selectRelatedQuestion = (questionId: string) => {
    const questionIndex = filteredQuestions.findIndex(q => q.id === questionId);
    if (questionIndex >= 0) {
      toast({
        title: "已添加至队列",
        description: "相关问题已添加至答题队列，将在当前答题结束后出现。",
      });
      
      // We could potentially add this to the question queue for future implementation
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    
    if (!selectedQuizMode) return;
    
    // Calculate percentage
    const percentage = Math.round((score / selectedQuizMode.questionCount) * 100);
    
    // Add quiz mode rewards
    if (percentage >= 80) {
      setTotalPoints(prev => prev + selectedQuizMode.rewards.points);
      
      // Check for achievements
      if (percentage >= 90 && selectedQuizMode.id === "master") {
        if (!unlockedAchievements.includes("ach4")) {
          setUnlockedAchievements(prev => [...prev, "ach4"]);
          toast({
            title: "成就解锁！",
            description: "非遗专家：在大师赛中获得90%以上的正确率",
          });
        }
      }
      
      // Save to session storage
      sessionStorage.setItem("quizPoints", totalPoints.toString());
      sessionStorage.setItem("quizAchievements", JSON.stringify(unlockedAchievements));
    }
  };

  const restartQuiz = () => {
    setSelectedQuizMode(null);
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setAnsweredQuestions([]);
  };

  const shareResult = () => {
    toast({
      title: "分享成功",
      description: "你的竞答成绩已分享到社区"
    });
  };

  return {
    quizStarted,
    quizFinished,
    selectedQuizMode,
    currentQuestionIndex,
    filteredQuestions,
    selectedOption,
    isAnswered,
    score,
    timeLeft,
    isLoading,
    streakCount,
    totalPoints,
    unlockedAchievements,
    activeTab,
    answeredQuestions,
    knowledgeGaps,
    currentQuestion: filteredQuestions[currentQuestionIndex],
    allQuestions: questions,
    setActiveTab,
    selectQuizMode,
    startQuiz,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    shareResult,
    selectRelatedQuestion,
    setSelectedKnowledgeNode,
    selectedKnowledgeNode
  };
};
