
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MessageCircle, Heart, Share2, Search, Plus, Users } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Author {
  name: string;
  avatar?: string;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  time: string;
  tags: string[];
  type: "heritage" | "story" | "art" | "music";
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Fetch sample posts
    setPosts([
      {
        id: "post1",
        author: {
          name: "非遗爱好者",
          avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png"
        },
        content: "向大家分享我最近了解到的剪纸艺术，这些传统的剪纸作品蕴含着丰富的文化意义，每一刀都饱含匠人的心血。",
        images: ["/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png"],
        likes: 42,
        comments: 15,
        time: "3小时前",
        tags: ["剪纸", "非物质文化遗产"],
        type: "heritage"
      },
      {
        id: "post2",
        author: {
          name: "AI画匠"
        },
        content: "今天用AI创作了一副京剧脸谱，大家看看效果如何？试图捕捉传统与现代的结合点。",
        images: ["/lovable-uploads/ca09f43e-a05b-4384-8a25-6b0136b7dcf0.png"],
        likes: 87,
        comments: 22,
        time: "昨天",
        tags: ["AI创作", "京剧"],
        type: "art"
      },
      {
        id: "post3",
        author: {
          name: "文化传承人",
          avatar: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png"
        },
        content: "分享一段我创作的古筝曲，灵感来源于民间传说《牛郎织女》，希望大家喜欢！",
        images: [],
        likes: 56,
        comments: 8,
        time: "2天前",
        tags: ["音乐创作", "古筝"],
        type: "music"
      }
    ]);
  }, []);
  
  const filterPosts = (type: string) => {
    if (type === "all") return posts;
    return posts.filter(post => post.type === type);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗社区" 
        subtitle="分享发现，共同传承"
        showBack={true}
        showNotification={true}
      />
      
      <div className="mx-auto max-w-lg px-4 py-4">
        {/* Search and New Post */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 mr-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="搜索社区内容" 
              className="pl-9 bg-white transition-all hover:shadow-md focus:shadow-md"
            />
          </div>
          
          <Link to="/community/new">
            <Button className="bg-heritage-red hover:bg-heritage-red/90 transition-all hover:shadow-md transform hover:-translate-y-1 hover:scale-105 duration-200">
              <Plus size={18} className="mr-1" />
              发布
            </Button>
          </Link>
        </div>
        
        {/* Friend suggestions */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Users size={18} className="mr-2 text-heritage-gold" />
              推荐好友
            </h3>
            <Link to="/friends" className="text-sm text-heritage-teal">查看更多</Link>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
            {[1, 2, 3, 4].map((friend) => (
              <div key={friend} className="flex-shrink-0 w-16 text-center transition-transform hover:-translate-y-1 duration-200">
                <div className="w-12 h-12 rounded-full bg-heritage-gold/20 mx-auto mb-1 overflow-hidden">
                  <img 
                    src={`/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs truncate">文化爱好者{friend}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="all" className="mb-4" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 bg-white shadow-sm p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all">全部</TabsTrigger>
            <TabsTrigger value="heritage" className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all">非遗</TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all">故事</TabsTrigger>
            <TabsTrigger value="art" className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all">创作</TabsTrigger>
          </TabsList>
          
          {["all", "heritage", "story", "art"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterPosts(tab).length > 0 ? (
                filterPosts(tab).map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm p-4 transition-all hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-heritage-gold/20 mr-3 overflow-hidden">
                        {post.author.avatar ? (
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-heritage-gold font-bold">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{post.author.name}</h4>
                        <p className="text-xs text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    
                    <p className="mb-3">{post.content}</p>
                    
                    {post.images.length > 0 && (
                      <div className="mb-3">
                        <img 
                          src={post.images[0]} 
                          alt="Post media" 
                          className="w-full rounded-lg h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-heritage-paper border-heritage-gold/20 text-heritage-text">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <button className="flex items-center text-gray-500 hover:text-heritage-red transition-colors">
                        <Heart size={18} className="mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center text-gray-500 hover:text-heritage-teal transition-colors">
                        <MessageCircle size={18} className="mr-1" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center text-gray-500 hover:text-heritage-gold transition-colors">
                        <Share2 size={18} className="mr-1" />
                        <span className="text-sm">分享</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-6 text-center">
                  <p className="text-gray-500">暂无相关内容</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CommunityPage;
