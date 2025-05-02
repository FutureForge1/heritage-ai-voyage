
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Share2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";

const HeritageDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("介绍");
  
  // Mock data based on ID
  const heritageData = {
    id: "chinese-papercut",
    title: "中国剪纸",
    subtitle: "传统技艺",
    coverImage: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
    description: "剪纸是中国最古老的民间艺术之一，起源于汉代，盛于宋代，至今已有1500多年历史。已被联合国教科文组织列出濒危非物质文化遗产，纳入了紧急保护名录，以反映剪纸扎根在中国家庭的日常生活中。",
    longDescription: "中国剪纸是一种用剪刀或刻刀在纸上剪刻花纹图样的手工艺术，联合国教科文组织将其列入"人类非物质文化遗产代表作名录"。剪纸艺术在中国各地区有不同风格：北方剪纸粗犷豪放、南方剪纸则精致细腻，色彩多样。常见题材包括花鸟虫鱼、人物故事等。剪纸不仅是装饰艺术，更承载着人们对美好生活的向往和祝福。",
    images: [
      "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
      "/lovable-uploads/37e2831f-4bf1-4005-b78f-3f5ee4ea8d5f.png",
      "/lovable-uploads/53fe4d74-e773-401e-917b-bf78af4f5728.png",
    ],
    video: {
      url: "https://example.com/video.mp4",
      thumbnail: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
      title: "中国剪纸技艺展示",
      description: "这段视频展示了中国剪纸的制作工艺和技法，感受非物质文化遗产的魅力。"
    },
    representatives: [
      {
        name: "王静辉",
        title: "国家级非物质文化遗产代表性传承人"
      }
    ],
    regions: ["陕西", "山东", "江苏等全国各地"],
    history: "始于汉代，盛于唐代，明清时期达到鼎盛",
    status: "国家级非物质文化遗产",
    relatedItems: [
      {
        id: "shadow-puppet",
        title: "皮影戏",
        type: "传统技艺",
        imageUrl: "/lovable-uploads/3e372af7-498a-4381-93fd-ceb58fd836e9.png"
      },
      {
        id: "folk-art",
        title: "民间艺术",
        type: "传统艺术",
        imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png"
      }
    ]
  };

  const tabs = ["介绍", "视频", "资料"];

  return (
    <div className="pb-6 min-h-screen bg-heritage-cream">
      {/* Header with background image */}
      <div className="relative h-64">
        <img 
          src={heritageData.coverImage} 
          alt={heritageData.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <Link to="/guide" className="p-2 rounded-full bg-white/20 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
            
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-white/20 text-white">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full bg-white/20 text-white">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold mb-1">{heritageData.title}</h1>
          <p className="text-sm">{heritageData.subtitle}</p>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center ${
                activeTab === tab 
                  ? 'text-heritage-red border-b-2 border-heritage-red font-medium' 
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {/* Introduction Tab */}
        {activeTab === "介绍" && (
          <div>
            <p className="text-sm leading-6 mb-6">
              {heritageData.longDescription}
            </p>
            
            {/* Images Gallery */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {heritageData.images.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-20 h-20 border border-heritage-gold/30 rounded-lg overflow-hidden">
                  <img src={img} alt={`${heritageData.title} ${index+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Related Items */}
            <div className="mt-6">
              <h3 className="flex items-center mb-2">
                <span className="w-1 h-4 bg-heritage-teal mr-2"></span>
                <span className="font-medium">相关推荐</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {heritageData.relatedItems.map(item => (
                  <Link key={item.id} to={`/guide/${item.id}`} className="bg-gray-100 rounded-lg overflow-hidden">
                    <div className="h-24 relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-xs text-white/80">{item.type}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Tab */}
        {activeTab === "视频" && (
          <div>
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              <div className="text-white">视频播放区</div>
            </div>
            <h3 className="font-medium mb-1">{heritageData.video.title}</h3>
            <p className="text-sm text-gray-600">{heritageData.video.description}</p>
          </div>
        )}

        {/* Resource Tab */}
        {activeTab === "资料" && (
          <div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-bold mb-4">基本资料</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">代表性传承人</p>
                  <p className="font-medium">
                    {heritageData.representatives.map(person => person.name).join('、')}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">主要分布地区</p>
                  <p className="font-medium">{heritageData.regions}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">历史渊源</p>
                  <p className="font-medium">{heritageData.history}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">保护级别</p>
                  <p className="font-medium">{heritageData.status}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-lg p-4 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-medium">想了解更多?</h3>
                <p className="text-sm text-gray-500">问AI助手更详细信息</p>
              </div>
              
              <Link to="/chat" className="bg-heritage-red text-white px-4 py-2 rounded-full text-sm">
                去提问
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeritageDetailPage;
