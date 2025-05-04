
import React from "react";
import { questions, quizModes, leaderboard, achievements } from "@/data/quizData";
import { useQuiz } from "@/hooks/useQuiz";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import UserStats from "@/components/quiz/UserStats";
import QuizModeSelector from "@/components/quiz/QuizModeSelector";
import LeaderboardDisplay from "@/components/quiz/LeaderboardDisplay";
import QuizIntroScreen from "@/components/quiz/QuizIntroScreen";
import ActiveQuiz from "@/components/quiz/ActiveQuiz";
import QuizResults from "@/components/quiz/QuizResults";

const QuizPage = () => {
  const { 
    quizStarted,
    quizFinished,
    selectedQuizMode,
    currentQuestionIndex,
    filteredQuestions,
    currentQuestion,
    selectedOption,
    isAnswered,
    score,
    timeLeft,
    isLoading,
    streakCount,
    totalPoints,
    activeTab,
    setActiveTab,
    selectQuizMode,
    startQuiz,
    handleAnswer,
    nextQuestion,
    restartQuiz,
    shareResult,
    allQuestions
  } = useQuiz({ questions });

  const renderQuizContent = () => {
    // If quiz not started and no mode selected - show mode selection
    if (!quizStarted && !selectedQuizMode) {
      return (
        <div className="space-y-4">
          <QuizModeSelector 
            quizModes={quizModes}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectMode={selectQuizMode}
          />
          <LeaderboardDisplay leaderboard={leaderboard} />
        </div>
      );
    }
    
    // If mode selected but quiz not started - show intro screen
    if (!quizStarted && selectedQuizMode) {
      return (
        <QuizIntroScreen
          selectedQuizMode={selectedQuizMode}
          isLoading={isLoading}
          onBack={() => selectQuizMode(null)}
          onStart={startQuiz}
        />
      );
    }
    
    // If quiz finished - show results
    if (quizFinished && selectedQuizMode) {
      // Get questions to show (all completed ones plus a few more)
      const questionsToShow = filteredQuestions.slice(0, score + 3);
      
      return (
        <QuizResults
          score={score}
          quizMode={selectedQuizMode}
          questionsToShow={questionsToShow}
          onRestart={restartQuiz}
          onShare={shareResult}
        />
      );
    }
    
    // Quiz in progress
    if (quizStarted && selectedQuizMode && currentQuestion) {
      return (
        <ActiveQuiz
          currentQuestion={currentQuestion}
          allQuestions={filteredQuestions}
          currentQuestionIndex={currentQuestionIndex}
          timeLeft={timeLeft}
          score={score}
          streakCount={streakCount}
          isAnswered={isAnswered}
          selectedOption={selectedOption}
          quizMode={selectedQuizMode}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
        />
      );
    }
    
    return null;
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗知识竞答" 
        subtitle="测试你的非遗知识水平"
        showBack={true}
        showNotification={false}
      />
      
      <div className="mx-auto max-w-lg px-4 py-4">
        {/* User stats */}
        <UserStats totalPoints={totalPoints} achievements={achievements} />
        
        {/* Quiz content */}
        {renderQuizContent()}
      </div>
      
      <Navigation />
    </div>
  );
};

export default QuizPage;
