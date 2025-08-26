import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import CategoryPage from './pages/CategoryPage'
import RecipeVariationsPage from './pages/RecipeVariationsPage'
import RecipeListPage from './pages/RecipeListPage'
import CategorizedSearchDropdown from './components/CategorizedSearchDropdown'
import { searchRecipeByName } from './services/searchApi'
import { searchInCategories } from './data/categorizedRecipes'
import './App.css'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [categorizedResults, setCategorizedResults] = useState<{ category: string; recipes: string[] }[]>([]);
  const [showCategorizedSearch, setShowCategorizedSearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowCategorizedSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if we're on a recipe detail page
  const isRecipeDetailPage = location.pathname.startsWith('/recipe/');

  // Save search query to history
  const saveToHistory = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
      const newHistory = [trimmedQuery, ...searchHistory].slice(0, 10); // Keep only last 10 searches
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  // Handle input change and filter suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Get categorized search results
      const categoryResults = searchInCategories(value);
      setCategorizedResults(categoryResults);
      setShowCategorizedSearch(true); // Always show if there's a query
      
      // Also get history suggestions
      const filtered = searchHistory.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(false); // Prioritize categorized search
    } else {
      setShowSuggestions(false);
      setShowCategorizedSearch(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setShowCategorizedSearch(false);
    // Trigger search with the selected suggestion
    handleSearchWithQuery(suggestion);
  };

  // Search with specific query
  const handleSearchWithQuery = async (query: string) => {
    if (query.trim() && !isSearching) {
      setIsSearching(true);
      try {
        const recipe = await searchRecipeByName(query.trim());
        if (recipe) {
          saveToHistory(query.trim());
          navigate(`/recipe/${recipe.id}`);
        } else {
          alert(`No recipe found for "${query.trim()}". Please try another search.`);
        }
      } catch (error) {
        console.error('Search error:', error);
        alert('Search failed. Please try again.');
      } finally {
        setIsSearching(false);
        setShowSearch(false);
        setSearchQuery('');
        setShowSuggestions(false);
        setShowCategorizedSearch(false);
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSearchWithQuery(searchQuery);
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
            <div ref={searchRef} className="relative">
              {/* Focus Indicator */}
              {isSearchFocused && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-orange-400 text-black px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-3 bg-black animate-pulse rounded-sm"></div>
                      <span>Cursor is active - Start typing!</span>
                    </div>
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-400"></div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSearch} className="flex items-center rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery.trim()) {
                      // Show categorized results if there's a query
                      const categoryResults = searchInCategories(searchQuery);
                      setCategorizedResults(categoryResults);
                      setShowCategorizedSearch(categoryResults.length > 0);
                      
                      // Show history if no categorized results
                      if (categoryResults.length === 0) {
                        const filtered = searchHistory.filter(item => 
                          item.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setFilteredSuggestions(filtered);
                        setShowSuggestions(filtered.length > 0);
                      }
                    }
                  }}
                  onBlur={() => {
                    // Small delay to allow dropdown clicks
                    setTimeout(() => setIsSearchFocused(false), 150);
                  }}
                  placeholder="Search for recipes..."
                  disabled={isSearching}
                  className={`bg-gray-800 text-white px-4 py-3 focus:outline-none border-0 w-80 disabled:opacity-50 placeholder-gray-400 transition-all duration-200 ${
                    isSearchFocused 
                      ? 'ring-2 ring-orange-400 bg-gray-700 shadow-lg' 
                      : 'focus:ring-2 focus:ring-orange-400'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-orange-400 hover:bg-orange-500 text-black px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              
              {/* Categorized Search Dropdown */}
              <CategorizedSearchDropdown
                query={searchQuery}
                results={categorizedResults}
                onRecipeClick={handleSuggestionClick}
                isVisible={showCategorizedSearch}
              />
              
              {/* Search History Dropdown - Only show when no categorized results */}
              {showSuggestions && filteredSuggestions.length > 0 && !showCategorizedSearch && (
                <div className="absolute top-full left-0 w-80 bg-gray-800 shadow-lg rounded-lg mt-1 z-50 max-h-48 overflow-y-auto">
                  <div className="py-1">
                    <div className="text-orange-400 text-xs font-semibold uppercase tracking-wider px-3 py-2 border-b border-gray-700">
                      Recent Searches
                    </div>
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 last:border-b-0"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          
          {/* Navigation Menu - Only show if not on recipe detail page */}
          {!isRecipeDetailPage && (
            <nav className="border-t border-gray-700 relative">
              <div className="flex justify-between items-center">
                {/* ALL RECIPES Link */}
                <div className="relative flex-1">
                  <Link
                    to="/recipes"
                    className="block py-4 px-4 text-sm font-medium tracking-wider text-center border-b-2 transition-colors border-transparent text-white hover:text-orange-400 hover:border-orange-400"
                  >
                    ALL RECIPES
                  </Link>
                </div>
                
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group flex-1">
                    <div
                      className="py-4 px-4 text-sm font-medium tracking-wider text-center border-b-2 transition-colors cursor-default border-transparent text-white hover:text-orange-400 hover:border-orange-400"
                    >
                      {item.name}
                    </div>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
          )}
        </div>
      </header>
      
      <main className="w-full max-w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/variations/:category" element={<RecipeVariationsPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
