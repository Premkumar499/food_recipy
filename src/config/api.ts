// API Configuration
export const API_CONFIG = {
  // Use environment variable for API URL, with fallback for production
  baseURL: (import.meta as any).env?.VITE_API_URL || window.location.origin,
  
  // For production, we'll fetch from static JSON files
  getRecipesUrl: () => {
    if ((import.meta as any).env?.DEV) {
      return `${API_CONFIG.baseURL}/recipes`;
    } else {
      // In production, fetch from static file
      return '/recipes.json';
    }
  },
  
  getRecipeByIdUrl: (id: string) => {
    if ((import.meta as any).env?.DEV) {
      return `${API_CONFIG.baseURL}/recipes/${id}`;
    } else {
      // In production, we'll fetch all recipes and filter
      return '/recipes.json';
    }
  }
};

// Helper function to fetch recipes
export const fetchRecipes = async (searchQuery?: string): Promise<any[]> => {
  const url = API_CONFIG.getRecipesUrl();
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  let recipes = await response.json();
  
  // If we fetched from static file (production), recipes is the array directly
  if (!(import.meta as any).env?.DEV && Array.isArray(recipes)) {
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter((recipe: any) => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing: any) => ing.name.toLowerCase().includes(query))
      );
    }
  }
  
  return recipes;
};

// Helper function to fetch a single recipe by ID
export const fetchRecipeById = async (id: string): Promise<any | null> => {
  if ((import.meta as any).env?.DEV) {
    const url = API_CONFIG.getRecipeByIdUrl(id);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Recipe not found');
    }
    
    return await response.json();
  } else {
    // In production, fetch all recipes and find the one we need
    const recipes = await fetchRecipes();
    return recipes.find((recipe: any) => recipe.id === id) || null;
  }
};
