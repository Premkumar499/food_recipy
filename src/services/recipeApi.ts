// Recipe API service with real API integration
import { Recipe, Ingredient } from '../types';
import { demoSearchRecipes, demoGetRecipeDetails } from './demoApi';

// Spoonacular API configuration (for production)
const SPOONACULAR_API_KEY = 'demo'; // Replace with your actual API key
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Use demo API when API key is 'demo'
const USE_DEMO_API = SPOONACULAR_API_KEY === 'demo';

// Fallback random food images (free to use)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop', // Burger
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop', // Pancakes
  'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&h=600&fit=crop', // Salad
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop', // Soup
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', // Tacos
  'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=600&fit=crop', // Steak
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop', // Pasta
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop', // Chicken
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop', // Fish
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop', // Bread
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop'  // Dessert
];

// Get random fallback image
const getRandomFallbackImage = (): string => {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};

// Enhanced search function that tries API first, then falls back to local data
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  if (!query.trim()) {
    return getEnhancedRecipes();
  }

  // First try to get recipes from API
  const apiResults = await fetchRecipesFromAPI(query, 8);
  
  if (apiResults.length > 0) {
    // Enhance API results with detailed information
    const enhancedResults = await Promise.all(
      apiResults.map(async (recipe) => {
        const detailedRecipe = await fetchRecipeDetailsFromAPI(recipe.id);
        return detailedRecipe || recipe;
      })
    );
    return enhancedResults.filter(Boolean);
  }
  
  // If API fails, fall back to local search and generation
  return generateFallbackRecipes(query);
};

// Fetch recipes from API or Demo API
export const fetchRecipesFromAPI = async (query: string, number: number = 12): Promise<Recipe[]> => {
  try {
    if (USE_DEMO_API) {
      const demoResults = await demoSearchRecipes(query);
      return demoResults.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        category: recipe.dishTypes?.[0] || 'Other',
        cookingTime: recipe.readyInMinutes || 30,
        servings: recipe.servings || 4,
        difficulty: 'Medium' as const,
        rating: 4.5,
        ingredients: [],
        instructions: []
      }));
    }
    
    // Real API call would go here
    return [];
  } catch (error) {
    console.warn('API fetch failed:', error);
    return [];
  }
};

// Fetch detailed recipe information
export const fetchRecipeDetailsFromAPI = async (recipeId: string): Promise<Recipe | null> => {
  try {
    if (USE_DEMO_API) {
      const demoRecipe = await demoGetRecipeDetails(recipeId);
      if (!demoRecipe) return null;
      
      const ingredients: Ingredient[] = demoRecipe.extendedIngredients.map(ing => ({
        id: ing.id.toString(),
        name: ing.name,
        amount: ing.amount.toString(),
        unit: ing.unit,
        originalString: ing.original
      }));
      
      const instructions: string[] = demoRecipe.analyzedInstructions?.[0]?.steps?.map(step => 
        step.step
      ) || [];
      
      return {
        id: demoRecipe.id,
        title: demoRecipe.title,
        image: demoRecipe.image,
        category: demoRecipe.dishTypes?.[0] || 'Other',
        cookingTime: demoRecipe.readyInMinutes || 30,
        servings: demoRecipe.servings || 4,
        difficulty: 'Medium' as const,
        rating: 4.5,
        ingredients,
        instructions
      };
    }
    
    return null;
  } catch (error) {
    console.warn('API fetch failed for recipe details:', error);
    return null;
  }
};

// Generate recipe from search query
export const generateRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  const apiResults = await fetchRecipesFromAPI(searchQuery, 1);
  
  if (apiResults.length > 0) {
    const detailedRecipe = await fetchRecipeDetailsFromAPI(apiResults[0].id);
    if (detailedRecipe) {
      return detailedRecipe;
    }
  }
  
  return generateFallbackRecipeFromSearch(searchQuery);
};

// Fallback recipe generation
const generateFallbackRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  const foodName = searchQuery.trim();
  const randomId = Date.now().toString();
  
  return {
    id: randomId,
    title: `${foodName.charAt(0).toUpperCase() + foodName.slice(1)} Recipe`,
    image: getRandomFallbackImage(),
    category: 'Other',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.0,
    ingredients: [
      { id: '1', name: foodName, amount: '1', unit: 'cup', originalString: `1 cup ${foodName}` },
      { id: '2', name: 'olive oil', amount: '2', unit: 'tbsp', originalString: '2 tbsp olive oil' },
      { id: '3', name: 'salt', amount: '1', unit: 'tsp', originalString: '1 tsp salt' },
      { id: '4', name: 'pepper', amount: '1/2', unit: 'tsp', originalString: '1/2 tsp black pepper' }
    ],
    instructions: [
      'Prepare all ingredients according to recipe.',
      'Heat cooking vessel to appropriate temperature.',
      'Cook ingredients according to method.',
      'Season to taste with salt and pepper.',
      'Cook until desired doneness is reached.',
      'Serve hot and enjoy!'
    ]
  };
};

// Fallback recipes for local search
const generateFallbackRecipes = (query: string): Recipe[] => {
  const searchTerm = query.toLowerCase();
  
  const recipe: Recipe = {
    id: Date.now().toString(),
    title: `${query.charAt(0).toUpperCase() + query.slice(1)} Recipe`,
    image: getRandomFallbackImage(),
    category: 'Other',
    cookingTime: Math.floor(Math.random() * 45) + 15,
    servings: Math.floor(Math.random() * 6) + 2,
    difficulty: 'Medium',
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    ingredients: [
      { id: '1', name: searchTerm, amount: '1', unit: 'cup', originalString: `1 cup ${searchTerm}` },
      { id: '2', name: 'olive oil', amount: '2', unit: 'tbsp', originalString: '2 tbsp olive oil' },
      { id: '3', name: 'garlic', amount: '2', unit: 'cloves', originalString: '2 cloves garlic' },
      { id: '4', name: 'salt', amount: '1', unit: 'tsp', originalString: '1 tsp salt' }
    ],
    instructions: [
      'Prepare all ingredients.',
      'Heat oil in a large pan.',
      'Add garlic and cook until fragrant.',
      `Add ${searchTerm} and cook until tender.`,
      'Season with salt and pepper to taste.',
      'Serve hot and enjoy!'
    ]
  };
  
  return [recipe];
};

// Mock recipes for demo
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    category: 'Italian',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.6,
    ingredients: [
      { id: '1', name: 'pizza dough', amount: '1', unit: 'ball', originalString: '1 ball pizza dough' },
      { id: '2', name: 'tomato sauce', amount: '1/2', unit: 'cup', originalString: '1/2 cup tomato sauce' },
      { id: '3', name: 'fresh mozzarella', amount: '8', unit: 'oz', originalString: '8 oz fresh mozzarella' },
      { id: '4', name: 'fresh basil', amount: '1/4', unit: 'cup', originalString: '1/4 cup fresh basil' }
    ],
    instructions: [
      'Preheat oven to 475°F (245°C).',
      'Roll out pizza dough on floured surface.',
      'Spread tomato sauce evenly over dough.',
      'Add mozzarella cheese and bake for 12-15 minutes.',
      'Top with fresh basil and serve.'
    ]
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&h=600&fit=crop',
    category: 'Healthy',
    cookingTime: 20,
    servings: 2,
    difficulty: 'Easy',
    rating: 4.4,
    ingredients: [
      { id: '1', name: 'chicken breast', amount: '2', unit: 'pieces', originalString: '2 chicken breasts' },
      { id: '2', name: 'mixed greens', amount: '4', unit: 'cups', originalString: '4 cups mixed greens' },
      { id: '3', name: 'cherry tomatoes', amount: '1', unit: 'cup', originalString: '1 cup cherry tomatoes' },
      { id: '4', name: 'olive oil', amount: '3', unit: 'tbsp', originalString: '3 tbsp olive oil' }
    ],
    instructions: [
      'Season chicken breasts with salt and pepper.',
      'Grill chicken for 6-7 minutes per side.',
      'Let chicken rest, then slice.',
      'Combine greens and tomatoes in bowl.',
      'Top with sliced chicken and drizzle with olive oil.'
    ]
  }
];

// Get enhanced recipes
export const getEnhancedRecipes = async (): Promise<Recipe[]> => {
  return mockRecipes;
};

// Get recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe | undefined> => {
  const apiResult = await fetchRecipeDetailsFromAPI(id);
  if (apiResult) {
    return apiResult;
  }
  
  return mockRecipes.find(recipe => recipe.id === id);
};

// Get recipes by category
export const getRecipesByCategory = async (category: string): Promise<Recipe[]> => {
  const allRecipes = await getEnhancedRecipes();
  return allRecipes.filter(recipe => 
    recipe.category.toLowerCase() === category.toLowerCase()
  );
};
import { Recipe, Ingredient } from '../types';
import { demoSearchRecipes, demoGetRecipeDetails } from './demoApi';

// Spoonacular API configuration (for production)
const SPOONACULAR_API_KEY = 'demo'; // Replace with your actual API key
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Use demo API when API key is 'demo'
const USE_DEMO_API = SPOONACULAR_API_KEY === 'demo';

// Unsplash API for high-quality food images
const UNSPLASH_ACCESS_KEY = 'demo'; // Replace with your key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// Fallback recipe database for when API is not available
const FALLBACK_RECIPES = {
  // Common ingredients by food type
  ingredients: {
    pasta: ['pasta', 'olive oil', 'garlic', 'parmesan cheese', 'salt', 'black pepper'],
    pizza: ['pizza dough', 'tomato sauce', 'mozzarella cheese', 'basil', 'olive oil'],
    burger: ['ground beef', 'burger buns', 'lettuce', 'tomato', 'onion', 'cheese'],
    salad: ['mixed greens', 'cucumber', 'tomatoes', 'olive oil', 'vinegar', 'salt'],
    soup: ['vegetable broth', 'onion', 'carrots', 'celery', 'herbs', 'salt'],
    chicken: ['chicken breast', 'garlic', 'herbs', 'olive oil', 'salt', 'pepper'],
    fish: ['fish fillets', 'lemon', 'herbs', 'olive oil', 'salt', 'pepper'],
    rice: ['rice', 'water', 'salt', 'butter', 'onion', 'garlic'],
    bread: ['flour', 'yeast', 'water', 'salt', 'sugar', 'olive oil'],
    cake: ['flour', 'sugar', 'eggs', 'butter', 'baking powder', 'vanilla'],
    cookies: ['flour', 'butter', 'sugar', 'eggs', 'vanilla', 'chocolate chips'],
    sandwich: ['bread', 'meat', 'cheese', 'lettuce', 'tomato', 'mayo'],
    tacos: ['tortillas', 'ground meat', 'cheese', 'lettuce', 'tomato', 'salsa'],
    curry: ['protein', 'curry powder', 'coconut milk', 'onion', 'garlic', 'ginger'],
    stir_fry: ['vegetables', 'protein', 'soy sauce', 'garlic', 'ginger', 'oil'],
    smoothie: ['fruits', 'yogurt', 'honey', 'milk', 'ice'],
    pancakes: ['flour', 'milk', 'eggs', 'sugar', 'baking powder', 'butter'],
    omelette: ['eggs', 'milk', 'cheese', 'vegetables', 'salt', 'pepper'],
    steak: ['beef steak', 'salt', 'pepper', 'garlic', 'herbs', 'butter']
  },
  
  // Cooking instructions templates
  instructions: {
    pasta: [
      'Bring a large pot of salted water to boil',
      'Cook pasta according to package directions until al dente',
      'Heat olive oil in a large skillet',
      'Sauté garlic until fragrant',
      'Add cooked pasta and toss with sauce',
      'Season with salt and pepper',
      'Serve with grated parmesan cheese'
    ],
    pizza: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on floured surface',
      'Spread tomato sauce evenly over dough',
      'Add mozzarella cheese and desired toppings',
      'Bake for 12-15 minutes until crust is golden',
      'Remove from oven and add fresh basil',
      'Slice and serve hot'
    ],
    burger: [
      'Form ground beef into patties',
      'Season patties with salt and pepper',
      'Heat grill or skillet over medium-high heat',
      'Cook patties 4-5 minutes per side',
      'Toast burger buns lightly',
      'Assemble burger with desired toppings',
      'Serve immediately'
    ],
    salad: [
      'Wash and dry all vegetables thoroughly',
      'Chop vegetables into bite-sized pieces',
      'Combine all vegetables in large bowl',
      'Whisk together oil and vinegar for dressing',
      'Toss salad with dressing just before serving',
      'Season with salt and pepper to taste',
      'Serve fresh and cold'
    ],
    default: [
      'Prepare all ingredients according to recipe',
      'Heat cooking vessel to appropriate temperature',
      'Cook ingredients according to method',
      'Season to taste with salt and pepper',
      'Cook until desired doneness is reached',
      'Let rest if needed before serving',
      'Serve hot and enjoy'
    ]
  }
};

// Fallback random food images (free to use)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop', // Burger
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop', // Pancakes
  'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&h=600&fit=crop', // Salad
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop', // Soup
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', // Tacos
  'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=600&fit=crop', // Steak
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop', // Pasta
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop', // Chicken
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop', // Fish
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=600&fit=crop', // Bread
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop'  // Dessert
];

// API Functions for fetching real recipe data

// Fetch recipes from Spoonacular API or Demo API
export const fetchRecipesFromAPI = async (query: string, number: number = 12): Promise<Recipe[]> => {
  try {
    if (USE_DEMO_API) {
      const demoResults = await demoSearchRecipes(query);
      return demoResults.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        category: recipe.dishTypes?.[0] || 'Other',
        cookingTime: recipe.readyInMinutes || 30,
        servings: recipe.servings || 4,
        difficulty: 'Medium' as const,
        rating: 4.5,
        ingredients: [], // Will be fetched separately
        instructions: [] // Will be fetched separately
      }));
    }
    
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&number=${number}&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    
    return data.results.map((recipe: any) => ({
      id: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image || getRandomFallbackImage(),
      category: recipe.dishTypes?.[0] || 'Other',
      cookingTime: recipe.readyInMinutes || 30,
      servings: recipe.servings || 4,
      difficulty: 'Medium' as const,
      rating: 4.5,
      ingredients: [], // Will be fetched separately
      instructions: [] // Will be fetched separately
    }));
  } catch (error) {
    console.warn('API fetch failed, using fallback data:', error);
    return [];
  }
};

// Fetch detailed recipe information including ingredients and instructions
export const fetchRecipeDetailsFromAPI = async (recipeId: string): Promise<Recipe | null> => {
  try {
    if (USE_DEMO_API) {
      const demoRecipe = await demoGetRecipeDetails(recipeId);
      if (!demoRecipe) return null;
      
      // Convert demo format to our Recipe format
      const ingredients: Ingredient[] = demoRecipe.extendedIngredients.map(ing => ({
        id: ing.id.toString(),
        name: ing.name,
        amount: ing.amount.toString(),
        unit: ing.unit,
        originalString: ing.original
      }));
      
      const instructions: string[] = demoRecipe.analyzedInstructions?.[0]?.steps?.map(step => 
        step.step
      ) || [];
      
      return {
        id: demoRecipe.id,
        title: demoRecipe.title,
        image: demoRecipe.image,
        category: demoRecipe.dishTypes?.[0] || 'Other',
        cookingTime: demoRecipe.readyInMinutes || 30,
        servings: demoRecipe.servings || 4,
        difficulty: 'Medium' as const,
        rating: 4.5,
        ingredients,
        instructions
      };
    }
    
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/${recipeId}/information?includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    
    // Parse ingredients
    const ingredients: Ingredient[] = data.extendedIngredients?.map((ing: any) => ({
      id: ing.id.toString(),
      name: ing.name,
      amount: ing.amount.toString(),
      unit: ing.unit,
      originalString: ing.original
    })) || [];
    
    // Parse instructions
    const instructions: string[] = data.analyzedInstructions?.[0]?.steps?.map((step: any) => 
      step.step
    ) || data.instructions?.split('.').filter((step: string) => step.trim()) || [];
    
    return {
      id: data.id.toString(),
      title: data.title,
      image: data.image || getRandomFallbackImage(),
      category: data.dishTypes?.[0] || 'Other',
      cookingTime: data.readyInMinutes || 30,
      servings: data.servings || 4,
      difficulty: 'Medium' as const,
      rating: 4.5,
      ingredients,
      instructions
    };
  } catch (error) {
    console.warn('API fetch failed for recipe details:', error);
    return null;
  }
};

// Get random fallback image
const getRandomFallbackImage = (): string => {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};

// Function to get category for a food item
const getFoodCategory = (foodName: string): string => {
  const food = foodName.toLowerCase();
  
  if (food.includes('pizza') || food.includes('pasta') || food.includes('lasagna')) return 'Italian';
  if (food.includes('burger') || food.includes('sandwich') || food.includes('fries')) return 'American';
  if (food.includes('taco') || food.includes('burrito') || food.includes('quesadilla')) return 'Mexican';
  if (food.includes('curry') || food.includes('biryani') || food.includes('naan')) return 'Indian';
  if (food.includes('sushi') || food.includes('ramen') || food.includes('tempura')) return 'Japanese';
  if (food.includes('salad') || food.includes('smoothie') || food.includes('vegetable')) return 'Vegetarian';
  if (food.includes('chicken') || food.includes('beef') || food.includes('pork') || food.includes('fish')) return 'Meat & Seafood';
  if (food.includes('cake') || food.includes('cookie') || food.includes('pie')) return 'Dessert';
  if (food.includes('snack') || food.includes('chip') || food.includes('nuts')) return 'Snacks';
  
  return 'International';
};

// Function to get difficulty based on food type
const getFoodDifficulty = (foodName: string): 'Easy' | 'Medium' | 'Hard' => {
  const food = foodName.toLowerCase();
  
  if (food.includes('salad') || food.includes('sandwich') || food.includes('smoothie')) return 'Easy';
  if (food.includes('cake') || food.includes('bread') || food.includes('curry')) return 'Hard';
  
  return 'Medium';
};

// Function to generate ingredients for any food
const generateIngredients = (foodName: string): Ingredient[] => {
  const food = foodName.toLowerCase().replace(/\s+/g, '_');
  
  // Find matching ingredients from database
  let baseIngredients: string[] = [];
  
  // Check for exact matches or partial matches
  for (const [key, ingredients] of Object.entries(FALLBACK_RECIPES.ingredients)) {
    if (food.includes(key) || key.includes(food.split('_')[0])) {
      baseIngredients = ingredients;
      break;
    }
  }
  
  // If no match found, generate generic ingredients
  if (baseIngredients.length === 0) {
    baseIngredients = [
      `fresh ${foodName.toLowerCase()}`,
      'olive oil',
      'garlic',
      'onion',
      'salt',
      'black pepper',
      'herbs'
    ];
  }
  
  // Add measurements to ingredients
  const measurements = ['1 cup', '2 tbsp', '1 tsp', '3 cloves', '1 lb', '2 cups', '1/2 cup', '1 piece'];
  const units = ['cups', 'tbsp', 'tsp', 'cloves', 'lbs', 'pieces', 'oz', 'ml'];
  
  return baseIngredients.map((ingredient, index) => {
    const measurement = measurements[index % measurements.length];
    const [amount, unit] = measurement.split(' ');
    
    return {
      id: (index + 1).toString(),
      name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      amount: amount,
      unit: unit || 'pieces'
    };
  });
};

// Function to generate instructions for any food
const generateInstructions = (foodName: string): string[] => {
  const food = foodName.toLowerCase().replace(/\s+/g, '_');
  
  // Find matching instructions from database
  for (const [key, instructions] of Object.entries(FALLBACK_RECIPES.instructions)) {
    if (food.includes(key) || key.includes(food.split('_')[0])) {
      return instructions;
    }
  }
  
  // Return default instructions if no match found
  return FALLBACK_RECIPES.instructions.default.map(instruction => 
    instruction.replace('ingredients', foodName.toLowerCase())
  );
};

// Generate recipe from search query using API or fallback
export const generateRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  // First try to get a recipe from API
  const apiResults = await fetchRecipesFromAPI(searchQuery, 1);
  
  if (apiResults.length > 0) {
    const detailedRecipe = await fetchRecipeDetailsFromAPI(apiResults[0].id);
    if (detailedRecipe) {
      return detailedRecipe;
    }
  }
  
  // Fall back to generating a recipe locally
  return generateFallbackRecipeFromSearch(searchQuery);
};

// Fallback function to generate recipes from local data
const generateFallbackRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  const foodName = searchQuery.trim();
  const randomId = Date.now().toString(); // Unique ID based on timestamp
  
  try {
    // Get random image
    const imageIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    const image = FALLBACK_IMAGES[imageIndex];
    
    // Generate recipe data
    const recipe: Recipe = {
      id: randomId,
      title: `${foodName.charAt(0).toUpperCase() + foodName.slice(1)} Recipe`,
      image,
      category: getFoodCategory(foodName),
      cookingTime: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
      servings: Math.floor(Math.random() * 6) + 2, // 2-8 servings
      difficulty: getFoodDifficulty(foodName),
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0 rating
      ingredients: generateIngredients(foodName),
      instructions: generateInstructions(foodName)
    };
    
    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    
    // Fallback recipe
    return {
      id: randomId,
      title: `${foodName} Recipe`,
      image: getRandomFallbackImage(),
      category: 'Other',
      cookingTime: 30,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.0,
      ingredients: [
        { id: '1', name: foodName, amount: '1', unit: 'cup', originalString: `1 cup ${foodName}` }
      ],
      instructions: ['Prepare and cook according to taste.']
    };
  }
};

// Enhanced recipe data with realistic ingredients and instructions
const ENHANCED_RECIPES = [
  {
    id: '1',
    title: 'Authentic Italian Pasta',
    category: 'Italian',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.6,
    baseIngredients: ['pasta', 'tomatoes', 'garlic', 'basil', 'olive oil', 'parmesan cheese'],
    baseInstructions: [
      'Bring salted water to boil in large pot',
      'Cook pasta according to package directions until al dente',
      'Heat olive oil in large skillet over medium heat',
      'Sauté garlic until fragrant, about 1 minute',
      'Add tomatoes and simmer for 10 minutes',
      'Toss pasta with sauce and fresh basil',
      'Serve with grated parmesan cheese'
    ]
  },
  {
    id: '2',
    title: 'Gourmet Snack Platter',
    category: 'Snacks',
    cookingTime: 10,
    servings: 6,
    difficulty: 'Easy' as const,
    rating: 4.3,
    baseIngredients: ['mixed nuts', 'cheese', 'crackers', 'dried fruits', 'olives', 'honey'],
    baseInstructions: [
      'Arrange crackers on serving platter',
      'Cut cheese into bite-sized cubes',
      'Place nuts in small bowls around platter',
      'Add dried fruits for color and sweetness',
      'Garnish with fresh olives',
      'Drizzle honey over cheese if desired',
      'Serve at room temperature'
    ]
  },
  {
    id: '3',
    title: 'Traditional Snack Mix',
    category: 'Snacks',
    cookingTime: 15,
    servings: 8,
    difficulty: 'Easy' as const,
    rating: 4.2,
    baseIngredients: ['roasted nuts', 'pretzels', 'cereal', 'spices', 'butter', 'worcestershire sauce'],
    baseInstructions: [
      'Preheat oven to 250°F (120°C)',
      'Mix nuts, pretzels, and cereal in large bowl',
      'Melt butter and add worcestershire sauce',
      'Pour butter mixture over dry ingredients',
      'Spread on baking sheet and bake 1 hour',
      'Stir every 15 minutes during baking',
      'Cool completely before storing'
    ]
  },
  {
    id: '4',
    title: 'Grilled Meat Supreme',
    category: 'Meat & Seafood',
    cookingTime: 35,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.8,
    baseIngredients: ['beef steaks', 'marinade', 'herbs', 'garlic', 'black pepper', 'salt'],
    baseInstructions: [
      'Marinate steaks for at least 2 hours',
      'Preheat grill to high heat',
      'Remove steaks from marinade and season',
      'Grill steaks 4-6 minutes per side for medium-rare',
      'Check internal temperature reaches 135°F',
      'Let rest for 5 minutes before serving',
      'Garnish with fresh herbs'
    ]
  },
  {
    id: '5',
    title: 'Seafood Medley',
    category: 'Meat & Seafood',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.7,
    baseIngredients: ['shrimp', 'scallops', 'fish fillets', 'lemon', 'butter', 'white wine'],
    baseInstructions: [
      'Pat seafood dry and season with salt and pepper',
      'Heat butter in large skillet over medium-high heat',
      'Cook scallops 2-3 minutes per side until golden',
      'Add shrimp and cook until pink',
      'Add fish fillets and cook until flaky',
      'Deglaze pan with white wine and lemon juice',
      'Serve immediately with pan sauce'
    ]
  },
  {
    id: '6',
    title: 'Classic Meat Platter',
    category: 'Meat & Seafood',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.6,
    baseIngredients: ['chicken breast', 'pork tenderloin', 'beef strips', 'seasonings', 'olive oil'],
    baseInstructions: [
      'Cut all meats into uniform portions',
      'Season generously with salt, pepper, and herbs',
      'Heat olive oil in large skillet',
      'Cook chicken breast until internal temp reaches 165°F',
      'Cook pork tenderloin until slightly pink in center',
      'Sear beef strips quickly for medium doneness',
      'Let all meats rest before slicing and serving'
    ]
  },
  {
    id: '7',
    title: 'Fresh Vegetable Bowl',
    category: 'Vegetarian',
    cookingTime: 20,
    servings: 3,
    difficulty: 'Easy' as const,
    rating: 4.5,
    baseIngredients: ['quinoa', 'avocado', 'cucumber', 'cherry tomatoes', 'spinach', 'lemon vinaigrette'],
    baseInstructions: [
      'Cook quinoa according to package directions',
      'Wash and chop all fresh vegetables',
      'Slice avocado just before serving',
      'Arrange quinoa as base in serving bowls',
      'Top with fresh vegetables in colorful sections',
      'Drizzle with lemon vinaigrette',
      'Serve immediately while quinoa is warm'
    ]
  },
  {
    id: '8',
    title: 'Garden Fresh Salad',
    category: 'Vegetarian',
    cookingTime: 15,
    servings: 4,
    difficulty: 'Easy' as const,
    rating: 4.4,
    baseIngredients: ['mixed greens', 'cherry tomatoes', 'cucumber', 'red onion', 'olive oil', 'balsamic vinegar'],
    baseInstructions: [
      'Wash and thoroughly dry all greens',
      'Cut cherry tomatoes in half',
      'Slice cucumber into rounds',
      'Thinly slice red onion',
      'Combine all vegetables in large salad bowl',
      'Whisk olive oil and balsamic vinegar for dressing',
      'Toss salad with dressing just before serving'
    ]
  }
];

// Function to get random food image
export const getRandomFoodImage = async (category: string, index: number): Promise<string> => {
  // For demo purposes, return fallback images with some randomization
  // In production, you would implement actual API calls
  
  try {
    // Use index to ensure consistent images for each recipe
    const imageIndex = index % FALLBACK_IMAGES.length;
    return FALLBACK_IMAGES[imageIndex];
  } catch (error) {
    console.error('Error fetching random image:', error);
    // Return a default food image if all else fails
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop';
  }
};

// Function to enhance ingredients with realistic amounts
const enhanceIngredients = (baseIngredients: string[]): Ingredient[] => {
  const measurements = ['1 cup', '2 tbsp', '1 tsp', '3 cloves', '1 lb', '2 cups', '1/2 cup', '1 piece'];
  const units = ['cups', 'tbsp', 'tsp', 'cloves', 'lbs', 'pieces', 'oz', 'ml'];
  
  return baseIngredients.map((ingredient, index) => {
    const measurement = measurements[index % measurements.length];
    const [amount, unit] = measurement.split(' ');
    
    return {
      id: (index + 1).toString(),
      name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      amount: amount,
      unit: unit || 'pieces'
    };
  });
};

// Function to get enhanced recipe data
export const getEnhancedRecipes = async (): Promise<Recipe[]> => {
  const enhancedRecipes: Recipe[] = [];
  
  for (let i = 0; i < ENHANCED_RECIPES.length; i++) {
    const baseRecipe = ENHANCED_RECIPES[i];
    
    try {
      // Get random image for this recipe
      const image = await getRandomFoodImage(baseRecipe.category, i);
      
      // Enhance ingredients with realistic measurements
      const ingredients = enhanceIngredients(baseRecipe.baseIngredients);
      
      const enhancedRecipe: Recipe = {
        id: baseRecipe.id,
        title: baseRecipe.title,
        category: baseRecipe.category,
        cookingTime: baseRecipe.cookingTime,
        servings: baseRecipe.servings,
        difficulty: baseRecipe.difficulty,
        rating: baseRecipe.rating,
        image,
        ingredients,
        instructions: baseRecipe.baseInstructions
      };
      
      enhancedRecipes.push(enhancedRecipe);
    } catch (error) {
      console.error(`Error enhancing recipe ${baseRecipe.id}:`, error);
      
      // Fallback with default image
      const enhancedRecipe: Recipe = {
        id: baseRecipe.id,
        title: baseRecipe.title,
        category: baseRecipe.category,
        cookingTime: baseRecipe.cookingTime,
        servings: baseRecipe.servings,
        difficulty: baseRecipe.difficulty,
        rating: baseRecipe.rating,
        image: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        ingredients: enhanceIngredients(baseRecipe.baseIngredients),
        instructions: baseRecipe.baseInstructions
      };
      
      enhancedRecipes.push(enhancedRecipe);
    }
  }
  
  return enhancedRecipes;
};

// Enhanced search function that tries API first, then falls back to local data
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  if (!query.trim()) {
    return getEnhancedRecipes();
  }

  // First try to get recipes from API
  const apiResults = await fetchRecipesFromAPI(query, 8);
  
  if (apiResults.length > 0) {
    // Enhance API results with detailed information
    const enhancedResults = await Promise.all(
      apiResults.map(async (recipe) => {
        const detailedRecipe = await fetchRecipeDetailsFromAPI(recipe.id);
        return detailedRecipe || recipe;
      })
    );
    return enhancedResults.filter(Boolean);
  }
  
  // If API fails, fall back to local search and generation
  const allRecipes = await getEnhancedRecipes();
  const searchTerm = query.toLowerCase();
  
  // First, search existing recipes
  const existingMatches = allRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm) ||
    recipe.category.toLowerCase().includes(searchTerm) ||
    recipe.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm)
    )
  );
  
  // If we found existing recipes, return them
  if (existingMatches.length > 0) {
    return existingMatches;
  }
  
  // If no existing recipes match, generate a new recipe for the search term
  try {
    const dynamicRecipe = await generateRecipeFromSearch(query);
    return [dynamicRecipe];
  } catch (error) {
    console.error('Error generating dynamic recipe:', error);
    return [];
  }
};

// Function to get recipe by ID with dynamic generation support
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  // First check existing recipes
  const recipes = await getEnhancedRecipes();
  const existingRecipe = recipes.find(recipe => recipe.id === id);
  
  if (existingRecipe) {
    return existingRecipe;
  }
  
  // If ID is a timestamp (dynamic recipe), we need to regenerate or handle it
  const isTimestampId = /^\d{13}$/.test(id); // 13-digit timestamp
  
  if (isTimestampId) {
    // For dynamic recipes, we could store them in localStorage or regenerate
    // For now, return null to show "not found"
    return null;
  }
  
  return null;
};

export default {
  getEnhancedRecipes,
  getRecipeById,
  searchRecipes,
  generateRecipeFromSearch,
  getRandomFoodImage
};
