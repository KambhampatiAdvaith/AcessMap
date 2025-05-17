import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Filters, LocationCategory, AccessibilityFeatureName } from '../types';

interface FiltersContextType {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  categories: [],
  accessibilityFeatures: [],
  minRating: 0,
  maxDistance: 10, // km
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        updateFilters,
        resetFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};