
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Book, ChevronDown } from "lucide-react";

const StoryCreationPage = () => {
  const [storyPrompt, setStoryPrompt] = useState("");
  const [storyType, setStoryType] = useState("童话故事");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const storyTypes = ["童话故事", "历史故事", "民间故事", "寓言故事"];
  
  const handleCreateStory = () => {
    if (!storyPrompt) return;
    
    setIsGenerating(true);
    
    // Simulate story generation
    setTimeout(() => {
      setIsGenerating(false);
      // Here you would display the generated story
    }, 2000);
  };
  
  return (
    <div className="min-h-screen paper-bg">
      <Header 
        title="故事创作" 
        showBack={true}
        showNotification={false}
      />
      
      <main className="px-4 py-4">
        <div className="bg-white rounded-xl p-6 shadow-md mb-6 border border-heritage-gold/30">
          <div className="flex items-center mb-4 gap-3">
            <div className="w-12 h-12 rounded-lg bg-heritage-gold flex items-center justify-center">
              <Book size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium">故事创作</h2>
              <p className="text-xs text-heritage-text/70">与AI一起编写富有传统文化元素的故事</p>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              描述你想要的故事类型或主题
            </label>
            <textarea
              value={storyPrompt}
              onChange={(e) => setStoryPrompt(e.target.value)}
              placeholder="例如：一个关于年轻工匠学习雕刻技艺的励志故事..."
              className="w-full h-24 px-3 py-2 border border-heritage-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-heritage-gold bg-heritage-cream/30"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              故事风格
            </label>
            <div className="relative">
              <select
                value={storyType}
                onChange={(e) => setStoryType(e.target.value)}
                className="w-full appearance-none px-3 py-2 border border-heritage-gold/30 rounded-lg bg-heritage-cream/30 focus:outline-none focus:ring-1 focus:ring-heritage-gold"
              >
                {storyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown 
                size={18} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-heritage-text/50 pointer-events-none" 
              />
            </div>
          </div>
          
          <Button 
            onClick={handleCreateStory}
            disabled={!storyPrompt || isGenerating}
            className="w-full gold-gradient hover:opacity-90 text-white"
          >
            {isGenerating ? "生成中..." : "开始创作"}
          </Button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold chinese-title mb-3">创作灵感</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/placeholder.svg" alt="Story example" className="w-full h-32 object-cover rounded-lg bg-gray-100 mb-2" />
              <p className="text-sm">创作示例1</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/placeholder.svg" alt="Story example" className="w-full h-32 object-cover rounded-lg bg-gray-100 mb-2" />
              <p className="text-sm">创作示例2</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/placeholder.svg" alt="Story example" className="w-full h-32 object-cover rounded-lg bg-gray-100 mb-2" />
              <p className="text-sm">创作示例3</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/placeholder.svg" alt="Story example" className="w-full h-32 object-cover rounded-lg bg-gray-100 mb-2" />
              <p className="text-sm">创作示例4</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryCreationPage;
