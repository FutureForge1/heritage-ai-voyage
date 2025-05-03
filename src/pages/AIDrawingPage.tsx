import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, Sparkles, Download, Loader2, Save, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";

const AIDrawingPage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("水墨画");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
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

  // Sample generated images based on style
  const styleImages = {
    "水墨画": "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png",
    "国画": "/lovable-uploads/37e2831f-4bf1-4005-b78f-3f5ee4ea8d5f.png",
    "青花瓷风": "/lovable-uploads/53fe4d74-e773-401e-917b-bf78af4f5728.png",
    "剪纸风格": "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
    "现代国风": "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png"
  };

  useEffect(() => {
    let interval: number;
    
    if (isGenerating) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setGeneratedImage(styleImages[selectedStyle]);
            toast({
              title: "图片生成完成",
              description: "你的AI绘画作品已生成"
            });
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating, selectedStyle, toast]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "请输入描述",
        description: "请先描述你想创作的绘画作品",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    setGeneratedImage(null);
  };

  const handleSave = () => {
    toast({
      title: "已保存到收藏",
      description: "图片已成功保存到你的收藏"
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "开始下载",
      description: "图片文件已开始下载"
    });
  };

  return (
    <div className="min-h-screen bg-heritage-cream pb-20">
      <Header 
        title="AI智能绘画"
        subtitle="描述你想创作的绘画作品"
        showBack={true}
        showNotification={false}
      />
      
      <div className="p-4 max-w-lg mx-auto">
        {/* Prompt input */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：一幅水墨山水画，有茂盛山林和平台楼阁，远处云雾缭绕......"
            className="w-full h-32 px-3 py-2 border border-heritage-gold/30 rounded-lg focus:outline-none bg-heritage-cream/30 font-kai"
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
                <p className={`text-xs mt-1 ${selectedStyle === style.name ? "text-white/90" : "text-gray-500"}`}>
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Generate Button */}
        <Button 
          className="w-full bg-heritage-red hover:bg-heritage-red/90 py-6 mb-8"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中 {progress}%
            </>
          ) : "开始创作"}
        </Button>
        
        {/* Generated Image */}
        {generatedImage && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-8">
            <h3 className="font-medium mb-3">创作结果</h3>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={generatedImage} 
                alt="AI Generated Art" 
                className="w-full object-cover"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleSave}
              >
                <Save size={16} className="mr-2" /> 收藏
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleDownload}
              >
                <Download size={16} className="mr-2" /> 下载
              </Button>
              <Button 
                className="bg-heritage-red hover:bg-heritage-red/90"
                onClick={() => handleGenerate()}
              >
                <RotateCw size={16} className="mr-2" /> 重新生成
              </Button>
            </div>
          </div>
        )}
        
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
