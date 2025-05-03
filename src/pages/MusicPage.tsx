
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Play, Pause, Download, Save, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample audio data
const SAMPLE_TRACKS = [
  {
    id: "1",
    title: "江南水韵",
    instrument: "古筝",
    duration: "02:45",
    audioUrl: "https://audio-samples.github.io/samples/mp3/anonymous/songbird.mp3"
  },
  {
    id: "2",
    title: "秋水长天",
    instrument: "二胡",
    duration: "03:12",
    audioUrl: "https://audio-samples.github.io/samples/mp3/blizzard/blizzard_01.mp3"
  },
  {
    id: "3",
    title: "山水清音",
    instrument: "琵琶",
    duration: "02:30",
    audioUrl: "https://audio-samples.github.io/samples/mp3/blizzard/blizzard_02.mp3"
  }
];

const MusicPage = () => {
  const [generatingMusic, setGeneratingMusic] = useState(false);
  const [musicGenerated, setMusicGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("中国古典");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<typeof SAMPLE_TRACKS[0] | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  const musicStyles = [
    "中国古典",
    "民族器乐",
    "戏曲音乐",
    "宫廷乐曲",
    "现代国风"
  ];

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    return () => {
      // Clean up audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const handleGenerateMusic = () => {
    if (!prompt.trim()) return;
    
    setGeneratingMusic(true);
    
    // Simulate AI music generation
    setTimeout(() => {
      setGeneratingMusic(false);
      setMusicGenerated(true);
      
      // Set first sample track as current
      setCurrentTrack(SAMPLE_TRACKS[0]);
      if (audioRef.current) {
        audioRef.current.src = SAMPLE_TRACKS[0].audioUrl;
      }
      
      toast({
        title: "音乐已生成",
        description: "你的AI音乐作品已经准备好了"
      });
    }, 3000);
  };

  const togglePlay = (track: typeof SAMPLE_TRACKS[0]) => {
    if (!audioRef.current) return;
    
    if (currentTrack?.id !== track.id) {
      // New track selected
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
    } else {
      // Same track - toggle play state
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSave = () => {
    toast({
      title: "已保存到收藏",
      description: "音乐已成功保存到你的收藏"
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "开始下载",
      description: "音乐文件已开始下载"
    });
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
          
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium mb-2">选择音乐风格</label>
            <div className="flex flex-wrap gap-2">
              {musicStyles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1.5 text-sm rounded-full ${
                    selectedStyle === style
                      ? "bg-heritage-red text-white" 
                      : "bg-heritage-paper text-heritage-text border border-heritage-gold/30"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={handleGenerateMusic}
              disabled={!prompt.trim() || generatingMusic}
              className="w-full bg-heritage-teal hover:bg-heritage-teal/90 text-white"
            >
              {generatingMusic ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  生成中...
                </>
              ) : "开始创作"}
            </Button>
          </div>
        </div>
        
        {musicGenerated && (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-medium mb-3 text-heritage-text">创作结果</h2>
            
            <div className="space-y-3">
              {SAMPLE_TRACKS.map((track) => (
                <div 
                  key={track.id} 
                  className="bg-heritage-paper rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-xs text-gray-500">{track.instrument} | {track.duration}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => togglePlay(track)}
                      className="w-10 h-10 rounded-full bg-heritage-teal flex items-center justify-center text-white"
                    >
                      {isPlaying && currentTrack?.id === track.id ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleSave}
              >
                <Save size={16} className="mr-2" /> 保存
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleDownload}
              >
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
