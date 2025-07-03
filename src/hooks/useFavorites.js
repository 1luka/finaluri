import useLocalStorage from './useLocalStorage';

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};

export default useFavorites;
