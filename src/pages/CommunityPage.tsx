
import { useState, useEffect } from "react";
import { 
  Heart, MessageSquare, Share2, Image, Smile, Plus, 
  User, Search, Filter, Award, Clock, ThumbsUp
} from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  time: string;
  isLiked?: boolean;
  tags?: string[];
  type: 'heritage' | 'story' | 'art' | 'music';
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState<Post['type']>("heritage");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Simulate loading posts
    setTimeout(() => {
      const mockPosts = [
        {
          id: "p1",
          author: {
            name: "文化爱好者",
            avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png"
          },
          content: "今天参观了苏州的非遗展览，被精美的苏绣深深吸引。这些作品不仅仅是手工艺品，更是文化的传承和匠人精神的体现。希望更多人能了解并爱上这些传统艺术！",
          images: ["/lovable-uploads/37e2831f-4bf1-4005-b78f-3f5ee4ea8d5f.png"],
          likes: 24,
          comments: 5,
          time: "1小时前",
          tags: ["苏绣", "非遗展览"],
          type: "heritage"
        },
        {
          id: "p2",
          author: {
            name: "传统手艺人"
          },
          content: "用AI创作了一幅水墨画风格的作品，尝试将传统与科技结合。虽然AI不能替代手工艺人的匠心，但可以作为传统文化传播的新渠道。大家觉得怎么样？",
          images: ["/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png"],
          likes: 18,
          comments: 7,
          time: "3小时前",
          tags: ["AI创作", "水墨画"],
          type: "art"
        },
        {
          id: "p3",
          author: {
            name: "非遗守护者",
            avatar: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png"
          },
          content: "分享一则关于剪纸历史的小故事：剪纸最早可以追溯到汉代，当时人们用金箔剪成各种形状贴在头发上作为装饰。随着造纸术的发展，剪纸艺术才真正繁荣起来。每个时代的剪纸都反映了当时的社会生活和人们的审美观念。",
          likes: 32,
          comments: 9,
          time: "5小时前",
          tags: ["剪纸历史", "文化传承"],
          type: "story"
        }
      ];
      
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };
  
  const handleSharePost = (postId: string) => {
    toast({
      title: "分享成功",
      description: "内容已复制，可以分享给朋友了"
    });
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "发布失败",
        description: "请输入内容后再发布",
        variant: "destructive"
      });
      return;
    }
    
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: {
        name: "我"
      },
      content: newPostContent,
      likes: 0,
      comments: 0,
      time: "刚刚",
      type: newPostType,
      tags: [],
      isLiked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsDialogOpen(false);
    
    toast({
      title: "发布成功",
      description: "你的内容已发布到社区"
    });
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="非遗社区" 
        subtitle="分享你的非遗见闻与创作"
        showBack={false}
        showNotification={true}
      />
      
      <div className="mx-auto max-w-lg px-4 py-4">
        {/* Search and filters */}
        <div className="mb-4 flex items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索社区内容..." 
              className="w-full pl-10 pr-3 py-2 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:border-heritage-gold/50"
            />
          </div>
          <button className="ml-2 p-2 bg-white rounded-full border border-gray-200">
            <Filter size={18} />
          </button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all" className="text-sm">全部</TabsTrigger>
            <TabsTrigger value="heritage" className="text-sm">非遗</TabsTrigger>
            <TabsTrigger value="story" className="text-sm">故事</TabsTrigger>
            <TabsTrigger value="art" className="text-sm">绘画</TabsTrigger>
            <TabsTrigger value="music" className="text-sm">音乐</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {/* Create post button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-heritage-gold hover:bg-heritage-gold/90 mb-4">
                  <Plus size={18} className="mr-2" /> 发布内容
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>发布内容</DialogTitle>
                </DialogHeader>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="分享你的非遗见闻、想法或创作..."
                  className="w-full h-32 p-3 border border-heritage-gold/30 rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-heritage-gold"
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">内容类型</label>
                  <select 
                    value={newPostType}
                    onChange={(e) => setNewPostType(e.target.value as Post['type'])}
                    className="w-full p-2 border border-heritage-gold/30 rounded-lg focus:outline-none"
                  >
                    <option value="heritage">非遗知识</option>
                    <option value="story">传统故事</option>
                    <option value="art">艺术作品</option>
                    <option value="music">传统音乐</option>
                  </select>
                </div>
                
                <div className="flex mb-4">
                  <button className="flex items-center justify-center p-2 border border-dashed border-heritage-gold/30 rounded-lg mr-2">
                    <Image size={20} className="text-heritage-gold" />
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitPost}
                    className="bg-heritage-red hover:bg-heritage-red/90"
                  >
                    发布
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Posts */}
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-10 h-10 border-4 border-heritage-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm text-gray-500">加载中...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3">
                        {post.author.avatar ? (
                          <AvatarImage src={post.author.avatar} />
                        ) : null}
                        <AvatarFallback className="bg-heritage-teal/20 text-heritage-teal">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.time}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-xs px-2 py-1 bg-heritage-paper text-heritage-text rounded-full">
                          {post.type === "heritage" && "非遗知识"}
                          {post.type === "story" && "传统故事"}
                          {post.type === "art" && "艺术作品"}
                          {post.type === "music" && "传统音乐"}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{post.content}</p>
                    
                    {post.images && post.images.length > 0 && (
                      <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mb-3`}>
                        {post.images.map((img, index) => (
                          <div key={index} className="rounded-lg overflow-hidden">
                            <img src={img} alt={`Post image ${index + 1}`} className="w-full h-40 object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-heritage-gold/10 text-heritage-gold rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center text-sm ${post.isLiked ? 'text-heritage-red' : 'text-gray-500'}`}
                      >
                        <Heart size={16} className={`mr-1 ${post.isLiked ? 'fill-heritage-red' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center text-sm text-gray-500">
                        <MessageSquare size={16} className="mr-1" />
                        <span>{post.comments}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleSharePost(post.id)}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="heritage" className="mt-4">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">过滤显示非遗知识相关的内容</p>
            </div>
          </TabsContent>
          
          <TabsContent value="story" className="mt-4">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">过滤显示传统故事相关的内容</p>
            </div>
          </TabsContent>
          
          <TabsContent value="art" className="mt-4">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">过滤显示艺术作品相关的内容</p>
            </div>
          </TabsContent>
          
          <TabsContent value="music" className="mt-4">
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">过滤显示传统音乐相关的内容</p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Community stats */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-medium mb-3">社区数据</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 text-center">
              <div className="flex items-center justify-center mb-2">
                <User size={20} className="text-heritage-gold" />
              </div>
              <p className="text-xl font-bold">142</p>
              <p className="text-xs text-gray-500">活跃用户</p>
            </div>
            <div className="p-2 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award size={20} className="text-heritage-red" />
              </div>
              <p className="text-xl font-bold">58</p>
              <p className="text-xs text-gray-500">非遗传承人</p>
            </div>
            <div className="p-2 text-center">
              <div className="flex items-center justify-center mb-2">
                <ThumbsUp size={20} className="text-heritage-teal" />
              </div>
              <p className="text-xl font-bold">1250</p>
              <p className="text-xs text-gray-500">分享点赞</p>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CommunityPage;
