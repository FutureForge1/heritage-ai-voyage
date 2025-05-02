
import { useState } from "react";
import { Link } from "react-router-dom";
import { Brush, Music, Book, Image } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import FeatureCard from "@/components/FeatureCard";

const CreatePage = () => {
  const creativeTools = [
    {
      id: "ai-drawing",
      title: "AI绘画",
      description: "使用AI创造传统风格的绘画作品",
      icon: <Brush size={32} className="text-white" />,
      color: "#D64541",
      to: "/create/drawing"
    },
    {
      id: "ai-music",
      title: "音乐生成",
      description: "创作融合传统元素的音乐旋律",
      icon: <Music size={32} className="text-white" />,
      color: "#3A8FB7",
      to: "/create/music"
    },
    {
      id: "ai-story",
      title: "故事创作",
      description: "与AI一起编写富有传统文化元素的故事",
      icon: <Book size={32} className="text-white" />,
      color: "#E6C670",
      to: "/create/story"
    }
  ];
  
  // Mock creative examples
  const examples = [
    { id: 1, title: "创作示例1", imageUrl: "/placeholder.svg" },
    { id: 2, title: "创作示例2", imageUrl: "/placeholder.svg" },
    { id: 3, title: "创作示例3", imageUrl: "/placeholder.svg" },
    { id: 4, title: "创作示例4", imageUrl: "/placeholder.svg" }
  ];
  
  return (
    <div className="pb-16 min-h-screen paper-bg">
      <Header 
        title="创意工坊" 
        subtitle="用AI激发你的传统文化创意" 
        gradient={true} 
        showBack={false}
      />
      
      <main className="px-4 py-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold chinese-title">创意工具</h2>
          <Link to="/gallery" className="text-sm text-heritage-red">我的作品</Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {creativeTools.map((tool) => (
            <FeatureCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              to={tool.to}
              color={tool.color}
            />
          ))}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold chinese-title mb-4">创作灵感</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {examples.map((example) => (
              <div key={example.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-heritage-gold/30">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <Image size={32} className="text-gray-400" />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-medium">{example.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default CreatePage;
