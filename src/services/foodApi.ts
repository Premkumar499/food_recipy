// Food API service for fetching recipes
export interface APIRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Array<{
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
      us: { amount: number; unitShort: string; unitLong: string };
      metric: { amount: number; unitShort: string; unitLong: string };
    };
  }>;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      number: number;
      step: string;
      ingredients: Array<{ id: number; name: string; localizedName: string; image: string }>;
      equipment: Array<{ id: number; name: string; localizedName: string; image: string }>;
    }>;
  }>;
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }>;
  };
}

// Free API alternative using TheMealDB
const MEAL_DB_BASE_URL = 'http://localhost:3002';

// Category mappings for TheMealDB
export const CATEGORIES = {
  'non-veg': ['Beef', 'Chicken', 'Lamb', 'Pork', 'Seafood'],
  'vegetarian': ['Vegetarian'],
  'vegan': ['Vegan'],
  'dessert': ['Dessert'],
  'breakfast': ['Breakfast'],
  'pasta': ['Pasta'],
  'side': ['Side'],
  'starter': ['Starter'],
  'miscellaneous': ['Miscellaneous']
};

export interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strIngredient16?: string;
  strIngredient17?: string;
  strIngredient18?: string;
  strIngredient19?: string;
  strIngredient20?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

// Convert MealDB recipe to our Recipe format
export const convertMealDBToRecipe = (meal: MealDBRecipe) => {
  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDBRecipe] as string;
    const measure = meal[`strMeasure${i}` as keyof MealDBRecipe] as string;
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: i.toString(),
        name: ingredient.trim(),
        amount: measure?.trim() || '1',
        unit: ''
      });
    }
  }

  // Extract instructions
  const instructions = meal.strInstructions
    .split(/\r\n|\r|\n/)
    .filter(step => step.trim())
    .map(step => step.trim());

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    cookingTime: 30, // Default cooking time
    servings: 4, // Default servings
    difficulty: 'Medium' as const,
    rating: 4.5,
    ingredients,
    instructions,
    area: meal.strArea,
    tags: meal.strTags?.split(',').map(tag => tag.trim()) || [],
    youtube: meal.strYoutube,
    source: meal.strSource
  };
};

// API service class
export class FoodAPIService {
  // Get recipes by category
  static async getRecipesByCategory(category: string): Promise<any[]> {
    try {
      const apiCategories = CATEGORIES[category as keyof typeof CATEGORIES] || [category];
      const allRecipes = [];

      for (const apiCategory of apiCategories) {
        const response = await fetch(`${MEAL_DB_BASE_URL}/filter.php?c=${apiCategory}`);
        if (response.ok) {
          const data = await response.json();
          if (data.meals) {
            allRecipes.push(...data.meals.slice(0, 8)); // Limit to 8 per category
          }
        }
      }

      return allRecipes.slice(0, 24); // Total limit of 24 recipes
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  }

  // Get recipe details by ID
  static async getRecipeById(id: string): Promise<any | null> {
    try {
      const response = await fetch(`${MEAL_DB_BASE_URL}/lookup.php?i=${id}`);
      if (response.ok) {
        const data = await response.json();
        return data.meals?.[0] || null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  }

  // Search recipes by name
  static async searchRecipes(query: string): Promise<any[]> {
    try {
      const response = await fetch(`${MEAL_DB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        return data.meals || [];
      }
      return [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  }

  // Get random recipes
  static async getRandomRecipes(count: number = 8): Promise<any[]> {
    try {
      const recipes = [];
      for (let i = 0; i < count; i++) {
        const response = await fetch(`${MEAL_DB_BASE_URL}/random.php`);
        if (response.ok) {
          const data = await response.json();
          if (data.meals?.[0]) {
            recipes.push(data.meals[0]);
          }
        }
      }
      return recipes;
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  }

  // Get all categories
  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${MEAL_DB_BASE_URL}/categories.php`);
      if (response.ok) {
        const data = await response.json();
        return data.categories?.map((cat: any) => cat.strCategory) || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return Object.keys(CATEGORIES);
    }
  }
}

