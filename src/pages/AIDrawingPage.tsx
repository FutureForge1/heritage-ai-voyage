
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIDrawingPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("水墨画");
  
  const styles = [
    { id: "ink", name: "水墨画", description: "传统中国水墨风，写意画的极致" },
    { id: "oil", name: "国画", description: "中国传统山水画，工笔或写意风格" },
    { id: "modern", name: "青花瓷风", description: "蓝白相间的青花瓷纹饰风格" },
    { id: "folk", name: "剪纸风格", description: "中国传统剪纸风格的形态" },
    { id: "contemporary", name: "现代国风", description: "中国传统风结合现代流行元素" }
  ];
  
  const examples = [
    {
      id: 1,
      title: "山水云雾",
      style: "水墨画",
      imageUrl: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png"
    },
    {
      id: 2,
      title: "闲趣四色",
      style: "国画",
      imageUrl: "/lovable-uploads/37e2831f-4bf1-4005-b78f-3f5ee4ea8d5f.png"
    },
    {
      id: 3,
      title: "花鸟图",
      style: "青花瓷风",
      imageUrl: "/lovable-uploads/53fe4d74-e773-401e-917b-bf78af4f5728.png"
    }
  ];

  return (
    <div className="min-h-screen bg-heritage-cream">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <Link to="/create" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">描述你想创作的绘画作品</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>
      
      <div className="p-4 max-w-lg mx-auto">
        {/* Prompt input */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：一幅水墨山水画，有茂盛山林和平台楼阁，远处云雾缭绕......"
            className="w-full h-32 px-3 py-2 border border-heritage-gold/30 rounded-lg focus:outline-none bg-heritage-cream/30"
          />
          
          <div className="mt-3 text-sm text-gray-500">
            <p>提示：描述越详细，生成作品越贴近你的想法</p>
          </div>
        </div>
        
        {/* Style Selection */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">选择风格</h3>
          <div className="grid grid-cols-1 gap-2">
            {styles.map(style => (
              <div 
                key={style.id}
                onClick={() => setSelectedStyle(style.name)}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedStyle === style.name 
                    ? "bg-heritage-red border-heritage-red text-white" 
                    : "bg-white border border-heritage-gold/20"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{style.name}</h4>
                  {selectedStyle === style.name && <Sparkles size={16} />}
                </div>
                <p className="text-xs mt-1">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Generate Button */}
        <Button className="w-full bg-heritage-red hover:bg-heritage-red/90 py-6 mb-8">
          开始创作
        </Button>
        
        {/* Examples */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-heritage-text font-medium mb-3">
            <Image size={18} />
            创作示例
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {examples.map(example => (
              <div key={example.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={example.imageUrl} 
                  alt={example.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium">{example.title}</h4>
                  <p className="text-xs text-gray-500">{example.style}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDrawingPage;
