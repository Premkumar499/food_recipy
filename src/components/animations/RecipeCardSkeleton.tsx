import { motion } from 'framer-motion';

const RecipeCardSkeleton = () => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          animate={{ x: [-200, 400] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-4xl"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            🍽️
          </motion.div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <motion.div
            className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
        </div>
        
        {/* Meta info skeleton */}
        <div className="flex justify-between">
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
        
        {/* Rating skeleton */}
        <div className="flex justify-between items-center">
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCardSkeleton;
