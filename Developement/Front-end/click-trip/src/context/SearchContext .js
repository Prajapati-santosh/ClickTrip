import { createContext, useState, useCallback } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applyFiltersCallback, setApplyFiltersCallback] = useState(() => () => {});

  const triggerSearch = () => {
    if (applyFiltersCallback) {
      applyFiltersCallback();
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, setApplyFiltersCallback, triggerSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
