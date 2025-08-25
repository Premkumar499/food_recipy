import { Recipe } from '../types';
import { demoSearchRecipes, demoGetRecipeDetails } from './demoApi';

// Spoonacular API configuration
const SPOONACULAR_API_KEY = 'demo'; // Replace with your actual API key
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Use demo API when API key is 'demo'
const USE_DEMO_API = SPOONACULAR_API_KEY === 'demo';

// Fallback food images for generated recipes
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop', // Pizza
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop', // Burger
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop', // Pasta
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop', // Salad
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', // Soup
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop', // Sandwich
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', // Chicken
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop', // Seafood
];

// Get random fallback image
const getRandomFallbackImage = (): string => {
  return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
};

// Fetch recipes from Spoonacular API or Demo API
export const fetchRecipesFromAPI = async (query: string, number: number = 12): Promise<Recipe[]> => {
  try {
    if (USE_DEMO_API) {
      console.log('🔄 Using Demo API for recipe search:', query);
      return await demoSearchRecipes(query, number);
    }

    // Real Spoonacular API call
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(query)}&number=${number}&addRecipeInformation=true&fillIngredients=true`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return data.results.map((recipe: any) => ({
      id: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image || getRandomFallbackImage(),
      readyInMinutes: recipe.readyInMinutes || 30,
      servings: recipe.servings || 4,
      summary: recipe.summary || `Delicious ${recipe.title} recipe`,
      ingredients: recipe.extendedIngredients?.map((ing: any) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        originalString: ing.original,
      })) || [],
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step: any, index: number) => ({
        number: index + 1,
        step: step.step,
      })) || [],
      category: 'Main Course',
      difficulty: 'Medium',
      rating: 4.0 + Math.random(),
    }));
  } catch (error) {
    console.error('Error fetching recipes from API:', error);
    // Fallback to demo API if real API fails
    return await demoSearchRecipes(query, number);
  }
};

// Fetch detailed recipe information including ingredients and instructions
export const fetchRecipeDetailsFromAPI = async (recipeId: string): Promise<Recipe | null> => {
  try {
    if (USE_DEMO_API) {
      console.log('🔄 Using Demo API for recipe details:', recipeId);
      return await demoGetRecipeDetails(recipeId);
    }

    // Real Spoonacular API call
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const recipe = await response.json();

    return {
      id: recipe.id.toString(),
      title: recipe.title,
      image: recipe.image || getRandomFallbackImage(),
      readyInMinutes: recipe.readyInMinutes || 30,
      servings: recipe.servings || 4,
      summary: recipe.summary || `Delicious ${recipe.title} recipe`,
      ingredients: recipe.extendedIngredients?.map((ing: any) => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        originalString: ing.original,
      })) || [],
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step: any, index: number) => ({
        number: index + 1,
        step: step.step,
      })) || [],
      category: 'Main Course',
      difficulty: 'Medium',
      rating: 4.0 + Math.random(),
    };
  } catch (error) {
    console.error('Error fetching recipe details from API:', error);
    // Fallback to demo API if real API fails
    return await demoGetRecipeDetails(recipeId);
  }
};

// Generate recipe from search query - this is the main function for your requirement:
// "when search any food, it will give ingredients + instructions for all food"
export const generateRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  try {
    // First try to get a recipe from API
    const apiResults = await fetchRecipesFromAPI(searchQuery, 1);
    
    if (apiResults.length > 0) {
      // Get detailed information for the first result
      const detailedRecipe = await fetchRecipeDetailsFromAPI(apiResults[0].id);
      if (detailedRecipe) {
        return detailedRecipe;
      }
    }

    // Fallback: generate a recipe based on the search query
    return await generateFallbackRecipeFromSearch(searchQuery);
  } catch (error) {
    console.error('Error generating recipe from search:', error);
    return await generateFallbackRecipeFromSearch(searchQuery);
  }
};

// Fallback function to generate recipes from search query when API is unavailable
const generateFallbackRecipeFromSearch = async (searchQuery: string): Promise<Recipe> => {
  const foodName = searchQuery.trim();
  const randomId = Date.now().toString();

  // Basic recipe template that provides ingredients and instructions for any food search
  const fallbackRecipe: Recipe = {
    id: randomId,
    title: `Homemade ${foodName}`,
    image: getRandomFallbackImage(),
    readyInMinutes: 30 + Math.floor(Math.random() * 30),
    servings: 2 + Math.floor(Math.random() * 4),
    summary: `A delicious homemade ${foodName} recipe with fresh ingredients and easy-to-follow instructions.`,
    ingredients: [
      {
        id: 1,
        name: `Fresh ${foodName} base ingredients`,
        amount: 2,
        unit: 'cups',
        originalString: `2 cups of fresh ${foodName} base ingredients`,
      },
      {
        id: 2,
        name: 'Olive oil',
        amount: 2,
        unit: 'tablespoons',
        originalString: '2 tablespoons olive oil',
      },
      {
        id: 3,
        name: 'Salt',
        amount: 1,
        unit: 'teaspoon',
        originalString: '1 teaspoon salt',
      },
      {
        id: 4,
        name: 'Black pepper',
        amount: 0.5,
        unit: 'teaspoon',
        originalString: '1/2 teaspoon black pepper',
      },
      {
        id: 5,
        name: 'Garlic',
        amount: 2,
        unit: 'cloves',
        originalString: '2 cloves garlic, minced',
      },
    ],
    instructions: [
      {
        number: 1,
        step: `Prepare all ingredients for your ${foodName}. Wash and clean the main ingredients thoroughly.`,
      },
      {
        number: 2,
        step: 'Heat olive oil in a large pan or cooking vessel over medium heat.',
      },
      {
        number: 3,
        step: 'Add minced garlic and sauté for 1-2 minutes until fragrant.',
      },
      {
        number: 4,
        step: `Add the main ${foodName} ingredients to the pan and cook according to the specific requirements of the dish.`,
      },
      {
        number: 5,
        step: 'Season with salt and black pepper to taste.',
      },
      {
        number: 6,
        step: `Continue cooking until the ${foodName} is properly prepared and cooked through.`,
      },
      {
        number: 7,
        step: 'Taste and adjust seasoning as needed.',
      },
      {
        number: 8,
        step: `Serve your homemade ${foodName} hot and enjoy!`,
      },
    ],
    category: 'Main Course',
    difficulty: 'Medium',
    rating: 4.0 + Math.random(),
  };

  return fallbackRecipe;
};

// Enhanced search function that provides ingredients and instructions for any food search
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  if (!query.trim()) {
    // Return some default recipes when no query
    return await fetchRecipesFromAPI('popular', 12);
  }

  try {
    // Get recipes with full ingredients and instructions
    const recipes = await fetchRecipesFromAPI(query, 12);
    
    // Ensure each recipe has detailed information
    const enhancedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        if (recipe.ingredients.length === 0 || recipe.instructions.length === 0) {
          // Get detailed information if missing
          const detailedRecipe = await fetchRecipeDetailsFromAPI(recipe.id);
          return detailedRecipe || recipe;
        }
        return recipe;
      })
    );

    return enhancedRecipes.filter(recipe => recipe !== null) as Recipe[];
  } catch (error) {
    console.error('Error searching recipes:', error);
    
    // Generate a recipe for the search query as fallback
    const generatedRecipe = await generateRecipeFromSearch(query);
    return [generatedRecipe];
  }
};

// Get recipe by ID with full details
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  try {
    return await fetchRecipeDetailsFromAPI(id);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

// Get enhanced recipes for homepage
export const getEnhancedRecipes = async (): Promise<Recipe[]> => {
  try {
    const popularRecipes = await fetchRecipesFromAPI('popular', 8);
    const quickRecipes = await fetchRecipesFromAPI('quick', 4);
    
    return [...popularRecipes, ...quickRecipes];
  } catch (error) {
    console.error('Error fetching enhanced recipes:', error);
    
    // Return some generated recipes as fallback
    const fallbackQueries = ['pasta', 'chicken', 'salad', 'soup'];
    const fallbackRecipes = await Promise.all(
      fallbackQueries.map(query => generateRecipeFromSearch(query))
    );
    
    return fallbackRecipes;
  }
};
