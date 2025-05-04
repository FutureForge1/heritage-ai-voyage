
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className="p-4">
      <div className="flex items-center bg-white rounded-full border border-heritage-gold/30 px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
        <img 
          src="/lovable-uploads/e6dab9a5-cae6-4e3b-ba66-e09d7f040f5b.png" 
          alt="Logo" 
          className="w-6 h-6 mr-2" 
        />
        <div className="text-xs flex-1">
          <div className="font-bold font-song">成语典故道明松</div>
          <div className="text-gray-500">语言学习三位一体，文化保护多管齐下</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
