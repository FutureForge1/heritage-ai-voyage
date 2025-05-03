
import React from "react";
import { LeaderboardUser } from "@/types/quiz";
import { Trophy } from "lucide-react";

interface LeaderboardDisplayProps {
  leaderboard: LeaderboardUser[];
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({ leaderboard }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-medium mb-3 flex items-center">
        <Trophy size={18} className="mr-1 text-heritage-gold" />
        竞答排行榜
      </h3>
      
      <div className="space-y-3">
        {leaderboard.map((user) => (
          <div 
            key={user.rank} 
            className="flex items-center justify-between p-2 border-b border-gray-100 last:border-none transform transition-all hover:-translate-x-1 duration-200"
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white mr-2 ${
                user.rank === 1 ? "bg-heritage-gold" : 
                user.rank === 2 ? "bg-heritage-teal/80" : 
                "bg-heritage-teal/50"
              }`}>
                <span className="text-xs">{user.rank}</span>
              </div>
              <div className="flex items-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover mr-2" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-heritage-paper flex items-center justify-center mr-2">
                    <span className="text-xs text-heritage-text">{user.name.charAt(0)}</span>
                  </div>
                )}
                <span className="font-medium">{user.name}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-heritage-red font-medium">{user.score}</span>
              
              {user.rank <= 3 && (
                <span className="ml-2 text-xs">
                  {user.rank === 1 && "🏆"}
                  {user.rank === 2 && "🥈"}
                  {user.rank === 3 && "🥉"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardDisplay;
