import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Home, Search, Bookmark } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { favorites } = useAppContext();

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-orange-200 transition-colors">
            <ChefHat className="w-8 h-8" />
            <span>RecipeHub</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/search" className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <Link to="/favorites" className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <Bookmark className="w-4 h-4" />
              <span>Favorites ({favorites.length})</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-orange-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
