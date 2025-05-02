
import { Link } from "react-router-dom";
import { Brush, Music, Book, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const CreatePage = () => {  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-heritage-red to-heritage-teal text-white p-6 text-center">
        <h1 className="text-2xl font-bold font-song">创意工坊</h1>
        <p className="text-sm mt-1">用AI激发传统文化的创意灵感</p>
      </div>
      
      <div className="mx-auto max-w-lg px-4 py-6">
        {/* Creative Tools */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link to="/create/drawing" className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4 ancient-scroll">
            <div className="w-14 h-14 rounded-lg bg-heritage-red flex items-center justify-center">
              <Brush className="text-white" size={30} />
            </div>
            <div>
              <h3 className="text-lg font-medium font-song">AI智能绘画</h3>
              <p className="text-sm text-gray-500">使用AI创作传统风格绘画作品</p>
            </div>
          </Link>
          
          <Link to="/create/music" className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4 ancient-scroll">
            <div className="w-14 h-14 rounded-lg bg-heritage-teal flex items-center justify-center">
              <Music className="text-white" size={30} />
            </div>
            <div>
              <h3 className="text-lg font-medium font-song">音乐生成</h3>
              <p className="text-sm text-gray-500">创作带有传统元素的旋律作品</p>
            </div>
          </Link>
          
          <Link to="/create/story" className="bg-white p-5 rounded-lg shadow-sm flex items-center gap-4 ancient-scroll">
            <div className="w-14 h-14 rounded-lg bg-heritage-gold flex items-center justify-center">
              <Book className="text-white" size={30} />
            </div>
            <div>
              <h3 className="text-lg font-medium font-song">故事创作</h3>
              <p className="text-sm text-gray-500">AI与你共创富含文化元素的故事</p>
            </div>
          </Link>
        </div>
        
        {/* Feature Box */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-8 ancient-scroll">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-heritage-gold">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-medium font-song">故事创作工具升级</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4 font-kai">成为上古英雄的继承者，体验历史的重要性和精彩故事，AI为你创作奇妙的文字作品。</p>
        </div>

        {/* Creation Gallery */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 font-song">创作灵感</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-heritage-paper"></div>
              <div className="p-2">
                <h3 className="font-medium">创作示例1</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-heritage-paper"></div>
              <div className="p-2">
                <h3 className="font-medium">创作示例2</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-heritage-paper"></div>
              <div className="p-2">
                <h3 className="font-medium">创作示例3</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-heritage-paper"></div>
              <div className="p-2">
                <h3 className="font-medium">创作示例4</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CreatePage;
