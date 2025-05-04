
import React from "react";

export interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void; // Adding this missing prop
}

const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory
}: CategoryFilterProps) => {
  return (
    <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-heritage-red text-white"
              : "bg-white text-heritage-text hover:bg-heritage-paper"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
