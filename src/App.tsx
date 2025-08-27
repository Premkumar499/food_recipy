import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import CategoryPage from './pages/CategoryPage'
import RecipeVariationsPage from './pages/RecipeVariationsPage'
import RecipeListPage from './pages/RecipeListPage'
import CategorizedSearchDropdown from './components/CategorizedSearchDropdown'
import MobileNavigation from './components/MobileNavigation'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    try {
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
    } catch (error) {
      console.error('Error in input change handler:', error);
      // Still update the search query even if there's an error
      setSearchQuery(e.target.value);
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
          console.log(`No recipe found for "${query.trim()}"`);
        }
      } catch (error) {
        console.error('Search error:', error);
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
    if (!searchQuery.trim() || isSearching) return;
    
    await handleSearchWithQuery(searchQuery);
  };

  // Handle dropdown toggle for desktop navigation
  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          <div className="flex justify-between items-center py-2">
            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors mr-3"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Link to="/" className="flex items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-white">Food</span>
                  <span className="text-orange-400">.</span>
                </h1>
              </Link>
            </div>
            
            {/* Search Box */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch} className="relative">
                {/* Simple search container */}
                <div className={`flex items-center bg-white rounded-lg border-2 transition-all duration-300 ${
                  isSearchFocused 
                    ? 'border-orange-400 shadow-lg' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  
                  {/* Search icon */}
                  <div className="pl-3 pr-2">
                    <svg className={`w-4 h-4 transition-colors duration-300 ${
                      isSearchFocused ? 'text-orange-500' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  {/* Input field */}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSearch(e);
                      }
                    }}
                    placeholder="Search for recipes..."
                    disabled={isSearching}
                    className="flex-1 px-3 py-2 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none disabled:opacity-50 text-sm w-32 sm:w-60 md:w-80"
                  />
                  
                  {/* Loading indicator (only when searching) */}
                  {isSearching && (
                    <div className="pr-3">
                      <svg className="animate-spin h-4 w-4 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
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
                <div className="absolute top-full left-0 w-full sm:w-96 bg-white border border-gray-200 shadow-lg rounded-lg mt-2 z-50 max-h-60 overflow-y-auto">
                  <div className="py-1">
                    <div className="text-gray-600 text-sm font-medium px-4 py-2 border-b border-gray-100 bg-gray-50">
                      Recent Searches
                    </div>
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center border-b border-gray-100 last:border-b-0"
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

          
          {/* Navigation Menu - Only show if not on recipe detail page and on desktop */}
          {!isRecipeDetailPage && (
            <nav className="border-t border-gray-700 relative hidden lg:block">
              <div className="flex justify-between items-center">
                {/* ALL RECIPES Link */}
                <div className="relative flex-1">
                  <Link
                    to="/recipes"
                    className="block py-2 px-4 text-sm font-medium tracking-wider text-center border-b-2 transition-colors border-transparent text-white hover:text-orange-400 hover:border-orange-400"
                  >
                    ALL RECIPES
                  </Link>
                </div>
                
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(item.name);
                      }}
                      className="w-full py-2 px-4 text-sm font-medium tracking-wider text-center border-b-2 transition-colors border-transparent text-white hover:text-orange-400 hover:border-orange-400 focus:outline-none"
                    >
                      <div className="flex items-center justify-center">
                        <span>{item.name}</span>
                        <svg 
                          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-white shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                      activeDropdown === item.name 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      <div className="py-2">
                        {item.dropdownItems.map((dropdownItem, index) => (
                          <Link
                            key={index}
                            to={`/recipe/${dropdownItem.id}`}
                            onClick={() => setActiveDropdown(null)}
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
      
      {/* Mobile Navigation Sidebar */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
      
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
