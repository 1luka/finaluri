import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import useApi from '../hooks/useApi';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchHistory from '../components/SearchHistory';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { addToHistory } = useAppContext();
  const { fetchData } = useApi();

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;

    setIsSearching(true);
    addToHistory(term);

    try {
      const data = await fetchData(`https://api.spoonacular.com/recipes/complexSearch?query=${term}&number=12&apiKey=f1d89b7cd1fe46679034d5765a2f3327`);
      setSearchResults(data.results || []);
    } catch (error) {
      // fallback
      const fallbackResults = [
        { id: 1, title: `${term} Recipe 1`, readyInMinutes: 25, servings: 4 },
        { id: 2, title: `${term} Recipe 2`, readyInMinutes: 35, servings: 6 },
        { id: 3, title: `${term} Recipe 3`, readyInMinutes: 15, servings: 2 },
      ];
      setSearchResults(fallbackResults);
    }

    setIsSearching(false);
  };

  const handleSearchSelect = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Search Recipes</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search for recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>

          <SearchHistory onSearchSelect={handleSearchSelect} />

          {isSearching && <LoadingSpinner />}

          {!isSearching && searchResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Search Results ({searchResults.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {!isSearching && searchTerm && searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No recipes found. Try a different search term.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
