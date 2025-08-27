import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

interface RecipeDetailsProps {
  recipe?: Recipe;
}

const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div className="h-full bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center py-8">
          <div className="text-gray-700 text-xl font-medium mb-4">
            Recipe not found
          </div>
          <button 
            onClick={() => {
              navigate('/');
            }} 
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Compact recipe container */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Compact recipe card with sophisticated gradient */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 flex flex-col">
          
          {/* Compact header section */}
          <div className="relative px-6 py-4 text-center">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-black/5 rounded-t-2xl"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
                {recipe.title}
              </h1>
              
              {/* Compact badge system */}
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                <div className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 shadow-lg">
                  <span className="text-white font-bold text-sm">{recipe.category}</span>
                </div>
                <div className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 shadow-lg flex items-center">
                  <svg className="w-4 h-4 mr-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-bold text-sm">{recipe.cookingTime} min</span>
                </div>
                <div className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 shadow-lg">
                  <span className="text-white font-bold text-sm">Serves {recipe.servings}</span>
                </div>
                <div className="bg-white/25 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 shadow-lg">
                  <span className="text-white font-bold text-sm">{recipe.difficulty}</span>
                </div>
              </div>

              {/* Compact rating display */}
              <div className="flex justify-center items-center">
                <div className="flex items-center bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
                  <div className="flex space-x-1 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-white/40'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-bold text-sm">{recipe.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact content sections */}
          <div className="grid lg:grid-cols-2 gap-4 px-4 pb-6">
            
            {/* Ingredients Section */}
            <div className="space-y-2">
              <div className="flex items-center mb-3">
                <div className="w-6 h-0.5 bg-white/40 rounded-full mr-2"></div>
                <h2 className="text-2xl font-bold text-white">Ingredients</h2>
                <div className="flex-1 h-0.5 bg-white/40 rounded-full ml-2"></div>
              </div>
              
              <div className="space-y-2 pr-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="group">
                    <div className="flex items-center bg-white/15 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-white to-gray-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-black mr-3 shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="text-white text-sm font-semibold block">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                        <span className="text-white/90 text-sm font-medium">
                          {ingredient.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-2">
              <div className="flex items-center mb-3">
                <div className="w-6 h-0.5 bg-white/40 rounded-full mr-2"></div>
                <h2 className="text-2xl font-bold text-white">Instructions</h2>
                <div className="flex-1 h-0.5 bg-white/40 rounded-full ml-2"></div>
              </div>
              
              <div className="space-y-2 pr-2">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start bg-white/15 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-white to-gray-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-black mr-3 shadow-lg mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-semibold leading-relaxed">
                          {instruction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact footer section */}
          <div className="bg-black/10 backdrop-blur-sm px-4 py-2 border-t border-white/20 flex-shrink-0">
            <div className="flex flex-wrap justify-center items-center gap-4 text-white/80">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-xs">Professional Recipe</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-xs">Tested & Verified</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-xs">Highly Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
