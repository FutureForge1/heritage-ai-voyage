
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Brush, Music, Book, Mic, ChevronRight, ChevronLeft, Award, Users, Trophy } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  
  useEffect(() => {
    // Check login status
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Get quiz points if available
    const storedPoints = sessionStorage.getItem("quizPoints");
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints));
    }
    
    // Auto slide for heritage items
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heritageItems.length);
    }, 5000);
    
    return () => clearInterval(slideTimer);
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
    },
    {
      id: "ceramics",
      title: "景德镇陶瓷",
      description: "千年窑火不息，薪火相传的精美工艺",
      imageUrl: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png",
      type: "传统工艺"
    }
  ];

  const suggestedQuestions = [
    "剪纸有哪些代表作品？",
    "京剧和昆曲有什么区别？",
    "中国剪纸源于何时？"
  ];

  const handleSlideChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentSlide(prev => (prev - 1 + heritageItems.length) % heritageItems.length);
    } else {
      setCurrentSlide(prev => (prev + 1) % heritageItems.length);
    }
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <div className="mx-auto max-w-lg">
        {/* Search box at top */}
        <div className="p-4">
          <div className="flex items-center bg-white rounded-full border border-heritage-gold/30 px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
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
          <div className="bg-white rounded-xl p-3 shadow-sm border border-heritage-gold/10 flex justify-between items-center hover:shadow-md transition-all duration-300">
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
                <button className="brush-btn text-sm transform transition-all hover:scale-110 duration-200">
                  立即登录
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Quiz Feature Card */}
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

        {/* AI Assistant Card */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/20 ancient-scroll hover:shadow-lg transition-all duration-300">
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
              <Button className="w-full bg-heritage-red hover:bg-heritage-red/90 font-kai transform transition-all hover:scale-105 duration-200 shadow hover:shadow-md">
                开始聊天
              </Button>
            </Link>

            <div className="mt-3 flex justify-center">
              <button className="p-2 bg-heritage-teal/10 rounded-full transform transition-all hover:scale-110 duration-200 hover:bg-heritage-teal/20">
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
                  <Link to="/chat" key={idx}>
                    <div className="bg-heritage-paper px-3 py-2 rounded-md text-sm font-kai transition-all hover:bg-heritage-gold/10 hover:translate-x-1 duration-200 cursor-pointer">
                      {question}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Features */}
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
              {heritageItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <div className="bg-heritage-red/80 text-white text-xs px-2 py-1 rounded-full w-fit mb-1">
                      {item.type}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
              onClick={() => handleSlideChange("prev")}
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
              onClick={() => handleSlideChange("next")}
            >
              <ChevronRight className="text-white" size={20} />
            </button>
          </div>
          
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              {heritageItems.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    currentSlide === index ? "bg-heritage-red w-4" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Creative Workshop */}
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
      </div>

      <Navigation />
    </div>
  );
};

// Helper Badge component for use within this file
const Badge = ({ children, className = "" }) => {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
};

export default HomePage;
