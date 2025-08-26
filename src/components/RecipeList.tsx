import { RecipeListProps } from '../types';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading, error, onRetry }: RecipeListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg font-medium mb-2">
          Something went wrong!
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={onRetry || (() => window.location.reload())} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mr-2"
        >
          Try Again
        </button>
        <button 
          onClick={() => window.open('http://localhost:3002/recipes', '_blank')} 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Test API Direct
        </button>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg font-medium mb-2">
          No recipes found
        </div>
        <p className="text-gray-400">Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {recipes.slice(0, 8).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
