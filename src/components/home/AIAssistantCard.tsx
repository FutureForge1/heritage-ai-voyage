
import { Link } from "react-router-dom";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIAssistantCard = () => {
  const suggestedQuestions = [
    "剪纸有哪些代表作品？",
    "京剧和昆曲有什么区别？",
    "中国剪纸源于何时？"
  ];

  return (
    <div className="px-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-heritage-gold/20 ancient-scroll hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-full border-2 border-heritage-gold flex items-center justify-center relative">
            <div className="bg-heritage-paper w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-heritage-gold text-sm font-bold font-kai">AI助手</span>
            </div>
          </div>
          <h3 className="text-lg font-medium mt-2 font-song">学问小学</h3>
          <p className="text-xs text-gray-500">中国传统文化智能顾问</p>
        </div>
        
        <Link to="/chat">
          <Button className="w-full bg-heritage-red hover:bg-heritage-red/90 font-kai transform transition-all hover:scale-105 duration-200 shadow hover:shadow-md">
            开始聊天
          </Button>
        </Link>

        <div className="mt-3 flex justify-center">
          <button className="p-2 bg-heritage-teal/10 rounded-full transform transition-all hover:scale-110 duration-200 hover:bg-heritage-teal/20">
            <Mic className="text-heritage-teal" size={20} />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-heritage-gold rounded-full mr-2"></div>
            <span className="text-sm text-gray-500">常见问题</span>
          </div>
          
          <div className="space-y-2">
            {suggestedQuestions.map((question, idx) => (
              <Link to="/chat" key={idx}>
                <div className="bg-heritage-paper px-3 py-2 rounded-md text-sm font-kai transition-all hover:bg-heritage-gold/10 hover:translate-x-1 duration-200 cursor-pointer">
                  {question}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantCard;
