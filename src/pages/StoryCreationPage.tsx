
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Book, ChevronDown, Copy, Loader2, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const StoryCreationPage = () => {
  const [storyPrompt, setStoryPrompt] = useState("");
  const [storyType, setStoryType] = useState("童话故事");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const storyTypes = ["童话故事", "历史故事", "民间故事", "寓言故事", "神话传说"];
  
  useEffect(() => {
    let interval: number;
    
    if (isGenerating) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 4;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            
            // Generate story based on type
            generateSampleStory(storyType, storyPrompt);
            
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating, storyType, storyPrompt]);
  
  const generateSampleStory = (type: string, prompt: string) => {
    // Sample stories based on type
    const stories = {
      "童话故事": `很久很久以前，在一座美丽的山村里，住着一位年轻的${prompt}师傅。他天赋异禀，自幼跟随祖父学习传统技艺。村民们都说他的手中有仙气，每一件作品都栩栩如生。

有一天，一位神秘的老人来到村子，他带来了一卷古老的图谱。"这是失传已久的技法，"老人说，"只有真正热爱传统的人才能领悟其中奥秘。"说完，老人便消失在山林之中。

年轻的师傅日夜研究图谱，却始终无法参透。正当他沮丧之时，一只会说话的小麻雀飞进他的工作室。"真正的技艺不在图谱，而在心中，"小麻雀说，"闭上眼睛，听听祖先的声音。"

师傅照做了，奇迹发生了！他的指尖开始发光，作品也有了灵魂。从此，他不仅传承了古老技艺，还创新出自己的风格，成为村子的骄傲。

这个故事告诉我们，传统与创新并不矛盾，真正的传承是让古老的技艺在新时代继续焕发生命力。`,
      
      "历史故事": `明朝万历年间，苏州城内有位名叫李明德的${prompt}艺人。他出身艺术世家，家传的技艺已有三百余年历史。当时，苏州是全国${prompt}艺术的中心，各地艺人云集于此。

李明德的技艺精湛，但为人谦逊。有一年，朝廷征召能工巧匠入宫为皇家制作礼品。众多艺人争相应征，却唯有李明德默默准备作品，不与人争。

选拔当日，众艺人作品华丽繁复，而李明德的作品看似简单，却蕴含深意，展现出江南水乡的灵秀与江山社稷的稳固。主考官一眼便认出这件作品的不凡，将其呈给皇帝。

皇帝大为赞赏，封李明德为"御用匠师"。然而，李明德婉拒了留在宫中的邀请，请求回到苏州继续传艺。皇帝感其忠诚于艺，特许其归乡，并赐予"明德堂"匾额。

此后，李明德收徒无数，使这门传统技艺在江南大地生生不息。时至今日，"明德堂"的传人仍在传承着这门古老技艺，成为中华文化的重要组成部分。`,
      
      "民间故事": `在河南一个叫青石村的地方，世代居住着以${prompt}闻名的丁家。相传丁家祖先曾得仙人点化，掌握了独特的技艺。

丁家有一个规矩——家传技艺只传男不传女。这一代只有一个女儿丁巧巧，父亲从未教她任何技艺。但巧巧自小就痴迷父亲的手艺，常常偷偷观摩学习。

一年大旱，村子举办祈福仪式，需要一件精美的${prompt}作品献给山神。父亲突然病倒，无法完成。危急时刻，巧巧拿出自己秘密创作的作品。村民们惊叹不已，作品竟比历代丁家传人的更加精美！

山神被感动，降下甘霖。村民们这才明白，艺术无关性别，只在乎匠心。从此，丁家改变祖训，男女皆可学艺。巧巧也成为村里最受尊敬的艺人，她创立的技法被后人称为"巧艺"，流传至今。

这个故事告诉我们，传统需要传承，但也需要与时俱进，打破不合理的束缚，才能焕发新生。`,
      
      "寓言故事": `森林里有一只年老的${prompt}师傅狐狸，和一只年轻的徒弟兔子。

狐狸总是一丝不苟地教导兔子每个细节，这让急性子的兔子很不耐烦。"这些古老技艺太慢了，"兔子抱怨道，"我能想出更快的方法！"

一天，森林举办艺术大赛。兔子决定用自己的"快速方法"创作，三两下就完成了作品。而狐狸则按照传统方式，一步步细心创作。

比赛时，兔子的作品虽然新颖，却经不起评委们的细看；而狐狸的作品看似普通，却处处显露匠心，最终获得了冠军。

兔子不服气："我的更有创意啊！"狐狸笑道："传统技艺的精髓不在于快慢，而在于对细节的尊重和对品质的坚持。创新固然重要，但若没有扎实的基本功，创新就如空中楼阁。"

兔子明白了，从此刻苦学习基本功。多年后，他融合传统与创新，成为森林最出色的艺术家。`,
      
      "神话传说": `传说太古时代，天界有一位神匠，专为众神打造神器。他有个不成器的儿子，整日贪玩，不肯学习${prompt}技艺。

一日，神匠被王母娘娘召去修补天庭宝物，临行前叮嘱儿子看好工坊。不料天空突然出现巨大裂缝，众神惊慌失措。原来是支撑天空的巨柱损坏了，若不及时修复，天将塌陷。

危急时刻，神匠之子想起父亲教导过的技艺。虽然他从未认真学习，但耳濡目染，还是掌握了一些基础。他鼓起勇气，用家中材料临时打造了一件不起眼的工具，爬上天柱进行修补。

工作期间，他汗如雨下，手指多次被割伤，但他没有放弃。最终，天柱修复成功。当神匠回来时，惊讶地发现儿子完成了这项艰巨任务。

玉帝感其功劳，封他为"民间工艺守护神"，赐予他永生，让他在人间传授${prompt}技艺。民间艺人常在工作前祭拜他，祈求技艺精进。这便是${prompt}能流传至今的神秘缘由。`
    };
    
    // Use the corresponding story or default to the first one
    const story = stories[type as keyof typeof stories] || stories["童话故事"];
    
    setGeneratedStory(story);
    
    toast({
      title: "故事已生成",
      description: "你的AI故事创作已完成"
    });
  };
  
  const handleCreateStory = () => {
    if (!storyPrompt) {
      toast({
        title: "请输入描述",
        description: "请先描述你想要的故事类型或主题",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    setGeneratedStory("");
  };

  const handleCopyStory = () => {
    navigator.clipboard.writeText(generatedStory);
    
    toast({
      title: "已复制到剪贴板",
      description: "故事内容已成功复制"
    });
  };
  
  const handleSaveStory = () => {
    toast({
      title: "已保存到收藏",
      description: "故事已成功保存到你的收藏"
    });
  };
  
  const handleRegenerateStory = () => {
    handleCreateStory();
  };
  
  return (
    <div className="min-h-screen paper-bg pb-20">
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
              className="w-full h-24 px-3 py-2 border border-heritage-gold/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-heritage-gold bg-heritage-cream/30 font-kai"
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
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中 {progress}%
              </>
            ) : "开始创作"}
          </Button>
        </div>
        
        {generatedStory && (
          <div className="bg-white rounded-xl p-6 shadow-md mb-6 border border-heritage-gold/30">
            <h2 className="text-lg font-medium mb-3">创作结果</h2>
            
            <div className="bg-heritage-paper p-4 rounded-lg mb-4 min-h-[200px] whitespace-pre-line font-kai text-heritage-text">
              {generatedStory}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleCopyStory}
              >
                <Copy size={16} className="mr-2" /> 复制
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-heritage-gold/30"
                onClick={handleSaveStory}
              >
                <Save size={16} className="mr-2" /> 保存
              </Button>
              <Button 
                className="bg-heritage-red hover:bg-heritage-red/90"
                onClick={handleRegenerateStory}
              >
                <RefreshCw size={16} className="mr-2" /> 重新生成
              </Button>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold chinese-title mb-3">创作灵感</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png" alt="Story example" className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-sm">民间传说故事</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png" alt="Story example" className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-sm">历史人物轶事</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/lovable-uploads/37e2831f-4bf1-4005-b78f-3f5ee4ea8d5f.png" alt="Story example" className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-sm">工艺传承故事</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/30">
              <img src="/lovable-uploads/53fe4d74-e773-401e-917b-bf78af4f5728.png" alt="Story example" className="w-full h-32 object-cover rounded-lg mb-2" />
              <p className="text-sm">古代神话传说</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryCreationPage;
