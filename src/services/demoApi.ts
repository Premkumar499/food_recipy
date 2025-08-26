// Demo Recipe API Service - Simulates real API responses
export interface RecipeSearchResult {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  dishTypes: string[];
}

export interface RecipeDetails {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  dishTypes: string[];
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
}

// Demo recipe database with realistic data
const DEMO_RECIPES_DB: { [key: string]: RecipeDetails[] } = {
  pizza: [
    {
      id: "pizza-1",
      title: "Classic Margherita Pizza",
      image: " $script:localImages[(Get-Random -Maximum $script:localImages.Length)] ",
      readyInMinutes: 25,
      servings: 4,
      dishTypes: ["italian", "main course"],
      extendedIngredients: [
        { id: 1, name: "pizza dough", amount: 1, unit: "ball", original: "1 ball pizza dough" },
        { id: 2, name: "tomato sauce", amount: 0.5, unit: "cup", original: "1/2 cup tomato sauce" },
        { id: 3, name: "fresh mozzarella", amount: 8, unit: "oz", original: "8 oz fresh mozzarella cheese" },
        { id: 4, name: "fresh basil", amount: 0.25, unit: "cup", original: "1/4 cup fresh basil leaves" },
        { id: 5, name: "olive oil", amount: 2, unit: "tbsp", original: "2 tablespoons olive oil" }
      ],
      analyzedInstructions: [{
        steps: [
          { number: 1, step: "Preheat oven to 475°F (245°C)." },
          { number: 2, step: "Roll out pizza dough on a floured surface to desired thickness." },
          { number: 3, step: "Transfer dough to a pizza stone or baking sheet." },
          { number: 4, step: "Spread tomato sauce evenly over dough, leaving 1-inch border." },
          { number: 5, step: "Tear mozzarella into pieces and distribute over sauce." },
          { number: 6, step: "Drizzle with olive oil and bake for 12-15 minutes until crust is golden." },
          { number: 7, step: "Remove from oven, top with fresh basil, and serve immediately." }
        ]
      }]
    }
  ],
  burger: [
    {
      id: "burger-1",
      title: "Classic Beef Burger",
      image: " $script:localImages[(Get-Random -Maximum $script:localImages.Length)] ",
      readyInMinutes: 20,
      servings: 4,
      dishTypes: ["american", "main course"],
      extendedIngredients: [
        { id: 1, name: "ground beef", amount: 1, unit: "lb", original: "1 lb ground beef (80/20)" },
        { id: 2, name: "burger buns", amount: 4, unit: "pieces", original: "4 hamburger buns" },
        { id: 3, name: "lettuce", amount: 4, unit: "leaves", original: "4 lettuce leaves" },
        { id: 4, name: "tomato", amount: 1, unit: "large", original: "1 large tomato, sliced" },
        { id: 5, name: "onion", amount: 0.5, unit: "medium", original: "1/2 medium onion, sliced" },
        { id: 6, name: "cheese", amount: 4, unit: "slices", original: "4 slices cheddar cheese" }
      ],
      analyzedInstructions: [{
        steps: [
          { number: 1, step: "Form ground beef into 4 equal patties, season with salt and pepper." },
          { number: 2, step: "Heat grill or skillet over medium-high heat." },
          { number: 3, step: "Cook patties for 4-5 minutes per side for medium doneness." },
          { number: 4, step: "Add cheese to patties during last minute of cooking." },
          { number: 5, step: "Lightly toast burger buns on grill or in toaster." },
          { number: 6, step: "Assemble burgers with lettuce, tomato, onion, and your favorite condiments." },
          { number: 7, step: "Serve immediately while hot." }
        ]
      }]
    }
  ],
  pasta: [
    {
      id: "pasta-1",
      title: "Spaghetti Carbonara",
      image: " $script:localImages[(Get-Random -Maximum $script:localImages.Length)] ",
      readyInMinutes: 20,
      servings: 4,
      dishTypes: ["italian", "main course"],
      extendedIngredients: [
        { id: 1, name: "spaghetti", amount: 1, unit: "lb", original: "1 lb spaghetti" },
        { id: 2, name: "pancetta", amount: 4, unit: "oz", original: "4 oz pancetta, diced" },
        { id: 3, name: "eggs", amount: 3, unit: "large", original: "3 large eggs" },
        { id: 4, name: "parmesan cheese", amount: 1, unit: "cup", original: "1 cup grated Parmesan cheese" },
        { id: 5, name: "black pepper", amount: 1, unit: "tsp", original: "1 tsp freshly ground black pepper" },
        { id: 6, name: "garlic", amount: 2, unit: "cloves", original: "2 cloves garlic, minced" }
      ],
      analyzedInstructions: [{
        steps: [
          { number: 1, step: "Bring large pot of salted water to boil and cook spaghetti until al dente." },
          { number: 2, step: "Meanwhile, cook pancetta in large skillet until crispy." },
          { number: 3, step: "Whisk eggs, Parmesan, and black pepper in large bowl." },
          { number: 4, step: "Reserve 1 cup pasta water, then drain spaghetti." },
          { number: 5, step: "Add hot pasta to pancetta and toss." },
          { number: 6, step: "Remove from heat and quickly stir in egg mixture, adding pasta water as needed." },
          { number: 7, step: "Serve immediately with additional Parmesan and black pepper." }
        ]
      }]
    }
  ]
};

// Simulate API delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

// Demo API functions
export const demoSearchRecipes = async (query: string): Promise<RecipeSearchResult[]> => {
  await simulateApiDelay();
  
  const searchTerm = query.toLowerCase();
  const results: RecipeSearchResult[] = [];
  
  // Search through demo database
  for (const [category, recipes] of Object.entries(DEMO_RECIPES_DB)) {
    if (searchTerm.includes(category) || category.includes(searchTerm)) {
      results.push(...recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        dishTypes: recipe.dishTypes
      })));
    }
  }
  
  // If no exact matches, search by keywords in titles
  if (results.length === 0) {
    for (const recipes of Object.values(DEMO_RECIPES_DB)) {
      for (const recipe of recipes) {
        if (recipe.title.toLowerCase().includes(searchTerm)) {
          results.push({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            servings: recipe.servings,
            dishTypes: recipe.dishTypes
          });
        }
      }
    }
  }
  
  return results.slice(0, 6); // Limit results
};

export const demoGetRecipeDetails = async (recipeId: string): Promise<RecipeDetails | null> => {
  await simulateApiDelay();
  
  // Search for recipe by ID
  for (const recipes of Object.values(DEMO_RECIPES_DB)) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      return recipe;
    }
  }
  
  return null;
};

