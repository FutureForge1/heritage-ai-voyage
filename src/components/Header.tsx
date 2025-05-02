
import { ArrowLeft, Bell, Heart, Share2, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showNotification?: boolean;
  showActions?: boolean;
  gradient?: boolean;
  heritageItem?: boolean;
}

const Header = ({ 
  title,
  subtitle,
  showBack = false,
  showNotification = true,
  showActions = false,
  gradient = false,
  heritageItem = false
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHome = location.pathname === "/";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={`p-4 relative ${gradient ? 'heritage-gradient text-white' : 'bg-heritage-paper'} ${heritageItem ? 'h-64' : ''}`}>
      <div className="flex items-center justify-between">
        {showBack ? (
          <button 
            onClick={goBack}
            className="p-2 rounded-full text-white bg-white/20"
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
          
          {showActions && (
            <>
              <button className="p-2 rounded-full text-white bg-white/20">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full text-white bg-white/20">
                <Share2 size={20} />
              </button>
            </>
          )}
          
          {!showActions && (
            <div className={`w-8 h-8 rounded-full ${gradient ? 'bg-white/20' : 'bg-heritage-red/10'} flex items-center justify-center text-heritage-red`}>
              <User size={18} className={gradient ? 'text-white' : 'text-heritage-red'} />
            </div>
          )}
        </div>
      </div>
      
      {title && !heritageItem && (
        <div className="mt-4 text-center">
          <h1 className={`text-2xl font-semibold ${gradient ? 'text-white' : 'text-heritage-text'}`}>
            {title}
          </h1>
          {subtitle && <p className={`text-sm ${gradient ? 'text-white/80' : 'text-heritage-text/70'}`}>{subtitle}</p>}
        </div>
      )}

      {heritageItem && (
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold mb-1">中国剪纸</h1>
          <p className="text-sm text-white/90">传统技艺</p>
        </div>
      )}
    </header>
  );
};

export default Header;
