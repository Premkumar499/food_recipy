import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeList from '../components/RecipeList';
import ScrollReveal from '../components/animations/ScrollReveal';
import AnimatedText from '../components/animations/AnimatedText';
import FloatingFoodParticles from '../components/animations/FloatingFoodParticles';
import CookingUtensilsAnimation from '../components/animations/CookingUtensilsAnimation';
import CookingSteamEffect from '../components/animations/CookingSteamEffect';
import { Recipe } from '../types';
import { fetchRecipes as fetchRecipesAPI } from '../config/api';

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Pasta Delight',
    image: '/images/food-interface/1.jpg',
    category: 'Popular',
    cookingTime: 30,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.5,
    ingredients: [
      { id: '1', name: 'Pasta', amount: '400', unit: 'g' },
      { id: '2', name: 'Heavy cream', amount: '300', unit: 'ml' },
      { id: '3', name: 'Garlic', amount: '3', unit: 'cloves' },
      { id: '4', name: 'Parmesan', amount: '100', unit: 'g' },
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Heat cream in a large pan',
      'Add garlic and cook until fragrant',
      'Stir in cheese until melted',
      'Combine with cooked pasta',
    ],
  },
  {
    id: '2',
    title: 'Creamy Fettuccine',
    image: '/images/food-interface/2.jpg',
    category: 'Popular',
    cookingTime: 25,
    servings: 4,
    difficulty: 'Easy' as const,
    rating: 4.3,
    ingredients: [
      { id: '1', name: 'Fettuccine', amount: '400', unit: 'g' },
      { id: '2', name: 'Butter', amount: '100', unit: 'g' },
      { id: '3', name: 'Heavy cream', amount: '250', unit: 'ml' },
      { id: '4', name: 'Parmesan', amount: '150', unit: 'g' },
    ],
    instructions: [
      'Cook fettuccine until al dente',
      'Melt butter in large pan',
      'Add cream and bring to simmer',
      'Stir in cheese gradually',
      'Toss with cooked pasta',
    ],
  },
  {
    id: '3',
    title: 'Spicy Grilled Chicken',
    image: '/images/food-interface/3.jpeg',
    category: 'Meat & Seafood',
    cookingTime: 45,
    servings: 6,
    difficulty: 'Medium' as const,
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '800', unit: 'g' },
      { id: '2', name: 'Spice blend', amount: '3', unit: 'tbsp' },
      { id: '3', name: 'Olive oil', amount: '4', unit: 'tbsp' },
      { id: '4', name: 'Lemon juice', amount: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Marinate chicken with spices and oil',
      'Let rest for 30 minutes',
      'Preheat grill to high heat',
      'Grill chicken until cooked through',
      'Serve with lemon juice',
    ],
  },
  {
    id: '4',
    title: 'Creamy Butter Chicken',
    image: '/images/food-interface/4.JPEG',
    category: 'Meat & Seafood',
    cookingTime: 50,
    servings: 4,
    difficulty: 'Medium' as const,
    rating: 4.6,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: '600', unit: 'g' },
      { id: '2', name: 'Butter', amount: '50', unit: 'g' },
      { id: '3', name: 'Tomato sauce', amount: '300', unit: 'ml' },
      { id: '4', name: 'Cream', amount: '200', unit: 'ml' },
    ],
    instructions: [
      'Cut chicken into pieces',
      'Cook chicken in butter until golden',
      'Add tomato sauce and spices',
      'Simmer for 20 minutes',
      'Stir in cream and serve',
    ],
  },
  {
    id: '5',
    title: 'Spiced Rice Bowl',
    image: '/images/food-interface/5.jpeg',
    category: 'Popular',
    cookingTime: 35,
    servings: 4,
    difficulty: 'Easy' as const,
    rating: 4.4,
    ingredients: [
      { id: '1', name: 'Basmati rice', amount: '300', unit: 'g' },
      { id: '2', name: 'Mixed vegetables', amount: '400', unit: 'g' },
      { id: '3', name: 'Spices', amount: '2', unit: 'tbsp' },
      { id: '4', name: 'Vegetable oil', amount: '3', unit: 'tbsp' },
    ],
    instructions: [
      'Cook rice until fluffy',
      'Sauté vegetables with spices',
      'Combine rice and vegetables',
      'Season to taste',
      'Serve hot',
    ],
  },
  {
    id: '6',
    title: 'Caesar Salad',
    image: '/images/food-interface/6.jpeg',
    category: 'Salad',
    cookingTime: 15,
    servings: 4,
    difficulty: 'Easy' as const,
    rating: 4.2,
    ingredients: [
      { id: '1', name: 'Romaine lettuce', amount: '300', unit: 'g' },
      { id: '2', name: 'Caesar dressing', amount: '100', unit: 'ml' },
      { id: '3', name: 'Croutons', amount: '100', unit: 'g' },
      { id: '4', name: 'Parmesan cheese', amount: '50', unit: 'g' },
    ],
    instructions: [
      'Wash and chop lettuce',
      'Toss with Caesar dressing',
      'Add croutons and cheese',
      'Mix well and serve',
      'Enjoy fresh',
    ],
  },
  {
    id: '7',
    title: 'Beef Tacos',
    image: '/images/food-interface/7.jpeg',
    category: 'Mexican',
    cookingTime: 30,
    servings: 6,
    difficulty: 'Medium' as const,
    rating: 4.7,
    ingredients: [
      { id: '1', name: 'Ground beef', amount: '500', unit: 'g' },
      { id: '2', name: 'Taco shells', amount: '12', unit: 'pieces' },
      { id: '3', name: 'Lettuce', amount: '200', unit: 'g' },
      { id: '4', name: 'Cheese', amount: '150', unit: 'g' },
    ],
    instructions: [
      'Cook ground beef with spices',
      'Warm taco shells',
      'Assemble tacos with beef',
      'Add lettuce and cheese',
      'Serve immediately',
    ],
  },
  {
    id: '8',
    title: 'Chocolate Chip Cookies',
    image: '/images/food-interface/8.webp',
    category: 'Dessert',
    cookingTime: 25,
    servings: 24,
    difficulty: 'Easy' as const,
    rating: 4.9,
    ingredients: [
      { id: '1', name: 'Flour', amount: '300', unit: 'g' },
      { id: '2', name: 'Chocolate chips', amount: '200', unit: 'g' },
      { id: '3', name: 'Butter', amount: '150', unit: 'g' },
      { id: '4', name: 'Sugar', amount: '200', unit: 'g' },
    ],
    instructions: [
      'Mix dry ingredients',
      'Cream butter and sugar',
      'Combine wet and dry ingredients',
      'Add chocolate chips',
      'Bake for 12 minutes',
    ],
  },
];

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // Get search query from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Fetch recipes from API with retry mechanism (uses config/api to handle prod vs dev)
  const fetchRecipes = async (search = '', retryCount = 0) => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchRecipesAPI(search);
      // Ensure Home page shows 8 unique interface images for the first 8 cards
      const interfaceImages = [
        '/images/food-interface/1.jpg',
        '/images/food-interface/2.jpg',
        '/images/food-interface/3.jpeg',
        '/images/food-interface/4.JPEG',
        '/images/food-interface/5.jpeg',
        '/images/food-interface/6.jpeg',
        '/images/food-interface/7.jpeg',
        '/images/food-interface/8.webp',
      ];
      const mapped = data.map((r, i) => (i < 8 ? { ...r, image: interfaceImages[i] } : r));
      setRecipes(mapped);
    } catch (err) {
      console.error('Error fetching recipes:', err);

      // Retry mechanism - try up to 2 times
      if (retryCount < 2) {
        setTimeout(() => {
          fetchRecipes(search, retryCount + 1);
        }, 1000 * (retryCount + 1));
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // Generic error (no localhost hint in production)
      setError(`Failed to load recipes: ${errorMessage}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Use mock data with working images immediately
    setRecipes(mockRecipes);
    setLoading(false);
    setError('');
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 w-full overflow-x-hidden relative">
      {/* Background Animations */}
      <FloatingFoodParticles />
      <CookingUtensilsAnimation />
      <CookingSteamEffect />
      
      {/* Hero Section - Full Screen */}
      <motion.div 
        className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zM0 20c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16S0 28.837 0 20z"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Dark overlay for text readability */}
        <motion.div 
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        
        {/* Content - Centered in full screen */}
        <div className="relative max-w-full px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94] as const,
                delay: 0.3 
              }}
            >
              <AnimatedText
                text="Discover Amazing Recipes"
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                gradient={false}
                delay={0.8}
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <AnimatedText
                text="Find the perfect recipe for any occasion"
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
                delay={1.8}
              />
            </motion.div>

            {/* Floating action button */}
            <motion.button
              className="mt-8 px-8 py-4 bg-white text-red-500 rounded-full font-bold text-lg shadow-2xl"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              onClick={() => {
                // Immediate feedback
                console.log('Start Cooking button clicked - SUCCESS!');
                
                // Visual feedback for debugging
                const button = document.activeElement;
                if (button) {
                  button.style.background = 'lightgreen';
                  setTimeout(() => {
                    button.style.background = '';
                  }, 500);
                }
                
                console.log('Current URL:', window.location.href);
                console.log('Document ready state:', document.readyState);
                
                // Try multiple approaches to ensure functionality
                const tryScroll = () => {
                  const recipesSection = document.getElementById('recipes-section');
                  console.log('Recipes section found:', recipesSection);
                  
                  if (recipesSection) {
                    console.log('Scrolling to recipes section...');
                    recipesSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                    return true;
                  }
                  return false;
                };
                
                // Immediate attempt
                if (!tryScroll()) {
                  // Retry after a short delay
                  setTimeout(() => {
                    if (!tryScroll()) {
                      console.log('Fallback: Scrolling to estimated position');
                      // Fallback: scroll to approximate recipes position
                      window.scrollTo({
                        top: window.innerHeight * 0.8,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }
                
                // Additional option: Navigate to recipes page if scroll fails
                setTimeout(() => {
                  console.log('Alternative: Navigate to all recipes');
                  // You can uncomment this line if you want navigation fallback
                  // navigate('/recipes');
                }, 2000);
              }}
            >
              <motion.span
                animate={{ 
                  color: ['#ef4444', '#f97316', '#ef4444']
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
              >
                🍳 Start Cooking 🍽️
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content - Fixed 8 Recipe Grid */}
      <div id="recipes-section" className="w-full max-w-full relative">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <AnimatedText
              text="Featured Recipes"
              className="text-4xl md:text-5xl font-bold text-center mb-4"
              gradient={true}
              delay={0.3}
            />
            <motion.p
              className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Handpicked delicious recipes just for you
            </motion.p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <RecipeList 
            recipes={recipes} 
            loading={loading} 
            error={error} 
            onRetry={() => fetchRecipes(searchTerm, 0)}
          />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default HomePage;

