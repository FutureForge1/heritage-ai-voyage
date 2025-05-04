
import React, { useState, useEffect } from "react";
import { User, ThumbsUp, MessageCircle, Tag, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategoryFilter from "@/components/CategoryFilter";
import { getAllPosts, getPostsByType } from "@/services/communityService";
import { CommunityPost } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const categories = ["全部", "文化分享", "作品展示", "活动讨论"];
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        let fetchedPosts;
        
        if (activeCategory === "全部") {
          fetchedPosts = await getAllPosts();
        } else {
          // Map frontend categories to backend types
          const typeMap: Record<string, string> = {
            "文化分享": "heritage",
            "作品展示": "art",
            "活动讨论": "discussion",
          };
          
          const type = typeMap[activeCategory] || "heritage";
          fetchedPosts = await getPostsByType(type);
        }
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch community posts:", error);
        toast({
          title: "加载失败",
          description: "无法加载社区内容，请稍后再试。",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [activeCategory, toast]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗社区" 
        subtitle="与志同道合的文化爱好者交流"
        showBack={true}
        showNotification={true}
      />
      
      <div className="px-4 py-4">
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heritage-red"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-600">暂无内容</h3>
            <p className="text-gray-500 mt-2">成为第一个发布内容的用户</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-heritage-gold/10 shadow-sm"
              >
                {/* Author Info */}
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {post.author?.avatar_url ? (
                        <img 
                          src={post.author.avatar_url} 
                          alt={post.author.username || "用户"} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-heritage-paper flex items-center justify-center">
                          <User size={18} className="text-heritage-text/50" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <h3 className="font-medium text-heritage-text">
                        {post.author?.username || "匿名用户"}
                      </h3>
                      {post.created_at && (
                        <p className="text-xs text-heritage-text/60">
                          {formatDate(post.created_at)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <p className="mt-3 text-heritage-text/90">
                    {post.content}
                  </p>
                  
                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className={`mt-3 grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                      {post.images.map((image, index) => (
                        <div 
                          key={index}
                          className={`${
                            post.images && post.images.length === 1 ? 'aspect-video' : 'aspect-square'
                          } overflow-hidden rounded-md`}
                        >
                          <img 
                            src={image.image_url} 
                            alt="Post content" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Post Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tagObj, index) => (
                        <div 
                          key={index} 
                          className="bg-heritage-paper/80 rounded-full px-2 py-1 text-xs flex items-center"
                        >
                          <Tag size={12} className="mr-1 text-heritage-gold" />
                          <span>{tagObj.tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Post Actions */}
                  <div className="mt-4 flex items-center justify-between border-t border-heritage-gold/10 pt-3">
                    <button className="flex items-center text-heritage-text/70 hover:text-heritage-red transition-colors">
                      <ThumbsUp size={18} className="mr-1" />
                      <span className="text-sm">{post.likes_count || 0}</span>
                    </button>
                    
                    <button className="flex items-center text-heritage-text/70 hover:text-heritage-teal transition-colors">
                      <MessageCircle size={18} className="mr-1" />
                      <span className="text-sm">{post.comments_count || 0}</span>
                    </button>
                    
                    <button className="flex items-center text-heritage-text/70 hover:text-heritage-gold transition-colors">
                      <ImageIcon size={18} className="mr-1" />
                      <span className="text-sm">{post.images?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};

export default CommunityPage;
