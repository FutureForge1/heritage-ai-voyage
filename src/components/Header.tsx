
import { ArrowLeft, Bell, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showNotification?: boolean;
  gradient?: boolean;
  simplified?: boolean; // New prop for simplified header
}

const Header = ({ 
  title,
  subtitle,
  showBack = false,
  showNotification = true,
  gradient = false,
  simplified = false // Default to false for backward compatibility
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHome = location.pathname === "/";

  const goBack = () => {
    navigate(-1);
  };

  // Simplified header for the home page
  if (simplified && isHome) {
    return (
      <header className="p-4 bg-heritage-paper">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-heritage-red flex items-center justify-center text-white text-xl font-bold">
              #
            </div>
          </div>
          
          <h1 className="chinese-title text-xl text-heritage-red">非遗AI探秘</h1>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell size={24} className="text-heritage-red" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-heritage-red text-white text-xs flex items-center justify-center rounded-full">
                2
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-heritage-gold/20 flex items-center justify-center">
              <User size={18} className="text-heritage-red/80" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Original header for other pages
  return (
    <header className={`p-4 relative ${gradient ? 'heritage-gradient text-white' : 'bg-heritage-paper'}`}>
      <div className="flex items-center justify-between">
        {showBack ? (
          <button 
            onClick={goBack}
            className={`p-2 rounded-full ${gradient ? 'text-white bg-white/20' : 'text-heritage-red bg-heritage-red/10'}`}
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="flex items-center">
            {isHome && (
              <div className="w-10 h-10 rounded-full bg-heritage-red flex items-center justify-center text-white text-xl font-bold">
                #
              </div>
            )}
          </div>
        )}
        
        {isHome && !title && (
          <h1 className="chinese-title text-xl">非遗AI探秘</h1>
        )}
        
        <div className="flex items-center gap-2">
          {showNotification && (
            <div className="relative">
              <Bell size={24} className={gradient ? 'text-white' : 'text-heritage-red'} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-heritage-red text-white text-xs flex items-center justify-center rounded-full">
                2
              </span>
            </div>
          )}
          <div className={`w-8 h-8 rounded-full ${gradient ? 'bg-white/20' : 'bg-heritage-red/10'} flex items-center justify-center text-heritage-red`}>
            <User size={18} className={gradient ? 'text-white' : 'text-heritage-red'} />
          </div>
        </div>
      </div>
      
      {title && (
        <div className="mt-4 text-center">
          <h1 className={`text-2xl font-semibold ${gradient ? 'text-white' : 'text-heritage-text'}`}>
            {title}
          </h1>
          {subtitle && <p className={`text-sm ${gradient ? 'text-white/80' : 'text-heritage-text/70'}`}>{subtitle}</p>}
        </div>
      )}
    </header>
  );
};

export default Header;
