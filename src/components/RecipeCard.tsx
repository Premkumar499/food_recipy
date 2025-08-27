import { useNavigate } from 'react-router-dom';
import { RecipeCardProps } from '../types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getFoodImage } from '../utils/imageImports';

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fallbackImages = [
    '/images/food-interface/1.jpg',
    '/images/food-interface/2.jpg',
    '/images/food-interface/3.jpeg',
    '/images/food-interface/4.JPEG'
  ];

  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    } else {
      // Navigate directly to the recipe detail page
      navigate(`/recipe/${recipe.id}`);
    }
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/category/${recipe.category.toLowerCase()}`);
  };

  const handleImageError = () => {
    console.log('Image failed to load:', imageSrc, 'Recipe:', recipe.title);
    if (retryCount < fallbackImages.length - 1) {
      setRetryCount(retryCount + 1);
    } else {
      setImageError(true);
    }
  };

  
  const resolveImagePath = (img?: string) => {
    if (!img) return '/images/food-interface/1.jpg';

    // Extract filename from path like 'images/food-interface/1.jpg'
    const filename = img.split('/').pop();
    if (filename) {
      return getFoodImage(filename);
    }

    return '/images/food-interface/1.jpg';
  };

  const imageSrc = imageError 
    ? '/images/food-interface/1.jpg'
    : retryCount > 0 
      ? fallbackImages[retryCount]
      : resolveImagePath(recipe.image);

  // Debug logging
  console.log('Recipe:', recipe.title, 'Image path:', recipe.image, 'Resolved:', imageSrc);

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 60, 
        scale: 0.8,
        rotateY: -15
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateY: 0
      } : {}}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: Math.random() * 0.3
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer w-full h-full perspective-1000"
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div 
        className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={imageSrc}
          alt={recipe.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={() => setImageError(false)}
          loading="lazy"
        />
        
        {/* Animated overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Category badge with animation */}
        <motion.button
          onClick={handleCategoryClick}
          className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full shadow-lg"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 8px 20px rgba(255,107,107,0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {recipe.category}
        </motion.button>


      </motion.div>
      
      <motion.div 
        className="p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.h3 
          className="text-lg font-bold mb-3 text-gray-800 line-clamp-2"
          title={recipe.title}
          whileHover={{ color: "#f97316" }}
          transition={{ duration: 0.2 }}
        >
          {recipe.title}
        </motion.h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05, color: "#f97316" }}
          >
            <motion.svg 
              className="w-4 h-4 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </motion.svg>
            {recipe.cookingTime} min
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05, color: "#10b981" }}
          >
            <motion.svg 
              className="w-4 h-4 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
            {recipe.difficulty}
          </motion.div>
        </div>
        
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <motion.span 
              className="text-yellow-400 text-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ★
            </motion.span>
            <span className="text-sm font-semibold text-gray-700 ml-1">{recipe.rating}</span>
          </motion.div>
          
          <motion.div 
            className="text-sm text-gray-600 font-medium"
            whileHover={{ scale: 1.05, color: "#8b5cf6" }}
          >
            Serves {recipe.servings}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeCard;
