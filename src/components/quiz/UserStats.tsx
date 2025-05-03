
import React from "react";
import { Achievement } from "@/types/quiz";
import { Medal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserStatsProps {
  totalPoints: number;
  achievements: Achievement[];
}

const UserStats: React.FC<UserStatsProps> = ({ totalPoints, achievements }) => {
  const getUserLevel = (points: number) => {
    if (points < 300) return "初学者";
    if (points < 1000) return "学习者";
    if (points < 3000) return "文化爱好者";
    if (points < 7000) return "文化达人";
    return "非遗专家";
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">您的竞答积分</h3>
          <p className="text-2xl font-bold text-heritage-gold">{totalPoints}</p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-600">等级</p>
          <div className="flex items-center">
            <Medal className="text-heritage-red mr-1" size={16} />
            <span className="font-medium">{getUserLevel(totalPoints)}</span>
          </div>
        </div>
      </div>
      
      {achievements.slice(0, 2).map(achievement => (
        <div key={achievement.id} className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm flex items-center">
              <span className="mr-1">{achievement.icon}</span>
              {achievement.name}
            </span>
            <span className="text-xs text-gray-500">{achievement.progress}/{achievement.total}</span>
          </div>
          <Progress 
            value={(achievement.progress / achievement.total) * 100}
            className="h-1.5 bg-heritage-gold/10"
          />
        </div>
      ))}
    </div>
  );
};

export default UserStats;
