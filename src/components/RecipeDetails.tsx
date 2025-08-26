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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Recipe container with gradient background */}
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-3xl p-8 mx-auto max-w-5xl">
        {/* Recipe title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{recipe.title}</h1>
          
          {/* Recipe badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
              {recipe.category}
            </span>
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {recipe.cookingTime} min
            </span>
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
              Serves {recipe.servings}
            </span>
            <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe content in two columns */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Ingredients */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Ingredients</h2>
            <ol className="space-y-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={ingredient.id} className="flex items-start">
                  <span className="flex-shrink-0 w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    {index + 1}
                  </span>
                  <span className="text-white text-lg leading-relaxed pt-1">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    {index + 1}
                  </span>
                  <span className="text-white text-lg leading-relaxed pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
