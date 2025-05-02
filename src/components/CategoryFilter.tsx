
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-4 p-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-heritage-red text-white'
                : 'bg-white border border-heritage-gold/30 text-heritage-text hover:bg-heritage-red/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
