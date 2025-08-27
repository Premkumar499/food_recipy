import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
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
      <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show recipe details when a recipe is selected
  if (selectedRecipe) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col overflow-hidden">
        {/* Compact Back Button */}
        <div className="max-w-6xl mx-auto pt-2 px-4 flex-shrink-0">
          <button
            onClick={handleBackToList}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 mb-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ← Back to Recipe List
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <RecipeDetails recipe={selectedRecipe} />
        </div>
      </div>
    );
  }

  // Show recipe list
  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col overflow-hidden">
      {/* Compact Back Button */}
      <div className="max-w-6xl mx-auto pt-2 px-4 flex-shrink-0">
        <button
          onClick={handleGoBack}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg transform hover:scale-105 mb-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {/* Compact recipe list container */}
        <div className="max-w-7xl mx-auto px-4 h-full">
          {/* Compact recipe card with sophisticated gradient */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/20 h-full flex flex-col">
            
            {/* Compact header section */}
            <div className="relative px-6 py-4 text-center flex-shrink-0">
              <div className="absolute inset-0 bg-black/5 rounded-t-2xl"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight leading-tight">
                  All Recipes
                </h1>
                <div className="flex justify-center items-center">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
                    <span className="text-white font-bold text-sm">Total: {recipes.length} recipes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact content section */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 pr-2">
                {recipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleRecipeClick(recipe)}
                    className="group bg-white/15 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-white to-gray-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-black shadow-lg group-hover:shadow-xl transition-shadow">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-white text-sm font-semibold block truncate group-hover:text-yellow-200 transition-colors">
                          {recipe.title}
                        </span>
                        {recipe.category && (
                          <span className="text-white/80 text-xs font-medium block truncate">
                            {recipe.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {(recipe.cookingTime || recipe.difficulty) && (
                      <div className="mt-2 flex gap-2">
                        {recipe.cookingTime && (
                          <span className="text-xs text-white/90 bg-white/10 px-2 py-0.5 rounded">
                            {recipe.cookingTime}min
                          </span>
                        )}
                        {recipe.difficulty && (
                          <span className="text-xs text-white/90 bg-white/10 px-2 py-0.5 rounded">
                            {recipe.difficulty}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Compact footer section */}
            <div className="bg-black/10 backdrop-blur-sm px-4 py-2 border-t border-white/20 flex-shrink-0">
              <div className="flex flex-wrap justify-center items-center gap-4 text-white/80">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-xs">Complete Recipe Collection</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-xs">Tested & Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;

