import { Link } from 'react-router-dom';

interface NavigationItem {
  name: string;
  dropdownItems: { name: string; id: string }[];
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

const MobileNavigation = ({ isOpen, onClose, navigationItems }: MobileNavigationProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white shadow-2xl transform transition-all duration-300 ease-in-out z-50 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center group" onClick={onClose}>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-white">Food</span>
                    <span className="text-orange-400">.</span>
                  </h1>
                  <p className="text-gray-400 text-sm">Recipe Explorer</p>
                </div>
              </Link>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-6 space-y-4">
              {/* All Recipes Link */}
              <div className="group">
                <Link
                  to="/recipes"
                  onClick={onClose}
                  className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 group-hover:transform group-hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">All Recipes</span>
                </Link>
              </div>

              {/* Navigation Categories */}
              {navigationItems.map((item, index) => (
                <div key={item.name} className="group">
                  <div className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 cursor-pointer">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                      index === 1 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                      index === 2 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                      index === 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                      'bg-gradient-to-r from-purple-500 to-indigo-600'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />}
                        {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />}
                        {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                        {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />}
                        {index === 4 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h1.428a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.57 5h2.86a2 2 0 011.664.89l.812 1.22A2 2 0 0017.571 8H19a2 2 0 110 4h-1.428a2 2 0 00-1.664.89l-.812 1.22A2 2 0 0113.43 15h-2.86a2 2 0 01-1.664-.89l-.812-1.22A2 2 0 006.43 12H5z" />}
                      </svg>
                    </div>
                    <span className="font-semibold text-lg">{item.name}</span>
                  </div>
                  
                  {/* Dropdown Items */}
                  <div className="ml-13 mt-2 space-y-1">
                    {item.dropdownItems.map((dropdownItem, dropIndex) => (
                      <Link
                        key={dropIndex}
                        to={`/recipe/${dropdownItem.id}`}
                        onClick={onClose}
                        className="block p-2 pl-4 text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200 text-sm border-l-2 border-transparent hover:border-orange-400"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-gray-700">
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-2">🍽️ Discover Amazing Recipes</p>
              <p className="text-xs">Made with ❤️ for food lovers</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileNavigation;
