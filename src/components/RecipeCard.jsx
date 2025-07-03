import React from 'react';
import { Heart, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const RecipeCard = ({ recipe, showFavoriteButton = true }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useAppContext();
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={recipe.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(recipe.title)}`}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite(recipe.id) 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite(recipe.id) ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.readyInMinutes || 30} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings || 4} servings</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{recipe.spoonacularScore ? Math.round(recipe.spoonacularScore / 10) : 4.5}</span>
          </div>
        </div>

        {recipe.summary && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {recipe.summary.replace(/<[^>]*>/g, '').substring(0, 120)}...
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {recipe.dishTypes && recipe.dishTypes.slice(0, 3).map((type, index) => (
            <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
