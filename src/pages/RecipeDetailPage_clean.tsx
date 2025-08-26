import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import { Recipe } from '../types';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Mock data for development
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Gourmet Pizza',
      image: '/images/food-pizza.webp',
      category: 'Italian',
      cookingTime: 25,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.8,
      ingredients: [
        { id: '1', name: 'Pizza dough', amount: '400', unit: 'g' },
        { id: '2', name: 'Tomato sauce', amount: '150', unit: 'ml' },
        { id: '3', name: 'Mozzarella cheese', amount: '200', unit: 'g' },
        { id: '4', name: 'Fresh basil', amount: '20', unit: 'g' },
      ],
      instructions: [
        'Preheat oven to 220°C',
        'Roll out pizza dough',
        'Spread tomato sauce evenly',
        'Add mozzarella and toppings',
        'Bake for 12-15 minutes',
      ],
    },
    {
      id: '2',
      title: 'Premium Snack Mix',
      image: '/images/snack-3.webp',
      category: 'Snacks',
      cookingTime: 10,
      servings: 6,
      difficulty: 'Easy',
      rating: 4.5,
      ingredients: [
        { id: '1', name: 'Mixed nuts', amount: '200', unit: 'g' },
        { id: '2', name: 'Dried fruits', amount: '150', unit: 'g' },
        { id: '3', name: 'Dark chocolate', amount: '100', unit: 'g' },
        { id: '4', name: 'Sea salt', amount: '1', unit: 'tsp' },
      ],
      instructions: [
        'Mix all nuts in large bowl',
        'Add dried fruits',
        'Break chocolate into pieces',
        'Sprinkle with sea salt',
        'Serve in small portions',
      ],
    },
    {
      id: '3',
      title: 'Artisan Snack Platter',
      image: '/images/snack-1.webp',
      category: 'Snacks',
      cookingTime: 15,
      servings: 8,
      difficulty: 'Easy',
      rating: 4.3,
      ingredients: [
        { id: '1', name: 'Artisan crackers', amount: '250', unit: 'g' },
        { id: '2', name: 'Cheese selection', amount: '200', unit: 'g' },
        { id: '3', name: 'Olives', amount: '150', unit: 'g' },
        { id: '4', name: 'Fresh grapes', amount: '200', unit: 'g' },
      ],
      instructions: [
        'Arrange crackers on platter',
        'Add variety of cheeses',
        'Place olives in small bowls',
        'Garnish with grapes',
        'Serve at room temperature',
      ],
    },
    {
      id: '4',
      title: 'BBQ Meat Feast',
      image: '/images/non-veg-3.webp',
      category: 'Meat & Seafood',
      cookingTime: 40,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.9,
      ingredients: [
        { id: '1', name: 'Beef ribs', amount: '1', unit: 'kg' },
        { id: '2', name: 'BBQ sauce', amount: '200', unit: 'ml' },
        { id: '3', name: 'Dry rub spices', amount: '3', unit: 'tbsp' },
        { id: '4', name: 'Honey', amount: '2', unit: 'tbsp' },
      ],
      instructions: [
        'Season ribs with dry rub',
        'Marinate for 2 hours',
        'Preheat grill to medium-high',
        'Grill ribs for 30 minutes',
        'Brush with BBQ sauce and honey',
      ],
    },
    {
      id: '5',
      title: 'Grilled Meat Selection',
      image: '/images/non-veg-2.webp',
      category: 'Meat & Seafood',
      cookingTime: 30,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.7,
      ingredients: [
        { id: '1', name: 'Chicken breast', amount: '600', unit: 'g' },
        { id: '2', name: 'Pork chops', amount: '400', unit: 'g' },
        { id: '3', name: 'Herb marinade', amount: '150', unit: 'ml' },
        { id: '4', name: 'Garlic', amount: '4', unit: 'cloves' },
      ],
      instructions: [
        'Prepare herb marinade with garlic',
        'Marinate meats for 1 hour',
        'Heat grill to high temperature',
        'Grill chicken and pork',
        'Let rest before serving',
      ],
    },
    {
      id: '6',
      title: 'Classic Meat Platter',
      image: '/images/non-veg.webp',
      category: 'Meat & Seafood',
      cookingTime: 35,
      servings: 6,
      difficulty: 'Medium',
      rating: 4.6,
      ingredients: [
        { id: '1', name: 'Mixed meat cuts', amount: '800', unit: 'g' },
        { id: '2', name: 'Teriyaki sauce', amount: '120', unit: 'ml' },
        { id: '3', name: 'Sesame oil', amount: '2', unit: 'tbsp' },
        { id: '4', name: 'Ginger', amount: '2', unit: 'tbsp' },
      ],
      instructions: [
        'Cut meat into serving pieces',
        'Mix teriyaki with sesame oil',
        'Add fresh grated ginger',
        'Cook meat until tender',
        'Serve with steamed rice',
      ],
    },
    {
      id: '7',
      title: 'Fresh Garden Bowl',
      image: '/images/veg-1.webp',
      category: 'Vegetarian',
      cookingTime: 20,
      servings: 3,
      difficulty: 'Easy',
      rating: 4.5,
      ingredients: [
        { id: '1', name: 'Mixed greens', amount: '300', unit: 'g' },
        { id: '2', name: 'Cherry tomatoes', amount: '200', unit: 'g' },
        { id: '3', name: 'Avocado', amount: '2', unit: 'medium' },
        { id: '4', name: 'Quinoa', amount: '150', unit: 'g' },
      ],
      instructions: [
        'Cook quinoa until fluffy',
        'Wash and prepare greens',
        'Slice cherry tomatoes',
        'Dice avocados',
        'Combine all in serving bowl',
      ],
    },
    {
      id: '8',
      title: 'Vegetarian Delight',
      image: '/images/veg-food.webp',
      category: 'Vegetarian',
      cookingTime: 25,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.4,
      ingredients: [
        { id: '1', name: 'Seasonal vegetables', amount: '500', unit: 'g' },
        { id: '2', name: 'Olive oil', amount: '3', unit: 'tbsp' },
        { id: '3', name: 'Fresh herbs', amount: '2', unit: 'tbsp' },
        { id: '4', name: 'Balsamic vinegar', amount: '2', unit: 'tbsp' },
      ],
      instructions: [
        'Chop vegetables uniformly',
        'Heat olive oil in large pan',
        'Sauté vegetables until tender',
        'Add fresh herbs and vinegar',
        'Serve hot as main or side dish',
      ],
    },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      
      // Find recipe by ID
      const foundRecipe = mockRecipes.find(recipe => recipe.id === id);
      
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setError('');
      } else {
        setError('Recipe not found');
        setRecipe(null);
      }
      
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
        </div>
        
        <RecipeDetails recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeDetailPage;

