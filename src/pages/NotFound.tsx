
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="pb-16 min-h-screen bg-heritage-cream">
      <Header showBack={true} showNotification={false} />
      
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-heritage-red font-song">404</h1>
          <p className="text-xl text-heritage-text mb-6 font-song">非常抱歉，您访问的页面不存在</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-heritage-red hover:bg-heritage-red/90"
          >
            返回首页
          </Button>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default NotFound;
