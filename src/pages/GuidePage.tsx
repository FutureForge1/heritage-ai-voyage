
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategoryFilter from "@/components/CategoryFilter";
import HeritageCard from "@/components/HeritageCard";
import { HeritageItem } from "@/types/database";
import { getAllHeritageItems, getHeritageItemsByType } from "@/services/heritageService";
import { useToast } from "@/components/ui/use-toast";

const GuidePage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [heritageItems, setHeritageItems] = useState<HeritageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const categories = ["全部", "传统技艺", "传统艺术", "戏曲"];
  
  useEffect(() => {
    const fetchHeritageItems = async () => {
      setIsLoading(true);
      try {
        let items: HeritageItem[];
        
        if (activeCategory === "全部") {
          items = await getAllHeritageItems();
        } else {
          items = await getHeritageItemsByType(activeCategory);
        }
        
        setHeritageItems(items);
      } catch (error) {
        console.error("Failed to fetch heritage items:", error);
        toast({
          title: "加载失败",
          description: "无法加载非遗内容，请稍后再试。",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHeritageItems();
  }, [activeCategory, toast]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // We would implement search functionality here
    toast({
      title: "搜索功能",
      description: `你正在搜索: ${searchQuery}`,
    });
  };
  
  const filteredItems = heritageItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗导览" 
        subtitle="发现和探索中国非物质文化遗产"
        showBack={true}
      />
      
      <div className="px-4 py-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索非遗项目..."
              className="w-full pl-10 pr-4 py-2 border border-heritage-gold/30 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-heritage-gold/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-heritage-gold/50" size={18} />
          </div>
        </form>
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />
        
        {/* Heritage Items Grid */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-red"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-gray-600">没有找到相关内容</h3>
              <p className="text-gray-500 mt-2">请尝试其他搜索词或分类</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <HeritageCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.cover_image || '/placeholder.svg'}
                  type={item.type}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default GuidePage;
