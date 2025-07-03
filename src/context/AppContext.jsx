import React, { useState, createContext, useContext } from 'react';
import useFavorites from '../hooks/useFavorites';
import useSearchHistory from '../hooks/useSearchHistory';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const favorites = useFavorites();
  const searchHistory = useSearchHistory();

  return (
    <AppContext.Provider
      value={{
        recipes,
        setRecipes,
        loading,
        setLoading,
        ...favorites,
        ...searchHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
