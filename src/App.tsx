import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import CategoryPage from './pages/CategoryPage'
import RecipeVariationsPage from './pages/RecipeVariationsPage'
import { searchRecipeByName } from './services/searchApi'
import './App.css'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !isSearching) {
      setIsSearching(true);
      try {
        const recipe = await searchRecipeByName(searchQuery.trim());
        if (recipe) {
          // Navigate directly to recipe details page
          navigate(`/recipe/${recipe.id}`);
        } else {
          // If no recipe found, show an alert or navigate to search results
          alert(`No recipe found for "${searchQuery.trim()}". Please try another search.`);
        }
      } catch (error) {
        console.error('Search error:', error);
        alert('Search failed. Please try again.');
      } finally {
        setIsSearching(false);
        setShowSearch(false);
        setSearchQuery('');
      }
    }
  };

  const navigationItems = [
    { 
      name: 'POPULAR', 
      dropdownItems: [
        { name: 'Creamy Pasta Delight', id: '1' },
        { name: 'Creamy Fettuccine', id: '7' },
        { name: 'Spiced Rice Bowl', id: '10' },
        { name: 'Avocado Toast', id: '15' }
      ]
    },
    { 
      name: 'MEAT & SEAFOOD', 
      dropdownItems: [
        { name: 'Spicy Grilled Chicken', id: '2' },
        { name: 'Creamy Butter Chicken', id: '9' },
        { name: 'Grilled Salmon', id: '11' },
        { name: 'Chicken Chettinad', id: '207' }
      ]
    },
    { 
      name: 'VEGETARIAN', 
      dropdownItems: [
        { name: 'Caesar Salad', id: '3' },
        { name: 'Greek Salad', id: '6' },
        { name: 'Quinoa Buddha Bowl', id: '12' },
        { name: 'Beans Poriyal', id: '216' }
      ]
    },
    { 
      name: 'TAMIL CUISINE', 
      dropdownItems: [
        { name: 'Sambar', id: '201' },
        { name: 'Rasam', id: '202' },
        { name: 'Idli', id: '205' },
        { name: 'Dosa', id: '206' },
        { name: 'Filter Coffee', id: '210' },
        { name: 'Chicken Chettinad', id: '207' },
        { name: 'Curd Rice', id: '203' },
        { name: 'Lemon Rice', id: '204' }
      ]
    },
    { 
      name: 'SNACKS', 
      dropdownItems: [
        { name: 'Crispy Samosa', id: '101' },
        { name: 'Pani Puri', id: '102' },
        { name: 'Pav Bhaji', id: '103' },
        { name: 'Murukku', id: '208' },
        { name: 'Vada (Medu Vada)', id: '211' },
        { name: 'Jigarthanda', id: '217' }
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full max-w-full overflow-x-hidden">
      <header className="bg-black text-white w-full">
        <div className="w-full max-w-full px-4 sm:px-6 lg:px-8">
          {/* Top Header */}
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-bold">
                <span className="text-white">Food</span>
                <span className="text-orange-400">.</span>
              </h1>
            </Link>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for recipes..."
                disabled={isSearching}
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-64 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-r-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="sr-only">Searching...</span>
                  </>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          
          {/* Navigation Menu */}
          <nav className="border-t border-gray-700 relative">
            <div className="flex justify-between items-center">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <div
                    className="py-4 px-4 text-sm font-medium tracking-wider text-center flex-1 border-b-2 transition-colors cursor-default border-transparent text-white hover:text-orange-400 hover:border-orange-400"
                  >
                    {item.name}
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <Link
                          key={index}
                          to={`/recipe/${dropdownItem.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>
      
      <main className="w-full max-w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/variations/:category" element={<RecipeVariationsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
