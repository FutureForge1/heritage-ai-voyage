
import React from "react";
import { QuizQuestion, QuizMode } from "@/types/quiz";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuizResultsProps {
  score: number;
  quizMode: QuizMode;
  questionsToShow: QuizQuestion[];
  onRestart: () => void;
  onShare: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  quizMode, 
  questionsToShow,
  onRestart, 
  onShare 
}) => {
  const percentage = Math.round((score / quizMode.questionCount) * 100);
  
  const getResultMessage = (percent: number) => {
    if (percent >= 80) return "太厉害了！你是非遗文化达人！";
    if (percent >= 60) return "不错的成绩，继续努力！";
    return "再接再厉，多了解非遗知识吧！";
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-2 text-center">{quizMode.name} 竞答结果</h2>
      
      <div className="my-6 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-heritage-teal flex items-center justify-center mx-auto mb-3 text-heritage-teal relative animate-pulse">
          <span className="text-3xl font-bold">{percentage}%</span>
          {percentage >= 80 && (
            <span className="absolute -top-2 -right-2 text-xl">🏆</span>
          )}
        </div>
        <p className="font-medium">{getResultMessage(percentage)}</p>
        <p className="text-sm text-gray-500 mt-2">得分：{score}/{quizMode.questionCount}</p>
        
        {percentage >= 80 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-heritage-gold">
              恭喜获得 {quizMode.rewards.points} 积分奖励！
            </p>
            
            {quizMode.rewards.badges && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {quizMode.rewards.badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    className="bg-heritage-gold text-white border-none transform transition-all hover:scale-110"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            
            {quizMode.rewards.special && (
              <div className="mt-3 transform transition-all hover:scale-110 inline-block">
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
          className="border-heritage-gold/30 hover:bg-heritage-gold/10 transition-all"
          onClick={onRestart}
        >
          重新开始
        </Button>
        <Button 
          className="bg-heritage-teal hover:bg-heritage-teal/90 transition-transform hover:scale-105"
          onClick={onShare}
        >
          <Share2 size={16} className="mr-2" />
          分享成绩
        </Button>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-3">知识点回顾</h3>
        <div className="space-y-4">
          {questionsToShow.map((q, index) => (
            <div 
              key={q.id} 
              className="bg-heritage-paper/50 p-3 rounded-lg hover:bg-heritage-paper transition-all"
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
