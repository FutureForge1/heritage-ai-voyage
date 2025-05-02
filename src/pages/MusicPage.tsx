
import { useState } from "react";
import { ArrowLeft, Play, Download, Save } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const MusicPage = () => {
  const [generatingMusic, setGeneratingMusic] = useState(false);
  const [musicGenerated, setMusicGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  
  const handleGenerateMusic = () => {
    if (!prompt.trim()) return;
    
    setGeneratingMusic(true);
    
    // Simulate AI music generation
    setTimeout(() => {
      setGeneratingMusic(false);
      setMusicGenerated(true);
    }, 2000);
  };
  
  return (
    <div className="pb-20 min-h-screen bg-heritage-cream">
      <Header 
        title="AI音乐创作" 
        subtitle="用AI创作传统音乐旋律"
        showBack={true}
        showNotification={false}
      />
      
      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-3 text-heritage-text">创作灵感</h2>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想创作的音乐风格，例如：一段表现江南水乡宁静氛围的古筝曲..."
            className="w-full p-3 border border-heritage-gold/30 rounded-lg min-h-[120px] bg-heritage-paper text-heritage-text font-kai"
          />
          
          <div className="mt-4">
            <Button 
              onClick={handleGenerateMusic}
              disabled={!prompt.trim() || generatingMusic}
              className="w-full bg-heritage-teal hover:bg-heritage-teal/90 text-white"
            >
              {generatingMusic ? "生成中..." : "开始创作"}
            </Button>
          </div>
        </div>
        
        {musicGenerated && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-medium mb-3 text-heritage-text">创作结果</h2>
            
            <div className="bg-heritage-paper rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">江南水韵</p>
                <p className="text-xs text-gray-500">古筝 | 02:45</p>
              </div>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-heritage-teal flex items-center justify-center text-white">
                  <Play size={20} />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1 border-heritage-gold/30">
                <Save size={16} className="mr-2" /> 保存
              </Button>
              <Button variant="outline" className="flex-1 border-heritage-gold/30">
                <Download size={16} className="mr-2" /> 下载
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};

export default MusicPage;
