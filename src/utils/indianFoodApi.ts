// TheIndianFoodAPI utility for fetching authentic Indian food images
const INDIAN_FOOD_API_BASE = 'https://www.theindianfoodapi.com/api';

export interface IndianCuisine {
  id: string;
  name: string;
  description?: string;
}

export interface IndianFood {
  id: string;
  name: string;
  description?: string;
  image?: string;
  cuisine?: string;
  ingredients?: string[];
  recipe?: string;
  preparationTime?: string;
  servings?: number;
}

// Function to get all available cuisines
export const getAllCuisines = async (): Promise<IndianCuisine[]> => {
  try {
    const response = await fetch(`${INDIAN_FOOD_API_BASE}/getallcuisine`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.cuisines || data || [];
  } catch (error) {
    console.error('Error fetching cuisines from Indian Food API:', error);
    return [];
  }
};

// Function to get foods by cuisine
export const getFoodsByCuisine = async (cuisineName: string): Promise<IndianFood[]> => {
  try {
    const response = await fetch(`${INDIAN_FOOD_API_BASE}/cuisine/${encodeURIComponent(cuisineName)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.foods || data.meals || data || [];
  } catch (error) {
    console.error(`Error fetching foods for cuisine ${cuisineName}:`, error);
    return [];
  }
};

// Function to search for specific Indian food by name
export const searchIndianFood = async (foodName: string): Promise<IndianFood | null> => {
  try {
    // First try to get South Indian cuisine
    const southIndianFoods = await getFoodsByCuisine('South Indian');
    
    // Search for exact match first
    let food = southIndianFoods.find(f => 
      f.name.toLowerCase() === foodName.toLowerCase()
    );
    
    // If no exact match, search for partial match
    if (!food) {
      food = southIndianFoods.find(f => 
        f.name.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(f.name.toLowerCase())
      );
    }
    
    // If still no match, try Tamil Nadu specific cuisine
    if (!food) {
      const tamilFoods = await getFoodsByCuisine('Tamil Nadu');
      food = tamilFoods.find(f => 
        f.name.toLowerCase().includes(foodName.toLowerCase()) ||
        foodName.toLowerCase().includes(f.name.toLowerCase())
      );
    }
    
    return food || null;
  } catch (error) {
    console.error(`Error searching for food ${foodName}:`, error);
    return null;
  }
};

// Predefined mappings for common Tamil dishes (fallback if API doesn't have them)
export const getIndianFoodImageByName = (dishName: string, category: string = ''): string => {
  const dishName_lower = dishName.toLowerCase();
  const category_lower = category.toLowerCase();

  // Direct mappings for common Tamil/South Indian dishes
  const dishMappings: { [key: string]: string } = {
    'rasam': 'https://www.theindianfoodapi.com/images/rasam.jpg',
    'sambar': 'https://www.theindianfoodapi.com/images/sambar.jpg', 
    'idli': 'https://www.theindianfoodapi.com/images/idli.jpg',
    'dosa': 'https://www.theindianfoodapi.com/images/dosa.jpg',
    'chettinad': 'https://www.theindianfoodapi.com/images/chicken-chettinad.jpg',
    'chicken chettinad': 'https://www.theindianfoodapi.com/images/chicken-chettinad.jpg',
    'curd rice': 'https://www.theindianfoodapi.com/images/curd-rice.jpg',
    'thayir sadam': 'https://www.theindianfoodapi.com/images/curd-rice.jpg',
    'lemon rice': 'https://www.theindianfoodapi.com/images/lemon-rice.jpg',
    'murukku': 'https://www.theindianfoodapi.com/images/murukku.jpg',
    'mysore pak': 'https://www.theindianfoodapi.com/images/mysore-pak.jpg',
    'biryani': 'https://www.theindianfoodapi.com/images/biryani.jpg',
    'butter chicken': 'https://www.theindianfoodapi.com/images/butter-chicken.jpg',
    'tandoori chicken': 'https://www.theindianfoodapi.com/images/tandoori-chicken.jpg',
    'filter coffee': 'https://www.theindianfoodapi.com/images/filter-coffee.jpg',
    'vada': 'https://www.theindianfoodapi.com/images/vada.jpg',
    'uttapam': 'https://www.theindianfoodapi.com/images/uttapam.jpg',
    'pongal': 'https://www.theindianfoodapi.com/images/pongal.jpg',
    'coconut rice': 'https://www.theindianfoodapi.com/images/coconut-rice.jpg',
    'tamarind rice': 'https://www.theindianfoodapi.com/images/tamarind-rice.jpg'
  };

  // Check for direct matches
  for (const [key, imageUrl] of Object.entries(dishMappings)) {
    if (dishName_lower.includes(key)) {
      return imageUrl;
    }
  }

  // Category-based fallbacks
  if (category_lower.includes('tamil') || category_lower.includes('south indian')) {
    return 'https://www.theindianfoodapi.com/images/south-indian-thali.jpg';
  }

  // Default Indian food image
  return 'https://www.theindianfoodapi.com/images/indian-thali.jpg';
};

// Function to update database with Indian Food API images
export const updateRecipeWithIndianFoodImage = async (recipeName: string, category: string): Promise<string> => {
  try {
    // First try to search via API
    const foodData = await searchIndianFood(recipeName);
    
    if (foodData && foodData.image) {
      return foodData.image;
    }
    
    // Fallback to predefined mappings
    return getIndianFoodImageByName(recipeName, category);
  } catch (error) {
    console.error(`Error updating recipe image for ${recipeName}:`, error);
    return getIndianFoodImageByName(recipeName, category);
  }
};

// Function to get authentic Tamil cuisine images
export const getTamilCuisineImages = async (): Promise<{ [key: string]: string }> => {
  try {
    const tamilFoods = await getFoodsByCuisine('Tamil Nadu');
    const southIndianFoods = await getFoodsByCuisine('South Indian');
    
    const allFoods = [...tamilFoods, ...southIndianFoods];
    const imageMap: { [key: string]: string } = {};
    
    allFoods.forEach(food => {
      if (food.image) {
        imageMap[food.name.toLowerCase()] = food.image;
      }
    });
    
    return imageMap;
  } catch (error) {
    console.error('Error fetching Tamil cuisine images:', error);
    return {};
  }
};
