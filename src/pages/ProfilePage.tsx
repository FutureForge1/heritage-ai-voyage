
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight, Settings, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
}

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userDataStr = sessionStorage.getItem("userData");
      if (userDataStr) {
        try {
          const parsedUserData = JSON.parse(userDataStr);
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, []);
  
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("verificationCode");
    setIsLoggedIn(false);
    setUserData(null);
    
    toast({
      title: "已退出登录",
    });
  };
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="个人中心" 
        gradient={true} 
        showBack={false}
        showNotification={false}
      />
      
      <div className="mx-auto max-w-lg px-4 py-4">
        {!isLoggedIn ? (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <h2 className="text-lg font-semibold text-center mb-3">登录以享受完整功能</h2>
            <Button 
              onClick={handleLogin}
              className="w-full bg-heritage-red hover:bg-heritage-red/90">
              登录
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-heritage-teal/10 flex items-center justify-center text-heritage-teal text-2xl font-song">
                {userData?.username?.charAt(0)?.toUpperCase() || '用'}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{userData?.username || "用户"}</h2>
                <p className="text-sm text-heritage-text/70">非遗探索者</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="p-2">
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-heritage-text/70">收藏</p>
              </div>
              <div className="p-2">
                <p className="text-xl font-bold">5</p>
                <p className="text-xs text-heritage-text/70">创作</p>
              </div>
              <div className="p-2">
                <p className="text-xl font-bold">320</p>
                <p className="text-xs text-heritage-text/70">积分</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="w-full border-heritage-gold/20 text-heritage-red"
              >
                <LogOut size={16} className="mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        )}
        
        {/* Settings section */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <Link to="/settings" className="p-4 flex items-center justify-between border-b border-heritage-gold/10">
            <span className="flex items-center gap-2">
              <Settings size={18} className="text-heritage-teal" />
              <span>设置</span>
            </span>
            <ChevronRight size={18} className="text-heritage-text/50" />
          </Link>
          
          <Link to="/about" className="p-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Info size={18} className="text-heritage-red" />
              <span>关于非遗AI探秘</span>
            </span>
            <ChevronRight size={18} className="text-heritage-text/50" />
          </Link>
        </div>
        
        <div className="text-center text-sm text-heritage-text/50 mt-8">
          <p>© 2025 非遗AI探秘</p>
          <div className="mt-1 flex justify-center gap-4">
            <span>隐私政策</span>
            <span>使用条款</span>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default ProfilePage;
