import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe } from '../types';

const RecipeVariationsPage = () => {
  const { category } = useParams<{ category: string }>();
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRelatedRecipes = async () => {
      if (!category) return;
      
      setLoading(true);
      setError('');
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Fetch recipes by category
        const response = await fetch(`http://localhost:3002/recipes?category=${category}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        
        const data = await response.json();
        setRelatedRecipes(data);
      } catch (err) {
        setError('Failed to load recipes');
        // Fallback to mock data filtered by category
        const filtered = mockRecipes.filter(recipe => 
          recipe.category.toLowerCase() === category?.toLowerCase()
        );
        setRelatedRecipes(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedRecipes();
  }, [category]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error && relatedRecipes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
          <Link 
            to="/" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {category} Recipe Variations
        </h1>
        <p className="text-lg text-gray-600">
          Discover different ways to prepare {category?.toLowerCase()} dishes
        </p>
      </div>

      {/* Recipe Containers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
          >
            {/* Recipe Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                  ⭐ {recipe.rating}
                </span>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {recipe.title}
              </h3>
              
              {/* Recipe Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <span>🕒 {recipe.cookingTime} min</span>
                  <span>👥 {recipe.servings} servings</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>

              {/* Ingredients Preview */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Ingredients:</h4>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient) => (
                    <span
                      key={ingredient.id}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {ingredient.name}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{recipe.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/recipe/${recipe.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
              >
                View Full Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Recipes Found */}
      {relatedRecipes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No {category?.toLowerCase()} recipes found
          </div>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Explore other categories
          </Link>
        </div>
      )}

      {/* Suggestion for More Recipes */}
      {relatedRecipes.length > 0 && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Want to explore more cuisines?
          </h3>
          <p className="text-gray-600 mb-4">
            Check out our other recipe categories
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      )}
    </div>
  );
};

// Mock data for development
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    image: 'https://via.placeholder.com/400x300?text=Spaghetti+Carbonara',
    category: 'Italian',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: '400', unit: 'g' },
      { id: '2', name: 'Eggs', amount: '3', unit: 'large' },
      { id: '3', name: 'Parmesan cheese', amount: '100', unit: 'g' },
      { id: '4', name: 'Pancetta', amount: '150', unit: 'g' },
    ],
    instructions: [
      'Cook spaghetti according to package instructions',
      'Fry pancetta until crispy',
      'Mix eggs and cheese in a bowl',
      'Combine hot pasta with pancetta',
      'Add egg mixture and toss quickly',
    ],
  },
  {
    id: '7',
    title: 'Fettuccine Alfredo',
    image: 'https://via.placeholder.com/400x300?text=Fettuccine+Alfredo',
    category: 'Italian',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.3,
    ingredients: [
      { id: '1', name: 'Fettuccine pasta', amount: '400', unit: 'g' },
      { id: '2', name: 'Heavy cream', amount: '300', unit: 'ml' },
      { id: '3', name: 'Parmesan cheese', amount: '150', unit: 'g' },
      { id: '4', name: 'Butter', amount: '50', unit: 'g' },
    ],
    instructions: [
      'Cook fettuccine according to package directions',
      'Heat cream and butter in a large pan',
      'Add cooked pasta to the cream mixture',
      'Toss with Parmesan cheese until creamy',
      'Serve immediately with black pepper',
    ],
  },
  {
    id: '8',
    title: 'Margherita Pizza',
    image: 'https://via.placeholder.com/400x300?text=Margherita+Pizza',
    category: 'Italian',
    cookingTime: 40,
    servings: 2,
    difficulty: 'Medium',
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'Pizza dough', amount: '1', unit: 'ball' },
      { id: '2', name: 'Tomato sauce', amount: '150', unit: 'ml' },
      { id: '3', name: 'Fresh mozzarella', amount: '200', unit: 'g' },
      { id: '4', name: 'Fresh basil', amount: '10', unit: 'leaves' },
    ],
    instructions: [
      'Preheat oven to 250°C',
      'Roll out pizza dough on floured surface',
      'Spread tomato sauce evenly',
      'Add torn mozzarella pieces',
      'Bake for 12-15 minutes until golden',
      'Top with fresh basil before serving',
    ],
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    image: 'https://via.placeholder.com/400x300?text=Chicken+Tikka+Masala',
    category: 'Indian',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '800', unit: 'g' },
      { id: '2', name: 'Yogurt', amount: '200', unit: 'ml' },
      { id: '3', name: 'Tomatoes', amount: '400', unit: 'g' },
      { id: '4', name: 'Heavy cream', amount: '200', unit: 'ml' },
    ],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Grill chicken until cooked through',
      'Make sauce with tomatoes and cream',
      'Add chicken to sauce and simmer',
      'Serve with rice and naan',
    ],
  },
  {
    id: '9',
    title: 'Butter Chicken',
    image: 'https://via.placeholder.com/400x300?text=Butter+Chicken',
    category: 'Indian',
    cookingTime: 50,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.6,
    ingredients: [
      { id: '1', name: 'Chicken thighs', amount: '600', unit: 'g' },
      { id: '2', name: 'Butter', amount: '100', unit: 'g' },
      { id: '3', name: 'Tomato puree', amount: '300', unit: 'ml' },
      { id: '4', name: 'Heavy cream', amount: '150', unit: 'ml' },
    ],
    instructions: [
      'Marinate chicken in spices overnight',
      'Cook chicken in tandoor or grill',
      'Prepare rich tomato-butter sauce',
      'Simmer chicken in sauce',
      'Finish with cream and serve with naan',
    ],
  },
  {
    id: '10',
    title: 'Biryani',
    image: 'https://via.placeholder.com/400x300?text=Biryani',
    category: 'Indian',
    cookingTime: 90,
    servings: 6,
    difficulty: 'Hard',
    rating: 4.9,
    ingredients: [
      { id: '1', name: 'Basmati rice', amount: '500', unit: 'g' },
      { id: '2', name: 'Mutton', amount: '800', unit: 'g' },
      { id: '3', name: 'Yogurt', amount: '200', unit: 'ml' },
      { id: '4', name: 'Saffron', amount: '1', unit: 'tsp' },
    ],
    instructions: [
      'Soak rice for 30 minutes',
      'Marinate meat with yogurt and spices',
      'Cook rice until 70% done',
      'Layer rice and meat alternately',
      'Cook on dum for 45 minutes',
      'Serve with raita and shorba',
    ],
  },
];

export default RecipeVariationsPage;
