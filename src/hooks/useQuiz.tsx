
import { useState, useEffect } from "react";
import { QuizMode, QuizQuestion } from "@/types/quiz";
import { useToast } from "@/components/ui/use-toast";
import { filterQuestionsByMode, calculateStreakBonus } from "@/utils/quizUtils";

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

  const selectQuizMode = (mode: QuizMode) => {
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
      setIsLoading(false);
    }, 1000);
  };

  const handleAnswer = (optionIndex: number | null) => {
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    
    if (!filteredQuestions.length) return;
    
    const correctAnswer = filteredQuestions[currentQuestionIndex].correctAnswer;
    
    if (optionIndex === correctAnswer) {
      // Correct answer
      setScore(prev => prev + 1);
      setStreakCount(prev => prev + 1);
      
      // Award bonus points for streaks
      const streakBonus = calculateStreakBonus(streakCount);
      const questionPoints = 20 + streakBonus;
      
      // Update total points
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

  const nextQuestion = () => {
    if (!selectedQuizMode || !filteredQuestions.length) return;
    
    if (currentQuestionIndex < selectedQuizMode.questionCount - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setTimeLeft(selectedQuizMode.timeLimit);
    } else {
      finishQuiz();
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
    currentQuestion: filteredQuestions[currentQuestionIndex],
    setActiveTab,
    selectQuizMode,
    startQuiz,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    shareResult
  };
};
