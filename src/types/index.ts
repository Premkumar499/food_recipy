export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
  cookingTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

export interface RecipeListProps {
  recipes: Recipe[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}
