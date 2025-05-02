
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeritageCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type?: string;
}

const HeritageCard = ({ id, title, description, imageUrl, type }: HeritageCardProps) => {
  return (
    <Link to={`/guide/${id}`}>
      <div className="relative overflow-hidden rounded-xl h-48 shadow-md group">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
          {type && (
            <span className="text-xs text-white/80 mb-1">{type}</span>
          )}
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
        
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <button className="bg-white/30 backdrop-blur-sm p-1 rounded-r-full">
            <ChevronLeft className="text-white" size={20} />
          </button>
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <button className="bg-white/30 backdrop-blur-sm p-1 rounded-l-full">
            <ChevronRight className="text-white" size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HeritageCard;
