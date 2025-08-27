import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeDetailsProps {
  recipe?: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-gray-500 text-xl font-medium mb-4">
            Recipe not found
          </div>
          <button 
            onClick={() => {
              navigate('/');
            }} 
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Recipe container with gradient background - full width */}
      <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-3xl p-8 w-full shadow-2xl">
        {/* Recipe title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{recipe.title}</h1>
          
          {/* Recipe badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
              {recipe.category}
            </span>
            <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium flex items-center text-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {recipe.cookingTime} min
            </span>
            <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
              Serves {recipe.servings}
            </span>
            <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe content in two columns */}
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Ingredients */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Ingredients</h2>
            <div className="space-y-5">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 bg-white text-orange-500 rounded-full flex items-center justify-center text-xl font-bold mr-6 shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-white text-xl leading-relaxed pt-2 font-medium">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Instructions</h2>
            <div className="space-y-5">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-12 h-12 bg-white text-orange-500 rounded-full flex items-center justify-center text-xl font-bold mr-6 shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-white text-xl leading-relaxed pt-2 font-medium">{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
