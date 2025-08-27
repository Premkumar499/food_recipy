import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import { Recipe } from '../types';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Rice',
    image: '/images/food-interface/1.jpg',
    category: 'Tamil Cuisine',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Easy',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Basmati rice', amount: '2', unit: 'cups' },
      { id: '2', name: 'Lemon juice', amount: '3', unit: 'tbsp' },
    ],
    instructions: [
      'Cook basmati rice and let it cool completely',
      'Heat oil and add mustard seeds',
      'Add cooked rice and lemon juice',
    ],
  },
];

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const foundRecipe = mockRecipes.find(recipe => recipe.id === id);
        if (foundRecipe) {
          setRecipe(foundRecipe);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="mb-6 px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl">
          Back
        </button>
        <RecipeDetails recipe={recipe || undefined} />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
