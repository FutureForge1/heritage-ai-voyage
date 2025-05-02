import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Book, ChevronRight } from "lucide-react";

const ProfilePage = () => {
  const isLoggedIn = false;
  
  return (
    <div className="pb-16 min-h-screen paper-bg">
      <Header 
        title="个人中心" 
        gradient={true} 
        showBack={false}
        showNotification={false}
      />
      
      <main className="px-4 py-4">
        {!isLoggedIn ? (
          <div className="bg-white rounded-xl p-6 shadow-md mb-4 border border-heritage-gold/30">
            <h2 className="text-lg font-semibold mb-2">登录以享受完整功能</h2>
            <Button className="w-full bg-heritage-red hover:bg-heritage-red/90">
              登录
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 shadow-md mb-4 border border-heritage-gold/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <h2 className="text-lg font-semibold">用户名</h2>
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
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md mb-4 overflow-hidden border border-heritage-gold/30">
          <div className="p-4 flex items-center justify-between border-b border-heritage-gold/20">
            <span className="flex items-center gap-2">
              <Book size={18} className="text-heritage-red" />
              关于非遗AI探秘
            </span>
            <ChevronRight size={18} className="text-heritage-text/50" />
          </div>
        </div>
        
        <div className="text-center text-sm text-heritage-text/50 mt-8">
          <p>© 2025 非遗AI探秘</p>
          <div className="mt-1 flex justify-center gap-4">
            <span>隐私政策</span>
            <span>使用条款</span>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default ProfilePage;
