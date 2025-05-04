
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Award, ChevronRight } from "lucide-react";

const Badge = ({ children, className = "" }) => {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
};

const QuizCard = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  
  useEffect(() => {
    // Get quiz points if available
    const storedPoints = sessionStorage.getItem("quizPoints");
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints));
    }
  }, []);
  
  return (
    <div className="px-4 mb-6">
      <Link to="/quiz">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-heritage-red text-white text-xs px-2 py-1">
            热门活动
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-16 h-16 bg-heritage-gold/20 rounded-lg flex items-center justify-center">
                <Trophy className="text-heritage-gold" size={32} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <h3 className="text-lg font-bold font-song">非遗知识竞答</h3>
                <Badge className="ml-2 bg-heritage-gold/20 text-heritage-gold border-0">
                  新赛季
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                参与知识竞答，赢取积分与徽章
              </p>
              
              <div className="flex items-center text-heritage-teal">
                <span className="text-xs">立即参与</span>
                <ChevronRight size={16} />
              </div>
              
              {totalPoints > 0 && (
                <div className="mt-2 bg-heritage-paper px-2 py-1 rounded-full inline-flex items-center">
                  <Award size={12} className="text-heritage-gold mr-1" />
                  <span className="text-xs">已获得 {totalPoints} 积分</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-3 flex">
            <div className="bg-heritage-paper/70 rounded-lg p-2 text-center w-1/3">
              <div className="text-xs text-heritage-text/70">每日问答</div>
              <div className="text-sm font-medium">5题/天</div>
            </div>
            <div className="bg-heritage-paper/70 rounded-lg p-2 text-center w-1/3 mx-2">
              <div className="text-xs text-heritage-text/70">季赛进行中</div>
              <div className="text-sm font-medium">4天后结束</div>
            </div>
            <div className="bg-heritage-paper/70 rounded-lg p-2 text-center w-1/3">
              <div className="text-xs text-heritage-text/70">排名</div>
              <div className="text-sm font-medium">{totalPoints > 500 ? '前10%' : '未上榜'}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuizCard;
