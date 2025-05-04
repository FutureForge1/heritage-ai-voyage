
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Share2, Info, User, Video } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHeritageItemById } from "@/services/heritageService";
import { HeritageItem, HeritageImage, HeritageRepresentative, HeritageVideo } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const HeritageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [heritageItem, setHeritageItem] = useState<HeritageItem | null>(null);
  const [images, setImages] = useState<HeritageImage[]>([]);
  const [representatives, setRepresentatives] = useState<HeritageRepresentative[]>([]);
  const [videos, setVideos] = useState<HeritageVideo[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHeritageDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { item, images, representatives, videos } = await getHeritageItemById(id);
        
        if (item) {
          setHeritageItem(item);
          setImages([{ id: 'main', heritage_id: id, image_url: item.cover_image || '' }, ...images]);
          setRepresentatives(representatives);
          setVideos(videos);
          
          // Check if this item is in favorites (from localStorage)
          const favorites = JSON.parse(localStorage.getItem('heritageItemFavorites') || '[]');
          setIsFavorite(favorites.includes(id));
        }
      } catch (error) {
        console.error("Failed to fetch heritage details:", error);
        toast({
          title: "加载失败",
          description: "无法加载非遗详情，请稍后再试。",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHeritageDetails();
  }, [id, toast]);

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % images.length);
  };
  
  const toggleFavorite = () => {
    if (!id) return;
    
    const favorites = JSON.parse(localStorage.getItem('heritageItemFavorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((itemId: string) => itemId !== id);
      toast({
        title: "已移除收藏",
        description: `${heritageItem?.title} 已从收藏中移除`
      });
    } else {
      updatedFavorites = [...favorites, id];
      toast({
        title: "收藏成功",
        description: `已添加 ${heritageItem?.title} 到收藏`
      });
    }
    
    localStorage.setItem('heritageItemFavorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };
  
  const handleShare = () => {
    if (navigator.share && heritageItem) {
      navigator.share({
        title: heritageItem.title,
        text: heritageItem.description,
        url: window.location.href
      }).catch((error) => console.error("Sharing failed:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "链接已复制",
        description: "已复制分享链接到剪贴板"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pb-20 min-h-screen bg-heritage-cream">
        <Header title="非遗详情" showBack={true} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-red"></div>
        </div>
        <Navigation />
      </div>
    );
  }

  if (!heritageItem) {
    return (
      <div className="pb-20 min-h-screen bg-heritage-cream">
        <Header title="非遗详情" showBack={true} />
        <div className="flex flex-col justify-center items-center h-64 px-4 text-center">
          <h2 className="text-xl font-bold text-heritage-text mb-2">内容未找到</h2>
          <p className="text-heritage-text/70 mb-4">找不到所请求的非遗项目，它可能已被移除或不存在。</p>
          <Link to="/guide" className="px-4 py-2 bg-heritage-red text-white rounded-md hover:bg-heritage-red/80 transition-colors">
            返回导览页
          </Link>
        </div>
        <Navigation />
      </div>
    );
  }

  const activeImage = images[activeImageIndex]?.image_url || heritageItem.cover_image || '/placeholder.svg';

  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title={heritageItem.title} 
        subtitle={heritageItem.subtitle || ""}
        showBack={true}
      />
      
      <div className="relative">
        {/* Hero Image with Controls */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={activeImage} 
            alt={heritageItem.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-heritage-red/80 text-white text-xs px-2 py-1 rounded-full w-fit mb-1">
                {heritageItem.type}
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{heritageItem.title}</h1>
              <p className="text-white/90 text-sm line-clamp-2">{heritageItem.description}</p>
            </div>
          </div>
          
          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
              >
                <ChevronLeft className="text-white" size={20} />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
              >
                <ChevronRight className="text-white" size={20} />
              </button>
            </>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-0 right-4 -mb-5 flex space-x-2">
          <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full shadow-md ${
              isFavorite ? 'bg-heritage-red text-white' : 'bg-white text-heritage-red'
            }`}
          >
            <Heart size={20} fill={isFavorite ? "white" : "none"} />
          </button>
          
          <button 
            onClick={handleShare}
            className="p-2 bg-white rounded-full shadow-md text-heritage-teal"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
      
      {/* Status Badge */}
      {heritageItem.status && (
        <div className="px-4 mt-6">
          <div className="bg-heritage-gold/10 border border-heritage-gold/30 rounded-md px-3 py-2 text-sm flex items-center">
            <Info size={16} className="text-heritage-gold mr-2" />
            <span className="text-heritage-text font-medium">{heritageItem.status}</span>
          </div>
        </div>
      )}
      
      {/* Content Tabs */}
      <div className="px-4 mt-4">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-3 bg-heritage-paper">
            <TabsTrigger value="details" className="font-kai">详情</TabsTrigger>
            <TabsTrigger value="people" className="font-kai">传承人</TabsTrigger>
            <TabsTrigger value="videos" className="font-kai">视频</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <section>
                <h2 className="font-semibold text-lg mb-2 border-l-4 border-heritage-red pl-2">简介</h2>
                <p className="text-heritage-text/80 leading-relaxed">
                  {heritageItem.long_description || heritageItem.description}
                </p>
              </section>
              
              {heritageItem.history && (
                <section>
                  <h2 className="font-semibold text-lg mb-2 border-l-4 border-heritage-red pl-2">历史渊源</h2>
                  <p className="text-heritage-text/80 leading-relaxed">
                    {heritageItem.history}
                  </p>
                </section>
              )}
              
              {heritageItem.regions && heritageItem.regions.length > 0 && (
                <section>
                  <h2 className="font-semibold text-lg mb-2 border-l-4 border-heritage-red pl-2">流行区域</h2>
                  <div className="flex flex-wrap gap-2">
                    {heritageItem.regions.map((region, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-heritage-paper rounded-full text-sm text-heritage-text"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Image Gallery Preview */}
              {images.length > 1 && (
                <section>
                  <h2 className="font-semibold text-lg mb-2 border-l-4 border-heritage-red pl-2">图片集</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {images.slice(0, 6).map((image, index) => (
                      <div 
                        key={index} 
                        className="aspect-square overflow-hidden rounded-md"
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={image.image_url} 
                          alt={`${heritageItem.title} 图片 ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="people" className="mt-6">
            {representatives.length > 0 ? (
              <div className="space-y-4">
                {representatives.map((person, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-heritage-gold/10"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {person.image_url ? (
                            <img 
                              src={person.image_url} 
                              alt={person.name} 
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-heritage-paper flex items-center justify-center">
                              <User size={24} className="text-heritage-text/50" />
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4">
                          <h3 className="font-bold">{person.name}</h3>
                          {person.title && (
                            <p className="text-sm text-heritage-text/70">{person.title}</p>
                          )}
                        </div>
                      </div>
                      
                      {person.description && (
                        <p className="mt-3 text-heritage-text/80 text-sm">
                          {person.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User size={40} className="mx-auto text-heritage-text/30 mb-2" />
                <h3 className="text-lg font-medium text-heritage-text/70">暂无传承人信息</h3>
                <p className="text-sm text-heritage-text/50">我们正在努力收集相关资料</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            {videos.length > 0 ? (
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-heritage-gold/10"
                  >
                    <div className="relative aspect-video">
                      <img 
                        src={video.thumbnail || activeImage} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-heritage-red flex items-center justify-center">
                            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium">{video.title}</h3>
                      {video.description && (
                        <p className="mt-1 text-sm text-heritage-text/70">{video.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Video size={40} className="mx-auto text-heritage-text/30 mb-2" />
                <h3 className="text-lg font-medium text-heritage-text/70">暂无视频</h3>
                <p className="text-sm text-heritage-text/50">我们正在努力收集相关视频资料</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default HeritageDetailPage;
