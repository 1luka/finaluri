import useSessionStorage from './useSessionStorage';

const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useSessionStorage('searchHistory', []);

  const addToHistory = (searchTerm) => {
    if (searchTerm.trim()) {
      setSearchHistory((prev) => {
        const filtered = prev.filter((term) => term !== searchTerm);
        return [searchTerm, ...filtered].slice(0, 10);
      });
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addToHistory, clearHistory };
};

export default useSearchHistory;
