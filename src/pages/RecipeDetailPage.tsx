import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import { Recipe } from '../types';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page in browser history
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      setLoading(true);
      setError('');
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In a real app, this would be an actual API call
        const response = await fetch(`http://localhost:3002/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error('Recipe not found');
        }
        
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col">
        {/* Compact Back Button */}
        <div className="max-w-6xl mx-auto pt-2 px-4 flex-shrink-0">
          <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 mb-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ← Back
          </button>
        </div>
        
        <div className="flex justify-center items-center flex-1">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error && !recipe) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col">
        {/* Compact Back Button */}
        <div className="max-w-6xl mx-auto pt-2 px-4 flex-shrink-0">
          <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 mb-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ← Back
          </button>
        </div>
        
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="text-red-500 text-lg font-medium mb-2">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col overflow-hidden">
      {/* Compact Back Button */}
      <div className="max-w-6xl mx-auto pt-2 px-4 flex-shrink-0">
        <button
          onClick={handleGoBack}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg transform hover:scale-105 mb-2"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ← Back
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <RecipeDetails recipe={recipe || undefined} />
      </div>
    </div>
  );
};

// Mock data for development
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: ' $script:localImages[(Get-Random -Maximum $script:localImages.Length)] ',
    category: 'Italian',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium',
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: '400', unit: 'g' },
      { id: '2', name: 'Eggs', amount: '3', unit: 'large' },
      { id: '3', name: 'Parmesan cheese', amount: '100', unit: 'g' },
      { id: '4', name: 'Pancetta', amount: '150', unit: 'g' },
      { id: '5', name: 'Black pepper', amount: '1', unit: 'tsp' },
      { id: '6', name: 'Salt', amount: '1', unit: 'tsp' },
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package instructions until al dente.',
      'While pasta cooks, cut pancetta into small cubes and fry in a large skillet until crispy and golden.',
      'In a bowl, whisk together eggs, grated Parmesan cheese, and freshly ground black pepper.',
      'Reserve 1 cup of pasta cooking water before draining the spaghetti.',
      'Add the hot, drained pasta to the skillet with pancetta and toss to combine.',
      'Remove from heat and quickly add the egg mixture, tossing constantly to create a creamy sauce.',
      'Add pasta water gradually if needed to achieve the right consistency.',
      'Serve immediately with extra Parmesan cheese and black pepper.',
    ],
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    image: ' $script:localImages[(Get-Random -Maximum $script:localImages.Length)] ',
    category: 'Indian',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '800', unit: 'g' },
      { id: '2', name: 'Greek yogurt', amount: '200', unit: 'ml' },
      { id: '3', name: 'Canned tomatoes', amount: '400', unit: 'g' },
      { id: '4', name: 'Heavy cream', amount: '200', unit: 'ml' },
      { id: '5', name: 'Onion', amount: '1', unit: 'large' },
      { id: '6', name: 'Garlic', amount: '4', unit: 'cloves' },
      { id: '7', name: 'Ginger', amount: '2', unit: 'tbsp' },
      { id: '8', name: 'Garam masala', amount: '2', unit: 'tsp' },
    ],
    instructions: [
      'Cut chicken into bite-sized pieces and marinate in yogurt with spices for at least 30 minutes.',
      'Heat oil in a large skillet and cook marinated chicken until browned and cooked through.',
      'Remove chicken and set aside. In the same pan, sauté diced onion until softened.',
      'Add minced garlic and ginger, cook for another minute until fragrant.',
      'Add canned tomatoes and spices, simmer for 10 minutes until sauce thickens.',
      'Stir in heavy cream and return chicken to the pan.',
      'Simmer for 5-10 minutes until heated through and flavors combine.',
      'Serve hot with basmati rice and fresh naan bread.',
    ],
  },
];

export default RecipeDetailPage;

