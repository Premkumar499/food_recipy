import { Recipe } from '../types';

const API_BASE_URL = 'http://localhost:3002';

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search recipes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const searchRecipeByName = async (query: string): Promise<Recipe | null> => {
  try {
    const recipes = await searchRecipes(query);
    
    // First try exact match (case insensitive)
    const exactMatch = recipes.find(recipe => 
      recipe.title.toLowerCase() === query.toLowerCase()
    );
    
    if (exactMatch) {
      return exactMatch;
    }
    
    // Then try partial match (case insensitive)
    const partialMatch = recipes.find(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    
    if (partialMatch) {
      return partialMatch;
    }
    
    // If no matches, return the first recipe if any
    return recipes.length > 0 ? recipes[0] : null;
  } catch (error) {
    console.error('Error searching recipe by name:', error);
    return null;
  }
};

