import { create } from 'zustand';

export interface ExploreFilters {
  selectedCategory: string | null;
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  searchQuery: string;
}

interface ExploreFiltersState {
  filters: ExploreFilters;
  setSelectedCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setBedrooms: (bedrooms: number | null) => void;
  setBathrooms: (bathrooms: number | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const defaultFilters: ExploreFilters = {
  selectedCategory: null,
  priceRange: [0, 1000],
  bedrooms: null,
  bathrooms: null,
  searchQuery: '',
};

export const useExploreFilters = create<ExploreFiltersState>((set) => ({
  filters: { ...defaultFilters },
  
  setSelectedCategory: (category) => set((state) => ({
    filters: {
      ...state.filters,
      selectedCategory: category,
    }
  })),
  
  setPriceRange: (range) => set((state) => ({
    filters: {
      ...state.filters,
      priceRange: range,
    }
  })),
  
  setBedrooms: (bedrooms) => set((state) => ({
    filters: {
      ...state.filters,
      bedrooms,
    }
  })),
  
  setBathrooms: (bathrooms) => set((state) => ({
    filters: {
      ...state.filters,
      bathrooms,
    }
  })),
  
  setSearchQuery: (query) => set((state) => ({
    filters: {
      ...state.filters,
      searchQuery: query,
    }
  })),
  
  resetFilters: () => set({
    filters: { ...defaultFilters },
  }),
})); 