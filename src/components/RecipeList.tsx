import { RecipeListProps } from '../types';
import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './animations/RecipeCardSkeleton';
import ScrollReveal from './animations/ScrollReveal';

const RecipeList = ({ recipes, loading, error, onRetry }: RecipeListProps) => {
  if (loading) {
    return (
      <div className="w-full max-w-full overflow-hidden px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <RecipeCardSkeleton />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ScrollReveal direction="up">
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            😞
          </motion.div>
          <motion.div
            className="text-red-500 text-xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Oops! Something went wrong!
          </motion.div>
          <motion.p
            className="text-gray-600 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {error}
          </motion.p>
          <div className="space-x-4">
            <motion.button 
              onClick={onRetry || (() => window.location.reload())} 
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              🔄 Try Again
            </motion.button>
            <motion.button 
              onClick={() => window.open('http://localhost:3002/recipes', '_blank')} 
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              🔗 Test API Direct
            </motion.button>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <ScrollReveal direction="up">
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl mb-4"
          >
            🔍
          </motion.div>
          <motion.div
            className="text-gray-500 text-xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            No recipes found
          </motion.div>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Try searching for something delicious! 🍳
          </motion.p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden px-4 py-4">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {recipes.slice(0, 8).map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as const
            }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecipeList;
