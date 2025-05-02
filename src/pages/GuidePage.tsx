
import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const GuidePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  
  const categories = ["全部", "传统技艺", "传统艺术", "戏曲", "民俗活动"];

  // Heritage items grouped by category
  const heritageItems = [
    {
      id: "chinese-papercut",
      title: "中国剪纸",
      type: "传统技艺",
      imageUrl: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png"
    },
    {
      id: "shadow-puppet",
      title: "皮影戏剧",
      type: "传统技艺",
      imageUrl: "/lovable-uploads/3e372af7-498a-4381-93fd-ceb58fd836e9.png"
    },
    {
      id: "folk-music",
      title: "民间艺术",
      type: "传统艺术",
      imageUrl: "/lovable-uploads/243e2003-d661-4134-b56d-af3d45b92094.png"
    },
    {
      id: "kunqu",
      title: "昆曲艺术",
      type: "戏曲",
      imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png"
    },
    {
      id: "tea-ceremony",
      title: "中国茶艺",
      type: "传统技艺",
      imageUrl: "/lovable-uploads/b2ecc6f9-f820-4bf5-866e-07ea8f1f90a5.png"
    },
    {
      id: "guqin",
      title: "古琴艺术",
      type: "传统艺术",
      imageUrl: "/lovable-uploads/ca09f43e-a05b-4384-8a25-6b0136b7dcf0.png"
    },
    {
      id: "dragon-boat",
      title: "京剧",
      type: "戏曲",
      imageUrl: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png"
    }
  ];

  // Featured item
  const featuredItem = {
    id: "heritage-featured",
    title: "传承千年智慧",
    subtitle: "每一块非遗都是中华文明活化石",
    imageUrl: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
  };

  // Filter items based on active category
  const filteredItems = activeCategory === "全部" 
    ? heritageItems 
    : heritageItems.filter(item => item.type === activeCategory);
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗导览" 
        subtitle="探索中国传统文化的瑰宝" 
        gradient={true} 
        showBack={false}
      />
      
      <div className="mx-auto max-w-lg">
        <div className="px-4 py-2">
          <div className="relative mb-4">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full border border-heritage-gold/30 px-4 py-2">
              <Search size={18} className="text-heritage-text/50 mr-2" />
              <input 
                type="text" 
                placeholder="搜索非遗项目..." 
                className="flex-1 bg-transparent outline-none text-heritage-text placeholder:text-heritage-text/50"
              />
            </div>
          </div>
          
          {/* Featured Heritage Item */}
          <div className="mb-6 relative h-48 rounded-xl overflow-hidden">
            <img 
              src={featuredItem.imageUrl} 
              alt={featuredItem.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h2 className="text-2xl font-bold text-white">{featuredItem.title}</h2>
              <p className="text-sm text-white/80">{featuredItem.subtitle}</p>
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-4 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-heritage-red text-white"
                      : "bg-white text-heritage-text border border-heritage-gold/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Heritage Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <Link to={`/guide/${item.id}`} key={item.id} className="rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="h-32 relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-medium text-sm">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default GuidePage;
