
import React from "react";
import { QuizMode } from "@/types/quiz";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizIntroScreenProps {
  selectedQuizMode: QuizMode;
  isLoading: boolean;
  onBack: () => void;
  onStart: () => void;
}

const QuizIntroScreen: React.FC<QuizIntroScreenProps> = ({ 
  selectedQuizMode, 
  isLoading, 
  onBack, 
  onStart 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-heritage-red rounded-full flex items-center justify-center text-white mx-auto">
          <selectedQuizMode.icon size={30} />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2 font-song">{selectedQuizMode.name}</h2>
      <p className="text-sm text-gray-600 mb-6">{selectedQuizMode.description}</p>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">题目数量</span>
          <span className="text-sm">{selectedQuizMode.questionCount}题</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">题目类型</span>
          <span className="text-sm">单选题</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">每题时间</span>
          <span className="text-sm">{selectedQuizMode.timeLimit}秒</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onBack} 
          variant="outline"
          className="flex-1 border-heritage-gold/30"
        >
          返回
        </Button>
        
        <Button 
          onClick={onStart} 
          disabled={isLoading}
          className="flex-1 bg-heritage-red hover:bg-heritage-red/90 transition-transform hover:scale-105 duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              准备中...
            </>
          ) : "开始竞答"}
        </Button>
      </div>
    </div>
  );
};

export default QuizIntroScreen;
