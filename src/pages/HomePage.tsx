import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Brush, Music, Book, Mic, ChevronRight, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check login status
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const categories = ["全部", "传统技艺", "传统艺术", "戏曲"];

  // Featured items for the slider
  const heritageItems = [
    {
      id: "chinese-papercut",
      title: "中国剪纸",
      description: "起源于十世纪，是中华文明活力的体现。剪纸是中国各地流行的民间艺术形式。",
      imageUrl: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
      type: "传统手工艺"
    },
    {
      id: "kunqu",
      title: "昆曲",
      description: "被誉为'百戏之祖'的传统表演艺术",
      imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png",
      type: "传统戏曲"
    }
  ];

  const suggestedQuestions = [
    "剪纸有哪些代表作品？",
    "京剧和昆曲有什么区别？",
    "中国剪纸源于何时？"
  ];
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <div className="mx-auto max-w-lg">
        {/* Search box at top */}
        <div className="p-4">
          <div className="flex items-center bg-white rounded-full border border-heritage-gold/30 px-4 py-2">
            <img 
              src="/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png" 
              alt="Logo" 
              className="w-6 h-6 mr-2" 
            />
            <div className="text-xs flex-1">
              <div className="font-bold font-song">成语典故道明松</div>
              <div className="text-gray-500">语言学习三位一体，文化保护多管齐下</div>
            </div>
          </div>
        </div>

        {/* User Welcome or Login */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-heritage-gold/10 flex justify-between items-center">
            <div>
              <h3 className="font-song text-lg">
                {isLoggedIn ? "欢迎回来" : "游客，您好"}
              </h3>
              <p className="text-xs text-gray-500">
                {isLoggedIn ? "继续探索非遗文化" : "登录解锁更多功能"}
              </p>
            </div>
            
            {!isLoggedIn && (
              <Link to="/login">
                <button className="brush-btn text-sm">
                  立即登录
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/20 ancient-scroll">
            <div className="flex flex-col items-center justify-center mb-3">
              <div className="w-16 h-16 rounded-full border-2 border-heritage-gold flex items-center justify-center relative">
                <div className="bg-heritage-paper w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-heritage-gold text-sm font-bold font-kai">AI助手</span>
                </div>
              </div>
              <h3 className="text-lg font-medium mt-2 font-song">学问小学</h3>
              <p className="text-xs text-gray-500">中国传统文化智能顾问</p>
            </div>
            
            <Link to="/chat">
              <Button className="w-full bg-heritage-red hover:bg-heritage-red/90 text-white font-kai">
                开始聊天
              </Button>
            </Link>

            <div className="mt-3 flex justify-center">
              <button className="p-2 bg-heritage-teal/10 rounded-full">
                <Mic className="text-heritage-teal" size={20} />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-heritage-gold rounded-full mr-2"></div>
                <span className="text-sm text-gray-500">常见问题</span>
              </div>
              
              <div className="space-y-2">
                {suggestedQuestions.map((question, idx) => (
                  <div key={idx} className="bg-heritage-paper px-3 py-2 rounded-md text-sm font-kai">
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Experience Card */}
        <div className="px-4 mb-6">
          <div className="bg-black text-white rounded-xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-40">
              <img src="/lovable-uploads/0664a429-2049-44eb-9c19-da7e18f1c963.png" alt="Matrix" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <h3 className="font-bold">西游记元宇宙游戏</h3>
              <p className="text-xs mt-1 mb-3">让更多用户代入传统故事</p>
            </div>
          </div>
        </div>

        {/* Heritage Display */}
        <div className="px-4 mb-6">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 w-5 h-5 bg-heritage-red rounded-full flex items-center justify-center">
              <span className="text-white text-xs">#</span>
            </div>
            <h2 className="text-heritage-text font-bold ml-2">展示专题</h2>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-xl relative h-48">
              <img 
                src="/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png" 
                alt="Chinese Papercut" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">中国剪纸</h3>
                <p className="text-sm text-white/80">起源于古代传统民间艺术，通过巧手，造型美观而充满诗意。</p>
              </div>
            </div>
            
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full">
              <ChevronLeft className="text-white" size={20} />
            </button>
            
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full">
              <ChevronRight className="text-white" size={20} />
            </button>
          </div>
          
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-heritage-red rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Creative Workshop */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-heritage-red font-bold">创意工坊</h2>
            <Link to="/create" className="text-sm text-heritage-teal">查看更多</Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Link to="/create/drawing" className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-heritage-red rounded-lg flex items-center justify-center">
                <Brush className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-medium">AI智能绘画</h3>
              <p className="text-xs text-gray-500 mt-1">用AI创作你的传统艺术</p>
            </Link>
            
            <Link to="/create/music" className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-heritage-teal rounded-lg flex items-center justify-center">
                <Music className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-medium">音乐生成</h3>
              <p className="text-xs text-gray-500 mt-1">创作民乐与古筝旋律</p>
            </Link>
            
            <Link to="/create/story" className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-heritage-gold rounded-lg flex items-center justify-center">
                <Book className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-medium">故事创作</h3>
              <p className="text-xs text-gray-500 mt-1">编写含文化的故事</p>
            </Link>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default HomePage;
