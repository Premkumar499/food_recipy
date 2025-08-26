import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { Recipe } from '../types';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get search query from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Fetch recipes from API with retry mechanism
  const fetchRecipes = async (search = '', retryCount = 0) => {
    setLoading(true);
    setError('');
    
    try {
      let url = 'http://localhost:3002/recipes';
      if (search) {
        url += `?q=${encodeURIComponent(search)}`;
      }
      
      console.log('Fetching from URL:', url); // Debug log
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        cache: 'no-cache' // Prevent caching issues
      });
      
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data.length, 'recipes'); // Debug log
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      
      // Retry mechanism - try up to 2 times
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        setTimeout(() => {
          fetchRecipes(search, retryCount + 1);
        }, 1000 * (retryCount + 1)); // Exponential backoff
        return;
      }
      
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to load recipes: ${errorMessage}. Make sure the API server is running on port 3002.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(searchTerm);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      {/* Hero Section - Full Screen */}
      <div className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white w-full h-screen">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content - Centered in full screen */}
        <div className="relative max-w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing Recipes
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Find the perfect recipe for any occasion
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed 8 Recipe Grid */}
      <div className="w-full max-w-full">
        <RecipeList 
          recipes={recipes} 
          loading={loading} 
          error={error} 
          onRetry={() => fetchRecipes(searchTerm, 0)}
        />
      </div>
    </div>
  );
};

// Mock data for development with local category-specific food images - 8 containers
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Gourmet Snack Mix',
    image: '/images/snack-3.webp',
    category: 'Snacks',
    cookingTime: 5,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.4,
    ingredients: [
      { id: '1', name: 'Premium nuts', amount: '150', unit: 'g' },
      { id: '2', name: 'Artisan crackers', amount: '100', unit: 'g' },
      { id: '3', name: 'Dried berries', amount: '80', unit: 'g' },
      { id: '4', name: 'Dark chocolate', amount: '50', unit: 'g' },
    ],
    instructions: [
      'Select premium ingredients',
      'Arrange in elegant portions',
      'Add chocolate pieces',
      'Present on serving board',
      'Enjoy with friends',
    ],
  },
  {
    id: '2',
    title: 'Classic Snack Platter',
    image: '/images/snack-1.webp',
    category: 'Snacks',
    cookingTime: 10,
    servings: 6,
    difficulty: 'Easy',
    rating: 4.3,
    ingredients: [
      { id: '1', name: 'Mixed nuts', amount: '200', unit: 'g' },
      { id: '2', name: 'Crackers', amount: '150', unit: 'g' },
      { id: '3', name: 'Dried fruits', amount: '100', unit: 'g' },
      { id: '4', name: 'Cheese cubes', amount: '100', unit: 'g' },
    ],
    instructions: [
      'Arrange nuts in small bowls',
      'Place crackers on serving plate',
      'Add dried fruits and cheese',
      'Garnish with fresh herbs',
      'Serve immediately',
    ],
  },
  {
    id: '3',
    title: 'Traditional Snacks',
    image: '/images/snack.jpg',
    category: 'Snacks',
    cookingTime: 15,
    servings: 8,
    difficulty: 'Easy',
    rating: 4.2,
    ingredients: [
      { id: '1', name: 'Roasted nuts', amount: '250', unit: 'g' },
      { id: '2', name: 'Savory bites', amount: '200', unit: 'g' },
      { id: '3', name: 'Spiced mix', amount: '150', unit: 'g' },
      { id: '4', name: 'Crunchy treats', amount: '100', unit: 'g' },
    ],
    instructions: [
      'Prepare traditional snack mix',
      'Combine all ingredients',
      'Season with spices',
      'Mix well and serve',
      'Store in airtight container',
    ],
  },
  {
    id: '4',
    title: 'Grilled Meat Deluxe',
    image: '/images/non-veg-3.webp',
    category: 'Meat & Seafood',
    cookingTime: 35,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Premium meat cuts', amount: '800', unit: 'g' },
      { id: '2', name: 'Special marinade', amount: '200', unit: 'ml' },
      { id: '3', name: 'Herb blend', amount: '3', unit: 'tbsp' },
      { id: '4', name: 'Olive oil', amount: '4', unit: 'tbsp' },
    ],
    instructions: [
      'Marinate meat for 3 hours',
      'Preheat grill to high heat',
      'Grill meat to perfection',
      'Check internal temperature',
      'Let rest and serve hot',
    ],
  },
  {
    id: '5',
    title: 'Seafood Meat Combo',
    image: '/images/non-veg-2.webp',
    category: 'Meat & Seafood',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'Mixed seafood', amount: '600', unit: 'g' },
      { id: '2', name: 'Meat selection', amount: '400', unit: 'g' },
      { id: '3', name: 'Garlic butter', amount: '100', unit: 'g' },
      { id: '4', name: 'Fresh herbs', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Prepare seafood and meat',
      'Heat garlic butter in pan',
      'Cook seafood first',
      'Add meat and herbs',
      'Serve with lemon wedges',
    ],
  },
  {
    id: '6',
    title: 'Classic Meat Platter',
    image: '/images/non-veg.webp',
    category: 'Meat & Seafood',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.6,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '600', unit: 'g' },
      { id: '2', name: 'Beef strips', amount: '400', unit: 'g' },
      { id: '3', name: 'Marinade sauce', amount: '150', unit: 'ml' },
      { id: '4', name: 'Spice mix', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Cut meat into portions',
      'Apply marinade evenly',
      'Let marinate for 1 hour',
      'Grill until cooked through',
      'Serve with vegetables',
    ],
  },
  {
    id: '7',
    title: 'Fresh Vegetable Bowl',
    image: '/images/veg-1.webp',
    category: 'Vegetarian',
    cookingTime: 20,
    servings: 3,
    difficulty: 'Easy',
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Fresh vegetables', amount: '500', unit: 'g' },
      { id: '2', name: 'Quinoa', amount: '200', unit: 'g' },
      { id: '3', name: 'Avocado', amount: '1', unit: 'large' },
      { id: '4', name: 'Lemon dressing', amount: '3', unit: 'tbsp' },
    ],
    instructions: [
      'Cook quinoa until fluffy',
      'Chop fresh vegetables',
      'Slice avocado',
      'Arrange in bowl',
      'Drizzle with dressing',
    ],
  },
  {
    id: '8',
    title: 'Garden Fresh Salad',
    image: '/images/veg-food.webp',
    category: 'Vegetarian',
    cookingTime: 15,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.4,
    ingredients: [
      { id: '1', name: 'Mixed greens', amount: '400', unit: 'g' },
      { id: '2', name: 'Cherry tomatoes', amount: '200', unit: 'g' },
      { id: '3', name: 'Cucumber', amount: '1', unit: 'large' },
      { id: '4', name: 'Olive oil dressing', amount: '4', unit: 'tbsp' },
    ],
    instructions: [
      'Wash all vegetables thoroughly',
      'Cut vegetables into bite sizes',
      'Mix in large salad bowl',
      'Add dressing and toss',
      'Serve immediately',
    ],
  },
];

export default HomePage;
