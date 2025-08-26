import React from 'react';

interface CategorizedSearchDropdownProps {
  query: string;
  results: { category: string; recipes: string[] }[];
  onRecipeClick: (recipe: string) => void;
  isVisible: boolean;
}

const CategorizedSearchDropdown: React.FC<CategorizedSearchDropdownProps> = ({
  query,
  results,
  onRecipeClick,
  isVisible
}) => {
  if (!isVisible || !query.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-80 bg-gray-800 shadow-lg rounded-lg mt-1 z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        {results.length === 0 ? (
          // No results found
          <div className="text-center py-4">
            <div className="text-gray-400 text-sm">
              No recipes found for "{query}"
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Try searching for ingredients or recipe names
            </div>
          </div>
        ) : (
          // Show categorized results
          <>
            {results.map((categoryResult, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 last:mb-0">
                {/* Category Header */}
                <div className="text-orange-400 text-xs font-semibold uppercase tracking-wider px-3 py-2 border-b border-gray-700">
                  {categoryResult.category}
                </div>
                
                {/* Recipe Items */}
                <div className="py-1">
                  {categoryResult.recipes.map((recipe, recipeIndex) => (
                    <button
                      key={recipeIndex}
                      onClick={() => onRecipeClick(recipe)}
                      className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors flex items-center group"
                    >
                      <svg 
                        className="w-3 h-3 mr-3 text-gray-400 group-hover:text-orange-400 transition-colors" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm group-hover:text-orange-300 transition-colors">
                        {recipe}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Show total count */}
            <div className="text-xs text-gray-400 px-3 py-2 border-t border-gray-700">
              Found {results.reduce((total, cat) => total + cat.recipes.length, 0)} recipes
              {results.length > 0 && ` in ${results.length} categories`}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategorizedSearchDropdown;
