
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-heritage-gold/30 flex items-center justify-around z-10">
      <Link to="/" className={`flex flex-col items-center space-y-1 ${isActive('/') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 9L12 3L4 9V20H20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs">首页</span>
      </Link>
      <Link to="/guide" className={`flex flex-col items-center space-y-1 ${isActive('/guide') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M14.5 9.5L17.5 12L14.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 9.5L6.5 12L9.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs">导览</span>
      </Link>
      <Link to="/create" className={`flex flex-col items-center space-y-1 ${isActive('/create') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-xs">创作</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center space-y-1 ${isActive('/profile') ? 'text-heritage-red' : 'text-gray-500'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20C20 16.6863 16.4183 14 12 14C7.58172 14 4 16.6863 4 20" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="text-xs">我的</span>
      </Link>
    </div>
  );
};

export default Navigation;
