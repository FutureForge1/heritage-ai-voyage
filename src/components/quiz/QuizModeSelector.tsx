
import React from "react";
import { QuizMode } from "@/types/quiz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface QuizModeSelectorProps {
  quizModes: QuizMode[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectMode: (mode: QuizMode) => void;
}

const QuizModeSelector: React.FC<QuizModeSelectorProps> = ({ 
  quizModes, 
  activeTab, 
  setActiveTab, 
  onSelectMode 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-2">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          {quizModes.map(mode => (
            <TabsTrigger 
              key={mode.id} 
              value={mode.id}
              className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all"
            >
              {mode.id === "daily" && <span className="inline-block animate-ping absolute h-2 w-2 rounded-full bg-heritage-gold opacity-75"></span>}
              {mode.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {quizModes.map(mode => (
          <TabsContent key={mode.id} value={mode.id} className="focus-visible:outline-none">
            <div 
              className="border-2 border-heritage-gold/30 rounded-xl p-4 transform transition-all hover:shadow-md cursor-pointer hover:scale-[1.02] hover:border-heritage-gold"
              onClick={() => onSelectMode(mode)}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-heritage-red flex items-center justify-center text-white">
                  <mode.icon size={24} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-lg font-song">{mode.name}</h3>
                  <p className="text-sm text-gray-600">{mode.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-heritage-paper p-2 rounded">
                  <p className="font-medium text-heritage-red">{mode.questionCount}题</p>
                  <p className="text-xs text-gray-500">题目数量</p>
                </div>
                <div className="bg-heritage-paper p-2 rounded">
                  <p className="font-medium text-heritage-red">{mode.timeLimit}秒</p>
                  <p className="text-xs text-gray-500">每题时间</p>
                </div>
                <div className="bg-heritage-paper p-2 rounded">
                  <p className="font-medium text-heritage-red">{mode.rewards.points}</p>
                  <p className="text-xs text-gray-500">积分奖励</p>
                </div>
              </div>
              
              {mode.rewards.badges && (
                <div className="flex gap-1 mt-3 flex-wrap">
                  {mode.rewards.badges.map((badge, index) => (
                    <Badge key={index} className="bg-heritage-gold/20 text-heritage-gold border-none">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
              
              {mode.rewards.special && (
                <div className="mt-2">
                  <span className="text-xs bg-heritage-red/10 text-heritage-red px-2 py-1 rounded-full">
                    特别奖励: {mode.rewards.special}
                  </span>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuizModeSelector;
