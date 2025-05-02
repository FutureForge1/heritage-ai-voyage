
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="pb-16 min-h-screen paper-bg">
      <Header simplified={true} />
      
      <main className="px-4 py-2">
        {/* Welcome Banner */}
        <div className="my-4 rounded-xl overflow-hidden border border-heritage-red/30 bg-white">
          <div className="flex p-3">
            <div className="w-20 h-20 mr-3">
              <div className="grid grid-cols-2 gap-1 h-full">
                <img src="/lovable-uploads/31cdab05-e6d8-4e5c-ba4a-542d6f409335.png" alt="非遗文化" className="object-cover h-full rounded-md" />
                <img src="/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png" alt="非遗文化" className="object-cover h-full rounded-md" />
                <img src="/lovable-uploads/872d313c-206d-42ef-9521-8793ba6f5366.png" alt="非遗文化" className="object-cover h-full rounded-md" />
                <img src="/lovable-uploads/869dacec-4870-4c67-8576-5ce836083031.png" alt="非遗文化" className="object-cover h-full rounded-md" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-heritage-red mb-1">欢迎来到非遗AI探秘</h2>
              <p className="text-sm text-heritage-text/70">探索中华文化瑰宝，发现传统艺术魅力</p>
            </div>
          </div>
        </div>
        
        {/* AI Assistant */}
        <div className="mt-8 mb-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full border-4 border-heritage-gold/50 flex items-center justify-center mb-4 bg-white shadow-sm">
            <span className="text-heritage-text/50 text-lg">AI助手</span>
          </div>
          
          <h2 className="text-2xl font-semibold chinese-title text-heritage-red mb-1">学问大师</h2>
          <p className="text-sm text-heritage-text/70 mb-4">中国非遗文化智能向导</p>
          
          <Link to="/chat" className="w-full">
            <button className="w-full rounded-full py-3 px-4 bg-heritage-red text-white flex items-center justify-center gap-2 shadow-md">
              <span className="text-xl">开始对话</span>
            </button>
          </Link>
          
          <button className="mt-4 w-16 h-16 rounded-full bg-heritage-teal flex items-center justify-center shadow-md">
            <Mic size={32} className="text-white" />
          </button>
        </div>
        
        {/* Frequently Asked Questions */}
        <div className="mt-6 flex items-center">
          <div className="mr-2 text-heritage-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <p className="text-heritage-text/70">热门问题</p>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default HomePage;
