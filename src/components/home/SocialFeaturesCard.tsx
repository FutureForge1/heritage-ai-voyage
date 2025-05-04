
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

const SocialFeaturesCard = () => {
  return (
    <div className="px-4 mb-4">
      <div className="grid grid-cols-2 gap-3">
        <Link to="/community">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-heritage-gold/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-heritage-red/10 flex items-center justify-center text-heritage-red mb-2">
              <Users size={20} />
            </div>
            <h3 className="font-medium mb-1">非遗社区</h3>
            <p className="text-xs text-gray-500">与志同道合的文化爱好者交流</p>
          </div>
        </Link>
        
        <Link to="/friends">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-heritage-gold/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-heritage-teal/10 flex items-center justify-center text-heritage-teal mb-2">
              <Users size={20} />
            </div>
            <h3 className="font-medium mb-1">文化好友</h3>
            <p className="text-xs text-gray-500">添加好友，共同传承非遗文化</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialFeaturesCard;
