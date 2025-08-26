// Spoonacular API utility for fetching food images
const SPOONACULAR_API_KEY = 'YOUR_API_KEY_HERE'; // You'll need to get this from spoonacular.com
const BASE_URL = 'https://api.spoonacular.com/recipes';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

// Function to search recipes by cuisine and get images
export const searchRecipesByQuery = async (query: string, cuisine?: string): Promise<SpoonacularRecipe[]> => {
  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      query: query,
      number: '5',
      addRecipeInformation: 'true',
      fillIngredients: 'true'
    });

    if (cuisine) {
      params.append('cuisine', cuisine);
    }

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching from Spoonacular API:', error);
    return [];
  }
};

// Function to get recipe image by ID
export const getRecipeImage = async (recipeId: number): Promise<string | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.image || null;
  } catch (error) {
    console.error('Error fetching recipe image:', error);
    return null;
  }
};

// Predefined high-quality food images from Spoonacular for common dishes
export const getSpoonacularImageByDishType = (dishName: string, category: string): string => {
  const dishName_lower = dishName.toLowerCase();
  const category_lower = category.toLowerCase();

  // Tamil Cuisine specific images
  if (category_lower.includes('tamil')) {
    if (dishName_lower.includes('rasam')) {
      return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Authentic rasam
    }
    if (dishName_lower.includes('sambar')) {
      return 'https://spoonacular.com/recipeImages/782601-556x370.jpg'; // Sambar
    }
    if (dishName_lower.includes('idli')) {
      return 'https://spoonacular.com/recipeImages/716406-556x370.jpg'; // Idli
    }
    if (dishName_lower.includes('dosa')) {
      return 'https://spoonacular.com/recipeImages/716300-556x370.jpg'; // Dosa
    }
    if (dishName_lower.includes('chettinad') || dishName_lower.includes('chicken')) {
      return 'https://spoonacular.com/recipeImages/795751-556x370.jpg'; // Chicken Chettinad
    }
    if (dishName_lower.includes('curd rice') || dishName_lower.includes('thayir')) {
      return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Curd rice
    }
    if (dishName_lower.includes('lemon rice')) {
      return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Lemon rice
    }
    if (dishName_lower.includes('murukku')) {
      return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Murukku
    }
  }

  // Italian/Pasta dishes
  if (dishName_lower.includes('pasta') || dishName_lower.includes('fettuccine')) {
    return 'https://spoonacular.com/recipeImages/715538-556x370.jpg'; // Creamy pasta
  }

  // Mexican dishes
  if (dishName_lower.includes('taco')) {
    return 'https://spoonacular.com/recipeImages/715769-556x370.jpg'; // Tacos
  }

  // Chicken dishes
  if (dishName_lower.includes('butter chicken')) {
    return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Butter chicken
  }
  if (dishName_lower.includes('grilled chicken')) {
    return 'https://spoonacular.com/recipeImages/715497-556x370.jpg'; // Grilled chicken
  }

  // Rice dishes
  if (dishName_lower.includes('rice') || dishName_lower.includes('biryani')) {
    return 'https://spoonacular.com/recipeImages/716195-556x370.jpg'; // Rice dishes
  }

  // Salads
  if (dishName_lower.includes('salad')) {
    return 'https://spoonacular.com/recipeImages/715497-556x370.jpg'; // Salads
  }

  // Desserts
  if (dishName_lower.includes('cookie') || dishName_lower.includes('dessert')) {
    return 'https://spoonacular.com/recipeImages/715540-556x370.jpg'; // Cookies/desserts
  }

  // Default fallback
  return 'https://spoonacular.com/recipeImages/716195-556x370.jpg';
};

// Function to update all recipes with Spoonacular images
export const updateRecipesWithSpoonacularImages = () => {
  // This would be called to update the database
  // Implementation depends on how you want to integrate it
  console.log('Updating recipes with Spoonacular images...');
};
