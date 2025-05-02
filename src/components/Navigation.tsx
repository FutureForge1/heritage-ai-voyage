
import { Home, Compass, Palette, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-heritage-gold/30 flex items-center justify-around z-10">
      <Link to="/" className={`flex flex-col items-center space-y-1 ${isActive('/') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <Home size={24} />
        <span className="text-xs">首页</span>
      </Link>
      <Link to="/guide" className={`flex flex-col items-center space-y-1 ${isActive('/guide') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <Compass size={24} />
        <span className="text-xs">导览</span>
      </Link>
      <Link to="/create" className={`flex flex-col items-center space-y-1 ${isActive('/create') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <Palette size={24} />
        <span className="text-xs">创作</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center space-y-1 ${isActive('/profile') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <User size={24} />
        <span className="text-xs">我的</span>
      </Link>
    </div>
  );
};

export default Navigation;
