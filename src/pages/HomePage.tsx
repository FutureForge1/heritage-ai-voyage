
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Brush, Music, Book } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeritageCard from "@/components/HeritageCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  
  const categories = ["全部", "传统技艺", "传统艺术", "戏曲"];

  // Simulated featured heritage item
  const featuredItem = {
    id: "featured-1",
    title: "传承千年智慧",
    description: "每一项非遗都是中华文明的活化石",
    imageUrl: "/lovable-uploads/c9e5e645-0930-4eed-963c-5ae4a3e97325.png"
  };

  // Simulated heritage items
  const heritageItems = [
    {
      id: "kunqu",
      title: "昆曲艺术",
      description: "被誉为'百戏之祖'的传统表演艺术",
      imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png",
      type: "传统戏曲"
    },
    {
      id: "paper-cutting",
      title: "中国剪纸",
      description: "起源千年的传统民间艺术，造型简练生动，蕴含丰富文化内涵",
      imageUrl: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png",
      type: "传统手工艺"
    }
  ];
  
  return (
    <div className="pb-16 min-h-screen paper-bg">
      <Header />
      
      <main className="px-4 py-2">
        {/* Search box */}
        <div className="relative mb-4">
          <div className="flex items-center bg-white rounded-full border border-heritage-gold/30 px-4 py-2">
            <Search size={18} className="text-heritage-text/50 mr-2" />
            <input 
              type="text" 
              placeholder="搜索非遗项目..." 
              className="flex-1 bg-transparent outline-none text-heritage-text placeholder:text-heritage-text/50"
            />
          </div>
        </div>
        
        {/* Categories */}
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        {/* Featured item */}
        <div className="my-4">
          <HeritageCard {...featuredItem} />
        </div>
        
        {/* AI Assistant */}
        <Link to="/chat">
          <div className="my-4 bg-white rounded-xl border border-heritage-gold/30 p-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-heritage-paper border-2 border-heritage-gold flex items-center justify-center">
                <span className="text-heritage-text font-semibold">AI助手</span>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">学问大师</h3>
                <p className="text-sm text-heritage-text/70 mb-2">中国非遗文化智能向导</p>
                <Button className="bg-heritage-red hover:bg-heritage-red/90 text-white">
                  开始对话
                </Button>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Virtual tour section */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold chinese-title">虚拟导览</h2>
            <Link to="/guide" className="text-sm text-heritage-red">查看全部</Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {heritageItems.map((item) => (
              <HeritageCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        
        {/* Creative workshop section */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold chinese-title">创意工坊</h2>
            <Link to="/create" className="text-sm text-heritage-red">查看全部</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <div className="w-12 h-12 rounded-lg bg-heritage-red flex items-center justify-center mb-2">
                <Brush className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">AI绘画</h3>
              <p className="text-xs text-heritage-text/70">用AI创造传统风格画作</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <div className="w-12 h-12 rounded-lg bg-heritage-teal flex items-center justify-center mb-2">
                <Music className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">音乐生成</h3>
              <p className="text-xs text-heritage-text/70">创作传统音乐旋律</p>
            </div>
            
            <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <div className="w-12 h-12 rounded-lg bg-heritage-gold flex items-center justify-center mb-2">
                <Book className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">故事创作</h3>
              <p className="text-xs text-heritage-text/70">与AI一起编写富有传统文化的故事</p>
            </div>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default HomePage;
