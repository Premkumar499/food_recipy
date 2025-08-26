import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import { getImageByTitle } from '../utils/imageUtils';

interface RecipeDetailsProps {
  recipe?: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          Recipe not found
        </div>
        <button 
          onClick={() => {
            navigate('/');
          }} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Recipe header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.image || getImageByTitle(recipe.title, recipe.category)}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getImageByTitle(recipe.title, recipe.category);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="text-white p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {recipe.cookingTime} min
                </span>
                <span>Serves {recipe.servings}</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ol className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={ingredient.id} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-900 mr-2">Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">({recipe.rating}/5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
