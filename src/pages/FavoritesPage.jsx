import React from 'react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';

const FavoritesPage = () => {
  const { favorites } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Favorite Recipes</h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start exploring recipes and save your favorites!</p>
            <Link
              to="/search"
              className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>Discover Recipes</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
