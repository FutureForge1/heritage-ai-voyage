
import { useState } from "react";
import { ArrowLeft, Mic, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; }[]>([
    { 
      text: "你好！我是你的非遗文化顾问。请问你想了解什么非遗知识？", 
      isUser: false 
    }
  ]);
  const [userInput, setUserInput] = useState("");
  
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: userInput, isUser: true }]);
    
    // Clear input
    setUserInput("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse = "";
      
      if (userInput.includes("剪纸") || userInput.includes("有哪些代表作品")) {
        aiResponse = "中国剪纸代表作品包括：1.陕西\"窗花\"，以喜庆吉祥为主题；2.山东\"杨柳青\"剪纸，色彩艳丽；3.江苏\"桃花坞\"剪纸，线条细腻；4.浙江温州剪纸，黑纸人物故事；5.河北蔚县剪纸，造型朴实典雅。这些作品各具特色，表现了不同地域的民俗文化和审美点。";
      } else {
        aiResponse = `关于"${userInput}"的非物质文化遗产知识非常丰富。这是中国传统文化的重要组成部分，代表着世代相传的技艺和智慧。您想了解更具体的哪一方面呢？`;
      }
      
      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
    }, 1000);
  };

  const suggestedQuestions = [
    "剪纸有哪些代表作品？"
  ];

  return (
    <div className="flex flex-col h-screen bg-heritage-cream">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <Link to="/" className="p-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-bold">非遗问答</h1>
          <p className="text-xs text-gray-500">探索中国传统文化的智库</p>
        </div>
        <div className="w-10"></div> {/* Empty div for balanced spacing */}
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-4 max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            <div 
              className={`p-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-heritage-red text-white rounded-tr-none' 
                  : 'bg-white border border-heritage-gold/10 rounded-tl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggested Questions */}
      <div className="p-2 border-t border-gray-200 bg-white">
        <div className="mb-2 px-2">
          <p className="text-xs text-gray-500">要不要以访客身份关注文章</p>
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2">
          {suggestedQuestions.map((q, i) => (
            <button 
              key={i}
              onClick={() => {
                setUserInput(q);
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="px-3 py-1.5 bg-heritage-teal/10 text-heritage-teal rounded-full whitespace-nowrap text-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-heritage-teal/10 text-heritage-teal">
            <Mic size={20} />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-full flex items-center pl-4 pr-2 py-1">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的问题..."
              className="flex-1 bg-transparent outline-none"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-2 p-2 rounded-full bg-heritage-red text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
