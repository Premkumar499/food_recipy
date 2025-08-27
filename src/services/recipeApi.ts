// Recipe API service with local data only
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
      { id: '5', name: 'Curry leaves', amount: '8-10', unit: 'leaves' },
    ],
    instructions: [
      'Cook basmati rice and let it cool completely',
      'Heat oil in a large pan and add mustard seeds',
      'Add curry leaves and turmeric powder',
      'Add cooked rice and mix gently',
      'Add lemon juice and mix well',
      'Serve hot garnished with fresh coriander',
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
      { id: '3', name: 'Salt', amount: '1', unit: 'tsp' },
    ],
    instructions: [
      'Heat non-stick tawa on medium flame',
      'Pour a ladle of batter to center',
      'Spread the batter in circular motion',
      'Drizzle oil around the edges',
      'Cook until golden brown',
      'Fold and serve hot with chutney',
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
      { id: '2', name: 'Tamarind', amount: '1', unit: 'lemon-sized ball' },
      { id: '3', name: 'Sambar powder', amount: '2', unit: 'tbsp' },
      { id: '4', name: 'Mixed vegetables', amount: '2', unit: 'cups' },
    ],
    instructions: [
      'Cook toor dal until soft and mushy',
      'Soak tamarind and extract juice',
      'Boil vegetables until tender',
      'Mix dal, tamarind juice, and vegetables',
      'Add sambar powder and boil',
      'Temper with mustard seeds and curry leaves',
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
      { id: '2', name: 'Curd/Yogurt', amount: '1', unit: 'cup' },
      { id: '3', name: 'Salt', amount: '1/2', unit: 'tsp' },
      { id: '4', name: 'Green chilies', amount: '2', unit: 'pieces' },
    ],
    instructions: [
      'Mash cooked rice slightly',
      'Add fresh curd and salt',
      'Mix well until smooth',
      'Temper with mustard seeds and green chilies',
      'Garnish with coriander leaves',
      'Serve chilled',
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
      { id: '1', name: 'Tamarind', amount: '1', unit: 'lemon-sized ball' },
      { id: '2', name: 'Tomatoes', amount: '2', unit: 'medium' },
      { id: '3', name: 'Rasam powder', amount: '2', unit: 'tsp' },
      { id: '4', name: 'Turmeric', amount: '1/4', unit: 'tsp' },
    ],
    instructions: [
      'Extract tamarind juice',
      'Boil tomatoes until soft',
      'Add tamarind juice and rasam powder',
      'Bring to boil and simmer',
      'Temper with ghee and cumin',
      'Garnish with coriander leaves',
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
      { id: '3', name: 'Ghee', amount: '2', unit: 'tbsp' },
      { id: '4', name: 'Black pepper', amount: '1', unit: 'tsp' },
    ],
    instructions: [
      'Wash rice and moong dal together',
      'Cook in pressure cooker until soft',
      'Heat ghee in a pan',
      'Add black pepper and cumin',
      'Mix with cooked rice and dal',
      'Serve hot with coconut chutney',
    ],
  },
];

// Search recipes by query
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  if (!query.trim()) {
    return mockRecipes;
  }

  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query.toLowerCase()) ||
    recipe.category.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.some(ingredient =>
      ingredient.name.toLowerCase().includes(query.toLowerCase())
    )
  );

  return filteredRecipes;
};

// Get all recipes
export const getEnhancedRecipes = async (): Promise<Recipe[]> => {
  return mockRecipes;
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | undefined> => {
  return mockRecipes.find(recipe => recipe.id === id);
};

// For backward compatibility
export const fetchRecipesFromAPI = searchRecipes;
export const fetchRecipeDetailsFromAPI = getRecipeById;
export const generateRecipeFromSearch = async (query: string): Promise<Recipe> => {
  const results = await searchRecipes(query);
  return results[0] || mockRecipes[0];
};
