
import { Link } from "react-router-dom";
import { Brush, Music, Book } from "lucide-react";

const CreativeWorkshop = () => {
  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-heritage-red font-bold">创意工坊</h2>
        <Link to="/create" className="text-sm text-heritage-teal hover:underline transition-all">查看更多</Link>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Link to="/create/drawing">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-2 bg-heritage-red rounded-lg flex items-center justify-center">
              <Brush className="text-white" size={24} />
            </div>
            <h3 className="text-sm font-medium">AI智能绘画</h3>
            <p className="text-xs text-gray-500 mt-1">用AI创作你的传统艺术</p>
          </div>
        </Link>
        
        <Link to="/create/music">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-2 bg-heritage-teal rounded-lg flex items-center justify-center">
              <Music className="text-white" size={24} />
            </div>
            <h3 className="text-sm font-medium">音乐生成</h3>
            <p className="text-xs text-gray-500 mt-1">创作民乐与古筝旋律</p>
          </div>
        </Link>
        
        <Link to="/create/story">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-2 bg-heritage-gold rounded-lg flex items-center justify-center">
              <Book className="text-white" size={24} />
            </div>
            <h3 className="text-sm font-medium">故事创作</h3>
            <p className="text-xs text-gray-500 mt-1">编写含文化的故事</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreativeWorkshop;
