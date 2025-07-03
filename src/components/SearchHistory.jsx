import React from 'react';
import { useAppContext } from '../context/AppContext';

const SearchHistory = ({ onSearchSelect }) => {
  const { searchHistory, clearHistory } = useAppContext();

  if (searchHistory.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Recent Searches</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((term, index) => (
          <button
            key={index}
            onClick={() => onSearchSelect(term)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
