
import React, { useState, useEffect } from "react";
import { QuizQuestion, QuizMode, KnowledgeNode } from "@/types/quiz";
import { Share2, TrendingUp, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import KnowledgeGraph from "./KnowledgeGraph";

interface QuizResultsProps {
  score: number;
  quizMode: QuizMode;
  questionsToShow: QuizQuestion[];
  onRestart: () => void;
  onShare: () => void;
  knowledgeNodes?: KnowledgeNode[];
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  quizMode, 
  questionsToShow,
  onRestart, 
  onShare,
  knowledgeNodes = [] 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = Math.round((score / quizMode.questionCount) * 100);
  
  useEffect(() => {
    // Animate the score counting up
    const duration = 1500;
    const increment = score / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [score]);
  
  const getResultMessage = (percent: number) => {
    if (percent >= 80) return "太厉害了！你是非遗文化达人！";
    if (percent >= 60) return "不错的成绩，继续努力！";
    return "再接再厉，多了解非遗知识吧！";
  };
  
  // Find center node for knowledge graph - use the first correctly answered question
  const centerNodeId = questionsToShow.length > 0 ? questionsToShow[0].id : '';

  return (
    <div className="bg-white rounded-xl p-6 shadow-md mb-6 transform transition-all animate-scale-in">
      <h2 className="text-xl font-bold mb-2 text-center">{quizMode.name} 竞答结果</h2>
      
      <div className="my-6 text-center">
        <div className="w-32 h-32 mx-auto relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-heritage-teal animate-circle-progress"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.64}, 264`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              style={{
                transition: 'stroke-dasharray 1.5s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-heritage-teal animate-count-up">
              {animatedScore}
            </span>
            <span className="text-sm text-gray-500">/{quizMode.questionCount}</span>
          </div>
          {percentage >= 80 && (
            <div className="absolute -top-4 -right-4 bg-heritage-gold rounded-full p-2 animate-bounce">
              <Sparkles size={24} className="text-white" />
            </div>
          )}
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2 w-3/4 mx-auto my-4" 
          indicatorClassName="bg-heritage-teal"
          isAnimated={true}
          animationDuration={1500} 
        />
        
        <p className="font-medium mt-2 animate-fade-in">{getResultMessage(percentage)}</p>
        
        {percentage >= 80 && (
          <div className="mt-5 animation-delay-300 animate-fade-in">
            <p className="text-sm font-medium text-heritage-gold flex items-center justify-center">
              <Award className="mr-2" size={18} />
              恭喜获得 {quizMode.rewards.points} 积分奖励！
            </p>
            
            {quizMode.rewards.badges && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {quizMode.rewards.badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    className={`bg-heritage-gold text-white border-none transform transition-all hover:scale-110 animate-fade-in animation-delay-${index + 4}00`}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            
            {quizMode.rewards.special && (
              <div className="mt-4 animation-delay-800 animate-fade-in transform transition-all hover:scale-110 inline-block">
                <Badge className="bg-heritage-red text-white border-none px-3 py-1">
                  特别奖励: {quizMode.rewards.special}
                </Badge>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="border-heritage-gold/30 hover:bg-heritage-gold/10 transition-all transform hover:scale-105 animate-fade-in animation-delay-500"
          onClick={onRestart}
        >
          重新开始
        </Button>
        <Button 
          className="bg-heritage-teal hover:bg-heritage-teal/90 transition-transform hover:scale-105 animate-fade-in animation-delay-600"
          onClick={onShare}
        >
          <Share2 size={16} className="mr-2" />
          分享成绩
        </Button>
      </div>
      
      {knowledgeNodes.length > 0 && centerNodeId && (
        <div className="mt-6 animate-fade-in animation-delay-700">
          <KnowledgeGraph 
            nodes={knowledgeNodes} 
            centerId={centerNodeId} 
          />
        </div>
      )}
      
      <div className="mt-6 animate-fade-in animation-delay-800">
        <h3 className="font-medium mb-3 flex items-center">
          <TrendingUp size={18} className="mr-2 text-heritage-red" />
          知识点回顾
        </h3>
        <div className="space-y-4">
          {questionsToShow.map((q, index) => (
            <div 
              key={q.id} 
              className={`bg-heritage-paper/50 p-3 rounded-lg hover:bg-heritage-paper transition-all animate-fade-in animation-delay-${index + 9}00`}
            >
              <p className="font-medium text-sm mb-1">问题 {index + 1}：{q.question}</p>
              <p className="text-xs text-heritage-text/80 mb-1">正确答案：{q.options[q.correctAnswer]}</p>
              <p className="text-xs italic">{q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
