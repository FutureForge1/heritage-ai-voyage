
import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInterface = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "你好！我是你的非遗文化导师。请问你想了解什么非遗知识？", isUser: false }
  ]);
  const [userInput, setUserInput] = useState("");
  
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;
    
    // Add user message
    setMessages([...messages, { text: userInput, isUser: true }]);
    setUserInput("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      // Mock AI response based on user input
      const aiResponse = { 
        text: `关于"${userInput}"的非物质文化遗产知识非常丰富。这是中国传统文化的重要组成部分，代表着世代相传的技艺和智慧。您想了解更具体的哪一方面呢？`, 
        isUser: false 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-4 max-w-[80%] ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            <div 
              className={`p-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-heritage-red text-white rounded-tr-none' 
                  : 'bg-heritage-paper border border-heritage-gold/30 rounded-tl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-heritage-gold/30 p-4 bg-heritage-paper">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-heritage-teal hover:bg-heritage-teal/90"
          >
            <Mic className="h-5 w-5 text-white" />
          </Button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的问题..."
              className="w-full border border-heritage-gold/30 rounded-full py-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-heritage-gold"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleSendMessage}
            className="rounded-full bg-heritage-gold hover:bg-heritage-gold/90"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
