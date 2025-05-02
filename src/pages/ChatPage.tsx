
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen paper-bg">
      <Header 
        title="非遗知识问答" 
        showBack={true}
        showNotification={false}
      />
      
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;
