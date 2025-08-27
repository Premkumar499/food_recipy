import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

// Mock recipes data for production deployment
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Rice',
    image: '/images/food-interface/1.jpg',
    category: 'Tamil Cuisine',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Basmati rice', amount: '2', unit: 'cups' },
      { id: '2', name: 'Lemon juice', amount: '3', unit: 'tbsp' },
      { id: '3', name: 'Turmeric powder', amount: '1/2', unit: 'tsp' },
      { id: '4', name: 'Mustard seeds', amount: '1', unit: 'tsp' },
    ],
    instructions: [
      'Cook basmati rice and let it cool completely',
      'Heat oil in a large pan and add mustard seeds',
      'Add turmeric powder and cooked rice',
      'Add lemon juice and mix gently',
    ],
  },
  {
    id: '2',
    title: 'Dosa',
    image: '/images/food-interface/2.jpg',
    category: 'Tamil Cuisine',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.9,
    ingredients: [
      { id: '1', name: 'Dosa batter', amount: '2', unit: 'cups' },
      { id: '2', name: 'Oil', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Heat non-stick tawa on medium flame',
      'Pour a ladle of batter to center',
      'Spread the batter in circular motion',
      'Cook until golden brown',
    ],
  },
];

const RecipeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setRecipes(mockRecipes);
      } catch (err) {
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
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={handleBackToList}
            className="mb-6 flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipe List
          </button>
          
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-3xl p-8 w-full shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{selectedRecipe.title}</h1>
              
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                  {selectedRecipe.category}
                </span>
                <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium flex items-center text-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {selectedRecipe.cookingTime} min
                </span>
                <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                  Serves {selectedRecipe.servings}
                </span>
                <span className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium text-lg">
                  {selectedRecipe.difficulty}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-4">
          <button
            onClick={handleGoBack}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{recipe.title}</h3>
                    <p className="text-sm text-gray-600">{recipe.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
