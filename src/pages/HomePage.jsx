import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import useApi from '../hooks/useApi';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { recipes, setRecipes, loading, setLoading } = useAppContext();
  const { fetchData } = useApi();

  useEffect(() => {
    const loadRandomRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchData('https://api.spoonacular.com/recipes/random?number=12&apiKey=f1d89b7cd1fe46679034d5765a2f3327');
        setRecipes(data.recipes || []);
      } catch (error) {
        const fallbackRecipes = [
          { id: 1, title: "Spaghetti Carbonara", readyInMinutes: 20, servings: 4, spoonacularScore: 85 },
          { id: 2, title: "Chicken Tikka Masala", readyInMinutes: 45, servings: 6, spoonacularScore: 92 },
          { id: 3, title: "Beef Bourguignon", readyInMinutes: 180, servings: 8, spoonacularScore: 88 },
          { id: 4, title: "Margherita Pizza", readyInMinutes: 30, servings: 2, spoonacularScore: 90 },
        ];
        setRecipes(fallbackRecipes);
      }
      setLoading(false);
    };

    if (recipes.length === 0) {
      loadRandomRecipes();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Discover Amazing <span className="text-orange-500">Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world. Save your favorites and create your own culinary journey.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors transform hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>Start Searching</span>
          </Link>
        </div>

        {}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Recipes</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">10,000+</div>
            <div className="text-gray-600">Recipes Available</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
            <div className="text-gray-600">Cuisines</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">1M+</div>
            <div className="text-gray-600">Happy Cooks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
