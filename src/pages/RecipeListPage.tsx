import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

const RecipeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch all recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3002/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in browser history
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  // Show recipe details when a recipe is selected
  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => {
              handleBackToList();
            }}
            className="mb-6 flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipe List
          </button>
          
          {/* Recipe container with gradient background - full width */}
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-3xl p-8 w-full shadow-2xl">
            {/* Recipe title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{selectedRecipe.title}</h1>
              
              {/* Recipe badges */}
              <div className="flex flex-wrap justify-center gap-4">
                {selectedRecipe.category && (
                  <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                    {selectedRecipe.category}
                  </span>
                )}
                {selectedRecipe.cookingTime && (
                  <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium flex items-center text-lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {selectedRecipe.cookingTime} min
                  </span>
                )}
                {selectedRecipe.servings && (
                  <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                    Serves {selectedRecipe.servings}
                  </span>
                )}
                {selectedRecipe.difficulty && (
                  <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                    {selectedRecipe.difficulty}
                  </span>
                )}
              </div>
            </div>

            {/* Recipe content in two columns */}
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              {/* Ingredients */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Ingredients</h2>
                <div className="space-y-5">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start">
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
                  {selectedRecipe.instructions.map((instruction, index) => (
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
      </div>
    );
  }

  // Show recipe list
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => {
            handleGoBack();
          }}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Recipes</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-800 font-medium hover:text-blue-600 transition-colors">
                  {recipe.title}
                </span>
              </div>
              
              {recipe.category && (
                <div className="mt-2 ml-11">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {recipe.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-600">
          Total Recipes: {recipes.length}
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;

