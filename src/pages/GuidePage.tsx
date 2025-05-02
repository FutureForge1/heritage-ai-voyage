
import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategoryFilter from "@/components/CategoryFilter";
import HeritageCard from "@/components/HeritageCard";

const GuidePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  
  const categories = ["全部", "传统技艺", "传统艺术", "戏曲", "民俗"];

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
      description: "起源于千年前的传统民间艺术，造型简练生动，蕴含丰富文化内涵",
      imageUrl: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png",
      type: "传统手工艺"
    },
    {
      id: "tea-ceremony",
      title: "茶艺",
      description: "中国传统茶文化的精髓，体现古人对生活的智慧与追求",
      imageUrl: "/lovable-uploads/869dacec-4870-4c67-8576-5ce836083031.png",
      type: "传统技艺"
    },
    {
      id: "shadow-play",
      title: "皮影戏",
      description: "光影交错的艺术，传承千年的皮影技艺",
      imageUrl: "/lovable-uploads/3e372af7-498a-4381-93fd-ceb58fd836e9.png",
      type: "传统艺术"
    },
  ];
  
  // Filter items based on active category
  const filteredItems = activeCategory === "全部" 
    ? heritageItems 
    : heritageItems.filter(item => item.type?.includes(activeCategory.slice(2)));
  
  return (
    <div className="pb-16 min-h-screen paper-bg">
      <Header 
        title="非遗导览" 
        subtitle="探索中国传统文化的瑰宝" 
        gradient={true} 
      />
      
      <main className="px-4 py-4">
        <div className="mb-4">
          <div className="relative">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full border border-heritage-gold/30 px-4 py-2">
              <Search size={18} className="text-heritage-text/50 mr-2" />
              <input 
                type="text" 
                placeholder="搜索非遗项目..." 
                className="flex-1 bg-transparent outline-none text-heritage-text placeholder:text-heritage-text/50"
              />
            </div>
          </div>
        </div>
        
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredItems.map((item) => (
            <HeritageCard key={item.id} {...item} />
          ))}
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default GuidePage;
