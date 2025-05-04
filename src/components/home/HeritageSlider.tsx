
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface HeritageItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: string;
}

const HeritageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Featured items for the slider
  const heritageItems = [
    {
      id: "chinese-papercut",
      title: "中国剪纸",
      description: "起源于十世纪，是中华文明活力的体现。剪纸是中国各地流行的民间艺术形式。",
      imageUrl: "/lovable-uploads/49a3b358-40e1-4cc0-abdd-be98580d1179.png",
      type: "传统手工艺"
    },
    {
      id: "kunqu",
      title: "昆曲",
      description: "被誉为'百戏之祖'的传统表演艺术",
      imageUrl: "/lovable-uploads/6cf0dd4d-506d-4e3d-b80d-4f13c1c6a4a3.png",
      type: "传统戏曲"
    },
    {
      id: "ceramics",
      title: "景德镇陶瓷",
      description: "千年窑火不息，薪火相传的精美工艺",
      imageUrl: "/lovable-uploads/552e7ba1-8dd2-4a08-b7ab-f6e99d8f6669.png",
      type: "传统工艺"
    }
  ];
  
  useEffect(() => {
    // Auto slide for heritage items
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heritageItems.length);
    }, 5000);
    
    return () => clearInterval(slideTimer);
  }, []);

  const handleSlideChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentSlide(prev => (prev - 1 + heritageItems.length) % heritageItems.length);
    } else {
      setCurrentSlide(prev => (prev + 1) % heritageItems.length);
    }
  };
  
  return (
    <div className="px-4 mb-6">
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0 w-5 h-5 bg-heritage-red rounded-full flex items-center justify-center">
          <span className="text-white text-xs">#</span>
        </div>
        <h2 className="text-heritage-text font-bold ml-2">展示专题</h2>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden rounded-xl relative h-48">
          {heritageItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <div className="bg-heritage-red/80 text-white text-xs px-2 py-1 rounded-full w-fit mb-1">
                  {item.type}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
          onClick={() => handleSlideChange("prev")}
        >
          <ChevronLeft className="text-white" size={20} />
        </button>
        
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-1 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
          onClick={() => handleSlideChange("next")}
        >
          <ChevronRight className="text-white" size={20} />
        </button>
      </div>
      
      <div className="flex justify-center mt-2">
        <div className="flex space-x-1">
          {heritageItems.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                currentSlide === index ? "bg-heritage-red w-4" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeritageSlider;
