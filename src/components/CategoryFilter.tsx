import { Link } from 'react-router-dom';

interface CategoryFilterProps {
  categories?: string[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  // Default categories if none provided
  const defaultCategories = [
    'Italian',
    'Indian', 
    'Dessert',
    'Salad',
    'Mexican',
    'Asian'
  ];

  const categoriesToUse = categories || defaultCategories;

  const categoryIcons: { [key: string]: string } = {
    'italian': '🍝',
    'indian': '🍛',
    'mexican': '🌮',
    'dessert': '🍪',
    'salad': '🥗',
    'asian': '🥢',
    'default': '🍽️'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categoriesToUse.map((category) => (
          <Link
            key={category}
            to={`/category/${category.toLowerCase()}`}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {categoryIcons[category.toLowerCase()] || categoryIcons.default}
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
              {category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
