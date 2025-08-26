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
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => {
            handleBackToList();
          }}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Back to Recipe List
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedRecipe.title}</h1>
          
          {selectedRecipe.image && (
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h2>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
            {selectedRecipe.category && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Category: {selectedRecipe.category}
              </span>
            )}
            {selectedRecipe.cookingTime && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Cooking Time: {selectedRecipe.cookingTime}
              </span>
            )}
            {selectedRecipe.servings && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Servings: {selectedRecipe.servings}
              </span>
            )}
            {selectedRecipe.difficulty && (
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                Difficulty: {selectedRecipe.difficulty}
              </span>
            )}
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
