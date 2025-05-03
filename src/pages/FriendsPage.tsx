
import { useState, useEffect } from "react";
import { Search, UserPlus, Check, X, ChevronRight, Users, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastActive?: string;
  badges?: string[];
  quizScore?: number;
}

const FriendsPage = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching friends data
    setFriends([
      {
        id: "friend1",
        name: "文化小达人",
        avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png",
        status: "online",
        lastActive: "刚刚",
        badges: ["非遗达人", "知识王"],
        quizScore: 98
      },
      {
        id: "friend2",
        name: "非遗爱好者",
        avatar: "/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png",
        status: "offline",
        lastActive: "2小时前",
        badges: ["传统音乐"],
        quizScore: 92
      },
      {
        id: "friend3",
        name: "文化保护者",
        avatar: "/lovable-uploads/b2ecc6f9-f820-4bf5-866e-07ea8f1f90a5.png",
        status: "offline",
        lastActive: "1天前",
        badges: ["戏曲爱好者"],
        quizScore: 85
      }
    ]);

    setRequests([
      {
        id: "req1",
        name: "剪纸艺术家",
        avatar: "/lovable-uploads/ca09f43e-a05b-4384-8a25-6b0136b7dcf0.png",
        status: "pending"
      },
      {
        id: "req2",
        name: "文化传承人",
        avatar: "/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png",
        status: "pending"
      }
    ]);

    setSuggestions([
      {
        id: "sug1",
        name: "京剧爱好者",
        avatar: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png",
        status: "suggestion"
      },
      {
        id: "sug2",
        name: "陶艺大师",
        avatar: "/lovable-uploads/c9e5e645-0930-4eed-963c-5ae4a3e97325.png",
        status: "suggestion"
      },
      {
        id: "sug3",
        name: "非遗研究员",
        avatar: "/lovable-uploads/869dacec-4870-4c67-8576-5ce836083031.png",
        status: "suggestion"
      },
      {
        id: "sug4",
        name: "传统音乐家",
        avatar: "/lovable-uploads/3e372af7-498a-4381-93fd-ceb58fd836e9.png",
        status: "suggestion"
      }
    ]);
  }, []);

  const handleAcceptRequest = (id: string) => {
    const request = requests.find(req => req.id === id);
    if (request) {
      setFriends(prev => [...prev, {...request, status: 'online'}]);
      setRequests(prev => prev.filter(req => req.id !== id));
      toast({
        title: "好友请求已接受",
        description: `您已成功添加 ${request.name} 为好友`
      });
    }
  };

  const handleRejectRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    toast({
      title: "已拒绝好友请求"
    });
  };

  const handleAddFriend = (id: string) => {
    const suggestion = suggestions.find(sug => sug.id === id);
    if (suggestion) {
      setSuggestions(prev => prev.filter(sug => sug.id !== id));
      toast({
        title: "好友请求已发送",
        description: `等待 ${suggestion.name} 接受您的请求`
      });
    }
  };

  const handleChat = (friend: Friend) => {
    toast({
      title: "聊天功能",
      description: `与 ${friend.name} 的聊天即将开启`
    });
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header
        title="好友"
        subtitle="结交非遗文化爱好者"
        showBack={true}
        showNotification={true}
      />

      <div className="mx-auto max-w-lg px-4 py-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="搜索好友"
            className="pl-9 bg-white transition-all hover:shadow-md focus:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Friends Tabs */}
        <Tabs defaultValue="friends" className="mb-4">
          <TabsList className="grid grid-cols-3 bg-white shadow-sm p-1">
            <TabsTrigger 
              value="friends" 
              className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all"
            >
              我的好友
            </TabsTrigger>
            <TabsTrigger 
              value="requests" 
              className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all"
            >
              好友请求
              {requests.length > 0 && (
                <span className="ml-1 bg-heritage-gold text-white text-xs px-1.5 rounded-full">
                  {requests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions" 
              className="data-[state=active]:bg-heritage-red data-[state=active]:text-white transition-all"
            >
              推荐好友
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {filteredFriends.length > 0 ? (
              filteredFriends.map(friend => (
                <div 
                  key={friend.id} 
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between transform transition-all hover:shadow-md hover:-translate-y-1 duration-200"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={friend.avatar} 
                          alt={friend.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {friend.status === "online" && (
                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{friend.name}</h4>
                        {friend.quizScore && (
                          <span className="ml-2 text-xs bg-heritage-gold/20 text-heritage-gold px-1.5 py-0.5 rounded-full">
                            {friend.quizScore}分
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {friend.status === "online" ? "在线" : `${friend.lastActive}活跃`}
                      </p>
                      {friend.badges && friend.badges.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {friend.badges.map((badge, idx) => (
                            <span 
                              key={idx} 
                              className="text-xs bg-heritage-paper px-1.5 py-0.5 rounded-full"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-heritage-teal text-heritage-teal hover:bg-heritage-teal/10"
                      onClick={() => handleChat(friend)}
                    >
                      <MessageSquare size={16} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-gray-500">暂无好友或未找到匹配的好友</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {requests.length > 0 ? (
              requests.map(request => (
                <div 
                  key={request.id} 
                  className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between transform transition-all hover:shadow-md hover:-translate-y-1 duration-200"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img 
                        src={request.avatar} 
                        alt={request.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-xs text-gray-500">想添加您为好友</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <X size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-heritage-teal hover:bg-heritage-teal/90"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <Check size={16} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-gray-500">暂无好友请求</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            {suggestions.map(suggestion => (
              <div 
                key={suggestion.id} 
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between transform transition-all hover:shadow-md hover:-translate-y-1 duration-200"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={suggestion.avatar} 
                      alt={suggestion.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{suggestion.name}</h4>
                    <p className="text-xs text-gray-500">推荐好友</p>
                  </div>
                </div>
                
                <Button 
                  size="sm"
                  variant="outline"
                  className="border-heritage-teal text-heritage-teal hover:bg-heritage-teal/10"
                  onClick={() => handleAddFriend(suggestion.id)}
                >
                  <UserPlus size={16} className="mr-1" />
                  添加
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Cultural Circles */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Users size={18} className="mr-2 text-heritage-gold" />
              文化圈子
            </h3>
            <Link to="/circles" className="text-sm text-heritage-teal flex items-center">
              查看全部
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-heritage-red/20 flex items-center justify-center text-heritage-red mr-3">
                  <span className="text-sm font-bold">戏</span>
                </div>
                <span className="font-medium">中国戏曲爱好者</span>
              </div>
              <span className="text-xs text-heritage-gold">128人</span>
            </div>
            
            <div className="flex items-center justify-between p-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-heritage-teal/20 flex items-center justify-center text-heritage-teal mr-3">
                  <span className="text-sm font-bold">陶</span>
                </div>
                <span className="font-medium">传统陶艺探讨</span>
              </div>
              <span className="text-xs text-heritage-gold">95人</span>
            </div>
            
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-gold mr-3">
                  <span className="text-sm font-bold">书</span>
                </div>
                <span className="font-medium">书法与篆刻</span>
              </div>
              <span className="text-xs text-heritage-gold">156人</span>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default FriendsPage;

// Helper component for navigation link
const Link = ({ to, children, className = "" }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};
