import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import Pagination from '../components/Pagination';
import { Recipe } from '../types';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recipesPerPage = 8;

  // Map navigation categories to database categories
  const getCategoryMapping = (navCategory: string) => {
    const mappings: { [key: string]: string[] } = {
      'popular': ['Popular'],
      'meat-seafood': ['Meat-Seafood'],
      'healthy': ['Healthy'],
      'holidays': ['Holidays'],
      'cuisine': ['Italian', 'Indian', 'Mexican', 'Asian'],
      'seasonal': ['Seasonal'],
      // Keep existing mappings
      'italian': ['Italian'],
      'indian': ['Indian'],
      'mexican': ['Mexican'],
      'salad': ['Salad'],
      'dessert': ['Dessert']
    };
    
    return mappings[navCategory?.toLowerCase()] || [navCategory];
  };

  // Get display name for category
  const getCategoryDisplayName = (navCategory: string) => {
    const displayNames: { [key: string]: string } = {
      'popular': 'Popular Recipes',
      'meat-seafood': 'Meat & Seafood',
      'healthy': 'Healthy & Diet',
      'holidays': 'Holiday Recipes',
      'cuisine': 'Cuisine Varieties',
      'seasonal': 'Seasonal Recipes'
    };
    
    return displayNames[navCategory?.toLowerCase()] || 
           navCategory?.charAt(0).toUpperCase() + navCategory?.slice(1) || 'Recipes';
  };

  // Fetch recipes by category
  const fetchRecipesByCategory = async (page = 1) => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const categoryMappings = getCategoryMapping(category || '');
      console.log('Fetching categories:', categoryMappings);
      
      // For multiple categories (like cuisine), fetch all and combine
      let allRecipes: Recipe[] = [];
      
      for (const cat of categoryMappings) {
        const response = await fetch(`http://localhost:3002/recipes?category=${cat}`);
        if (response.ok) {
          const data = await response.json();
          allRecipes = [...allRecipes, ...data];
        }
      }
      
      // Apply pagination to combined results
      const startIndex = (page - 1) * recipesPerPage;
      const paginatedRecipes = allRecipes.slice(startIndex, startIndex + recipesPerPage);
      
      setRecipes(paginatedRecipes);
      setTotalPages(Math.ceil(allRecipes.length / recipesPerPage));
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes. Please try again.');
      
      // Fallback to mock data filtered by category mappings
      const categoryMappings = getCategoryMapping(category || '');
      const filteredMockRecipes = mockRecipes.filter(
        recipe => categoryMappings.some(cat => 
          recipe.category.toLowerCase() === cat.toLowerCase()
        )
      );
      setRecipes(filteredMockRecipes);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchRecipesByCategory(currentPage);
    }
  }, [category, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>{'>'}</span>
          <span className="text-gray-900 font-medium">
            {getCategoryDisplayName(category || '')}
          </span>
        </nav>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getCategoryDisplayName(category || '')}
            </h1>
            <p className="text-gray-600">
              Discover delicious recipes for every occasion
            </p>
          </div>
          
          {!loading && recipes.length > 0 && (
            <div className="text-right">
              <span className="text-sm text-gray-600">
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
              </span>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Stats */}
      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">
              {recipes.length}
            </div>
            <div className="text-sm text-gray-600">Total Recipes</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(recipes.reduce((sum, recipe) => sum + recipe.rating, 0) / recipes.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(recipes.reduce((sum, recipe) => sum + recipe.cookingTime, 0) / recipes.length)}m
            </div>
            <div className="text-sm text-gray-600">Avg Cook Time</div>
          </div>
        </div>
      )}

      {/* Recipes Section */}
      <div className="mb-8">
        <RecipeList recipes={recipes} loading={loading} error={error} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Suggestions for other categories */}
      {!loading && recipes.length > 0 && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Italian', 'Indian', 'Mexican', 'Dessert', 'Salad'].map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className={`p-3 rounded-lg text-center transition-colors ${
                  cat.toLowerCase() === category?.toLowerCase()
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for development (same as HomePage)
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://via.placeholder.com/300x200?text=Spaghetti+Carbonara',
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
    id: '2',
    title: 'Chicken Tikka Masala',
    image: 'https://via.placeholder.com/300x200?text=Chicken+Tikka+Masala',
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
    id: '3',
    title: 'Chocolate Chip Cookies',
    image: 'https://via.placeholder.com/300x200?text=Chocolate+Chip+Cookies',
    category: 'Dessert',
    cookingTime: 25,
    servings: 24,
    difficulty: 'Easy',
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'All-purpose flour', amount: '2¼', unit: 'cups' },
      { id: '2', name: 'Butter', amount: '1', unit: 'cup' },
      { id: '3', name: 'Brown sugar', amount: '¾', unit: 'cup' },
      { id: '4', name: 'Chocolate chips', amount: '2', unit: 'cups' },
    ],
    instructions: [
      'Preheat oven to 375°F (190°C)',
      'Cream butter and sugars until fluffy',
      'Beat in eggs and vanilla',
      'Mix in flour mixture gradually',
      'Stir in chocolate chips',
      'Bake for 9-11 minutes',
    ],
  },
];

export default CategoryPage;
