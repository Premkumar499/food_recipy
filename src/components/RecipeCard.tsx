import { useNavigate } from 'react-router-dom';
import { RecipeCardProps } from '../types';
import { getImageByTitle } from '../utils/imageUtils';

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    } else {
      // Navigate directly to the recipe detail page
      navigate(`/recipe/${recipe.id}`);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/category/${recipe.category.toLowerCase()}`);
  };

  return (
    <div 
      className="bg-white rounded-none shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 w-full h-full"
      onClick={handleClick}
    >
      <div className="relative h-48">
        <img
          src={recipe.image || getImageByTitle(recipe.title, recipe.category)}
          alt={recipe.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getImageByTitle(recipe.title, recipe.category);
          }}
        />
        {/* Images selected based on recipe title */}
      </div>
      
      <div className="p-4">
        {/* Recipe title removed */}
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {recipe.cookingTime} min
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.difficulty}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{recipe.rating}</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Serves {recipe.servings}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
