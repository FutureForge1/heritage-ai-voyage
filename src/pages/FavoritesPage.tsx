
import { useState, useEffect } from "react";
import { Bookmark, Filter, Heart, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface FavoriteItem {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  date: string;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading favorites
    const timer = setTimeout(() => {
      // Mock data
      const mockFavorites = [
        {
          id: "1",
          title: "中国剪纸",
          type: "传统技艺",
          imageUrl: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
          date: "2025-04-15"
        },
        {
          id: "2",
          title: "昆曲",
          type: "传统戏曲",
          imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png",
          date: "2025-04-10"
        },
        {
          id: "3", 
          title: "江南水韵",
          type: "音乐作品",
          imageUrl: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png",
          date: "2025-04-02"
        }
      ];
      
      setFavorites(mockFavorites);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
    
    toast({
      title: "已移除收藏",
      description: "该项目已从收藏夹中移除"
    });
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="我的收藏" 
        showBack={true}
        showNotification={false}
      />
      
      <div className="mx-auto max-w-lg px-4 py-6">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="text-sm">全部</TabsTrigger>
            <TabsTrigger value="heritage" className="text-sm">非遗项目</TabsTrigger>
            <TabsTrigger value="music" className="text-sm">音乐</TabsTrigger>
            <TabsTrigger value="art" className="text-sm">绘画</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-8 h-8 border-2 border-heritage-red border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-heritage-text">加载中...</p>
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-heritage-paper rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark size={24} className="text-heritage-gold/60" />
                </div>
                <h3 className="font-medium mb-1">暂无收藏</h3>
                <p className="text-sm text-gray-500 mb-4">你还没有收藏任何内容</p>
                <Link to="/guide">
                  <Button size="sm" className="bg-heritage-teal hover:bg-heritage-teal/90">
                    去探索非遗
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {favorites.map(item => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex">
                    <div className="w-20 h-20">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.type}</p>
                          <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFavorite(item.id)}
                          className="text-heritage-red p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="heritage">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">展示过滤后的传统非遗项目收藏</p>
            </div>
          </TabsContent>
          
          <TabsContent value="music">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">展示过滤后的音乐作品收藏</p>
            </div>
          </TabsContent>
          
          <TabsContent value="art">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">展示过滤后的绘画作品收藏</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default FavoritesPage;
