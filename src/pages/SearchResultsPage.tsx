import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import { searchRecipes } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        try {
          const results = await searchRecipes(query);
          setRecipes(results);
        } catch (error) {
          console.error('Error searching recipes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Searching recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results</h1>
        <p className="text-gray-600 mb-6">
          {recipes.length > 0 
            ? `Found ${recipes.length} recipe${recipes.length === 1 ? '' : 's'} for "${query}"`
            : `No recipes found for "${query}"`
          }
        </p>

        {recipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
