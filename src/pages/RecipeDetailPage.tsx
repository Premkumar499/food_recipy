import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import { Recipe } from '../types';

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
    ],
    instructions: [
      'Cook basmati rice and let it cool completely',
      'Heat oil and add mustard seeds',
      'Add cooked rice and lemon juice',
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
      'Pour batter and spread in circular motion',
      'Cook until golden brown',
    ],
  },
  {
    id: '3',
    title: 'Sambar',
    image: '/images/food-interface/3.jpeg',
    category: 'Tamil Cuisine',
    cookingTime: 40,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'Toor dal', amount: '1', unit: 'cup' },
      { id: '2', name: 'Tamarind', amount: '1', unit: 'ball' },
    ],
    instructions: [
      'Cook toor dal until soft',
      'Extract tamarind juice',
      'Mix and simmer',
    ],
  },
  {
    id: '4',
    title: 'Curd Rice',
    image: '/images/food-interface/4.JPEG',
    category: 'Tamil Cuisine',
    cookingTime: 15,
    servings: 3,
    difficulty: 'Easy',
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Cooked rice', amount: '2', unit: 'cups' },
      { id: '2', name: 'Curd', amount: '1', unit: 'cup' },
    ],
    instructions: [
      'Mash cooked rice slightly',
      'Add fresh curd and salt',
      'Mix well and serve',
    ],
  },
  {
    id: '5',
    title: 'Rasam',
    image: '/images/food-interface/5.jpeg',
    category: 'Tamil Cuisine',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.6,
    ingredients: [
      { id: '1', name: 'Tamarind', amount: '1', unit: 'ball' },
      { id: '2', name: 'Tomatoes', amount: '2', unit: 'medium' },
    ],
    instructions: [
      'Extract tamarind juice',
      'Boil tomatoes until soft',
      'Add spices and simmer',
    ],
  },
  {
    id: '6',
    title: 'Pongal',
    image: '/images/food-interface/6.jpeg',
    category: 'Tamil Cuisine',
    cookingTime: 35,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.4,
    ingredients: [
      { id: '1', name: 'Rice', amount: '1', unit: 'cup' },
      { id: '2', name: 'Moong dal', amount: '1/4', unit: 'cup' },
    ],
    instructions: [
      'Cook rice and dal together',
      'Add ghee and spices',
      'Serve hot',
    ],
  },
  {
    id: '7',
    title: 'Chicken Tikka Masala',
    image: '/images/food-interface/7.jpeg',
    category: 'Indian',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '800', unit: 'g' },
      { id: '2', name: 'Greek yogurt', amount: '200', unit: 'ml' },
      { id: '3', name: 'Tomatoes', amount: '400', unit: 'g' },
      { id: '4', name: 'Heavy cream', amount: '200', unit: 'ml' },
    ],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Cook chicken until browned',
      'Make tomato-based sauce',
      'Add cream and simmer',
      'Serve with rice and naan',
    ],
  },
  {
    id: '8',
    title: 'Vegetable Biryani',
    image: '/images/food-interface/8.webp',
    category: 'Indian',
    cookingTime: 60,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'Basmati rice', amount: '2', unit: 'cups' },
      { id: '2', name: 'Mixed vegetables', amount: '3', unit: 'cups' },
    ],
    instructions: [
      'Soak basmati rice',
      'Cook vegetables with spices',
      'Layer rice and vegetables',
      'Cook on low heat',
    ],
  },
  {
    id: '9',
    title: 'Pasta Carbonara',
    image: '/images/food-interface/1.jpg',
    category: 'Italian',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: '400', unit: 'g' },
      { id: '2', name: 'Eggs', amount: '3', unit: 'large' },
    ],
    instructions: [
      'Cook spaghetti until al dente',
      'Mix eggs with cheese',
      'Combine with hot pasta',
    ],
  },
];

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      setLoading(true);
      try {
        console.log('Looking for recipe with ID:', id);
        console.log('Available recipes:', mockRecipes.map(r => r.id));
        const foundRecipe = mockRecipes.find(recipe => recipe.id === id);
        console.log('Found recipe:', foundRecipe);
        if (foundRecipe) {
          setRecipe(foundRecipe);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="mb-6 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl">
          Back
        </button>
        <RecipeDetails recipe={recipe || undefined} />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
